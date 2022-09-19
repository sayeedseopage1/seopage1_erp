<?php

namespace App\Http\Controllers;

use App\Helper\Files;
use App\Helper\Reply;
use App\Models\UserChat;
use App\Models\UserchatFile;
use Illuminate\Http\Request;

class MessageFileController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.messages';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('messages', $this->user->modules));
            return $next($request);
        });
    }

    public function store(Request $request)
    {
        if ($request->hasFile('file')) {

            foreach ($request->file as $fileData) {
                $file = new UserchatFile();
                $file->users_chat_id = $request->message_id;

                $filename = Files::uploadLocalOrS3($fileData, UserchatFile::FILE_PATH);

                $file->user_id = $this->user->id;
                $file->filename = $fileData->getClientOriginalName();
                $file->hashname = $filename;
                $file->size = $fileData->getSize();
                $file->save();
            }
        }

        $this->userChatFiles = UserchatFile::where('users_chat_id', $request->message_id)->get();

        $this->chatDetails = UserChat::chatDetail($request->receiver_id, user()->id);
        $messageList = view('messages.message_list', $this->data)->render();

        return Reply::successWithData(__('messages.fileUploaded'), ['message_list' => $messageList]);
    }

    public function destroy(Request $request, $id)
    {
        $file = UserchatFile::findOrFail($id);

        Files::deleteFile($file->hashname, 'message-files/' . $file->users_chat_id);

        UserchatFile::destroy($id);

        return Reply::success(__('messages.fileDeleted'));
    }

    /**
     * @param int $id
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse|\Symfony\Component\HttpFoundation\StreamedResponse
     */
    // phpcs:ignore
    public function download($id)
    {
        $file = UserchatFile::whereRaw('md5(id) = ?', $id)->firstOrFail();
        return download_local_s3($file, UserchatFile::FILE_PATH . '/' . $file->hashname);
    }

}
