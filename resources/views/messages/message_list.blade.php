@forelse($chatDetails as $item)
    <x-cards.message :message="$item" :user="$item->fromUser" />
@empty
    <x-cards.no-record icon="comment-alt" :message="__('messages.noConversation')" />
@endforelse

<div class="typing invisible my-2 px-4 text-lightest f-12">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <span class="ml-1">@lang('modules.messages.typing')</span>
</div>
