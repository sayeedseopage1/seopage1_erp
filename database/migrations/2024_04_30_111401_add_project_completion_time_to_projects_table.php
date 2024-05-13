<?php

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
        Schema::table('projects', function (Blueprint $table) {
            $table->timestamp('project_completion_time')->nullable()->after('project_completion_days');
        });

        // foreach(Project::all() as $project){
        //     $project->project_completion_time = $project->updated_at;
        //     $project->save();
        // }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('project_completion_time');
        });
    }
};
