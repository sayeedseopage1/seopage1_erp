<?php

namespace App\Models;

use App\Observers\InvoiceSettingObserver;

/**
 * App\Models\InvoiceSetting
 *
 * @property int $id
 * @property string $invoice_prefix
 * @property int $invoice_digit
 * @property string $estimate_prefix
 * @property int $estimate_digit
 * @property string $credit_note_prefix
 * @property int $credit_note_digit
 * @property string $template
 * @property int $due_after
 * @property string $invoice_terms
 * @property string|null $gst_number
 * @property string|null $show_gst
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $logo
 * @property int $send_reminder
 * @property string|null $locale
 * @property int $hsn_sac_code_show
 * @property-read mixed $icon
 * @property-read mixed $logo_url
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereCreditNoteDigit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereCreditNotePrefix($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereDueAfter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereEstimateDigit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereEstimatePrefix($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereGstNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereHsnSacCodeShow($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereInvoiceDigit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereInvoicePrefix($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereInvoiceTerms($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereLocale($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereSendReminder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereShowGst($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereTemplate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property string|null $estimate_terms
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereEstimateTerms($value)
 * @property int $tax_calculation_msg
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereTaxCalculationMsg($value)
 */
class InvoiceSetting extends BaseModel
{

    protected $appends = ['logo_url'];

    public function getLogoUrlAttribute()
    {
        return (is_null($this->logo)) ? global_setting()->logo_url : asset_url('app-logo/' . $this->logo);
    }

}
