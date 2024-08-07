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
        Schema::create('daily_submission_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('daily_submission_id');
            $table->unsignedBigInteger('daily_submission_category_id');
            $table->unsignedBigInteger('daily_submission_sections_id');
            $table->string('section_name')->nullable();
            $table->string('web_version_link')->nullable();
            $table->text('web_version_file')->nullable();
            $table->string('mobile_version_link')->nullable();
            $table->text('mobile_version_file')->nullable();
            $table->string('tab_version_link')->nullable();
            $table->text('tab_version_file')->nullable();
            $table->longText('section_comment')->nullable();
            $table->string('responsiveness_title')->nullable();
            $table->string('responsiveness_link')->nullable();
            $table->longText('responsiveness_comment')->nullable();
            $table->longText('revisions_list')->nullable();
            $table->longText('revisions_complete_today')->nullable();
            $table->integer('revisions_percentage')->nullable();
            $table->longText('revisions_comment')->nullable();
            $table->longText('bug_about')->nullable();
            $table->integer('bug_fix_today')->nullable();
            $table->longText('bug_comment')->nullable();
            $table->longText('functionality_about')->nullable();
            $table->integer('functionality_fix_today')->nullable();
            $table->longText('functionality_comment')->nullable();
            $table->integer('speed_before_started_today')->nullable();
            $table->string('speed_before_link')->nullable();
            $table->integer('speed_after_finished_working_today')->nullable();
            $table->string('speed_after_finished_working_link')->nullable();
            $table->longText('speed_comment')->nullable();
            $table->longText('domain_hosting_comment')->nullable();
            $table->integer('migration_size_of_the_website')->nullable();
            $table->longText('migration_reason')->nullable();
            $table->longText('migration_comment')->nullable();
            $table->integer('product_uploading_today')->nullable();
            $table->string('product_uploading_link')->nullable();
            $table->longText('product_uploading_comment')->nullable();
            $table->integer('blog_uploading_post_today')->nullable();
            $table->string('blog_uploading_link')->nullable();
            $table->longText('blog_uploading_comment')->nullable();
            $table->integer('cloning_page_create_today')->nullable();
            $table->longText('cloning_change_content_img_page')->nullable();
            $table->string('cloning_page_link')->nullable();
            $table->longText('cloning_comment')->nullable();
            $table->longText('others_title')->nullable();
            $table->string('others_link')->nullable();
            $table->longText('others_comment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('daily_submission_details');
    }
};
