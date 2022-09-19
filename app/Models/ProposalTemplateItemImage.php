<?php

namespace App\Models;

use App\Traits\IconTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProposalTemplateItemImage extends Model
{
    use IconTrait;
    const FILE_PATH = 'proposal-files';

    protected $appends = ['file_url', 'icon'];
    Protected $fillable = ['proposal_template_item_id', 'filename', 'hashname', 'size', 'external_link'];

    public function getFileUrlAttribute()
    {
        if(empty($this->external_link)){
            return asset_url_local_s3('proposal-files/' . $this->proposal_template_item_id . '/' . $this->hashname);
        }
        elseif (!empty($this->external_link)) {
            return $this->external_link;
        }
        else {
            return '';
        }

    }

}
