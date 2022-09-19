<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\GdprSetting
 *
 * @property int $id
 * @property int $enable_gdpr
 * @property int $show_customer_area
 * @property int $show_customer_footer
 * @property string|null $top_information_block
 * @property int $enable_export
 * @property int $data_removal
 * @property int $lead_removal_public_form
 * @property int $terms_customer_footer
 * @property string|null $terms
 * @property string|null $policy
 * @property int $public_lead_edit
 * @property int $consent_customer
 * @property int $consent_leads
 * @property string|null $consent_block
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereConsentBlock($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereConsentCustomer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereConsentLeads($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereDataRemoval($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereEnableExport($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereEnableGdpr($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereLeadRemovalPublicForm($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting wherePolicy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting wherePublicLeadEdit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereShowCustomerArea($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereShowCustomerFooter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereTerms($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereTermsCustomerFooter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereTopInformationBlock($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class GdprSetting extends BaseModel
{
    protected $guarded = ['id'];
}
