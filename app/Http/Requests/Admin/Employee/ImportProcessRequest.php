<?php

namespace App\Http\Requests\Admin\Employee;

use Illuminate\Foundation\Http\FormRequest;

class ImportProcessRequest extends FormRequest
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
            'file' => 'required',
            'has_heading' => 'nullable|boolean',
            'columns' => ['required', 'array', 'min:1'],
        ];
    }

    public function attributes()
    {
        return [
            'columns.*' => 'column',
        ];
    }

}
