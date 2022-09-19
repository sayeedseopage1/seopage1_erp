<?php

namespace App\Http\Requests\Leaves;

use App\Http\Requests\CoreRequest;

class UpdateLeave extends CoreRequest
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
            'user_id' => 'required',
            'leave_type_id' => 'required',
            'reason' => 'required'
        ];
    }

}
