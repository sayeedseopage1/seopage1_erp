a<?php

namespace App\Notifications;

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
        dd($this->sticky_note);
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
        $project = Project::where('id',$note->project_id)->first();
        $milestone = ProjectMilestone::where('id',$note->milestone_id)->first();
        $task = Task::where('id',$note->task_id)->first();
        $client = User::where('id',$note->client_id)->first();
        $url1 = route('sticky-notes.index');
        $url2 = route('sticky-notes.edit', $note->id);

        $greet= '<p><b style="color: black">'  . '<span style="color:black">'.'Hi '. $notifiable->name. ','.'</span>'.'</b></p>';

        $header= '<strong>' . __('Take action on your note!!') .'</strong>';

        $body= '<p>'.'Take action on your note for project <b>'.$project->project_name.'</b> from client <b>'.$client->name.'</b>.</p>';
        $content =
        '<p>
            <b style="color: black">' . __('Project name') . ': '.'</b>' . '<a href="'.route('projects.show',$project->id).'">'.$project->project_name . '
        </p>'.
        '<p>
            <b style="color: black">' . __('Client name') . ': '.'</b>' . '<a href="'.route('clients.show',$client->id).'">'.$client->name .'</a>'. '
        </p>'
        .
        '<p>
            <b style="color: black">' . __('Milestone name') . ': '.'</b>' . '<a href="'.route('clients.show',$client->id).'">'.$milestone->milestone_title .'</a>'. '
        </p>'
        .
        '<p>
            <b style="color: black">' . __('Task') . ': '.'</b>' . '<a href="'.route('tasks.show',$task->id).'">'.$task->heading .'</a>'. '
        </p>'
        .
        'h3 style="color: black"><b><u>Reminder Note</u></b></h3>'
        .
        '<p>'.$note->note_text.'</p>';

        return (new MailMessage)
        ->subject(__('Take action on your note!!') )

        ->greeting(__('email.Hi') . ' ' . mb_ucwords($notifiable->name) . ',')
        ->markdown('mail.sticky-note.note', ['url1' => $url1, 'url2' => $url2, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);
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
