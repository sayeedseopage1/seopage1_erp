<!-- ROW START -->
<div class="row">
    <div class="col-sm-12">
        @if (!$client->admin_approval)
            <x-alert type="danger">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <i class="fa fa-user-times"></i> @lang('modules.dashboard.verificationPending')
                    </div>
                    <div>
                        <x-forms.button-primary class="verify-user" icon="check">
                            @lang('app.approve')
                        </x-forms.button-primary>
                    </div>
                </div>
            </x-alert>
        @endif
    </div>

    <!--  USER CARDS START -->
    <div class="col-xl-7 col-lg-12 col-md-12 mb-4 mb-xl-0 mb-lg-4 mb-md-0">
        <div class="row">

            <div class="col-xl-7 col-lg-6 col-md-6 mb-4 mb-lg-0">

                <x-cards.user :image="$client->image_url">
                    <div class="row">
                        <div class="col-10">
                            <h4 class="card-title f-15 f-w-500 text-darkest-grey mb-0">
                                {{ ucfirst($client->salutation) . ' ' . mb_ucwords($client->name) }}
                            </h4>
                        </div>
                        <div class="col-2 text-right">
                            <div class="dropdown">
                                <button class="btn f-14 px-0 py-0 text-dark-grey dropdown-toggle" type="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa fa-ellipsis-h"></i>
                                </button>

                                <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                    aria-labelledby="dropdownMenuLink" tabindex="0">
                                    <a class="dropdown-item openRightModal"
                                        href="{{ route('clients.edit', $client->id) }}">@lang('app.edit')</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="f-13 font-weight-normal text-dark-grey mb-0">
                        {{ mb_ucwords($client->clientDetails->company_name) }}
                    </p>
                    <p class="card-text f-12 text-lightest">@lang('app.lastLogin')

                        @if (!is_null($client->last_login))
                            {{ $client->last_login->timezone(global_setting()->timezone)->format(global_setting()->date_format . ' ' . global_setting()->time_format) }}
                        @else
                            --
                        @endif
                    </p>
                </x-cards.user>

            </div>
            <div class="col-xl-5 col-lg-6 col-md-6">
                <x-cards.widget :title="__('modules.dashboard.totalProjects')" :value="$clientStats->totalProjects"
                    icon="layer-group" />
            </div>
        </div>
    </div>
    <!--  USER CARDS END -->

    <!--  WIDGETS START -->
    <div class="col-xl-5 col-lg-12 col-md-12">
        <div class="row">

            <div class="col-lg-6 col-md-6 col-sm-12 mb-4 mb-lg-0 mb-md-0">
                <x-cards.widget :title="__('modules.dashboard.totalEarnings')"
                    :value="$earningTotal" icon="coins" />
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12">
                <x-cards.widget :title="__('modules.dashboard.totalUnpaidInvoices')"
                    :value="$clientStats->totalUnpaidInvoices" icon="file-invoice-dollar" />
            </div>
        </div>
    </div>
    <!--  WIDGETS END -->
</div>
<!-- ROW END -->

<!-- ROW START -->
<div class="row mt-4">
    <div class="col-xl-7 col-lg-12 col-md-12 mb-4 mb-xl-0 mb-lg-4">
        <x-cards.data :title="__('modules.client.profileInfo')">
            <x-cards.data-row :label="__('modules.employees.fullName')" :value="mb_ucwords($client->name)" />

            <x-cards.data-row :label="__('app.email')" :value="$client->email ?? '--'" />

            <x-cards.data-row :label="__('modules.client.companyName')"
                :value="$client->clientDetails->company_name ?? '--'" />

            <x-cards.data-row :label="__('app.mobile')"
                :value="($client->mobile) ? ((!is_null($client->country_id) ? '+'.$client->country->phonecode.' ' : '') . $client->mobile) : '--'" />

            <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                    @lang('modules.employees.gender')</p>
                <p class="mb-0 text-dark-grey f-14 w-70">
                    <x-gender :gender='$client->gender' />
                </p>
            </div>

            <x-cards.data-row :label="__('modules.client.officePhoneNumber')"
                :value="$client->clientDetails->office ?? '--'" />

            <x-cards.data-row :label="__('modules.client.website')" :value="$client->clientDetails->website ?? '--'" />

            <x-cards.data-row :label="__('app.gstNumber')" :value="$client->clientDetails->gst_number ?? '--'" />

            <x-cards.data-row :label="__('app.address')" :value="$client->clientDetails->address ?? '--'" />

            <x-cards.data-row :label="__('modules.stripeCustomerAddress.state')"
                :value="$client->clientDetails->state ?? '--'" />

            <x-cards.data-row :label="__('modules.stripeCustomerAddress.city')"
                :value="$client->clientDetails->city ?? '--'" />

            <x-cards.data-row :label="__('modules.stripeCustomerAddress.postalCode')"
                :value="$client->clientDetails->postal_code ?? '--'" />

            <x-cards.data-row :label="__('app.language')"
                :value="$clientLanguage->language_name ?? '--'" />

            {{-- <x-cards.data-row :label="__('app.note')" html="true" :value="$client->clientDetails->note ?? '--'" /> --}}

            {{-- Custom fields data --}}
            @if (isset($fields))
                @foreach ($fields as $field)
                    @if ($field->type == 'text' || $field->type == 'password' || $field->type == 'number')
                        <x-cards.data-row :label="$field->label"
                            :value="$clientDetail->custom_fields_data['field_'.$field->id] ?? '--'" />
                    @elseif($field->type == 'textarea')
                        <x-cards.data-row :label="$field->label" html="true"
                            :value="$clientDetail->custom_fields_data['field_'.$field->id] ?? '--'" />
                    @elseif($field->type == 'radio')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($clientDetail->custom_fields_data['field_' . $field->id]) ? $clientDetail->custom_fields_data['field_' . $field->id] : '--')" />
                    @elseif($field->type == 'checkbox')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($clientDetail->custom_fields_data['field_' . $field->id]) ? $clientDetail->custom_fields_data['field_' . $field->id] : '--')" />
                    @elseif($field->type == 'select')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($clientDetail->custom_fields_data['field_' . $field->id]) && $clientDetail->custom_fields_data['field_' . $field->id] != '' ? $field->values[$clientDetail->custom_fields_data['field_' . $field->id]] : '--')" />
                    @elseif($field->type == 'date')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($clientDetail->custom_fields_data['field_' . $field->id]) && $clientDetail->custom_fields_data['field_' . $field->id] != '' ? \Carbon\Carbon::createFromFormat('Y-m-d', $clientDetail->custom_fields_data['field_' . $field->id])->format(global_setting()->date_format) : '--')" />

                    @endif
                @endforeach
            @endif

        </x-cards.data>
    </div>
    <div class="col-xl-5 col-lg-12 col-md-12 ">
        <div class="row">
            <div class="col-md-12">
                <x-cards.data :title="__('app.menu.projects')">
                    <x-pie-chart id="project-chart" :labels="$projectChart['labels']" :values="$projectChart['values']"
                        :colors="$projectChart['colors']" height="250" width="300" />
                </x-cards.data>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-md-12">
                <div class="card bg-white border-0 b-shadow-4">
                    <x-cards.data :title="__('app.menu.invoices')">
                        <x-pie-chart id="invoice-chart" :labels="$invoiceChart['labels']"
                            :values="$invoiceChart['values']" :colors="$invoiceChart['colors']" height="250"
                            width="300" />
                    </x-cards.data>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- ROW END -->

<script>
    $('body').on('click', '.verify-user', function() {
        const id = $(this).data('user-id');
        Swal.fire({
            title: "@lang('messages.sweetAlertTitle')",
            text: "@lang('messages.approvalWarning')",
            icon: 'warning',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "@lang('app.approve')",
            cancelButtonText: "@lang('app.cancel')",
            customClass: {
                confirmButton: 'btn btn-primary mr-3',
                cancelButton: 'btn btn-secondary'
            },
            showClass: {
                popup: 'swal2-noanimation',
                backdrop: 'swal2-noanimation'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                var url = "{{ route('clients.approve', $client->id) }}";

                var token = "{{ csrf_token() }}";

                $.easyAjax({
                    type: 'POST',
                    url: url,
                    data: {
                        '_token': token
                    },
                    success: function(response) {
                        if (response.status == "success") {
                            window.location.reload();
                        }
                    }
                });
            }
        });
    });
</script>
