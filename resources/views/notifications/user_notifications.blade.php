@forelse ($user->unreadNotifications as $key => $notification)
    @if($key < 6)
        @if(view()->exists('notifications.'.$userType.'.'.\Illuminate\Support\Str::snake(class_basename($notification->type))))
            @include('notifications.'.$userType.'.'.\Illuminate\Support\Str::snake(class_basename($notification->type)))
        @endif

        @foreach ($worksuitePlugins as $item)
            @if(View::exists(strtolower($item).'::notifications.'.\Illuminate\Support\Str::snake(class_basename($notification->type))))
                @include(strtolower($item).'::notifications.'.\Illuminate\Support\Str::snake(class_basename($notification->type)))
            @endif
        @endforeach
    @endif

@empty
    <div class="card border-0 bg-additional-grey">
        <a class=" f-14 text-dark px-3" href="javascript:;">
            <div class="card-horizontal align-items-center">
                <div class="card-body border-0 pl-0 pr-0 py-2">
                    <x-cards.no-record icon="bell-slash" :message="__('messages.noNotification')" />
                </div>
            </div>
        </a>
    </div>

@endforelse
