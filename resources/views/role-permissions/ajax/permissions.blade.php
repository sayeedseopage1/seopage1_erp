<x-table class="table-bordered mt-3 permisison-table table-hover" headType="thead-light">
    <x-slot name="thead">
        <th width="20%">
            @lang('app.module')
        </th>
        <th width="16%">@lang('app.add')</th>
        <th width="16%">@lang('app.view')</th>
        <th width="16%">@lang('app.update')</th>
        <th width="16%">@lang('app.delete')</th>
        <th width="16%"></th>
    </x-slot>
    @foreach ($modulesData as $moduleData)
        <tr>
            <td>@lang('modules.module.'.$moduleData->module_name)
            </td>
            @foreach ($moduleData->permissions as $permission)
                @php
                    $allowedPermissions = json_decode($permission->allowed_permissions);
                    $permissionType = $role->permissionType($permission->id);
                @endphp
                <td>
                    <select class="select-picker role-permission-select border-0"
                        data-permission-id="{{ $permission->id }}" data-role-id="{{ $role->id }}">
                        @if (!is_null($allowedPermissions))
                            @foreach ($allowedPermissions as $key => $item)
                                <option @if ($permissionType == $item) selected @endif
                                    @if (!$permissionType && $item == 5) selected @endif value="{{ $item }}">
                                    @lang('app.'.$key)</option>
                            @endforeach
                        @endif
                    </select>
                </td>
            @endforeach


            @if (count($moduleData->permissions) < 4)
                @for ($i = 1; $i <= 4 - count($moduleData->permissions); $i++)
                    <td>--</td>
                @endfor
            @endif

            <td class="text-center bg-light border-left">
                @if ($moduleData->custom_permissions_count > 0)
                    <div class="p-2">
                        <a href="javascript:;" data-module-id="{{ $moduleData->id }}"
                            data-role-id="{{ $role->id }}"
                            class="text-dark-grey show-custom-permission dropdown-toggle">
                            @lang('app.more') <i class="fa fa-chevron-down"></i>
                        </a>
                    </div>
                @endif
            </td>


        </tr>
    @endforeach
</x-table>
