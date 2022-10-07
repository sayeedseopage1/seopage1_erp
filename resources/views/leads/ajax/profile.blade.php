<!-- ROW START -->
<div class="row">
    <!--  USER CARDS START -->
    <div class="col-xl-12 col-lg-12 col-md-12 mb-4 mb-xl-0 mb-lg-4 mb-md-0">

        <x-cards.data :title="__('modules.client.profileInfo')">

            <x-slot name="action">
                <div class="dropdown">
                    <button class="btn f-14 px-0 py-0 text-dark-grey dropdown-toggle" type="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-ellipsis-h"></i>
                    </button>

                    <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                        aria-labelledby="dropdownMenuLink" tabindex="0">
                        <a class="dropdown-item openRightModal"
                            href="{{ route('leads.edit', $lead->id) }}">@lang('app.edit')</a>
                    </div>
                </div>
            </x-slot>

            <x-cards.data-row :label="__('modules.lead.clientName')" :value="$lead->client_name ?? '--'" />

            <!-- <x-cards.data-row :label="__('modules.lead.clientEmail')" :value="$lead->client_email ?? '--'" />

            <x-cards.data-row :label="__('modules.lead.companyName')" :value="!empty($lead->company_name) ? mb_ucwords($lead->company_name) : '--'" />

            <x-cards.data-row :label="__('modules.lead.website')" :value="$lead->website ?? '--'" />

            <x-cards.data-row :label="__('modules.lead.mobile')" :value="$lead->mobile ?? '--'" />

            <x-cards.data-row :label="__('modules.client.officePhoneNumber')" :value="$lead->office ?? '--'" />
            <x-cards.data-row :label="__('app.country')" :value="$lead->country ?? '--'" />

            <x-cards.data-row :label="__('modules.stripeCustomerAddress.state')" :value="$lead->state ?? '--'" />

            <x-cards.data-row :label="__('modules.stripeCustomerAddress.city')" :value="$lead->city ?? '--'" />

            <x-cards.data-row :label="__('modules.stripeCustomerAddress.postalCode')" :value="$lead->postal_code ?? '--'" /> -->

            <!-- <x-cards.data-row :label="__('modules.lead.address')" :value="$lead->address ?? '--'" /> -->

            <div class="col-12 px-0 pb-3 d-flex">
                <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                    @lang('Added By')</p>
                <p class="mb-0 text-dark-grey f-14">
                    @if (!is_null($lead->leadAgent))
                        <x-employee :user="$lead->leadAgent->user" />
                    @else
                        --
                    @endif
                </p>
            </div>

            <!-- <x-cards.data-row :label="__('modules.lead.source')" :value="$lead->leadSource->type ?? '--'" /> -->

            @if ($lead->leadStatus)
                <div class="col-12 px-0 pb-3 d-flex">
                    <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">@lang('app.status')</p>
                    <p class="mb-0 text-dark-grey f-14">
                        <x-status :value="ucfirst($lead->leadStatus->type)"
                            :style="'color:'.$lead->leadStatus->label_color" />
                    </p>

                </div>
            @endif

            <!-- <x-cards.data-row :label="__('modules.lead.leadCategory')" :value="$lead->category->category_name ?? '--'" /> -->

            <x-cards.data-row :label="__('app.lead') . ' ' .__('app.value')" :value="$lead->value ?? '--'" />

            {{-- <x-cards.data-row :label="__('app.note')" :value="!empty($lead->note) ? $lead->note : '--'" html="true" /> --}}

            {{-- Custom fields data --}}
            @if (isset($fields) && count($fields) > 0)
            @foreach ($fields as $field)
                    @if ($field->type == 'text' || $field->type == 'password' || $field->type == 'number')
                        <x-cards.data-row :label="$field->label"
                            :value="$lead->custom_fields_data['field_'.$field->id] ?? '--'" />
                    @elseif($field->type == 'textarea')
                        <x-cards.data-row :label="$field->label" html="true"
                            :value="$lead->custom_fields_data['field_'.$field->id] ?? '--'" />
                    @elseif($field->type == 'radio')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($lead->custom_fields_data['field_' . $field->id]) ? $lead->custom_fields_data['field_' . $field->id] : '--')" />
                    @elseif($field->type == 'checkbox')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($lead->custom_fields_data['field_' . $field->id]) ? $lead->custom_fields_data['field_' . $field->id] : '--')" />
                    @elseif($field->type == 'select')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($lead->custom_fields_data['field_' . $field->id]) ? $lead->custom_fields_data['field_' . $field->id] : '--')" />
                    @elseif($field->type == 'date')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($lead->custom_fields_data['field_' . $field->id]) && $lead->custom_fields_data['field_' . $field->id] != '' ? \Carbon\Carbon::parse($lead->custom_fields_data['field_' . $field->id])->format(global_setting()->date_format) : '--')" />
                    @endif
                @endforeach
            @endif
        </x-cards.data>
    </div>
    <!--  USER CARDS END -->
</div>
<!-- ROW END -->
