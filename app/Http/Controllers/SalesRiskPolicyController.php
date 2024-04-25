<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Currency;
use App\Models\Deal;
use App\Models\DealStage;
use App\Models\Lead;
use App\Models\PolicyPointHistory;
use App\Models\PolicyQuestionValue;
use App\Models\SalesPolicyQuestion;
use App\Models\SalesRiskPolicy;
use App\Models\Team;
use App\Models\User;
use DateTime;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;

class SalesRiskPolicyController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Sales Risk Policies';
        // $this->activeSettingMenu = 'sales_risk_policies';
        $this->middleware(function ($request, $next) {
            if (in_array(auth()->user()->role_id, [1, 7, 8])) /* admin and sale */ {
                return $next($request);
            }
            abort_403(user()->permission('manage_company_setting') !== 'all');
        });
    }

    public static function Routes()
    {
        Route::controller(self::class)->prefix('account/sales-risk-policies')->name('account.sale-risk-policies.')->group(function () {

            // policy rules
            Route::get('/', 'index')->name('index');
            Route::get('input-fields', 'riskPolicyInputFields')->name('input-fields');
            Route::post('save', 'save')->name('save');
            Route::post('edit/{id}', 'edit')->name('edit');
            Route::post('edit-single/{id}', 'editSingle')->name('edit-single');
            Route::get('rule-list', 'ruleList')->name('rule-list');
            Route::put('status-change/{id}/{status}', 'policyRuleStatusChange')->name('status-change');

            // questions
            Route::get('question', 'questionIndex')->name('question.index');
            Route::get('question/fields-type', 'questionInputField')->name('question.fields-type');
            Route::post('question/save', 'policyQuestionSave')->name('question.save');

            Route::get('question-fields/{policyId}', 'policyQuestionInputFields')->name('question-fields');

            Route::post('question-fields/edit/{id}', 'policyQuestionEdit')->name('question-fields.edit');
            Route::get('question/list', 'questionList')->name('question.list');

            Route::post('question-value/save', 'questionValueSave')->name('question-value.save');
            Route::get('deals/risk-analysis/{deal_id}', 'calculatePolicyPoint')->name('deal.analysis');
            Route::get('deals/report/{deal_id}', 'questionValueReport')->name('deal.report');

            Route::put('deals/authorize-deny/{deal_id}/{status}', 'authorizeDenyDeal')->name('deal.authorize-deny');
        });

        // question render for sales person
        Route::get('account/deals/risk-analysis/{deal_id}', [self::class, 'salesPolicyQuestionRender'])->name('account.sale-risk-policies.risk-analysis');
        Route::get('account/deals/risk-analysis/question/list', [self::class, 'renderQuestionList'])->name('account.sale-risk-policies.risk-analysis.question-list');
        Route::get('account/sales-analysis-reports', [self::class, 'salesRiskReportList'])->name('account.sale-risk-policies.report-list');
        Route::get('account/sales-analysis-reports/data', [self::class, 'salesRiskReportList'])->name('account.sale-risk-policies.report-data');
        Route::get('account/contracts/sales-analysis-report/{deal_id}', [self::class, 'salesAnalysisReport'])->name('account.sales-analysis-report');
    }

    function index()
    {
        return view('sales-risk-policies.index', $this->data);
    }

    function riskPolicyInputFields()
    {

        $department = Team::with('childs')->get()->map(function ($item) {
            return ['id' => $item->id, 'name' => $item->team_name];
        });

        $policyKeys = SalesRiskPolicy::$keys;

        $valueTypes = SalesRiskPolicy::$valueTypes;

        $countries = [];
        Country::each(function ($item) use (&$countries) {
            $countries[] = [
                'name' => $item->name,
                'niceName' => $item->nicename,
                'iso' => $item->iso
            ];
        });

        return response()->json(['data' => compact('department', 'policyKeys', 'valueTypes', 'countries')]);
    }

    function save(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'title' => 'required',
            'department' => 'required',
            'key' => 'required',
            'comment' => 'nullable',
            'ruleList' => 'required|array|min:1',
            'ruleList.*.policyType' => 'in:' . implode(',', SalesRiskPolicy::$types),
            'ruleList.*.title' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'validation fails',
                'data' => $validator->errors()
            ], 403);
        }

        DB::beginTransaction();

        try {

            $policy =  SalesRiskPolicy::create([
                'title' => $req->title,
                'department' => $req->department,
                'type' => 'parent',
                'key' => $req->key,
                'comment' => $req->comment
            ]);

            // dd($policy);
            foreach ($req->ruleList as $item) {

                $rule = self::policyRuleDataFormat($item, [
                    'department' => $req->department,
                    'parent_id' => $policy->id,
                    'sequence' => SalesRiskPolicy::where('parent_id', $policy->id)->count() + 1,
                ]);

                SalesRiskPolicy::create($rule);
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            // throw $th;
            return response()->json([
                'status' => 'error',
                'message' => 'Data did not save properly.'
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'New Sale Risk Policy created Successfully.'
        ]);
    }

    function edit(Request $req, $id): JsonResponse
    {
        $validator = Validator::make($req->all(), [
            'title' => 'required',
            'department' => 'required',
            'key' => 'required',
            'comment' => 'nullable',
            'ruleList' => 'required|array|min:1',
            'ruleList.*.policyType' => 'in:' . implode(',', SalesRiskPolicy::$types),
            'ruleList.*.title' => 'required',
            'ruleList.*.id' => 'required',
            'deletedRuleIds' => 'nullable|array'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'validation fails',
                'data' => $validator->errors()
            ], 403);
        }

        // dd($req->all(), $id);

        DB::beginTransaction();
        try {
            $policy = SalesRiskPolicy::findOrFail($id);

            $policy->update([
                'title' => $req->title,
                'department' => $req->department,
                'key' => $req->key,
                'comment' => $req->comment,
            ]);

            // update children rules
            foreach ($req->ruleList as $item) {
                $item = (object) $item;
                if ($item->id == 'newRule') {

                    $rule = self::policyRuleDataFormat($item, [
                        'department' => $policy->department,
                        'parent_id' => $policy->id,
                        'sequence' => SalesRiskPolicy::where('parent_id', $policy->id)->count() + 1,
                    ]);

                    SalesRiskPolicy::create($rule);
                } else {
                    $rule = self::policyRuleDataFormat($item);
                    $singleRule = SalesRiskPolicy::findOrFail($item->id);
                    $singleRule->update($rule);
                }
            }

            // delete children rules
            SalesRiskPolicy::whereIn('id', $req->input('deletedRuleIds', []))->delete();

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Policy edited successfully.',
            ]);
        } catch (\Throwable $th) {
            // throw $th;
            DB::rollBack();

            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    function editSingle(Request $req, $id): JsonResponse
    {
        try {
            $policy = SalesRiskPolicy::findOrFail($id);

            $rule = self::policyRuleDataFormat($req);

            $policy->update($rule);
        } catch (ModelNotFoundException $ex) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data not found'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error occurred while saving data.'
            ], 500);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Policy edited successfully.'
        ]);
    }

    function ruleList(Request $req)
    {
        try {
            if ($req->policy_id) {
                // check if policy is parent or not
                if (SalesRiskPolicy::findOrFail($req->policy_id)->parent_id == null) {

                    $data = SalesRiskPolicy::where('id', $req->policy_id)->get()->map(function ($item) {
                        return [
                            'id' => $item->id,
                            'title' => $item->title,
                            'key' => $item->key,
                            'ruleList' => SalesRiskPolicy::where('parent_id', $item->id)->orderBy('sequence')->get(['id', 'title',  'type', 'parent_id', 'value_type', 'value', 'points', 'status', 'comment']),
                            'department' => [
                                'id' => $item->department,
                                'name' => Team::with('childs')->find($item->department)->team_name
                            ],
                            'status' => $item->status,
                            'comment' => $item->comment,
                            'questionCount' => SalesPolicyQuestion::parent()->where('policy_id', $item->id)->count()
                        ];
                    });

                    return response()->json(['status' => 'success', 'data' => $data]);
                } else {
                    return response()->json(['status' => 'success', 'data' => SalesRiskPolicy::find($req->policy_id)]);
                }
            }


            $itemsPaginated = SalesRiskPolicy::where('parent_id', null)->offset($req->input('limit', 10) * ($req->input('page', 1) - 1))->paginate($req->input('limit', 10));
            $itemsTransformed = $itemsPaginated
                ->getCollection()
                ->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'title' => $item->title,
                        'key' => $item->key,
                        'ruleList' => SalesRiskPolicy::where('parent_id', $item->id)->orderBy('sequence')->get(['id', 'title',  'type', 'parent_id', 'value_type', 'value', 'points', 'status', 'comment']),
                        'department' => [
                            'id' => $item->department,
                            'name' => Team::with('childs')->find($item->department)->team_name
                        ],
                        'status' => $item->status,
                        'comment' => $item->comment,
                        'questionCount' => SalesPolicyQuestion::parent()->where('policy_id', $item->id)->count()
                    ];
                })->toArray();

            $data = new \Illuminate\Pagination\LengthAwarePaginator(
                $itemsTransformed,
                $itemsPaginated->total(),
                $itemsPaginated->perPage(),
                $itemsPaginated->currentPage(),
                [
                    'path' => FacadesRequest::url(),
                    'query' => [
                        'page' => $itemsPaginated->currentPage()
                    ]
                ]
            );

            return response()->json(['data' => $data]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status' => 'error',
                'message' => 'Application error'
            ], 500);
        }
    }

    function policyRuleStatusChange($id, $status)
    {
        // check if status is valid
        if (!in_array($status, ['0', '1'])) {
            return response()->json([
                'status' => 'error',
                'message' => 'Status not found'
            ], 403);
        }

        try {
            $policy = SalesRiskPolicy::findOrFail($id);

            // if parent id is not null
            if ($policy->parent_id) {
                $policy->status = $status;
            } else {
                SalesRiskPolicy::where('parent_id', $id)->update([
                    'status' => $status
                ]);
                $policy->status = $status;
            }

            $policy->save();
            return response()->json(['status' => 'success', 'message' => 'Policy status changed.']);
        } catch (\Throwable $th) {
            // throw $th;
            return response()->json(['status' => 'error', 'message' => 'Data not saved correctly.'], 500);
        }
    }

    /**
     * @param $rule array single rule value
     * @param $extra array extra values like department, parent_id
     *
     * @return $data formatted single rule
     * */
    function policyRuleDataFormat($rule, $extra = []): array
    {
        $rule = (object) $rule;
        $data = [
            'title' => $rule->title,
            'type'  => $rule->policyType,
            'comment' => $rule->comment ?? ''
        ];

        $data = array_merge($data, $extra);

        switch ($rule->policyType) {
            case "lessThan":
                $data['value_type'] = $rule->valueType;
                $data['value'] = $rule->value;
                $data['points'] = $rule->points;
                break;
            case "greaterThan":
                $data['value_type'] = $rule->valueType;
                $data['value'] = $rule->value;
                $data['points'] = $rule->points;
                break;
            case "fixed":
                $data['value_type'] = $rule->valueType;
                $data['value'] = $rule->value;
                $data['points'] = $rule->points;
                break;

            case "range":
                $data['value_type'] = $rule->valueType;
                $data['value'] = $rule->from . ', ' . $rule->to;
                $data['points'] = $rule->points;
                break;

            case "yesNo":
                $data['value'] = json_encode($rule->value);
                break;

            case "list":
                $data['value_type'] = $rule->valueType;
                if ($rule->valueType == "countries") {
                    $data['value'] = json_encode($rule->countries);
                }
                $data['points'] = $rule->points;
                break;
        }

        return $data;
    }

    function questionIndex()
    {
        $this->pageTitle = 'Sales Risk Question List';
        return view('sales-risk-policies.questionIndex', $this->data);
    }

    function questionInputField()
    {
        $types = SalesPolicyQuestion::$types;
        $questionKeys = SalesRiskPolicy::$keys;
        $policies = SalesRiskPolicy::whereNull('parent_id')->get(['id', 'title']);
        $questionList = SalesPolicyQuestion::get(['id', 'title', 'key', 'type', 'value', 'parent_id', 'policy_id']);

        return response()->json(['data' => compact('types', 'questionKeys', 'policies', 'questionList')]);
    }

    function policyQuestionSave(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'title' => 'required',
            'key' => 'required',
            'type' => 'required',
            'value' => 'nullable',
            'policy_id' => 'nullable',
            'parent_id' => 'nullable',
            'placeholder' => 'nullable',
            'comment' => 'nullable',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => 'Validation Error', 'data' => $validator->errors()], 403);
        }

        try {
            SalesPolicyQuestion::create([
                'title' => $req->title,
                'key' => $req->key,
                'type' => $req->type,
                'value' => $req->value,
                'parent_id' => $req->parent_id,
                'sequence' => SalesPolicyQuestion::where('key', $req->key)->count() + 1,
                'policy_id' => $req->policy_id,
                'placeholder' => $req->placeholder,
                'comment' => $req->comment
            ]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => 'Data not saved correctly.'], 500);
        }

        return response()->json(['status' => 'success', 'message' => 'Question added successfully']);
    }

    function policyQuestionEdit(Request $req, $id)
    {
        $validator = Validator::make($req->all(), [
            'title' => 'required',
            'key' => 'required',
            'type' => 'required',
            'value' => 'nullable',
            'policy_id' => 'nullable',
            'parent_id' => 'nullable',
            'placeholder' => 'nullable',
            'comment' => 'nullable',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => 'Validation Error', 'data' => $validator->errors()], 403);
        }

        try {
            $question = SalesPolicyQuestion::findOrFail($id);

            $question->update([
                'title' => $req->title,
                'key' => $req->key,
                'type' => $req->type,
                'value' => $req->value,
                'parent_id' => $req->parent_id,
                'policy_id' => $req->policy_id,
                'placeholder' => $req->placeholder,
                'comment' => $req->comment
            ]);

            return response()->json(['status' => 'success', 'message' => 'Question Edited successfully']);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(['status' => 'error', 'message' => 'Data not saved correctly.'], 500);
        }
    }

    function questionList(Request $req)
    {
        $itemsPaginated = SalesPolicyQuestion::parent()->where(function ($query) use ($req) {
            if ($req->policy_id)
                $query->where('policy_id', $req->policy_id);
            if ($req->page > 2)
                $query->offset($req->input('limit', 10) * $req->page);
        })
            ->paginate($req->input('limit', 10));

        $itemsTransformed = $itemsPaginated
            ->getCollection()
            ->map(function ($item) {

                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'key' => $item->key,
                    'type' => $item->type,
                    'value' => json_decode($item->value) ? json_decode($item->value) : $item->value,
                    'placeholder' => $item->placeholder,
                    'parent_id' => $item->parent_id,
                    'policy_id' => $item->policy_id,
                    'policy_title' => SalesRiskPolicy::find($item->policy_id)->title,
                    'questions' => self::questionListChild($item->id)
                ];
            })->toArray();

        $data = new \Illuminate\Pagination\LengthAwarePaginator(
            $itemsTransformed,
            $itemsPaginated->total(),
            $itemsPaginated->perPage(),
            $itemsPaginated->currentPage(),
            [
                'path' => FacadesRequest::url(),
                'query' => [
                    'page' => $itemsPaginated->currentPage()
                ]
            ]
        );

        return response()->json(['status' => 'success', 'data' =>  $data]);
    }

    function questionListChild($parentId)
    {
        $list = SalesPolicyQuestion::where('parent_id', $parentId)->get();

        if (count($list)) {
            $question = SalesPolicyQuestion::where('key', 'milestone')->first();
            $question = $question ? SalesPolicyQuestion::where('parent_id', $question->id)->first() : null;

            $list = $list->map(function ($item) use ($question) {
                $data = [
                    'id' => $item->id,
                    'title' => $item->title,
                    'key' => $item->key,
                    'type' => $item->type,
                    'value' => json_decode($item->value) ? json_decode($item->value) : $item->value,
                    'placeholder' => $item->placeholder,
                    'parent_id' => $item->parent_id,
                    'policy_id' => $item->policy_id,
                    'policy_title' => SalesRiskPolicy::find($item->policy_id)->title,
                    'questions' => self::questionListChild($item->id)
                ];

                if ($question && $question->id == $item->id) $data['currency'] = true;

                return $data;
            });
        }
        return $list;
    }

    function policyQuestionInputFields($policyId)
    {

        $fields = [
            [
                'label' => 'Title',
                'name' => 'title',
                'type' => 'input'
            ],
            [
                'label' => 'Type',
                'name' => 'type',
                'type' => 'select',
                'structure' => [
                    [
                        'label' => 'Text',
                        'name' => 'text',
                    ],
                    [
                        'label' => 'Yes/No',
                        'name' => 'yes_no',
                    ],
                    [
                        'label' => 'Numeric',
                        'name' => 'Numeric',
                    ],
                    [
                        'label' => 'List',
                        'name' => 'list',
                    ],
                    [
                        'label' => 'Long Text',
                        'name' => 'long_text',
                    ],
                ]
            ],
            [
                'label' => 'Parent Question',
                'name' => 'parent_id',
                'type' => 'select',
                'structure' => SalesPolicyQuestion::where('policy_id', $policyId)->get(['id', 'title', 'type'])
            ],
            [
                'label' => 'Comment',
                'name' => 'comment',
                'type' => 'input'
            ],
        ];

        return response()->json($fields);
    }

    function salesPolicyQuestionRender(Request $req, $deal_id)
    {
        $this->pageTitle = 'Sale Risk Analysis';

        $req->session()->put('deal_id', $deal_id);

        $deal = Deal::find($deal_id);
        if (in_array($deal->sale_analysis_status, ['authorized', 'auto-authorized'])) {
            return redirect()->route('dealDetails', $deal_id);
        }

        $data = $this->data;
        $data['dealStatus'] = $deal->sale_analysis_status;
        $data['addedBefore'] = PolicyQuestionValue::where('deal_id', $deal_id)->count() > 0;
        $data['redirectUrl'] = route('dealDetails', $deal_id);
        // Note: big form route : route('dealDetails', $deal->id)

        return view('deals.sales-questions-render', $data);
    }

    function renderQuestionList(Request $req)
    {
        $data = SalesPolicyQuestion::parent()
            ->get()->filter(fn ($item) => SalesRiskPolicy::find($item->policy_id)->status)
            ->map(function ($item) {

                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'key' => $item->key,
                    'type' => $item->type,
                    'value' => json_decode($item->value) ? json_decode($item->value) : $item->value,
                    'placeholder' => $item->placeholder,
                    'parent_id' => $item->parent_id,
                    'policy_id' => $item->policy_id,
                    'policy_title' => SalesRiskPolicy::find($item->policy_id)->title,
                    'questions' => self::questionListChild($item->id)
                ];
            })->toArray();

        $deal = Deal::find($req->session()->get('deal_id'));
        $currency = Currency::find($deal->currency_id);

        return response()->json(['status' => 'success', 'data' => ['questionList' => array_values($data), 'currency' => [$currency->currency_code, $currency->currency_name, $currency->currency_symbol]]]);
    }

    function questionValueSave(Request $req)
    {
        $validator = Validator::make($req->all(), [
            '*.id' => 'required|exists:sales_policy_questions,id',
            '*.value' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => 'Validation Error', 'data' => $validator->errors()], 403);
        }

        if ($req->session()->get('deal_id', null) == null) {
            return response()->json(['status' => 'error', 'message' => 'Deal is not valid.'], 500);
        }

        $dealId = $req->session()->get('deal_id');
        if (!$deal = Deal::find($dealId)) {
            return response()->json(['status' => 'error', 'message' => 'Deal is not valid.'], 500);
        }

        if ($questionValues = PolicyQuestionValue::where('deal_id', $dealId)->first()) {
            return response()->json(['status' => 'error', 'message' => 'Deal question values are already added.'], 500);
        }

        try {

            PolicyQuestionValue::create([
                'deal_id' => $dealId,
                'values' => json_encode($req->all()),
            ]);

            // calculate point
            $calculation = self::calculatePolicyPoint($dealId, $questionValues);

            if ($calculation['points'] === null) {
                // if error then delete previous records
                PolicyQuestionValue::where('deal_id', $dealId)->delete();
                return response()->json(['status' => 'error', 'message' => $calculation['error']], 500);
            }


            // deals table status change
            if ($calculation['points'] >= 0) {
                $dealStage = DealStage::where('lead_id', $deal->lead_id)->first();
                $dealStage->won_lost = 'Yes';
                $dealStage->save();

                $deal->sale_analysis_status = 'auto-authorized';
                $deal->sale_authorize_on = date('Y-m-d h:i:s');
            } else {
                $deal->sale_analysis_status = 'analysis';
            }

            $deal->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Questions values stored successfully.',
                'redirectUrl' => route('dealDetails', $dealId),
                'data' => ['points' => $calculation['points']]
            ]);
        } catch (\Throwable $th) {

            // if error then delete previous records
            PolicyQuestionValue::where('deal_id', $dealId)->delete();

            // throw $th;
            return response()->json(['status' => 'error', 'message' => 'Data did not stored successfully.'], 500);
        }
    }

    function calculatePolicyPoint($deal_id, $questionValues = null)
    {
        // $dealStage = DealStage::find($deal_id);
        // dd($dealStage);

        if (!$deal = Deal::find($deal_id)) {
            return ['points' => null, 'error' => 'Deal not found'];
        }

        // check point history exist
        if ($pointHistory = PolicyPointHistory::where('deal_id', $deal_id)->first()) {
            return json_decode($pointHistory->point_report, true);
        }

        if (!$questionValues) {
            if (!$questionValues = PolicyQuestionValue::where('deal_id', $deal_id)->first()) {
                return ['points' => null, 'error' => 'Policy question value not found'];
            }
        }

        // format qustions values with index
        $questionAns = [];
        foreach (json_decode($questionValues->values) as $item) $questionAns[$item->id] = $item->value;

        try {
            // get rules id and calculate point
            $pointData = [];
            $points = (float) 0;
            $message = [];
            $policyIdList = [];

            // --------------------- hourly rate calculation ------------------ //
            // calculate first question key value (hourlyRate)

            $policy = SalesRiskPolicy::where('key', 'hourlyRate')->first();
            if (!$policy || $policy->status == '0') goto endHourlyRate;

            $questions = SalesPolicyQuestion::where('key', 'hourlyRate')->orderBy('sequence')->get();
            if (count($questions) < 1) goto endHourlyRate;

            $rules = SalesRiskPolicy::where('parent_id', $policy->id)->get();

            $pointData['hourlyRate']['questionAnswer'] = [];
            $hours = 0;
            foreach ($questions as $item) {
                $data = [];
                $data['id'] = $item->id;
                $data['title'] = $item->title;
                $data['parent_id'] = $item->parent_id;

                if (!isset($questionAns[$item->id])) continue;

                $value = $questionAns[$item->id];

                switch ($item->sequence) {
                    case '1': /* need homepage */
                        if ($value == 'yes') {
                            $hours += 15;
                            $data['value'] = 'Yes (15 hours)';
                        } else {
                            $data['value'] = 'No';
                        }
                        break;
                    case '2': /* primary page */
                        $hours += $value * 10;
                        $data['value'] = $value . ' pages (' . ($value * 10) . ' Hours)';
                        break;
                    case '3': /* secondary page */
                        $hours += $value * 4;
                        $data['value'] = $value . ' pages (' . ($value * 4) . ' Hours)';
                        break;
                    case '4': /* How many hours */
                        $hours += $value;
                        $data['value'] = $value . ' Hours';
                        break;
                }

                $pointData['hourlyRate']['questionAnswer'][] = $data;
            }

            $hourlyRate = $deal->amount / $hours;

            foreach ($rules as $item) {
                switch ($item->type) {
                    case 'lessThan':
                        if ($hourlyRate < $item->value) {
                            $points += $item->points;
                            $pointData['hourlyRate']['points'] = [$item->points, $hourlyRate];
                            $policyIdList[$item->id] = $item->id;
                            goto endHourlyRate;
                        }
                        break;
                    case 'range':
                        $value = explode(',', $item->value);
                        if ($hourlyRate >= $value[0] && $hourlyRate <= $value[1]) {
                            $points += $item->points;
                            $pointData['hourlyRate']['points'] = [$item->points, $hourlyRate];
                            $policyIdList[$item->id] = $item->id;
                            goto endHourlyRate;
                        }
                        break;
                    case 'greaterThan':
                        if ($hourlyRate > $item->value) {
                            $points += $item->points;
                            $pointData['hourlyRate']['points'] = [$item->points, $hourlyRate];
                            $policyIdList[$item->id] = $item->id;
                            goto endHourlyRate;
                        }
                        break;
                    case 'fixed':
                        if ($hourlyRate == $item->value) {
                            $points += $item->points;
                            $pointData['hourlyRate']['points'] = [$item->points, $hourlyRate];
                            $policyIdList[$item->id] = $item->id;
                            goto endHourlyRate;
                        }
                        break;
                }
            }
            $message[] = 'Hourly rate (' . $hourlyRate . ') not matched with any conditions';
            endHourlyRate:

            // --------------------- end hourly rate calculation ------------------ //

            // ---------------------- milestone calculation ------------------------------- //
            $questions = SalesPolicyQuestion::where('key', 'milestone')->orderBy('sequence')->get();
            if (count($questions) < 3) {
                $message[] = '3 milestone questions are expected, ' . count($questions) . ' found.';
                goto endMilestone;
            }

            $policy = SalesRiskPolicy::where('parent_id', $questions[0]->policy_id)->orderBy('sequence')->get();
            if (count($policy) < 2) {
                $message[] = '2 milestone policies are expected, ' . count($policy) . ' found.';
                goto endMilestone;
            }

            $data = [];

            // safety check
            if (isset($questionAns[$questions[0]->id]))
                $value = $questionAns[$questions[0]->id];
            else {
                $message[] = 'All milestone questions values are not defined.';
                goto endMilestone;
            }

            // check first question is yes
            if ($value == 'yes') {
                $points += 1;
                $pointValue = (float) $policy[0]->points;
                $policyIdList[$policy[0]->id] = $policy[0]->id;

                $data[] = ['id' => $questions[0]->id, 'title' =>  $questions[0]->title, 'value' => 'yes', 'parent_id' => $questions[0]->parent_id];
            } else {

                // ------------------- percentage calculation

                if (isset($questionAns[$questions[1]->id]))
                    $value = $questionAns[$questions[1]->id];
                else {
                    $message[] = 'Milestone total amount not found.';
                    goto endMilestone;
                }

                $percentage = $value / $deal->actual_amount * 100;
                $data[] = ['id' => $questions[1]->id, 'title' => $questions[1]->title, 'value' => $value . '(' . number_format($percentage, 2) . '%)', 'parent_id' => $questions[1]->parent_id];

                // unseting first yes/no policy
                unset($policy[0]);
                foreach ($policy as $item) {
                    switch ($item->type) {
                        case 'lessThan':
                            if ($percentage < $item->value) {
                                $points += $item->points;
                                $points += 1;
                                $policyIdList[$item->id] = $item->id;
                                goto check1Milestone;
                            }
                            break;
                        case 'range':
                            $value = explode(',', $item->value);
                            if ($percentage >= $value[0] && $percentage <= $value[1]) {
                                $points += $item->points;
                                $policyIdList[$item->id] = $item->id;
                                goto check1Milestone;
                            }
                            break;
                        case 'greaterThan':
                            if ($percentage > $item->value) {
                                $points += $item->points;
                                $policyIdList[$item->id] = $item->id;
                                goto check1Milestone;
                            }
                            break;
                        case 'fixed':
                            if ($percentage == $item->value) {
                                $points += $item->points;
                                $policyIdList[$item->id] = $item->id;
                                goto check1Milestone;
                            }
                            break;
                    }
                }

                check1Milestone:

                // get selection value
                if (isset($questionAns[$questions[2]->id]))
                    $value = $questionAns[$questions[2]->id];
                else {
                    $message[] = 'Milestone selected list data not found.';
                    goto endMilestone;
                }

                $list = json_decode($questions[2]->value);

                foreach ($list as $item) {
                    if ($value == $item->id) {
                        $data[] = ['id' => $questions[2]->id, 'title' => $questions[2]->title, 'value' => $item->title, 'parent_id' => $questions[2]->parent_id];
                        break;
                    }
                }
                /**
                 * NOTE:  when saving list policy id is used for prefix
                 * this is because policy id is is fixed for a question
                 * question id can not be used as while adding the list there is no question id
                 */

                switch ($value) {
                    case $questions[0]->policy_id . '_1':
                        $points += 0;
                        $pointValue = 0;
                        break;
                    case $questions[0]->policy_id . '_2':
                        $points += 0;
                        $pointValue = 0;
                        break;
                    case $questions[0]->policy_id . '_3':
                        $points += -2;
                        $pointValue = -2;
                        break;
                    case $questions[0]->policy_id . '_4':
                        $points += -1;
                        $pointValue = -1;
                        break;
                }
            }
            $pointData['milestone']['questionAnswer'] = $data;
            $pointData['milestone']['points'] = $pointValue;

            endMilestone:

            // ---------------------- end milestone calculation ------------------------------- //

            // ---------------------- threat calculation --------------------------------//
            $questions = SalesPolicyQuestion::where('key', 'threat')->orderBy('sequence')->get();

            if (count($questions)) {

                if (isset($questionAns[$questions[0]->id]))
                    $value = $questionAns[$questions[0]->id];
                else {
                    $message[] = 'Threat question value is not added.';
                    goto endThreat;
                }

                // get question policy
                $policy = SalesRiskPolicy::where('parent_id', $questions[0]->policy_id)->first();
                $policyValue = json_decode($policy->value);
                $policyIdList[$policy->id] = $value;

                if ($value == 'yes') {
                    $points += (float) $policyValue->yes->point;
                    $pointValue = $policyValue->yes->point;
                } else {
                    $points += (float) $policyValue->no->point;
                    $pointValue = $policyValue->no->point;
                }

                $pointData['threat']['questionAnswer'][] = ['id' => $questions[0]->id, 'title' => $questions[0]->title, 'value' => $value, 'parent_id' => $questions[0]->parent_id];
                $pointData['threat']['points'] = $pointValue;

                if ($questions[1] && isset($questionAns[$questions[1]->id])) {
                    $pointData['threat']['questionAnswer'][] = ['id' => $questions[1]->id, 'title' => $questions[1]->title, 'value' => $questionAns[$questions[1]->id], 'parent_id' => $questions[1]->parent_id];
                }
            } else {
                $message[] = 'Threat question value is not added.';
            }

            endThreat:

            // ---------------------- end threat calculation --------------------------------//

            // ----------------------------- doneByElse  ------------------------- //

            $questions = SalesPolicyQuestion::where('key', 'doneByElse')->orderBy('sequence')->get();

            if (count($questions) > 2) {
                $data = [];
                $policy = SalesRiskPolicy::where('parent_id', $questions[0]->policy_id)->orderBy('sequence')->get();

                if (isset($questionAns[$questions[0]->id]) && isset($policy[0]))
                    $value = $questionAns[$questions[0]->id];
                else {
                    $message[] = 'Done By Else section policy or question value is not added.';
                    goto endDoneByElse;
                }

                if ($value == 'no') {
                    $points += (float) json_decode($policy[0]->value)->no->point;
                    $pointValue = json_decode($policy[0]->value)->no->point;
                    $policyIdList[$policy[0]->id] = 'no';
                    $data[] = ['id' => $questions[0]->id, 'title' => $questions[0]->title, 'value' => 'No', 'parent_id' => $questions[0]->parent_id];
                } else {

                    if (isset($questionAns[$questions[1]->id]) && isset($policy[1])) $value = $questionAns[$questions[1]->id];
                    else {
                        $message[] = 'Done By Else section: 2nd Policy or 2nd Question value is not added.';
                        goto endDoneByElse;
                    }

                    if ($value == 'yes') {
                        $points += (float) json_decode($policy[1]->value)->yes->point;
                        $pointValue = json_decode($policy[1]->value)->yes->point;
                    } else {
                        $points += (float) json_decode($policy[1]->value)->no->point;
                        $pointValue = json_decode($policy[1]->value)->no->point;
                    }

                    $data[] = ['id' => $questions[1]->id, 'title' => $questions[1]->title, 'value' => $value, 'parent_id' => $questions[1]->parent_id];
                    $policyIdList[$policy[1]->id] = $value;
                }

                $pointData['doneByElse']['points'] = $pointValue;
                $pointData['doneByElse']['questionAnswer'] = $data;
            } else $message[] = 'Done By Else section questions are not added.';

            endDoneByElse:

            // ----------------------------- end doneByElse ------------------------- //

            // ---------------------------- routeWork, availableWeekend, firstSubmission, acceptPriceProposal ------------------------------//

            foreach (['routeWork', 'availableWeekend', 'firstSubmission', 'acceptPriceProposal'] as $item) {
                $questions = SalesPolicyQuestion::where('key', $item)->orderBy('sequence')->get();
                if (count($questions) > 0) {

                    $policy = SalesRiskPolicy::where('parent_id', $questions[0]->policy_id)->get();

                    if (isset($questionAns[$questions[0]->id]))
                        $value = $questionAns[$questions[0]->id];
                    else {
                        $message[] = "$item value is not added.";
                        continue;
                    }

                    if ($value == 'yes') {
                        $points += (float) json_decode($policy[0]->value)->yes->point;
                        $pointData[$item]['points'] = json_decode($policy[0]->value)->yes->point;
                    } else {
                        $points += (float) json_decode($policy[0]->value)->no->point;
                        $pointData[$item]['points'] = json_decode($policy[0]->value)->no->point;
                    }
                    $policyIdList[$policy[0]->id] = $value;

                    $pointData[$item]['questionAnswer'][] = ['id' => $questions[0]->id, 'title' => $questions[0]->title, 'value' => $value, 'parent_id' => $questions[0]->parent_id];

                    if (isset($questions[1]) && isset($questionAns[$questions[1]->id]))
                        $pointData[$item]['questionAnswer'][] = ['id' => $questions[1]->id, 'title' => $questions[1]->title, 'value' => $questionAns[$questions[1]->id], 'parent_id' => $questions[1]->parent_id];
                    else {
                        $message[] = "$item value is not added.";
                        continue;
                    }
                } else {
                    $message[] = "$item questions are not added.";
                }
            }


            // ---------------------------- end routeWork, availableWeekend, firstSubmission, acceptPriceProposal ------------------------------ //


            // ----------------------------- common calculations -------------------------- //

            // ------------------------------ clientCountry country --------------------------- //
            $policy = SalesRiskPolicy::where('key', 'clientCountry')->first();

            if (!$policy) {
                $message[] = 'Client\'s Country policy not found.';
                goto endClientCountry;
            }

            $policies = SalesRiskPolicy::where('parent_id', $policy->id)->get();

            $lead = Lead::find($deal->lead_id);
            foreach ($policies as $item) {

                $countries = json_decode($item->value, true);
                foreach ($countries as $country) {
                    if ($lead->country == array_values($country)[0]) {
                        $points += $item->points;
                        $pointData['clientCountry']['questionAnswer'][] = ['title' => 'From which country does the client originate?', 'value' => array_values($country)[0], 'parent_id' => null];
                        $pointData['clientCountry']['points'] = $item->points;
                        $policyIdList[$item->id] = $item->id;
                        goto endClientCountry;
                    }
                }
            }
            $pointData['clientCountry']['questionAnswer'][] = ['title' => 'From which country does the client originate?', 'value' => $lead->country, 'parent_id' => 'question_id'];
            $pointData['clientCountry']['points'] = 0;
            endClientCountry:
            // ------------------------------ end clientCountry country --------------------------- //

            // --------------------------------- projectDeadline -------------------------- //
            $policy = SalesRiskPolicy::where('key', 'projectDeadline')->first();

            if ($policy) {
                $policies = SalesRiskPolicy::where('parent_id', $policy->id)->get();
                $d1 = new DateTime("$deal->start_date 00:00:00");
                $d2 = new DateTime("$deal->deadline 23:59:59");
                $interval = $d1->diff($d2);
                $deadline = $interval->d;
                $pointValue = 0;
                $data = [];

                foreach ($policies as $item) {

                    switch ($item->type) {
                        case 'lessThan':
                            if ($deadline < $item->value) {
                                $pointValue = $item->points;
                                $policyIdList[$item->id] = $item->id;
                                $data = ['title' => 'Less Then', 'value' => $item->value, 'parent_id' => 'question_id'];
                                goto endProjectDeadline;
                            }
                            break;
                        case 'greaterThan':
                            if ($deadline > $item->value) {
                                $pointValue = $item->points;
                                $policyIdList[$item->id] = $item->id;
                                $data = ['title' => 'Greater Then', 'value' => $item->value, 'parent_id' => 'question_id'];
                                goto endProjectDeadline;
                            }
                            break;
                        case 'fixed':
                            if ($deadline == $item->value) {
                                $pointValue = $item->points;
                                $policyIdList[$item->id] = $item->id;
                                $data = ['title' => 'Fixed', 'value' => $item->value, 'parent_id' => 'question_id'];
                                goto endProjectDeadline;
                            }
                            break;
                        case 'range':
                            $value = explode(',', $item->value);
                            if ($deadline >= $value[0] && $deadline <= $value[1]) {
                                $pointValue = $item->points;
                                $policyIdList[$item->id] = $item->id;
                                $data = ['title' => 'Range', 'value' => $value[0] . ' - ' . $value[1], 'parent_id' => 'question_id'];
                                goto endProjectDeadline;
                            }
                            break;
                    }
                }

                endProjectDeadline:

                $points += (float) $pointValue;
                $pointData['projectDeadline']['points'] = $pointValue;
                $pointData['projectDeadline']['questionAnswer'][] = ['title' => 'What is the deadline for this project?', 'value' => $deadline, 'parent_id' => null];
                $data ? $pointData['projectDeadline']['questionAnswer'][] = $data : '';
            } else
                $message[] = 'Project Deadline policy not found.';

            // --------------------------------- end projectDeadline -------------------------- //

            // -------------------------------- projectBudget -------------------------------------- //
            $policy = SalesRiskPolicy::where('key', 'projectBudget')->first();
            if ($policy) {
                $policies = SalesRiskPolicy::where('parent_id', $policy->id)->get();
                $pointValue = 0;
                $data = [];
                foreach ($policies as $item) {

                    switch ($item->type) {
                        case 'lessThan':
                            if ($deal->amount < $item->value) {
                                $pointValue = $item->points;
                                $policyIdList[$item->id] = $item->id;
                                $data = ['title' => 'Less Then', 'value' => $item->value];
                                goto endProjectBudget;
                            }
                            break;
                        case 'greaterThan':
                            if ($deal->amount > $item->value) {
                                $pointValue = $item->points;
                                $policyIdList[$item->id] = $item->id;
                                $data = ['title' => 'Greater Then', 'value' => $item->value];
                                goto endProjectBudget;
                            }
                            break;
                        case 'fixed':
                            if ($deal->amount == $item->value) {
                                $pointValue = $item->points;
                                $policyIdList[$item->id] = $item->id;
                                $data = ['title' => 'Fixed', 'value' => $item->value];
                                goto endProjectBudget;
                            }
                            break;
                        case 'range':
                            $value = explode(',', $item->value);
                            if ($deal->amount >= $value[0] && $deal->amount <= $value[1]) {
                                $pointValue = $item->points;
                                $policyIdList[$item->id] = $item->id;
                                $data = ['title' => 'Range', 'value' => $value[0] . ' - ' . $value[1], 'parent_id' => 'question_id'];
                                goto endProjectBudget;
                            }
                            break;
                    }
                }

                endProjectBudget:
                $points += (float) $pointValue;
                $pointData['projectBudget']['points'] = $pointValue;
                $pointData['projectBudget']['questionAnswer'][] = ['title' => 'What is the budget for this project?', 'value' => number_format($deal->amount, 2), 'parent_id' => null];
                $data ? $pointData['projectBudget']['questionAnswer'][] = $data : '';
            } else
                $message[] = "Project Budget policy is not added.";
            // -------------------------------- end projectBudget -------------------------------------- //

            $calculationData = ['points' => $points, 'pointData' => $pointData, 'policyIdList' => $policyIdList, 'message' => $message];

            // store policy histroy
            self::policyHistoryStore($deal->id, $calculationData);

            return $calculationData;
        } catch (\Throwable $th) {
            // throw $th;
            return ['points' => null, 'error' => $th->getMessage()];
        }
    }

    function policyHistoryStore($deal_id, $calculationData)
    {
        $data = SalesRiskPolicy::where('parent_id', null)->where('status', '1')->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'key' => $item->key,
                    'ruleList' => SalesRiskPolicy::where('parent_id', $item->id)->get(['id', 'title',  'type', 'parent_id', 'value_type', 'value', 'points', 'status', 'comment']),
                    'department' => [
                        'id' => $item->department,
                        'name' => Team::with('childs')->find($item->department)->team_name
                    ],
                    'status' => $item->status,
                    'comment' => $item->comment
                ];
            });

        PolicyPointHistory::updateOrCreate(
            ['deal_id' => $deal_id],
            [
                'policy' => json_encode($data),
                'points' => $calculationData['points'],
                'point_report' => json_encode($calculationData)
            ]
        );
    }

    function questionValueReport($deal_id)
    {
        $data['deal'] = $deal =  Deal::find($deal_id);
        $data['user'] = User::whereId($deal->added_by)->first(['id', 'name']);
        $data['authorizeBy'] = $deal->sale_authorize_by ? User::whereId($deal->sale_authorize_by)->first(['id', 'name']) : null;

        //get Date diff as intervals
        $d1 = new DateTime("$deal->start_date 00:00:00");
        $d2 = new DateTime("$deal->deadline 23:59:59");
        $interval = $d1->diff($d2);
        $data['deadline'] = $interval->d;

        if (auth()->user()->role_id != 1) {



            return response()->json(['status' => 'error', 'message' => 'Not authorized.']);
        }
        try {

            $calculation = self::calculatePolicyPoint($deal_id);
            // self::policyHistoryStore($deal_id);

            if ($calculation['points'] === null) {
                return response()->json(['status' => 'error', 'message' => $calculation['error'], 'data' => ['points' => null]]);
            }

            $data['policyHistory'] = PolicyPointHistory::where('deal_id', $deal->id)->first();
            $data['policyHistory'] = $data['policyHistory'] ? json_decode($data['policyHistory']->policy) : null;

            // compact('deal', 'points', 'pointData', 'message', 'user', 'deadline')
            return response()->json(['status' => 'success', 'data' => array_merge($calculation, $data)]);
        } catch (\Throwable $th) {
            // throw $th;
            return response()->json(['status' => 'error', 'message' => 'Internal error occured'], 500);
        }
    }

    function salesRiskReportList(Request $req)
    {
        if (url()->current() == route('account.sale-risk-policies.report-data')) {
            $itemsPaginated = Deal::whereIn('sale_analysis_status', ['analysis', 'authorized', 'auto-authorized', 'denied'])
                ->where(function ($query) use ($req) {
                    if ($req->start_date) {
                        $query->whereDate('created_at', '>=', $req->start_date);
                    }
                    if ($req->end_date) {
                        $query->whereDate('created_at', '<=', $req->end_date);
                    }
                    if ($req->client_id) {
                        $query->where('client_id', $req->client_id);
                    }
                })
                ->offset($req->input('limit', 10) * ($req->input('page', 1) - 1))
                ->latest('updated_at')
                ->paginate($req->input('limit', 10));

            $itemsTransformed = $itemsPaginated
                ->getCollection()
                ->map(function ($item) {

                    $lead = Lead::find($item->lead_id);
                    $user = $item->sale_authorize_by ?  User::find($item->sale_authorize_by) : null;
                    $data = [
                        'client_id' => $item->client_id,
                        'client_name' => $item->client_name,
                        'deal_id' => $item->id,
                        'deal_name' => $item->deal_id,
                        'status' => $item->sale_analysis_status,
                        'project_name' => $item->project_name,
                        'project_budget' => $item->actual_amount,
                        'lead_id' => $item->lead_id,
                        'country' => $lead ? $lead->country : '',
                        'award_time' => $item->award_time,
                        'authorize_by_id' => $item->sale_authorize_by,
                        'authorize_on' => $item->sale_authorize_on,
                        'authorize_by_name' => $item->sale_authorize_by ? $user->name : null,
                        'authorize_by_photo' => $item->sale_authorize_by ? $user->image : null,
                    ];

                    if (auth()->user()->role_id == 1) {
                        $data['points'] = self::calculatePolicyPoint($item->id)['points'];
                    }

                    return $data;
                })->toArray();

            $data = new \Illuminate\Pagination\LengthAwarePaginator(
                $itemsTransformed,
                $itemsPaginated->total(),
                $itemsPaginated->perPage(),
                $itemsPaginated->currentPage(),
                [
                    'path' => FacadesRequest::url(),
                    'query' => [
                        'page' => $itemsPaginated->currentPage()
                    ]
                ]
            );

            return response()->json(['data' => $data]);
        }

        $this->pageTitle = 'Sales Analysis Reports';
        return view('sales-risk-policies.analysisReport', $this->data);
    }

    function authorizeDenyDeal($deal_id, $status)
    {
        if (auth()->user()->role_id != 1) {
            return response()->json(['status' => 'error', 'message' => 'Not authorized.']);
        }

        $deal = Deal::find($deal_id);
        if (!$deal) {
            return ['points' => null, 'error' => 'Deal not found'];
        }

        $dealStage = DealStage::where('lead_id', $deal->lead_id)->first();
        if ($status == '1') {
            $dealStage->won_lost = 'Yes';
            $deal->sale_analysis_status = 'authorized';
        } elseif ($status == '0') {
            $deal->sale_analysis_status = 'denied';
        }

        $deal->sale_authorize_by = auth()->user()->id;
        $deal->sale_authorize_on = date('Y-m-d h:i:s');
        $deal->save();
        $dealStage->save();

        return response()->json(['status' => 'successful', 'message' => 'Deal status updated.']);
    }

    function salesAnalysisReport(Request $req, $deal_id)
    {
        if (in_array('data', array_keys($req->query())) ) {
            return self::questionValueReport($deal_id);
        }

        return view('sales-risk-policies.salesAnalysisReport', $this->data);
    }
}
