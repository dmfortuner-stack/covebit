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
      subject: 'Booking Confirmation & Terms — Covebit IT Support',
      text: `Hi ${customerName},\n\nThank you for scheduling your IT support session with Covebit. We have received your booking request and will be in touch shortly.\n\n==================================================\nBOOKING SUMMARY\n==================================================\n${orderDetails}\n\n==================================================\nBOOKING TERMS & IMMEDIATE-START CONFIRMATION\n==================================================\nTrader: D. Meena trading as Covebit (Wembley, London | dm@covebit.co.uk | +44 7979 515140)\nTerms and Conditions: https://covebit.co.uk/terms.html\n\nBooking Summary Table:\n• Service Delivery: Remote IT Support (Quick Assist / AnyDesk)\n• Cancellation: Full refund if cancelled 2+ hours prior to session; £25 fee within 2 hours\n• Consumer Cooling-Off: 14-day statutory right under Consumer Contracts Regulations 2013\n• Immediate-Start Request: Booked fee is payable once the session starts\n• Guarantee: No-Fix No-Fee policy\n\nImmediate-Start Confirmation:\n"I request that work starts before the 14-day cooling-off period ends. I understand that once the session starts, the booked fee is payable as set out in the Covebit Terms and Conditions."\n\nIf you can't find our email, please check your Spam/Junk folder. Remember to whitelist us and save our email to your contacts so you don't miss future updates. Thanks!\n\n— Covebit IT Support\nD. Meena | Senior IT Systems Engineer`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send failed:', error);
    res.status(500).json({ success: false, error: 'Failed to send' });
  }
};
