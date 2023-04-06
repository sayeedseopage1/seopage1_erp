<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\Tasks\StoreTaskComment;
use App\Models\Task;
use App\Models\TaskComment;
use App\Models\TaskReply;
use App\Notifications\TaskCommentNotification;
use Illuminate\Http\Request;
use Notification;
use Auth;
use App\Models\TaskUser;
use App\Models\Project;
use App\Models\User;
use DB;

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
        
        $this->task= Task::where('id',$request->taskId)->first();
        $project= Project::where('id',$task->project_id)->first();
        $task_member= TaskUser::where('task_id',$request->taskId)->first();
        $sender= User::where('id',Auth::id())->first();
        $users= User::where('id',$task->added_by)->orWhere('id',$task_member->user_id)->orWhere('id',$project->pm_id)->get();

        $this->replys =DB::table('task_replies')
        ->join('users','task_replies.user_id','=','users.id')
        ->select('task_replies.*','users.name','users.image','users.updated_at')
        ->get();

        foreach ($users as $user) {
        // Mail::to($user->email)->send(new ClientSubmitMail($client,$user));
            Notification::send($user, new TaskCommentNotification($task,$sender));
        }

        $view = view('tasks.ajax.files', $this->data)->render();

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
        
        $viewTaskFilePermission = user()->permission('view_task_files');
        $viewSubTaskPermission = user()->permission('view_sub_tasks');

        $this->task = Task::with(['boardColumn', 'project', 'users', 'label', 'approvedTimeLogs', 'approvedTimeLogs.user', 'approvedTimeLogs.activeBreak', 'comments', 'comments.user', 'subtasks.files', 'userActiveTimer',
        'files' => function ($q) use ($viewTaskFilePermission) {
            if ($viewTaskFilePermission == 'added') {
                $q->where('added_by', user()->id);
            }
        },
        'subtasks' => function ($q) use ($viewSubTaskPermission) {
            if ($viewSubTaskPermission == 'added') {
                $q->where('added_by', user()->id);
            }
        }])
        ->withCount('subtasks', 'files', 'comments', 'activeTimerAll')
        ->findOrFail($comment_task_id)->withCustomFields();

        $this->comments = TaskComment::with('task')->where('task_id', $comment_task_id)->orderBy('id', 'desc')->get();

        $view = view('tasks.ajax.files', $this->data)->render();

        return Reply::dataOnly(['status' => 'success', 'view' => $view]);
    }

    public function replyDelete($id)
    {
        $comment = TaskReply::findOrFail($id);
        $this->deletePermission = user()->permission('delete_task_comments');
        abort_403(!($this->deletePermission == 'all' || ($this->deletePermission == 'added') && $comment->added_by == user()->id));

        $comment_task_id = $comment->task_id;
        $comment->delete();
        
        $viewTaskFilePermission = user()->permission('view_task_files');
        $viewSubTaskPermission = user()->permission('view_sub_tasks');

        $this->task = Task::with(['boardColumn', 'project', 'users', 'label', 'approvedTimeLogs', 'approvedTimeLogs.user', 'approvedTimeLogs.activeBreak', 'comments', 'comments.user', 'subtasks.files', 'userActiveTimer',
        'files' => function ($q) use ($viewTaskFilePermission) {
            if ($viewTaskFilePermission == 'added') {
                $q->where('added_by', user()->id);
            }
        },
        'subtasks' => function ($q) use ($viewSubTaskPermission) {
            if ($viewSubTaskPermission == 'added') {
                $q->where('added_by', user()->id);
            }
        }])
        ->withCount('subtasks', 'files', 'comments', 'activeTimerAll')
        ->findOrFail($comment_task_id)->withCustomFields();

        $this->comments = TaskComment::with('task')->where('task_id', $comment_task_id)->orderBy('id', 'desc')->get();

        $view = view('tasks.ajax.files', $this->data)->render();

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

//    COMMENT REPLY SYSTEM START
    public function replyStore(Request $request)
    {
        //dd($request->all());
        $reply = new TaskReply();
        $reply->reply = $request->reply;
        $reply->comment_id = $request->reply_id;
        $reply->user_id = $this->user->id;
        $reply->task_id = $request->taskId;
        $reply->added_by = $this->user->id;
        //$reply->last_updated_by = $request->last_updated_by;
        if ($reply->save()) {
            $viewTaskFilePermission = user()->permission('view_task_files');
            $viewSubTaskPermission = user()->permission('view_sub_tasks');
            $this->task = Task::with(['boardColumn', 'project', 'users', 'label', 'approvedTimeLogs', 'approvedTimeLogs.user', 'approvedTimeLogs.activeBreak', 'comments', 'comments.user', 'subtasks.files', 'userActiveTimer',
            'files' => function ($q) use ($viewTaskFilePermission) {
                if ($viewTaskFilePermission == 'added') {
                    $q->where('added_by', user()->id);
                }
            },
            'subtasks' => function ($q) use ($viewSubTaskPermission) {
                if ($viewSubTaskPermission == 'added') {
                    $q->where('added_by', user()->id);
                }
            }])
            ->withCount('subtasks', 'files', 'comments', 'activeTimerAll')
            ->findOrFail($request->taskId)->withCustomFields();

            $this->comments = $this->task->comments;

            $view = view('tasks.ajax.files', $this->data)->render();
            //dd($view);

            return response()->json([
                'status' => 400,
                'html' => $view
            ]);
        }
    }
}
