<?php

namespace App\Http\Requests\KnowledgeBase;

use App\Http\Requests\CoreRequest;
use Illuminate\Foundation\Http\FormRequest;

class KnowledgeBaseCategoryStore extends CoreRequest
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
            'category_name' => 'required'
        ];
    }

}
