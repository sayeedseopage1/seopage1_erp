<?php

namespace App\Observers;

use App\Models\CustomField;
use App\Models\LeadCustomForm;
use App\Models\TicketCustomForm;

class CustomFieldsObserver
{
    /**
     * Handle the CustomField "saving" event.
     *
     * @param  \App\Models\CustomField  $customField
     * @return void
     */

    public function created(CustomField $customField)
    {

        if($customField->custom_field_group_id == 8)
        {
            $leadField = new LeadCustomForm();

            if ($customField->required == 'yes') {
                $leadField->required = 1;
            }
            else{
                $leadField->required = 0;
            }

            $leadField->field_display_name = $customField->label;
            $leadField->custom_fields_id = $customField->id;
            $leadField->field_name = $customField->name;
            $leadField->save();

        }

        if($customField->custom_field_group_id == 10)
        {

            $ticketField = new TicketCustomForm();

            if ($customField->required == 'yes') {
                $ticketField->required = 1;
            }
            else{
                $ticketField->required = 0;
            }

            $ticketField->field_display_name = $customField->label;
            $ticketField->custom_fields_id = $customField->id;
            $ticketField->field_name = $customField->name;
            $ticketField->field_type = $customField->type;
            $ticketField->save();
        }

    }

    public function updated(CustomField $customField)
    {
        if($customField->custom_field_group_id === 8)
        {
            $id = $customField->id;
            $leadField = LeadCustomForm::firstWhere('custom_fields_id', $id);

            if ($customField->required == 'yes') {
                $leadField->required = 1;
            }
            else{
                $leadField->required = 0;
            }

            $leadField->field_display_name = $customField->label;
            $leadField->field_name = $customField->name;
            $leadField->save();
        }

        if($customField->custom_field_group_id === 10)
        {
            $id = $customField->id;
            $ticketField = TicketCustomForm::firstWhere('custom_fields_id', $id);

            if ($customField->required == 'yes') {
                $ticketField->required = 1;
            }
            else{
                $ticketField->required = 0;
            }

            $ticketField->field_display_name = $customField->label;
            $ticketField->custom_fields_id = $customField->id;
            $ticketField->field_name = $customField->name;
            $ticketField->field_type = $customField->type;
            $ticketField->save();
        }

    }

}

