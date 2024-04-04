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
            Route::get('question/fields-type', 'qustionInputField')->name('question.fields-type');
            Route::post('question/save', 'policyQuestionSave')->name('question.save');

            Route::get('question-fields/{policyId}', 'policyQuestionInputFields')->name('question-fields');

            Route::post('question-fields/edit/{id}', 'policyQuestionEdit')->name('question-fields.edit');
            Route::get('question/list', 'questionList')->name('question.list');

            Route::post('question-value/save', 'questionValueSave')->name('question-value.save');

            Route::get('question-value/report/{deal_id}', 'questionValueReport')->name('question-value.report');
            Route::get('deals/risk-analysis/{deal_id}', 'calculatePolicyPoint')->name('deal.analysis');
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

        return response()->json(['data' => compact( 'department', 'policyKeys', 'valueTypes', 'countries')]);
    }

    function save(Request $req)
    {
        // dd($req->all());
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
                'message' => 'Something went worng while editing.',
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
                'message' => 'Error occured while saveing data.'
            ], 500);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Policy edited succesfully.'
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
                'message' => 'Applicatoin error'
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
            if ($policy->parrent_id) {
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
     * @param $extra array extra values like department, parrent_id
     *
     * @return $data formated single rule
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

    function qustionInputField()
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

        return response()->json(['status' => 'success', 'message' => 'Question added succesfully']);
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

            return response()->json(['status' => 'success', 'message' => 'Question Edited succesfully']);
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

        $fileds = [
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
                        'label' => 'Nemeric',
                        'name' => 'nemeric',
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

        return response()->json($fileds);
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
            // $calculation = self::calculatePolicyPoint($dealId);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
            return response()->json(['status' => 'error', 'message' => 'Data did not stroed successfully.'], 500);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Questons values stored successfully.',
            'redirectUrl' => route('dealDetails', $dealId),
            // 'data' => ['point' => $calculation['points']]
        ]);
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
            // calculate first quetion key value (hourlyRate)
            //
            $questions = SalesPolicyQuestion::where('key', 'hourlyRate')->orderBy('sequence')->get();
            if (count($questions) < 1) {
                goto endHourlyRate;
            }

            $hours = 0;
            foreach ($questions as $item) {

                $value = PolicyQuestionValue::where([
                    'question_id' => $item->id,
                    'deal_id' => $deal_id
                ])->first()->value;

                switch ($item->sequence) {
                    case '1': /* need homepage */
                        if ($value == 'yes') {
                            $hours += 15;
                        }
                        break;
                    case '2': /* primary page */
                        $hours += $value * 10;
                        break;
                    case '3': /* secondary page */
                        $hours += $value * 4;
                        break;
                    case '4': /* How many hours */
                        $hours += $value;
                        break;
                }
            }

            $hourlyRate = $deal->amount / $hours;
            $policy_id = $questions->first()->policy_id;
            $rules = SalesRiskPolicy::where('parent_id', $policy_id)->get();

            foreach ($rules as $item) {
                switch ($item->type) {
                    case 'lessThan':
                        if ($hourlyRate < $item->value) {
                            $points += $item->points;
                            $pointData['hourlyRate'] = [$item->points, $hourlyRate];
                            goto endHourlyRate;
                            break;
                        }
                        break;
                    case 'range':
                        $value = explode(',', $item->value);
                        if ($hourlyRate > $value[0] && $hourlyRate < $value[1]) {
                            $points += $item->points;
                            $pointData['hourlyRate'] = [$item->points, $hourlyRate];
                            goto endHourlyRate;
                            break;
                        }
                        break;
                    case 'greaterThan':
                        if ($hourlyRate > $item->value) {
                            $points += $item->points;
                            $pointData['hourlyRate'] = [$item->points, $hourlyRate];
                            goto endHourlyRate;
                            break;
                        }
                        break;
                }
            }

            endHourlyRate:

            // --------------------- end hourly rate calculation ------------------ //

            // ---------------------- milestore calculation ------------------------------- //
            $questions = SalesPolicyQuestion::where('key', 'milestore')->orderBy('sequence')->get();

            $value = PolicyQuestionValue::where([
                'question_id' => $questions[0]->id,
                'deal_id' => $deal_id
            ])->first()->value;

            // check first question is yes
            if ($value == 'yes') {
                $points += 1;
                $pointData['milestore'] = 1;
            } else {

                $questionValue = PolicyQuestionValue::where([
                    'question_id' => $questions[2]->id,
                    'deal_id' => $deal_id
                ])->first();
                $value = $questionValue ?  $questionValue->value : '';

                switch ($value) {
                    case $questions[2]->parent_id . '_1':
                        $points += 0;
                        $pointData['milestore'] = 0;
                        break;
                    case $questions[2]->parent_id . '_2':
                        $points += 0;
                        $pointData['milestore'] = 0;
                        break;
                    case $questions[2]->parent_id . '_3':
                        $points += -2;
                        $pointData['milestore'] = -2;
                        break;
                    case $questions[2]->parent_id . '_4':
                        $points += -1;
                        $pointData['milestore'] = -1;
                        break;
                }
            }

            // ---------------------- end milestore calculation ------------------------------- //

            // ---------------------- threat calculation --------------------------------//
            $question = SalesPolicyQuestion::where('key', 'threat')->orderBy('sequence')->first();

            if ($questions) {
                $value = PolicyQuestionValue::where([
                    'question_id' => $question->id,
                    'deal_id' => $deal_id
                ])->first()->value;

                // get question policy
                $policy = SalesRiskPolicy::where('parent_id', $question->policy_id)->first();
                $policyValue = json_decode($policy->value);

                if ($value == 'yes') {
                    $points += (float) $policyValue->yes->point;
                    $pointData['threat'] = $policyValue->yes->point;
                }
                else {
                    $points += (float) $policyValue->no->point;
                    $pointData['threat'] = $policyValue->no->point;
                }

            }

            // ---------------------- end threat calculation --------------------------------//

            // ----------------------------- doneByElse  ------------------------- //

            $questions = SalesPolicyQuestion::where('key', 'doneByElse')->orderBy('sequence')->get();

            if (count($questions) > 0) {

                $policy = SalesRiskPolicy::where('parent_id', $questions[0]->policy_id)->get();

                $value = PolicyQuestionValue::where([
                    'question_id' => $questions[0]->id,
                    'deal_id' => $deal_id
                ])->first()->value;

                if ($value == 'no') {
                    $points += (float) json_decode($policy[0]->value)->no->point;
                    $pointData['doneByElse'] = json_decode($policy[0]->value)->no->point;
                } else {
                    $value = PolicyQuestionValue::where([
                        'question_id' => $questions[1]->id,
                        'deal_id' => $deal_id
                    ])->first()->value;

                    if ($value == 'yes') {
                        $points += (float) json_decode($policy[1]->value)->yes->point;
                        $pointData['doneByElse'] = json_decode($policy[1]->value)->yes->point;
                    }
                    else {
                        $points += (float) json_decode($policy[1]->value)->no->point;
                        $pointData['doneByElse'] = json_decode($policy[1]->value)->no->point;
                    }
                }
            }

            // ----------------------------- end doneByElse ------------------------- //

            // ---------------------------- routeWork, availableWeekend, firstSubmisstoin, acceptPriceProposal ------------------------------//

            foreach (['routeWork', 'availableWeekend', 'firstSubmisstoin', 'acceptPriceProposal'] as $item) {
                $questions = SalesPolicyQuestion::where('key', $item)->orderBy('sequence')->get();
                if (count($questions) > 0) {

                    $policy = SalesRiskPolicy::where('parent_id', $questions[0]->policy_id)->get();

                    $questionValue = PolicyQuestionValue::where([
                        'question_id' => $questions[0]->id,
                        'deal_id' => $deal_id
                    ])->first();

                    $value = $questionValue ?  $questionValue->value : '';

                    if ($value == 'yes') {
                        $points += (float) json_decode($policy[0]->value)->yes->point;
                        $pointData[$item] = json_decode($policy[0]->value)->yes->point;
                    } else {
                        $points += (float) json_decode($policy[0]->value)->no->point;
                        $pointData[$item] = json_decode($policy[0]->value)->no->point;
                    }
                }
            }


            // ---------------------------- end routeWork, availableWeekend, firstSubmisstoin, acceptPriceProposal ------------------------------ //


            // ----------------------------- common calculation -------------------------- //


            return ['points' => $points, 'pointData' => $pointData];
        } catch (\Throwable $th) {

            throw $th;
        }

    }

    function questionValueReport($deal_id)
    {
        $calculation = self::calculatePolicyPoint($deal_id);
        // dd($calculation);
        $questionValues = PolicyQuestionValue::where('deal_id', $deal_id)->get()->map(function ($item) use ($calculation) {
            return [
                'title' => SalesPolicyQuestion::find($item->question_id)->title,
                'ruleList' => SalesPolicyQuestion::find($item->question_id)->rule_list,
                'value' => $item->value,
                'point' => $calculation['pointData'][$item->question_id] ?? 0
            ];
        });

        return response()->json(['data' => ['questionValue' => $questionValues, 'points' => $calculation['points']]]);
    }

    function salesRiskReport()
    {
        $this->pageTitle = 'Sales Analysis Reports';
        return view('sales-risk-policies.analysisReport', $this->data);
    }
}
