<?php

namespace App\Http\Controllers;

use App\DataTables\LeadNotesDataTable;
use App\Helper\Reply;
use App\Http\Requests\Lead\StoreLeadNote;
use App\Models\LeadNote;
use App\Models\LeadUserNote;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LeadNoteController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.notes';
        $this->middleware(function ($request, $next) {
            return $next($request);
        });
    }

    public function index(LeadNotesDataTable $dataTable)
    {
        abort_403(!(in_array(user()->permission('view_lead_note'), ['all', 'added'])));

        return $dataTable->render('leads.notes.index', $this->data);
    }

    public function create()
    {
        abort_403(!in_array(user()->permission('add_lead_note'), ['all', 'added', 'both']));

        $this->employees = User::allEmployees();

        $this->pageTitle = __('app.add') . ' ' . __('app.lead') . ' ' . __('app.note');
        $this->leadId = request('lead');

        if (request()->ajax()) {
            $html = view('leads.notes.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'leads.notes.create';
        return view('leads.create', $this->data);
    }

    public function show($id)
    {
        $this->note = LeadNote::findOrFail($id);

        /** @phpstan-ignore-next-line */
        $this->noteMembers = $this->note->members->pluck('user_id')->toArray();
        $this->employees = User::whereIn('id', $this->noteMembers)->get();

        $viewClientNotePermission = user()->permission('view_lead_note');
        $memberIds = $this->note->members->pluck('user_id')->toArray(); /** @phpstan-ignore-line */

        abort_403(!($viewClientNotePermission == 'all'
            || ($viewClientNotePermission == 'added' && $this->note->added_by == user()->id)
            || ($viewClientNotePermission == 'owned' && in_array(user()->id, $memberIds) && in_array('employee', user_roles()))
            || ($viewClientNotePermission == 'both' && (in_array(user()->id, $memberIds) || $this->note->added_by == user()->id))
            )
        );

        $this->pageTitle = __('app.lead') . ' ' . __('app.note');

        if (request()->ajax()) {
            $html = view('leads.notes.show', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'leads.notes.show';
        return view('leads.create', $this->data);

    }

    public function store(StoreLeadNote $request)
    {
        abort_403(!in_array(user()->permission('add_lead_note'), ['all', 'added', 'both']));

        $this->employees = User::allEmployees();

        $note = new LeadNote();
        $note->title = $request->title;
        $note->lead_id = $request->lead_id;
        $note->details = $request->details;
        $note->type = $request->type;
        $note->ask_password = $request->ask_password ? $request->ask_password : '';
        $note->save();

        /* if note type is private */
        if ($request->type == 1) {
            $users = $request->user_id;

            if (!is_null($users)) {
                foreach ($users as $user) {
                    LeadUserNote::firstOrCreate([
                        'user_id' => $user,
                        'lead_note_id' => $note->id
                    ]);
                }
            }
        }

        return Reply::successWithData(__('messages.notesAdded'), ['redirectUrl' => route('leads.show', $note->lead_id) . '?tab=notes']);
    }

    public function edit($id)
    {
        $this->pageTitle = __('app.edit') . ' ' . __('app.lead') . ' ' . __('app.note');

        $this->note = LeadNote::findOrFail($id);
        $editClientNotePermission = user()->permission('view_lead_note');
        $memberIds = $this->note->members->pluck('user_id')->toArray(); /** @phpstan-ignore-line */

        abort_403(!($editClientNotePermission == 'all'
            || ($editClientNotePermission == 'added' && user()->id == $this->note->added_by)
            || ($editClientNotePermission == 'owned' && in_array(user()->id, $memberIds) && in_array('employee', user_roles()))
            || ($editClientNotePermission == 'both' && ($this->note->added_by == user()->id || in_array(user()->id, $memberIds)))
        ));

        $this->employees = User::allEmployees();
        /** @phpstan-ignore-next-line */
        $this->noteMembers = $this->note->members->pluck('user_id')->toArray();
        $this->leadId = $this->note->lead_id;

        if (request()->ajax()) {
            $html = view('leads.notes.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'leads.notes.edit';
        return view('leads.create', $this->data);

    }

    public function update(StoreLeadNote $request, $id)
    {
        $note = LeadNote::findOrFail($id);
        $note->title = $request->title;
        $note->details = $request->details;
        $note->type = $request->type;
        $note->ask_password = $request->ask_password ?: '';
        $note->save();

        /* if note type is private */
        if ($request->type == 1) {
            // delete all data of this lead_note_id from lead_user_notes
            LeadUserNote::where('lead_note_id', $note->id)->delete();

            $users = $request->user_id;

            if (!is_null($users)) {
                foreach ($users as $user) {
                    LeadUserNote::firstOrCreate([
                        'user_id' => $user,
                        'lead_note_id' => $note->id
                    ]);
                }
            }
        }

        return Reply::successWithData(__('messages.notesUpdated'), ['redirectUrl' => route('leads.show', $note->lead_id) . '?tab=notes']);
    }

    public function destroy($id)
    {
        $this->note = LeadNote::findOrFail($id);
        $this->deletePermission = user()->permission('delete_lead_note');
        $memberIds = $this->note->members->pluck('user_id')->toArray(); /** @phpstan-ignore-line */

        abort_403(!($this->deletePermission == 'all'
            || ($this->deletePermission == 'added' && $this->note->added_by == user()->id))
            || ($this->deletePermission == 'owned' && in_array(user()->id, $memberIds) && in_array('employee', user_roles()))
            || ($this->deletePermission == 'both' && ($this->note->added_by == user()->id || in_array(user()->id, $memberIds)))
        );
        $this->note->delete();

        return Reply::success(__('messages.notesDeleted'));
    }

    public function applyQuickAction(Request $request)
    {
        if ($request->action_type == 'delete') {
            $this->deleteRecords($request);
            return Reply::success(__('messages.deleteSuccess'));
        }

        return Reply::error(__('messages.selectAction'));
    }

    protected function deleteRecords($request)
    {
        abort_403(!(user()->permission('delete_lead_note') == 'all'));

        LeadNote::whereIn('id', explode(',', $request->row_ids))->delete();
        return true;
    }

    public function askForPassword($id)
    {
        $this->note = LeadNote::findOrFail($id);
        return view('leads.notes.verify-password', $this->data);
    }

    public function checkPassword(Request $request)
    {
        $this->client = User::find($this->user->id);

        if (Hash::check($request->password, $this->client->password)) {
            return Reply::success(__('messages.passwordMatched'));
        }

        return Reply::error(__('messages.incorrectPassword'));
    }

}
