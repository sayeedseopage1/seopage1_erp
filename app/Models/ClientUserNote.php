<?php

namespace App\Models;

use App\Observers\ClientUserNotesObserver;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ClientUserNote
 *
 * @property int $id
 * @property int $user_id
 * @property int $client_note_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|ClientUserNote newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientUserNote newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientUserNote query()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientUserNote whereClientNoteId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientUserNote whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientUserNote whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientUserNote whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientUserNote whereUserId($value)
 * @mixin \Eloquent
 */
class ClientUserNote extends BaseModel
{
    protected $table = 'client_user_notes';
    protected $fillable = ['user_id', 'client_note_id'];

}
