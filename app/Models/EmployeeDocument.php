<?php

namespace App\Models;

use App\Observers\EmployeeDocsObserver;
use App\Traits\IconTrait;
use Illuminate\Database\Eloquent\Model;
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
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument query()
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument whereFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument whereHashname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument whereUserId($value)
 * @mixin \Eloquent
 */
class EmployeeDocument extends BaseModel
{
    use IconTrait;
    const FILE_PATH = 'employee-docs';
    // Don't forget to fill this array
    protected $fillable = [];

    protected $guarded = ['id'];
    protected $table = 'employee_docs';
    protected $appends = ['doc_url', 'icon'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getDocUrlAttribute()
    {
        return asset_url_local_s3(EmployeeDocument::FILE_PATH.'/'.$this->user_id.'/'.$this->hashname);
    }

}
