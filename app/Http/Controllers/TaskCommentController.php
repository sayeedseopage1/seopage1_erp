<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\Tasks\StoreTaskComment;
use App\Models\Task;
use App\Models\TaskComment;
use App\Notifications\TaskCommentNotification;
use Notification;
use Auth;
use App\Models\TaskUser;
use App\Models\Project;
use App\Models\User;
class TaskCommentController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.tasks';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('tasks', $this->user->modules));
            return $next($request);
        });
    }

    /**
     * @param StoreTaskComment $request
     * @return mixed
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function store(StoreTaskComment $request)
    {
        $this->addPermission = user()->permission('add_task_comments');
        $task = Task::findOrFail($request->taskId);
        $taskUsers = $task->users->pluck('id')->toArray();

        abort_403(!(
            $this->addPermission == 'all'
            || ($this->addPermission == 'added' && $task->added_by == user()->id)
            || ($this->addPermission == 'owned' && in_array(user()->id, $taskUsers))
            || ($this->addPermission == 'added' && (in_array(user()->id, $taskUsers) || $task->added_by == user()->id))
        ));

        $comment = new TaskComment();
        $comment->comment = $request->comment;
        $comment->task_id = $request->taskId;
        $comment->user_id = user()->id;
        $comment->save();

        $this->comments = TaskComment::with('user')->where('task_id', $request->taskId)->orderBy('id', 'desc')->get();
        $view = view('tasks.comments.show', $this->data)->render();
        $task= Task::where('id',$request->taskId)->first();
        $project= Project::where('id',$task->project_id)->first();
        //dd($request->taskId);
        $task_member= TaskUser::where('task_id',$request->taskId)->first();
      $sender= User::where('id',Auth::id())->first();
      $users= User::where('id',$task->added_by)->orWhere('id',$task_member->user_id)->orWhere('id',$project->pm_id)->get();
      foreach ($users as $user) {
        // Mail::to($user->email)->send(new ClientSubmitMail($client,$user));
        Notification::send($user, new TaskCommentNotification($task,$sender));
      }
     
        return Reply::dataOnly(['status' => 'success', 'view' => $view]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $comment = TaskComment::findOrFail($id);
        $this->deletePermission = user()->permission('delete_task_comments');
        abort_403(!($this->deletePermission == 'all' || ($this->deletePermission == 'added') && $comment->added_by == user()->id));

        $comment_task_id = $comment->task_id;
        $comment->delete();
        $this->comments = TaskComment::with('task')->where('task_id', $comment_task_id)->orderBy('id', 'desc')->get();
        $view = view('tasks.comments.show', $this->data)->render();

        return Reply::dataOnly(['status' => 'success', 'view' => $view]);
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $this->comment = TaskComment::with('user', 'task')->findOrFail($id);
        $this->editPermission = user()->permission('edit_task_comments');

        abort_403(!($this->editPermission == 'all' || ($this->editPermission == 'added' && $this->comment->added_by == user()->id)));

        return view('tasks.comments.edit', $this->data);

    }

    public function update(StoreTaskComment $request, $id)
    {
        $comment = TaskComment::findOrFail($id);
        $this->editPermission = user()->permission('edit_task_comments');
        abort_403(!($this->editPermission == 'all' || ($this->editPermission == 'added' && $comment->added_by == user()->id)));

        $comment->comment = $request->comment;
        $comment->save();

        $this->comments = TaskComment::with('task')->where('task_id', $comment->task_id)->orderBy('id', 'desc')->get();
        $view = view('tasks.comments.show', $this->data)->render();

        return Reply::dataOnly(['status' => 'success', 'view' => $view]);
    }

}
