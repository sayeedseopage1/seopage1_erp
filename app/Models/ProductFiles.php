<?php

namespace App\Models;

use App\Observers\ProductFileObserver;
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
 * @method static \Illuminate\Database\Eloquent\Builder|ProductFiles newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductFiles newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductFiles query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductFiles whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductFiles whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductFiles whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductFiles whereDropboxLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductFiles whereFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductFiles whereGoogleUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductFiles whereHashname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductFiles whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductFiles whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductFiles whereLeadId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductFiles whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductFiles whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductFiles whereUserId($value)
 * @mixin \Eloquent
 * @property int $product_id
 * @property-read \App\Models\Product $product
 * @method static \Illuminate\Database\Eloquent\Builder|ProductFiles whereProductId($value)
 */
class ProductFiles extends BaseModel
{
    use IconTrait;
    const FILE_PATH = 'products';

    protected $fillable = [];

    protected $guarded = ['id'];
    protected $table = 'product_files';

    protected $appends = ['file_url', 'icon'];

    public $timestamps = false;

    public function getFileUrlAttribute()
    {
        return asset_url_local_s3(Product::FILE_PATH.'/' . $this->hashname);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

}
