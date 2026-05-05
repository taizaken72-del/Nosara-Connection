const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid JSON." }),
    };
  }

  const { name, email, phone, needs, timeline } = body;

  if (!name || !email) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Name and email are required." }),
    };
  }

  const appPassword = process.env.GMAIL_APP_PASSWORD;
  if (!appPassword) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Email service not configured." }),
    };
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

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to send email. Please try again." }),
    };
  }
};
