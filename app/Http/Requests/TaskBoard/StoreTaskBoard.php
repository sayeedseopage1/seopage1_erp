<?php

namespace App\Http\Requests\TaskBoard;

use App\Http\Requests\CoreRequest;

class StoreTaskBoard extends CoreRequest
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
            'column_name' => 'required|unique:taskboard_columns,column_name',
            'label_color' => 'required'
        ];
    }

}
