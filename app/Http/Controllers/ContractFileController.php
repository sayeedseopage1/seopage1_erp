<?php

namespace App\Http\Controllers;

use App\Helper\Files;
use App\Helper\Reply;
use App\Models\ContractFile;
use Illuminate\Http\Request;

class ContractFileController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.file';
    }

    /**
     * @param Request $request
     * @return mixed|void
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function store(Request $request)
    {
        $this->addPermission = user()->permission('add_contract_files');
        abort_403(!in_array($this->addPermission, ['all', 'added']));

        if ($request->hasFile('file')) {
            foreach ($request->file as $fileData) {
                $file = new ContractFile();
                $file->contract_id = $request->contract_id;

                $filename = Files::uploadLocalOrS3($fileData, ContractFile::FILE_PATH . '/' . $request->contract_id);

                $file->user_id = $this->user->id;
                $file->filename = $fileData->getClientOriginalName();
                $file->hashname = $filename;
                $file->size = $fileData->getSize();

                $file->save();
            }

            $this->files = ContractFile::where('contract_id', $request->contract_id)->orderBy('id', 'desc')->get();
            $view = view('contracts.files.show', $this->data)->render();

            return Reply::dataOnly(['status' => 'success', 'view' => $view]);
        }

    }

    /**
     * @param Request $request
     * @param int $id
     * @return array|void
     */
    public function destroy(Request $request, $id)
    {
        $file = ContractFile::findOrFail($id);
        $this->deletePermission = user()->permission('delete_contract_files');
        abort_403(!($this->deletePermission == 'all' || ($this->deletePermission == 'added' && $file->added_by == user()->id)));

        Files::deleteFile($file->hashname, ContractFile::FILE_PATH . '/' . $file->contract_id);

        ContractFile::destroy($id);

        $this->files = ContractFile::where('contract_id', $file->contract_id)->orderBy('id', 'desc')->get();
        $view = view('contracts.files.show', $this->data)->render();

        return Reply::successWithData(__('messages.fileDeleted'), ['view' => $view]);
    }

    /**
     * @param int $id
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse|\Symfony\Component\HttpFoundation\StreamedResponse
     */
    public function download($id)
    {
        $file = ContractFile::whereRaw('md5(id) = ?', $id)->firstOrFail();
        $this->viewPermission = user()->permission('view_contract_files');
        abort_403(!($this->viewPermission == 'all' || ($this->viewPermission == 'added' && $file->added_by == user()->id)));

        return download_local_s3($file, ContractFile::FILE_PATH . '/' . $file->contract_id . '/' . $file->hashname);

    }

}
