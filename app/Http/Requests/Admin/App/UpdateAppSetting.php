<?php

namespace App\Http\Requests\Admin\App;

use App\Http\Requests\CoreRequest;

class UpdateAppSetting extends CoreRequest
{

    /** @return true  */
    public function authorize()
    {
        return true;
    }

    /** @return array  */
    public function rules()
    {
        $rules = [];
        $rules['allowed_file_types'] = 'required';
        $rules['allowed_file_size'] = 'required|numeric|min:4|max:900000';

        if(!is_null($this->latitude)){
            $rules['latitude'] = 'required|numeric|min:-90|max:90';
        }

        if(!is_null($this->longitude)){
            $rules['longitude'] = 'required|numeric|min:-180|max:180';
        }

        return $rules;
    }

}
