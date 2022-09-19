<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Controllers\AccountBaseController;
use App\Traits\ModuleVerify;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Session;
use Macellan\Zip\Zip;
use \Nwidart\Modules\Facades\Module;

class CustomModuleController extends AccountBaseController
{
    use ModuleVerify;

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.moduleSettings';
        $this->activeSettingMenu = 'module_settings';
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->type = 'custom';
        $this->updateFilePath = config('froiden_envato.tmp_path');
        $this->allModules = Module::all();
        $this->view = 'custom-modules.ajax.custom';
        $this->activeTab = 'custom';
        $plugins = \Froiden\Envato\Functions\EnvatoUpdate::plugins();
        $version = [];

        foreach ($plugins as $key => $value) {
            $version[$value['envato_id']] = $value['version'];
        }

        $this->version = $version;

        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle, 'activeTab' => $this->activeTab]);
        }

        return view('module-settings.index', $this->data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->pageTitle = 'app.menu.moduleSettingsInstall';
        $this->type = 'custom';
        $this->updateFilePath = config('froiden_envato.tmp_path');
        return view('custom-modules.install', $this->data);
    }

    /**
     * @param Request $request
     * @return array
     * @throws \Exception
     */
    public function store(Request $request)
    {
        File::put(public_path() . '/install-version.txt', 'complete');

        $filePath = $request->filePath;

        $zip = Zip::open($filePath);

        $zipName = $this->getZipName($filePath);

        // Extract the files to storage folder first for checking the right plugin
        // Filename Like codecanyon-0gOuGKoY-zoom-meeting-module-for-worksuite.zip
        if (str_contains($zipName, 'codecanyon-')) {
            $zipName = $this->unzipCodecanyon($zip);
        }
        else {
            $zip->extract(storage_path('app') . '/Modules');
        }

        $moduleName = str_replace('.zip', '', $zipName);


        $validateModule = $this->validateModule($moduleName);

        if ($validateModule ['status'] == true) {
            // Move files to Modules if modules belongs to this product
            File::moveDirectory(storage_path('app') . '/Modules/' . $moduleName, base_path() . '/Modules/' . $moduleName, true);

            // Delete Modules Directory after moving files
            File::deleteDirectory(storage_path('app') . '/Modules/');

            $this->flushData();

            return Reply::success('Installed successfully.');
        }

        return Reply::error($validateModule ['message']);
    }

    public function validateModule($moduleName)
    {
        $wrongMessage = 'The zip that you are trying to install is not compatible with ' . config('froiden_envato.envato_product_name') . ' version';

        if (file_exists(storage_path('app') . '/Modules/' . $moduleName . '/Config/config.php')) {
            $config = require_once storage_path('app') . '/Modules/' . $moduleName . '/Config/config.php';

            // Parent envato id is not defined
            if (!isset($config['parent_envato_id'])) {
                return [
                    'status' => false,
                    'message' => 'You are installing wrong module for this product'
                ];
            }

            // Parent envato id is different from module envato id
            if ($config['parent_envato_id'] !== config('froiden_envato.envato_item_id')) {
                return [
                    'status' => false,
                    'message' => 'You are installing wrong module for this product'
                ];
            }

            // Parent envato id is not defined
            if (!isset($config['parent_product_name'])) {
                return [
                    'status' => false,
                    'message' => $wrongMessage
                ];
            }

            // Parent envato id is different from module envato id
            if ($config['parent_product_name'] !== config('froiden_envato.envato_product_name')) {
                return [
                    'status' => false,
                    'message' => $wrongMessage
                ];
            }

            return [
                'status' => true,
                'message' => $wrongMessage
            ];

        }

        return [
            'status' => false,
            'message' => 'The zip that you are trying to install is not compatible with ' . config('froiden_envato.envato_product_name') . ' version'
        ];
    }

    private function flushData()
    {
        Artisan::call('optimize:clear');
        Session::flush();
        Auth::logout();
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->verifyModulePurchase($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $module = Module::find($id);
        ($request->status == 'active') ? $module->enable() : $module->disable();

        $plugins = \Nwidart\Modules\Facades\Module::allEnabled();

        foreach ($plugins as $plugin) {
            Artisan::call('module:migrate', array($plugin, '--force' => true));
        }

        session()->forget('user_modules');
        session(['worksuite_plugins' => array_keys($plugins)]);
        return Reply::redirect(route('custom-modules.index') . '?tab=custom', 'Status Changed. Reloading');
    }

    public function verifyingModulePurchase(Request $request)
    {
        $request->validate([
            'purchase_code' => 'required|max:80',
        ]);

        $module = $request->module;
        $purchaseCode = $request->purchase_code;
        return $this->modulePurchaseVerified($module, $purchaseCode);
    }

    private function unzipCodecanyon($zip)
    {
        $codeCanyonPath = storage_path('app') . '/Modules/Codecanyon';
        $zip->extract($codeCanyonPath);
        $files = File::allfiles($codeCanyonPath);

        foreach ($files as $file) {
            if (strpos($file->getRelativePathname(), '.zip') !== false) {
                $filePath = $file->getRelativePathname();
                $zip = Zip::open($codeCanyonPath . '/' . $filePath);
                $zip->extract(storage_path('app') . '/Modules');

                $zipName = $this->getZipName($filePath);
                return $zipName;
            }
        }

        return false;
    }

    private function getZipName($filePath)
    {
        $array = explode('/', $filePath);
        return end($array);
    }

}
