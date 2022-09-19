<?php
namespace Database\Seeders;

use App\Models\CompanyAddress;
use App\Models\User;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\TaskboardColumn;
use App\Models\TaskUser;
use Illuminate\Support\Facades\DB;

class ProjectSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $_ENV['SEEDING'] = true;
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('projects')->delete();
        DB::table('project_activity')->delete();
        DB::table('project_members')->delete();

        DB::table('tasks')->delete();
        DB::table('invoices')->delete();
        DB::table('invoice_items')->delete();
        DB::table('payments')->delete();
        DB::table('project_time_logs')->delete();
        DB::table('credit_notes')->delete();
        DB::table('credit_note_items')->delete();

        DB::statement('ALTER TABLE projects AUTO_INCREMENT = 1');
        DB::statement('ALTER TABLE project_activity AUTO_INCREMENT = 1');
        DB::statement('ALTER TABLE project_members AUTO_INCREMENT = 1');
        DB::statement('ALTER TABLE tasks AUTO_INCREMENT = 1');
        DB::statement('ALTER TABLE invoices AUTO_INCREMENT = 1');
        DB::statement('ALTER TABLE invoice_items AUTO_INCREMENT = 1');
        DB::statement('ALTER TABLE payments AUTO_INCREMENT = 1');
        DB::statement('ALTER TABLE project_time_logs AUTO_INCREMENT = 1');
        DB::statement('ALTER TABLE credit_notes AUTO_INCREMENT = 1');
        DB::statement('ALTER TABLE credit_note_items AUTO_INCREMENT = 1');
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        $count = env('SEED_PROJECT_RECORD_COUNT', 20);

        $faker = \Faker\Factory::create();

        DB::beginTransaction();

        \App\Models\Project::factory()->count((int)$count)->create()->each(function ($project) use ($faker) {
            $activity = new \App\Models\ProjectActivity();
            $activity->project_id = $project->id; /* @phpstan-ignore-line */
            $activity->activity = mb_ucwords($project->project_name) . ' added as new project.'; /* @phpstan-ignore-line */
            $activity->save();

            $search = new \App\Models\UniversalSearch();
            $search->searchable_id = $project->id; /* @phpstan-ignore-line */
            $search->title = $project->project_name; /* @phpstan-ignore-line */
            $search->route_name = 'projects.show';
            $search->save();

            $randomRange = $faker->numberBetween(1, 5);

            // Assign random members
            for ($i = 1; $i <= $randomRange; $i++) {
                $this->assignMembers($project->id); /* @phpstan-ignore-line */
            }

            // Create tasks
            for ($i = 1; $i <= $randomRange; $i++) {
                $this->createTask($faker, $project);
            }

            // Create invoice

            for ($i = 1; $i <= 5; $i++) {
                $this->createInvoice($faker, $project);
            }

            // Create project time log
            for ($i = 1; $i <= 10; $i++) {
                $this->createTimeLog($faker, $project);
            }
        });

        DB::commit();
        $_ENV['SEEDING'] = false;
    }

    private function assignMembers($projectId)
    {
        $admin = User::join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->where('roles.name', 'admin')
            ->select('users.id')
            ->first();
        $employeeId = $this->getRandomEmployee();

        // Assign member
        $member = new \App\Models\ProjectMember();
        $member->user_id = $employeeId->id;
        $member->project_id = $projectId;
        $member->added_by = $admin->id;
        $member->last_updated_by = $admin->id;
        $member->hourly_rate = $employeeId->hourly_rate;
        $member->save();

        $activity = new \App\Models\ProjectActivity();
        $activity->project_id = $projectId;
        $activity->activity = 'New member added to the project.';
        $activity->save();
    }

    private function getRandomEmployee()
    {
        return User::select('users.id as id', 'employee_details.hourly_rate')
            ->join('employee_details', 'users.id', '=', 'employee_details.user_id')
            ->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->where('roles.name', 'employee')
            ->inRandomOrder()
            ->first();
    }

    private function createTask($faker, $project)
    {
        $assignee = \App\Models\ProjectMember::inRandomOrder()->where('project_id', $project->id)
            ->first();

        $boards = TaskboardColumn::all()->pluck('id')->toArray();

        $startDate = $faker->randomElement([$faker->dateTimeThisMonth($max = 'now'), $faker->dateTimeThisYear($max = 'now')]);

        $task = new \App\Models\Task();
        $task->heading = $faker->realText(20);
        $task->description = $faker->realText(200);
        $task->start_date = $startDate;
        $task->due_date = Carbon::parse($startDate)->addDays(rand(1, 10))->toDateString();
        $task->project_id = $project->id;
        $task->priority = $faker->randomElement(['high', 'medium', 'low']);
        $task->status = $faker->randomElement(['incomplete', 'completed']);
        $task->board_column_id = $faker->randomElement($boards);
        $task->save();

        $task->task_short_code = $project->project_short_code . '-' . $task->id;
        $task->saveQuietly();

        TaskUser::create(
            [
                'user_id' => $assignee->user_id,
                'task_id' => $task->id
            ]
        );

        $search = new \App\Models\UniversalSearch();
        $search->searchable_id = $task->id;
        $search->title = $task->heading;
        $search->route_name = 'tasks.show';
        $search->save();

        $activity = new \App\Models\ProjectActivity();
        $activity->project_id = $project->id;
        $activity->activity = 'New task added to the project.';
        $activity->save();
    }

    private function createInvoice($faker, $project)
    {
        $items = [$faker->word, $faker->word];
        $cost_per_item = [$faker->numberBetween(1000, 2000), $faker->numberBetween(1000, 2000)];
        $quantity = [$faker->numberBetween(1, 20), $faker->numberBetween(1, 20)];
        $amount = [$cost_per_item[0] * $quantity[0], $cost_per_item[1] * $quantity[1]];
        $type = ['item', 'item'];

        $invoice = new \App\Models\Invoice();
        $invoice->project_id = $project->id;
        $invoice->client_id = $project->client_id;
        $invoice->invoice_number = \App\Models\Invoice::count() == 0 ? 1 : \App\Models\Invoice::count() + 1;
        $invoice->issue_date = Carbon::parse((date('m') - 1) . '/' . $faker->numberBetween(1, 30) . '/' . date('Y'))->format('Y-m-d');
        $invoice->due_date = Carbon::parse($invoice->issue_date)->addDays(10)->format('Y-m-d');
        $invoice->sub_total = array_sum($amount);
        $invoice->total = array_sum($amount);
        $invoice->currency_id = 1;
        $invoice->status = $faker->randomElement(['paid', 'unpaid']);
        $invoice->send_status = 1;
        $invoice->due_amount = array_sum($amount);
        $invoice->hash = \Illuminate\Support\Str::random(32);
        $invoice->save();

        $search = new \App\Models\UniversalSearch();
        $search->searchable_id = $invoice->id;
        $search->title = 'Invoice ' . $invoice->invoice_number;
        $search->route_name = 'invoices.show';
        $search->save();

        foreach ($items as $key => $item) :
            \App\Models\InvoiceItems::create(['invoice_id' => $invoice->id, 'item_name' => $item, 'type' => $type[$key], 'quantity' => $quantity[$key], 'unit_price' => $cost_per_item[$key], 'amount' => $amount[$key]]);
        endforeach;

        if ($invoice->status == 'paid') {
            $payment = new \App\Models\Payment();
            $payment->amount = $invoice->total;
            $payment->invoice_id = $invoice->id;
            $payment->project_id = $project->id;

            $payment->gateway = 'Bank Transfer';
            $payment->transaction_id = $faker->unique()->numberBetween(100000, 123212);
            $payment->currency_id = 1;
            $payment->status = 'complete';
            $payment->paid_on = Carbon::parse(now()->month . '/' . $faker->numberBetween(1, now()->day) . '/' . now()->year . ' ' . $faker->numberBetween(1, 23) . ':' . $faker->numberBetween(1, 59) . ':' . $faker->numberBetween(1, 59))->format('Y-m-d H:i:s');
            $payment->save();
        }
    }

    private function createTimeLog($faker, $project)
    {
        $projectMember = $project->members->first();
        // Create time logs
        $timeLog = new \App\Models\ProjectTimeLog();
        $timeLog->project_id = $project->id;
        $timeLog->task_id = $project->tasks->first()->id;
        $timeLog->user_id = $projectMember->user_id;
        $timeLog->start_time = $faker->randomElement([date('Y-m-d', strtotime('+' . mt_rand(0, 7) . ' days')), $faker->dateTimeThisMonth($max = 'now'), $faker->dateTimeThisYear($max = 'now')]);
        $timeLog->end_time = Carbon::parse($timeLog->start_time)->addHours($faker->numberBetween(1, 5))->toDateTimeString();
        $timeLog->total_hours = $timeLog->end_time->diff($timeLog->start_time)->format('%d') * 24 + $timeLog->end_time->diff($timeLog->start_time)->format('%H'); /* @phpstan-ignore-line */

        if ($timeLog->total_hours == 0) {
            $timeLog->total_hours = round(($timeLog->end_time->diff($timeLog->start_time)->format('%i') / 60), 2); /* @phpstan-ignore-line */
        }

        $timeLog->total_minutes = $timeLog->total_hours * 60;
        $timeLog->hourly_rate = (!is_null($projectMember->hourly_rate) ? $projectMember->hourly_rate : 0);

        $minuteRate = $projectMember->hourly_rate / 60;
        $earning = round($timeLog->total_minutes * $minuteRate); /* @phpstan-ignore-line */
        $timeLog->earnings = $earning;

        $timeLog->memo = 'working on' . $faker->word;
        $timeLog->save();
    }

}
