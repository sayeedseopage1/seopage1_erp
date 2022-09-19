<?php

namespace App\Models;

use App\Traits\IconTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\TicketFile
 *
 * @property int $id
 * @property int $user_id
 * @property int $ticket_reply_id
 * @property string $filename
 * @property string|null $description
 * @property string|null $google_url
 * @property string|null $hashname
 * @property string|null $size
 * @property string|null $dropbox_link
 * @property string|null $external_link
 * @property string|null $external_link_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $file_url
 * @property-read mixed $icon
 * @property-read \App\Models\TicketReply $reply
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile query()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereDropboxLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereExternalLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereExternalLinkName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereGoogleUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereHashname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereTicketReplyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereUserId($value)
 * @mixin \Eloquent
 */
class TicketFile extends BaseModel
{
    use IconTrait;

    const FILE_PATH = 'ticket-files';

    protected $appends = ['file_url','icon'];

    public function getFileUrlAttribute()
    {
        return (!is_null($this->external_link)) ? $this->external_link : asset_url_local_s3('ticket-files/'.$this->ticket_reply_id.'/'.$this->hashname);
    }

    public function reply(): BelongsTo
    {
        return $this->belongsTo(TicketReply::class);
    }

}
