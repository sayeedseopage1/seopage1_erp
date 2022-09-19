<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SlackWebhookRequest extends FormRequest
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

        if (request()->get('slack_status') == 'active') {
            $rules['slack_webhook'] = 'required|regex:/^((?:https?\:\/\/)(?:[-a-z0-9]+\.)*(slack(.*)))$/';
        }

        return $rules;
    }

    public function messages()
    {
        $message = __('validation.slack_webhook') . ' <a href="https://my.slack.com/services/new/incoming-webhook/" class="text-darkest-grey f-w-500" target="_blank"><u><i class="fa fa-external-link-alt"></i> ' . __('app.link') . '</u></a>';
        return [
            'slack_webhook.regex' => $message
        ];
    }

}
