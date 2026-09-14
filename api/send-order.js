const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    customerEmail,
    customerName,
    orderDetails,
    bookingRef,
    packageName,
    priceStr,
    stripeUrl,
    paypalUrl,
    isOnCall
  } = req.body;

  if (!customerEmail || !customerName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const refTag = bookingRef ? (bookingRef.startsWith('#') ? bookingRef : `#${bookingRef}`) : '';

  const clientText = [
    `Hi ${customerName},`,
    '',
    'Thank you for scheduling your IT support session with Covebit.',
    refTag ? `Your booking request has been received under reference ${refTag}.` : 'Your booking request has been received.',
    '',
    '==================================================',
    'BOOKING SUMMARY',
    '==================================================',
    orderDetails,
    '',
    '==================================================',
    'WHAT HAPPENS NEXT?',
    '==================================================',
    '1. Verification: D. Meena will contact you via phone or WhatsApp (+44 7979 515140) to confirm your session slot.',
    '2. Remote Session: You will receive a secure Quick Assist / AnyDesk link at your appointment time.',
    '3. Full Control: You watch the screen live and remain in complete control at all times.',
    '',
    'Need to make changes or have questions?',
    'Call/WhatsApp: +44 7979 515140',
    'Email: dm@covebit.co.uk',
    '',
    '— Covebit IT Support',
    'D. Meena | Senior IT Systems Engineer'
  ].filter(line => line !== undefined).join('\n');

  try {
    await resend.emails.send({
      from: 'dm@covebit.co.uk',
      to: 'dm@covebit.co.uk',
      subject: `New order/query from ${customerName}${refTag ? ` [${refTag}]` : ''}`,
      text: `From: ${customerEmail}\n\nDetails:\n${orderDetails}`,
    });

    await resend.emails.send({
      from: 'dm@covebit.co.uk',
      to: customerEmail,
      subject: `Booking Confirmation${refTag ? ` [${refTag}]` : ''} — Covebit IT Support`,
      text: clientText,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send failed:', error);
    res.status(500).json({ success: false, error: 'Failed to send' });
  }
};
