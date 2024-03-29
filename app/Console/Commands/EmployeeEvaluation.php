<?php

namespace App\Console\Commands;

use App\Models\Task;
use Illuminate\Console\Command;

class EmployeeEvaluation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'employee_evaluation_check:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Employee Evaluation Check';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $task = Task::where();
        $this->info('Employee Evaluation Check Successfully');
    }
}
