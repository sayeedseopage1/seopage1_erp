<?php

namespace App\Models;

use App\Observers\ClientDocumentObserver;
use Illuminate\Database\Eloquent\Model;
use App\Traits\IconTrait;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Holiday
 *
 * @package App\Models
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string $filename
 * @property string $hashname
 * @property string|null $size
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $doc_url
 * @property-read mixed $icon
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDocument newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDocument newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDocument query()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDocument whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDocument whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDocument whereFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDocument whereHashname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDocument whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDocument whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDocument whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDocument whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDocument whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDocument whereUserId($value)
 * @mixin \Eloquent
 * @property-read \App\Models\User|null $client
 */
class ClientDocument extends BaseModel
{
    use IconTrait;

    const FILE_PATH = 'client-docs';

    // Don't forget to fill this array
    protected $fillable = [];

    protected $guarded = ['id'];
    protected $table = 'client_docs';
    protected $appends = ['doc_url', 'icon'];

    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function getDocUrlAttribute()
    {
        return asset_url_local_s3(ClientDocument::FILE_PATH . '/' . $this->user_id . '/' . $this->hashname);
    }

}
