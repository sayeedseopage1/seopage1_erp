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
        
        // drop columns
        $drop_columns =['rating','client_communication_rating','is_client_communication','admin_comment', 'suggestion','is_any_negligence','negligence_pm_rating','admin_id','updated_by','resolved_status','client_communication','description','negligence_pm','reason','extended_day','extended_goal_end_day','extended_request_status'];
        foreach ($drop_columns as $item) {
            if (Schema::hasColumn('project_pm_goals', $item)) Schema::dropColumns('project_pm_goals', $item);
        }

        // add columns
        Schema::table('project_pm_goals', function (Blueprint $table) {
            $table->longText('expired_meet_description')->nullable()->after('goal_status');
            $table->integer('expired_status')->default(0)->after('expired_meet_description');
            $table->integer('mail_status')->default(0)->after('expired_status');
        });

        // change columns
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
