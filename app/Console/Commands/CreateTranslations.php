<?php

namespace App\Console\Commands;

use Barryvdh\TranslationManager\Models\Translation;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Stichoza\GoogleTranslate\GoogleTranslate;

class CreateTranslations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'translations:translate {--translateFrom=} {--translateTo=} {--exclude=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Auto translate and create files in lang folder';

    /**
     * Execute the console command.
     *
     * @return mixed
     */

    public function handle()
    {
        $from = $this->option('translateFrom');
        $to = $this->option('translateTo');
        $exclude = $this->option('exclude');

        if ($exclude !== null) {
            $translations = Translation::where('locale', $from)->whereNotIn('group', explode(',', $exclude))->get();
        }
        else {
            $translations = Translation::where('locale', $from)->get();
        }

        $tr = new GoogleTranslate();

        $tr->setSource($from);
        $tr->setTarget($to);

        foreach ($translations as $translation) {
            $data = [
                'locale' => $to,
                'group' => $translation->group,
                'key' => $translation->key
            ];

            $reqTranslation = Translation::where($data)->first();

            if ($reqTranslation === null) {
                $data = Arr::add($data, 'value', $tr->translate($translation->value));
                Translation::create($data);
            }
        }
    }

}
