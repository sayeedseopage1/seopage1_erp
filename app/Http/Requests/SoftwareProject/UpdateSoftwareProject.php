<?php

namespace App\Http\Requests\SoftwareProject;

use App\Http\Requests\CoreRequest;
use App\Models\CustomField;
use App\Models\SoftwareProject;

class UpdateSoftwareProject extends CoreRequest
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
        $rules = [
            'project_name' => 'required|max:150',
            'start_date' => 'required',
            'deadline' => 'required',
            'project_summary'=>'required',
          

            // 'hours_allocated' => 'required|numeric',
           
            'project_code' => 'required|unique:projects,project_short_code,'.$this->route('project'),
        ];

        if (!$this->has('without_deadline')) {
            $rules['deadline'] = 'required';
        }

        
        $project = SoftwareProject::find(request()->project_id);

       

      

        return $rules;
    }

   

   

}
