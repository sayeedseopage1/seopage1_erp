<?php

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
        Schema::table('graphic_work_details', function (Blueprint $table) {
            $table->text('workable_url')->nullable()->after('reference');
            $table->text('reference')->nullable()->change();
            $table->text('file_extensions')->nullable()->after('workable_url');
        });

        Schema::table('graphic_task_files', function (Blueprint $table) {
            $table->integer('file_type')->nullable()->comment('1 = attach_text_files, 2 = workable_image_files, 3 = workable_image_or_video_files, 4 = brand_guideline_files, 5 = reference_files')->change();
        });

        DB::table('type_of_graphic_works')
        ->where('name', 'Motion graph')
        ->update(['name' => 'Motion graphics']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('graphic_work_details', function (Blueprint $table) {
            $table->dropColumn(['workable_url','file_extensions']);
            $table->string('reference')->nullable()->change();
        });

        Schema::table('graphic_task_files', function (Blueprint $table) {
            $table->integer('file_type')->nullable()->comment('1 = attach_text_files, 2 = workable_image_files, 3 = workable_image_or_video_files, 4 = brand_guideline_files')->change();
        });

        DB::table('type_of_graphic_works')
        ->where('name', 'Motion graphics')
        ->update(['name' => 'Motion graph']);
    }
};
