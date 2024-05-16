<?php

use App\Models\Deal;
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
        Schema::table('p_m_projects', function (Blueprint $table) {
            $table->timestamp('project_award_time_platform')->nullable()->after('delayed_status');
        });

        Deal::with('pm_project')->get()->each(function ($deal) {
            if ($deal->pm_project) {
                $deal->pm_project->update(['project_award_time_platform' => $deal->award_time]);
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('p_m_projects', function (Blueprint $table) {
            $table->dropColumn('project_award_time_platform');
        });
    }
};
