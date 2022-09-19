<?php

namespace App\Http\Controllers;

use App\Helper\Files;

class ImageController extends Controller
{

    const FILE_PATH = 'quill-images';

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function store(\Illuminate\Http\Request $request)
    {

        $upload = Files::uploadLocalOrS3($request->image, self::FILE_PATH);
        $image = $this->encryptDecrypt($upload);
        return response()->json(route('image.getImage', $image));
    }

    public function getImage($imageEncrypted)
    {
        $imagePath = '';
        try {
            $decrypted = $this->encryptDecrypt($imageEncrypted, 'decrypt');
            $file_data = file_get_contents(asset_url_local_s3(self::FILE_PATH . '/' . $decrypted), false, stream_context_create([
                'ssl' => [
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                ],
            ]));

            $imagePath = \Image::make($file_data)->response();
        } catch (\Exception $e) {
            abort_if(true, 404);
        }

        return $imagePath;
    }

    private function encryptDecrypt($string, $action = 'encrypt')
    {

        $encryptMethod = 'AES-256-CBC';
        $secret_key = 'worksuite'; // User define private key
        $secret_iv = 'froiden'; // User define secret key
        $key = hash('sha256', $secret_key);
        $iv = substr(hash('sha256', $secret_iv), 0, 16); // sha256 is hash_hmac_algo

        if ($action == 'encrypt') {
            $output = openssl_encrypt($string, $encryptMethod, $key, 0, $iv);
            return base64_encode($output);
        }

        if ($action == 'decrypt') {
            return openssl_decrypt(base64_decode($string), $encryptMethod, $key, 0, $iv);
        }

    }

    public function cropper($element)
    {
        $this->element = $element;
        return view('theme-settings.ajax.cropper', $this->data);
    }

}
