<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = $_POST['name']    ?? '';
    $email   = $_POST['email']   ?? '';
    $phone   = $_POST['phone']   ?? '';
    $service = $_POST['service'] ?? '';
    $details = $_POST['details'] ?? '';

    // Get the page where the form was submitted from
    $referer = $_SERVER['HTTP_REFERER'] ?? '/';

    if (empty($name) || empty($email) || empty($service) || empty($details)) {
        header("Location: {$referer}?success=0");
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp-relay.brevo.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = '8f3ce1001@smtp-brevo.com';
        $mail->Password   = '0AZMnX4sCbTS62hp';
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        $mail->setFrom($email, $name);
        $mail->addAddress('your@email.com', 'Steel Axis');

        $mail->isHTML(true);
        $mail->Subject = "New PPE Quote Request from $name";
        $mail->Body    = "
            <h3>Quote Request Details</h3>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Phone:</strong> {$phone}</p>
            <p><strong>Service Requested:</strong> {$service}</p>
            <p><strong>Project Details:</strong><br>" . nl2br(htmlspecialchars($details)) . "</p>
        ";

        $mail->AltBody = "Quote Request from $name\nEmail: $email\nPhone: $phone\nService: $service\nDetails:\n$details";

        $mail->send();
        header("Location: {$referer}?success=1");
    } catch (Exception $e) {
        header("Location: {$referer}?success=0");
    }
}
