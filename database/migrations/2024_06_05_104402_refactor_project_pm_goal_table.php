<?php

use App\Models\ProjectPmGoal;
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
        ProjectPmGoal::truncate();

        Schema::dropColumns('project_pm_goals', ['rating','client_communication_rating','negligence_pm_rating','admin_id','updated_by','resolved_status','client_communication','description','negligence_pm','reason','extended_day','extended_goal_end_day','extended_request_status']);

        Schema::table('project_pm_goals', function (Blueprint $table) {
            $table->longText('expired_meet_description')->nullable()->after('goal_status');
            $table->integer('expired_status')->default(0)->after('expired_meet_description');
        });

        Schema::table('project_pm_goals', function(Blueprint $table){
            $table->integer('extension_status')->default(0)->comment('1 = pending, 2 = accepted, 3 = rejected')->change();
            $table->integer('reason_status')->default(0)->comment('1 = pending, 2 = accepted')->change();
        });

        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
