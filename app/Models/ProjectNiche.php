<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectNiche extends Model
{
    use HasFactory;
        protected $table = 'project_niches';

        public function parent()
        {
            return $this->belongsTo(ProjectNiche::class,'parent_category_id','id');
        }

        public function child()
        {
            return $this->hasMany(ProjectNiche::class,'parent_category_id','id');
        }

}
