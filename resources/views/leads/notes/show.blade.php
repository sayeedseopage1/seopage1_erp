<div class="row">
    <div class="col-sm-12">
        <x-cards.data :title="__('app.note').' '.__('app.details')" class=" mt-4">
            <x-cards.data-row :label="__('modules.client.noteTitle')"
                :value="$note->title" />

            <x-cards.data-row :label="__('modules.client.noteType')" :value="$note->type == 0 ? __('app.public') : __('app.private')" />

            @if($note->type == 1)
                <div class="col-12 px-0 pb-3 d-flex">
                    <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                        @lang('modules.tasks.assignTo')</p>
                    <p class="mb-0 text-dark-grey f-14">
                        @foreach ($employees as $item)
                            <div class="taskEmployeeImg rounded-circle mr-1">
                                <a href="{{ route('employees.show', $item->id) }}">
                                    <img data-toggle="tooltip" data-original-title="{{ mb_ucwords($item->name) }}"
                                        src="{{ $item->image_url }}">
                                </a>
                            </div>
                        @endforeach
                    </p>
                </div>

                {{-- <x-cards.data-row :label="__('modules.lead.visibleToLead')" :value="$note->is_lead_show == 1 ? __('app.yes') : __('app.no')" /> --}}
            @endif

            <x-cards.data-row :label="__('modules.client.noteDetail')" :value="$note->details" html="true" />

        </x-cards.data>
    </div>
</div>
