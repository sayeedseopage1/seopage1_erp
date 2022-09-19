<?php

namespace App\Jobs;

use App\Models\Role;
use App\Models\User;
use App\Models\ClientDetails;
use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use App\Models\UniversalSearch;
use Illuminate\Support\Facades\DB;
use App\Traits\UniversalSearchTrait;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class ImportClientJob implements ShouldQueue
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

            $user = User::where('email', $this->row[array_keys($this->columns, 'email')[0]])->first();

            if ($user) {
                $this->fail(__('messages.duplicateEntryForEmail') . $this->row[array_keys($this->columns, 'email')[0]]);
            }
            else {
                DB::beginTransaction();
                try {
                    $user = new User();
                    $user->name = $this->row[array_keys($this->columns, 'name')[0]];
                    $user->email = $this->row[array_keys($this->columns, 'email')[0]];
                    $user->password = bcrypt(123456);
                    $user->mobile = !empty(array_keys($this->columns, 'mobile')) ? $this->row[array_keys($this->columns, 'mobile')[0]] : null;
                    $user->gender = !empty(array_keys($this->columns, 'gender')) ? strtolower($this->row[array_keys($this->columns, 'gender')[0]]) : null;
                    $user->save();

                    if ($user->id) {
                        $clientDetails = new ClientDetails();
                        $clientDetails->user_id = $user->id;
                        $clientDetails->company_name = !empty(array_keys($this->columns, 'company_name')) ? $this->row[array_keys($this->columns, 'company_name')[0]] : null;
                        $clientDetails->address = !empty(array_keys($this->columns, 'address')) ? $this->row[array_keys($this->columns, 'address')[0]] : null;
                        $clientDetails->city = !empty(array_keys($this->columns, 'city')) ? $this->row[array_keys($this->columns, 'city')[0]] : null;
                        $clientDetails->state = !empty(array_keys($this->columns, 'state')) ? $this->row[array_keys($this->columns, 'state')[0]] : null;
                        $clientDetails->postal_code = !empty(array_keys($this->columns, 'postal_code')) ? $this->row[array_keys($this->columns, 'postal_code')[0]] : null;
                        $clientDetails->office = !empty(array_keys($this->columns, 'company_phone')) ? $this->row[array_keys($this->columns, 'company_phone')[0]] : null;
                        $clientDetails->website = !empty(array_keys($this->columns, 'company_website')) ? $this->row[array_keys($this->columns, 'company_website')[0]] : null;
                        $clientDetails->gst_number = !empty(array_keys($this->columns, 'gst_number')) ? $this->row[array_keys($this->columns, 'gst_number')[0]] : null;
                        $clientDetails->save();
                    }


                    $user->attachRole(3);

                    $user->assignUserRolePermission(3);

                    // Log search
                    $this->logSearchEntry($user->id, $user->name, 'clients.show', 'client');

                    if (!is_null($user->email)) {
                        $this->logSearchEntry($user->id, $user->email, 'clients.show', 'client');
                    }

                    if (!is_null($user->clientDetails->company_name)) {
                        $this->logSearchEntry($user->id, $user->clientDetails->company_name, 'clients.show', 'client');
                    }

                    DB::commit();
                } catch (\Exception $e) {
                    DB::rollBack();
                    $this->fail($e->getMessage());
                }
            }
        } else {
            $this->fail(__('messages.invalidData') . json_encode($this->row, true));
        }
    }

}
