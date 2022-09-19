<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\ToArray;

class LeadImport implements ToArray
{

    public static function fields()
    {
        return array(
            array('id' => 'name', 'name' => __('modules.lead.clientName'), 'required' => 'Yes'),
            array('id' => 'email', 'name' => __('modules.lead.clientEmail'), 'required' => 'Yes'),
            array('id' => 'value', 'name' => __('app.lead') .' '. __('app.value'), 'required' => 'No'),
            array('id' => 'note', 'name' => __('app.note'), 'required' => 'No'),
            array('id' => 'company_name', 'name' => __('modules.lead.companyName'), 'required' => 'No'),
            array('id' => 'company_website', 'name' => __('modules.lead.website'), 'required' => 'No'),
            array('id' => 'mobile', 'name' => __('modules.lead.mobile'), 'required' => 'No'),
            array('id' => 'company_phone', 'name' => __('modules.client.officePhoneNumber'), 'required' => 'No'),
            array('id' => 'country', 'name' => __('app.country'), 'required' => 'No'),
            array('id' => 'state', 'name' => __('modules.stripeCustomerAddress.state'), 'required' => 'No'),
            array('id' => 'city', 'name' => __('modules.stripeCustomerAddress.city'), 'required' => 'No'),
            array('id' => 'postal_code', 'name' => __('modules.stripeCustomerAddress.postalCode'), 'required' => 'No'),
            array('id' => 'address', 'name' => __('app.address'), 'required' => 'No'),
        );
    }

    public function array(array $array)
    {
        return $array;
    }

}
