<?php

namespace App\Http\Controllers;

use App\Helper\Files;
use App\Helper\Reply;
use App\Models\TicketFile;
use App\Models\TicketReply;
use Illuminate\Http\Request;

class TicketFileController extends AccountBaseController
{

    public function store(Request $request)
    {
        if ($request->hasFile('file')) {
            $replyId = $request->ticket_reply_id;

            if ($request->ticket_reply_id == '') {
                $reply = new TicketReply();
                $reply->ticket_id = $request->ticket_id;
                $reply->user_id = $this->user->id; // Current logged in user
                $reply->save();
                $replyId = $reply->id;
            }

            foreach ($request->file as $fileData) {
                $file = new TicketFile();

                $file->ticket_reply_id = $replyId;

                $filename = Files::uploadLocalOrS3($fileData, TicketFile::FILE_PATH . '/' . $replyId);

                $file->user_id = $this->user->id;
                $file->filename = $fileData->getClientOriginalName();
                $file->hashname = $filename;
                $file->size = $fileData->getSize();
                $file->save();

            }
        }

        return Reply::dataOnly(['status' => 'success']);
    }

    /**
     * @param Request $request
     * @param int $id
     * @return array
     */
    public function destroy(Request $request, $id)
    {
        $file = TicketFile::findOrFail($id);

        Files::deleteFile($file->hashname, 'ticket-files/' . $file->ticket_reply_id);
        TicketFile::destroy($id);

        return Reply::success(__('messages.fileDeleted'));
    }

    public function show($id)
    {
        $file = TicketFile::whereRaw('md5(id) = ?', $id)->firstOrFail();
        $this->filepath = $file->file_url;
        return view('tasks.files.view', $this->data);
    }

    /**
     * @param mixed $id
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse|\Symfony\Component\HttpFoundation\StreamedResponse
     */
    public function download($id)
    {
        $file = TicketFile::whereRaw('md5(id) = ?', $id)->firstOrFail();
        return download_local_s3($file, 'ticket-files/' . $file->ticket_reply_id . '/' . $file->hashname);
    }

}
