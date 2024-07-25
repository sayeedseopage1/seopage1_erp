<?php

namespace App\Http\Controllers\AutoPriceQuotation;

use App\Models\User;
use App\Models\Currency;
use App\Models\DealStage;
use App\Models\ProjectCms;
use App\Models\ProjectNiche;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
        $data = DealStage::select(['id','short_code','client_username','client_name','project_name','actual_amount','amount','deal_status'])->where('client_username', 'like', "{$client_username}")->get();
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

    public function getCurrencies()
    {
        $data = Currency::get();
        return response()->json([
            'status' => 200,
            'data' => $data
        ]);
    }

    public function getUsersForPriceQuotation(){
        return response()->json([
            'status' => 200,
            'data' => User::select(['id','name','user_name','image'])->whereIn('role_id', [1,4,7,8])->get()
        ]);
    }
}
