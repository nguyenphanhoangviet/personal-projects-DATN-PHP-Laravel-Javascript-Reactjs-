<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class WelcomeMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $user;

    public function __construct($user)
    {
        $this->user = $user;
    }

    public function build()
    {
        return $this->from(env('MAIL_FROM_ADDRESS'))
                    ->subject('Welcome to Our Platform')
                    ->view('emails.user-registered')
                    ->with([
                        'userName' => $this->user->name,
                    ]);
    }




}
