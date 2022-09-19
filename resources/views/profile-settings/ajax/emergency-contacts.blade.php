<div class="col-xl-12 col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4">
    <div class="row">
        @include('sections.password-autocomplete-hide')

        <div class="table-responsive">
            <x-table class="table-bordered">
                <x-slot name="thead">
                    <th>@lang('app.name')</th>
                    <th>@lang('app.email')</th>
                    <th>@lang('app.mobile')</th>
                    <th>@lang('app.relationship')</th>
                    <th class="text-right">@lang('app.action')</th>
                </x-slot>

                @forelse ($contacts as $count => $contact)
                    <tr class="tableRow{{$contact->id}}">
                        <td>{{ $contact->name }}</td>
                        <td>{{ $contact->email }}</td>
                        <td>{{ $contact->mobile }}</td>
                        <td>{{ $contact->relation }}</td>
                        <td class="text-right">

                            <div class="task_view">

                                <div class="dropdown">
                                    <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link"
                                        id="dropdownMenuLink-' . $contact->id . '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-boundary="viewport">
                                        <i class="icon-options-vertical icons"></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-' . $contact->id . '" tabindex="0">

                                        <a href="javascript:;" class="dropdown-item show-contact" data-contact-id="{{ $contact->id }}"><i class="fa fa-eye mr-2"></i>@lang('app.view')</a>

                                        <a class="dropdown-item edit-contact" href="javascript:;" data-contact-id="{{ $contact->id }}">
                                            <i class="fa fa-edit mr-2"></i>
                                            @lang('app.edit')
                                        </a>

                                        <a class="dropdown-item delete-table-row" href="javascript:;" data-row-id="{{ $contact->id }}">
                                            <i class="fa fa-trash mr-2"></i>
                                            @lang('app.delete')
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5">
                            <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                        </td>
                    </tr>
                @endforelse
            </x-table>
        </div> {{-- end table responsive --}}
    </div>
</div>
