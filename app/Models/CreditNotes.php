<?php

namespace App\Models;

use App\Observers\CreditNoteObserver;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;

/**
 * App\Models\CreditNotes
 *
 * @property int $id
 * @property int|null $project_id
 * @property int|null $client_id
 * @property string $cn_number
 * @property int|null $invoice_id
 * @property \Illuminate\Support\Carbon $issue_date
 * @property \Illuminate\Support\Carbon $due_date
 * @property float $discount
 * @property string $discount_type
 * @property float $sub_total
 * @property float $total
 * @property int|null $currency_id
 * @property string $status
 * @property string $recurring
 * @property string|null $billing_frequency
 * @property int|null $billing_interval
 * @property int|null $billing_cycle
 * @property string|null $file
 * @property string|null $file_original_name
 * @property string|null $note
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\User|null $client
 * @property-read \App\Models\ClientDetails|null $clientdetails
 * @property-read \App\Models\Currency|null $currency
 * @property-read mixed $icon
 * @property-read mixed $issue_on
 * @property-read mixed $original_cn_number
 * @property-read mixed $total_amount
 * @property-read \App\Models\Invoice|null $invoice
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Invoice[] $invoices
 * @property-read int|null $invoices_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\CreditNoteItem[] $items
 * @property-read int|null $items_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Payment[] $payment
 * @property-read int|null $payment_count
 * @property-read \App\Models\Project|null $project
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes query()
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereBillingCycle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereBillingFrequency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereBillingInterval($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereCnNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereDiscountType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereFileOriginalName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereIssueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereRecurring($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereSubTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property float|null $adjustment_amount
 * @property string $calculate_tax
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereAdjustmentAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereCalculateTax($value)
 */
class CreditNotes extends BaseModel
{
    use Notifiable;

    protected $dates = ['issue_date', 'due_date'];
    protected $appends = ['total_amount', 'issue_on', 'cn_number', 'original_cn_number'];
    protected $with = ['currency'];

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

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class, 'invoice_id', 'id');
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(CreditNoteItem::class, 'credit_note_id');
    }

    public function payment(): HasMany
    {
        return $this->hasMany(Payment::class, 'invoice_id', 'invoice_id')->orderBy('paid_on', 'desc');
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }

    public static function clientInvoices($clientId)
    {
        return CreditNotes::join('projects', 'projects.id', '=', 'credit_notes.project_id')
            ->select('projects.project_name', 'credit_notes.*')
            ->where('projects.client_id', $clientId)
            ->get();
    }

    public function getPaidAmount()
    {
        return $this->payment->sum('amount');
    }

    public function creditAmountUsed()
    {
        return $this->payment->sum('amount');
    }

    /* This is overall amount, cannot be used for particular credit note */
    public function creditAmountRemaining()
    {
        return ($this->total + $this->adjustment_amount) - $this->getPaidAmount();
    }

    public function getTotalAmountAttribute()
    {
        return $this->total + $this->adjustment_amount;
    }

    public function getIssueOnAttribute()
    {
        if (!is_null($this->issue_date)) {
            return Carbon::parse($this->issue_date)->format('d F, Y');
        }

        return '';
    }

    public function getOriginalCnNumberAttribute()
    {
        $invoiceSettings = invoice_setting();
        $zero = '';

        if (strlen($this->attributes['cn_number']) < $invoiceSettings->invoice_digit) {
            $condition = $invoiceSettings->invoice_digit - strlen($this->attributes['cn_number']);

            for ($i = 0; $i < $condition; $i++) {
                $zero = '0' . $zero;
            }
        }

        return '#' . $zero . $this->attributes['cn_number'];
    }

    public function getCnNumberAttribute($value)
    {
        if (!is_null($value)) {
            $invoiceSettings = invoice_setting();
            $zero = '';

            if (strlen($value) < $invoiceSettings->credit_note_digit) {

                $condition = $invoiceSettings->credit_note_digit - strlen($value);

                for ($i = 0; $i < $condition; $i++) {
                    $zero = '0' . $zero;
                }
            }

            return $invoiceSettings->credit_note_prefix . '#' . $zero . $value;
        }

        return '';
    }

    public function setIssueDateAttribute($issue_date)
    {
        $issue_date = Carbon::createFromFormat(global_setting()->date_format, $issue_date, global_setting()->timezone)->format('Y-m-d');
        $issue_date = Carbon::parse($issue_date)->setTimezone('UTC');

        $this->attributes['issue_date'] = $issue_date;
    }

    public function setDueDateAttribute($due_date)
    {
        if(!is_null($due_date)){

            $due_date = Carbon::createFromFormat(global_setting()->date_format, $due_date, global_setting()->timezone)->format('Y-m-d');

            $due_date = Carbon::parse($due_date)->setTimezone('UTC');

            $this->attributes['due_date'] = $due_date;
        }
    }

}
