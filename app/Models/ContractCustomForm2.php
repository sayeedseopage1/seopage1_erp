<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


use App\Observers\ContractCustomFormObserver;
use App\Traits\CustomFieldsTrait;
use App\Models\CustomField;

class ContractCustomForm2 extends BaseModel
{
    use CustomFieldsTrait;



    protected $table = 'contract_custom_forms';

    protected $guarded = ['id'];
    public $customFieldModel = 'App\Models\ContractCustomForm';
    public function customField()
    {
        return $this->belongsTo(CustomField::class, 'custom_fields_id');
    }
}