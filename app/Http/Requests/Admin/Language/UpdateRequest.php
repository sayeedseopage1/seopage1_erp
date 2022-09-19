<?php

namespace App\Http\Requests\Admin\Language;

use App\Http\Requests\CoreRequest;

class UpdateRequest extends CoreRequest
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
            'language_name' => 'required|max:30|unique:language_settings,language_name,'.$this->route('id'),
            'language_code'  => 'required|max:10|unique:language_settings,language_code,'.$this->route('id'),
            'status'  => 'required',
            'flag' => 'required',
        ];
    }

}
