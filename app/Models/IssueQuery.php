<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class IssueQuery extends Model
{
    use HasFactory;
    protected $table = 'issue_queries';

      public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
