<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class ChatGptController extends AccountBaseController
{
    protected $httpClient;

    function __construct()
    {

        // parent::__construct();
        // $this->pageTitle = 'app.menu.projects';
        // $this->middleware(function ($request, $next) {

        //     abort_403(!in_array('projects', $this->user->modules));
        //     //dd($this->user->modules);
        //     return $next($request);
        // });

        $this->httpClient = new Client([
            'base_uri' => 'https://api.openai.com/v1/',
            'headers' => [
                'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
                'Content-Type' => 'application/json'
            ]
        ]);
    }

    static function Routes()
    {
        Route::controller(self::class)->prefix('chatgpt')->name('chatgpt.')->group(function () {
            Route::post('/message', 'askToChatGpt')->name('ask');
        });
    }

    public function askToChatGpt(Request $req)
    {
        $req->validate([
            'message' => 'required'
        ]);

        $response = $this->httpClient->post('chat/completions', [
            'json' => [
                'model' => 'gpt-3.5-turbo',
                'messages' => [
                    ['role' => 'system', 'content' => 'I want you to act as an experienced English to Bangla translator with 20 years of experience. Now, please translate $content from English to Bangla without changing anything in $content.'],
                    ['role' => 'user', 'content' => $req->message]
                ]
            ]
        ]);
        // dd($response->getBody());
        $body = json_decode($response->getBody(), true);
        $content = $body['choices'][0]['message']['content'];
        // dd($body);
        return response()->json($content);
    }
}
