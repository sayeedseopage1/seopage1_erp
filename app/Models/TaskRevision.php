<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskRevision extends Model
{
    use HasFactory;

    protected static function boot(){
        parent::boot();

        static::created(function($item){
            if($item->final_responsible_person && $item->final_responsible_person == 'PM'){
                // 
            }elseif(in_array($item->dispute_between, ['PLR', 'CPR', 'SPR']) && ($item->raised_by_percent || $item->raised_against_percent)){
                // 
            }
        });

        static::updated(function($item){
            if($item->isDirty('final_responsible_person') && $item->final_responsible_person && $item->final_responsible_person == 'PM'){
                // 
            }elseif(($item->isDirty('raised_by_percent') || $item->isDirty('raised_against_percent')) && in_array($item->dispute_between, ['PLR', 'CPR', 'SPR']) && ($item->raised_by_percent || $item->raised_against_percent)){
                // 
            }
        });
    }
}
