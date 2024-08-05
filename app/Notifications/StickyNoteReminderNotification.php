<?php

namespace App\Notifications;

use App\Models\Deal;
use App\Models\DealStage;
use App\Models\Project;
use App\Models\ProjectMilestone;
use App\Models\StickyNote;
use App\Models\Task;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class StickyNoteReminderNotification extends Notification
{
    use Queueable;

    protected $sticky_note;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($sticky_note)
    {
        $this->sticky_note = $sticky_note;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $note = StickyNote::where('id',$this->sticky_note->id)->first();
        $client = User::where('id',$note->client_id)->first();
        $project = Project::where('id',$note->project_id)->first(); 
        $milestone = ProjectMilestone::where('id',$note->milestone_id)->first();
        $task = Task::where('id',$note->task_id)->first();
        $subTask = Task::where('subtask_id',$note->sub_task_id)->whereNotNull('subtask_id')->first();
        $deal = DealStage::where('id',$note->deal_id)->first();
        $won_deal = Deal::where('id',$note->won_deal_id)->first();
        $user = User::where('id',$note->user_id)->first();

        $url1 = route('sticky-notes.index');
        $url2 = route('sticky-notes.edit', $note->id);

        $greet = '<p><b style="color: black">Hi ' . $notifiable->name . ',</b></p>';
        $header = '<strong>Take action on your note!!</strong>';
        if(in_array($user->role_id, [1, 4, 8]) && $project != null){
        $body = '<p>Take action on your note for project <b>' . $project->project_name . '</b> from client <b>' . $client->name . '</b>.</p>';
        }
        if($user->role_id == 6 && $task != null){
        $body = '<p>Take action on your note for task <b>' . $task->heading . '</b> from client <b>' . $client->name . '</b>.</p>';
        }
        if(in_array($user->role_id, [5, 9, 10, 13]) && $subTask != null){
        $body = '<p>Take action on your note for subtask <b>' . $subTask->heading . '</b> from client <b>' . $client->name . '</b>.</p>';
        }
        if(in_array($user->role_id, [1, 7, 8]) && $deal != null){
        $body = '<p>Take action on your note for deal <b>' . $deal->deal_name . '</b> from client <b>' . $client->name . '</b>.</p>';
        }
        if(in_array($user->role_id, [1, 7, 8]) && $won_deal != null){
        $body = '<p>Take action on your note for deal <b>' . $won_deal->deal_name . '</b> from client <b>' . $client->name . '</b>.</p>';
        }
        
        $content = '';
            if($project != null){
                $content .= '<p><b style="color: black">Project name: </b><a href="' . route('projects.show', $project->id) . '">' . $project->project_name . '</a></p>';
            }
        
            $content .= '<p><b style="color: black">Client name: </b><a href="' . route('clients.show', $client->id) . '">' . $client->name . '</a></p>';

            if ($milestone != null) {
                $content .= '<p><b style="color: black">Milestone name: </b><a href="' . route('milestones.show', $milestone->id) . '">' . $milestone->milestone_title . '</a></p>';
            }
            
            if ($task != null) {
                $content .= '<p><b style="color: black">Task: </b><a href="' . route('tasks.show', $task->id) . '">' . $task->heading . '</a></p>';
            }

            if ($subTask != null) {
                $content .= '<p><b style="color: black">Subtask: </b><a href="' . route('tasks.show', $subTask->id) . '">' . $subTask->heading . '</a></p>';
            }

            if ($deal != null) {
                $content .= '<p><b style="color: black">Deal: </b><a href="' . route('deals.show', $deal->id) . '">' . $deal->project_name . '</a></p>';
            }
            
            if ($won_deal != null) {
                $content .= '<p><b style="color: black">Won deal: </b><a href="' . route('deals.show', $won_deal->id) . '">' . $won_deal->project_name . '</a></p>';
            }

            $content .= '<h3 style="color: black"><b><u>Reminder Note</u></b></h3>';
            $content .= '<p>' . $note->note_text . '</p>';

            // echo $content;

        return (new MailMessage)
            ->subject('Take action on your note!!')
            ->greeting('Hi ' . mb_ucwords($notifiable->name) . ',')
            ->markdown('mail.sticky-note.note', [
                'url1' => $url1,
                'url2' => $url2,
                'greet' => $greet,
                'content' => $content,
                'body' => $body,
                'header' => $header,
                'name' => mb_ucwords($notifiable->name)
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}