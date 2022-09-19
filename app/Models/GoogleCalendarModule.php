<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\GoogleCalendarModule
 *
 * @property int $id
 * @property int $lead_status
 * @property int $leave_status
 * @property int $invoice_status
 * @property int $contract_status
 * @property int $task_status
 * @property int $event_status
 * @property int $holiday_status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCalendarModule newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCalendarModule newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCalendarModule query()
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCalendarModule whereContractStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCalendarModule whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCalendarModule whereEventStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCalendarModule whereHolidayStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCalendarModule whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCalendarModule whereInvoiceStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCalendarModule whereLeadStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCalendarModule whereLeaveStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCalendarModule whereTaskStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCalendarModule whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class GoogleCalendarModule extends BaseModel
{
    protected $table = 'google_calendar_modules';
}
