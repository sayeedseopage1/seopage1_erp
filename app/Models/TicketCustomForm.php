<?php

namespace App\Models;

use App\Scopes\CompanyScope;
use App\Traits\CustomFieldsTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\TicketCustomForm
 *
 * @property int $id
 * @property string $field_display_name
 * @property string $field_name
 * @property string $field_type
 * @property int $field_order
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm query()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm whereFieldDisplayName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm whereFieldName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm whereFieldOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm whereFieldType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property int $required
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm whereRequired($value)
 */
class TicketCustomForm extends BaseModel
{
    use CustomFieldsTrait;
    protected $guarded = ['id'];

    public function customField(): BelongsTo
    {
        return $this->belongsTo(CustomField::class, 'custom_fields_id');
    }

}
