<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\OfflinePaymentMethod
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string|null $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|OfflinePaymentMethod newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OfflinePaymentMethod newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OfflinePaymentMethod query()
 * @method static \Illuminate\Database\Eloquent\Builder|OfflinePaymentMethod whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OfflinePaymentMethod whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OfflinePaymentMethod whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OfflinePaymentMethod whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OfflinePaymentMethod whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OfflinePaymentMethod whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class OfflinePaymentMethod extends BaseModel
{
    protected $table = 'offline_payment_methods';
    protected $dates = ['created_at'];

    public static function activeMethod()
    {
        return OfflinePaymentMethod::where('status', 'yes')->get();
    }

}
