<?php

namespace App\Http\Controllers;

use App\Models\ClientDocument;
use Illuminate\Http\Request;
use App\Helper\Files;
use App\Helper\Reply;
use App\Http\Requests\ClientDocs\CreateRequest;
use App\Http\Requests\ClientDocs\UpdateRequest;

class ClientDocController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.clientDocs';
        $this->middleware(function ($request, $next) {
            return $next($request);
        });
    }

    public function store(CreateRequest $request)
    {
        $fileFormats = ['image/jpeg', 'image/png', 'image/gif', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf', 'text/plain'];

        foreach ($request->file as $index => $fFormat) {
            if (!in_array($fFormat->getClientMimeType(), $fileFormats)) {
                return Reply::error(__('meesages.employeeDocsAllowedFormat'));
            }
        }

        $file = new ClientDocument();
        $file->user_id = $request->user_id;

        $filename = Files::uploadLocalOrS3($request->file, ClientDocument::FILE_PATH . '/' . $request->user_id);

        $file->name = $request->name;
        $file->filename = $request->file->getClientOriginalName();
        $file->hashname = $filename;
        $file->size = $request->file->getSize();
        $file->save();

        $this->files = ClientDocument::where('user_id', $request->user_id)->orderBy('id', 'desc')->get();
        $view = view('clients.files.show', $this->data)->render();

        return Reply::dataOnly(['status' => 'success', 'view' => $view]);
    }

    public function edit($id)
    {
        $this->file = ClientDocument::findOrFail($id);
        return view('clients.files.edit', $this->data);
    }

    public function update(UpdateRequest $request, $id)
    {
        $file = ClientDocument::findOrFail($id);

        $file->name = $request->name;

        if ($request->file) {
            $filename = Files::uploadLocalOrS3($request->file, ClientDocument::FILE_PATH . '/' . $file->user_id);
            $file->filename = $request->file->getClientOriginalName();
            $file->hashname = $filename;
            $file->size = $request->file->getSize();
        }

        $file->save();

        return Reply::success(__('messages.updateSuccess'));
    }

    public function destroy(Request $request, $id)
    {
        $file = ClientDocument::findOrFail($id);
        $deleteDocumentPermission = user()->permission('delete_client_document');
        abort_403(!($deleteDocumentPermission == 'all' || ($deleteDocumentPermission == 'added' && $file->added_by == user()->id)));

        Files::deleteFile($file->hashname, ClientDocument::FILE_PATH . '/' . $file->user_id);

        ClientDocument::destroy($id);

        $this->files = ClientDocument::where('user_id', $file->user_id)->orderBy('id', 'desc')->get();

        $view = view('clients.files.show', $this->data)->render();

        return Reply::successWithData(__('messages.fileDeleted'), ['view' => $view]);

    }

    public function show($id)
    {
        $file = ClientDocument::whereRaw('md5(id) = ?', $id)->firstOrFail();
        $this->viewPermission = user()->permission('view_client_document');

        abort_403(!($this->viewPermission == 'all' || ($this->viewPermission == 'added' && $file->added_by == user()->id)));

        $this->filepath = $file->doc_url;
        return view('clients.files.view', $this->data);

    }

    public function download($id)
    {
        $file = ClientDocument::whereRaw('md5(id) = ?', $id)->firstOrFail();
        $this->viewPermission = user()->permission('view_client_document');

        abort_403(!($this->viewPermission == 'all' || $this->viewPermission == 'added'));

        return download_local_s3($file, ClientDocument::FILE_PATH . '/' . $file->user_id . '/' . $file->hashname);

    }

}
