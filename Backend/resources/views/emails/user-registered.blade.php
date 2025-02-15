<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chào Mừng đến với Website bán thuốc Yên Tâm</title>
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
        p {
            line-height: 1.5;
            color: #555;
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
        <h1>Xin chào, {{ $userName }}!</h1>
        <p>Cảm ơn bạn đã đăng ký trên Website bán thuốc Yên Tâm. Chúng tôi rất vui mừng được chào đón bạn!</p>
        <p>Trân trọng,</p>
        <p>Đội ngũ {{ config('app.name') }}</p>
        <div class="footer">
            <p>Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi qua email này.</p>
        </div>
    </div>
</body>
</html>

