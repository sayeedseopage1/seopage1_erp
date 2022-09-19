<?php

namespace App\Models;

use App\Observers\CustomFieldsObserver;
use App\Traits\CustomFieldsTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\CustomField
 *
 * @property int $id
 * @property int|null $custom_field_group_id
 * @property string $label
 * @property string $name
 * @property bool $export
 * @property string $type
 * @property string $required
 * @property string|null $values
 * @method static \Illuminate\Database\Eloquent\Builder|CustomField newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomField newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomField query()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomField whereCustomFieldGroupId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomField whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomField whereLabel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomField whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomField whereRequired($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomField whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomField whereValues($value)
 * @mixin \Eloquent
 */
class CustomField extends BaseModel
{
    public $timestamps = false;

    protected $guarded = ['id'];

    public function leadCustomForm(): HasOne
    {
        return $this->hasOne(LeadCustomForm::class, 'custom_fields_id');
    }

    public function ticketCustomForm(): HasOne
    {
        return $this->hasOne(TicketCustomForm::class, 'custom_fields_id');
    }

}
