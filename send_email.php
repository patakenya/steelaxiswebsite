<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Make sure PHPMailer is installed via Composer

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data safely
    $name    = $_POST['name']    ?? '';
    $email   = $_POST['email']   ?? '';
    $phone   = $_POST['phone']   ?? '';
    $service = $_POST['service'] ?? '';
    $details = $_POST['details'] ?? '';

    // Basic validation
    if (empty($name) || empty($email) || empty($service) || empty($details)) {
        die("Please fill in all required fields.");
    }

    $mail = new PHPMailer(true);

    try {
        // SMTP settings
        $mail->isSMTP();
        $mail->Host       = 'smtp-relay.brevo.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = '8f3ce1001@smtp-brevo.com';
        $mail->Password   = '0AZMnX4sCbTS62hp';
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Email headers
        $mail->setFrom($email, $name);
        $mail->addAddress('edwinkkimemia@gmail.com', 'Steel Axis Enquiry'); // Change to your actual recipient

        // Email content
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

        $mail->AltBody = "Quote Request from $name\n"
                       . "Email: $email\n"
                       . "Phone: $phone\n"
                       . "Service: $service\n"
                       . "Details:\n$details";

        $mail->send();
        echo "Message has been sent";
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
