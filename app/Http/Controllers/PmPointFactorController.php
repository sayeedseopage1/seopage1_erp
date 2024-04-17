<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\AccountBaseController;
use App\Models\Criteria;
use App\Models\Factor;

class PmPointFactorController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.factor';
    } 

    public function index(Request $request)
    {
        $filter = function($factor) use ($request){
            $factor->when($request->project_type, function($query) use ($request) {
                $query->where('project_type', $request->project_type);
            });
        };
        
        return response()->json([
            'status'=> 200,
            'data' => Criteria::with(['factors' => $filter])->whereHas('factors', $filter)->get()
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'criteria_id' => 'required|exists:criterias,id',
            'title' => 'required|string',
            'project_type' => 'required|in:1,2',
            'lower_limit' => 'required|numeric',
            'upper_limit' => 'required|numeric',
            'limit_type' => 'required|in:1,2',
            'limit_unit' => 'required|in:1,2,3,4,5',
            'lower_limit_condition' => 'required|string',
            'upper_limit_condition' => 'required|string',
            'limit_depend_on_models_and_fields' => 'nullable',
            'point_type' => 'required|in:1,2',
            'points' => 'required|numeric',
            'point_depend_on_model' => 'nullable',
            'point_depend_on_field' => 'nullable',
            'status' => 'nullable'
        ]);

        $lowerLimitRefValue = $this->checkableValue($validated['lower_limit'], $validated['lower_limit_condition']);
        $upperLimitRefValue = $this->checkableValue($validated['upper_limit'], $validated['upper_limit_condition']);
        
        $criteria = Criteria::with(['factors' => function($factor) use ($validated){
            return $factor->where('project_type', $validated['project_type']);
        }])->find($validated['criteria_id']);

        foreach ($criteria->factors as $factor) {
            if(eval("return \$factor->lower_limit $factor->lower_limit_condition \$lowerLimitRefValue;") && eval("return \$factor->upper_limit $factor->upper_limit_condition \$lowerLimitRefValue;"))
            {
                return response()->json([
                    'status'=> 400,
                    'message' => 'The lower limit may conflict!'
                ]);
            }elseif($factor->lower_limit_condition == '>' && $factor->upper_limit_condition == '<=' && (eval("return \$factor->lower_limit $factor->lower_limit_condition \$lowerLimitRefValue;") || eval("return \$factor->upper_limit $factor->upper_limit_condition \$lowerLimitRefValue;"))){
                return response()->json([
                    'status'=> 400,
                    'message' => 'The lower limit may conflict!'
                ]);
            }

            if(eval("return \$factor->lower_limit $factor->lower_limit_condition \$upperLimitRefValue;") && eval("return \$factor->upper_limit $factor->upper_limit_condition \$upperLimitRefValue;"))
            {
                return response()->json([
                    'status'=> 400,
                    'message' => 'The upper limit may conflict!'
                ]);
            }elseif($factor->lower_limit_condition == '>' && $factor->upper_limit_condition == '<=' && (eval("return \$factor->lower_limit $factor->lower_limit_condition \$upperLimitRefValue;") || eval("return \$factor->upper_limit $factor->upper_limit_condition \$upperLimitRefValue;"))){
                return response()->json([
                    'status'=> 400,
                    'message' => 'The upper limit may conflict!'
                ]);
            }
        }

        try {
            Factor::create($validated);
            return response()->json([
                'status'=> 200,
                'message' => 'Factor created successfully'
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status'=> 400,
                'message' => 'Something went wrong!'
            ]);
        }
    }

    public function show($id)
    {
        return response()->json([
            'status'=> 200,
            'data' => Factor::with('criteria')->find($id)
        ]);
    }

    public function edit($id)
    {
        return response()->json([
            'status'=> 200,
            'data' => Factor::with('criteria')->find($id)
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'criteria_id' => 'required|exists:criterias,id',
            'title' => 'required|string',
            'project_type' => 'required|in:1,2',
            'lower_limit' => 'required|numeric',
            'upper_limit' => 'required|numeric',
            'limit_type' => 'required|in:1,2',
            'limit_unit' => 'required|in:1,2,3,4,5',
            'lower_limit_condition' => 'required|string',
            'upper_limit_condition' => 'required|string',
            'limit_depend_on_models_and_fields' => 'nullable',
            'point_type' => 'required|in:1,2',
            'points' => 'required|numeric',
            'point_depend_on_model' => 'nullable',
            'point_depend_on_field' => 'nullable',
            'status' => 'nullable'
        ]);

        $lowerLimitRefValue = $this->checkableValue($validated['lower_limit'], $validated['lower_limit_condition']);
        $upperLimitRefValue = $this->checkableValue($validated['upper_limit'], $validated['upper_limit_condition']);
        
        $criteria = Criteria::with(['factors' => function($factor) use ($validated){
            return $factor->where('project_type', $validated['project_type']);
        }])->find($validated['criteria_id']);

        foreach ($criteria->factors as $factor) {
            if($validated['criteria_id']==2) break;
            if($factor->id == $id) continue;

            if(eval("return \$factor->lower_limit $factor->lower_limit_condition \$lowerLimitRefValue;") && eval("return \$factor->upper_limit $factor->upper_limit_condition \$lowerLimitRefValue;"))
            {
                return response()->json([
                    'status'=> 400,
                    'message' => 'The lower limit may conflict!'
                ]);
            }elseif($factor->lower_limit_condition == '>' && $factor->upper_limit_condition == '<=' && (eval("return \$factor->lower_limit $factor->lower_limit_condition \$lowerLimitRefValue;") || eval("return \$factor->upper_limit $factor->upper_limit_condition \$lowerLimitRefValue;"))){
                return response()->json([
                    'status'=> 400,
                    'message' => 'The lower limit may conflict!'
                ]);
            }

            if(eval("return \$factor->lower_limit $factor->lower_limit_condition \$upperLimitRefValue;") && eval("return \$factor->upper_limit $factor->upper_limit_condition \$upperLimitRefValue;"))
            {
                return response()->json([
                    'status'=> 400,
                    'message' => 'The upper limit may conflict!'
                ]);
            }elseif($factor->lower_limit_condition == '>' && $factor->upper_limit_condition == '<=' && (eval("return \$factor->lower_limit $factor->lower_limit_condition \$upperLimitRefValue;") || eval("return \$factor->upper_limit $factor->upper_limit_condition \$upperLimitRefValue;"))){
                return response()->json([
                    'status'=> 400,
                    'message' => 'The upper limit may conflict!'
                ]);
            }
        }

        try {
            Factor::find($id)->update($validated);
            return response()->json([
                'status'=> 200,
                'message' => 'Factor udated successfully'
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status'=> 400,
                'message' => 'Something went wrong!'
            ]);
        }
    }

    public function destroy($id)
    {
        //
    }

    public function checkableValue($limit, $condition){
        if ($condition == "<") {
            return $limit + 0.1;
        } elseif ($condition == ">") {
            return $limit - 0.1;
        } elseif ($condition == "<=" || $condition == ">=" || $condition == "==") {
            return $limit;
        } else {
            return false;
        }
    }
}
