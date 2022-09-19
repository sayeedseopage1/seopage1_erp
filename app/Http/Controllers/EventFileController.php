<?php

namespace App\Http\Controllers;

use App\Helper\Files;
use App\Helper\Reply;
use App\Models\Event;
use App\Models\EventFile;
use Illuminate\Http\Request;

class EventFileController extends Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->pageIcon = __('icon-people');
        $this->pageTitle = 'app.menu.product';
    }

    public function store(Request $request)
    {
        if ($request->hasFile('file')) {
            foreach ($request->file as $fileData) {
                $file = new EventFile();
                $file->event_id = $request->eventId;

                $filename = Files::uploadLocalOrS3($fileData, EventFile::FILE_PATH .'/'. $request->eventId);

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
        $file = EventFile::findOrFail($id);
        $this->event = Event::findorFail($file->event_id);
        Files::deleteFile($file->hashname, EventFile::FILE_PATH . '/' . $file->event_id);

        EventFile::destroy($id);

        $this->files = EventFile::where('event_id', $file->event_id)->orderBy('id', 'desc')->get();
        $view = view('event-calendar.files.show', $this->data)->render();

        return Reply::successWithData(__('messages.fileDeleted'), ['view' => $view]);

    }

    public function download($id)
    {
        $file = EventFile::whereRaw('md5(id) = ?', $id)->firstOrFail();
        return download_local_s3($file, 'events/' . $file->event_id . '/' . $file->hashname);

    }

}
