<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\Factor;
use App\Traits\CustomFieldsTrait;
use App\Observers\InvoiceObserver;
use Illuminate\Support\Facades\DB;
use App\Helper\ProjectManagerPointLogic;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Invoice
 *
 * @property int $id
 * @property int|null $project_id
 * @property int|null $client_id
 * @property string $invoice_number
 * @property string $project_name
 * @property \Illuminate\Support\Carbon $issue_date
 * @property \Illuminate\Support\Carbon $due_date
 * @property float $sub_total
 * @property float $discount
 * @property string $discount_type
 * @property float $total
 * @property int|null $currency_id
 * @property string $status
 * @property string $recurring
 * @property int|null $billing_cycle
 * @property int|null $billing_interval
 * @property string|null $billing_frequency
 * @property string|null $file
 * @property string|null $file_original_name
 * @property string|null $note
 * @property int $credit_note
 * @property string $show_shipping_address
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $estimate_id
 * @property int $send_status
 * @property float $due_amount
 * @property float $amount
 * @property int|null $parent_id
 * @property int|null $invoice_recurring_id
 * @property int|null $created_by
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\User|null $client
 * @property-read \App\Models\ClientDetails|null $clientdetails
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\CreditNotes[] $creditNotes
 * @property-read int|null $credit_notes_count
 * @property-read \App\Models\Currency|null $currency
 * @property-read \App\Models\Estimate|null $estimate
 * @property-read mixed $extras
 * @property-read mixed $icon
 * @property-read mixed $issue_on
 * @property-read mixed $original_invoice_number
 * @property-read mixed $total_amount
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\InvoiceItems[] $items
 * @property-read int|null $items_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Payment[] $payment
 * @property-read int|null $payment_count
 * @property-read \App\Models\Project|null $project
 * @property-read \Illuminate\Database\Eloquent\Collection|Invoice[] $recurrings
 * @property-read int|null $recurrings_count
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice pending()
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice query()
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereBillingCycle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereBillingFrequency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereBillingInterval($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereCreditNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereDiscountType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereDueAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereEstimateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereFileOriginalName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereInvoiceNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereInvoiceRecurringId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereIssueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereParentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereRecurring($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereSendStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereShowShippingAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereSubTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property int|null $order_id
 * @property string|null $hash
 * @property-read \App\Models\Order|null $order
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereHash($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereOrderId($value)
 * @property string $calculate_tax
 * @property int|null $company_address_id
 * @property-read \App\Models\CompanyAddress|null $address
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereCalculateTax($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereCompanyAddressId($value)
 * @property string|null $event_id
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereEventId($value)
 */
class Invoice extends BaseModel
{
    use Notifiable;
    use CustomFieldsTrait;

    protected $dates = ['issue_date', 'due_date'];
    protected $appends = ['total_amount', 'issue_on', 'original_invoice_number'];
    protected $with = ['currency', 'address'];
    public $customFieldModel = 'App\Models\Invoice';

    protected static function boot()
    {
        parent::boot();

        static::updated(function ($item) {
            if ($item->isDirty('status') && in_array($item->status, ['paid'])) {
                if($milestones = ProjectMilestone::with('invoice')->where('status', '!=', 'canceled')->where('id', $item->milestone_id)->orWhere('parent_id', $item->milestone_id)->get()){
                    $is_all_paid = 1;
                    foreach($milestones as $milestone){
                        $is_all_paid = $milestone->invoice && $milestone->invoice->status == 'paid' ? $is_all_paid : 0;
                    }
                    

                    $projectMilestone = ProjectMilestone::with('project.client')->find($item->milestone_id);
                    $activity = 'You marked milestone '.($projectMilestone->milestone_title??null). ', from project <a style="color:blue" href="'.route('projects.show',$projectMilestone->project->id??null).'">'.$projectMilestone->project->project_name??null. '</a> for client: <a style="color:blue" href="'.route('clients.show', $projectMilestone->project->client->id??null).'">'. $projectMilestone->project->client->name??null. '</a> as complete';

                    // Project Manager Point Distribution ( Milestone release )
                    if($is_all_paid) ProjectManagerPointLogic::distribute(4, $item->project_id, $is_all_paid, null, $activity);
                }

                if(Project::with('deal')->find($item->project_id)->deal->project_type == 'hourly'){
                    $project = Project::with('client', 'deal')->find($item->project_id);
                    $totalHours = $project->deal->hourly_rate ? ($item->total / $project->deal->hourly_rate) : 0;

                    $activity = 'You billed '.$totalHours.' hours for your hourly project <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a> from client <a style="color:blue" href="'.route('clients.show', $project->client->id).'">'. $project->client->name. '</a> this week!';

                    // Project Manager Point Distribution ( Billed amount every week )
                    ProjectManagerPointLogic::distribute(18, $item->project_id, 1, ($item->total/100) * Factor::find(45)->points);
                }
            }
        });
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id')->withTrashed();
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id')->withoutGlobalScopes(['active']);
    }

    public function clientdetails(): BelongsTo
    {
        return $this->belongsTo(ClientDetails::class, 'client_id', 'user_id');
    }

    public function creditNotes(): HasMany
    {
        return $this->hasMany(CreditNotes::class);
    }

    public function recurrings(): HasMany
    {
        return $this->hasMany(Invoice::class, 'parent_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(InvoiceItems::class, 'invoice_id');
    }

    public function payment(): HasMany
    {
        return $this->hasMany(Payment::class, 'invoice_id')->orderBy('paid_on', 'desc');
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function estimate(): BelongsTo
    {
        return $this->belongsTo(Estimate::class, 'estimate_id');
    }

    public function address(): BelongsTo
    {
        return $this->belongsTo(CompanyAddress::class, 'company_address_id');
    }

    public function scopePending($query)
    {
        return $query->where(function ($q) {
            $q->where('invoices.status', 'unpaid')
                ->orWhere('invoices.status', 'partial');
        });
    }

    public static function clientInvoices($clientId)
    {
        return Invoice::join('projects', 'projects.id', '=', 'invoices.project_id')
            ->select('projects.project_name', 'invoices.*')
            ->where('projects.client_id', $clientId)
            ->get();
    }

    public static function lastInvoiceNumber()
    {
        $invoice = DB::select('SELECT MAX(CAST(`invoice_number` as UNSIGNED)) as invoice_number FROM `invoices`');
        return $invoice[0]->invoice_number;
    }

    public function appliedCredits()
    {
        return Payment::where('invoice_id', $this->id)->sum('actual_amount');
    }

    public function amountDue()
    {
        $due = $this->total - ($this->amountPaid());
        return $due < 0 ? 0 : $due;
    }

    public function amountPaid()
    {
        return $this->payment->where('status', 'complete')->sum('actual_amount');
    }

    public function getPaidAmount()
    {
        return Payment::where('invoice_id', $this->id)->sum('actual_amount');
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

    public function getOriginalInvoiceNumberAttribute()
    {
        $invoiceSettings = invoice_setting();
        $zero = '';

        if (strlen($this->attributes['invoice_number']) < $invoiceSettings->invoice_digit) {
            $condition = $invoiceSettings->invoice_digit - strlen($this->attributes['invoice_number']);

            for ($i = 0; $i < $condition; $i++) {
                $zero = '0' . $zero;
            }
        }

        $zero = $zero . $this->attributes['invoice_number'];
        return $zero;
    }

    public function getInvoiceNumberAttribute($value)
    {
        if (!is_null($value)) {
            $invoiceSettings = invoice_setting();
            $zero = '';

            if (strlen($value) < $invoiceSettings->invoice_digit) {
                $condition = $invoiceSettings->invoice_digit - strlen($value);

                for ($i = 0; $i < $condition; $i++) {
                    $zero = '0' . $zero;
                }
            }

            $zero = $invoiceSettings->invoice_prefix . '#' . $zero . $value;
            return $zero;
        }

        return '';
    }

}
