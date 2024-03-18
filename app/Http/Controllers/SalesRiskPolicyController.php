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
    protected $policyTypes = ['parent', 'greaterThan', 'lessThan', 'fixed', 'range', 'yesNo', 'list'];
    protected $questionTypes = ['yesNo', 'numeric', 'list', 'text', 'longText'];

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

            Route::get('/', 'index')->name('index');
            Route::get('input-fields', 'riskPolicyInputFields')->name('input-fields');
            Route::post('save', 'save')->name('save');
            Route::post('edit/{id}', 'edit')->name('edit');
            Route::post('edit-single/{id}', 'editSingle')->name('edit-single');
            Route::get('rule-list', 'ruleList')->name('rule-list');
            Route::put('status-change/{id}/{status}', 'policyRuleStatusChange')->name('status-change');
            Route::get('question-fields', 'policyQuestionInputFields')->name('question-fields');
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
            'ruleList' => 'required|array|min:1',
            'ruleList.*.policyType' => 'in:' . implode(',', $this->policyTypes),
            'ruleList.*.title' => 'required',
            'comment' => 'nullable'
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
                $item = (object)$item;
                $rowData = [
                    'title' => $item->title,
                    'parent_id' => $policy->id,
                    'department' => $req->department,
                    'type' => $item->policyType,
                    'comment' => $item->comment
                ];

                switch ($item->policyType) {
                    case "lessThan":
                        $rowData['value_type'] = $item->valueType;
                        $rowData['value'] = $item->value;
                        $rowData['points'] = $item->points;
                        break;
                    case "greaterThan":
                        $rowData['value_type'] = $item->valueType;
                        $rowData['value'] = $item->value;
                        $rowData['points'] = $item->points;
                        break;
                    case "fixed":
                        $rowData['value_type'] = $item->valueType;
                        $rowData['value'] = $item->value;
                        $rowData['points'] = $item->points;
                        break;

                    case "range":
                        $rowData['value_type'] = $item->valueType;
                        $rowData['value'] = $item->from . ', ' . $item->to;
                        $rowData['points'] = $item->points;
                        break;

                    case "yesNo":
                        $rowData['value'] = json_encode($item->value);
                        break;

                    case "list":
                        $rowData['value_type'] = $item->valueType;
                        if ($item->valueType == "countries") {
                            $rowData['value'] = json_encode($item->countries);
                        }
                        $rowData['points'] = $item->points;
                        break;
                }
                // dd($rowData);
                SalesRiskPolicy::create($rowData);
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
        // dd('');
        return response()->json([
            'status' => 'success',
            'message' => 'New Sale Risk Policy created Successfully.'
        ]);
    }

    function edit(Request $req, $id): JsonResponse
    {
        // dd($req->all(), $id);
        $id=2;

        try {
            $policy = SalesRiskPolicy::findOrFail($id);
        }
        catch (ModelNotFoundException $ex)
        {
            return response()->json([
                'status' => 'error',
                'message' => 'Data not found'
            ]);
        }
        catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ], 500);
        }

        if ($policy) {
            # code...
        }

        $validator = Validator::make($req->all(), [
            'pointss' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'validation fails',
                'data' => $validator->errors()
            ]);
        }

        // dd($id, $req->all());

        try {
            $policy = SalesRiskPolicy::findOrFail($id);
            dd($policy);

            if ($req->input('ruleType')) {
                if ($req->input('ruleType') == 'yes')

                    // dd($policy->value);

                    $policy->points = $req->newpoints;
            }
            // $policy->save();
        } catch (\Throwable $th) {
            throw $th;
        }

        return response()->json();
    }

    function editSingle(Request $req, $id): JsonResponse
    {
        try {
            $policy = SalesRiskPolicy::findOrFail($id);

            $rowData = [
                'title' => $req->title,
                'type'  => $req->policyType,
                'comment' => $req->comment,
            ];

            switch ($req->policyType) {
                case "lessThan":
                    $rowData['value_type'] = $req->valueType;
                    $rowData['value'] = $req->value;
                    $rowData['points'] = $req->points;
                    break;
                case "greaterThan":
                    $rowData['value_type'] = $req->valueType;
                    $rowData['value'] = $req->value;
                    $rowData['points'] = $req->points;
                    break;
                case "fixed":
                    $rowData['value_type'] = $req->valueType;
                    $rowData['value'] = $req->value;
                    $rowData['points'] = $req->points;
                    break;

                case "range":
                    $rowData['value_type'] = $req->valueType;
                    $rowData['value'] = $req->from . ', ' . $req->to;
                    $rowData['points'] = $req->points;
                    break;

                case "yesNo":
                    $rowData['value'] = json_encode($req->value);
                    break;

                case "list":
                    $rowData['value_type'] = $req->valueType;
                    if ($req->valueType == "countries") {
                        $rowData['value'] = json_encode($req->countries);
                    }
                    $rowData['points'] = $req->points;
                    break;
            }

            $policy->update($rowData);

        }
        catch (ModelNotFoundException $ex)
        {
            return response()->json([
                'status' => 'error',
                'message' => 'Data not found'
            ]);
        }
        catch (\Throwable $th) {
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
        $itemsPaginated = SalesRiskPolicy::where('parent_id', null)->paginate($req->input('limit', 10));

        $itemsTransformed = $itemsPaginated
            ->getCollection()
            ->map(function($item) {
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
            $itemsPaginated->currentPage(), [
                'path' => FacadesRequest::url(),
                'query' => [
                    'page' => $itemsPaginated->currentPage()
                ]
            ]
        );

        return response()->json(['data' => $data]);
    }

    function policyRuleStatusChange($id, $status)
    {
        try {
            $policy = SalesRiskPolicy::findOrFail($id);

            if ($status) {
                $policy->status = "1";
            } else if ($status == 0) {
                $policy->status = "0";
            } else {
                return response()->json(['status' => 'error', 'message' => 'Policy status not changed.']);
            }

            $policy->save();
            return response()->json(['status' => 'success', 'message' => 'Policy status changed.']);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    function policyQuestionInputFields()
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
                'structure' => SalesPolicyQuestion::get(['id', 'title'])
            ],
            [
                'label' => 'Placeholder',
                'name' => 'placeholder',
                'type' => 'input'
            ],
            [
                'label' => 'Sequence',
                'name' => 'sequence',
                'type' => 'numeric'
            ],
            [
                'label' => 'Department',
                'name' => 'department',
                'type' => 'select',
                'structure' => Team::with('childs')->get()->map(function ($item) {
                    return ['id' => $item->id, 'name' => $item->team_name];
                })
            ],

        ];

        return response()->json($fileds);
    }

    function policyQuestionSave(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'title' => 'required',
            'type' => 'required',
            'policy_id' => 'required',
            'parent_id' => 'nullable',
            'placeholder' => 'nullable'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => 'Validation Error', 'data' => $validator->errors()], 403);
        }

        return response()->json(['status' => 'success', 'message' => 'Question added succesfully']);
    }

    function questionList()
    {
    }
}
