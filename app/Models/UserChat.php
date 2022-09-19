<?php

namespace App\Models;

use App\Observers\NewChatObserver;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Support\Facades\DB;

/**
 * App\Models\UserChat
 *
 * @property int $id
 * @property int $user_one
 * @property int $user_id
 * @property string $message
 * @property int|null $from
 * @property int|null $to
 * @property string $message_seen
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $fromUser
 * @property-read mixed $icon
 * @property-read \App\Models\User|null $toUser
 * @method static Builder|UserChat lastPerGroup(?array $fields = null)
 * @method static Builder|UserChat newModelQuery()
 * @method static Builder|UserChat newQuery()
 * @method static Builder|UserChat query()
 * @method static Builder|UserChat whereCreatedAt($value)
 * @method static Builder|UserChat whereFrom($value)
 * @method static Builder|UserChat whereId($value)
 * @method static Builder|UserChat whereMessage($value)
 * @method static Builder|UserChat whereMessageSeen($value)
 * @method static Builder|UserChat whereTo($value)
 * @method static Builder|UserChat whereUpdatedAt($value)
 * @method static Builder|UserChat whereUserId($value)
 * @method static Builder|UserChat whereUserOne($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\UserchatFile[] $files
 * @property-read int|null $files_count
 * @method static \Database\Factories\UserChatFactory factory(...$parameters)
 */
class UserChat extends BaseModel
{

    use HasFactory;

    protected $table = 'users_chat';

    public function fromUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'from')->withoutGlobalScopes(['active']);
    }

    public function toUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'to')->withoutGlobalScopes(['active']);
    }

    public static function chatDetail($id, $userID)
    {
        return UserChat::with('fromUser', 'toUser', 'files')->where(function ($q) use ($id, $userID) {
            $q->Where('user_id', $id)->Where('user_one', $userID)
                ->orwhere(function ($q) use ($id, $userID) {
                    $q->Where('user_one', $id)
                        ->Where('user_id', $userID);
                });
        })

            ->orderBy('created_at', 'asc')->get();
    }

    public static function messageSeenUpdate($loginUser, $toUser, $updateData)
    {
        return UserChat::where('from', $toUser)->where('to', $loginUser)->update($updateData);
    }

    /**
     * Get the latest entry for each group.
     *
     * Each group is composed of one or more columns that make a unique combination to return the
     * last entry for.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param array|null $fields A list of fields that's considered as a unique entry by the query.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeLastPerGroup(Builder $query, ?array $fields = null): Builder
    {
        return $query->whereIn('id', function (QueryBuilder $query) use ($fields) {
            return $query->from(static::getTable())
                ->selectRaw('max(`id`)')
                ->groupBy($fields);
        });
    }

    public static function userList()
    {
        return UserChat::with('toUser')->select('users_chat.*')
            ->lastPerGroup(['user_id'])
            ->where('from', user()->id)
            ->orWhere('to', user()->id)
            ->get();
    }

    public static function userListLatest($userID, $term)
    {

        if ($term) {
            $termCnd = 'and (users.name like \'%'.$term.'%\' or u.name like \'%'.$term.'%\')';
        }
        else {
            $termCnd = '';
        }

        return DB::select('
            SELECT t1.id
            FROM users_chat AS t1
            INNER JOIN users ON users.id = t1.user_one
            INNER JOIN users as u ON u.id = t1.user_id
            INNER JOIN
            (
                SELECT
                    LEAST(user_one, user_id) AS sender,
                    GREATEST(user_one, user_id) AS receiver,
                    MAX(id) AS max_id
                FROM users_chat
                GROUP BY
                    LEAST(user_one, user_id),
                    GREATEST(user_one, user_id)
            ) AS t2
                ON LEAST(t1.user_one, t1.user_id) = t2.sender AND
                GREATEST(t1.user_one, t1.user_id) = t2.receiver AND
                t1.id = t2.max_id
                WHERE (t1.user_one = ? OR t1.user_id = ?) '.$termCnd.'
                ORDER BY t1.created_at DESC
            ', [$userID, $userID]);
    }

    public function files()
    {
        return $this->hasMany(UserchatFile::class, 'users_chat_id');
    }

    public static function chatDetailViaId($chatId)
    {
        $userChat = UserChat::find($chatId);

        if($userChat){
            $user1 = $userChat->from;
            $user2 = $userChat->to;

            return UserChat::with('fromUser', 'toUser', 'files')->where(function ($q) use ($user1, $user2) {
                $q->Where('user_id', $user1)->Where('user_one', $user2)
                    ->orwhere(function ($q) use ($user1, $user2) {
                        $q->Where('user_one', $user1)
                            ->Where('user_id', $user2);
                    });
            })->orderBy('created_at', 'asc')->get();
        }

        return null;

    }

}
