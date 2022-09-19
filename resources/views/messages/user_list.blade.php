<div class="col-md-12 p-0">
    @forelse($userLists as $item)
        <x-cards.message-user :message="$item" />
    @empty
        <x-cards.no-record icon="comment-alt" :message="__('messages.noConversation')" />
    @endforelse
</div>
