<?php

namespace App\Models;

use App\Traits\IconTrait;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\CreditNoteItemImage
 *
 * @property int $id
 * @property int $credit_note_item_id
 * @property string $filename
 * @property string|null $hashname
 * @property string|null $size
 * @property string|null $external_link
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $file_url
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItemImage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItemImage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItemImage query()
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItemImage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItemImage whereCreditNoteItemId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItemImage whereExternalLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItemImage whereFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItemImage whereHashname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItemImage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItemImage whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItemImage whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class CreditNoteItemImage extends BaseModel
{
    use IconTrait;

    protected $appends = ['file_url', 'icon'];
    Protected $fillable = ['credit_note_item_id', 'filename', 'hashname', 'size', 'external_link'];

    public function getFileUrlAttribute()
    {
        if(empty($this->external_link)){
            return asset_url_local_s3('credit-note-files/' . $this->credit_note_item_id . '/' . $this->hashname);
        }
        elseif (!empty($this->external_link)) {
            return $this->external_link;
        }
        else {
            return '';
        }

    }

}
