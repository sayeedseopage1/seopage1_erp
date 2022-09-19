<?php

namespace App\Http\Requests\GoogleCaptcha;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGoogleCaptchaSetting extends FormRequest
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

        if ($this->has('google_recaptcha_status')) {
            $rules = [
                'version' => 'required_if:google_recaptcha_status,active',
                'google_recaptcha_v2_site_key' => 'required_if:version,v2',
                'google_recaptcha_v2_secret_key' => 'required_if:version,v2',
                'google_recaptcha_v3_site_key' => 'required_if:version,v3',
                'google_recaptcha_v3_secret_key' => 'required_if:version,v3',
            ];
        }

        return $rules;

    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'google_captcha2_site_key.required_if' => 'Site key is required',
            'google_captcha2_secret.required_if' => 'Secret key is required',
            'google_captcha3_site_key.required_if' => 'Site key is required',
            'google_captcha3_secret.required_if' => 'Secret key is required',
        ];
    }

}
