<?php

namespace App\Models;

use App\Observers\LeadFileObserver;
use App\Traits\IconTrait;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Holiday
 *
 * @package App\Models
 * @property int $id
 * @property int $lead_id
 * @property int $user_id
 * @property string $filename
 * @property string $hashname
 * @property string $size
 * @property string|null $description
 * @property string|null $google_url
 * @property string|null $dropbox_link
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $file_url
 * @property-read mixed $icon
 * @property-read \App\Models\Lead $lead
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles query()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereDropboxLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereGoogleUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereHashname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereLeadId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereUserId($value)
 * @mixin \Eloquent
 */
class LeadFiles extends BaseModel
{
    use IconTrait;

    const FILE_PATH = 'lead-files';

    protected $fillable = [];

    protected $guarded = ['id'];
    protected $table = 'lead_files';

    protected $appends = ['file_url', 'icon'];

    public function getFileUrlAttribute()
    {
        return asset_url_local_s3(LeadFiles::FILE_PATH . '/' . $this->lead_id . '/' . $this->hashname);
    }

    public function lead(): BelongsTo
    {
        return $this->belongsTo(Lead::class);
    }

}
