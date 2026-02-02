package org.example.vietuc.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender mailSender;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactMail(
            String to,
            String name,
            String email,
            String phone,
            String message
    ) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom("vietucsteel@gmail.com");
        mail.setTo(to);
        mail.setSubject("📩 Liên hệ mới từ website VIETUC");

        mail.setText(
                "Bạn vừa nhận được một liên hệ mới:\n\n" +
                        "Họ tên: " + name + "\n" +
                        "Email: " + email + "\n" +
                        "Số điện thoại: " + phone + "\n\n" +
                        "Nội dung:\n" + message
        );

        mailSender.send(mail);
    }
}