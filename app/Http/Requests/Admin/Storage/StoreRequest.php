<?php

namespace App\Http\Requests\Admin\Storage;

use App\Http\Requests\CoreRequest;
use Illuminate\Foundation\Http\FormRequest;

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
        $rules = [];

        if ($this->has('storage') && $this->storage == 'aws_s3') {
            $rules = [
                'aws_key' => 'required|min:10|max:50',
                'aws_region' => 'required',
                'aws_secret' => 'required|min:30|max:60',
                'aws_bucket' => 'required',
            ];
        }

        return $rules;
    }

}
