<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GetSalesPolicyPageTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $user = User::where('email', 'riad1@seopage1.net')->first();

        $response = $this->actingAs($user)->get('account/sales-risk-policies');

        // $response->ddHeaders();
        // $response->;
        $response->assertStatus(200);
    }
}
