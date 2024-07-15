<?php

namespace App\Models;

use App\Models\LeadStatus;
use App\Observers\LeadObserver;
use App\Traits\CustomFieldsTrait;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

// use App\Models\Scopes\OrderByDesc;

/**
 * App\Models\Lead
 *
 * @property int $id
 * @property int|null $client_id
 * @property int|null $source_id
 * @property int|null $status_id
 * @property int $column_priority
 * @property int|null $agent_id
 * @property string|null $company_name
 * @property string|null $website
 * @property string|null $address
 * @property string|null $salutation
 * @property string $client_name
 * @property string $client_email
 * @property string|null $mobile
 * @property string|null $cell
 * @property string|null $office
 * @property string|null $city
 * @property string|null $state
 * @property string|null $country
 * @property string|null $postal_code
 * @property string|null $note
 * @property string $next_follow_up
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property float|null $value
 * @property int|null $currency_id
 * @property int|null $category_id
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\User|null $client
 * @property-read \App\Models\Currency|null $currency
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\LeadFiles[] $files
 * @property-read int|null $files_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\LeadFollowUp[] $follow
 * @property-read int|null $follow_count
 * @property-read \App\Models\LeadFollowUp|null $followup
 * @property-read mixed $extras
 * @property-read mixed $icon
 * @property-read mixed $image_url
 * @property-read \App\Models\LeadAgent|null $leadAgent
 * @property-read \App\Models\LeadSource|null $leadSource
 * @property-read \App\Models\LeadStatus|null $leadStatus
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @method static \Database\Factories\LeadFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Lead newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Lead query()
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereCell($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereClientEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereClientName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereColumnPriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereMobile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereNextFollowUp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereOffice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead wherePostalCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereSalutation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereSourceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereStatusId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereWebsite($value)
 * @mixin \Eloquent
 * @property string|null $hash
 * @property-read \App\Models\LeadCategory|null $category
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereHash($value)
 */
class Lead extends BaseModel
{
    use Notifiable, HasFactory;
    use CustomFieldsTrait;

    protected $table = 'leads';

    public $customFieldModel = 'App\Models\Lead';

    protected $appends = ['image_url'];

    protected static function booted()
    {
        // static::addGlobalScope(new OrderByDesc); // assign the Scope here
    }

    public function getImageUrlAttribute()
    {
        $gravatarHash = md5(strtolower(trim($this->client_email)));
        return 'https://www.gravatar.com/avatar/' . $gravatarHash . '.png?s=200&d=mp';
    }

    /**
     * Route notifications for the mail channel.
     *
     * @param \Illuminate\Notifications\Notification $notification
     * @return string
     */
    // phpcs:ignore
    public function routeNotificationForMail($notification)
    {
        return $this->client_email;
    }

    public function leadAgent(): BelongsTo
    {
        return $this->belongsTo(LeadAgent::class, 'agent_id');
    }

    public function leadSource(): BelongsTo
    {
        return $this->belongsTo(LeadSource::class, 'source_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(LeadCategory::class, 'category_id');
    }
    public function deal(): BelongsTo
    {
        return $this->belongsTo(DealStage::class, 'lead_id');
    }

    public function leadStatus(): BelongsTo
    {
        return $this->belongsTo(LeadStatus::class, 'status_id');
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }

    public function follow()
    {
        if (user()) {
            $viewLeadFollowUpPermission = user()->permission('view_lead_follow_up');

            if ($viewLeadFollowUpPermission == 'all') {
                return $this->hasMany(LeadFollowUp::class);

            } elseif ($viewLeadFollowUpPermission == 'added') {
                return $this->hasMany(LeadFollowUp::class)->where('added_by', user()->id);

            } else {
                return null;
            }
        }

        return $this->hasMany(LeadFollowUp::class);
    }

    public function followup(): HasOne
    {
        return $this->hasOne(LeadFollowUp::class, 'lead_id')->orderBy('created_at', 'desc');
    }

    public function files(): HasMany
    {
        return $this->hasMany(LeadFiles::class)->orderBy('created_at', 'desc');
    }

    public static function allLeads()
    {
        $viewLeadPermission = user()->permission('view_lead');

        $leads = Lead::select('*')
            ->orderBy('client_name', 'asc');

        if (!isRunningInConsoleOrSeeding()) {

            if ($viewLeadPermission == 'added') {
                $leads->where('added_by', user()->id);
            }
        }

        return $leads->get();
    }

    public function addedBy()
    {
        $addedBy = User::find($this->added_by);

        return $addedBy ?: null;
    }
    public function addedByUser()
    {
        return $this->belongsTo(User::class, 'added_by');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'added_by');
    }
    public function lead_status()
    {
        return $this->belongsTo(LeadStatus::class, 'status_id');
    }
    public function original_currency()
    {
        return $this->belongsTo(Currency::class, 'original_currency_id');
    }

}
