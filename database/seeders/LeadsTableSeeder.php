<?php
namespace Database\Seeders;

use App\Models\LeadAgent;
use App\Models\LeadSource;
use App\Models\LeadStatus;
use App\Models\UniversalSearch;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Traits\UniversalSearchTrait;

class LeadsTableSeeder extends Seeder
{
    use UniversalSearchTrait;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('leads')->delete();

        DB::statement('ALTER TABLE leads AUTO_INCREMENT = 1');

        $count = env('SEED_PROJECT_RECORD_COUNT', 20);
        $faker = \Faker\Factory::create();

        \App\Models\Lead::factory()->count((int)$count)->create()->each(function ($lead) use($faker) {
            $lead->agent_id = $faker->randomElement($this->getLeadAgent()); /* @phpstan-ignore-line */
            $lead->source_id = $faker->randomElement($this->getLeadSource()); /* @phpstan-ignore-line */
            $lead->status_id = $faker->randomElement($this->getLeadStatus()); /* @phpstan-ignore-line */
            $lead->save();
        });
    }

    private function getLeadAgent()
    {
        return LeadAgent::with('user')->get()->pluck('id')->toArray();
    }

    private function getLeadStatus()
    {
        return LeadStatus::get()->pluck('id')->toArray();
    }

    private function getLeadSource()
    {
        return LeadSource::get()->pluck('id')->toArray();
    }

}
