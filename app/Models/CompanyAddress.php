<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\CompanyAddress
 *
 * @property int $id
 * @property string $address
 * @property int $is_default
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $tax_number
 * @property string|null $tax_name
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyAddress newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyAddress newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyAddress query()
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyAddress whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyAddress whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyAddress whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyAddress whereIsDefault($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyAddress whereTaxName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyAddress whereTaxNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyAddress whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property string|null $location
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyAddress whereLocation($value)
 */
class CompanyAddress extends BaseModel
{
    use HasFactory;

    protected $fillable = ['address', 'is_default', 'location', 'tax_number', 'tax_name'];

    public static function defaultAddress()
    {
        return CompanyAddress::where('is_default', 1)->first();
    }

}
