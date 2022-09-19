<?php

namespace App\Models;

use App\Observers\ClientDetailsObserver;
use App\Traits\CustomFieldsTrait;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ClientDetails
 *
 * @property int $id
 * @property int $user_id
 * @property string|null $company_name
 * @property string|null $address
 * @property string|null $shipping_address
 * @property string|null $postal_code
 * @property string|null $state
 * @property string|null $city
 * @property string|null $office
 * @property string|null $website
 * @property string|null $note
 * @property string|null $linkedin
 * @property string|null $facebook
 * @property string|null $twitter
 * @property string|null $skype
 * @property string|null $gst_number
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $category_id
 * @property int|null $sub_category_id
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $extras
 * @property-read mixed $icon
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails query()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereFacebook($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereGstNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereLinkedin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereOffice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails wherePostalCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereShippingAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereSkype($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereSubCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereTwitter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereWebsite($value)
 * @mixin \Eloquent
 */
class ClientDetails extends BaseModel
{
    use CustomFieldsTrait;

    protected $fillable = ['company_name', 'user_id', 'address', 'postal_code','state','city','office','cell','website', 'note', 'skype', 'facebook', 'twitter', 'linkedin', 'gst_number', 'shipping_address', 'category_id', 'sub_category_id'];

    protected $default = ['id', 'company_name', 'address', 'website', 'note', 'skype', 'facebook', 'twitter', 'linkedin', 'gst_number', 'name', 'email'];

    protected $table = 'client_details';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->withoutGlobalScopes(['active']);
    }

    public function addedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'added_by', 'id');
    }

}
