<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đặt Lại Mật Khẩu</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <h1>Đặt Lại Mật Khẩu</h1>
        <form action="{{ route('password.update') }}" method="POST">
            @csrf
            <input type="hidden" name="token" value="{{ $token }}">
            <div class="form-group">
                <label for="email">Địa chỉ email:</label>
                <input type="email" name="email" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="password">Mật khẩu mới:</label>
                <input type="password" name="password" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="password_confirmation">Xác nhận mật khẩu mới:</label>
                <input type="password" name="password2" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary">Đặt lại mật khẩu</button>
        </form>
    </div>
</body>
</html>
