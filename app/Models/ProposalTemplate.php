<?php

namespace App\Models;

use App\Observers\ProposalTemplateObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProposalTemplate extends BaseModel
{
    protected $table = 'proposal_templates';

    protected static function boot()
    {
        parent::boot();
        static::observe(ProposalTemplateObserver::class);
    }

    public function items() : HasMany
    {
        return $this->hasMany(ProposalTemplateItem::class, 'proposal_template_id');
    }

    public function currency() : BelongsTo
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }

    public function lead() : BelongsTo
    {
        return $this->belongsTo(Lead::class);
    }

}
