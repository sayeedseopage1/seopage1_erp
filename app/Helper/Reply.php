<?php

namespace App\Helper;

use Illuminate\Contracts\Validation\Validator;

class Reply
{

    /** Return success response
     * @param string $message
     * @return array
     */

    public static function success($message)
    {
        return [
            'status' => 'success',
            'message' => Reply::getTranslated($message)
        ];
    }

    /**
     * @param string $message
     * @param array $data
     * @return array
     */
    public static function successWithData($message, $data)
    {
        $response = Reply::success($message);

        return array_merge($response, $data);
    }

    /**
     * @param string $message
     * @param null $error_name
     * @param array $errorData
     * @return array
     */
    public static function error($message, $error_name = null, $errorData = [])
    {
        return [
            'status' => 'fail',
            'error_name' => $error_name,
            'data' => $errorData,
            'message' => Reply::getTranslated($message)
        ];
    }

    /** Return validation errors
     * @param \Illuminate\Validation\Validator|Validator $validator
     * @return array
     */
    public static function formErrors($validator)
    {
        return [
            'status' => 'fail',
            'errors' => $validator->getMessageBag()->toArray()
        ];
    }

    /** Response with redirect action. This is meant for ajax responses and is not meant for direct redirecting
     * to the page
     * @param string $url
     * @param null $message Optional message
     * @return array
     */
    public static function redirect($url, $message = null)
    {
        if ($message != null) {
            return [
                'status' => 'success',
                'message' => Reply::getTranslated($message),
                'action' => 'redirect',
                'url' => $url
            ];
        }

        return [
            'status' => 'success',
            'action' => 'redirect',
            'url' => $url
        ];

    }

    private static function getTranslated($message)
    {
        $trans = trans($message);

        if ($trans == $message) {
            return $message;
        }

        return $trans;

    }

    public static function dataOnly($data)
    {
        return $data;
    }

}
