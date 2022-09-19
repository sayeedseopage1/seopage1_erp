<?php

use App\Models\Contract;
use App\Models\Setting;
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
        Schema::create('contract_templates', function (Blueprint $table) {
            $table->id();

            $table->string('subject');
            $table->longText('description')->nullable();
            $table->string('amount');
            $table->unsignedBigInteger('contract_type_id');
            $table->foreign('contract_type_id')->references('id')->on('contract_types')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('currency_id')->unsigned()->nullable();
            $table->longText('contract_detail')->nullable();
            $table->foreign('currency_id')->references('id')
                ->on('currencies')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->integer('added_by')->default(1);
            $table->timestamps();
        });

        $setting = Setting::first();

        if ($setting) {
            Contract::query()->update(['currency_id' => $setting->currency_id]);

            $contractModule = \App\Models\Module::firstOrCreate(['module_name' => 'contracts']);
            $admins = \App\Models\RoleUser::where('role_id', '1')->get();
            $allTypePermission = \App\Models\PermissionType::where('name', 'all')->first();

            $perm = \App\Models\Permission::firstOrCreate([
                'name' => 'manage_contract_template',
                'display_name' => ucwords(str_replace('_', ' ', 'manage_contract_template')),
                'is_custom' => 1,
                'module_id' => $contractModule->id,
                'allowed_permissions' => '{"all":4, "added":1, "none":5}'
            ]);

            foreach ($admins as $item) {
                \App\Models\UserPermission::firstOrCreate(
                    [
                        'user_id' => $item->user_id,
                        'permission_id' => $perm->id,
                        'permission_type_id' => $allTypePermission->id
                    ]
                );
            }

            $proposalModule = \App\Models\Module::firstOrCreate(['module_name' => 'leads']);

            $perm = \App\Models\Permission::firstOrCreate([
                'name' => 'manage_proposal_template',
                'display_name' => ucwords(str_replace('_', ' ', 'manage_proposal_template')),
                'is_custom' => 1,
                'module_id' => $proposalModule->id,
                'allowed_permissions' => '{"all":4, "added":1, "none":5}'
            ]);

            foreach ($admins as $item){
                \App\Models\UserPermission::firstOrCreate(
                    [
                        'user_id' => $item->user_id,
                        'permission_id' => $perm->id,
                        'permission_type_id' => $allTypePermission->id
                    ]
                );
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

    }

};
