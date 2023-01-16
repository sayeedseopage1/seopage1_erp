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
        Schema::create('q_c_submissions', function (Blueprint $table) {
            $table->id();
            $table->string('milestone_id');
            $table->string('project_id');
            $table->integer('site_https')->nullable();
            $table->integer('favicon')->nullable();
            $table->integer('webmail')->nullable();
            $table->integer('contact_form')->nullable();
            $table->integer('social_media')->nullable();
            $table->integer('login_link')->nullable();
            $table->integer('scroll_down')->nullable();
            $table->integer('lorem_text')->nullable();
            $table->integer('logical_issues')->nullable();
            $table->integer('loading_speed')->nullable();
            $table->integer('mobile_speed')->nullable();
            $table->integer('step_1')->nullable();
            $table->integer('migration')->nullable();
            $table->integer('links_working')->nulalble();
            $table->integer('backup_plugin')->nullable();
            $table->integer('uptime_monitoring')->nullable();
            $table->integer('final_backup')->nulalble();
            $table->integer('slogan')->nulalble();
            $table->integer('agree')->nulalble();
            $table->string('status')->default('pending');
            $table->text('admin_comment')->nullable();

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
        Schema::dropIfExists('q_c_submissions');
    }
};
