<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Or include PHPMailer files manually

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp-relay.brevo.com';
        $mail->SMTPAuth = true;
        $mail->Username = '8f3ce1001@smtp-brevo.com';
        $mail->Password = '0AZMnX4sCbTS62hp';
        $mail->SMTPSecure = 'tls'; // or 'ssl'
        $mail->Port = 587;

        // Recipients
        $mail->setFrom('8f3ce1001@smtp-brevo.com', 'Website Contact');
        $mail->addAddress('edwinkkimemia@gmail.com', 'Edwin'); // where to send

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'New Form Submission';
        $mail->Body    = '
            <h3>New message from your website:</h3>
            <p><strong>Name:</strong> ' . htmlspecialchars($_POST['name']) . '</p>
            <p><strong>Email:</strong> ' . htmlspecialchars($_POST['email']) . '</p>
            <p><strong>Message:</strong><br>' . nl2br(htmlspecialchars($_POST['message'])) . '</p>
        ';

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
