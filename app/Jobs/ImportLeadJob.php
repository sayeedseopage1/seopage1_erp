<?php

namespace App\Jobs;

use App\Models\Lead;
use App\Models\LeadStatus;
use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use App\Models\UniversalSearch;
use Illuminate\Support\Facades\DB;
use App\Traits\UniversalSearchTrait;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class ImportLeadJob implements ShouldQueue
{
    use Batchable, Dispatchable, InteractsWithQueue, Queueable, SerializesModels, UniversalSearchTrait;

    private $row;
    private $columns;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($row, $columns)
    {
        $this->row = $row;
        $this->columns = $columns;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if (!empty(array_keys($this->columns, 'name')) && !empty(array_keys($this->columns, 'email')) && filter_var($this->row[array_keys($this->columns, 'email')[0]], FILTER_VALIDATE_EMAIL)) {
            DB::beginTransaction();
            try {

                $lead = new Lead();
                $lead->client_name = $this->row[array_keys($this->columns, 'name')[0]];
                $lead->client_email = $this->row[array_keys($this->columns, 'email')[0]];
                $lead->value = !empty(array_keys($this->columns, 'value')) ? $this->row[array_keys($this->columns, 'value')[0]] : null;
                $lead->note = !empty(array_keys($this->columns, 'note')) ? $this->row[array_keys($this->columns, 'note')[0]] : null;
                $lead->company_name = !empty(array_keys($this->columns, 'company_name')) ? $this->row[array_keys($this->columns, 'company_name')[0]] : null;
                $lead->website = !empty(array_keys($this->columns, 'company_website')) ? $this->row[array_keys($this->columns, 'company_website')[0]] : null;
                $lead->mobile = !empty(array_keys($this->columns, 'mobile')) ? $this->row[array_keys($this->columns, 'mobile')[0]] : null;
                $lead->office = !empty(array_keys($this->columns, 'company_phone')) ? $this->row[array_keys($this->columns, 'company_phone')[0]] : null;
                $lead->country = !empty(array_keys($this->columns, 'country')) ? $this->row[array_keys($this->columns, 'country')[0]] : null;
                $lead->state = !empty(array_keys($this->columns, 'state')) ? $this->row[array_keys($this->columns, 'state')[0]] : null;
                $lead->city = !empty(array_keys($this->columns, 'city')) ? $this->row[array_keys($this->columns, 'city')[0]] : null;
                $lead->postal_code = !empty(array_keys($this->columns, 'postal_code')) ? $this->row[array_keys($this->columns, 'postal_code')[0]] : null;
                $lead->address = !empty(array_keys($this->columns, 'address')) ? $this->row[array_keys($this->columns, 'address')[0]] : null;
                $lead->currency_id = global_setting()->currency->id;
                $lead->status_id = LeadStatus::where('default', 1)->first()->id ?? null;
                $lead->save();

                // Log search
                $this->logSearchEntry($lead->id, $lead->client_name, 'leads.show', 'lead');

                if (!is_null($lead->client_email)) {
                    $this->logSearchEntry($lead->id, $lead->client_email, 'leads.show', 'lead');
                }

                if (!is_null($lead->company_name)) {
                    $this->logSearchEntry($lead->id, $lead->company_name, 'leads.show', 'lead');
                }

                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                $this->fail($e->getMessage());
            }
        } else {
            $this->fail(__('messages.invalidData') . json_encode($this->row, true));
        }
    }

}

