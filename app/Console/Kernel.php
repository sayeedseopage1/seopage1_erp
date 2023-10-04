<?php

namespace App\Console;

use App\Console\Commands\AddMenu;
use App\Console\Commands\AddMissingRolePermission;
use App\Console\Commands\AutoCreateRecurringExpenses;
use App\Console\Commands\AutoCreateRecurringInvoices;
use App\Console\Commands\AutoCreateRecurringTasks;
use App\Console\Commands\AutoStopTimer;
use App\Console\Commands\ClearNullSessions;
use App\Console\Commands\CreateTranslations;
use App\Console\Commands\FetchTicketEmails;
use App\Console\Commands\HideCronJobMessage;
use App\Console\Commands\RemoveSeenNotification;
use App\Console\Commands\SendAttendanceReminder;
use App\Console\Commands\SendAutoTaskReminder;
use App\Console\Commands\SendEventReminder;
use App\Console\Commands\SendAutoFollowUpReminder;
use App\Console\Commands\SendProjectReminder;
use App\Console\Commands\UpdateExchangeRates;
use App\Console\Commands\SendInvoiceReminder;
use App\Console\Commands\SyncUserPermissions;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        UpdateExchangeRates::class,
        AutoStopTimer::class,
        SendEventReminder::class,
        SendProjectReminder::class,
        HideCronJobMessage::class,
        SendAutoTaskReminder::class,
        CreateTranslations::class,
        AddMenu::class,
        AutoCreateRecurringInvoices::class,
        AutoCreateRecurringExpenses::class,
        ClearNullSessions::class,
        SendInvoiceReminder::class,
        RemoveSeenNotification::class,
        SendAttendanceReminder::class,
        AutoCreateRecurringTasks::class,
        SyncUserPermissions::class,
        SendAutoFollowUpReminder::class,
        FetchTicketEmails::class,
        AddMissingRolePermission::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('update-exchange-rate')->daily()->timezone(config('app.cron_timezone'));
        $schedule->command('auto-stop-timer')->dailyAt('23:59')->timezone(config('app.cron_timezone'));
        $schedule->command('send-event-reminder')->everyMinute();
       // $schedule->command('send-project-reminder')->daily()->timezone(config('app.cron_timezone'));
        $schedule->command('hide-cron-message')->everyMinute();
      //  $schedule->command('send-auto-task-reminder')->daily()->timezone(config('app.cron_timezone'));
        $schedule->command('recurring-invoice-create')->daily()->timezone(config('app.cron_timezone'));
        $schedule->command('recurring-expenses-create')->daily()->timezone(config('app.cron_timezone'));
        $schedule->command('clear-null-session')->hourly();
        $schedule->command('send-invoice-reminder')->daily()->timezone(config('app.cron_timezone'));
        $schedule->command('queue:work --tries=3 --stop-when-empty')->withoutOverlapping();
        $schedule->command('delete-seen-notification')->daily()->timezone(config('app.cron_timezone'));
        $schedule->command('send-attendance-reminder')->everyMinute();
        $schedule->command('recurring-task-create')->dailyAt('23:59')->timezone(config('app.cron_timezone'));
        $schedule->command('sync-user-permissions')->everyMinute();
        $schedule->command('create-database-backup')->hourly();
        $schedule->command('delete-database-backup')->hourly();
      //  $schedule->command('send-auto-followup-reminder')->everyMinute();
        $schedule->command('fetch-ticket-emails')->everyMinute();
        $schedule->command('add-missing-permissions')->everyThirtyMinutes();
        // $schedule->command('task:daily')->daily()->timezone(config('app.cron_timezone'));
        $schedule->command('monthly_project_refresh:monthly')->monthly()->timezone(config('app.cron_timezone'));
        // $schedule->command('duedate:daily')->daily()->timezone(config('app.cron_timezone'));
        $schedule->command('award_time_check:daily')->everyMinute();
        
        $schedule->command('deliverable_status_check:daily')->everyFiveMinutes();
        $schedule->command('daily:schedule')->everyMinute();
       
    }
    Log::info('Cron job started.');
// Your cron job logic here
    Log::info('Cron job completed successfully.');
    Log::error();
// Your cron job logic here
    Log::error('Cron Failed.');

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }

}
