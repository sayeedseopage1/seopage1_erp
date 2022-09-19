<?php

namespace App\Models;

use App\Traits\IconTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\KnowledgeBase
 *
 * @property protected $appends
 * @property int $id
 * @property string $to
 * @property string $heading
 * @property int|null $category_id
 * @property string|null $description
 * @property int $added_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\KnowledgeBaseCategory|null $knowledgebasecategory
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase query()
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase whereHeading($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase whereTo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class KnowledgeBase extends BaseModel
{
    use HasFactory;

    const FILE_PATH = 'knowledgebase';

    public function knowledgebasecategory(): BelongsTo
    {
        return $this->belongsTo(KnowledgeBaseCategory::class, 'category_id');
    }

    public function files(): HasMany
    {
        return $this->hasMany(KnowledgeBaseFile::class, 'knowledge_base_id')->orderBy('id', 'desc');
    }

}
