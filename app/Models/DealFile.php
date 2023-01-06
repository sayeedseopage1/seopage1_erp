<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DealFile extends Model
{
    use HasFactory;
    protected $fillable = ['deal_id','deal_stage_id', 'filename'];
    public function deal()
{
return $this->belongsTo('App\Models\DealStage');
}

}
