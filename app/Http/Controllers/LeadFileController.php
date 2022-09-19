<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Models\Lead;
use App\Models\LeadFiles;
use App\Traits\IconTrait;
use Illuminate\Http\Request;
use App\Helper\Files;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class LeadFileController extends AccountBaseController
{
    use IconTrait;

    /**
     * ManageLeadFileController constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->pageIcon = __('icon-people');
        $this->pageTitle = 'app.menu.lead';
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $addPermission = user()->permission('add_lead_files');
        abort_403(!in_array($addPermission, ['all', 'added']));

        return view('leads.lead-files.create', $this->data);
    }

    /**
     * @param Request $request
     * @return array
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @throws \Throwable
     */
    public function store(Request $request)
    {
        $addPermission = user()->permission('add_lead_files');
        abort_403(!in_array($addPermission, ['all', 'added']));

        if ($request->hasFile('file')) {
            foreach ($request->file as $fileData) {
                $file = new LeadFiles();

                $file->lead_id = $request->lead_id;
                $filename = Files::uploadLocalOrS3($fileData, LeadFiles::FILE_PATH . '/' . $request->lead_id);

                $file->user_id = $this->user->id;
                $file->filename = $fileData->getClientOriginalName();
                $file->hashname = $filename;
                $file->size = $fileData->getSize();

                $file->save();
            }
        }

        $this->lead = Lead::findOrFail($request->lead_id);

        return Reply::success(__('messages.fileUploaded'));
    }

    /**
     * @param Request $request
     * @param int $id
     * @return array|void
     */
    public function destroy(Request $request, $id)
    {
        $deletePermission = user()->permission('delete_lead_files');
        $file = LeadFiles::findOrFail($id);
        abort_403(!($deletePermission == 'all' || ($deletePermission == 'added' && $file->added_by == user()->id)));

        $storage = config('filesystems.default');

        switch ($storage) {
        case 'local':
            File::delete(Files::UPLOAD_FOLDER. '/lead-files/' . $file->lead_id . '/' . $file->filename);
                break;
        case 's3':
            Storage::disk('s3')->delete(LeadFiles::FILE_PATH . '/' . $file->lead_id . '/' . $file->filename);
                break;
        }

        LeadFiles::destroy($id);

        return Reply::success(__('messages.fileDeleted'));

    }

    /**
     * @param mixed $id
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse|\Symfony\Component\HttpFoundation\StreamedResponse|void
     */
    public function download($id)
    {
        $viewPermission = user()->permission('view_lead_files');
        $file = LeadFiles::findOrFail($id);
        abort_403(!($viewPermission == 'all' || ($viewPermission == 'added' && $file->added_by == user()->id)));

        return download_local_s3($file, LeadFiles::FILE_PATH . '/' . $file->lead_id . '/' . $file->hashname);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function layout(Request $request)
    {
        $viewPermission = user()->permission('view_lead_files');
        abort_403(!in_array($viewPermission, ['all', 'added']));

        $this->lead = Lead::with('files')->findOrFail($request->id);

        $layout = $request->layout == 'listview' ? 'leads.lead-files.ajax-list' : 'leads.lead-files.thumbnail-list';

        $view = view($layout, $this->data)->render();

        return Reply::dataOnly(['status' => 'success', 'html' => $view]);
    }

}
