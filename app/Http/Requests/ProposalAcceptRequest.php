<?php

namespace App\Http\Requests;

use App\Models\Proposal;
use Illuminate\Foundation\Http\FormRequest;

class ProposalAcceptRequest extends FormRequest
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

        if (request('type') == 'accept') {

            $rules['full_name'] = 'required';
            $rules['email'] = 'required|email:rfc';

            $proposal = Proposal::find(request('id'));

            if ($proposal && $proposal->signature_approval == 1) {
                if(request('signature_type') == 'upload'){
                    $rules['image'] = 'required';
                }
                else {
                    $rules['signature'] = 'required';
                }
            }

        }

        return $rules;
    }

}
