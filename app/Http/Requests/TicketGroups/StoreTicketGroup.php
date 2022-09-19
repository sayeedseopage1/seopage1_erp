<?php

namespace App\Http\Requests\TicketGroups;

use App\Http\Requests\CoreRequest;

class StoreTicketGroup extends CoreRequest
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'group_name' => 'required|unique:ticket_groups'
        ];
    }

}
