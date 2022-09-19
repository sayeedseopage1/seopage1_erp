<?php

namespace App\Http\Requests\ProposalTemplate;

use App\Http\Requests\CoreRequest;

class StoreRequest extends CoreRequest
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
            'sub_total' => 'required',
            'total' => 'required',
            'name' => 'required'
        ];
    }

}
