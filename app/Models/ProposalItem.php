<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\ProposalItem
 *
 * @property int $id
 * @property int $proposal_id
 * @property string $item_name
 * @property string $type
 * @property float $quantity
 * @property float $unit_price
 * @property float $amount
 * @property string|null $item_summary
 * @property string|null $taxes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $hsn_sac_code
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereHsnSacCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereItemName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereItemSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereProposalId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereTaxes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \App\Models\ProposalItemImage|null $proposalItemImage
 * @property-read mixed $tax_list
 */
class ProposalItem extends BaseModel
{
    protected $guarded = ['id'];

    protected $with = ['proposalItemImage'];

    public function proposalItemImage(): HasOne
    {
        return $this->hasOne(ProposalItemImage::class, 'proposal_item_id');
    }

    public static function taxbyid($id)
    {
        return Tax::where('id', $id)->withTrashed();
    }

    public function getTaxListAttribute()
    {
        $proposalItem = ProposalItem::find($this->id);
        $taxes = '';

        if($proposalItem && $proposalItem->taxes){
            $numItems = count(json_decode($proposalItem->taxes));

            if(!is_null($proposalItem->taxes))
            {
                foreach (json_decode($proposalItem->taxes) as $index => $tax) {
                    $tax = $this->taxbyid($tax)->first();
                    $taxes .= $tax->tax_name . ': ' . $tax->rate_percent . '%';

                    $taxes = ($index + 1 != $numItems) ? $taxes . ', ' : $taxes;
                }
            }
        }

        return $taxes;
    }

}
