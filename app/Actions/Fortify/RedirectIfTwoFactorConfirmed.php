<?php

namespace App\Actions\Fortify;

use App\Events\TwoFactorCodeEvent;
use Laravel\Fortify\TwoFactorAuthenticatable;

class RedirectIfTwoFactorConfirmed extends RedirectIfTwoFactorAuthenticatable
{

    public function handle($request, $next)
    {
        $user = $this->validateCredentials($request);


        if (optional($user)->two_factor_confirmed && ($user->two_fa_verify_via == 'both' || $user->two_fa_verify_via == 'google_authenticator') &&
            in_array(TwoFactorAuthenticatable::class, class_uses_recursive($user))) {
            return $this->twoFactorChallengeResponse($request, $user);
        }

        if(optional($user)->two_factor_email_confirmed && ($user->two_fa_verify_via == 'email' || $user->two_fa_verify_via == 'both') &&
        in_array(TwoFactorAuthenticatable::class, class_uses_recursive($user))) {
            // Send otp to user from here
            $user->generateTwoFactorCode();
            event(new TwoFactorCodeEvent($user));
            return $this->twoFactorChallengeResponse($request, $user);
        }

        return $next($request);
    }

}
