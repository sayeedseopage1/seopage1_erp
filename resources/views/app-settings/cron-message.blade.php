@if (global_setting()->hide_cron_message == 0 || \Carbon\Carbon::now()->diffInHours(global_setting()->last_cron_run) > 48)

    <div class="alert alert-primary">
        <h6>Set following cron command on your server (Ignore if already done)</h6>
        @php
            try {
                $phpPath = PHP_BINDIR.'/php';
            } catch (\Throwable $th) {
                $phpPath = 'php';
            }
               echo '<code>* * * * * ' . $phpPath . ' ' . base_path() . '/artisan schedule:run >> /dev/null 2>&1</code>';
        @endphp
        <div class="mt-3"><strong>Note:</strong>
            <ins>{{$phpPath}}</ins>
            in above command is the path of PHP on your server.
            Please enter the correct PHP path to make it work
        </div>
    </div>
@endif
