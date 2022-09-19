<?php

namespace App\Console\Commands;

use App\Http\Controllers\RolePermissionController;
use Illuminate\Console\Command;

class AddMissingRolePermission extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'add-missing-permissions';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add missing permissions';

    /**
     * Execute the console command.
     *
     * @return bool
     */
    public function handle()
    {
        $rolePerm = new RolePermissionController();
        $rolePerm->addMissingAdminPermission();
        $rolePerm->addMissingEmployeePermission();

        return true;
    }

}
