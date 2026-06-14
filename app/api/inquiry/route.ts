import { NextRequest, NextResponse } from 'next/server'
import { site } from '@/config/site'
import { getResend, FROM_EMAIL, OWNER_EMAIL, buildOwnerEmailHtml, buildClientEmailHtml } from '@/lib/resend'
import { checkForSpam } from '@/lib/spam'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, whatsapp, eventDate, readyTime, occasion, familyLook, message, website, formAgeMs } = body

    // Fold the family-wedding look choice into the occasion string so the
    // subject line and email read e.g. "Family wedding (Full glam)".
    const occasionFull = familyLook ? `${occasion} (${familyLook})` : occasion

    // Spam check (honeypot + time + URL count). We return a 200 OK to the
    // client either way so bots don't learn what triggered the rejection —
    // they just think the form worked. Real users never trip these checks.
    const spamCheck = checkForSpam({ honeypot: website, formAgeMs, message })
    if (!spamCheck.ok) {
      console.warn(`[Inquiry] Spam blocked — reason: ${spamCheck.reason}, from: ${email || 'unknown'}`)
      return NextResponse.json({ success: true })
    }

    if (!name || !email || !whatsapp || !occasion) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const resend = getResend()
    const subjectDate = eventDate ? ` on ${eventDate}` : ''
    const [ownerResult, clientResult] = await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: OWNER_EMAIL,
        // Reply goes to the client; From stays on the verified domain (SPF/DKIM).
        replyTo: `${name} <${email}>`,
        subject: `New inquiry from ${name} — ${occasionFull}${subjectDate}`,
        html: buildOwnerEmailHtml({ name, email, whatsapp, eventDate, readyTime, occasion: occasionFull, message }),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `Your inquiry is received — ${site.name}`,
        html: buildClientEmailHtml(name),
      }),
    ])

    if (ownerResult.error || clientResult.error) {
      console.error('Resend error:', ownerResult.error ?? clientResult.error)
      return NextResponse.json({ error: 'Email failed to send' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Inquiry route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
