<?php

namespace App\Http\Controllers;

use App\Helper\Files;
use App\Helper\Reply;
use App\Models\ProjectFile;
use Illuminate\Http\Request;

class ProjectFileController extends AccountBaseController
{

    /**
     * @param Request $request
     * @return mixed|void
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function store(Request $request)
    {

        if ($request->hasFile('file')) {

            foreach ($request->file as $fileData) {
                $file = new ProjectFile();

                $file->project_id = $request->project_id;

                $filename = Files::uploadLocalOrS3($fileData, ProjectFile::FILE_PATH . '/' . $request->project_id);

                $file->user_id = $this->user->id;
                $file->filename = $fileData->getClientOriginalName();
                $file->hashname = $filename;
                $file->size = $fileData->getSize();
                $file->save();
                $this->logProjectActivity($request->project_id, 'messages.newFileUploadedToTheProject');
            }

            $this->files = ProjectFile::where('project_id', $request->project_id)->orderBy('id', 'desc')->get();
            $view = view('projects.files.show', $this->data)->render();

            return Reply::dataOnly(['status' => 'success', 'view' => $view]);
        }
    }

    public function storeMultiple(Request $request)
    {
        if ($request->hasFile('file')) {
            foreach ($request->file as $fileData) {

                $file = new ProjectFile();
                $file->project_id = $request->project_id;

                $filename = Files::uploadLocalOrS3($fileData, ProjectFile::FILE_PATH . '/' . $request->project_id);

                $file->user_id = $this->user->id;
                $file->filename = $fileData->getClientOriginalName();
                $file->hashname = $filename;
                $file->size = $fileData->getSize();
                $file->save();
                $this->logProjectActivity($request->project_id, 'messages.newFileUploadedToTheProject');
            }
        }
    }

    public function destroy(Request $request, $id)
    {
        $file = ProjectFile::findOrFail($id);
        $deleteDocumentPermission = user()->permission('delete_project_files');
        abort_403(!($deleteDocumentPermission == 'all' || ($deleteDocumentPermission == 'added' && $file->added_by == user()->id)));

        Files::deleteFile($file->hashname, ProjectFile::FILE_PATH . '/' . $file->project_id);

        ProjectFile::destroy($id);

        $this->files = ProjectFile::where('project_id', $file->project_id)->orderBy('id', 'desc')->get();

        $view = view('projects.files.show', $this->data)->render();

        return Reply::successWithData(__('messages.fileDeleted'), ['view' => $view]);
    }

    public function download($id)
    {
        $file = ProjectFile::whereRaw('md5(id) = ?', $id)->firstOrFail();
        $this->viewPermission = user()->permission('view_project_files');
        abort_403(!($this->viewPermission == 'all' || ($this->viewPermission == 'added' && $file->added_by == user()->id)));

        return download_local_s3($file, ProjectFile::FILE_PATH . '/' . $file->project_id . '/' . $file->hashname);

    }

}
