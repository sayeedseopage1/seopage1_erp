<?php return array (
  'api' => 
  array (
    'defaultLimit' => 10,
    'maxLimit' => 1000,
    'cors' => true,
    'cors_headers' => 
    array (
      0 => 'Authorization',
      1 => 'Content-Type',
    ),
    'excludes' => 
    array (
      0 => '_token',
    ),
    'prefix' => 'api',
    'default_version' => 'v1',
    'relation_case' => 'camelcase',
  ),
  'app' => 
  array (
    'name' => 'SeoPage1',
    'app_configuration_mode' => 'browser',
    'seeding' => false,
    'redirect_https' => false,
    'seed_record_count' => 30,
    'env' => 'local',
    'currency_converter_key' => NULL,
    'debug' => true,
    'api_debug' => true,
    'url' => 'http://localhost',
    'asset_url' => NULL,
    'timezone' => 'UTC',
    'cron_timezone' => 'UTC',
    'locale' => 'en',
    'fallback_locale' => 'en',
    'faker_locale' => 'en_US',
    'key' => 'base64:f6+TtnJKz4/3YdIOHtfVPop0hAxr/1E39++ggtYN2cY=',
    'cipher' => 'AES-256-CBC',
    'providers' => 
    array (
      0 => 'Illuminate\\Auth\\AuthServiceProvider',
      1 => 'Illuminate\\Broadcasting\\BroadcastServiceProvider',
      2 => 'Illuminate\\Bus\\BusServiceProvider',
      3 => 'Illuminate\\Cache\\CacheServiceProvider',
      4 => 'Illuminate\\Foundation\\Providers\\ConsoleSupportServiceProvider',
      5 => 'Illuminate\\Cookie\\CookieServiceProvider',
      6 => 'Illuminate\\Database\\DatabaseServiceProvider',
      7 => 'Illuminate\\Encryption\\EncryptionServiceProvider',
      8 => 'Illuminate\\Filesystem\\FilesystemServiceProvider',
      9 => 'Illuminate\\Foundation\\Providers\\FoundationServiceProvider',
      10 => 'Illuminate\\Hashing\\HashServiceProvider',
      11 => 'Illuminate\\Mail\\MailServiceProvider',
      12 => 'App\\Providers\\SmtpConfigProvider',
      13 => 'App\\Providers\\SessionDriverConfigProvider',
      14 => 'Illuminate\\Notifications\\NotificationServiceProvider',
      15 => 'Illuminate\\Pagination\\PaginationServiceProvider',
      16 => 'Illuminate\\Pipeline\\PipelineServiceProvider',
      17 => 'Illuminate\\Queue\\QueueServiceProvider',
      18 => 'Illuminate\\Redis\\RedisServiceProvider',
      19 => 'Illuminate\\Auth\\Passwords\\PasswordResetServiceProvider',
      20 => 'Illuminate\\Session\\SessionServiceProvider',
      21 => 'Illuminate\\Translation\\TranslationServiceProvider',
      22 => 'Illuminate\\Validation\\ValidationServiceProvider',
      23 => 'Illuminate\\View\\ViewServiceProvider',
      24 => 'App\\Providers\\TranslateSettingConfigProvider',
      25 => 'App\\Providers\\AppServiceProvider',
      26 => 'App\\Providers\\AuthServiceProvider',
      27 => 'App\\Providers\\BroadcastServiceProvider',
      28 => 'App\\Providers\\EventServiceProvider',
      29 => 'App\\Providers\\RouteServiceProvider',
      30 => 'Froiden\\RestAPI\\Providers\\ApiServiceProvider',
      31 => 'App\\Providers\\FortifyServiceProvider',
      32 => 'Barryvdh\\TranslationManager\\ManagerServiceProvider',
      33 => 'Macellan\\Zip\\ZipServiceProvider',
      34 => 'Froiden\\LaravelInstaller\\Providers\\LaravelInstallerServiceProvider',
    ),
    'aliases' => 
    array (
      'App' => 'Illuminate\\Support\\Facades\\App',
      'Arr' => 'Illuminate\\Support\\Arr',
      'Artisan' => 'Illuminate\\Support\\Facades\\Artisan',
      'Auth' => 'Illuminate\\Support\\Facades\\Auth',
      'Blade' => 'Illuminate\\Support\\Facades\\Blade',
      'Broadcast' => 'Illuminate\\Support\\Facades\\Broadcast',
      'Bus' => 'Illuminate\\Support\\Facades\\Bus',
      'Cache' => 'Illuminate\\Support\\Facades\\Cache',
      'Config' => 'Illuminate\\Support\\Facades\\Config',
      'Cookie' => 'Illuminate\\Support\\Facades\\Cookie',
      'Crypt' => 'Illuminate\\Support\\Facades\\Crypt',
      'DB' => 'Illuminate\\Support\\Facades\\DB',
      'Eloquent' => 'Illuminate\\Database\\Eloquent\\Model',
      'Event' => 'Illuminate\\Support\\Facades\\Event',
      'File' => 'Illuminate\\Support\\Facades\\File',
      'Gate' => 'Illuminate\\Support\\Facades\\Gate',
      'Hash' => 'Illuminate\\Support\\Facades\\Hash',
      'Http' => 'Illuminate\\Support\\Facades\\Http',
      'Lang' => 'Illuminate\\Support\\Facades\\Lang',
      'Log' => 'Illuminate\\Support\\Facades\\Log',
      'Mail' => 'Illuminate\\Support\\Facades\\Mail',
      'Notification' => 'Illuminate\\Support\\Facades\\Notification',
      'Password' => 'Illuminate\\Support\\Facades\\Password',
      'Queue' => 'Illuminate\\Support\\Facades\\Queue',
      'Redirect' => 'Illuminate\\Support\\Facades\\Redirect',
      'Redis' => 'Illuminate\\Support\\Facades\\Redis',
      'Request' => 'Illuminate\\Support\\Facades\\Request',
      'Response' => 'Illuminate\\Support\\Facades\\Response',
      'Route' => 'Illuminate\\Support\\Facades\\Route',
      'Schema' => 'Illuminate\\Support\\Facades\\Schema',
      'Session' => 'Illuminate\\Support\\Facades\\Session',
      'Storage' => 'Illuminate\\Support\\Facades\\Storage',
      'Str' => 'Illuminate\\Support\\Str',
      'URL' => 'Illuminate\\Support\\Facades\\URL',
      'Validator' => 'Illuminate\\Support\\Facades\\Validator',
      'View' => 'Illuminate\\Support\\Facades\\View',
      'ApiRoute' => 'Froiden\\RestAPI\\Facades\\ApiRoute',
      'DataTables' => 'Yajra\\DataTables\\Facades\\DataTables',
      'Zip' => 'Macellan\\Zip\\ZipFacade',
    ),
    'debug_blacklist' => 
    array (
      '_ENV' => 
      array (
        0 => 'APP_KEY',
        1 => 'DB_PASSWORD',
        2 => 'REDIS_PASSWORD',
        3 => 'MAIL_PASSWORD',
        4 => 'PUSHER_APP_KEY',
        5 => 'PUSHER_APP_SECRET',
        6 => 'FTP_PASSWORD',
        7 => 'RAZORPAY_SECRET',
        8 => 'AWS_ACCESS_KEY_ID',
        9 => 'AWS_SECRET_ACCESS_KEY',
      ),
      '_SERVER' => 
      array (
        0 => 'APP_KEY',
        1 => 'DB_PASSWORD',
        2 => 'REDIS_PASSWORD',
        3 => 'MAIL_PASSWORD',
        4 => 'PUSHER_APP_KEY',
        5 => 'PUSHER_APP_SECRET',
        6 => 'FTP_PASSWORD',
        7 => 'RAZORPAY_SECRET',
        8 => 'AWS_ACCESS_KEY_ID',
        9 => 'AWS_SECRET_ACCESS_KEY',
      ),
      '_POST' => 
      array (
        0 => 'password',
      ),
    ),
    'logo' => 'http://localhost/user-uploads/app-logo/5e7ea7b804ca59b595cd3bb6ee2d0083.png',
  ),
  'auth' => 
  array (
    'defaults' => 
    array (
      'guard' => 'web',
      'passwords' => 'users',
    ),
    'guards' => 
    array (
      'web' => 
      array (
        'driver' => 'session',
        'provider' => 'users',
      ),
      'api' => 
      array (
        'driver' => 'jwt',
        'provider' => 'api_users',
      ),
    ),
    'providers' => 
    array (
      'users' => 
      array (
        'driver' => 'eloquent',
        'model' => 'App\\Models\\User',
      ),
      'api_users' => 
      array (
        'driver' => 'eloquent',
        'model' => 'Modules\\RestAPI\\Entities\\User',
        'table' => 'users',
      ),
    ),
    'passwords' => 
    array (
      'users' => 
      array (
        'provider' => 'users',
        'table' => 'password_resets',
        'expire' => 60,
        'throttle' => 60,
      ),
    ),
    'password_timeout' => 10800,
  ),
  'backup' => 
  array (
    'backup' => 
    array (
      'name' => 'backup',
      'source' => 
      array (
        'files' => 
        array (
          'include' => 
          array (
            0 => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite',
          ),
          'exclude' => 
          array (
            0 => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\vendor',
            1 => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\node_modules',
          ),
          'follow_links' => false,
          'ignore_unreadable_directories' => false,
          'relative_path' => NULL,
        ),
        'databases' => 
        array (
          0 => 'mysql',
        ),
      ),
      'database_dump_compressor' => NULL,
      'database_dump_file_extension' => '',
      'destination' => 
      array (
        'filename_prefix' => '',
        'disks' => 
        array (
          0 => 'localBackup',
        ),
      ),
      'temporary_directory' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\storage\\app/backup-temp',
      'password' => NULL,
      'encryption' => 'default',
    ),
    'notifications' => 
    array (
      'notifications' => 
      array (
        'Spatie\\Backup\\Notifications\\Notifications\\BackupHasFailed' => 
        array (
          0 => '',
        ),
        'Spatie\\Backup\\Notifications\\Notifications\\UnhealthyBackupWasFound' => 
        array (
          0 => '',
        ),
        'Spatie\\Backup\\Notifications\\Notifications\\CleanupHasFailed' => 
        array (
          0 => '',
        ),
        'Spatie\\Backup\\Notifications\\Notifications\\BackupWasSuccessful' => 
        array (
          0 => '',
        ),
        'Spatie\\Backup\\Notifications\\Notifications\\HealthyBackupWasFound' => 
        array (
          0 => '',
        ),
        'Spatie\\Backup\\Notifications\\Notifications\\CleanupWasSuccessful' => 
        array (
          0 => '',
        ),
      ),
      'notifiable' => 'Spatie\\Backup\\Notifications\\Notifiable',
      'mail' => 
      array (
        'to' => 'your@example.com',
        'from' => 
        array (
          'address' => NULL,
          'name' => 'Worksuite',
        ),
      ),
      'slack' => 
      array (
        'webhook_url' => '',
        'channel' => NULL,
        'username' => NULL,
        'icon' => NULL,
      ),
    ),
    'monitor_backups' => 
    array (
      0 => 
      array (
        'name' => 'backup',
        'disks' => 
        array (
          0 => 'localBackup',
        ),
        'health_checks' => 
        array (
          'Spatie\\Backup\\Tasks\\Monitor\\HealthChecks\\MaximumAgeInDays' => 1,
          'Spatie\\Backup\\Tasks\\Monitor\\HealthChecks\\MaximumStorageInMegabytes' => 5000,
        ),
      ),
    ),
    'cleanup' => 
    array (
      'strategy' => 'Spatie\\Backup\\Tasks\\Cleanup\\Strategies\\DefaultStrategy',
      'default_strategy' => 
      array (
        'keep_all_backups_for_days' => 7,
        'keep_daily_backups_for_days' => 16,
        'keep_weekly_backups_for_weeks' => 8,
        'keep_monthly_backups_for_months' => 4,
        'keep_yearly_backups_for_years' => 2,
        'delete_oldest_backups_when_using_more_megabytes_than' => 5000,
      ),
    ),
  ),
  'broadcasting' => 
  array (
    'default' => 'log',
    'connections' => 
    array (
      'pusher' => 
      array (
        'driver' => 'pusher',
        'key' => '',
        'secret' => '',
        'app_id' => '',
        'options' => 
        array (
          'cluster' => 'mt1',
          'useTLS' => true,
        ),
      ),
      'redis' => 
      array (
        'driver' => 'redis',
        'connection' => 'default',
      ),
      'log' => 
      array (
        'driver' => 'log',
      ),
      'null' => 
      array (
        'driver' => 'null',
      ),
    ),
  ),
  'cache' => 
  array (
    'default' => 'file',
    'stores' => 
    array (
      'apc' => 
      array (
        'driver' => 'apc',
      ),
      'array' => 
      array (
        'driver' => 'array',
        'serialize' => false,
      ),
      'database' => 
      array (
        'driver' => 'database',
        'table' => 'cache',
        'connection' => NULL,
      ),
      'file' => 
      array (
        'driver' => 'file',
        'path' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\storage\\framework/cache/data',
      ),
      'memcached' => 
      array (
        'driver' => 'memcached',
        'persistent_id' => NULL,
        'sasl' => 
        array (
          0 => NULL,
          1 => NULL,
        ),
        'options' => 
        array (
        ),
        'servers' => 
        array (
          0 => 
          array (
            'host' => '127.0.0.1',
            'port' => 11211,
            'weight' => 100,
          ),
        ),
      ),
      'redis' => 
      array (
        'driver' => 'redis',
        'connection' => 'cache',
      ),
      'dynamodb' => 
      array (
        'driver' => 'dynamodb',
        'key' => '',
        'secret' => '',
        'region' => 'us-east-1',
        'table' => 'cache',
        'endpoint' => NULL,
      ),
    ),
    'prefix' => 'worksuite_cache',
  ),
  'cors' => 
  array (
    'paths' => 
    array (
      0 => 'api/*',
      1 => 'sanctum/csrf-cookie',
    ),
    'allowed_methods' => 
    array (
      0 => '*',
    ),
    'allowed_origins' => 
    array (
      0 => '*',
    ),
    'allowed_origins_patterns' => 
    array (
    ),
    'allowed_headers' => 
    array (
      0 => '*',
    ),
    'exposed_headers' => 
    array (
    ),
    'max_age' => 0,
    'supports_credentials' => false,
  ),
  'database' => 
  array (
    'default' => 'mysql',
    'connections' => 
    array (
      'sqlite' => 
      array (
        'driver' => 'sqlite',
        'url' => NULL,
        'database' => 'worksuite_licensed',
        'prefix' => '',
        'foreign_key_constraints' => true,
      ),
      'mysql' => 
      array (
        'driver' => 'mysql',
        'url' => NULL,
        'host' => '127.0.0.1',
        'port' => '3306',
        'database' => 'worksuite_licensed',
        'username' => 'root',
        'password' => '',
        'unix_socket' => '',
        'charset' => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
        'prefix' => '',
        'prefix_indexes' => true,
        'strict' => false,
        'engine' => 'InnoDB',
        'options' => 
        array (
        ),
      ),
      'pgsql' => 
      array (
        'driver' => 'pgsql',
        'url' => NULL,
        'host' => '127.0.0.1',
        'port' => '3306',
        'database' => 'worksuite_licensed',
        'username' => 'root',
        'password' => '',
        'charset' => 'utf8',
        'prefix' => '',
        'prefix_indexes' => true,
        'schema' => 'public',
        'sslmode' => 'prefer',
      ),
      'sqlsrv' => 
      array (
        'driver' => 'sqlsrv',
        'url' => NULL,
        'host' => '127.0.0.1',
        'port' => '3306',
        'database' => 'worksuite_licensed',
        'username' => 'root',
        'password' => '',
        'charset' => 'utf8',
        'prefix' => '',
        'prefix_indexes' => true,
      ),
    ),
    'migrations' => 'migrations',
    'redis' => 
    array (
      'client' => 'phpredis',
      'options' => 
      array (
        'cluster' => 'redis',
        'prefix' => 'worksuite_database_',
      ),
      'default' => 
      array (
        'url' => NULL,
        'host' => '127.0.0.1',
        'password' => NULL,
        'port' => '6379',
        'database' => '0',
      ),
      'cache' => 
      array (
        'url' => NULL,
        'host' => '127.0.0.1',
        'password' => NULL,
        'port' => '6379',
        'database' => '1',
      ),
    ),
  ),
  'datatables-buttons' => 
  array (
    'namespace' => 
    array (
      'base' => 'DataTables',
      'model' => '',
    ),
    'pdf_generator' => 'snappy',
    'snappy' => 
    array (
      'options' => 
      array (
        'no-outline' => true,
        'margin-left' => '0',
        'margin-right' => '0',
        'margin-top' => '10mm',
        'margin-bottom' => '10mm',
      ),
      'orientation' => 'landscape',
    ),
    'parameters' => 
    array (
      'dom' => 'Bfrtip',
      'order' => 
      array (
        0 => 
        array (
          0 => 0,
          1 => 'desc',
        ),
      ),
      'buttons' => 
      array (
        0 => 'create',
        1 => 'export',
        2 => 'print',
        3 => 'reset',
        4 => 'reload',
      ),
    ),
    'generator' => 
    array (
      'columns' => 'id,add your columns,created_at,updated_at',
      'buttons' => 'create,export,print,reset,reload',
      'dom' => 'Bfrtip',
    ),
  ),
  'datatables-html' => 
  array (
    'namespace' => 'LaravelDataTables',
    'table' => 
    array (
      'class' => 'table',
      'id' => 'dataTableBuilder',
    ),
    'callback' => 
    array (
      0 => '$',
      1 => '$.',
      2 => 'function',
    ),
    'script' => 'datatables::script',
    'editor' => 'datatables::editor',
  ),
  'debugbar' => 
  array (
    'enabled' => true,
    'except' => 
    array (
      0 => 'telescope*',
      1 => 'horizon*',
    ),
    'storage' => 
    array (
      'enabled' => true,
      'driver' => 'file',
      'path' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\storage\\debugbar',
      'connection' => NULL,
      'provider' => '',
    ),
    'editor' => 'phpstorm',
    'remote_sites_path' => '',
    'local_sites_path' => '',
    'include_vendors' => true,
    'capture_ajax' => true,
    'add_ajax_timing' => false,
    'error_handler' => false,
    'clockwork' => false,
    'collectors' => 
    array (
      'phpinfo' => true,
      'messages' => true,
      'time' => true,
      'memory' => true,
      'exceptions' => true,
      'log' => true,
      'db' => true,
      'views' => true,
      'route' => true,
      'auth' => false,
      'gate' => true,
      'session' => true,
      'symfony_request' => true,
      'mail' => true,
      'laravel' => false,
      'events' => false,
      'default_request' => false,
      'logs' => false,
      'files' => false,
      'config' => false,
      'cache' => false,
      'models' => true,
      'livewire' => true,
    ),
    'options' => 
    array (
      'auth' => 
      array (
        'show_name' => true,
      ),
      'db' => 
      array (
        'with_params' => true,
        'backtrace' => true,
        'backtrace_exclude_paths' => 
        array (
        ),
        'timeline' => false,
        'explain' => 
        array (
          'enabled' => false,
          'types' => 
          array (
            0 => 'SELECT',
          ),
        ),
        'hints' => true,
        'show_copy' => true,
      ),
      'mail' => 
      array (
        'full_log' => false,
      ),
      'views' => 
      array (
        'data' => false,
      ),
      'route' => 
      array (
        'label' => true,
      ),
      'logs' => 
      array (
        'file' => NULL,
      ),
      'cache' => 
      array (
        'values' => true,
      ),
    ),
    'inject' => true,
    'route_prefix' => '_debugbar',
    'route_domain' => NULL,
    'theme' => 'auto',
    'debug_backtrace_limit' => 50,
  ),
  'dompdf' => 
  array (
    'show_warnings' => false,
    'public_path' => NULL,
    'convert_entities' => true,
    'options' => 
    array (
      'font_dir' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\storage\\fonts',
      'font_cache' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\storage\\fonts',
      'temp_dir' => 'C:\\Users\\SEO-PC~1\\AppData\\Local\\Temp',
      'chroot' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite',
      'allowed_protocols' => 
      array (
        'file://' => 
        array (
          'rules' => 
          array (
          ),
        ),
        'http://' => 
        array (
          'rules' => 
          array (
          ),
        ),
        'https://' => 
        array (
          'rules' => 
          array (
          ),
        ),
      ),
      'log_output_file' => NULL,
      'enable_font_subsetting' => false,
      'pdf_backend' => 'CPDF',
      'default_media_type' => 'screen',
      'default_paper_size' => 'a4',
      'default_paper_orientation' => 'portrait',
      'default_font' => 'serif',
      'dpi' => 96,
      'enable_php' => false,
      'enable_javascript' => true,
      'enable_remote' => true,
      'font_height_ratio' => 1.1,
      'enable_html5_parser' => true,
    ),
    'orientation' => 'portrait',
    'defines' => 
    array (
      'font_dir' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\storage\\fonts/',
      'font_cache' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\storage\\fonts/',
      'temp_dir' => 'C:\\Users\\SEO-PC~1\\AppData\\Local\\Temp',
      'chroot' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite',
      'enable_font_subsetting' => false,
      'pdf_backend' => 'CPDF',
      'default_media_type' => 'screen',
      'default_paper_size' => 'a4',
      'default_font' => 'dejavu sans',
      'dpi' => 96,
      'enable_php' => false,
      'enable_javascript' => true,
      'enable_remote' => true,
      'font_height_ratio' => 1.1,
      'enable_html5_parser' => false,
    ),
  ),
  'entrust' => 
  array (
    'role' => 'App\\Models\\Role',
    'roles_table' => 'roles',
    'role_foreign_key' => 'role_id',
    'user' => 'App\\Models\\User',
    'users_table' => 'users',
    'role_user_table' => 'role_user',
    'user_foreign_key' => 'user_id',
    'permission' => 'App\\Models\\Permission',
    'permissions_table' => 'permissions',
    'permission_role_table' => 'permission_role',
    'permission_foreign_key' => 'permission_id',
    'type' => 'web',
    'response-error' => 'Unauthorized',
  ),
  'excel' => 
  array (
    'exports' => 
    array (
      'chunk_size' => 1000,
      'pre_calculate_formulas' => false,
      'strict_null_comparison' => false,
      'csv' => 
      array (
        'delimiter' => ',',
        'enclosure' => '"',
        'line_ending' => '
',
        'use_bom' => false,
        'include_separator_line' => false,
        'excel_compatibility' => false,
      ),
      'properties' => 
      array (
        'creator' => '',
        'lastModifiedBy' => '',
        'title' => '',
        'description' => '',
        'subject' => '',
        'keywords' => '',
        'category' => '',
        'manager' => '',
        'company' => '',
      ),
    ),
    'imports' => 
    array (
      'read_only' => true,
      'ignore_empty' => false,
      'heading_row' => 
      array (
        'formatter' => 'slug',
      ),
      'csv' => 
      array (
        'delimiter' => ',',
        'enclosure' => '"',
        'escape_character' => '\\',
        'contiguous' => false,
        'input_encoding' => 'UTF-8',
      ),
      'properties' => 
      array (
        'creator' => '',
        'lastModifiedBy' => '',
        'title' => '',
        'description' => '',
        'subject' => '',
        'keywords' => '',
        'category' => '',
        'manager' => '',
        'company' => '',
      ),
    ),
    'extension_detector' => 
    array (
      'xlsx' => 'Xlsx',
      'xlsm' => 'Xlsx',
      'xltx' => 'Xlsx',
      'xltm' => 'Xlsx',
      'xls' => 'Xls',
      'xlt' => 'Xls',
      'ods' => 'Ods',
      'ots' => 'Ods',
      'slk' => 'Slk',
      'xml' => 'Xml',
      'gnumeric' => 'Gnumeric',
      'htm' => 'Html',
      'html' => 'Html',
      'csv' => 'Csv',
      'tsv' => 'Csv',
      'pdf' => 'Dompdf',
    ),
    'value_binder' => 
    array (
      'default' => 'Maatwebsite\\Excel\\DefaultValueBinder',
    ),
    'cache' => 
    array (
      'driver' => 'memory',
      'batch' => 
      array (
        'memory_limit' => 60000,
      ),
      'illuminate' => 
      array (
        'store' => NULL,
      ),
    ),
    'transactions' => 
    array (
      'handler' => 'db',
    ),
    'temporary_files' => 
    array (
      'local_path' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\storage\\framework/laravel-excel',
      'remote_disk' => NULL,
      'remote_prefix' => NULL,
      'force_resync_remote' => NULL,
    ),
  ),
  'filesystems' => 
  array (
    'default' => 'local',
    'cloud' => 's3',
    'disks' => 
    array (
      'customFtp' => 
      array (
        'driver' => 'ftp',
        'host' => NULL,
        'username' => NULL,
        'password' => NULL,
      ),
      'local' => 
      array (
        'driver' => 'local',
        'root' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\public\\user-uploads',
      ),
      'public' => 
      array (
        'driver' => 'local',
        'root' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\storage\\app/public',
        'url' => 'http://localhost/storage',
        'visibility' => 'public',
      ),
      's3' => 
      array (
        'driver' => 's3',
        'key' => '',
        'secret' => '',
        'region' => 'us-east-1',
        'bucket' => '',
        'url' => NULL,
        'endpoint' => NULL,
      ),
      'storage' => 
      array (
        'driver' => 'local',
        'root' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\storage\\app',
      ),
      'localBackup' => 
      array (
        'driver' => 'local',
        'root' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\storage',
      ),
    ),
    'links' => 
    array (
      'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\public\\storage' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\storage\\app/public',
    ),
  ),
  'flutterwave' => 
  array (
    'publicKey' => 'FLWPUBK-xxxxxxxxxxxxxxxxxxxxx-X',
    'secretKey' => 'FLWSECK-xxxxxxxxxxxxxxxxxxxxx-X',
    'secretHash' => 'FLWSECK_xxxxxxxxxxxxx',
  ),
  'fortify-options' => 
  array (
    'two-factor-authentication' => 
    array (
      'confirmPassword' => false,
    ),
  ),
  'fortify' => 
  array (
    'guard' => 'web',
    'middleware' => 
    array (
      0 => 'web',
    ),
    'auth_middleware' => 'auth',
    'passwords' => 'users',
    'username' => 'email',
    'email' => 'email',
    'views' => true,
    'home' => '/account/dashboard',
    'prefix' => '',
    'domain' => NULL,
    'limiters' => 
    array (
      'login' => NULL,
    ),
    'redirects' => 
    array (
      'login' => NULL,
      'logout' => NULL,
      'password-confirmation' => NULL,
      'register' => NULL,
      'email-verification' => NULL,
      'password-reset' => NULL,
    ),
    'features' => 
    array (
      0 => 'registration',
      1 => 'reset-passwords',
      2 => 'email-verification',
      3 => 'update-profile-information',
      4 => 'update-passwords',
      5 => 'two-factor-authentication',
    ),
  ),
  'froiden_envato' => 
  array (
    'setting' => 'App\\Models\\Setting',
    'redirectRoute' => 'login',
    'envato_item_id' => 20052522,
    'envato_product_name' => 'worksuite-new',
    'envato_product_url' => 'https://1.envato.market/worksuite',
    'tmp_path' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\storage/app',
    'update_baseurl' => 'https://froiden-updates.s3.ap-south-1.amazonaws.com/worksuite-new',
    'verify_url' => 'https://envato.froid.works/verify-purchase',
    'updater_file_path' => 'https://froiden-updates.s3.ap-south-1.amazonaws.com/worksuite-new/laraupdater.json',
    'middleware' => 
    array (
      0 => 'web',
      1 => 'auth',
    ),
    'allow_users_id' => false,
    'xss_ignore_index' => 
    array (
      0 => 'widget_code',
    ),
    'plugins_url' => 'https://envato.froid.works/plugins/20052522',
    'versionLog' => 'https://envato.froid.works/version-log/worksuite-new',
  ),
  'hashing' => 
  array (
    'driver' => 'bcrypt',
    'bcrypt' => 
    array (
      'rounds' => 10,
    ),
    'argon' => 
    array (
      'memory' => 1024,
      'threads' => 2,
      'time' => 2,
    ),
  ),
  'imap' => 
  array (
    'default' => 'default',
    'date_format' => 'd-M-Y',
    'accounts' => 
    array (
      'default' => 
      array (
        'host' => 'localhost',
        'port' => 993,
        'protocol' => 'imap',
        'encryption' => 'ssl',
        'validate_cert' => true,
        'username' => 'root@example.com',
        'password' => '',
        'authentication' => NULL,
        'proxy' => 
        array (
          'socket' => NULL,
          'request_fulluri' => false,
          'username' => NULL,
          'password' => NULL,
        ),
      ),
    ),
    'options' => 
    array (
      'delimiter' => '/',
      'fetch' => 2,
      'sequence' => 3,
      'fetch_body' => true,
      'fetch_flags' => true,
      'message_key' => 'list',
      'fetch_order' => 'asc',
      'dispositions' => 
      array (
        0 => 'attachment',
        1 => 'inline',
      ),
      'common_folders' => 
      array (
        'root' => 'INBOX',
        'junk' => 'INBOX/Junk',
        'draft' => 'INBOX/Drafts',
        'sent' => 'INBOX/Sent',
        'trash' => 'INBOX/Trash',
      ),
      'open' => 
      array (
      ),
      'decoder' => 
      array (
        'message' => 'utf-8',
        'attachment' => 'utf-8',
      ),
    ),
    'events' => 
    array (
      'message' => 
      array (
        'new' => 'Webklex\\IMAP\\Events\\MessageNewEvent',
        'moved' => 'Webklex\\IMAP\\Events\\MessageMovedEvent',
        'copied' => 'Webklex\\IMAP\\Events\\MessageCopiedEvent',
        'deleted' => 'Webklex\\IMAP\\Events\\MessageDeletedEvent',
        'restored' => 'Webklex\\IMAP\\Events\\MessageRestoredEvent',
      ),
      'folder' => 
      array (
        'new' => 'Webklex\\IMAP\\Events\\FolderNewEvent',
        'moved' => 'Webklex\\IMAP\\Events\\FolderMovedEvent',
        'deleted' => 'Webklex\\IMAP\\Events\\FolderDeletedEvent',
      ),
      'flag' => 
      array (
        'new' => 'Webklex\\IMAP\\Events\\FlagNewEvent',
        'deleted' => 'Webklex\\IMAP\\Events\\FlagDeletedEvent',
      ),
    ),
    'masks' => 
    array (
      'message' => 'Webklex\\PHPIMAP\\Support\\Masks\\MessageMask',
      'attachment' => 'Webklex\\PHPIMAP\\Support\\Masks\\AttachmentMask',
    ),
  ),
  'installer' => 
  array (
    'core' => 
    array (
      'minPhpVersion' => '8.0',
    ),
    'requirements' => 
    array (
      0 => 'openssl',
      1 => 'pdo',
      2 => 'mbstring',
      3 => 'tokenizer',
      4 => 'fileinfo',
      5 => 'curl',
      6 => 'intl',
      7 => 'zip',
    ),
    'permissions' => 
    array (
      'storage/app/' => '775',
      'storage/framework/' => '775',
      'storage/logs/' => '775',
      'bootstrap/cache/' => '775',
    ),
  ),
  'jwt' => 
  array (
    'secret' => 'z6dl6gOuGtZj26ipPx5mgbHABkmCKNrqBwZON555Rx96UR7jDl7iuO5ONZoldMj5',
    'keys' => 
    array (
      'public' => NULL,
      'private' => NULL,
      'passphrase' => NULL,
    ),
    'ttl' => 60,
    'refresh_ttl' => 20160,
    'algo' => 'HS256',
    'required_claims' => 
    array (
      0 => 'iss',
      1 => 'iat',
      2 => 'exp',
      3 => 'nbf',
      4 => 'sub',
      5 => 'jti',
    ),
    'persistent_claims' => 
    array (
    ),
    'lock_subject' => true,
    'leeway' => 0,
    'blacklist_enabled' => true,
    'blacklist_grace_period' => 0,
    'decrypt_cookies' => false,
    'providers' => 
    array (
      'jwt' => 'Tymon\\JWTAuth\\Providers\\JWT\\Lcobucci',
      'auth' => 'Tymon\\JWTAuth\\Providers\\Auth\\Illuminate',
      'storage' => 'Tymon\\JWTAuth\\Providers\\Storage\\Illuminate',
    ),
  ),
  'laravel_google_translate' => 
  array (
    'google_translate_api_key' => NULL,
    'yandex_translate_api_key' => NULL,
    'custom_api_translator' => NULL,
    'custom_api_translator_key' => NULL,
    'api_limit_settings' => 
    array (
      'no_requests_per_batch' => 5,
      'sleep_time_between_batches' => 1,
    ),
    'trans_functions' => 
    array (
      0 => 'trans',
      1 => 'trans_choice',
      2 => 'Lang::get',
      3 => 'Lang::choice',
      4 => 'Lang::trans',
      5 => 'Lang::transChoice',
      6 => '@lang',
      7 => '@choice',
      8 => '__',
      9 => '\\$trans.get',
      10 => '\\$t',
    ),
  ),
  'logging' => 
  array (
    'default' => 'daily',
    'channels' => 
    array (
      'stack' => 
      array (
        'driver' => 'stack',
        'channels' => 
        array (
          0 => 'single',
        ),
        'ignore_exceptions' => false,
      ),
      'single' => 
      array (
        'driver' => 'single',
        'path' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\storage\\logs/laravel.log',
        'level' => 'debug',
      ),
      'daily' => 
      array (
        'driver' => 'daily',
        'path' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\storage\\logs/laravel.log',
        'level' => 'debug',
        'days' => 14,
      ),
      'slack' => 
      array (
        'driver' => 'slack',
        'url' => NULL,
        'username' => 'Laravel Log',
        'emoji' => ':boom:',
        'level' => 'debug',
      ),
      'papertrail' => 
      array (
        'driver' => 'monolog',
        'level' => 'debug',
        'handler' => 'Monolog\\Handler\\SyslogUdpHandler',
        'handler_with' => 
        array (
          'host' => NULL,
          'port' => NULL,
        ),
      ),
      'stderr' => 
      array (
        'driver' => 'monolog',
        'handler' => 'Monolog\\Handler\\StreamHandler',
        'formatter' => NULL,
        'with' => 
        array (
          'stream' => 'php://stderr',
        ),
      ),
      'syslog' => 
      array (
        'driver' => 'syslog',
        'level' => 'debug',
      ),
      'errorlog' => 
      array (
        'driver' => 'errorlog',
        'level' => 'debug',
      ),
      'null' => 
      array (
        'driver' => 'monolog',
        'handler' => 'Monolog\\Handler\\NullHandler',
      ),
      'emergency' => 
      array (
        'path' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\storage\\logs/laravel.log',
      ),
    ),
  ),
  'mail' => 
  array (
    'default' => 'smtp',
    'mailers' => 
    array (
      'smtp' => 
      array (
        'transport' => 'smtp',
        'host' => 'smtp.gmail.com',
        'port' => '465',
        'encryption' => 'tls',
        'username' => 'sayeedseopage1@gmail.com',
        'password' => '5Dmark#iii',
        'timeout' => NULL,
        'auth_mode' => NULL,
        'verify_peer' => false,
      ),
      'ses' => 
      array (
        'transport' => 'ses',
      ),
      'mailgun' => 
      array (
        'transport' => 'mailgun',
      ),
      'postmark' => 
      array (
        'transport' => 'postmark',
      ),
      'sendmail' => 
      array (
        'transport' => 'sendmail',
        'path' => '/usr/sbin/sendmail -bs',
      ),
      'log' => 
      array (
        'transport' => 'log',
        'channel' => NULL,
      ),
      'array' => 
      array (
        'transport' => 'array',
      ),
    ),
    'from' => 
    array (
      'address' => 'from@email.com',
      'name' => 'Seopage1',
    ),
    'markdown' => 
    array (
      'theme' => 'default',
      'paths' => 
      array (
        0 => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\resources\\views/vendor/mail',
      ),
    ),
  ),
  'modules' => 
  array (
    'namespace' => 'Modules',
    'stubs' => 
    array (
      'enabled' => false,
      'path' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite/vendor/nwidart/laravel-modules/src/Commands/stubs',
      'files' => 
      array (
        'routes/web' => 'Routes/web.php',
        'routes/api' => 'Routes/api.php',
        'views/index' => 'Resources/views/index.blade.php',
        'views/master' => 'Resources/views/layouts/master.blade.php',
        'scaffold/config' => 'Config/config.php',
        'composer' => 'composer.json',
        'assets/js/app' => 'Resources/assets/js/app.js',
        'assets/sass/app' => 'Resources/assets/sass/app.scss',
        'webpack' => 'webpack.mix.js',
        'package' => 'package.json',
      ),
      'replacements' => 
      array (
        'routes/web' => 
        array (
          0 => 'LOWER_NAME',
          1 => 'STUDLY_NAME',
        ),
        'routes/api' => 
        array (
          0 => 'LOWER_NAME',
        ),
        'webpack' => 
        array (
          0 => 'LOWER_NAME',
        ),
        'json' => 
        array (
          0 => 'LOWER_NAME',
          1 => 'STUDLY_NAME',
          2 => 'MODULE_NAMESPACE',
          3 => 'PROVIDER_NAMESPACE',
        ),
        'views/index' => 
        array (
          0 => 'LOWER_NAME',
        ),
        'views/master' => 
        array (
          0 => 'LOWER_NAME',
          1 => 'STUDLY_NAME',
        ),
        'scaffold/config' => 
        array (
          0 => 'STUDLY_NAME',
        ),
        'composer' => 
        array (
          0 => 'LOWER_NAME',
          1 => 'STUDLY_NAME',
          2 => 'VENDOR',
          3 => 'AUTHOR_NAME',
          4 => 'AUTHOR_EMAIL',
          5 => 'MODULE_NAMESPACE',
          6 => 'PROVIDER_NAMESPACE',
        ),
      ),
      'gitkeep' => true,
    ),
    'paths' => 
    array (
      'modules' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\Modules',
      'assets' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\public\\modules',
      'migration' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\database/migrations',
      'generator' => 
      array (
        'config' => 
        array (
          'path' => 'Config',
          'generate' => true,
        ),
        'command' => 
        array (
          'path' => 'Console',
          'generate' => true,
        ),
        'migration' => 
        array (
          'path' => 'Database/Migrations',
          'generate' => true,
        ),
        'seeder' => 
        array (
          'path' => 'Database/Seeders',
          'generate' => true,
        ),
        'factory' => 
        array (
          'path' => 'Database/factories',
          'generate' => true,
        ),
        'model' => 
        array (
          'path' => 'Entities',
          'generate' => true,
        ),
        'routes' => 
        array (
          'path' => 'Routes',
          'generate' => true,
        ),
        'controller' => 
        array (
          'path' => 'Http/Controllers',
          'generate' => true,
        ),
        'filter' => 
        array (
          'path' => 'Http/Middleware',
          'generate' => true,
        ),
        'request' => 
        array (
          'path' => 'Http/Requests',
          'generate' => true,
        ),
        'provider' => 
        array (
          'path' => 'Providers',
          'generate' => true,
        ),
        'assets' => 
        array (
          'path' => 'Resources/assets',
          'generate' => true,
        ),
        'lang' => 
        array (
          'path' => 'Resources/lang',
          'generate' => true,
        ),
        'views' => 
        array (
          'path' => 'Resources/views',
          'generate' => true,
        ),
        'test' => 
        array (
          'path' => 'Tests/Unit',
          'generate' => true,
        ),
        'test-feature' => 
        array (
          'path' => 'Tests/Feature',
          'generate' => true,
        ),
        'repository' => 
        array (
          'path' => 'Repositories',
          'generate' => false,
        ),
        'event' => 
        array (
          'path' => 'Events',
          'generate' => false,
        ),
        'listener' => 
        array (
          'path' => 'Listeners',
          'generate' => false,
        ),
        'policies' => 
        array (
          'path' => 'Policies',
          'generate' => false,
        ),
        'rules' => 
        array (
          'path' => 'Rules',
          'generate' => false,
        ),
        'jobs' => 
        array (
          'path' => 'Jobs',
          'generate' => false,
        ),
        'emails' => 
        array (
          'path' => 'Emails',
          'generate' => false,
        ),
        'notifications' => 
        array (
          'path' => 'Notifications',
          'generate' => false,
        ),
        'resource' => 
        array (
          'path' => 'Transformers',
          'generate' => false,
        ),
        'component-view' => 
        array (
          'path' => 'Resources/views/components',
          'generate' => false,
        ),
        'component-class' => 
        array (
          'path' => 'View/Component',
          'generate' => false,
        ),
      ),
    ),
    'commands' => 
    array (
      0 => 'Nwidart\\Modules\\Commands\\CommandMakeCommand',
      1 => 'Nwidart\\Modules\\Commands\\ControllerMakeCommand',
      2 => 'Nwidart\\Modules\\Commands\\DisableCommand',
      3 => 'Nwidart\\Modules\\Commands\\DumpCommand',
      4 => 'Nwidart\\Modules\\Commands\\EnableCommand',
      5 => 'Nwidart\\Modules\\Commands\\EventMakeCommand',
      6 => 'Nwidart\\Modules\\Commands\\JobMakeCommand',
      7 => 'Nwidart\\Modules\\Commands\\ListenerMakeCommand',
      8 => 'Nwidart\\Modules\\Commands\\MailMakeCommand',
      9 => 'Nwidart\\Modules\\Commands\\MiddlewareMakeCommand',
      10 => 'Nwidart\\Modules\\Commands\\NotificationMakeCommand',
      11 => 'Nwidart\\Modules\\Commands\\ProviderMakeCommand',
      12 => 'Nwidart\\Modules\\Commands\\RouteProviderMakeCommand',
      13 => 'Nwidart\\Modules\\Commands\\InstallCommand',
      14 => 'Nwidart\\Modules\\Commands\\ListCommand',
      15 => 'Nwidart\\Modules\\Commands\\ModuleDeleteCommand',
      16 => 'Nwidart\\Modules\\Commands\\ModuleMakeCommand',
      17 => 'Nwidart\\Modules\\Commands\\FactoryMakeCommand',
      18 => 'Nwidart\\Modules\\Commands\\PolicyMakeCommand',
      19 => 'Nwidart\\Modules\\Commands\\RequestMakeCommand',
      20 => 'Nwidart\\Modules\\Commands\\RuleMakeCommand',
      21 => 'Nwidart\\Modules\\Commands\\MigrateCommand',
      22 => 'Nwidart\\Modules\\Commands\\MigrateRefreshCommand',
      23 => 'Nwidart\\Modules\\Commands\\MigrateResetCommand',
      24 => 'Nwidart\\Modules\\Commands\\MigrateRollbackCommand',
      25 => 'Nwidart\\Modules\\Commands\\MigrateStatusCommand',
      26 => 'Nwidart\\Modules\\Commands\\MigrationMakeCommand',
      27 => 'Nwidart\\Modules\\Commands\\ModelMakeCommand',
      28 => 'Nwidart\\Modules\\Commands\\PublishCommand',
      29 => 'Nwidart\\Modules\\Commands\\PublishConfigurationCommand',
      30 => 'Nwidart\\Modules\\Commands\\PublishMigrationCommand',
      31 => 'Nwidart\\Modules\\Commands\\PublishTranslationCommand',
      32 => 'Nwidart\\Modules\\Commands\\SeedCommand',
      33 => 'Nwidart\\Modules\\Commands\\SeedMakeCommand',
      34 => 'Nwidart\\Modules\\Commands\\SetupCommand',
      35 => 'Nwidart\\Modules\\Commands\\UnUseCommand',
      36 => 'Nwidart\\Modules\\Commands\\UpdateCommand',
      37 => 'Nwidart\\Modules\\Commands\\UseCommand',
      38 => 'Nwidart\\Modules\\Commands\\ResourceMakeCommand',
      39 => 'Nwidart\\Modules\\Commands\\TestMakeCommand',
      40 => 'Nwidart\\Modules\\Commands\\LaravelModulesV6Migrator',
    ),
    'scan' => 
    array (
      'enabled' => false,
      'paths' => 
      array (
        0 => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\vendor/*/*',
      ),
    ),
    'composer' => 
    array (
      'vendor' => 'nwidart',
      'author' => 
      array (
        'name' => 'Nicolas Widart',
        'email' => 'n.widart@gmail.com',
      ),
    ),
    'cache' => 
    array (
      'enabled' => false,
      'key' => 'laravel-modules',
      'lifetime' => 60,
    ),
    'register' => 
    array (
      'translations' => true,
      'files' => 'register',
    ),
    'activators' => 
    array (
      'file' => 
      array (
        'class' => 'Nwidart\\Modules\\Activators\\FileActivator',
        'statuses-file' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\storage\\app/modules_statuses.json',
        'cache-key' => 'activator.installed',
        'cache-lifetime' => 604800,
      ),
    ),
    'activator' => 'file',
    'composer-output' => false,
  ),
  'mollie' => 
  array (
    'key' => 'test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  ),
  'onesignal' => 
  array (
    'app_id' => NULL,
    'rest_api_key' => NULL,
    'user_auth_key' => 'YOUR-USER-AUTH-KEY',
    'guzzle_client_timeout' => 0,
  ),
  'payfast' => 
  array (
    'testing' => true,
    'merchant' => 
    array (
      'merchant_id' => '',
      'merchant_key' => '',
      'return_url' => 'http://your-domain.co.za/success',
      'cancel_url' => 'http://your-domain.co.za/cancel',
      'notify_url' => 'http://your-domain.co.za/itn',
    ),
    'hosts' => 
    array (
      0 => 'www.payfast.co.za',
      1 => 'sandbox.payfast.co.za',
      2 => 'w1w.payfast.co.za',
      3 => 'w2w.payfast.co.za',
    ),
    'passphrase' => '',
  ),
  'paystack' => 
  array (
    'publicKey' => '',
    'secretKey' => '',
    'paymentUrl' => 'https://api.paystack.co',
    'merchantEmail' => '',
  ),
  'pushnotification' => 
  array (
    'gcm' => 
    array (
      'priority' => 'normal',
      'dry_run' => false,
      'apiKey' => 'My_ApiKey',
    ),
    'fcm' => 
    array (
      'priority' => 'normal',
      'dry_run' => false,
      'apiKey' => '',
    ),
    'apn' => 
    array (
      'certificate' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite/aps.pem',
      'passPhrase' => 'secret',
      'passFile' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\config/iosCertificates/yourKey.pem',
      'dry_run' => true,
    ),
  ),
  'queue' => 
  array (
    'default' => 'sync',
    'connections' => 
    array (
      'sync' => 
      array (
        'driver' => 'sync',
      ),
      'database' => 
      array (
        'driver' => 'database',
        'table' => 'jobs',
        'queue' => 'default',
        'retry_after' => 90,
      ),
      'beanstalkd' => 
      array (
        'driver' => 'beanstalkd',
        'host' => 'localhost',
        'queue' => 'default',
        'retry_after' => 90,
        'block_for' => 0,
      ),
      'sqs' => 
      array (
        'driver' => 'sqs',
        'key' => '',
        'secret' => '',
        'prefix' => 'https://sqs.us-east-1.amazonaws.com/your-account-id',
        'queue' => 'your-queue-name',
        'suffix' => NULL,
        'region' => 'us-east-1',
      ),
      'redis' => 
      array (
        'driver' => 'redis',
        'connection' => 'default',
        'queue' => 'default',
        'retry_after' => 90,
        'block_for' => NULL,
      ),
    ),
    'failed' => 
    array (
      'driver' => 'database-uuids',
      'database' => 'mysql',
      'table' => 'failed_jobs',
    ),
  ),
  'sentry' => 
  array (
    'dsn' => NULL,
    'environment' => NULL,
    'breadcrumbs' => 
    array (
      'logs' => true,
      'sql_queries' => true,
      'sql_bindings' => true,
      'queue_info' => true,
      'command_info' => true,
    ),
    'tracing' => 
    array (
      'queue_job_transactions' => false,
      'queue_jobs' => true,
      'sql_queries' => true,
      'sql_origin' => true,
      'views' => true,
      'default_integrations' => true,
    ),
    'send_default_pii' => false,
    'traces_sample_rate' => 0.0,
    'controllers_base_namespace' => 'App\\Http\\Controllers',
  ),
  'services' => 
  array (
    'mailgun' => 
    array (
      'domain' => NULL,
      'secret' => NULL,
      'endpoint' => 'api.mailgun.net',
    ),
    'postmark' => 
    array (
      'token' => NULL,
    ),
    'authorize' => 
    array (
      'login' => '',
      'transaction' => '',
      'sandbox' => true,
    ),
    'square' => 
    array (
      'application_id' => '',
      'access_token' => '',
      'location_id' => '',
      'environment' => 'sandbox',
    ),
    'ses' => 
    array (
      'key' => '',
      'secret' => '',
      'region' => 'us-east-1',
    ),
    'telegram-bot-api' => 
    array (
      'token' => 'YOUR BOT TOKEN HERE',
    ),
    'google' => 
    array (
      'client_id' => '',
      'client_secret' => '',
      'redirect' => NULL,
      'redirect_uri' => 'http://localhost/google-auth',
      'scopes' => 
      array (
        0 => 'https://www.googleapis.com/auth/userinfo.email',
        1 => 'https://www.googleapis.com/auth/userinfo.profile',
        2 => 'https://www.googleapis.com/auth/calendar',
      ),
      'approval_prompt' => 'force',
      'access_type' => 'offline',
      'include_granted_scopes' => true,
    ),
    'onesignal' => 
    array (
      'app_id' => NULL,
      'rest_api_key' => NULL,
    ),
  ),
  'session' => 
  array (
    'driver' => 'file',
    'lifetime' => '120',
    'expire_on_close' => false,
    'encrypt' => false,
    'files' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\storage\\framework/sessions',
    'connection' => NULL,
    'table' => 'sessions',
    'store' => NULL,
    'lottery' => 
    array (
      0 => 2,
      1 => 100,
    ),
    'cookie' => 'worksuite_session',
    'path' => '/',
    'domain' => NULL,
    'secure' => NULL,
    'http_only' => true,
    'same_site' => 'lax',
  ),
  'translation-manager' => 
  array (
    'route' => 
    array (
      'prefix' => 'translations',
      'middleware' => 
      array (
        0 => 'web',
        1 => 'auth',
      ),
    ),
    'delete_enabled' => true,
    'exclude_groups' => 
    array (
    ),
    'exclude_langs' => 
    array (
    ),
    'sort_keys' => false,
    'trans_functions' => 
    array (
      0 => 'trans',
      1 => 'trans_choice',
      2 => 'Lang::get',
      3 => 'Lang::choice',
      4 => 'Lang::trans',
      5 => 'Lang::transChoice',
      6 => '@lang',
      7 => '@choice',
      8 => '__',
      9 => '$trans.get',
    ),
    'db_connection' => NULL,
  ),
  'view' => 
  array (
    'paths' => 
    array (
      0 => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\resources\\views',
    ),
    'compiled' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite\\storage\\framework\\views',
  ),
  'zoom' => 
  array (
    'api_key' => NULL,
    'api_secret' => NULL,
    'base_url' => 'https://api.zoom.us/v2/',
    'token_life' => 604800,
    'authentication_method' => 'jwt',
    'max_api_calls_per_request' => '5',
  ),
  'image' => 
  array (
    'driver' => 'gd',
  ),
  'vonage' => 
  array (
    'sms_from' => NULL,
    'api_key' => NULL,
    'api_secret' => NULL,
    'application_id' => NULL,
    'signature_secret' => NULL,
    'private_key' => NULL,
    'app' => 
    array (
      'name' => 'Laravel',
      'version' => '1.1.2',
    ),
  ),
  'flare' => 
  array (
    'key' => NULL,
    'flare_middleware' => 
    array (
      0 => 'Spatie\\FlareClient\\FlareMiddleware\\RemoveRequestIp',
      1 => 'Spatie\\FlareClient\\FlareMiddleware\\AddGitInformation',
      2 => 'Spatie\\LaravelIgnition\\FlareMiddleware\\AddNotifierName',
      3 => 'Spatie\\LaravelIgnition\\FlareMiddleware\\AddEnvironmentInformation',
      4 => 'Spatie\\LaravelIgnition\\FlareMiddleware\\AddExceptionInformation',
      5 => 'Spatie\\LaravelIgnition\\FlareMiddleware\\AddDumps',
      'Spatie\\LaravelIgnition\\FlareMiddleware\\AddLogs' => 
      array (
        'maximum_number_of_collected_logs' => 200,
      ),
      'Spatie\\LaravelIgnition\\FlareMiddleware\\AddQueries' => 
      array (
        'maximum_number_of_collected_queries' => 200,
        'report_query_bindings' => true,
      ),
      'Spatie\\LaravelIgnition\\FlareMiddleware\\AddJobs' => 
      array (
        'max_chained_job_reporting_depth' => 5,
      ),
      'Spatie\\FlareClient\\FlareMiddleware\\CensorRequestBodyFields' => 
      array (
        'censor_fields' => 
        array (
          0 => 'password',
          1 => 'password_confirmation',
        ),
      ),
      'Spatie\\FlareClient\\FlareMiddleware\\CensorRequestHeaders' => 
      array (
        'headers' => 
        array (
          0 => 'API-KEY',
        ),
      ),
    ),
    'send_logs_as_events' => true,
  ),
  'ignition' => 
  array (
    'editor' => 'phpstorm',
    'theme' => 'auto',
    'enable_share_button' => true,
    'register_commands' => false,
    'solution_providers' => 
    array (
      0 => 'Spatie\\Ignition\\Solutions\\SolutionProviders\\BadMethodCallSolutionProvider',
      1 => 'Spatie\\Ignition\\Solutions\\SolutionProviders\\MergeConflictSolutionProvider',
      2 => 'Spatie\\Ignition\\Solutions\\SolutionProviders\\UndefinedPropertySolutionProvider',
      3 => 'Spatie\\LaravelIgnition\\Solutions\\SolutionProviders\\IncorrectValetDbCredentialsSolutionProvider',
      4 => 'Spatie\\LaravelIgnition\\Solutions\\SolutionProviders\\MissingAppKeySolutionProvider',
      5 => 'Spatie\\LaravelIgnition\\Solutions\\SolutionProviders\\DefaultDbNameSolutionProvider',
      6 => 'Spatie\\LaravelIgnition\\Solutions\\SolutionProviders\\TableNotFoundSolutionProvider',
      7 => 'Spatie\\LaravelIgnition\\Solutions\\SolutionProviders\\MissingImportSolutionProvider',
      8 => 'Spatie\\LaravelIgnition\\Solutions\\SolutionProviders\\InvalidRouteActionSolutionProvider',
      9 => 'Spatie\\LaravelIgnition\\Solutions\\SolutionProviders\\ViewNotFoundSolutionProvider',
      10 => 'Spatie\\LaravelIgnition\\Solutions\\SolutionProviders\\RunningLaravelDuskInProductionProvider',
      11 => 'Spatie\\LaravelIgnition\\Solutions\\SolutionProviders\\MissingColumnSolutionProvider',
      12 => 'Spatie\\LaravelIgnition\\Solutions\\SolutionProviders\\UnknownValidationSolutionProvider',
      13 => 'Spatie\\LaravelIgnition\\Solutions\\SolutionProviders\\MissingMixManifestSolutionProvider',
      14 => 'Spatie\\LaravelIgnition\\Solutions\\SolutionProviders\\MissingViteManifestSolutionProvider',
      15 => 'Spatie\\LaravelIgnition\\Solutions\\SolutionProviders\\MissingLivewireComponentSolutionProvider',
      16 => 'Spatie\\LaravelIgnition\\Solutions\\SolutionProviders\\UndefinedViewVariableSolutionProvider',
      17 => 'Spatie\\LaravelIgnition\\Solutions\\SolutionProviders\\GenericLaravelExceptionSolutionProvider',
    ),
    'ignored_solution_providers' => 
    array (
    ),
    'enable_runnable_solutions' => NULL,
    'remote_sites_path' => 'D:\\Sayeed_Laravel_Developer\\laragon\\www\\worksuite licensed\\worksuite-new-5.2.2\\worksuite',
    'local_sites_path' => '',
    'housekeeping_endpoint_prefix' => '_ignition',
    'settings_file_path' => '',
  ),
  'datatables' => 
  array (
    'search' => 
    array (
      'smart' => true,
      'multi_term' => true,
      'case_insensitive' => true,
      'use_wildcards' => false,
      'starts_with' => false,
    ),
    'index_column' => 'DT_RowIndex',
    'engines' => 
    array (
      'eloquent' => 'Yajra\\DataTables\\EloquentDataTable',
      'query' => 'Yajra\\DataTables\\QueryDataTable',
      'collection' => 'Yajra\\DataTables\\CollectionDataTable',
      'resource' => 'Yajra\\DataTables\\ApiResourceDataTable',
    ),
    'builders' => 
    array (
    ),
    'nulls_last_sql' => ':column :direction NULLS LAST',
    'error' => NULL,
    'columns' => 
    array (
      'excess' => 
      array (
        0 => 'rn',
        1 => 'row_num',
      ),
      'escape' => '*',
      'raw' => 
      array (
        0 => 'action',
      ),
      'blacklist' => 
      array (
        0 => 'password',
        1 => 'remember_token',
      ),
      'whitelist' => '*',
    ),
    'json' => 
    array (
      'header' => 
      array (
      ),
      'options' => 0,
    ),
  ),
  'brodcasting' => 
  array (
    'default' => 'log',
  ),
  'trustedproxy' => 
  array (
    'proxies' => NULL,
    'headers' => 30,
  ),
  'gitlab' => 
  array (
    'default' => 'main',
    'connections' => 
    array (
      'main' => 
      array (
        'token' => 'your-token',
        'method' => 'token',
      ),
      'alternative' => 
      array (
        'token' => 'your-token',
        'method' => 'oauth',
      ),
    ),
    'cache' => 
    array (
      'main' => 
      array (
        'driver' => 'illuminate',
        'connector' => NULL,
      ),
      'bar' => 
      array (
        'driver' => 'illuminate',
        'connector' => 'redis',
      ),
    ),
  ),
  'markdown' => 
  array (
    'views' => true,
    'extensions' => 
    array (
      0 => 'League\\CommonMark\\Extension\\CommonMark\\CommonMarkCoreExtension',
      1 => 'League\\CommonMark\\Extension\\Table\\TableExtension',
    ),
    'renderer' => 
    array (
      'block_separator' => '
',
      'inner_separator' => '
',
      'soft_break' => '
',
    ),
    'commonmark' => 
    array (
      'enable_em' => true,
      'enable_strong' => true,
      'use_asterisk' => true,
      'use_underscore' => true,
      'unordered_list_markers' => 
      array (
        0 => '-',
        1 => '+',
        2 => '*',
      ),
    ),
    'html_input' => 'strip',
    'allow_unsafe_links' => true,
    'max_nesting_level' => 9223372036854775807,
    'slug_normalizer' => 
    array (
      'max_length' => 255,
      'unique' => 'document',
    ),
  ),
  'twilio-notification-channel' => 
  array (
    'username' => NULL,
    'password' => NULL,
    'auth_token' => NULL,
    'account_sid' => NULL,
    'from' => NULL,
    'alphanumeric_sender' => NULL,
    'sms_service_sid' => NULL,
    'debug_to' => NULL,
    'ignored_error_codes' => 
    array (
      0 => 21608,
      1 => 21211,
      2 => 21614,
      3 => 21408,
    ),
  ),
  'tinker' => 
  array (
    'commands' => 
    array (
    ),
    'alias' => 
    array (
    ),
    'dont_alias' => 
    array (
      0 => 'App\\Nova',
    ),
  ),
);
