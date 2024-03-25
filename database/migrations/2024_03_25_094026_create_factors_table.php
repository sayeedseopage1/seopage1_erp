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
            $table->foreignId('criteria_id')->constrained();
            $table->string('title');
            $table->unsignedTinyInteger('project_type')->comment('1 = Fixed, 2 = Hourly');
            $table->decimal('lower_limit')->nullable();
            $table->decimal('upper_limit')->nullable();
            $table->unsignedTinyInteger('limit_type')->nullable()->comment('1 = Static, 2 = Percentage');
            $table->unsignedTinyInteger('limit_unit')->nullable()->comment('1 = hour, 2 = day');
            $table->string('lower_limit_condition')->nullable()->comment('>,<,=,=>,=<,!=');
            $table->string('upper_limit_condition')->nullable()->comment('>,<,=,=>,=<,!=');
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
                'upper_limit_condition' => '=>',
                'limit_depend_on_models_and_fields' => json_encode([['model' => 'App\Models\Deal::class', 'field' => 'released_at'], ['model' => 'App\Models\ContractSign::class', 'field' => 'created_at']]),
                'point_type' => 1,
                'points' => 5
            ],
            [
                'criteria_id' => 2,
                'title' => 'Estimated hours matching the logged hours by 81%-120%',
                'project_type' => 1,
                'lower_limit' => 80,
                'upper_limit' => 120,
                'limit_type' => 2,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '=>',
                'limit_depend_on_models' => json_encode([['model' => 'App\Models\Task::class', 'field' => 'estimate_hours'], ['model' => 'App\Models\ProjectTimeLog::class', 'field' => 'total_hours']]),
                'point_type' => 1,
                'points' => 5
            ],
            [
                'criteria_id' => 2,
                'title' => 'Estimated hours matching the logged hours by 71%-80% or 121%-130%',
                'project_type' => 1,
                'lower_limit' => 70,
                'upper_limit' => 130,
                'limit_type' => 2,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '=>',
                'limit_depend_on_models' => json_encode([['model' => 'App\Models\Task::class', 'field' => 'estimate_hours'], ['model' => 'App\Models\ProjectTimeLog::class', 'field' => 'total_hours']]),
                'point_type' => 1,
                'points' => 4
            ],
            [
                'criteria_id' => 2,
                'title' => 'Estimated hours matching the logged hours by 61%-70% or 131%-140%',
                'project_type' => 1,
                'lower_limit' => 60,
                'upper_limit' => 140,
                'limit_type' => 2,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '=>',
                'limit_depend_on_models' => json_encode([['model' => 'App\Models\Task::class', 'field' => 'estimate_hours'], ['model' => 'App\Models\ProjectTimeLog::class', 'field' => 'total_hours']]),
                'point_type' => 1,
                'points' => 3
            ],
            [
                'criteria_id' => 2,
                'title' => 'Estimated hours matching the logged hours by 56%-60% or 141%-145%',
                'project_type' => 1,
                'lower_limit' => 55,
                'upper_limit' => 145,
                'limit_type' => 2,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '=>',
                'limit_depend_on_models' => json_encode([['model' => 'App\Models\Task::class', 'field' => 'estimate_hours'], ['model' => 'App\Models\ProjectTimeLog::class', 'field' => 'total_hours']]),
                'point_type' => 1,
                'points' => 2
            ],
            [
                'criteria_id' => 2,
                'title' => 'Estimated hours matching the logged hours by 51%-55% or 146%-150%',
                'project_type' => 1,
                'lower_limit' => 50,
                'upper_limit' => 150,
                'limit_type' => 2,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '=>',
                'limit_depend_on_models' => json_encode([['model' => 'App\Models\Task::class', 'field' => 'estimate_hours'], ['model' => 'App\Models\ProjectTimeLog::class', 'field' => 'total_hours']]),
                'point_type' => 1,
                'points' => 1
            ],
            [
                'criteria_id' => 2,
                'title' => 'Estimated hours matching the logged hours by >50% or <150%',
                'project_type' => 1,
                'lower_limit' => 50,
                'upper_limit' => 150,
                'limit_type' => 2,
                'limit_unit' => 1,
                'lower_limit_condition' => '>',
                'upper_limit_condition' => '=<',
                'limit_depend_on_models' => json_encode([['model' => 'App\Models\Task::class', 'field' => 'estimate_hours'], ['model' => 'App\Models\ProjectTimeLog::class', 'field' => 'total_hours']]),
                'point_type' => 1,
                'points' => -5
            ],
            [
                'criteria_id' => 3,
                'title' => 'Less than 5% time of estimated time or 1 hour whichever is higher in revision)',
                'project_type' => 1,
                'lower_limit' => 0,
                'upper_limit' => 5,
                'limit_type' => 2,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '=>',
                'limit_depend_on_models' => null,
                'point_type' => 2,
                'points' => 5,
                'point_depend_on_model' => 'App\Models\Project::class',
                'point_depend_on_field' => 'project_budget'
            ],
            [
                'criteria_id' => 3,
                'title' => '6-10% time of the estimated time in revisions',
                'project_type' => 1,
                'lower_limit' => 5,
                'upper_limit' => 10,
                'limit_type' => 2,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '=>',
                'limit_depend_on_models' => null,
                'point_type' => 2,
                'points' => 4,
                'point_depend_on_model' => 'App\Models\Project::class',
                'point_depend_on_field' => 'project_budget'
            ],
            [
                'criteria_id' => 3,
                'title' => '11-20% time of the estimated time in revision',
                'project_type' => 1,
                'lower_limit' => 10,
                'upper_limit' => 20,
                'limit_type' => 2,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '=>',
                'limit_depend_on_models' => null,
                'point_type' => 2,
                'points' => 3,
                'point_depend_on_model' => 'App\Models\Project::class',
                'point_depend_on_field' => 'project_budget'
            ],
            [
                'criteria_id' => 3,
                'title' => '21-30% time of the estimated time in revision',
                'project_type' => 1,
                'lower_limit' => 20,
                'upper_limit' => 30,
                'limit_type' => 2,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '=>',
                'limit_depend_on_models' => null,
                'point_type' => 2,
                'points' => 2.5,
                'point_depend_on_model' => 'App\Models\Project::class',
                'point_depend_on_field' => 'project_budget'
            ],
            [
                'criteria_id' => 3,
                'title' => '31-40% time of the estimated time in revision',
                'project_type' => 1,
                'lower_limit' => 30,
                'upper_limit' => 40,
                'limit_type' => 2,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '=>',
                'limit_depend_on_models' => null,
                'point_type' => 2,
                'points' => 2,
                'point_depend_on_model' => 'App\Models\Project::class',
                'point_depend_on_field' => 'project_budget'
            ],
            [
                'criteria_id' => 3,
                'title' => '41-100% time of the estimated time in revision',
                'project_type' => 1,
                'lower_limit' => 40,
                'upper_limit' => 80,
                'limit_type' => 2,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '=>',
                'limit_depend_on_models' => null,
                'point_type' => 2,
                'points' => 0,
                'point_depend_on_model' => 'App\Models\Project::class',
                'point_depend_on_field' => 'project_budget'
            ],
            [
                'criteria_id' => 3,
                'title' => '<80% time of the estimated time in revision',
                'project_type' => 1,
                'lower_limit' => 80,
                'upper_limit' => 80,
                'limit_type' => 2,
                'limit_unit' => 1,
                'lower_limit_condition' => '<',
                'upper_limit_condition' => '=<',
                'limit_depend_on_models' => null,
                'point_type' => 2,
                'points' => -5,
                'point_depend_on_model' => 'App\Models\Project::class',
                'point_depend_on_field' => 'project_budget'
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
