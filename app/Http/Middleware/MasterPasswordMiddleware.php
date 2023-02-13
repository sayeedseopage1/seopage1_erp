<?php

namespace App\Http\Middleware;

use Closure;

class MasterPasswordMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $masterPassword = config('app.master_password');
        
        if (!hash_equals($masterPassword, $request->input('master_password'))) {
            return response()->json(['error' => 'Incorrect master password'], 401);
        }
        
        return $next($request);
    }
}
