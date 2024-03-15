<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GraphicWorkDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_id',
        'type_of_graphic_work_id',
        'type_of_logo',
        'brand_name',
        'number_of_versions',
        'file_types_needed',
        'attach_text_files',
        'workable_image_files',
        'design_instruction',
        'workable_image_or_video_files',
        'reference',
        'font_name',
        'font_url',
        'brand_guideline_files',
        'primary_color',
        'primary_color_description',
        'secondary_colors'
    ];

    public function graphicTaskFiles()
    {
        return $this->hasMany(GraphicTaskFile::class, 'graphic_work_detail_id', 'id');
    }
}
