<?php 
return [
    'driver' => 'snoretoast',
    'snoretoast' => [
        'path' => env('SNORETOAST_PATH', base_path('vendor\jolicode\jolinotif\bin\snoreToast\snoretoast-x64.exe')),
        'timeout' => 5,
        'config' => [
            'app_id' => 'MyApp',
            'shortcut_name' => 'MyApp',
            'company_name' => 'MyCompany',
            'silent' => false,
            'logo_path' => 'path/to/logo.png',
            'audio_path' => 'path/to/sound.wav',
        ],
    ],
];
