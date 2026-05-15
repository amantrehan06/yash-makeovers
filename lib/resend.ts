import { Resend } from 'resend'
import { site } from '@/config/site'

export const FROM_EMAIL = `${site.name} <noreply@${site.domain}>`
export const OWNER_EMAIL = site.email

let _resend: Resend | null = null

export function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY ?? '')
  }
  return _resend
}

export function buildOwnerEmailHtml(data: {
  name: string
  email: string
  whatsapp: string
  eventDate: string
  serviceType: string
  numPeople: string
  city: string
  startTime: string
  vision: string
}): string {
  return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1C1410; background: #FAF8F4; padding: 40px; border-radius: 8px;">
      <h2 style="color: #A8834A; font-size: 24px; margin-bottom: 24px;">New Inquiry — ${site.name}</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #7A6A58; width: 40%;">Name</td><td style="padding: 8px 0; font-weight: 600;">${data.name}</td></tr>
        <tr><td style="padding: 8px 0; color: #7A6A58;">WhatsApp</td><td style="padding: 8px 0; font-weight: 600;">${data.whatsapp}</td></tr>
        <tr><td style="padding: 8px 0; color: #7A6A58;">Email</td><td style="padding: 8px 0; font-weight: 600;">${data.email}</td></tr>
        <tr><td style="padding: 8px 0; color: #7A6A58;">Event Date</td><td style="padding: 8px 0; font-weight: 600;">${data.eventDate}</td></tr>
        <tr><td style="padding: 8px 0; color: #7A6A58;">Service</td><td style="padding: 8px 0; font-weight: 600;">${data.serviceType}</td></tr>
        <tr><td style="padding: 8px 0; color: #7A6A58;">No. of People</td><td style="padding: 8px 0; font-weight: 600;">${data.numPeople}</td></tr>
        <tr><td style="padding: 8px 0; color: #7A6A58;">City/Location</td><td style="padding: 8px 0; font-weight: 600;">${data.city}</td></tr>
        <tr><td style="padding: 8px 0; color: #7A6A58;">Start Time</td><td style="padding: 8px 0; font-weight: 600;">${data.startTime}</td></tr>
      </table>
      <div style="margin-top: 24px; padding: 16px; background: #F3EFE8; border-radius: 6px;">
        <p style="color: #7A6A58; margin: 0 0 8px;">Vision / Inspiration</p>
        <p style="margin: 0; white-space: pre-wrap;">${data.vision}</p>
      </div>
    </div>
  `
}

export function buildClientEmailHtml(name: string): string {
  return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1C1410; background: #FAF8F4; padding: 40px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <p style="color: #A8834A; font-size: 13px; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 12px;">${site.name}</p>
        <h1 style="font-size: 28px; color: #1C1410; margin: 0;">Your inquiry is received</h1>
      </div>
      <p style="font-size: 16px; line-height: 1.7;">Dear ${name},</p>
      <p style="font-size: 16px; line-height: 1.7;">
        Thank you so much for reaching out! I'm thrilled you're considering ${site.name} for your special occasion.
        I have received your inquiry and will personally WhatsApp you within 24 hours to discuss your vision and availability.
      </p>
      <div style="background: #EDE7DC; border-radius: 8px; padding: 24px; margin: 28px 0;">
        <p style="margin: 0 0 12px; color: #A8834A; font-weight: 600; font-size: 15px;">A few things to know:</p>
        <ul style="margin: 0; padding-left: 20px; line-height: 1.9; color: #2E2118;">
          <li>No payment is required until we've spoken and agreed on all details.</li>
          <li>A ${site.policies.depositPercent}% deposit via e-transfer secures your date once you're ready to book.</li>
          <li>Deposits are non-refundable and non-transferable.</li>
          <li>I look forward to making you look and feel absolutely radiant!</li>
        </ul>
      </div>
      <p style="font-size: 16px; line-height: 1.7;">
        In the meantime, feel free to reach out anytime:
      </p>
      <p style="font-size: 16px; line-height: 1.7;">
        📱 WhatsApp: <a href="https://wa.me/${site.whatsapp}" style="color: #A8834A;">${site.phone}</a><br/>
        ✉️ Email: <a href="mailto:${site.email}" style="color: #A8834A;">${site.email}</a>
      </p>
      <p style="font-size: 16px; line-height: 1.7;">With love and excitement,<br/><strong>${site.artistName}</strong><br/><em>${site.name}</em></p>
      <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #E4DDD1; text-align: center; color: #9E8E7A; font-size: 13px;">
        <p>${site.address}<br/>${site.domain}</p>
      </div>
    </div>
  `
}
