<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mail Coupon</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
        }

        .coupon {
            border: 5px dotted #bbb;
            width: 80%;
            border-radius: 15px;
            margin: 0 auto;
            max-width: 600px;
        }

        .container {
            padding: 2px 16px;
            background-color: #f1f1f1;
        }

        .promo {
            background: #ccc;
            padding: 3px;
        }

        .expire {
            color: red;
        }

        p.code {
            text-align: center;
            font-size: 20px;
        }

        p.expire {
            color: red;
        }

        h2.note {
            text-align: center;
            font-size: large;
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <div class="coupon">
        <div class="container">
            <h3>Mã khuyến mãi khách từ Nhà thuốc Yên tâm <a target="_blank"
                    href="https:://nhathuocyentam.com">https:://nhathuocyentam.com</a></h3>
        </div>
        <div class="container" style="background-color: white">
            <h2 class="note">
                <b><i>
                        @if ($coupon['condition'] == 1)
                            Giảm {{ $coupon['number'] }}%
                        @else
                            Giảm {{ number_format($coupon['number'], 0, ',', '.') }}₫
                        @endif

                        cho tổng đơn hàng mua
                    </i></b>
            </h2>

            <p>Quý khách đã từng mua hàng tại Nhà thuốc Yên tâm <a target="_blank" style="color: red"
                    href="">https:://nhathuocyentam.com</a> nếu đã có tài khoản xin vui lòng <a target="_blank"
                    style="color: red" href="">đăng nhập</a> vào tài khoản để mua hàng và nhập mã code phía dưới
                để được giảm giá mua hàng, xin cảm ơn quý khách.Chúc quý khách thật nhiều sức khỏe và bình an trong cuộc
                sống. </p>
        </div>
        <div class="container">
            <p class="code">Sử dụng mã: <span class="promo">{{ $coupon['code'] }}</span> với chỉ {{$coupon['time']}} mã giảm giá, nhanh tay kẻo hết! </p>
            <p class="expire">
                Ngày bắt đầu: {{ $coupon['date_start'] }} / Ngày hết hạn: {{ $coupon['date_end'] }}
            </p>
        </div>
    </div>
</body>

</html>
