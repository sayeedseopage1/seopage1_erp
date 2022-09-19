<?php

namespace App\Models;

use App\Traits\IconTrait;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\EstimateItemImage
 *
 * @property int $id
 * @property int $estimate_item_id
 * @property string $filename
 * @property string|null $hashname
 * @property string|null $size
 * @property string|null $external_link
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $file_url
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItemImage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItemImage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItemImage query()
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItemImage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItemImage whereEstimateItemId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItemImage whereExternalLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItemImage whereFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItemImage whereHashname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItemImage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItemImage whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItemImage whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class EstimateItemImage extends BaseModel
{
    use IconTrait;

    const FILE_PATH = 'estimate-files';

    protected $appends = ['file_url', 'icon'];
    protected $fillable = ['estimate_item_id', 'filename', 'hashname', 'size', 'external_link'];

    public function getFileUrlAttribute()
    {
        if (empty($this->external_link)) {
            return asset_url_local_s3('estimate-files/' . $this->estimate_item_id . '/' . $this->hashname);
        }

        if (!empty($this->external_link)) {
            return $this->external_link;
        }

        return '';


    }

}
