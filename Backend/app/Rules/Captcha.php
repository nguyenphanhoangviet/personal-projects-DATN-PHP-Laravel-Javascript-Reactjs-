<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use ReCaptcha\ReCaptcha;

class Captcha implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        //
        $recaptcha = new ReCaptcha(env('CAPTCHA_SECRET'));
        $response = $recaptcha->verify($value, $_SERVER['REMOTE_ADDR']);

        if (!$response->isSuccess()) {
            $fail($this->message());
        }
    }

    // public function passes(string $attribute, mixed $value, Closure $fail): void
    // {
    //     //
    //     $recaptcha = new ReCaptcha(env('CAPTCHA_SECRET'));
    //     $response = $recaptcha->verify($value,$_SERVER['REMOTE_ADDR']);
    //     return $response->isSuccess();
    // }

    public function message(){
        return 'Vui lòng hoàn thành recaptcha để gửi biểu mẫu.';
    }
}
