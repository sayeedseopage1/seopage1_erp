@extends('layouts.app')


@section('content')

<div class="content-wrapper">
    <div class="row">
        <div class="col-sm-12">
            <x-cards.data padding="false" :title="__('app.newNotifications')">
                @forelse ($user->unreadNotifications as $key => $notification)

                    @if(view()->exists('notifications.'.$userType.'.'.\Illuminate\Support\Str::snake(class_basename($notification->type))))
                        @include('notifications.'.$userType.'.'.\Illuminate\Support\Str::snake(class_basename($notification->type)))
                    @endif

                    @foreach ($worksuitePlugins as $item)
                        @if(View::exists(strtolower($item).'::notifications.'.\Illuminate\Support\Str::snake(class_basename($notification->type))))
                            @include(strtolower($item).'::notifications.'.\Illuminate\Support\Str::snake(class_basename($notification->type)))
                        @endif
                    @endforeach

                @empty
                    <div class="dropdown-item f-14 text-dark p-0">
                        <div class="card border-0 p-0 rounded-0">
                            <div class="card-horizontal align-items-center">
                                <div class="card-body border-0 pl-0 pr-0 py-2">
                                    <x-cards.no-record icon="bell-slash" :message="__('messages.noNotification')" />
                                </div>
                            </div>
                        </div>
                    </div>
                @endforelse
            </x-card>
        </div>
    </div>

</div>

@endsection
