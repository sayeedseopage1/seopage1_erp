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

    public function index()
    {
        return response()->json([
            'status'=> 200,
            'data' => Criteria::with('factors')->get()
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'criteria_id' => 'required|exist:criterias',
            'title' => 'required|string',
            'project_type' => 'required|in:1,2',
            'lower_limit' => 'required|numeric',
            'upper_limit' => 'required|numeric',
            'limit_type' => 'required|in:1,2',
            'limit_unit' => 'required|in:1,2',
            'lower_limit_condition' => 'required|string',
            'upper_limit_condition' => 'required|string',
            'limit_depend_on_models_and_fields' => 'nullable',
            'point_type' => 'required|in:1,2',
            'points' => 'required|numeric',
            'point_depend_on_model' => 'nullable',
            'point_depend_on_field' => 'nullable',
            'status' => 'nullable'
        ]);

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
            'criteria_id' => 'required|exist:criterias',
            'title' => 'required|string',
            'project_type' => 'required|in:1,2',
            'lower_limit' => 'required|numeric',
            'upper_limit' => 'required|numeric',
            'limit_type' => 'required|in:1,2',
            'limit_unit' => 'required|in:1,2',
            'lower_limit_condition' => 'required|string',
            'upper_limit_condition' => 'required|string',
            'limit_depend_on_models_and_fields' => 'nullable',
            'point_type' => 'required|in:1,2',
            'points' => 'required|numeric',
            'point_depend_on_model' => 'nullable',
            'point_depend_on_field' => 'nullable',
            'status' => 'nullable'
        ]);

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
}
