<?php

use App\Models\Project;
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
        if (!Schema::hasColumn('projects', 'project_short_code')) {
            Schema::table('projects', function (Blueprint $table) {
                $table->string('project_short_code')->after('project_name')->nullable();
            });

            $projects = Project::select('project_name', 'id')->get();

            foreach ($projects as $project) {
                $project->project_short_code = $this->initials($project->project_name);
                $project->save();
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */

    public function down()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('project_short_code');
        });
    }

    protected function initials($str): string
    {
        $ret = '';

        foreach (explode(' ', $str) as $word) {
            $ret .= strtoupper($word[0] ?? '');
        }

        return $ret;
    }

};
