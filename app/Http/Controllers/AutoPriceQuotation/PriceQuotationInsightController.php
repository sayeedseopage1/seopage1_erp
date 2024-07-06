<?php

namespace App\Http\Controllers\AutoPriceQuotation;

use App\Http\Controllers\Controller;
use App\Models\DealStage;
use Illuminate\Http\Request;

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
}
