<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\EmployeeDetails;
use App\Models\EmployeeWorkLoad;
class DailyWorkLoad extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
  protected $signature = 'daily:work';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Daily Working Hour';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $employees= EmployeeDetails::all();
        foreach ($employees as $employee) {

            $data= new EmployeeWorkLoad();
            $data->user_id= $employee->user_id;
            $data->save();




        }

        $this->info('Daily Working Hours Added');
    }
}
