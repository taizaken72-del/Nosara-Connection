import { Router } from "express";
import { getUncachableResendClient } from "../lib/resend.js";

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

  try {
    const { client, fromEmail } = await getUncachableResendClient();

    const from = fromEmail ?? "onboarding@resend.dev";
    const needsList = Array.isArray(needs) && needs.length > 0
      ? needs.map((n) => `• ${n}`).join("\n")
      : "Not specified";

    await client.emails.send({
      from,
      to: "ronslistnosara@gmail.com",
      reply_to: email,
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
