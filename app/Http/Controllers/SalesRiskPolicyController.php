<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\SalesPolicyQuestion;
use App\Models\SalesRiskPolicy;
use App\Models\Team;
use Illuminate\Http\Request;
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

            Route::get('/', 'index')->name('index');
            Route::get('input-fields', 'riskPolicyInputFields')->name('input-fields');
            Route::post('save', 'save')->name('save');
            Route::get('question-fields', 'policyQuestionInputFields')->name('question-fields');
            Route::get('rule-list', 'ruleList')->name('rule-list');
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
                    'label' => 'Yes',
                    'name' => 'yes',
                    'type' => 'input',
                    'placeholder' => 'point'
                ],
                [
                    'label' => 'No',
                    'name' => 'no',
                    'type' => 'input',
                    'placeholder' => 'point'
                ],
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
                'label' => 'Point',
                'type' => 'number',
                'placeholder' => ''
            ]
        ];

        return response()->json(['data' => $fileds]);
    }

    function save(Request $req)
    {
        // TODO: Convert Model to BaseModel
        // ex: class Attendance extends BaseModel
        dd($req->all());
        $validator = Validator::make($req->all(), [
            'title' => 'required',
            'policyType' => 'required',
            'valueType' => 'required',
            'valueTitle' => 'required',
            'value' => 'required|numeric',
            'point' => 'required|numeric',
            'department' => 'required',
            'comment' => 'nullable'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'validation fails',
                'message' => $validator->errors()
            ]);
        }

        /* SalesRiskPolicy::create([
            'title' => $req->title,
            'type' => $req->policyType,
            'value_type' => $req->valueType,
            'valueTitle' => $req->valueTitle,
            'value' => $req->value,
            'point' => $req->point,
            'department' => $req->department,
            'comment' => $req->comment,
        ]); */



        return response()->json([
            'status' => 'success',
            'message' => 'New Sale Risk Policy created Successfully.'
        ]);
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

    function ruleList()
    {
        // $department = Team::with('childs')->find(1);
        // dd($department);
        $list = SalesRiskPolicy::where('parent_id', null)->get()->map(function ($item) {

            return [
                'title' => $item->title,
                'ruleList' => SalesRiskPolicy::where('parent_id', $item->id)->get(['id', 'title', 'point', 'value']),
                'department' => [
                    'id' => $item->department,
                    'name' => Team::with('childs')->find($item->department)->team_name
                ]
            ];
        });

        return response()->json(['data' => $list]);
    }

    function questionList()
    {
    }
}
