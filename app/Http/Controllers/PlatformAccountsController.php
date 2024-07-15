<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class PlatformAccountsController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Platform Accounts';
    }

    static function Route($uri = 'account/all-platform-accounts', $name = 'all-platform-accounts')
    {
        Route::controller(self::class)->prefix($uri)->name($name.'.')->group(function(){
            Route::get('/', 'index')->name('index');
        });
    }

    function index()
    {
        return view('platform-accounts.index', $this->data);
    }
}
