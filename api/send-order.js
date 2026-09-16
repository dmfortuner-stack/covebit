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

  const isEnquiry = Boolean(req.body.isEnquiry || !bookingRef);

  let clientText;
  let clientSubject;

  if (isEnquiry) {
    let summaryContent = orderDetails;
    if (req.body.phone || req.body.message) {
      const summaryLines = [
        `Name           : ${customerName}`,
        `Email Address  : ${customerEmail}`,
      ];
      if (req.body.phone) summaryLines.push(`Contact Number : ${req.body.phone}`);
      if (req.body.subject) summaryLines.push(`Topic / Service: ${req.body.subject}`);
      summaryLines.push('');
      summaryLines.push('Message:');
      summaryLines.push(req.body.message || '');
      summaryContent = summaryLines.join('\n');
    }

    clientText = [
      `Hi ${customerName},`,
      '',
      'Thank you for contacting CoveBit. Your query has been received.',
      '',
      '==================================================',
      'QUERY SUMMARY',
      '==================================================',
      summaryContent,
      '',
      "We'll review your message and get back to you shortly.",
      '',
      'Need urgent assistance in the meantime?',
      'Call/WhatsApp: +44 7979 515140',
      'Email: dm@covebit.co.uk',
      '',
      '— CoveBit IT Support',
      'D. Meena | Senior IT Systems Engineer'
    ].join('\n');

    clientSubject = `Query Received — CoveBit IT Support`;
  } else {
    // Unaltered Booking Confirmation format
    const refTag = bookingRef ? (bookingRef.startsWith('#') ? bookingRef : `#${bookingRef}`) : '';

    clientText = [
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
      'AFTER PAYMENT CONFIRMATION',
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

    clientSubject = `Booking Confirmation${refTag ? ` [${refTag}]` : ''} — Covebit IT Support`;
  }

  const adminSubject = isEnquiry
    ? `New enquiry from ${customerName}`
    : `New order/query from ${customerName}${bookingRef ? ` [${bookingRef.startsWith('#') ? bookingRef : `#${bookingRef}`}]` : ''}`;

  try {
    await resend.emails.send({
      from: 'dm@covebit.co.uk',
      to: 'dm@covebit.co.uk',
      subject: adminSubject,
      text: `From: ${customerEmail}\n\nDetails:\n${orderDetails}`,
    });

    await resend.emails.send({
      from: 'dm@covebit.co.uk',
      to: customerEmail,
      subject: clientSubject,
      text: clientText,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send failed:', error);
    res.status(500).json({ success: false, error: 'Failed to send' });
  }
};
