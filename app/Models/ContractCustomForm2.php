<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


use App\Observers\ContractCustomFormObserver;
use App\Traits\CustomFieldsTrait;
use App\Models\CustomField;
/**
 * App\Models\LeadCustomForm
 *
 * @property int $id
 * @property string $field_display_name
 * @property string $field_name
 * @property int $field_order
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm query()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm whereFieldDisplayName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm whereFieldName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm whereFieldOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property int $required
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm whereRequired($value)
 */
class ContractCustomForm extends BaseModel
{
  use CustomFieldsTrait;



protected $table = 'contract_custom_forms';

  protected $guarded = ['id'];
  public $customFieldModel = 'App\Models\ContractCustomForm';
  public function customField(): BelongsTo
  {
      return $this->belongsTo(CustomField::class, 'custom_fields_id');
  }
}
