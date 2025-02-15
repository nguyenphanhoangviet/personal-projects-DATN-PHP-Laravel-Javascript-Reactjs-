<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class OrderInvoiceMail extends Mailable  implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $order;

    public function __construct($order)
    {
        $this->order = $order;
    }

    public function build()
    {
        return $this->from(env('MAIL_FROM_ADDRESS'))
                    ->subject('Order Invoice from ' . config('app.name'))
                    ->view('emails.order-invoice')
                    ->with([
                        'order' => $this->order,
                    ]);
    }
}
