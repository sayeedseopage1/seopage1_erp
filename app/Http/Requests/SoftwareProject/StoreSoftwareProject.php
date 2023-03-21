<?php

namespace App\Http\Requests\SoftwareProject;

use App\Http\Requests\CoreRequest;
use App\Models\CustomField;

class StoreSoftwareProject extends CoreRequest
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
        $setting = global_setting();

        $rules = [
            'project_name' => 'required|max:150',
            'start_date' => 'required|date_format:"' . $setting->date_format . '"',
           
           
        ];

      

        if (!$this->has('without_deadline')) {
            $rules['deadline'] = 'required|date_format:"' . $setting->date_format . '"|after_or_equal:start_date';
        }

    //dd($rules);
       

        return $rules;
    }

   
    
}
