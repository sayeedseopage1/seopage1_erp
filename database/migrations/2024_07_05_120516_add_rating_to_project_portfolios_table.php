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
            $table->decimal('rating_score')->nullable()->after('added_by');
            $table->longText('added_by_comment')->nullable()->after('rating_score');
            $table->integer('rating_added_by')->nullable()->after('added_by_comment');
            $table->integer('rating_updated_by')->nullable()->after('rating_added_by');
            $table->timestamp('rating_updated_at')->nullable()->after('rating_updated_by');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('project_portfolios', function (Blueprint $table) {
            $table->dropColumn(['rating_score', 'added_by_comment', 'rating_added_by', 'rating_updated_by','rating_updated_at']);
        });
    }
};
