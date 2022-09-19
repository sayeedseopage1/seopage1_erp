<div class="row">
    <div class="col-sm-12">
        <x-cards.data :title="__('app.menu.expenses') . ' ' . __('app.details')" class=" mt-4">
            <x-cards.data-row :label="__('modules.expenses.itemName')" :value="$expense->item_name" />

            <x-cards.data-row :label="__('app.category')" :value="$expense->category->category_name ?? '--'" />

            <x-cards.data-row :label="__('app.price')" :value="currency_formatter($expense->price)" />

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

            <div class="row my-4" id="history">
                <div class="col-12">
                    <h4 class="f-18 f-w-500 mb-0">@lang('app.recurringDetail')</h4>
                </div>
            </div>

            <x-cards.data-row :label="__('modules.invoices.billingFrequency')"
                :value="__('app.' . $expense->rotation)" />

            @if ($expense->rotation != 'daily')
                @if ($expense->rotation == 'weekly' || $expense->rotation == 'bi-weekly')
                    <x-cards.data-row :label="__('modules.expensesRecurring.dayOfWeek')"
                        :value="__('app.' . $daysOfWeek[$expense->day_of_week])" />
                @else
                    <x-cards.data-row :label="__('modules.expensesRecurring.dayOfMonth')"
                        :value="$expense->day_of_month" />
                @endif
            @endif

            <x-cards.data-row :label="__('modules.invoices.billingCycle')"
                :value="($expense->billing_cycle == '-1' ? __('app.infinite') : $expense->billing_cycle)" />


            <div class="col-12 px-0 pb-3 d-lg-flex d-md-flex d-block">
                <p class="mb-0 text-lightest f-14 w-30 text-capitalize">
                    @lang('app.status')</p>
                <p class="mb-0 text-dark-grey f-14">
                    @if ($expense->status == 'active')
                        <x-status :value="__('app.'.$expense->status)" color="dark-green" />
                    @else
                        <x-status :value="__('app.'.$expense->status)" color="red" />
                    @endif
                </p>
            </div>


        </x-cards.data>
    </div>
</div>
