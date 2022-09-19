<?php

namespace App\Console\Commands;

use App\Models\Notification;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class RemoveSeenNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'delete-seen-notification';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete seen notifications';
    /**
     * @var \Illuminate\Contracts\Foundation\Application|\Illuminate\Session\SessionManager|\Illuminate\Session\Store|mixed
     */
    private $global_setting;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        try {
            $this->global_setting = global_setting();
        } catch (\Exception $e) {
            Log::info($e);
        }
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */

    public function handle()
    {
        Notification::whereNotNull('read_at')->delete();
    }

}
