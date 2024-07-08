<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserLoginTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $user = User::where('email', 'riad1@seopage1.net')->first();

        $response = $this->post('/login', [
            'email' => 'riad1@seopage1.net',
            'password' => '12345678',
        ]);

        $response->assertRedirect('account/dashboard');
        $this->assertAuthenticatedAs($user);
    }
}
