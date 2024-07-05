<?php

namespace App\Http\Controllers;

use App\Events\SalesPolicyEvent;
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
use Carbon\Carbon;
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
        Route::controller(self::class)->middleware('auth')->prefix('account/sales-risk-policies')->name('account.sale-risk-policies.')->group(function () {

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
        Route::get('account/sales-analysis-report/{deal_id}', [self::class, 'salesAnalysisReport'])->name('account.sales-analysis-report');
    }

    function index()
    {
        if (auth()->user()->role_id != 1) /* admin */ {
            abort_403(user()->permission('manage_company_setting') !== 'all');
        }
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
        if (auth()->user()->role_id != 1) /* admin*/ {
            abort_403(user()->permission('manage_company_setting') !== 'all');
        }

        $validator = Validator::make($req->all(), [
            'title' => 'required',
            'department' => 'required',
            'key' => 'required|in:' . implode(',', array_keys(SalesRiskPolicy::$keys)),
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
        if (auth()->user()->role_id != 1) /* admin*/ {
            abort_403(user()->permission('manage_company_setting') !== 'all');
        }

        $validator = Validator::make($req->all(), [
            'title' => 'required',
            'department' => 'required',
            'key' => 'required|in:' . implode(',', array_keys(SalesRiskPolicy::$keys)),
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
        if (auth()->user()->role_id != 1) /* admin*/ {
            abort_403(user()->permission('manage_company_setting') !== 'all');
        }

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

        if (auth()->user()->role_id != 1) /* admin*/ {
            abort_403(user()->permission('manage_company_setting') !== 'all');
        }

        try {
            if ($req->policy_id) {
                // check if policy is parent or not
                $policy = SalesRiskPolicy::find($req->policy_id);
                if ($policy && $policy->parent_id == null) {

                    $data = [
                        'id' => $policy->id,
                        'title' => $policy->title,
                        'key' => $policy->key,
                        'ruleList' => SalesRiskPolicy::where('parent_id', $policy->id)->orderBy('sequence')->get(['id', 'title',  'type', 'parent_id', 'value_type', 'value', 'points', 'status', 'comment']),
                        'department' => [
                            'id' => $policy->department,
                            'name' => Team::with('childs')->find($policy->department)->team_name
                        ],
                        'status' => $policy->status,
                        'comment' => $policy->comment,
                        'questionCount' => SalesPolicyQuestion::parent()->where('policy_id', $policy->id)->count()
                    ];

                    return response()->json(['status' => 'success', 'data' => $data]);
                } else {
                    return response()->json(['status' => 'success', 'data' => SalesRiskPolicy::find($req->policy_id)]);
                }
            }

            if ($req->key) {

                $data = SalesRiskPolicy::where('key', $req->key)->get()->map(function ($item) {
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
            // throw $th;
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
            $policy->status = $status;
            $policy->save();

            // if policy parent
            if ($policy->parent_id == null)
                SalesRiskPolicy::where('parent_id', $id)->update(['status' => $status]);
            else if ($status == 1) {
                $count = SalesRiskPolicy::where(['parent_id' => $policy->parent_id, 'status' => '1'])->count();
                if ($count > 0) SalesRiskPolicy::whereId($policy->parent_id)->update(['status' => '1']);
            } else {
                $count = SalesRiskPolicy::where('parent_id', $policy->parent_id)->where('status', '1')->count();
                if ($count == 0) SalesRiskPolicy::whereId($policy->parent_id)->update(['status' => '0']);
            }

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
        if (auth()->user()->role_id != 1) /* admin*/ {
            abort_403(user()->permission('manage_company_setting') !== 'all');
        }
        $this->pageTitle = 'Sales Risk Question List';
        return view('sales-risk-policies.questionIndex', $this->data);
    }

    function questionInputField()
    {
        $types = SalesPolicyQuestion::$types;
        $questionKeys = SalesRiskPolicy::$keys;
        $policies = SalesRiskPolicy::whereNull('parent_id')->get(['id', 'title', 'key']);
        $questionList = SalesPolicyQuestion::get(['id', 'title', 'key', 'type', 'value', 'parent_id', 'policy_id']);

        // get yes no rules
        $yesNoRules = [];
        if ($policy = SalesRiskPolicy::where('key', 'yesNoRules')->first()) {
            $freeRuleIds = SalesPolicyQuestion::where('key', 'yesNoRules')->pluck('value');
            $yesNoRules = SalesRiskPolicy::where('parent_id', $policy->id)->whereNotIn('id', $freeRuleIds)->get(['id', 'title']);
        }

        return response()->json(['data' => compact('types', 'questionKeys', 'policies', 'questionList', 'yesNoRules')]);
    }

    function policyQuestionSave(Request $req)
    {
        if (auth()->user()->role_id != 1) /* admin*/ {
            abort_403(user()->permission('manage_company_setting') !== 'all');
        }

        $validator = Validator::make($req->all(), [
            'title' => 'required',
            'key' => 'required|in:' . implode(',', array_keys(SalesRiskPolicy::$keys)),
            'type' => 'required|in:' . implode(',', array_keys(SalesPolicyQuestion::$types)),
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
            $data = [
                'title' => $req->title,
                'key' => $req->key,
                'type' => $req->type,
                'value' => $req->value,
                'parent_id' => $req->parent_id,
                'sequence' => SalesPolicyQuestion::where('key', $req->key)->count() + 1,
                'policy_id' => $req->policy_id,
                'placeholder' => $req->placeholder,
                'comment' => $req->comment
            ];

            SalesPolicyQuestion::create($data);
        } catch (\Throwable $th) {
            // throw $th;
            return response()->json(['status' => 'error', 'message' => 'Data not saved correctly.'], 500);
        }

        return response()->json(['status' => 'success', 'message' => 'Question added successfully']);
    }

    function policyQuestionEdit(Request $req, $id)
    {
        $validator = Validator::make($req->all(), [
            'title' => 'required',
            'key' => 'required|in:' . implode(',', array_keys(SalesRiskPolicy::$keys)),
            'type' => 'required|in:' . implode(',', array_keys(SalesPolicyQuestion::$types)),
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
                $data = [
                    'id' => $item->id,
                    'title' => $item->title,
                    'key' => $item->key,
                    'type' => $item->type,
                    'value' => json_decode($item->value) ?: $item->value,
                    'placeholder' => $item->placeholder,
                    'parent_id' => $item->parent_id,
                    'policy_id' => $item->policy_id,
                    'policy_title' => SalesRiskPolicy::find($item->policy_id)->title,
                    'comment' => $item->comment,
                    'questions' => self::questionListChild($item->id)
                ];
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
                    'comment' => $item->comment,
                    'questions' => self::questionListChild($item->id)
                ];

                if ($question && $question->id == $item->id) $data['currency'] = true;

                return $data;
            });
        }
        return $list;
    }

    function salesPolicyQuestionRender(Request $req, $deal_id)
    {
        $this->pageTitle = 'Sale Risk Analysis';

        $req->session()->put('deal_id', $deal_id);

        $deal = Deal::find($deal_id);
        if (in_array($deal->sale_analysis_status, ['authorized', 'auto-authorized'])) {
            return redirect()->route('edit-deal-details', $deal_id);
        }

        $data = $this->data;
        $data['dealStatus'] = $deal->sale_analysis_status;
        $data['addedBefore'] = PolicyQuestionValue::where('deal_id', $deal_id)->count() > 0;
        $data['redirectUrl'] = route('edit-deal-details', $deal_id);
        // Note: big form route : route('dealDetails', $deal->id)

        return view('deals.sales-questions-render', $data);
    }

    function renderQuestionList(Request $req)
    {
        try {
            $deal = Deal::find($req->session()->get('deal_id'));
            $dealStage = DealStage::where('short_code', $deal->deal_id)->first();

            $data = SalesPolicyQuestion::parent()
                ->where(function ($query) use ($dealStage) {
                    // excluding weekend question except Saturday and Sunday deal's
                    if (!in_array(Carbon::parse($dealStage->updated_at)->format('D'), ['Sat', 'Sun']))
                        $query->whereNot('key', 'availableWeekend');
                    else if (Carbon::parse($dealStage->updated_at)->format('D') == 'Fri' && Carbon::parse($dealStage->updated_at)->format('H') < 17)
                        $query->whereNot('key', 'availableWeekend');
                })
                ->get()
                ->filter(fn ($item) => SalesRiskPolicy::find($item->policy_id)->status)
                ->filter(function ($item) {
                    if ($item->key == 'yesNoRules')
                        return SalesRiskPolicy::find($item->value)->status;
                    else
                        return true;
                })
                ->map(function ($item) {

                    // check if rule is enable
                    if ($item->key == 'yesNoRules' && SalesRiskPolicy::find($item->value)->status == 0) return;

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
                        'comment' => $item->comment,
                        'questions' => self::questionListChild($item->id)
                    ];
                    return $data;
                })->toArray();

            $currency = Currency::find($deal->original_currency_id);

            return response()->json(['status' => 'success', 'data' => ['questionList' => array_values($data), 'currency' => [$currency->currency_code, $currency->currency_name, $currency->currency_symbol]]]);
        } catch (\Throwable $th) {
            // throw $th;
            return response()->json(['status' => 'error', 'message' => $th->getMessage(), 'code' => $th->getLine()]);
        }
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

        DB::beginTransaction();
        try {

            $policyQuestionValue = PolicyQuestionValue::create([
                'deal_id' => $dealId,
                'values' => json_encode($req->all()),
                'question_list' => json_encode(SalesPolicyQuestion::get()),
                'submitted_by' => auth()->user()->id
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
                $deal->sale_analysis_status = 'auto-authorized';
                $deal->sale_authorize_on = date('Y-m-d h:i:s');

                if ($dealStage = DealStage::where('lead_id', $deal->lead_id)->first()) {
                    $dealStage->won_lost = 'Yes';
                    $dealStage->status = 'pending';
                    $dealStage->save();
                }

                // pending action for sales lead authorization
                event(new SalesPolicyEvent('sales_lead_authorization', $deal));
            } else {
                $deal->sale_analysis_status = 'analysis';
                event(new SalesPolicyEvent('sales_risk_authorization', $deal, ['questionValue' => $policyQuestionValue, 'points' => $calculation['points']]));
            }

            $deal->save();

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Questions values stored successfully.',
                'redirectUrl' => route('edit-deal-details', $dealId),
                'data' => ['points' => $calculation['points'] > 0 ? 0 : -1]
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            // if error then delete previous records
            PolicyQuestionValue::where('deal_id', $dealId)->delete();

            // throw $th;
            return response()->json(['status' => 'error', 'message' => 'Data did not stored successfully.'], 500);
        }
    }

    function calculatePolicyPoint($deal_id, $questionValues = null)
    {
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

        // format questions values with index
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

            $hourlyRate = round($deal->amount / $hours);

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
            $pointData['hourlyRate']['message'][] = 'Hourly rate (' . $hourlyRate . ') not matched with any conditions';
            endHourlyRate:

            // --------------------- end hourly rate calculation ------------------ //

            // ---------------------- milestone calculation ------------------------------- //
            $questions = SalesPolicyQuestion::where('key', 'milestone')->orderBy('sequence')->get();
            if (count($questions) < 3) {
                $pointData['milestone']['message'][] = '3 milestone questions are expected, ' . count($questions) . ' found.';
                goto endMilestone;
            }

            $policy = SalesRiskPolicy::where('parent_id', $questions[0]->policy_id)->orderBy('sequence')->get();

            if (count($policy) < 1) {
                $pointData['milestone']['message'][] = '2 milestone policies are expected, ' . count($policy) . ' found.';
                goto endMilestone;
            }

            $data = [];

            // safety check
            if (isset($questionAns[$questions[0]->id]))
                $value = $questionAns[$questions[0]->id];
            else {
                $pointData['milestone']['message'][] = 'All milestone questions values are not defined.';
                goto endMilestone;
            }

            // check first question is yes
            if ($value == 'yes') {
                $pointValue = json_decode($policy[0]->value) ? json_decode($policy[0]->value)->yes->point : 0;
                $points += (float) $pointValue;
                $policyIdList[$policy[0]->id] = 'yes';

                $data[] = ['id' => $questions[0]->id, 'title' =>  $questions[0]->title, 'value' => 'yes', 'parent_id' => null];
            } else {
                $data[] = ['id' => $questions[0]->id, 'title' =>  $questions[0]->title, 'value' => 'No', 'parent_id' => null];
                // unsetting first yes/no policy
                $policyIdList[$policy[0]->id] = 'no';

                // ------------------- percentage calculation
                if (isset($questionAns[$questions[1]->id]))
                    $value = $questionAns[$questions[1]->id];
                else {
                    $pointData['milestone']['message'][] = 'Milestone total amount not found.';
                    goto endMilestone;
                }
                // dd($value, $deal->actual_amount);
                $percentage = $value / $deal->actual_amount * 100;
                // ------------------- end percentage calculation

                $data[] = ['id' => $questions[1]->id, 'title' => $questions[1]->title, 'value' => $value . '(' . number_format($percentage, 2) . '%)', 'parent_id' => $questions[1]->parent_id];

                // get selection value
                if (isset($questionAns[$questions[2]->id]))
                    $value = $questionAns[$questions[2]->id];
                else {
                    $pointData['milestone']['message'][] = 'Milestone selected list data not found.';
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
                        if ($percentage < 50) {
                            $points += -2;
                            $pointValue = -2;
                        } else {
                            $points += -1;
                            $pointValue = -1;
                        }
                        break;
                    case $questions[0]->policy_id . '_4':
                        if ($percentage < 50) {
                            $points += -1;
                            $pointValue = -1;
                        } else {
                            $points += -0.5;
                            $pointValue = -0.5;
                        }
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
                    $pointData['threat']['message'][] = 'Threat question value is not added.';
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
                $pointData['threat']['message'][] = 'Threat question value is not added.';
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
                    $pointData['doneByElse']['message'][] = 'Done By Else section policy or question value is not added.';
                    goto endDoneByElse;
                }

                if ($value == 'no') {
                    $points += (float) json_decode($policy[0]->value)->no->point;
                    $pointValue = json_decode($policy[0]->value)->no->point;
                    $policyIdList[$policy[0]->id] = 'no';
                    $data[] = ['id' => $questions[0]->id, 'title' => $questions[0]->title, 'value' => 'No', 'parent_id' => null];
                } else {
                    $data[] = ['id' => $questions[0]->id, 'title' => $questions[0]->title, 'value' => 'Yes', 'parent_id' => null];

                    if (isset($questionAns[$questions[1]->id]) && isset($policy[1])) $value = $questionAns[$questions[1]->id];
                    else {
                        $pointData['doneByElse']['message'][] = 'Done By Else section: 2nd Policy or 2nd Question value is not added.';
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

                    if (isset($questions[2]) && isset($questionAns[$questions[2]->id])) {
                        $value = $questionAns[$questions[2]->id];
                        $data[] = ['id' => $questions[2]->id, 'title' => $questions[2]->title, 'value' => $value, 'parent_id' => $questions[1]->parent_id];
                    }
                }

                $pointData['doneByElse']['points'] = $pointValue;
                $pointData['doneByElse']['questionAnswer'] = $data;
            } else $pointData['doneByElse']['message'][] = 'Done By Else section questions are not added.';

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
                        $pointData[$item]['message'][] = "$item value is not added.";
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

                    $pointData[$item]['questionAnswer'][] = ['id' => $questions[0]->id, 'title' => $questions[0]->title, 'value' => $value, 'parent_id' => null];

                    if (isset($questions[1]) && isset($questionAns[$questions[1]->id]))
                        $pointData[$item]['questionAnswer'][] = ['id' => $questions[1]->id, 'title' => $questions[1]->title, 'value' => $questionAns[$questions[1]->id], 'parent_id' => $questions[1]->parent_id];

                    if (isset($questions[2]) && isset($questionAns[$questions[2]->id]))
                        $pointData[$item]['questionAnswer'][] = ['id' => $questions[2]->id, 'title' => $questions[2]->title, 'value' => $questionAns[$questions[2]->id], 'parent_id' => $questions[2]->parent_id];
                } else {
                    $pointData[$item]['message'][] = "$item questions are not added.";
                }
            }
            // ---------------------------- end routeWork, availableWeekend, firstSubmission, acceptPriceProposal ------------------------------ //

            // -------------------------------- yesNoRules ------------------------------ //
            $questions = SalesPolicyQuestion::where('key', 'yesNoRules')->get();
            foreach ((object) $questions as $key => $item) {

                if (!isset($questionAns[$item->id])) continue;

                if ($item->parent_id == null) {
                    $rule = SalesRiskPolicy::where('id', $item->value)->first();
                    $value = $questionAns[$item->id];

                    if ($value == 'yes') {
                        $points += (float) json_decode($rule->value)->yes->point;
                        $pointData['yesNoRules' . $key]['points'] = json_decode($rule->value)->yes->point;
                    } else {
                        $points += (float) json_decode($rule->value)->no->point;
                        $pointData['yesNoRules' . $key]['points'] = json_decode($rule->value)->no->point;
                    }
                    $policyIdList[$rule->id] = $value;
                    $pointData['yesNoRules' . $key]['questionAnswer'][] = ['id' => $item->id, 'title' => $item->title, 'value' => $value, 'parent_id' => null];
                } else {
                    $value = $questionAns[$item->id];
                    $pointData['yesNoRules' . $key]['questionAnswer'][] = ['id' => $item->id, 'title' => $item->title, 'value' => $value, 'parent_id' => $item->parent_id];
                }
            }

            // -------------------------------- end yesNoRules ------------------------------ //

            // ----------------------------- common calculations -------------------------- //

            // ------------------------------ clientCountry country --------------------------- //
            $policy = SalesRiskPolicy::where(['key' => 'clientCountry', 'status' => '1'])->first();

            if (!$policy) {
                $pointData['clientCountry']['message'][] = 'Client\'s Country policy not found.';
                goto endClientCountry;
            }

            $policies = SalesRiskPolicy::where('parent_id', $policy->id)->get();

            $client = User::find($deal->client_id);
            if (!$client || $client->country_id == null) {
                $pointData['clientCountry']['message'][] = 'Client\'s country is not found. ';
                goto endClientCountry;
            }

            $clientCountry = Country::find($client->country_id);
            foreach ($policies as $item) {
                $countries = json_decode($item->value, true);
                foreach ($countries as $country) {
                    if ($clientCountry->iso == array_keys($country)[0]) {
                        $points += $item->points;
                        $pointData['clientCountry']['questionAnswer'][] = ['title' => 'From which country does the client originate?', 'value' => $clientCountry->name, 'parent_id' => null];
                        $pointData['clientCountry']['points'] = $item->points;
                        $policyIdList[$item->id] = $item->id;
                        goto endClientCountry;
                    }
                }
            }
            $pointData['clientCountry']['message'][] = 'Client\'s Country '. $clientCountry->name .' not matched with policy.';
            endClientCountry:
            // ------------------------------ end clientCountry country --------------------------- //

            // --------------------------------- projectDeadline -------------------------- //
            $policy = SalesRiskPolicy::where(['key' => 'projectDeadline', 'status' => '1'])->first();

            if ($policy) {
                $policies = SalesRiskPolicy::where('parent_id', $policy->id)->get();

                $d1 = date_create($deal->start_date);
                $d2 = date_create($deal->deadline);
                $diff = date_diff($d1, $d2);
                $deadline = (int) $diff->format("%a");
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
                $pointData['projectDeadline']['questionAnswer'][] = ['title' => 'What is the deadline for this project?', 'value' => $deadline . ' Days', 'parent_id' => null];
                $data ? $pointData['projectDeadline']['questionAnswer'][] = $data : '';
            } else
                $pointData['projectDeadline']['message'][] = 'Project Deadline policy not found.';

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
                                $data = ['title' => 'Less Then', 'value' => $item->value, 'parent_id' => 'question_id'];
                                goto endProjectBudget;
                            }
                            break;
                        case 'greaterThan':
                            if ($deal->amount > $item->value) {
                                $pointValue = $item->points;
                                $policyIdList[$item->id] = $item->id;
                                $data = ['title' => 'Greater Then', 'value' => $item->value, 'parent_id' => 'question_id'];
                                goto endProjectBudget;
                            }
                            break;
                        case 'fixed':
                            if ($deal->amount == $item->value) {
                                $pointValue = $item->points;
                                $policyIdList[$item->id] = $item->id;
                                $data = ['title' => 'Fixed', 'value' => $item->value, 'parent_id' => 'question_id'];
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
                $pointData['projectBudget']['questionAnswer'][] = ['title' => 'What is the budget for this project?', 'value' => '$' . number_format($deal->amount, 2), 'parent_id' => null];
                $data ? $pointData['projectBudget']['questionAnswer'][] = $data : '';
            } else
                $pointData['projectBudget']['message'][] = "Project Budget policy is not added.";
            // -------------------------------- end projectBudget -------------------------------------- //

            $calculationData = ['points' => $points, 'pointData' => $pointData, 'policyIdList' => $policyIdList, 'message' => $message];

            // store policy history
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

        PolicyPointHistory::create([
            'deal_id' => $deal_id,
            'policy' => json_encode($data),
            'points' => $calculationData['points'],
            'point_report' => json_encode($calculationData)
        ]);
    }

    function questionValueReport($deal_id)
    {
        $data['deal'] = $deal =  Deal::find($deal_id);
        $data['user'] = User::whereId($deal->added_by)->first(['id', 'name']);
        $data['authorizeBy'] = $deal->sale_authorize_by ? User::whereId($deal->sale_authorize_by)->first(['id', 'name']) : null;

        //get Date diff as intervals

        $d1 = date_create($deal->start_date);
        $d2 = date_create($deal->deadline);
        $diff = date_diff($d1, $d2);
        $data['deadline'] = (int) $diff->format("%a");

        if (auth()->user()->role_id != 1) {

            if (!$questionValues = PolicyQuestionValue::where('deal_id', $deal_id)->first()) {
                return response()->json(['status' => 'error', 'message' => 'Question value not found'], 500);
            }

            $questionList = json_decode($questionValues->question_list);
            $questionList = collect($questionList);
            $questionData = [];
            foreach (json_decode($questionValues->values) as $item) {

                $qsion = $questionList->firstWhere('id', $item->id);
                if ($qsion) {
                    if ($qsion->key == 'milestone' && $qsion->type == 'list') {
                        $listItem = collect(json_decode($qsion->value));
                        $listItem = $listItem->firstWhere('id', $item->value);
                        $questionData[] = ['id' => $item->id, 'title' => $qsion->title, 'value' => $listItem->title, 'key' => $qsion->key];
                    } else $questionData[] = ['id' => $item->id, 'title' => $qsion->title, 'value' => $item->value, 'key' => $qsion->key];
                }
            }

            $data['questionData'] = $questionData;
            return response()->json(['status' => 'success', 'data' => $data]);
        }

        try {

            $calculation = self::calculatePolicyPoint($deal_id);

            if ($calculation['points'] === null) {
                return response()->json(['status' => 'error', 'message' => $calculation['error'], 'data' => ['points' => null]]);
            }

            $data['policyHistory'] = PolicyPointHistory::where('deal_id', $deal->id)->first();
            $data['policyHistory'] = $data['policyHistory'] ? json_decode($data['policyHistory']->policy) : null;

            // compact('deal', 'points', 'pointData', 'message', 'user', 'deadline')
            return response()->json(['status' => 'success', 'data' => array_merge($calculation, $data)]);
        } catch (\Throwable $th) {
            // throw $th;
            return response()->json(['status' => 'error', 'message' => 'Internal error occurred'], 500);
        }
    }

    function salesRiskReportList(Request $req)
    {
        if (url()->current() == route('account.sale-risk-policies.report-data')) {
            $itemsPaginated = Deal::select('deals.id', 'client_id', 'client_name', 'deals.deal_id', 'sale_analysis_status', 'project_name', 'actual_amount', 'lead_id', 'award_time', 'sale_authorize_by', 'sale_authorize_on', 'sale_authorize_by', 'submitted_by')
                ->whereIn('sale_analysis_status', ['analysis', 'authorized', 'auto-authorized', 'denied'])
                ->leftJoin('policy_question_values as pqv', 'pqv.deal_id', 'deals.id')
                ->where(function ($query) use ($req) {
                    if (!in_array(auth()->user()->role_id, [1, 8])) $query->where('submitted_by', auth()->user()->id);

                    if ($req->start_date && $req->end_date) $query->whereBetween('deals.created_at', [$req->start_date, $req->end_date]);
                    if ($req->client_id) $query->where('client_id', $req->client_id);
                    if ($req->status) {
                        if ($req->status == 'pending') $query->where('sale_analysis_status', 'analysis');
                        elseif ($req->status == 'authorized') $query->whereIn('sale_analysis_status', ['authorized', 'auto-authorized']);
                        elseif ($req->status == 'denied') $query->where('sale_analysis_status', 'denied');
                    }
                })
                ->offset($req->input('limit', 10) * ($req->input('page', 1) - 1))
                ->latest('deals.updated_at')
                ->paginate($req->input('limit', 10));

            $itemsTransformed = $itemsPaginated
                ->getCollection()
                ->map(function ($item) {
                    $country = User::find($item->client_id)->country;
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
                        'country' => $country ? $country->name : '',
                        'award_time' => $item->award_time,
                        'authorize_by_id' => $item->sale_authorize_by,
                        'authorize_on' => $item->sale_authorize_on,
                        'authorize_by_name' => $item->sale_authorize_by ? $user->name : null,
                        'authorize_by_photo' => $item->sale_authorize_by ? $user->image : null,
                    ];

                    if (auth()->user()->role_id == 1) {
                        $data['submitted_by'] = $item->submitted_by;
                        $user = $item->submitted_by ? User::find($item->submitted_by) : (object)['name' => null, 'image' => null];
                        $data['submitted_by_name'] = $user->name;
                        $data['submitted_by_image'] = $user->image;
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
            $counts = Deal::select(DB::raw(
                "COUNT(IF( sale_analysis_status IN ('analysis', 'authorized', 'auto-authorized','denied'), 1, null)) as 'all',
                COUNT(IF( sale_analysis_status = 'analysis', 1, null)) as pending,
                COUNT(IF( sale_analysis_status IN ('authorized', 'auto-authorized'), 1, null)) as authorized,
                COUNT(IF( sale_analysis_status = 'denied', 1, null)) as denied"
            ))->leftJoin('policy_question_values as pqv', 'pqv.deal_id', 'deals.id')
                ->whereIn('sale_analysis_status', ['analysis', 'authorized', 'auto-authorized', 'denied'])
                ->where(function ($query) use ($req) {
                    if (!in_array(auth()->user()->role_id, [1, 8])) $query->where('submitted_by', auth()->user()->id);
                    if ($req->client_id) $query->where('client_id', $req->client_id);
                })->whereBetween('deals.created_at', [$req->start_date, $req->end_date])->first();

            $extra = collect(['counts' => $counts]);
            $data = $extra->merge($data);

            return response()->json(['data' => $data]);
        }

        $this->pageTitle = 'Sales Analysis Reports';
        return view('sales-risk-policies.analysisReport', $this->data);
    }

    function authorizeDenyDeal(Request $req, $deal_id, $status)
    {
        if (auth()->user()->role_id != 1) {
            return response()->json(['status' => 'error', 'message' => 'Not authorized.']);
        }

        $deal = Deal::find($deal_id);
        if (!$deal) {
            return ['points' => null, 'error' => 'Deal not found'];
        }

        DB::beginTransaction();

        if ($status == '1') {
            $deal->sale_analysis_status = 'authorized';
            $deal->sale_authorize_on = date('Y-m-d h:i:s');

            if ($dealStage = DealStage::where('lead_id', $deal->lead_id)->first()) {
                $dealStage->won_lost = 'Yes';
                $dealStage->status = 'pending';
                $dealStage->save();
            }

            if ($deal->is_final) {
                $deal->is_drafted = 0;
                $deal->authorization_status = 2;
                $deal->released_at = Carbon::now();
                (new ContractController())->dealAssignPmAndLead($deal);
                event(new SalesPolicyEvent('sales_lead_authorization', $deal));
            } else event(new SalesPolicyEvent('pending_large_from_submission', $deal));

            // pending action post update
            event(new SalesPolicyEvent('sales_risk_authorization', $deal, ['past' => 'accept']));
        } elseif ($status == '0') {
            $deal->sale_analysis_status = 'denied';

            if ($dealStage = DealStage::where('lead_id', $deal->lead_id)->first()) {
                $dealStage->won_lost = 'No';
                $dealStage->deal_status = "Lost";
                $dealStage->save();
            }

            // pending action update
            event(new SalesPolicyEvent('sales_risk_authorization', $deal, ['past' => 'deny']));
        }

        $deal->sale_authorize_by = auth()->user()->id;
        $deal->sale_authorize_on = date('Y-m-d h:i:s');
        $deal->sale_authorize_comment = $req->comment;
        $deal->save();

        DB::commit();

        return response()->json(['status' => 'successful', 'message' => 'Deal status updated.']);
    }

    function salesAnalysisReport(Request $req, $deal_id)
    {
        if (in_array('data', array_keys($req->query()))) {
            return self::questionValueReport($deal_id);
        }

        return view('sales-risk-policies.salesAnalysisReport', $this->data);
    }
}
