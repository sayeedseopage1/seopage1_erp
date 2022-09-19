<?php

namespace App\Http\Controllers;

use App\Helper\Files;
use App\Helper\Reply;
use App\Http\Requests\EmployeeDocs\CreateRequest;
use App\Http\Requests\EmployeeDocs\UpdateRequest;
use App\Models\EmployeeDocument;
use Illuminate\Http\Request;

class EmployeeDocController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.employeeDocs';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('employees', $this->user->modules));
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

        $file = new EmployeeDocument();

        $file->name = $request->name;
        $filename = Files::uploadLocalOrS3($request->file, EmployeeDocument::FILE_PATH.'/' . $request->user_id);

        $file->user_id = $request->user_id;
        $file->filename = $request->file->getClientOriginalName();
        $file->hashname = $filename;
        $file->size = $request->file->getSize();
        $file->save();

        $this->files = EmployeeDocument::where('user_id', $request->user_id)->orderBy('id', 'desc')->get();
        $view = view('employees.files.show', $this->data)->render();

        return Reply::dataOnly(['status' => 'success', 'view' => $view]);
    }

    public function edit($id)
    {
        $this->file = EmployeeDocument::findOrFail($id);
        return view('employees.files.edit', $this->data);
    }

    public function update(UpdateRequest $request, $id)
    {
        $file = EmployeeDocument::findOrFail($id);

        $file->name = $request->name;

        if($request->file){
            $filename = Files::uploadLocalOrS3($request->file, EmployeeDocument::FILE_PATH.'/' . $file->user_id);
            $file->filename = $request->file->getClientOriginalName();
            $file->hashname = $filename;
            $file->size = $request->file->getSize();
        }

        $file->save();

        return Reply::success(__('messages.updateSuccess'));
    }

    public function destroy(Request $request, $id)
    {
        $file = EmployeeDocument::findOrFail($id);
        $deleteDocumentPermission = user()->permission('delete_documents');
        abort_403(!($deleteDocumentPermission == 'all' || ($deleteDocumentPermission == 'added' && $file->added_by == user()->id)));

        Files::deleteFile($file->hashname, EmployeeDocument::FILE_PATH.'/' . $file->user_id);

        EmployeeDocument::destroy($id);

        $this->files = EmployeeDocument::where('user_id', $file->user_id)->orderBy('id', 'desc')->get();

        $view = view('employees.files.show', $this->data)->render();

        return Reply::successWithData(__('messages.fileDeleted'), ['view' => $view]);

    }

    public function download($id)
    {
        $file = EmployeeDocument::whereRaw('md5(id) = ?', $id)->firstOrFail();
        $this->viewPermission = user()->permission('view_documents');

        abort_403(!($this->viewPermission == 'all' || ($this->viewPermission == 'added' && $file->added_by == user()->id)));

        return download_local_s3($file, EmployeeDocument::FILE_PATH.'/' . $file->user_id . '/' . $file->hashname);

    }

}
