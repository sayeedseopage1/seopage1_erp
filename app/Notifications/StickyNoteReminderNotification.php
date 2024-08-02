<?php

namespace App\Notifications;

use App\Models\StickyNote;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class StickyNoteReminderNotification extends Notification implements ShouldQueue
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
        $note = StickyNote::with(['project', 'milestone', 'task', 'client'])->find($this->sticky_note->id);
        $project = $note->project;
        $milestone = $note->milestone;
        $task = $note->task;
        $client = $note->client;
        $url1 = route('sticky-notes.index');
        $url2 = route('sticky-notes.edit', $note->id);

        $greet = '<p><b style="color: black">Hi ' . $notifiable->name . ',</b></p>';
        $header = '<strong>Take action on your note!!</strong>';
        $body = '<p>Take action on your note for project <b>' . $project->project_name . '</b> from client <b>' . $client->name . '</b>.</p>';
        
        $content = 
            '<p><b style="color: black">Project name: </b><a href="' . route('projects.show', $project->id) . '">' . $project->project_name . '</a></p>' .
            '<p><b style="color: black">Client name: </b><a href="' . route('clients.show', $client->id) . '">' . $client->name . '</a></p>' .
            '<p><b style="color: black">Milestone name: </b><a href="' . route('milestones.show', $milestone->id) . '">' . $milestone->milestone_title . '</a></p>' .
            '<p><b style="color: black">Task: </b><a href="' . route('tasks.show', $task->id) . '">' . $task->heading . '</a></p>' .
            '<h3 style="color: black"><b><u>Reminder Note</u></b></h3>' .
            '<p>' . $note->note_text . '</p>';

        
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