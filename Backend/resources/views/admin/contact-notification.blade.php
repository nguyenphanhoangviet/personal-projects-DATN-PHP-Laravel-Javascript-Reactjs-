<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Khách hàng đã liên hệ</title>
</head>
<body>
    <h1>Có khách hàng đã liên hệ với quản lí!</h1>

    <p><strong>Nội dung liên hệ:</strong></p>
    <p>Tên: {{ $contact->name }}</p>
    <p>Email: {{ $contact->email }}</p>
    <p>Tin nhắn: {{ $contact->message }}</p>

</body>
</html>
