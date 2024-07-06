<?php

namespace App\Http\Controllers\AutoPriceQuotation;

use App\Models\DealStage;
use App\Models\ProjectCms;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ProjectNiche;

class PriceQuotationInsightController extends Controller
{
    public function getClientsFromDealStage(Request $request)
    {
        $username = $request->get('username');
        $data = DealStage::where('client_username', 'like', "%{$username}%")->distinct()->pluck('client_username');
        return response()->json([
            'status' => 200,
            'data' => $data
        ]);
    }

    public function getDealNameFromDealStage($client_username)
    {
        $data = DealStage::select(['id','short_code','client_username','client_name','project_name','actual_amount','amount','deal_status'])->where('client_username', $client_username)->get();
        return response()->json([
            'status' => 200,
            'data' => $data
        ]);
    }

    public function getCmsList()
    {
        $data = ProjectCms::get();
        return response()->json([
            'status' => 200,
            'data' => $data
        ]);
    }

    public function getProjectNiche(Request $request)
    {
        $category_name = $request->get('category_name');
        $data = ProjectNiche::where('category_name', 'like', "%{$category_name}%")->get();
        return response()->json([
            'status' => 200,
            'data' => $data
        ]);
    }
}
