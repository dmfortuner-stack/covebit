const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { customerEmail, customerName, orderDetails } = req.body;

  if (!customerEmail || !customerName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await resend.emails.send({
      from: 'dm@covebit.co.uk',
      to: 'dm@covebit.co.uk',
      subject: `New order/query from ${customerName}`,
      text: `From: ${customerEmail}\n\nDetails:\n${orderDetails}`,
    });

    await resend.emails.send({
      from: 'dm@covebit.co.uk',
      to: customerEmail,
      subject: 'We received your request — Covebit IT Support',
      text: `Hi ${customerName},\n\nThanks for reaching out. We've received your request and will be in touch shortly.\n\n— Covebit IT Support`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send failed:', error);
    res.status(500).json({ success: false, error: 'Failed to send' });
  }
};
