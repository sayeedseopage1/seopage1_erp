<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\LeadUserNote
 *
 * @property int $id
 * @property int $user_id
 * @property int $lead_note_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|LeadUserNote newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadUserNote newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadUserNote query()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadUserNote whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadUserNote whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadUserNote whereLeadNoteId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadUserNote whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadUserNote whereUserId($value)
 * @mixin \Eloquent
 */
class LeadUserNote extends BaseModel
{
    protected $table = 'lead_user_notes';
    protected $fillable = ['user_id', 'lead_note_id'];
}
