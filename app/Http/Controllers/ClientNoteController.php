<?php

namespace App\Http\Controllers;

use App\DataTables\ClientNotesDataTable;
use App\Helper\Reply;
use App\Http\Requests\Admin\Client\StoreClientNote;
use App\Models\ClientNote;
use App\Models\ClientUserNote;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ClientNoteController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.notes';
        $this->middleware(function ($request, $next) {
            return $next($request);
        });
    }

    public function index(ClientNotesDataTable $dataTable)
    {
        abort_403(!(in_array(user()->permission('view_client_note'), ['all', 'added']) || in_array('client', user_roles())));

        return $dataTable->render('clients.notes.index', $this->data);
    }

    public function create()
    {
        abort_403(!in_array(user()->permission('add_client_note'), ['all', 'added', 'both']));

        $this->employees = User::allEmployees();

        $this->pageTitle = __('app.add') . ' ' . __('app.client') . ' ' . __('app.note');
        $this->clientId = request('client');

        if (request()->ajax()) {
            $html = view('clients.notes.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'clients.notes.create';
        return view('clients.create', $this->data);
    }

    public function show($id)
    {
        $this->note = ClientNote::find($id);

        /** @phpstan-ignore-next-line */
        $this->noteMembers = $this->note->members->pluck('user_id')->toArray();
        $this->employees = User::whereIn('id', $this->noteMembers)->get();

        $viewClientNotePermission = user()->permission('view_client_note');

        abort_403(!($viewClientNotePermission == 'all'
            || ($viewClientNotePermission == 'added' && $this->note->added_by == user()->id)
            || ($viewClientNotePermission == 'owned' && $this->note->client_id == user()->id)
            || ($viewClientNotePermission == 'both' && ($this->note->client_id == user()->id || $this->note->added_by == user()->id))
            || (in_array('client', user_roles()) && ($this->note->type == 0 || $this->note->is_client_show == 1))
            )
        );

        $this->pageTitle = __('app.client') . ' ' . __('app.note');

        if (request()->ajax()) {
            $html = view('clients.notes.show', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'clients.notes.show';
        return view('clients.create', $this->data);

    }

    public function store(StoreClientNote $request)
    {
        abort_403(!in_array(user()->permission('add_client_note'), ['all', 'added', 'both']));

        $this->employees = User::allEmployees();

        $note = new ClientNote();
        $note->title = $request->title;
        $note->client_id = $request->client_id;
        $note->details = $request->details;
        $note->type = $request->type;
        $note->is_client_show = $request->is_client_show ? $request->is_client_show : '';
        $note->ask_password = $request->ask_password ? $request->ask_password : '';
        $note->save();

        /* if note type is private */
        if ($request->type == 1) {
            $users = $request->user_id;

            if (!is_null($users)) {
                foreach ($users as $user) {
                    ClientUserNote::firstOrCreate([
                        'user_id' => $user,
                        'client_note_id' => $note->id
                    ]);
                }
            }
        }

        return Reply::successWithData(__('messages.notesAdded'), ['redirectUrl' => route('clients.show', $note->client_id) . '?tab=notes']);

    }

    public function edit($id)
    {

        $this->pageTitle = __('app.edit') . ' ' . __('app.client') . ' ' . __('app.note');

        $this->note = ClientNote::findOrFail($id);
        $editClientNotePermission = user()->permission('view_client_note');

        abort_403(!($editClientNotePermission == 'all'
        || ($editClientNotePermission == 'added' && user()->id == $this->note->added_by)
        || ($editClientNotePermission == 'both' && user()->id == $this->note->added_by)));

        $this->employees = User::allEmployees();
        /** @phpstan-ignore-next-line */
        $this->noteMembers = $this->note->members->pluck('user_id')->toArray();
        $this->clientId = $this->note->client_id;

        if (request()->ajax()) {
            $html = view('clients.notes.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'clients.notes.edit';
        return view('clients.create', $this->data);

    }

    public function update(StoreClientNote $request, $id)
    {

        $note = ClientNote::findOrFail($id);
        $note->title = $request->title;
        $note->details = $request->details;
        $note->type = $request->type;
        $note->is_client_show = $request->is_client_show ?: '';
        $note->ask_password = $request->ask_password ?: '';
        $note->save();

        /* if note type is private */
        if ($request->type == 1) {
            // delete all data of this client_note_id from client_user_notes
            ClientUserNote::where('client_note_id', $note->id)->delete();

            $users = $request->user_id;

            if (!is_null($users)) {
                foreach ($users as $user) {
                    ClientUserNote::firstOrCreate([
                        'user_id' => $user,
                        'client_note_id' => $note->id
                    ]);
                }
            }
        }

        return Reply::successWithData(__('messages.notesUpdated'), ['redirectUrl' => route('clients.show', $note->client_id) . '?tab=notes']);
    }

    public function destroy($id)
    {
        $this->contact = ClientNote::findOrFail($id);
        $this->deletePermission = user()->permission('delete_client_note');

        abort_403(!($this->deletePermission == 'all'
            || ($this->deletePermission == 'added' && $this->contact->added_by == user()->id))
            || ($this->deletePermission == 'both' && $this->contact->added_by == user()->id)
        );
        $this->contact->delete();

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
        abort_403(!(user()->permission('delete_client_note') == 'all'));

        ClientNote::whereIn('id', explode(',', $request->row_ids))->delete();
        return true;
    }

    public function askForPassword($id)
    {
        $this->note = ClientNote::findOrFail($id);
        return view('clients.notes.verify-password', $this->data);
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
