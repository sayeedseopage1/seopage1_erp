<?php

namespace App\Observers;

use App\Events\NewProposalEvent;
use App\Helper\Files;
use App\Models\Notification;
use App\Models\Proposal;
use App\Models\ProposalItem;
use App\Models\ProposalItemImage;

class ProposalObserver
{

    public function saving(Proposal $proposal)
    {
        if (!isRunningInConsoleOrSeeding()) {
            if (user()) {
                $proposal->last_updated_by = user()->id;
            }
        }

        if (request()->has('calculate_tax')) {
            $proposal->calculate_tax = request()->calculate_tax;
        }
    }

    public function creating(Proposal $proposal)
    {
        $proposal->hash = \Illuminate\Support\Str::random(32);

        if (!isRunningInConsoleOrSeeding()) {
            if (user()) {
                $proposal->added_by = user()->id;
            }
        }
    }

    public function created(Proposal $proposal)
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
                        $proposalItem = ProposalItem::create(
                            [
                                'proposal_id' => $proposal->id,
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
                    if (isset($proposalItem) && (isset($invoice_item_image[$key]) || isset($invoice_item_image_url[$key]))) {

                        $filename = '';

                        if (isset($invoice_item_image[$key])) {
                            $filename = Files::uploadLocalOrS3($invoice_item_image[$key], ProposalItemImage::FILE_PATH . '/' . $proposalItem->id . '/');
                        }

                        ProposalItemImage::create(
                            [
                                'proposal_item_id' => $proposalItem->id,
                                'filename' => !isset($invoice_item_image_url[$key]) ? $invoice_item_image[$key]->getClientOriginalName() : '',
                                'hashname' => !isset($invoice_item_image_url[$key]) ? $filename : '',
                                'size' => !isset($invoice_item_image_url[$key]) ? $invoice_item_image[$key]->getSize() : '',
                                'external_link' => isset($invoice_item_image_url[$key]) ? $invoice_item_image_url[$key] : ''
                            ]
                        );
                    }

                endforeach;
            }

            if (request()->type == 'send') {
                $type = 'new';
                event(new NewProposalEvent($proposal, $type));
            }
        }
    }

    /**
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function updated(Proposal $proposal)
    {
        if (!isRunningInConsoleOrSeeding()) {

            if ($proposal->isDirty('status')) {
                $type = 'signed';
                event(new NewProposalEvent($proposal, $type));
            }

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
                    ProposalItem::whereNotIn('id', $item_ids)->where('proposal_id', $proposal->id)->delete();
                }

                // Step2&3 - Find old invoices items, update it and check if images are newer or older
                foreach ($items as $key => $item) {
                    $invoice_item_id = isset($item_ids[$key]) ? $item_ids[$key] : 0;

                    $proposalItem = ProposalItem::find($invoice_item_id);

                    if ($proposalItem === null) {
                        $proposalItem = new ProposalItem();
                    }

                    $proposalItem->proposal_id = $proposal->id;
                    $proposalItem->item_name = $item;
                    $proposalItem->item_summary = $itemsSummary[$key];
                    $proposalItem->type = 'item';
                    $proposalItem->hsn_sac_code = (isset($hsn_sac_code[$key]) && !is_null($hsn_sac_code[$key])) ? $hsn_sac_code[$key] : null;
                    $proposalItem->quantity = $quantity[$key];
                    $proposalItem->unit_price = round($cost_per_item[$key], 2);
                    $proposalItem->amount = round($amount[$key], 2);
                    $proposalItem->taxes = ($tax ? (array_key_exists($key, $tax) ? json_encode($tax[$key]) : null) : null);
                    $proposalItem->save();


                    /* Invoice file save here */
                    // phpcs:ignore
                    if ((isset($proposal_item_image[$key]) && $request->hasFile('invoice_item_image.' . $key)) || isset($proposal_item_image_url[$key])) {
                        /* Delete previous uploaded file if it not a product (because product images cannot be deleted) */
                        if (!isset($proposal_item_image_url[$key]) && $proposalItem && $proposalItem->proposalItemImage) {
                            Files::deleteFile($proposalItem->proposalItemImage->hashname, ProposalItemImage::FILE_PATH . '/' . $proposalItem->id . '/');
                        }

                        $filename = Files::uploadLocalOrS3($proposal_item_image[$key], ProposalItemImage::FILE_PATH . '/' . $proposalItem->id . '/');

                        ProposalItemImage::updateOrCreate(
                            [
                                'proposal_item_id' => $proposalItem->id,
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

    public function deleting(Proposal $proposal)
    {
        $notifyData = ['App\Notifications\NewProposal', 'App\Notifications\ProposalSigned'];

        Notification::whereIn('type', $notifyData)
            ->whereNull('read_at')
            ->where('data', 'like', '{"id":' . $proposal->id . ',%')
            ->delete();
    }

}
