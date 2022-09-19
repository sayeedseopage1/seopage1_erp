<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ProposalTemplateItem extends BaseModel
{
    protected $guarded = ['id'];

    protected $with = ['proposalTemplateItemImage'];

    public function proposalTemplateItemImage() : HasOne
    {
        return $this->hasOne(ProposalTemplateItemImage::class, 'proposal_template_item_id');
    }

    public static function taxbyid($id)
    {
        return Tax::where('id', $id)->withTrashed();
    }

}
