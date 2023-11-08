<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Cookie;

class ClearCookiesMiddleware
{
    public function handle($request, Closure $next)
    {
        if ($request->is('/account/leads')) {
            // Clear the cookies for the specific URL.
            Cookie::queue(Cookie::forget('cookie_name_to_clear'));
        }

        return $next($request);
    }
}
