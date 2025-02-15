<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đặt Lại Mật Khẩu</title>
</head>
<body>
    <h1>Xin chào!</h1>
    <p>Chúng tôi nhận thấy bạn đã yêu cầu đặt lại mật khẩu. Vui lòng nhấp vào liên kết bên dưới để đặt lại mật khẩu của bạn:</p>
    <p>
        <a href="{{ url('password/reset', $token) }}">Đặt lại mật khẩu</a>
    </p>
    <p>Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này.</p>
    <p>Trân trọng,</p>
    <p>Đội ngũ {{ config('app.name') }}</p>
</body>
</html>
