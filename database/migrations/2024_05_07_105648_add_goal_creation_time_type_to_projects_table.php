<?php

use App\Models\Project;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        Schema::table('projects', function (Blueprint $table) {

            $string = "";
            foreach (Project::$goalCreationTimeType as $key => $value) $string .= " $key-$value,";
            // $table->tinyInteger('goal_creation_time_type')->default('2')->after('new_deadline')->comment($string)->change();
            DB::statement("ALTER TABLE `projects`
            CHANGE COLUMN `goal_creation_time_type` `goal_creation_time_type` 
            TINYINT(3) NOT NULL DEFAULT '2' 
            COMMENT '$string' AFTER `new_deadline`;
            ");

            $table->comment("
            goal_creation_time_type description:
            1. award time = p_m_projects::project_award_time_platform
            2. sales large form submission time = deals::released_at
            3. sales lead authorization time = deals::authorized_on.
            4. project accept time = projects::project_acceptance_time
            5. when admin authorizes the extension request  = award_time_incresses_request::updated_at
            6. when project manager submits the extension request  = award_time_incresses_request::created_at
            ");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('goal_creation_time_type');
        });
    }
};
