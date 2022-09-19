<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\ToArray;

class ClientImport implements ToArray
{

    public static function fields()
    {
        return array(
            array('id' => 'name', 'name' => __('modules.client.clientName'), 'required' => 'Yes'),
            array('id' => 'email', 'name' => __('app.email'), 'required' => 'Yes'),
            array('id' => 'mobile', 'name' => __('app.mobile'), 'required' => 'No'),
            array('id' => 'gender', 'name' => __('modules.employees.gender'), 'required' => 'No'),
            array('id' => 'company_name', 'name' => __('modules.client.companyName'), 'required' => 'No'),
            array('id' => 'address', 'name' => __('modules.accountSettings.companyAddress'), 'required' => 'No'),
            array('id' => 'city', 'name' => __('modules.stripeCustomerAddress.city'), 'required' => 'No'),
            array('id' => 'state', 'name' => __('modules.stripeCustomerAddress.state'), 'required' => 'No'),
            array('id' => 'postal_code', 'name' => __('modules.stripeCustomerAddress.postalCode'), 'required' => 'No'),
            array('id' => 'company_phone', 'name' => __('modules.client.officePhoneNumber'), 'required' => 'No'),
            array('id' => 'company_website', 'name' => __('modules.client.website'), 'required' => 'No'),
            array('id' => 'gst_number', 'name' => __('app.gstNumber'), 'required' => 'No'),
        );
    }

    public function array(array $array)
    {
        return $array;
    }

}
