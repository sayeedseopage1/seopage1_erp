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
            $table->tinyInteger('goal_creation_time_type')->default('1')->after('new_deadline')->comment($string);

            $projectComment = DB::select("SHOW TABLE STATUS WHERE Name='projects'");
            $table->comment( $projectComment[0]->Comment . "
            goal_creation_time_type description:
            1. Will it be award time = p_m_projects::project_award_time_platform
            2. will it be sales large form submission time = deals::released_at
            3. will it be sales lead authorization time = We don't have this data, need to store it on deals table.
            4. will it be project accept time = projects::project_acceptance_time
            5. it will be the time when the time extension request will be authorized = award_time_incresses_request::updated_at
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
