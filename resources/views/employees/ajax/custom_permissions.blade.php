<tr class="custom-permissions" id="module-custom-permission-{{ $modulesData->id }}">
    <td></td>
    <td colspan="4">
        <table class="table table-bordered rounded">
            @foreach ($modulesData->customPermissions as $permission)
                <tr>
                    <td>
                        <h6 class="heading-h6">{{ $permission->display_name }}</h6>
                    </td>
                    @php
                        $permissionType = $employee->permissionTypeId($permission->name);
                        $allowedPermissions = json_decode($permission->allowed_permissions);
                    @endphp
                    <td>
                        <select class="role-permission-select border-0" data-permission-id="{{ $permission->id }}">
                            @if (!is_null($allowedPermissions))
                                @foreach ($allowedPermissions as $key => $item)
                                    <option @if ($permissionType == $item) selected @endif value="{{ $item }}">@lang('app.'.$key)</option>
                                @endforeach
                            @endif
                        </select>
                    </td>
                </tr>
            @endforeach

        </table>
    </td>
    <td></td>
</tr>
