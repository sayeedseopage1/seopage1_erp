<?php

namespace App\Jobs;

use App\Models\Role;
use App\Models\User;
use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Carbon;
use App\Models\EmployeeDetails;
use App\Models\UniversalSearch;
use Illuminate\Support\Facades\DB;
use App\Traits\UniversalSearchTrait;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class ImportEmployeeJob implements ShouldQueue, ShouldBeUnique
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
                        $employee = new EmployeeDetails();
                        $employee->user_id = $user->id;
                        $employee->address = !empty(array_keys($this->columns, 'address')) ? $this->row[array_keys($this->columns, 'address')[0]] : null;
                        $employee->employee_id = !empty(array_keys($this->columns, 'employee_id')) ? $this->row[array_keys($this->columns, 'employee_id')[0]] : (EmployeeDetails::max('id') + 1);
                        $employee->joining_date = !empty(array_keys($this->columns, 'joining_date')) ? Carbon::createFromFormat('Y-m-d', $this->row[array_keys($this->columns, 'joining_date')[0]]) : null;
                        $employee->hourly_rate = !empty(array_keys($this->columns, 'hourly_rate')) ? preg_replace('/[^0-9.]/', '', $this->row[array_keys($this->columns, 'hourly_rate')[0]]) : null;
                        $employee->save();
                    }

                    $employeeRole = Role::where('name', 'employee')->first();
                    $user->attachRole($employeeRole);
                    $user->assignUserRolePermission($employeeRole->id);
                    $this->logSearchEntry($user->id, $user->name, 'employees.show', 'employee');
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
