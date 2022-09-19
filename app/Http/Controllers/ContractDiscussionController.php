<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\Admin\Contract\StoreDiscussionRequest;
use App\Http\Requests\Admin\Contract\UpdateDiscussionRequest;
use App\Models\ContractDiscussion;

class ContractDiscussionController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.contracts';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('contracts', $this->user->modules));
            return $next($request);
        });
    }

    public function store(StoreDiscussionRequest $request)
    {
        $this->addPermission = user()->permission('add_contract_discussion');
        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $contractDiscussion = new ContractDiscussion();
        $contractDiscussion->from = user()->id;
        $contractDiscussion->message = $request->comment;
        $contractDiscussion->contract_id = $request->contract_id;
        $contractDiscussion->save();

        $this->discussions = ContractDiscussion::with('user')->where('contract_id', $request->contract_id)->orderBy('id', 'desc')->get();
        $view = view('contracts.discussions.show', $this->data)->render();

        return Reply::dataOnly(['status' => 'success', 'view' => $view]);

    }

    public function edit($id)
    {
        $this->comment = ContractDiscussion::with('user')->findOrFail($id);
        $this->editPermission = user()->permission('edit_contract_discussion');
        abort_403(!($this->editPermission == 'all' || ($this->editPermission == 'added' && $this->comment->added_by == user()->id)));

        return view('contracts.discussions.edit', $this->data);

    }

    public function update(UpdateDiscussionRequest $request, $id)
    {
        $comment = ContractDiscussion::findOrFail($id);
        $this->editPermission = user()->permission('edit_contract_discussion');
        abort_403(!($this->editPermission == 'all' || ($this->editPermission == 'added' && $this->comment->added_by == user()->id)));

        $comment->message = $request->comment;
        $comment->save();

        $this->discussions = ContractDiscussion::with('user')->where('contract_id', $comment->contract_id)->orderBy('id', 'desc')->get();
        $view = view('contracts.discussions.show', $this->data)->render();

        return Reply::dataOnly(['status' => 'success', 'view' => $view]);

    }

    /**
     * @param int $id
     * @return mixed|void
     */
    public function destroy($id)
    {
        $comment = ContractDiscussion::findOrFail($id);
        $this->deletePermission = user()->permission('delete_contract_discussion');
        abort_403(!(in_array($this->deletePermission, ['all', 'added']) && $comment->added_by == user()->id));

        $comment_contract_id = $comment->contract_id;
        $comment->delete();
        $this->discussions = ContractDiscussion::with('user')->where('contract_id', $comment_contract_id)->orderBy('id', 'desc')->get();
        $view = view('contracts.discussions.show', $this->data)->render();

        return Reply::dataOnly(['status' => 'success', 'view' => $view]);

    }

}
