<?php

namespace Database\Factories;

use App\Models\Currency;
use App\Models\Project;
use App\Models\ProjectCategory;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Project::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $projectArray = [
            'Create Design',
            'Bug Fixes',
            'Install Application',
            'Tars',
            'Picard',
            'Cli-twitter',
            'Modify Application',
            'Odyssey',
            'Angkor',
            'Server Installation',
            'Web Installation',
            'Project Management',
            'User Management',
            'Eyeq',
            'School Management',
            'Restaurant Management',
            'Examination System Project',
            'Cinema Ticket Booking System',
            'Airline Reservation System',
            'Website Copier Project',
            'Chat Application',
            'Payment Billing System',
            'Identification System',
            'Document management System',
            'Live Meeting'
        ];

        $startDate = now()->subMonths($this->faker->numberBetween(1, 6));
        $categoryId = ProjectCategory::inRandomOrder()->first()->id;
        $currencyId = Currency::first()->id;
        $admin = User::join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->where('roles.name', 'admin')
            ->select('users.id')
            ->first();
        $clientId = User::join('role_user', 'role_user.user_id', '=', 'users.id')
            ->leftJoin('client_details', 'users.id', '=', 'client_details.user_id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->select('users.id', 'users.name', 'client_details.company_name', 'users.email', 'users.created_at')
            ->where('roles.name', 'client')
            ->inRandomOrder()
            ->first();

        $projectName = $this->faker->unique()->randomElement($projectArray); /* @phpstan-ignore-line */

        return [
            'project_name' => $projectName,
            'project_summary' => $this->faker->paragraph,
            'start_date' => $startDate->format('Y-m-d'),
            'deadline' => $startDate->addMonths(4)->format('Y-m-d'),
            'notes' => $this->faker->paragraph,
            'category_id' => $categoryId,
            'currency_id' => $currencyId,
            'client_id' => $clientId->id,
            'completion_percent' => $this->faker->numberBetween(40, 100),
            'feedback' => $this->faker->realText(200),
            'added_by' => $admin->id,
            'project_short_code' => $this->initials($projectName),
        ];
    }

    protected function initials($str)
    {
        $ret = '';

        foreach (explode(' ', $str) as $word) {
            $ret .= strtoupper($word[0]);
        }
        
        return $ret;
    }

}
