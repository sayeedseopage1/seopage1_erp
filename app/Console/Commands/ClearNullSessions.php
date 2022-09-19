<?php

namespace App\Console\Commands;

use App\Models\Session;
use Illuminate\Console\Command;

class ClearNullSessions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'clear-null-session';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear database session entries where user id is null';

    /**
     * Execute the console command.
     *
     * @return mixed
     */

    public function handle()
    {
        Session::whereNull('user_id')->delete();
    }

}
