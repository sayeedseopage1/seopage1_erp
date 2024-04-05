<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Deal;
use App\Models\DealStage;
use App\Models\Lead;
use App\Models\PolicyQuestionValue;
use App\Models\SalesPolicyQuestion;
use App\Models\SalesRiskPolicy;
use App\Models\Team;
use App\Models\User;
use DateTime;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;

class SalesRiskPolicyController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Sales Risk Policy';
        // $this->activeSettingMenu = 'sales_risk_policies';
        $this->middleware(function ($request, $next) {
            if (in_array(auth()->user()->role_id, [1, 8])) /* admin and sale */ {
                return $next($request);
            }
            abort_403(user()->permission('manage_company_setting') !== 'all');
        });
    }

    static function Routes()
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
        });

        Route::get('account/deals/risk-analysis/{deal_id}', [self::class, 'salesPolicyQuestionRender'])->name('account.sale-risk-policies.risk-analysis');
        Route::get('account/sales-analysis-reports', [self::class, 'salesRiskReport'])->name('account.sale-risk-policies.report-list');
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
            'key' => 'nullable',
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
                    'parent_id' => $policy->id
                ]);

                SalesRiskPolicy::create($rule);
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
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
            'key' => 'nullable',
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
                        'parent_id' => $policy->id
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
                'message' => 'Something went wrong while editing.',
            ]);
        }

        return response()->json();
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
                            'ruleList' => SalesRiskPolicy::where('parent_id', $item->id)->get(['id', 'title',  'type', 'parent_id', 'value_type', 'value', 'points', 'status', 'comment']),
                            'department' => [
                                'id' => $item->department,
                                'name' => Team::with('childs')->find($item->department)->team_name
                            ],
                            'status' => $item->status,
                            'comment' => $item->comment,
                            'questionCount' => SalesPolicyQuestion::where('policy_id', $item->id)->count()
                        ];
                    });

                    return response()->json(['status' => 'success', 'data' => $data]);
                } else {
                    return response()->json(['status' => 'success', 'data' => SalesRiskPolicy::find($req->policy_id)]);
                }
            }


            $itemsPaginated = SalesRiskPolicy::where('parent_id', null)->offset($req->input('limit', 10) * $req->input('page', 1))->paginate($req->input('limit', 10));
            $itemsTransformed = $itemsPaginated
                ->getCollection()
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
                        'comment' => $item->comment,
                        'questionCount' => SalesPolicyQuestion::where('policy_id', $item->id)->count()
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
            return response()->json(['status' => 'error', 'message' => 'Data not saved correctly.']);
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
        $questionList = SalesPolicyQuestion::get(['id', 'title', 'key', 'type', 'value', 'parent_id', 'policy_id',]);

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
            return response()->json(['status' => 'error', 'message' => 'Data not saved correctly.']);
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
            return response()->json(['status' => 'error', 'message' => 'Data not saved correctly.']);
        }
    }

    function questionList(Request $req)
    {
        $list = SalesPolicyQuestion::parent()
            ->where(function ($query) use ($req) {
                if ($req->policy_id)
                    $query->where('policy_id', $req->policy_id);
            })->get()
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
            });

        return response()->json(['status' => 'success', 'data' =>  $list]);
    }

    function questionListChild($parentId)
    {
        $list = SalesPolicyQuestion::where('parent_id', $parentId)->get();

        if (count($list)) {
            $list = $list->map(function ($item) {
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

        $data = $this->data;
        $data['addedBefor'] = PolicyQuestionValue::where('deal_id', $deal_id)->count() > 0;
        // Note: big form route : route('dealDetails', $deal->id)
        return view('deals.sales-questions-render', $data);
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

        $deal = Deal::find($dealId);
        if (!$deal) {
            return response()->json(['status' => 'error', 'message' => 'Deal is not valid.'], 500);
        }

        if (PolicyQuestionValue::where('deal_id', $dealId)->count() > 0) {
            return response()->json(['status' => 'error', 'message' => 'Deal question values are already added.'], 500);
        }

        DB::beginTransaction();
        try {
            foreach ($req->all() as $item) {
                $item = (object) $item;
                PolicyQuestionValue::create([
                    'question_id' => $item->id,
                    'value' => $item->value,
                    'deal_id' => $dealId
                ]);
            }

            // calculate point
            DB::commit();

            $calculation = self::calculatePolicyPoint($dealId);

            if ($calculation['points'] === null) {
                return response()->json(['status' => 'error', 'message' => $calculation['error']], 500);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Questions values stored successfully.',
                'redirectUrl' => route('dealDetails', $dealId),
                'data' => ['points' => $calculation['points']]
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
            return response()->json(['status' => 'error', 'message' => 'Data did not stored successfully.'], 500);
        }
    }

    /**
     *
     */
    function calculatePolicyPoint($deal_id)
    {
        // $dealStage = DealStage::find($deal_id);
        // dd($dealStage);
        $deal = Deal::find($deal_id);
        if (!$deal) {
            return ['points' => null, 'error' => 'Deal not found'];
        }

        if (!PolicyQuestionValue::where('deal_id', $deal_id)->first()) {
            return ['points' => null, 'error' => 'Policy question value not found'];
        }

        // dd($deal);
        try {

            // get rules id and calculate point
            $pointData = [];
            $points = (float) 0;

            // --------------------- hourly rate calculation ------------------ //
            // calculate first question key value (hourlyRate)
            //
            $questions = SalesPolicyQuestion::where('key', 'hourlyRate')->orderBy('sequence')->get();
            if (count($questions) < 1) {
                goto endHourlyRate;
            }

            $pointData['hourlyRate']['questionAnswer'] = [];
            $hours = 0;
            foreach ($questions as $item) {
                $data = [];
                $data['id'] = $item->id;
                $data['title'] = $item->title;
                $data['parent_id'] = $item->parent_id;

                $questionValue = PolicyQuestionValue::where([
                    'question_id' => $item->id,
                    'deal_id' => $deal_id
                ])->first();

                // safety check
                if ($questionValue)
                    $value = $questionValue->value;
                else
                    continue;

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
            $policy_id = $questions->first()->policy_id;
            $rules = SalesRiskPolicy::where('parent_id', $policy_id)->get();

            foreach ($rules as $item) {
                switch ($item->type) {
                    case 'lessThan':
                        if ($hourlyRate < $item->value) {
                            $points += $item->points;
                            $pointData['hourlyRate']['points'] = [$item->points, $hourlyRate];
                            goto endHourlyRate;
                            break;
                        }
                        break;
                    case 'range':
                        $value = explode(',', $item->value);
                        if ($hourlyRate > $value[0] && $hourlyRate < $value[1]) {
                            $points += $item->points;
                            $pointData['hourlyRate']['points'] = [$item->points, $hourlyRate];
                            goto endHourlyRate;
                            break;
                        }
                        break;
                    case 'greaterThan':
                        if ($hourlyRate > $item->value) {
                            $points += $item->points;
                            $pointData['hourlyRate']['points'] = [$item->points, $hourlyRate];
                            goto endHourlyRate;
                            break;
                        }
                        break;
                }
            }

            endHourlyRate:

            // --------------------- end hourly rate calculation ------------------ //

            // ---------------------- milestone calculation ------------------------------- //
            $questions = SalesPolicyQuestion::where('key', 'milestone')->orderBy('sequence')->get();
            $data = [];

            $questionValue = PolicyQuestionValue::where([
                'question_id' => $questions[0]->id,
                'deal_id' => $deal_id
            ])->first();

            // safety check
            if ($questionValue)
                $value = $questionValue->value;
            else
                goto endMilestone;

            // check first question is yes
            if ($value == 'yes') {
                $points += 1;
                $data[] = ['id' => $questions[0]->id, 'title' =>  $questions[0]->title, 'value' => 'yes', 'parent_id' => $questions[0]->parent_id];
                $pointValue = 1;
            } else {

                // get comment
                $value = PolicyQuestionValue::where([
                    'question_id' => $questions[1]->id,
                    'deal_id' => $deal_id
                ])->first()->value;
                $data[] = [ 'id' => $questions[1]->id, 'title' => $questions[1]->title, 'value' => $value, 'parent_id' => $questions[1]->parent_id];

                // get selection value
                $value = PolicyQuestionValue::where([
                    'question_id' => $questions[2]->id,
                    'deal_id' => $deal_id
                ])->first()->value;

                $data[] = ['id' => $questions[2]->id, 'title' => $questions[2]->title, 'value' => $value, 'parent_id' => $questions[2]->parent_id];

                switch ($value) {
                    case $questions[2]->parent_id . '_1':
                        $points += 0;
                        $pointValue = 0;
                        break;
                    case $questions[2]->parent_id . '_2':
                        $points += 0;
                        $pointValue = 0;
                        break;
                    case $questions[2]->parent_id . '_3':
                        $points += -2;
                        $pointValue = -2;
                        break;
                    case $questions[2]->parent_id . '_4':
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
            $question = SalesPolicyQuestion::where('key', 'threat')->orderBy('sequence')->first();

            if ($questions) {

                $questionValue = PolicyQuestionValue::where([
                    'question_id' => $question->id,
                    'deal_id' => $deal_id
                ])->first();

                // safety check
                if ($questionValue)
                    $value = $questionValue->value;
                else
                    goto endThreat;


                // get question policy
                $policy = SalesRiskPolicy::where('parent_id', $question->policy_id)->first();
                $policyValue = json_decode($policy->value);

                if ($value == 'yes') {
                    $points += (float) $policyValue->yes->point;
                    $pointValue = $policyValue->yes->point;
                } else {
                    $points += (float) $policyValue->no->point;
                    $pointValue = $policyValue->no->point;
                }

                $pointData['threat']['questionAnswer'][] = ['id' => $question->id, 'title' => $question->title, 'value' => $value, 'parent_id' => $question->parent_id];
                $pointData['threat']['points'] = $pointValue;

                endThreat:
            }

            // ---------------------- end threat calculation --------------------------------//

            // ----------------------------- doneByElse  ------------------------- //

            $questions = SalesPolicyQuestion::where('key', 'doneByElse')->orderBy('sequence')->get();

            if (count($questions) > 0) {
                $data = [];
                $policy = SalesRiskPolicy::where('parent_id', $questions[0]->policy_id)->get();

                $questionValue = PolicyQuestionValue::where([
                    'question_id' => $questions[0]->id,
                    'deal_id' => $deal_id
                ])->first();

                // safety check
                if ($questionValue)
                    $value = $questionValue->value;
                else
                    goto endDoneByElse;

                if ($value == 'no') {
                    $points += (float) json_decode($policy[0]->value)->no->point;
                    $pointValue = json_decode($policy[0]->value)->no->point;
                    $data[] = ['id' => $questions[0]->id, 'title' => $questions[0]->title, 'value' => 'No', 'parent_id' => $questions[0]->parent_id];
                } else {
                    $value = PolicyQuestionValue::where([
                        'question_id' => $questions[1]->id,
                        'deal_id' => $deal_id
                    ])->first()->value;

                    if ($value == 'yes') {
                        $points += (float) json_decode($policy[1]->value)->yes->point;
                        $pointValue = json_decode($policy[1]->value)->yes->point;
                        $data[] = ['id' => $questions[1]->id, 'title' => $questions[1]->title, 'value' => 'Yes', 'parent_id' => $questions[1]->parent_id];
                    } else {
                        $points += (float) json_decode($policy[1]->value)->no->point;
                        $pointValue = json_decode($policy[1]->value)->no->point;
                        $data[] = ['id' => $questions[1]->id, 'title' => $questions[1]->title, 'value' => 'No', 'parent_id' => $questions[1]->parent_id];
                    }
                }

                $pointData['doneByElse']['points'] = $pointValue;
                $pointData['doneByElse']['questionAnswer'] = $data;

                endDoneByElse:
            }

            // ----------------------------- end doneByElse ------------------------- //

            // ---------------------------- routeWork, availableWeekend, firstSubmission, acceptPriceProposal ------------------------------//

            foreach (['routeWork', 'availableWeekend', 'firstSubmission', 'acceptPriceProposal'] as $item) {
                $questions = SalesPolicyQuestion::where('key', $item)->orderBy('sequence')->get();
                if (count($questions) > 0) {

                    $policy = SalesRiskPolicy::where('parent_id', $questions[0]->policy_id)->get();

                    $questionValue = PolicyQuestionValue::where([
                        'question_id' => $questions[0]->id,
                        'deal_id' => $deal_id
                    ])->first();

                    if ($questionValue)
                        $value = $questionValue->value;
                    else
                        continue;

                    if ($value == 'yes') {
                        $points += (float) json_decode($policy[0]->value)->yes->point;
                        $pointData[$item]['points'] = json_decode($policy[0]->value)->yes->point;
                    } else {
                        $points += (float) json_decode($policy[0]->value)->no->point;
                        $pointData[$item]['points'] = json_decode($policy[0]->value)->no->point;
                    }

                    $pointData[$item]['questionAnswer'][] = ['id' => $questions[0]->id, 'title' => $questions[0]->title, 'value' => $value, 'parent_id' => $questions[0]->parent_id];
                }
            }


            // ---------------------------- end routeWork, availableWeekend, firstSubmission, acceptPriceProposal ------------------------------ //


            // ----------------------------- common calculations -------------------------- //

            // ------------------------------ clientCountry country --------------------------- //
            $policy = SalesRiskPolicy::where('key', 'clientCountry')->first();

            if (! $policy) {
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
                                $data = ['title' => 'Less Then', 'value' => $item->value, 'parent_id' => 'question_id'];
                                goto endProjectDeadline;
                            }
                            break;
                        case 'greaterThan':
                            if ($deadline > $item->value) {
                                $pointValue = $item->points;
                                $data = ['title' => 'Greater Then', 'value' => $item->value, 'parent_id' => 'question_id'];
                                goto endProjectDeadline;
                            }
                            break;
                        case 'fixed':
                            if ($deadline == $item->value) {
                                $pointValue = $item->points;
                                $data = ['title' => 'Fixed', 'value' => $item->value, 'parent_id' => 'question_id'];
                                goto endProjectDeadline;
                            }
                            break;
                        case 'range':
                            $value = explode(',', $item->value);
                            if ($deadline >= $value[0] && $deadline <= $value[1]) {
                                $pointValue = $item->points;
                                $data = ['title' => 'Range', 'value' => $value[0] .' - '. $value[1], 'parent_id' => 'question_id'];
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
            }

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
                                $data = ['title' => 'Less Then', 'value' => $item->value];
                                goto endProjectBudget;
                            }
                            break;
                        case 'greaterThan':
                            if ($deal->amount > $item->value) {
                                $pointValue = $item->points;
                                $data = ['title' => 'Greater Then', 'value' => $item->value];
                                goto endProjectBudget;
                            }
                            break;
                        case 'fixed':
                            if ($deal->amount == $item->value) {
                                $pointValue = $item->points;
                                $data = ['title' => 'Fixed', 'value' => $item->value];
                                goto endProjectBudget;
                            }
                            break;
                        case 'range':
                            $value = explode(',', $item->value);
                            if ($deal->amount >= $value[0] && $deal->amount <= $value[1]) {
                                $pointValue = $item->points;
                                $data = ['title' => 'Range', 'value' => $value[0] .' - '. $value[1], 'parent_id' => 'question_id'];
                                goto endProjectBudget;
                            }
                            break;
                    }
                }

                endProjectBudget:
                $points += (float) $pointValue;
                $pointData['projectBudget']['points'] = $pointValue;
                $pointData['projectBudget']['questionAnswer'][] = ['title' => 'What is the budget for this project?', 'value' => $deal->amount, 'parent_id' => null];
                $data ? $pointData['projectBudget']['questionAnswer'][] = $data : '';
            }
            // -------------------------------- end projectBudget -------------------------------------- //



            return ['points' => $points, 'pointData' => $pointData];
        } catch (\Throwable $th) {

            // throw $th;
            return ['points' => null, 'error' => $th->getMessage()];
        }
    }

    function questionValueReport($deal_id)
    {
        $calculation = self::calculatePolicyPoint($deal_id);
        $points = $calculation['points'];
        $pointData = $calculation['pointData'];

        $deal = Deal::find($deal_id);
        $projectName = $deal->project_name;
        $user = User::whereId($deal->added_by)->first(['id', 'name']);

        //get Date diff as intervals
        $d1 = new DateTime("$deal->start_date 00:00:00");
        $d2 = new DateTime("$deal->deadline 23:59:59");
        $interval = $d1->diff($d2);
        $deadline = $interval->d;

        /**
         * hourlyRate
         * milestone
         * threat
         * doneByElse
         * routeWork
         * availableWeekend
         * firstSubmission
         * acceptPriceProposal
         * clientCountry
         * projectDeadline
         * projectBudget
         */

        return response()->json(['status' => 'success', 'data' => compact('points', 'pointData', 'projectName', 'user', 'deadline')]);
    }

    function salesRiskReport()
    {
        $this->pageTitle = 'Sales Analysis Reports';
        return view('sales-risk-policies.analysisReport', $this->data);
    }
}
