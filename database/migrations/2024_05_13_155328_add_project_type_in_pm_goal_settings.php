<?php

use App\Models\PmGoalSetting;
use App\Models\Project;
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
        Schema::table('pm_goal_settings', function (Blueprint $table){
            if(Schema::hasColumn('pm_goal_settings', 'no_of_goal')) $table->dropColumn('no_of_goal');
            if(Schema::hasColumn('pm_goal_settings', 'category')) $table->dropColumn('category');
            if(Schema::hasColumn('pm_goal_settings', 'name')) $table->dropColumn('name');

        });

        Schema::table('pm_goal_settings', function (Blueprint $table) {
            $table->enum('project_type', Project::$types)->after('end_value');
            $table->enum('category', array_keys(Project::$categories))->after('project_type');
        });

        PmGoalSetting::truncate();
        foreach (PmGoalSetting::$initialValues as $item) PmGoalSetting::create($item);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('pm_goal_settings', function (Blueprint $table) {
            $table->dropColumn('project_type', 'category');
        });
    }
};
