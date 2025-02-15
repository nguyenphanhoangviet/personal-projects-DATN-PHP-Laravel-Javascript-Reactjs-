<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cảm ơn bạn đã liên hệ</title>
</head>
<body>
    <h1>Cảm ơn bạn đã liên hệ với chúng tôi!</h1>
    <p>Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi sớm nhất có thể.</p>
    <p><strong>Nội dung liên hệ:</strong></p>
    <p>Tên: {{ $contact->name }}</p>
    <p>Email: {{ $contact->email }}</p>
    <p>Tin nhắn: {{ $contact->message }}</p>
    <p>Trân trọng,</p>
    <p>Đội ngũ {{ config('app.name') }}</p>
</body>
</html>
