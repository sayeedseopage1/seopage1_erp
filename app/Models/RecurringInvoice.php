<?php

namespace App\Models;

use App\Observers\InvoiceRecurringObserver;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;

/**
 * App\Models\RecurringInvoice
 *
 * @property int $id
 * @property int|null $currency_id
 * @property int|null $project_id
 * @property int|null $client_id
 * @property int|null $user_id
 * @property int|null $created_by
 * @property \Illuminate\Support\Carbon $issue_date
 * @property \Illuminate\Support\Carbon $due_date
 * @property float $sub_total
 * @property float $total
 * @property float $discount
 * @property string $discount_type
 * @property string $status
 * @property string|null $file
 * @property string|null $file_original_name
 * @property string|null $note
 * @property string $show_shipping_address
 * @property int|null $day_of_month
 * @property int|null $day_of_week
 * @property string|null $payment_method
 * @property string $rotation
 * @property int|null $billing_cycle
 * @property int $client_can_stop
 * @property int $unlimited_recurring
 * @property string|null $deleted_at
 * @property string|null $shipping_address
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\User|null $client
 * @property-read \App\Models\ClientDetails|null $clientdetails
 * @property-read \App\Models\Currency|null $currency
 * @property-read mixed $icon
 * @property-read mixed $issue_on
 * @property-read mixed $total_amount
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\RecurringInvoiceItems[] $items
 * @property-read int|null $items_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\Project|null $project
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Invoice[] $recurrings
 * @property-read int|null $recurrings_count
 * @property-read \App\Models\User|null $withoutGlobalScopeCompanyClient
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice query()
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereBillingCycle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereClientCanStop($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereDayOfMonth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereDayOfWeek($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereDiscountType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereFileOriginalName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereIssueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice wherePaymentMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereRotation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereShippingAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereShowShippingAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereSubTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereUnlimitedRecurring($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereUserId($value)
 * @mixin \Eloquent
 * @property string $calculate_tax
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereCalculateTax($value)
 */
class RecurringInvoice extends BaseModel
{
    use Notifiable;

    protected $table = 'invoice_recurring';
    protected $dates = ['issue_date', 'due_date'];
    protected $appends = ['total_amount', 'issue_on'];
    protected $with = ['client'];

    public function recurrings(): HasMany
    {
        return $this->hasMany(Invoice::class, 'invoice_recurring_id');
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id')->withoutGlobalScopes(['active']);
    }

    public function clientdetails(): BelongsTo
    {
        return $this->belongsTo(ClientDetails::class, 'client_id', 'user_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(RecurringInvoiceItems::class, 'invoice_recurring_id');
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class, 'currency_id')->withoutGlobalScopes(['enable']);
    }

    public function getTotalAmountAttribute()
    {

        if (!is_null($this->total) && !is_null($this->currency->currency_symbol)) {
            return $this->currency->currency_symbol . $this->total;
        }

        return '';
    }

    public function getIssueOnAttribute()
    {
        if (!is_null($this->issue_date)) {
            return Carbon::parse($this->issue_date)->format('d F, Y');
        }

        return '';
    }

}
