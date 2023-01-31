<?php

namespace App\Http\Requests\Lead;

use App\Http\Requests\CoreRequest;

use Illuminate\Foundation\Http\FormRequest;

class StoreDealStageRequest extends CoreRequest
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

        $rules['client_username'] = 'required|unique:deal_stages',
        $rules['profile_link'] = 'required|url',
        $rules['message_link'] = 'required|url',
        $rules['comments'] = 'required|url',


      ];
        return $rules;

    }
    public function messages()
    {
        return [
            'client_username.required' =>  'Client username is required',
            'project_link.required.url' => 'Project link is required',
            'message_link.required.url' => 'Message link is required',
            'comments.required' => 'Comments is required',
        ];
    }

}
