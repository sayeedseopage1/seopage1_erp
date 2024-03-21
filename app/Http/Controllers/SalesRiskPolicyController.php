<?php

namespace App\Http\Controllers;

use App\Models\Country;
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
            abort_403(user()->permission('manage_company_setting') !== 'all');
            return $next($request);
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
            Route::get('question-fields/{policyId}', 'policyQuestionInputFields')->name('question-fields');
            Route::post('question-fields/save', 'policyQuestionSave')->name('question-fields.save');
            Route::get('question-list', 'questionList')->name('question.list');
        });
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

                    $data = SalesRiskPolicy::where('id', $req->policy_id)->get()->map(function($item){
                        return [
                            'id' => $item->id,
                            'title' => $item->title,
                            'ruleList' => SalesRiskPolicy::where('parent_id', $item->id)->get(['id', 'title',  'type', 'parent_id', 'value_type', 'value', 'points', 'status', 'comment']),
                            'department' => [
                                'id' => $item->department,
                                'name' => Team::with('childs')->find($item->department)->team_name
                            ],
                            'status' => $item->status,
                            'comment' => $item->comment
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
                    'comment' => $item->comment
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
            return response()->json(['status' => 'error', 'message' => 'Data not save correctly.']);
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

    function policyQuestionSave(Request $req)
    {
        // temporary
        \Illuminate\Support\Facades\Schema::table('sales_policy_questions', function(\Illuminate\Database\Schema\Blueprint $table){
            if(! \Illuminate\Support\Facades\Schema::hasColumn('sales_policy_questions', 'value'))
            {
                $table->text('value')->nullable()->after('type');
            }
        });

        $validator = Validator::make($req->all(), [
            'title' => 'required',
            'type' => 'required',
            'policy_id' => 'required',
            'rule_list' => 'required',
            'parent_id' => 'nullable',
            'placeholder' => 'nullable'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => 'Validation Error', 'data' => $validator->errors()], 403);
        }

        SalesPolicyQuestion::create([
            'title' => $req->title,
            'type' => $req->type,
            'value' => $req->value,
            'parent_id' => $req->parent_id,
            'rule_list' => json_encode($req->rule_list),
            'placeholder' => $req->placeholder,
            'policy_id' => $req->policy_id,
        ]);

        return response()->json(['status' => 'success', 'message' => 'Question added succesfully']);
    }

    function questionList(Request $req)
    {
        $list = SalesPolicyQuestion::where(function ($query) use ($req) {
            if ($req->policy_id)
                $query->where('policy_id', $req->policy_id);
        })->get()
        ->map(function($item){
            return [
                'id' => $item->id,
                'title' => $item->title,
                'type' => $item->type,
                'value' => json_decode($item->value),
                'placeholder' => $item->placeholder,
                'rule_list' => SalesRiskPolicy::whereIn('id', json_decode($item->rule_list))->get(['id', 'title']),
                'parent_id' => $item->parent_id,
                'policy_id' => $item->policy_id
            ];
        });

        return response()->json(['status' => 'success', 'data' =>  $list]);
    }
}
