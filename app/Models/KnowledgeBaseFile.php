<?php

namespace App\Models;

use App\Traits\IconTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @property protected $appends
 */
class KnowledgeBaseFile extends BaseModel
{
    use HasFactory;
    use IconTrait;

    const FILE_PATH = 'knowledgebase';

    protected $fillable = [];
    protected $guarded = ['id'];
    protected $appends = ['file_url', 'icon'];

    public function getFileUrlAttribute()
    {
        return (!is_null($this->external_link)) ? $this->external_link : asset_url_local_s3(KnowledgeBaseFile::FILE_PATH . '/' . $this->knowledge_base_id . '/' . $this->hashname);
    }

}
