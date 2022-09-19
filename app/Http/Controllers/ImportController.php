<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Artisan;

class ImportController extends Controller
{

    /**
     * Get import progress percentage
     * @param mixed $id
     * @return mixed
     */
    public function getImportProgress($name, $id)
    {
        // Get Count of Execution of Jobs
        $execution_jobs = (int)(ini_get('max_execution_time') / 10);

        // Execute Jobs
        Artisan::call('queue:work database  --max-jobs='. ($execution_jobs > 1 ? $execution_jobs : 1)  . ' --queue=' . $name . ' --stop-when-empty');

        $batch = Bus::findBatch($id);
        $progress = 0;
        $failedJobs = 0;
        $processedJobs = 0;
        $pendingJobs = 0;
        $totalJobs = 0;

        if ($batch) {
            $failedJobs = $batch->failedJobs;
            $pendingJobs = $batch->pendingJobs;
            $totalJobs = $batch->totalJobs;
            $processedJobs = $batch->processedJobs();

            $progress = $totalJobs > 0 ? round((($processedJobs + $failedJobs) / $totalJobs) * 100, 2) : 0;
        }

        return Reply::dataOnly(['progress' => $progress, 'failedJobs' => $failedJobs, 'processedJobs' => $processedJobs, 'pendingJobs' => $pendingJobs, 'totalJobs' => $totalJobs]);
    }

    public function getQueueException($name)
    {
        $exceptions = DB::table('failed_jobs')
            ->where('queue', $name)
            ->get();

        $view = view('import.import_exception', $this->data)->with(['exceptions' => $exceptions])->render();
        return Reply::dataOnly(['view' => $view, 'count' => count($exceptions)]);
    }

}
