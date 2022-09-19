<?php

namespace App\Observers;

use App\Helper\Files;
use App\Models\ProposalTemplateItemImage;
use App\Models\ProposalTemplate;
use App\Models\ProposalTemplateItem;

class ProposalTemplateObserver
{

    public function created(ProposalTemplate $proposal)
    {
        if (!isRunningInConsoleOrSeeding()) {

            if (!empty(request()->item_name)) {
                $itemsSummary = request()->item_summary;
                $cost_per_item = request()->cost_per_item;
                $hsn_sac_code = request()->hsn_sac_code;
                $quantity = request()->quantity;
                $amount = request()->amount;
                $tax = request()->taxes;
                $invoice_item_image = request()->invoice_item_image;
                $invoice_item_image_url = request()->invoice_item_image_url;

                foreach (request()->item_name as $key => $item) :
                    if (!is_null($item)) {
                        $proposalTemplateItem = ProposalTemplateItem::create(
                            [
                                'proposal_template_id' => $proposal->id,
                                'item_name' => $item,
                                'item_summary' => $itemsSummary[$key],
                                'type' => 'item',
                                'hsn_sac_code' => (isset($hsn_sac_code[$key]) && !is_null($hsn_sac_code[$key])) ? $hsn_sac_code[$key] : null,
                                'quantity' => $quantity[$key],
                                'unit_price' => round($cost_per_item[$key], 2),
                                'amount' => round($amount[$key], 2),
                                'taxes' => $tax ? array_key_exists($key, $tax) ? json_encode($tax[$key]) : null : null
                            ]
                        );
                    }

                    /* Invoice file save here */
                    if (isset($proposalTemplateItem) && (isset($invoice_item_image[$key]) || isset($invoice_item_image_url[$key]))) {
                        $filename = Files::uploadLocalOrS3($invoice_item_image[$key], ProposalTemplateItemImage::FILE_PATH . '/' . $proposalTemplateItem->id . '/');
                        ProposalTemplateItemImage::create(
                            [
                                'proposal_template_item_id' => $proposalTemplateItem->id,
                                'filename' => !isset($invoice_item_image_url[$key]) ? $invoice_item_image[$key]->getClientOriginalName() : '',
                                'hashname' => !isset($invoice_item_image_url[$key]) ? $filename : '',
                                'size' => !isset($invoice_item_image_url[$key]) ? $invoice_item_image[$key]->getSize() : '',
                                'external_link' => isset($invoice_item_image_url[$key]) ? $invoice_item_image_url[$key] : ''
                            ]
                        );
                    }

                endforeach;
            }

        }
    }

    /**
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function updated(ProposalTemplate $proposal)
    {
        if (!isRunningInConsoleOrSeeding()) {

            /*
                Step1 - Delete all invoice items which are not avaialable
                Step2 - Find old invoices items, update it and check if images are newer or older
                Step3 - Insert new invoices items with images
            */

            $request = request();

            $items = $request->item_name;
            $itemsSummary = $request->item_summary;
            $hsn_sac_code = $request->hsn_sac_code;
            $tax = $request->taxes;
            $quantity = $request->quantity;
            $cost_per_item = $request->cost_per_item;
            $amount = $request->amount;
            $proposal_item_image = $request->invoice_item_image;
            $proposal_item_image_url = $request->invoice_item_image_url;
            $item_ids = $request->item_ids;

            if (!empty($request->item_name) && is_array($request->item_name)) {
                // Step1 - Delete all invoice items which are not avaialable
                if (!empty($item_ids)) {
                    ProposalTemplateItem::whereNotIn('id', $item_ids)->where('proposal_template_id', $proposal->id)->delete();
                }

                // Step2&3 - Find old invoices items, update it and check if images are newer or older
                foreach ($items as $key => $item) {
                    $invoice_item_id = isset($item_ids[$key]) ? $item_ids[$key] : 0;

                    $proposalTemplateItem = ProposalTemplateItem::find($invoice_item_id);

                    if ($proposalTemplateItem === null) {
                        $proposalTemplateItem = new ProposalTemplateItem();
                    }

                    $proposalTemplateItem->proposal_template_id = $proposal->id;
                    $proposalTemplateItem->item_name = $item;
                    $proposalTemplateItem->item_summary = $itemsSummary[$key];
                    $proposalTemplateItem->type = 'item';
                    $proposalTemplateItem->hsn_sac_code = (isset($hsn_sac_code[$key]) && !is_null($hsn_sac_code[$key])) ? $hsn_sac_code[$key] : null;
                    $proposalTemplateItem->quantity = $quantity[$key];
                    $proposalTemplateItem->unit_price = round($cost_per_item[$key], 2);
                    $proposalTemplateItem->amount = round($amount[$key], 2);
                    $proposalTemplateItem->taxes = ($tax ? (array_key_exists($key, $tax) ? json_encode($tax[$key]) : null) : null);
                    $proposalTemplateItem->save();


                    /* Invoice file save here */
                    // phpcs:ignore
                    if ((isset($proposal_item_image[$key]) && $request->hasFile('invoice_item_image.' . $key)) || isset($proposal_item_image_url[$key])) {
                        /* Delete previous uploaded file if it not a product (because product images cannot be deleted) */
                        if (!isset($proposal_item_image_url[$key]) && $proposalTemplateItem && $proposalTemplateItem->proposalTemplateItemImage) {
                            Files::deleteFile($proposalTemplateItem->proposalTemplateItemImage->hashname, ProposalTemplateItemImage::FILE_PATH . '/' . $proposalTemplateItem->id . '/');
                        }

                        $filename = Files::uploadLocalOrS3($proposal_item_image[$key], ProposalTemplateItemImage::FILE_PATH . '/' . $proposalTemplateItem->id . '/');

                        ProposalTemplateItemImage::updateOrCreate(
                            [
                                'proposal_template_item_id' => $proposalTemplateItem->id,
                            ],
                            [
                                'filename' => !isset($proposal_item_image_url[$key]) ? $proposal_item_image[$key]->getClientOriginalName() : '',
                                'hashname' => !isset($proposal_item_image_url[$key]) ? $filename : '',
                                'size' => !isset($proposal_item_image_url[$key]) ? $proposal_item_image[$key]->getSize() : '',
                                'external_link' => $proposal_item_image_url[$key] ?? ''
                            ]
                        );
                    }
                }
            }
        }


    }

}
