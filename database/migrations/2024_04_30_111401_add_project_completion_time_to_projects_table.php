<?php

use App\Models\Project;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

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

        DB::table('projects')
        ->whereIn('status', ['finished', 'partially finished'])
        ->update(['project_completion_time' => DB::raw('updated_at'), 'updated_at' => DB::raw('updated_at')]);


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
