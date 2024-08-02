<?php

namespace App\Console\Commands;

use App\Http\Controllers\HelperPendingActionController;
use App\Models\StickyNote;
use App\Models\User;
use App\Notifications\StickyNoteReminderNotification;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class StickyNoteReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sticky_note_reminder_check:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sticky note reminder check';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // DB::beginTransaction();
        $date = '2024-08-01 00:00:00';
        $notes = StickyNote::where('pending_action_status', '0')->where('status', 'Live')->where('created_at', '>=', $date)->get();
        foreach ($notes as $note) {
            $currect_time = Carbon::now();
            if($note->reminder_time <= $currect_time) {
                $sticky_note = StickyNote::find($note->id);
                $sticky_note->pending_action_status = '1';
                $sticky_note->save();

                // send pending action
                $helper = new HelperPendingActionController();
                $helper->StickyNoteReminder($note->user_id);

                // send notification
                // $user = User::where('id', $note->user_id)->first();
                // Notification::send($user, new StickyNoteReminderNotification($sticky_note));
            }
        }
        $this->info('Sticky note reminder check successfully');
    }
}
