<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Traits\IconTrait;
use Illuminate\Http\Request;
use App\Helper\Files;
use App\Models\Product;
use App\Models\ProductFiles;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class ProductFileController extends AccountBaseController
{
    use IconTrait;

    public function __construct()
    {
        parent::__construct();
        $this->pageIcon = __('icon-people');
        $this->pageTitle = 'app.menu.product';
    }

    /**
     * @param Request $request
     * @return array
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @throws \Throwable
     */
    public function store(Request $request)
    {
        if ($request->hasFile('file')) {

            $defaultImage = null;

            foreach ($request->file as $fileData) {
                $file = new ProductFiles();
                $file->product_id = $request->product_id;

                $filename = Files::uploadLocalOrS3($fileData, ProductFiles::FILE_PATH);

                $file->filename = $fileData->getClientOriginalName();
                $file->hashname = $filename;
                $file->size = $fileData->getSize();
                $file->save();

                if ($fileData->getClientOriginalName() == $request->default_image) {
                    $defaultImage = $filename;
                }

            }

            $product = Product::find($request->product_id);
            $product->default_image = $defaultImage;
            $product->save();

        }

        return Reply::success(__('messages.fileUploaded'));
    }

    public function updateImages(Request $request)
    {
        $defaultImage = null;

        if ($request->hasFile('file')) {
            foreach ($request->file as $file) {
                $productFile = new ProductFiles();
                $productFile->product_id = $request->product_id;
                $filename = Files::uploadLocalOrS3($file, 'products');
                $productFile->filename = $file->getClientOriginalName();
                $productFile->hashname = $filename;
                $productFile->size = $file->getSize();
                $productFile->save();

                if ($productFile->filename == $request->default_image) {
                    $defaultImage = $filename;
                }

            }
        }

        $product = Product::find($request->product_id);
        $product->default_image = $defaultImage ?: $request->default_image;
        $product->save();

        return Reply::success(__('messages.fileUploaded'));
    }

    /**
     * @param Request $request
     * @param int $id
     * @return array|void
     */
    public function destroy(Request $request, $id)
    {
        $file = ProductFiles::with('product')->findOrFail($id);

        $storage = config('filesystems.default');

        switch ($storage) {
        case 'local':
            File::delete(Files::UPLOAD_FOLDER.'/products/' . $file->hashname);
                break;
        case 's3':
            Storage::disk('s3')->delete(ProductFiles::FILE_PATH . '/' . $file->hashname);
                break;
        }

        ProductFiles::destroy($id);

        return Reply::success(__('messages.fileDeleted'));
    }

    public function download($id)
    {
        $file = ProductFiles::findOrFail($id);

        return download_local_s3($file, ProductFiles::FILE_PATH . '/' . $file->hashname);
    }

}
