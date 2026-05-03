import { Router } from "express";
import nodemailer from "nodemailer";

const contactRouter = Router();

contactRouter.post("/contact", async (req, res) => {
  const { name, email, phone, needs, timeline } = req.body as {
    name: string;
    email: string;
    phone?: string;
    needs?: string[];
    timeline?: string;
  };

  if (!name || !email) {
    res.status(400).json({ error: "Name and email are required." });
    return;
  }

  const appPassword = process.env.GMAIL_APP_PASSWORD;
  if (!appPassword) {
    req.log.error("GMAIL_APP_PASSWORD not set");
    res.status(500).json({ error: "Email service not configured." });
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ronslistnosara@gmail.com",
        pass: appPassword,
      },
    });

    const needsList =
      Array.isArray(needs) && needs.length > 0
        ? needs.map((n) => `• ${n}`).join("\n")
        : "Not specified";

    await transporter.sendMail({
      from: '"Ron\'s List" <ronslistnosara@gmail.com>',
      to: "ronslistnosara@gmail.com",
      replyTo: email,
      subject: `New Inquiry from ${name} — Ron's List`,
      text: [
        `New contact form submission from Ron's List`,
        ``,
        `Name:     ${name}`,
        `Email:    ${email}`,
        `WhatsApp: ${phone || "Not provided"}`,
        `Timeline: ${timeline || "Not specified"}`,
        ``,
        `What they need help with:`,
        needsList,
      ].join("\n"),
    });

    req.log.info({ name, email, phone, timeline, needs }, "Contact form email sent");
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send contact email");
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

export default contactRouter;
