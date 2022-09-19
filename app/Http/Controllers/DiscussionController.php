<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\Discussion\StoreRequest;
use App\Models\Discussion;
use App\Models\DiscussionCategory;
use App\Models\DiscussionReply;
use App\Models\Project;
use Illuminate\Http\Request;

class DiscussionController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = __('modules.projects.discussion');
    }

    public function create()
    {
        $this->addPermission = user()->permission('add_project_discussions');
        $this->projectId = request('id');
        $project = Project::findOrFail($this->projectId);

        abort_403(!(in_array($this->addPermission, ['all', 'added']) || $project->project_admin == user()->id));

        $this->categories = DiscussionCategory::orderBy('order', 'asc')->get();
        $this->redirectUrl = request('redirectUrl');

        return view('discussions.create', $this->data);
    }

    /**
     * @param StoreRequest $request
     * @return array
     */
    public function store(StoreRequest $request)
    {
        $discussion = new Discussion();
        $discussion->title = $request->title;
        $discussion->discussion_category_id = $request->discussion_category;

        if (request()->has('project_id')) {
            $discussion->project_id = $request->project_id;
        }

        $discussion->user_id = $this->user->id;
        $discussion->save();

        $discussionReply = DiscussionReply::create(
            [
                'body' => $request->description,
                'user_id' => $this->user->id,
                'discussion_id' => $discussion->id
            ]
        );

        $redirectUrl = urldecode($request->redirect_url);

        if ($redirectUrl == '') {
            $redirectUrl = route('projects.index');
        }

        return Reply::successWithData(__('messages.recordSaved'), ['discussion_id' => $discussion->id, 'discussion_reply_id' => $discussionReply->id, 'redirectUrl' => $redirectUrl]);
    }

    /**
     * @param int $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector|mixed
     */
    public function show($id)
    {
        $this->discussion = Discussion::with('category', 'replies', 'replies.user', 'replies.files')->findOrFail($id);
        $viewPermission = user()->permission('view_project_discussions');
        abort_403(!($viewPermission == 'all' || ($viewPermission == 'added' && $this->discussion->added_by == user()->id)));

        if (request()->ajax()) {
            $html = view('discussions.replies.show', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        return redirect(route('projects.show', $this->discussion->project_id) . '?tab=discussion');
    }

    public function destroy($id)
    {
        $this->discussion = Discussion::with('category', 'replies', 'replies.user', 'replies.files')->findOrFail($id);
        $deletePermission = user()->permission('delete_project_discussions');
        abort_403(!($deletePermission == 'all' || ($deletePermission == 'added' && $this->discussion->added_by == user()->id)));

        Discussion::destroy($id);
        return Reply::success(__('messages.deleteSuccess'));
    }

    public function setBestAnswer(Request $request)
    {

        $reply = DiscussionReply::findOrFail($request->replyId);
        $editPermission = user()->permission('edit_project_discussions');
        abort_403(!($editPermission == 'all' || ($editPermission == 'added' && $reply->discussion->added_by == user()->id)));

        $replyId = ($request->type == 'set') ? $request->replyId : null;
        Discussion::where('id', $reply->discussion_id)
            ->update(['best_answer_id' => $replyId]);

        $this->discussion = Discussion::with('category', 'replies', 'replies.user', 'replies.files')->findOrFail($reply->discussion_id);
        $html = view('discussions.replies.show', $this->data)->render();
        return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
    }

}
