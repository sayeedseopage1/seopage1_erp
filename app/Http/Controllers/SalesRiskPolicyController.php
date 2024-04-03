<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Deal;
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
            if(in_array(auth()->user()->role_id , [1, 8])) /* admin and sale */
            {
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
        // value types
        $valueTypes = [
            ['label' => 'Percentage', 'name' => 'percentage'],
            ['label' => 'Currency', 'name' => 'currency'],
            ['label' => 'Hourly', 'name' => 'hourly'],
            ['label' => 'Days', 'name' => 'days']
        ];

        $countries = [];
        Country::each(function ($item) use (&$countries) {
            $countries[] = [
                'name' => $item->name,
                'niceName' => $item->nicename,
                'iso' => $item->iso
            ];
        });

        $department = Team::with('childs')->get()->map(function ($item) {
            return ['id' => $item->id, 'name' => $item->team_name];
        });

        // $department = Team::with('childs')->get();
        // dd($department);

        // options and their structures
        $lessThan = [
            'label' => 'Less Than',
            'name' => 'lessThan',
            'structure' => [
                [
                    'label' => 'Title',
                    'name' => 'title',
                    'type' => 'input',
                ],
                [
                    'label' => 'Write Value',
                    'type' => 'multiField',
                    'structure' => [
                        [
                            'label' => 'Type',
                            'type' => 'select',
                            'structure' => $valueTypes
                        ],
                        [
                            'label' => 'Value',
                            'type' => 'number',
                            'placeholder' => ''
                        ]
                    ],
                ],
                [
                    'label' => 'Comment',
                    'name' => 'comment',
                    'type' => 'input',
                ]
            ]
        ];

        $greaterThan = [
            'label' => 'Greater Than',
            'name' => 'greaterThan',
            'structure' => [
                [
                    'label' => 'Title',
                    'name' => 'title',
                    'type' => 'input',
                ],
                [
                    'label' => 'Write Value',
                    'type' => 'multiField',
                    'structure' => [
                        [
                            'label' => 'Type',
                            'type' => 'select',
                            'structure' => $valueTypes
                        ],
                        [
                            'label' => 'Value',
                            'type' => 'number',
                            'placeholder' => ''
                        ]
                    ],
                ],
                [
                    'label' => 'Comment',
                    'name' => 'comment',
                    'type' => 'input',
                ]
            ]
        ];

        $fixed = [
            'label' => 'Fixed',
            'name' => 'fixed',
            'structure' => [
                [
                    'label' => 'Title',
                    'name' => 'title',
                    'type' => 'input',
                ],
                [
                    'label' => 'Write Value',
                    'type' => 'multiField',
                    'structure' => [
                        [
                            'label' => 'Type',
                            'type' => 'select',
                            'structure' => $valueTypes
                        ],
                        [
                            'label' => 'Value',
                            'type' => 'number',
                            'placeholder' => ''
                        ]
                    ],
                ],
                [
                    'label' => 'Comment',
                    'name' => 'comment',
                    'type' => 'input',
                ]
            ]
        ];

        $range = [
            'label' => 'Range',
            'name' => 'range',
            'structure' => [
                [
                    'label' => 'Title',
                    'name' => 'title',
                    'type' => 'input',
                ],
                [
                    'label' => 'Write Value',
                    'type' => 'multiField',
                    'structure' => [
                        [
                            'label' => 'Type',
                            'name' => 'valueType',
                            'type' => 'select',
                            'structure' => $valueTypes
                        ],
                        [
                            'label' => 'From',
                            'name' => 'from',
                            'type' => 'number',
                            'placeholder' => ''
                        ],
                        [
                            'label' => 'To',
                            'name' => 'to',
                            'type' => 'number',
                            'placeholder' => ''
                        ]
                    ],
                ],
                [
                    'label' => 'Comment',
                    'name' => 'comment',
                    'type' => 'input',
                ]
            ]
        ];

        $yesNo = [
            'label' => 'Yes/No',
            'name' => 'yesNo',
            'structure' => [
                [
                    'label' => 'Title',
                    'name' => 'title',
                    'type' => 'input',
                ],
                [
                    [
                        'label' => 'Yes',
                        'name' => 'yes',
                        'type' => 'input',
                    ],
                    [
                        'label' => 'note',
                        'name' => 'note',
                        'type' => 'input',
                    ],
                ],
                [
                    [
                        'label' => 'No',
                        'name' => 'no',
                        'type' => 'input',
                    ],
                    [
                        'label' => 'note',
                        'name' => 'note',
                        'type' => 'input',
                    ],
                ]
            ]
        ];

        $list = [
            'label' => 'List',
            'name' => 'list',
            'structure' => [
                [
                    'label' => 'Title',
                    'name' => 'title',
                    'type' => 'input',
                ],
                [
                    'label' => 'Type',
                    'name' => 'type',
                    'type' => 'multiselect',
                    'structure' => [
                        'countries' => [
                            'label' => 'Contries',
                            'name' => 'countries',
                            'structure' => $countries
                        ]
                    ]
                ],
                [
                    'label' => 'Comment',
                    'name' => 'comment',
                    'type' => 'input',
                ]
            ]
        ];

        $fileds = [
            [
                'label' => 'Policy Title',
                'type' => 'input',
                'placeholder' => 'Write Here',
            ],
            [
                'label' => 'Department',
                'name' => 'department',
                'type' => 'select',
                'structure' => $department
            ],
            [
                'label' => 'Policy type',
                'type' => 'select',
                'structure' => [
                    'lessThan' => $lessThan,
                    'greaterThan' => $greaterThan,
                    'fixed' => $fixed,
                    'range' => $range,
                    'yesNo' => $yesNo,
                    'list' => $list
                ]
            ],
            [
                'label' => 'Points',
                'type' => 'number',
                'placeholder' => ''
            ]
        ];

        return response()->json(['data' => $fileds]);
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
        $questionKeys = SalesPolicyQuestion::$keys;
        $policies = SalesRiskPolicy::whereNull('parent_id')->get(['id', 'title']);

        return response()->json(['data' => compact('types', 'questionKeys', 'policies')]);
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

        // Note: big form route : route('dealDetails', $deal->id)
        return view('deals.sales-questions-render', $this->data);
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
            $calculation = self::calculatePolicyPoint($dealId);

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
            'data' => ['point' => $calculation['points']]
        ]);
    }

    /**
     *
     */
    function calculatePolicyPoint($deal_id)
    {
        try {
            // get all deals questions vaule
            $questionValues = PolicyQuestionValue::where('deal_id', $deal_id)->get();

            // get rules id and calculate point

            $pointData = [];
            $totalPoints = 0;

            foreach ($questionValues as $item) {

                $points = 0;
                $question = SalesPolicyQuestion::find($item->question_id);
                if (in_array($question->type, ['list', 'text', 'longText'])) {
                    continue;
                }

                $ruleList = $question->rule_list;

                if ($ruleList)
                    foreach (json_decode($ruleList) as $ruleId) {

                        $rule = SalesRiskPolicy::find($ruleId);

                        switch ($rule->type) {
                            case 'greaterThan':

                                if ($item->value > $rule->value && $points < $rule->points) {
                                    $points = $rule->points;
                                }
                                break;
                            case 'lessThan':
                                if ($item->value < $rule->value && $points < $rule->points) {
                                    $points = $rule->points;
                                }
                                break;
                            case 'fixed':
                                if ($item->value == $rule->value && $points < $rule->points) {
                                    $points = $rule->points;
                                }
                                break;
                            case 'range':
                                $range = explode(',', $rule->value);
                                if ($item->value > $range[0] &&  $item->value < $range[1]  && $points < $rule->points) {
                                    $points = $rule->points;
                                }
                                break;
                            case 'yesNo':
                                if ($item->value == 'yes') {
                                    $points = json_decode($rule->value)->yes->point;
                                } else {
                                    $points = json_decode($rule->value)->no->point;
                                }
                                break;
                        }
                    }

                $pointData[$question->id] = $points;
                $totalPoints += $points;
            }

            $department = [
                'WD' => 1,
                'DM' => 11
            ];

            // country list check
            // dd(Deal::find($deal_id));
            $lead_id = Deal::find($deal_id)->lead_id;
            $lead = Lead::find($lead_id);
            // dd($lead);
            // dd($lead->status);
            $rules = SalesRiskPolicy::where([
                'department' => $department[$lead->status],
                'type' => 'list'
            ])->get();

            foreach ($rules as $item) {
                switch ($item->value_type) {
                    case 'countries':

                        foreach (json_decode($item->value, true) as $value) {

                            if($lead->country == $value[key($value)])
                            {
                                $totalPoints += $item->points;
                                $pointData['countries'] = $item->points;
                                break;
                            }
                        }
                        break;
                }
            }

            return ['points' => $totalPoints, 'pointData' => $pointData];
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    function questionValueReport($deal_id)
    {
        $calculation = self::calculatePolicyPoint($deal_id);
        // dd($calculation);
        $questionValues = PolicyQuestionValue::where('deal_id', $deal_id)->get()->map(function($item) use($calculation) {
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
