import { NextRequest, NextResponse } from 'next/server'
import { site } from '@/config/site'
import { getResend, FROM_EMAIL, OWNER_EMAIL, buildOwnerEmailHtml, buildClientEmailHtml } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, whatsapp, eventDate, serviceType, numPeople, city, startTime, vision } = body

    if (!name || !email || !whatsapp) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const resend = getResend()
    const [ownerResult, clientResult] = await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: OWNER_EMAIL,
        subject: `New inquiry from ${name} — ${serviceType || 'Makeup'} on ${eventDate || 'TBD'}`,
        html: buildOwnerEmailHtml({ name, email, whatsapp, eventDate, serviceType, numPeople, city, startTime, vision }),
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
