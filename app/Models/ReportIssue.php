<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class ReportIssue extends Model
{
    use HasFactory;
      protected $table = 'report_issues';

          protected $dates = ['deleted_at'];
          protected $appends = ['created_on'];





          public function getCreatedOnAttribute()
          {
              $setting = global_setting();

              if (!is_null($this->created_at)) {
                  return $this->created_at->timezone($setting->timezone)->format('d M Y H:i');
              }

              return '';
          }
          public function created_by()
        {
            return $this->belongsTo(User::class, 'user_id');
        }

}
