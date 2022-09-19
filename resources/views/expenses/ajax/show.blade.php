<div class="row">
    <div class="col-sm-12">
        <x-cards.data :title="__('app.menu.expenses') . ' ' . __('app.details')" class=" mt-4">
            <x-cards.data-row :label="__('modules.expenses.itemName')" :value="$expense->item_name" />

            <x-cards.data-row :label="__('app.category')" :value="$expense->category->category_name ?? '--'" />

            <x-cards.data-row :label="__('app.price')" :value="$expense->total_amount" />

            <x-cards.data-row :label="__('modules.expenses.purchaseDate')"
                :value="(!is_null($expense->purchase_date) ? $expense->purchase_date->format(global_setting()->date_format) : '--')" />

            <x-cards.data-row :label="__('modules.expenses.purchaseFrom')" :value="$expense->purchase_from ?? '--'" />

            <x-cards.data-row :label="__('app.project')"
                :value="(!is_null($expense->project_id) ? $expense->project->project_name : '--')" />

            <div class="col-12 px-0 pb-3 d-lg-flex d-md-flex d-block">
                <p class="mb-0 text-lightest f-14 w-30 text-capitalize">
                    @lang('app.bill')</p>
                <p class="mb-0 text-dark-grey f-14">
                    @if (!is_null($expense->bill))
                        <a target="_blank" href="{{ $expense->bill_url }}" class="text-darkest-grey">@lang('app.view')
                            @lang('app.bill') <i class="fa fa-link"></i></a>
                    @else
                        --
                    @endif
                </p>
            </div>

            <div class="col-12 px-0 pb-3 d-lg-flex d-md-flex d-block">
                <p class="mb-0 text-lightest f-14 w-30 text-capitalize">
                    @lang('app.employee')</p>
                <p class="mb-0 text-dark-grey f-14">
                    <x-employee :user="$expense->user" />
                </p>
            </div>

            <div class="col-12 px-0 pb-3 d-lg-flex d-md-flex d-block">
                <p class="mb-0 text-lightest f-14 w-30 text-capitalize">
                    @lang('app.status')</p>
                <p class="mb-0 text-dark-grey f-14">
                    @if ($expense->status == 'pending')
                        <x-status :value="__('app.'.$expense->status)" color="yellow" />
                    @elseif ($expense->status == 'approved')
                        <x-status :value="__('app.'.$expense->status)" color="dark-green" />
                    @else
                        <x-status :value="__('app.'.$expense->status)" color="red" />
                    @endif
                </p>
            </div>

            @if ($expense->status == 'approved')
                <div class="col-12 px-0 pb-3 d-lg-flex d-md-flex d-block">
                    <p class="mb-0 text-lightest f-14 w-30 text-capitalize">
                        @lang('modules.expenses.approvedBy')</p>
                    <p class="mb-0 text-dark-grey f-14">
                        <x-employee :user="$expense->approver" />
                    </p>
                </div>
            @endif


            {{-- Custom fields data --}}
            @if (isset($fields))
                @foreach ($fields as $field)
                    @if ($field->type == 'text' || $field->type == 'password' || $field->type == 'number')
                        <x-cards.data-row :label="$field->label"
                            :value="$expense->custom_fields_data['field_'.$field->id] ?? '--'" />
                    @elseif($field->type == 'textarea')
                        <x-cards.data-row :label="$field->label" html="true"
                            :value="$expense->custom_fields_data['field_'.$field->id] ?? '--'" />
                    @elseif($field->type == 'radio')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($expense->custom_fields_data['field_' . $field->id]) ? $expense->custom_fields_data['field_' . $field->id] : '--')" />
                    @elseif($field->type == 'checkbox')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($expense->custom_fields_data['field_' . $field->id]) ? $expense->custom_fields_data['field_' . $field->id] : '--')" />
                    @elseif($field->type == 'select')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($expense->custom_fields_data['field_' . $field->id]) && $expense->custom_fields_data['field_' . $field->id] != '' ? $field->values[$expense->custom_fields_data['field_' . $field->id]] : '--')" />
                    @elseif($field->type == 'date')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($expense->custom_fields_data['field_' . $field->id]) && $expense->custom_fields_data['field_' . $field->id] != '' ? \Carbon\Carbon::parse($expense->custom_fields_data['field_' . $field->id])->format(global_setting()->date_format) : '--')" />
                    @endif
                @endforeach
            @endif

        </x-cards.data>
    </div>
</div>
