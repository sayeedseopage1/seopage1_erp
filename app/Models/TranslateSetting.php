<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\TranslateSetting
 *
 * @property int $id
 * @property string|null $google_key
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|TranslateSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TranslateSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TranslateSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|TranslateSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TranslateSetting whereGoogleKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TranslateSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TranslateSetting whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class TranslateSetting extends BaseModel
{
    protected $guarded = ['id'];
    use HasFactory;
}
