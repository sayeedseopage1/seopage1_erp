<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use GuzzleHttp\RequestOptions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Throwable;

class FreelancerApiController extends Controller
{

    public function __construct(private $client = null)
    {
        $headers = [
            'Content-Type' => 'application/json',
            'freelancer-oauth-v1' => env('FREELANCER_API')
        ];
        $this->client = new Client(['base_uri' => env('FREELANCER_BASE_URI'), 'headers' => $headers]);
    }

    public static function Routes($url = 'freelancer-api', $name = 'freelancer-api')
    {
        Route::controller(self::class)->prefix($url)->name($name . '.')->group(function () {
            Route::get('/', 'index');
            // Route::get('messages/{thread_id}', 'index');
            Route::get('/send-message/{thread_id}/{message}', 'sendMessage');
            Route::get('/milestone', 'milestone');
        });
    }

    public function index()
    {
        try {
            $path = 'messages/0.1/messages';
            $query = ['threads[]' => '575960'];
            $response = $this->client->request('GET', $path, ['query' => $query]);
            $content = $response->getBody()->getContents();
            dd(json_decode($content));
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function sendMessage($thread_id, $message)
    {
        try {
            $path = "messages/0.1/threads/$thread_id/messages/";
            $query = ['message' => $message];

            $response = $this->client->request('POST', $path, ['query' => $query]);
            $content = $response->getBody()->getContents();
            dd(json_decode($content));
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function getBidData ($projectId)
    {
        $path = "messages/0.1/threads/$thread_id/messages/";
        $query = ['message' => $message];

        $response = $this->client->request('POST', $path, ['query' => $query]);
        $content = $response->getBody()->getContents();
        dd(json_decode($content));
    }

    public function milestone()
    {
        $projectId = 16297544;

        $bid = 

        $bidId = 466010;
        $description = "Milestone custom description";
        $amount = 100;

        try {
            $path = "projects/0.1/milestone_requests/";
            $jsonBody = [
                RequestOptions::JSON => [
                    "project_id"=>  16297544,
                    "bid_id"=>  466010,
                    "description"=>  "some milestone request",
                    "amount"=>  10
                ]
            ];

            $response = $this->client->request('GET', $path, $jsonBody);
            $content = $response->getBody()->getContents();
            dd(json_decode($content));
        } catch (\Throwable $th) {
            throw $th;
        }
    }


}
