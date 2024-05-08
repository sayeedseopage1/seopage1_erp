<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('factors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('criteria_id');
            $table->string('title');
            $table->unsignedTinyInteger('project_type')->comment('1 = Fixed, 2 = Hourly');
            $table->decimal('lower_limit')->nullable();
            $table->decimal('upper_limit')->nullable();
            $table->unsignedTinyInteger('limit_type')->nullable()->comment('1 = Range, 2 = Boolean');
            $table->unsignedTinyInteger('limit_unit')->nullable()->comment('1 = Hour, 2 = Day, 3 = Item, 4 = Others');
            $table->string('lower_limit_condition')->nullable()->comment('>,<,=,=>,=<,!=');
            $table->string('upper_limit_condition')->nullable()->comment('>,<,==,=>,=<,!=');
            $table->string('limit_depend_on_models_and_fields')->nullable()->comment('The limit depend on this model and fields');
            $table->unsignedTinyInteger('point_type')->nullable()->comment('1 = Static, 2 = Percentage');
            $table->decimal('points');
            $table->string('point_depend_on_model')->nullable()->comment('The point depend on this model');
            $table->string('point_depend_on_field')->nullable()->comment('The point depend on this field of defined model');
            $table->unsignedTinyInteger('status')->default(1)->comment('1 = Active, 0 = Deactive');
            $table->timestamps();
        });

        \Illuminate\Support\Facades\DB::table('factors')->insert([
            [
                'criteria_id' => 1,
                'title' => 'Deliverables are signed by the client within 48 hours after the entry of the project in the system',
                'project_type' => 1,
                'lower_limit' => 0,
                'upper_limit' => 48,
                'limit_type' => 1,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => json_encode([['model' => 'App\Models\Deal', 'field' => 'released_at'], ['model' => 'App\Models\ContractSign', 'field' => 'created_at']]),
                'point_type' => 1,
                'points' => 5,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 2,
                'title' => 'Estimated hours matching the logged hours by 81%-120%',
                'project_type' => 1,
                'lower_limit' => 80,
                'upper_limit' => 120,
                'limit_type' => 1,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => json_encode([['model' => 'App\Models\Task', 'field' => 'estimate_hours'], ['model' => 'App\Models\ProjectTimeLog', 'field' => 'total_hours']]),
                'point_type' => 1,
                'points' => 5,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 2,
                'title' => 'Estimated hours matching the logged hours by 71%-80% or 121%-130%',
                'project_type' => 1,
                'lower_limit' => 70,
                'upper_limit' => 130,
                'limit_type' => 1,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => json_encode([['model' => 'App\Models\Task', 'field' => 'estimate_hours'], ['model' => 'App\Models\ProjectTimeLog', 'field' => 'total_hours']]),
                'point_type' => 1,
                'points' => 4,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 2,
                'title' => 'Estimated hours matching the logged hours by 61%-70% or 131%-140%',
                'project_type' => 1,
                'lower_limit' => 60,
                'upper_limit' => 140,
                'limit_type' => 1,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => json_encode([['model' => 'App\Models\Task', 'field' => 'estimate_hours'], ['model' => 'App\Models\ProjectTimeLog', 'field' => 'total_hours']]),
                'point_type' => 1,
                'points' => 3,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 2,
                'title' => 'Estimated hours matching the logged hours by 56%-60% or 141%-145%',
                'project_type' => 1,
                'lower_limit' => 55,
                'upper_limit' => 145,
                'limit_type' => 1,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => json_encode([['model' => 'App\Models\Task', 'field' => 'estimate_hours'], ['model' => 'App\Models\ProjectTimeLog', 'field' => 'total_hours']]),
                'point_type' => 1,
                'points' => 2,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 2,
                'title' => 'Estimated hours matching the logged hours by 51%-55% or 146%-150%',
                'project_type' => 1,
                'lower_limit' => 50,
                'upper_limit' => 150,
                'limit_type' => 1,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => json_encode([['model' => 'App\Models\Task', 'field' => 'estimate_hours'], ['model' => 'App\Models\ProjectTimeLog', 'field' => 'total_hours']]),
                'point_type' => 1,
                'points' => 1,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 2,
                'title' => 'Estimated hours matching the logged hours by >50% or <150%',
                'project_type' => 1,
                'lower_limit' => 50,
                'upper_limit' => 150,
                'limit_type' => 1,
                'limit_unit' => 1,
                'lower_limit_condition' => '>',
                'upper_limit_condition' => '<=',
                'limit_depend_on_models_and_fields' => json_encode([['model' => 'App\Models\Task', 'field' => 'estimate_hours'], ['model' => 'App\Models\ProjectTimeLog', 'field' => 'total_hours']]),
                'point_type' => 1,
                'points' => -5,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 3,
                'title' => 'Less than 5% time of estimated time or 1 hour whichever is higher in revision)',
                'project_type' => 1,
                'lower_limit' => 0,
                'upper_limit' => 5,
                'limit_type' => 1,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 2,
                'points' => 5,
                'point_depend_on_model' => 'App\Models\Project',
                'point_depend_on_field' => 'project_budget'
            ],
            [
                'criteria_id' => 3,
                'title' => '6-10% time of the estimated time in revisions',
                'project_type' => 1,
                'lower_limit' => 5,
                'upper_limit' => 10,
                'limit_type' => 1,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 2,
                'points' => 4,
                'point_depend_on_model' => 'App\Models\Project',
                'point_depend_on_field' => 'project_budget'
            ],
            [
                'criteria_id' => 3,
                'title' => '11-20% time of the estimated time in revision',
                'project_type' => 1,
                'lower_limit' => 10,
                'upper_limit' => 20,
                'limit_type' => 1,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 2,
                'points' => 3,
                'point_depend_on_model' => 'App\Models\Project',
                'point_depend_on_field' => 'project_budget'
            ],
            [
                'criteria_id' => 3,
                'title' => '21-30% time of the estimated time in revision',
                'project_type' => 1,
                'lower_limit' => 20,
                'upper_limit' => 30,
                'limit_type' => 1,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 2,
                'points' => 2.5,
                'point_depend_on_model' => 'App\Models\Project',
                'point_depend_on_field' => 'project_budget'
            ],
            [
                'criteria_id' => 3,
                'title' => '31-40% time of the estimated time in revision',
                'project_type' => 1,
                'lower_limit' => 30,
                'upper_limit' => 40,
                'limit_type' => 1,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 2,
                'points' => 2,
                'point_depend_on_model' => 'App\Models\Project',
                'point_depend_on_field' => 'project_budget'
            ],
            [
                'criteria_id' => 3,
                'title' => '41-100% time of the estimated time in revision',
                'project_type' => 1,
                'lower_limit' => 40,
                'upper_limit' => 80,
                'limit_type' => 1,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 2,
                'points' => 0,
                'point_depend_on_model' => 'App\Models\Project',
                'point_depend_on_field' => 'project_budget'
            ],
            [
                'criteria_id' => 3,
                'title' => '<80% time of the estimated time in revision',
                'project_type' => 1,
                'lower_limit' => 80,
                'upper_limit' => 80,
                'limit_type' => 1,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '<=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 2,
                'points' => -5,
                'point_depend_on_model' => 'App\Models\Project',
                'point_depend_on_field' => 'project_budget'
            ],
            [
                'criteria_id' => 4,
                'title' => 'For marking every milestone as paid',
                'project_type' => 1,
                'lower_limit' => 1,
                'upper_limit' => 1,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '==',
                'upper_limit_condition' => '==',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => 1,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 5,
                'title' => 'For completing a project full (With project completion form)',
                'project_type' => 1,
                'lower_limit' => 1,
                'upper_limit' => 1,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '==',
                'upper_limit_condition' => '==',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 2,
                'points' => 1,
                'point_depend_on_model' => 'App\Models\Project',
                'point_depend_on_field' => 'project_budget'
            ],
            [
                'criteria_id' => 6,
                'title' => 'If all the tasks are created in the first 3 days',
                'project_type' => 1,
                'lower_limit' => 0,
                'upper_limit' => 3,
                'limit_type' => 1,
                'limit_unit' => 2,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 2,
                'points' => 1,
                'point_depend_on_model' => 'App\Models\Project',
                'point_depend_on_field' => 'project_budget'
            ],
            [
                'criteria_id' => 7,
                'title' => 'If the project deadline is met',
                'project_type' => 1,
                'lower_limit' => 1,
                'upper_limit' => 1,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '==',
                'upper_limit_condition' => '==',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 2,
                'points' => 1,
                'point_depend_on_model' => 'App\Models\Project',
                'point_depend_on_field' => 'project_budget'
            ],
            [
                'criteria_id' => 8,
                'title' => "If a PM doesn't submit a task to the client / give revision within 36 hours after it was submitted by the lead developer",
                'project_type' => 1,
                'lower_limit' => 36,
                'upper_limit' => 36,
                'limit_type' => 1,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '<',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -3,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 9,
                'title' => "If a project manager can complete 5 project in 7 days",
                'project_type' => 1,
                'lower_limit' => 5,
                'upper_limit' => 8,
                'limit_type' => 1,
                'limit_unit' => 3,
                'lower_limit_condition' => '<=',
                'upper_limit_condition' => '>',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => 15,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 9,
                'title' => "If a project manager can complete 8 project in 7 days",
                'project_type' => 1,
                'lower_limit' => 8,
                'upper_limit' => 10,
                'limit_type' => 1,
                'limit_unit' => 3,
                'lower_limit_condition' => '<=',
                'upper_limit_condition' => '>',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => 30,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 9,
                'title' => "If a project manager can complete 10 project in 7 days",
                'project_type' => 1,
                'lower_limit' => 10,
                'upper_limit' => 10,
                'limit_type' => 1,
                'limit_unit' => 3,
                'lower_limit_condition' => '<=',
                'upper_limit_condition' => '<=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => 50,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 10,
                'title' => "If a project manager can complete 5 project in 12 days",
                'project_type' => 1,
                'lower_limit' => 5,
                'upper_limit' => 8,
                'limit_type' => 1,
                'limit_unit' => 3,
                'lower_limit_condition' => '<=',
                'upper_limit_condition' => '>',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => 5,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 10,
                'title' => "If a project manager can complete 8 project in 12 days",
                'project_type' => 1,
                'lower_limit' => 8,
                'upper_limit' => 10,
                'limit_type' => 1,
                'limit_unit' => 3,
                'lower_limit_condition' => '<=',
                'upper_limit_condition' => '>',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => 10,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 10,
                'title' => "If a project manager can complete 10 project in 12 days",
                'project_type' => 1,
                'lower_limit' => 10,
                'upper_limit' => 10,
                'limit_type' => 1,
                'limit_unit' => 3,
                'lower_limit_condition' => '<=',
                'upper_limit_condition' => '<=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => 20,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 11,
                'title' => "$1-400",
                'project_type' => 1,
                'lower_limit' => 0,
                'upper_limit' => 400,
                'limit_type' => 1,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => 3,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 11,
                'title' => "$401-700",
                'project_type' => 1,
                'lower_limit' => 400,
                'upper_limit' => 700,
                'limit_type' => 1,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => 4,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 11,
                'title' => "$701-1200",
                'project_type' => 1,
                'lower_limit' => 700,
                'upper_limit' => 1200,
                'limit_type' => 1,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => 5,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 11,
                'title' => "$1201+",
                'project_type' => 1,
                'lower_limit' => 1200,
                'upper_limit' => 1200,
                'limit_type' => 1,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '<',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => 7,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 12,
                'title' => "Task hold time is more than 1 day during the assign phase",
                'project_type' => 1,
                'lower_limit' => 1,
                'upper_limit' => 1,
                'limit_type' => 1,
                'limit_unit' => 2,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '<',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -1,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 13,
                'title' => "Task hold time is more than 1 day during the submission phase of new tasks",
                'project_type' => 1,
                'lower_limit' => 1,
                'upper_limit' => 1,
                'limit_type' => 1,
                'limit_unit' => 2,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '<',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -2,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 14,
                'title' => "Task hold time is more than 4 hours during the submission phase of revisions",
                'project_type' => 1,
                'lower_limit' => 4,
                'upper_limit' => 4,
                'limit_type' => 1,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '<',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -2,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 15,
                'title' => "For missing every goal in a regular project",
                'project_type' => 1,
                'lower_limit' => 0,
                'upper_limit' => 1,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -1,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 15,
                'title' => "For missing every goal in a priority project",
                'project_type' => 1,
                'lower_limit' => 1,
                'upper_limit' => 2,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -2,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 15,
                'title' => "For missing every goal in a high-priority project",
                'project_type' => 1,
                'lower_limit' => 2,
                'upper_limit' => 3,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -3,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 15,
                'title' => "For missing every goal in a top most priority project",
                'project_type' => 1,
                'lower_limit' => 3,
                'upper_limit' => 4,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -4,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 15,
                'title' => "For missing every goal in a critically sensitive project",
                'project_type' => 1,
                'lower_limit' => 4,
                'upper_limit' => 5,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -5,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 16,
                'title' => "Regular",
                'project_type' => 1,
                'lower_limit' => 0,
                'upper_limit' => 1,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -0.5,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 16,
                'title' => "Priority",
                'project_type' => 1,
                'lower_limit' => 1,
                'upper_limit' => 2,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -1,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 16,
                'title' => "High priority",
                'project_type' => 1,
                'lower_limit' => 2,
                'upper_limit' => 3,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -1.5,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 16,
                'title' => "Most priority",
                'project_type' => 1,
                'lower_limit' => 3,
                'upper_limit' => 4,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -2,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 16,
                'title' => "Top most priority",
                'project_type' => 1,
                'lower_limit' => 4,
                'upper_limit' => 5,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -2.5,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 17,
                'title' => "If they cross 100 billable hours per week",
                'project_type' => 2,
                'lower_limit' => 100,
                'upper_limit' => 180,
                'limit_type' => 1,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => 20,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 17,
                'title' => "If they cross 180 billable hours per week",
                'project_type' => 2,
                'lower_limit' => 180,
                'upper_limit' => 180,
                'limit_type' => 1,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '<',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => 30,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 18,
                'title' => "For the billed amounts in hourly projects (Every week) will get 3% of the billed amount",
                'project_type' => 2,
                'lower_limit' => 1,
                'upper_limit' => 1,
                'limit_type' => 2,
                'limit_unit' => 1,
                'lower_limit_condition' => '==',
                'upper_limit_condition' => '==',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 2,
                'points' => 3,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 15,
                'title' => "Missing every goal in a regular project",
                'project_type' => 2,
                'lower_limit' => 0,
                'upper_limit' => 1,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -1,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 15,
                'title' => "Missing every goal in a priority project",
                'project_type' => 2,
                'lower_limit' => 1,
                'upper_limit' => 2,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -2,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 15,
                'title' => "Missing every goal in a high-priority project",
                'project_type' => 2,
                'lower_limit' => 2,
                'upper_limit' => 3,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -3,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 15,
                'title' => "Missing every goal in a top most priority project",
                'project_type' => 2,
                'lower_limit' => 3,
                'upper_limit' => 4,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -4,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 15,
                'title' => "Missing every goal in a critically sensitive project",
                'project_type' => 2,
                'lower_limit' => 4,
                'upper_limit' => 5,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -5,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 19,
                'title' => "If the first submission is made within 100 hours of the award time",
                'project_type' => 2,
                'lower_limit' => 0,
                'upper_limit' => 100,
                'limit_type' => 1,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => 5,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 16,
                'title' => "Revision due to PM's fault on regular project",
                'project_type' => 2,
                'lower_limit' => 0,
                'upper_limit' => 1,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -0.5,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 16,
                'title' => "Revision due to PM's fault on priority project",
                'project_type' => 2,
                'lower_limit' => 1,
                'upper_limit' => 2,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -1,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 16,
                'title' => "Revision due to PM's fault on high-priority project",
                'project_type' => 2,
                'lower_limit' => 2,
                'upper_limit' => 3,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -1.5,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 16,
                'title' => "Revision due to PM's fault on top most priority project",
                'project_type' => 2,
                'lower_limit' => 3,
                'upper_limit' => 4,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -2,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
            [
                'criteria_id' => 16,
                'title' => "Revision due to PM's fault on critically sensitive project",
                'project_type' => 2,
                'lower_limit' => 4,
                'upper_limit' => 5,
                'limit_type' => 2,
                'limit_unit' => 4,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '>=',
                'limit_depend_on_models_and_fields' => null,
                'point_type' => 1,
                'points' => -2.5,
                'point_depend_on_model' => null,
                'point_depend_on_field' => null
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('factors');
    }
};
