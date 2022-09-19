<?php

use App\Models\DashboardWidget;
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
        $widget = ['widget_name' => 'lead', 'status' => 1, 'dashboard_type' => 'private-dashboard'];
        \App\Models\DashboardWidget::create($widget);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DashboardWidget::where('widget_name', 'lead')->delete();
    }

};
