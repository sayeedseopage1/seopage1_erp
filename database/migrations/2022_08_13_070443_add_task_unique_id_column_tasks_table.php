<?php

use App\Models\Project;
use App\Models\Task;
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
        if (!Schema::hasColumn('tasks', 'task_short_code')) {
            Schema::table('tasks', function (Blueprint $table) {
                $table->string('task_short_code')->after('id')->nullable();
            });
        }
        
        $projects = Project::whereHas('tasks')->get();

        foreach ($projects as $value) {
            // phpcs:ignore
            DB::statement("UPDATE tasks SET task_short_code = CONCAT( '$value->project_short_code', '-', id ) WHERE project_id = '" . $value->id . "'; ");
        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropColumn('task_short_code');
        });
    }

};
