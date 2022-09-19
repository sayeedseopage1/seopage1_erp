<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\ChatStoreRequest;
use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\User;
use App\Models\UserChat;
use Client;
use Illuminate\Support\Facades\Session;

class MessageController extends AccountBaseController
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

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        session()->forget('message_setting');
        session()->forget('pusher_settings');

        abort_403(message_setting()->allow_client_admin == 'no' && message_setting()->allow_client_employee == 'no' && in_array('client', user_roles()));

        if (request()->ajax() && request()->has('term')) {
            $term = (request('term') != '') ? request('term') : null;
            $userLists = UserChat::userListLatest(user()->id, $term);
            $messageIds = collect($userLists)->pluck('id');

            $this->userLists = UserChat::with(['fromUser' => function ($q) {
                $q->withCount(['unreadMessages']);
            }, 'toUser' => function ($q) {
                $q->withCount(['unreadMessages']);
            }])
            ->whereIn('id', $messageIds)->orderBy('id', 'desc')->get();

            $userList = view('messages.user_list', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'userList' => $userList]);
        }

        if(request()->clientId) {
            $this->client = User::find(request()->clientId);
        }

        $userLists = UserChat::userListLatest(user()->id, null);
        $messageIds = collect($userLists)->pluck('id');

        $this->userLists = UserChat::with(['fromUser' => function ($q) {
            $q->withCount(['unreadMessages']);
        }, 'toUser' => function ($q) {
            $q->withCount(['unreadMessages']);
        }])
        ->whereIn('id', $messageIds)->orderBy('id', 'desc')->get();

        // To show particular user's chat using it's user_id
        Session::flash('message_user_id', request()->user);

        return view('messages.index', $this->data);
    }

    /**
     * XXXXXXXXXXXx`
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->messageSetting = message_setting();
        $this->project_id = Project::where('client_id', user()->id)->pluck('id');
        $this->employee_project_id = ProjectMember::where('user_id', user()->id)->pluck('project_id');
        $this->employee_user_id = ProjectMember::whereIn('project_id', $this->employee_project_id)->pluck('user_id');
        $this->employee_client_id = Project::whereIn('id', $this->employee_project_id )->pluck('client_id');

        $this->user_id = ProjectMember::whereIn('project_id', $this->project_id)->pluck('user_id');

        if (!in_array('client', user_roles())) {
            $this->employees = User::allEmployees($this->user->id, true, 'all');

            if (in_array('admin', user_roles())) {
                $this->clients = User::allClients();

            } elseif (($this->messageSetting->allow_client_employee == 'yes' && $this->messageSetting->restrict_client == 'no')) {
                $this->clients = User::allClients();

            } else if($this->messageSetting->allow_client_employee == 'yes' && $this->messageSetting->restrict_client == 'yes') {
                $this->clients = User::whereIn('id', $this->employee_client_id)->get();
            }
        }

        // This will return true if message button from projects overview button is clicked
        if(request()->clientId) {
            $this->clientId = request()->clientId;
            $this->client = User::find(request()->clientId);
        }

        if ($this->messageSetting->allow_client_employee == 'yes' && $this->messageSetting->restrict_client == 'no' && in_array('client', user_roles())) {
            $this->employees = User::allEmployees();
        }
        else if($this->messageSetting->allow_client_employee == 'yes' && $this->messageSetting->restrict_client == 'yes' && in_array('client', user_roles()))
        {
            $this->employees = User::whereIn('id', $this->user_id)->get();
        }
        else if ($this->messageSetting->allow_client_admin == 'yes' && in_array('client', user_roles())) {
            $this->employees = User::allAdmins();
        }

        return view('messages.create', $this->data);
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function store(ChatStoreRequest $request)
    {

        if ($request->user_type == 'client') {
            $receiverID = $request->client_id;
        }
        else {
            $receiverID = $request->user_id;
        }

        $message = new UserChat();
        $message->message         = $request->message;
        $message->user_one        = user()->id;
        $message->user_id         = $receiverID;
        $message->from            = user()->id;
        $message->to              = $receiverID;
        $message->save();

        $userLists = UserChat::userListLatest(user()->id, null);
        $messageIds = collect($userLists)->pluck('id');
        $this->userLists = UserChat::with('fromUser', 'toUser')->whereIn('id', $messageIds)->orderBy('id', 'desc')->get();
        $userList = view('messages.user_list', $this->data)->render();

        $this->chatDetails = UserChat::chatDetail($receiverID, user()->id);
        $messageList = view('messages.message_list', $this->data)->render();

        return Reply::dataOnly(['user_list' => $userList, 'message_list' => $messageList, 'message_id' => $message->id, 'receiver_id' => $receiverID, 'userName' => $message->toUser->name]);
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $this->chatDetails = UserChat::chatDetail($id, user()->id);

        // Mark messages read
        $updateData = ['message_seen' => 'yes'];
        UserChat::messageSeenUpdate($this->user->id, $id, $updateData);
        $this->unreadMessage = (request()->unreadMessageCount > 0) ? 0 : 1;
        $this->userId = $id;

        $view = view('messages.message_list', $this->data)->render();
        return Reply::dataOnly(['status' => 'success', 'html' => $view, 'unreadMessages' => $this->unreadMessage, 'id' => $this->userId]);
    }

    public function destroy($id)
    {
        $userChats = UserChat::find($id);

        // Delete chat
        UserChat::destroy($id);

        // To reset chat-box if deleted chat is last one between them
        $chatDetails = UserChat::chatDetail($userChats->from, $userChats->to);

        return Reply::successWithData(__('messages.deleteSuccess'), ['chat_details' => $chatDetails]);
    }

    public function fetchUserListView()
    {
        $userLists = UserChat::userListLatest(user()->id, null);
        $messageIds = collect($userLists)->pluck('id');
        $this->userLists = UserChat::with(['fromUser' => function ($q) {
            $q->withCount(['unreadMessages']);
        }, 'toUser' => function ($q) {
            $q->withCount(['unreadMessages']);
        }])
        ->whereIn('id', $messageIds)->orderBy('id', 'desc')->get();

        // To show particular user's chat using it's user_id
        Session::flash('message_user_id', request()->user);
        $userList = view('messages.user_list', $this->data)->render();

        return Reply::dataOnly(['user_list' => $userList]);
    }

    public function fetchUserMessages($receiverID)
    {
        $this->chatDetails = UserChat::chatDetail($receiverID, user()->id);
        $messageList = view('messages.message_list', $this->data)->render();

        return Reply::dataOnly(['message_list' => $messageList]);
    }

}
