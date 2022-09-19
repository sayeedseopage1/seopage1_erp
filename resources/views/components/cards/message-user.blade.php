@php
$user = $message->from != user()->id ? $message->fromUser : $message->toUser;
@endphp
@if ($message->toUser->unread_messages_count > 0)
    @php
        $unreadMessageCount = $message->toUser->unread_messages_count;
    @endphp
@else
    @php
        $unreadMessageCount = $message->fromUser->unread_messages_count;
    @endphp
@endif


<div class="card rounded-0 border-top-0 border-left-0 border-right-0" id="user-no-{{ $user->id }}">
    <a @class([
        'tablinks',
        'show-user-messages',
        'unread-message' => $unreadMessageCount > 0,
    ]) href="javascript:;" data-name="{{ $user->name }}"
        data-user-id="{{ $user->id }}"
        data-unread-message-count="{{ $unreadMessageCount }}">
        <div class="card-horizontal">
            <div class="card-img">
                <img class="" src="{{ $user->image_url }}" alt="{{ $user->name }}">
            </div>
            <div class="card-body border-0 pl-0">
                <div class="d-flex justify-content-between">
                    <h4 class="card-title f-12 f-w-500 text-dark-grey">{{ $user->name }}</h4>
                    <p class="card-date f-11 text-dark-grey mb-0">
                        {{ \Carbon\Carbon::parse($message->created_at)->diffForHumans() }}</p>
                </div>
                <div @class([
                    'card-text',
                    'f-11',
                    'text-lightest',
                    'd-flex',
                    'justify-content-between',
                    'text-dark' => $unreadMessageCount > 0,
                    'font-weight-bold' => $unreadMessageCount > 0,
                ])>
                    <div>{{ $message->message }}</div>


                    @if ($unreadMessageCount > 0)
                        <div>
                            <span class="badge badge-primary ml-1 unread-count">{{ $unreadMessageCount }}</span>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </a>
</div><!-- card end -->
