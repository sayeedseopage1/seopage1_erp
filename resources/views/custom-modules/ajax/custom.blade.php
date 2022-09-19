<div class="table-responsive p-20">
    <x-table class="table-bordered table-hover" headType="thead-light">
        <x-slot name="thead">
            <th>@lang('app.name')</th>
            <th>Purchase Code</th>
            <th>@lang('app.currentVersion')</th>
            <th>@lang('app.latestVersion')</th>
            <th class="text-right">@lang('app.status')</th>
        </x-slot>

        @forelse ($allModules as $key=>$module)
            <tr>
                <td>{{ $key }}</td>
                <td>
                    @if (in_array($module, $worksuitePlugins))

                        @if (config(strtolower($module) . '.setting'))
                            @php
                                $settingInstance = config(strtolower($module) . '.setting');

                                $fetchSetting = $settingInstance::first();
                            @endphp

                            @if (config(strtolower($module) . '.verification_required'))
                                @if ($fetchSetting->purchase_code)
                                    <span class="blur-code purchase-code">{{ $fetchSetting->purchase_code }}</span>
                                    <div class="show-hide-purchase-code d-inline" data-toggle="tooltip" data-original-title="{{__('messages.showHidePurchaseCode')}}">
                                       <i class="icon far fa-eye-slash cursor-pointer"></i>
                                    </div>
                                @else
                                    <a href="javascript:;" class="verify-module f-w-500"
                                       data-module="{{ strtolower($module) }}">@lang('app.verifyEnvato')</a>
                                @endif
                            @endif
                        @endif
                    @endif
                </td>
                <td>
                    @if (config(strtolower($module) . '.setting'))
                        <span class="badge badge-secondary">{{ File::get($module->getPath() . '/version.txt') }}</span>
                    @endif
                </td>
                <td>
                    @if (config(strtolower($module) . '.setting'))
                        @if ($version[config(strtolower($module) . '.envato_item_id')] > File::get($module->getPath() . '/version.txt'))
                            <span class="badge badge-primary
                            ">{{ $version[config(strtolower($module) . '.envato_item_id')] ?? '-' }}</span>
                        @else
                            <span class="badge badge-secondary
                            ">{{ $version[config(strtolower($module) . '.envato_item_id')] ?? '-' }}</span>
                        @endif
                    @endif
                </td>
                <td class="text-right">
                    <div class="custom-control custom-switch">
                        <input type="checkbox" @if (in_array($module, $worksuitePlugins)) checked
                               @endif class="custom-control-input change-module-status"
                               id="module-{{ $key }}" data-module-name="{{ $module }}">
                        <label class="custom-control-label" for="module-{{ $key }}"></label>
                    </div>
                </td>
            </tr>
        @empty
            <tr>
                <td colspan="5">
                    <x-cards.no-record icon="calendar" :message="__('messages.noRecordFound')"/>
                </td>
            </tr>
        @endforelse

    </x-table>

    @include('vendor.froiden-envato.update.plugins',['allModules'=>
    $allModules])
</div>

<script>
    $('body').on('change', '.change-module-status', function () {
        var module = $(this).data('module-name');

        if ($(this).is(':checked'))
            var moduleStatus = 'active';
        else
            var moduleStatus = 'inactive';

        var url = "{{ route('custom-modules.update', ':module') }}";
        url = url.replace(':module', module);

        $.easyAjax({
            url: url,
            type: "POST",
            container: '.settings-box',
            blockUI: true,
            data: {
                'id': module,
                'status': moduleStatus,
                '_method': 'PUT',
                '_token': '{{ csrf_token() }}'
            }
        });
    });

    $('body').on('click', '.verify-module', function () {
        var module = $(this).data('module');
        var url = "{{ route('custom-modules.show', ':module') }}";
        url = url.replace(':module', module);
        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });

</script>
