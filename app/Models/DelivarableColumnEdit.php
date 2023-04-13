<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DelivarableColumnEdit extends Model
{
    use HasFactory;
    protected $table = 'delivarable_column_edit';

    public function get_editable_column(): HasMany
    {
        return $this->hasMany(NoticeView::class, 'notice_id');
    }
}
