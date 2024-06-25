<?php

use App\Models\ProjectDeliverable;
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
        Schema::table('project_deliverables', function (Blueprint $table) {
            $table->boolean('status')->default('0')->after('authorization')->comment('From admin-> 1: Authorized, 0: Pending Authorization');
        });

        ProjectDeliverable::query()->update(['status'=> '1']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('project_deliverables', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
