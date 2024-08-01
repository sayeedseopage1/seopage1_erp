<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class StickyNote extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sticky_note_check:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Note reminder check';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Sticky note reminder check successfully');
    }
}
