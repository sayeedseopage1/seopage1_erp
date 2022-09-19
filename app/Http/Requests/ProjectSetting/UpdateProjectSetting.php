<?php

namespace App\Http\Requests\ProjectSetting;

use App\Http\Requests\CoreRequest;
use Illuminate\Validation\Rule;

class UpdateProjectSetting extends CoreRequest
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
            'send_reminder' => 'sometimes|required',
            'remind_to' => 'required_with:send_reminder',
            'remind_time' => 'required|integer|min:1',
            'remind_type' => ['required', Rule::in(['days'])]
        ];
    }

}
