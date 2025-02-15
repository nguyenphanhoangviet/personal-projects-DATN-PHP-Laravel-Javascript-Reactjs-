<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hóa Đơn Đặt Hàng Của Bạn</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        h3 {
            color: #444;
        }
        p {
            line-height: 1.5;
            color: #555;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            background: #f1f1f1;
            margin: 5px 0;
            padding: 10px;
            border-radius: 4px;
        }
        .total {
            font-weight: bold;
            font-size: 1.2em;
            margin-top: 10px;
            color: #d9534f;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Cảm ơn bạn đã mua hàng, {{ $order->user->name }}!</h1>
        <p>Dưới đây là chi tiết đơn hàng của bạn:</p>

        <h3>Đơn hàng #{{ $order->id }}</h3>
        <ul>
            @foreach($order->items as $item)
                <li>
                    {{ $item->product->name }} - Số lượng: {{ $item->quantity }} - Giá:  {{number_format($item->price, 0, ',', '.') . ' VND'}};
                </li>
            @endforeach
        </ul>

        <p class="total">Tổng cộng: {{ $order->total }} VND</p>

        <p>Chúng tôi hy vọng sẽ gặp lại bạn sớm!</p>
        <p>Trân trọng,</p>
        <p>Đội ngũ {{ config('app.name') }}</p>
        <div class="footer">
            <p>Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi qua email này.</p>
        </div>
    </div>
</body>
</html>
