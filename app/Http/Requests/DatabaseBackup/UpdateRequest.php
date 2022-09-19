<?php

namespace App\Http\Requests\DatabaseBackup;

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
        $rules = [];

        if(request()->get('status')){
            $rules['hour_of_day'] = 'required';
            $rules['backup_after_days'] = 'required|numeric|min:1';

            if (request()->get('delete_backup_after_days') == '-1') {
                $rules['delete_backup_after_days'] = 'required';
            }
            else {
                $rules['delete_backup_after_days'] = 'required|numeric|min:1';
            }
        }

        return $rules;
    }

}
