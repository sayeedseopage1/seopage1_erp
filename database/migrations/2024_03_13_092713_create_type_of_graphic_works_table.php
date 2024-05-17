<?php

use Illuminate\Support\Facades\DB;
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
        Schema::create('type_of_graphic_works', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        DB::table('type_of_graphic_works')->insert([
            ['name' => 'Logo'],
            ['name' => 'Banner'],
            ['name' => 'Brochure'],
            ['name' => 'Company profile'],
            ['name' => 'Image retouching'],
            ['name' => 'Background removal'],
            ['name' => 'Illustration'],
            ['name' => 'Motion graph'],
            ['name' => 'Others']
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('type_of_graphic_works');
    }
};
