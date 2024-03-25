<?php

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
        Schema::table('project_portfolios', function (Blueprint $table) {

            foreach (['theme_name', 'theme_url', 'plugin_name', 'plugin_url'] as $item) {
                if (Schema::hasColumn('project_portfolios', $item)) {
                    $table->dropColumn($item);
                }
            }

            foreach (['theme_id', 'plugin_list'] as $item) {
                if (!Schema::hasColumn('project_portfolios', $item)) {

                    switch ($item) {
                        case 'theme_id':
                            $table->bigInteger('theme_id')->unsigned()->after('sub_niche');
                            break;
                        case 'plugin_list':
                            $table->json('plugin_list')->nullable()->after('plugin_information');
                            break;
                    }
                }
            }

            // $table->foreign('theme_id')->references('id')->on('project_website_themes')->onUpdate('no action')->onDelete('no action');
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
