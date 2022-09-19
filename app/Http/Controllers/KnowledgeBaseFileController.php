<?php

namespace App\Http\Controllers;

use App\Helper\Files;
use App\Helper\Reply;
use App\Traits\IconTrait;
use Illuminate\Http\Request;
use App\Models\KnowledgeBase;
use App\Models\KnowledgeBaseFile;
use App\Http\Controllers\AccountBaseController;
use App\Models\KnowledgeBaseCategory;

class KnowledgeBaseFileController extends AccountBaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    use IconTrait;

    public function __construct()
    {
        parent::__construct();
        $this->pageIcon = __('icon-people');
        $this->pageTitle = 'app.menu.knowledgebase';
    }

    /**
     * Store a newly crea   ted resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if($request->has('file')) {

            foreach ($request->file as $fileData) {
                $file = new KnowledgeBaseFile();
                $file->knowledge_base_id = $request->knowledge_base_id;

                $filename = Files::uploadLocalOrS3($fileData, KnowledgeBaseFile::FILE_PATH . '/' . $request->knowledge_base_id);

                $file->filename = $fileData->getClientOriginalName();
                $file->hashname = $filename;
                $file->size = $fileData->getSize();
                $file->save();

            }
        }

        return Reply::success(__('messages.fileUploaded'));
    }

    public function destroy(Request $request, $id)
    {
        $file = KnowledgeBaseFile::findOrFail($id);
        $this->knowledge = KnowledgeBase::findOrFail($file->knowledge_base_id);
        $this->categories = KnowledgeBaseCategory::findOrFail($this->knowledge->category_id);

        Files::deleteFile($file->hashname, KnowledgeBaseFile::FILE_PATH . '/' . $file->knowledge_base_id);

        KnowledgeBaseFile::destroy($id);

        $this->files = KnowledgeBaseFile::where('knowledge_base_id', $file->knowledge_base_id)->orderBy('id', 'desc')->get();

        $view = view('knowledge-base.files.show', $this->data)->render();

        return Reply::successWithData(__('messages.fileDeleted'), ['view' => $view]);
    }

    public function download($id)
    {
        $file = KnowledgeBaseFile::whereRaw('md5(id) = ?', $id)->firstOrFail();
        return download_local_s3($file, KnowledgeBaseFile::FILE_PATH . '/' . $file->knowledge_base_id . '/' . $file->hashname);

    }

}
