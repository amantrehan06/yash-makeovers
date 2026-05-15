// Notifier — sends a single email to Yashpreet and the developer after each
// auto-published post. Email failure is non-fatal (the post is already live).

import { Resend } from 'resend'

export async function sendNotification({ post, slug, url }) {
  // Feature flag — set FEATURE_BLOG_NOTIFY=false to mute the
  // "new post published" email without disabling the engine itself.
  if (process.env.FEATURE_BLOG_NOTIFY === 'false') {
    console.log('🔕 Notifier disabled by FEATURE_BLOG_NOTIFY=false. Skipping.')
    return
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️  RESEND_API_KEY not set, skipping notification email')
    return
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const recipients = ['info@yashmakeovers.com']
  if (process.env.DEVELOPER_EMAIL) recipients.push(process.env.DEVELOPER_EMAIL)

  await resend.emails.send({
    from: 'Yash Makeovers Blog Engine <noreply@yashmakeovers.com>',
    to: recipients,
    subject: `New blog post published: ${post.title}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1C1410; background: #FAF8F4; padding: 40px; border-radius: 8px;">
        <p style="color: #A8834A; font-size: 13px; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 12px;">Yash Makeovers · Blog Engine</p>
        <h1 style="font-size: 24px; color: #1C1410; margin: 0 0 24px;">New blog post published automatically</h1>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
          <tr><td style="padding: 8px 0; color: #7A6A58; width: 35%;">Title</td><td style="padding: 8px 0; font-weight: 600;">${post.title}</td></tr>
          <tr><td style="padding: 8px 0; color: #7A6A58;">Category</td><td style="padding: 8px 0;">${post.category}</td></tr>
          <tr><td style="padding: 8px 0; color: #7A6A58;">Target keyword</td><td style="padding: 8px 0;">${post.targetKeyword}</td></tr>
          <tr><td style="padding: 8px 0; color: #7A6A58;">Read time</td><td style="padding: 8px 0;">${post.readTime}</td></tr>
        </table>

        <p style="margin: 0 0 24px;">
          <a href="${url}" style="display: inline-block; padding: 12px 24px; background: #A8834A; color: #FAF8F4; text-decoration: none; border-radius: 999px; font-weight: 500;">View live post →</a>
        </p>

        <div style="background: #F3EFE8; padding: 20px; border-radius: 8px; font-size: 14px; color: #2E2118; line-height: 1.6;">
          If anything looks wrong, you can edit the file at:<br/>
          <code style="background: #EDE7DC; padding: 2px 6px; border-radius: 4px;">content/blog/${slug}.mdx</code><br/><br/>
          Or remove the post entirely from GitHub if needed.
        </div>

        <p style="font-size: 13px; color: #9E8E7A; margin-top: 24px;">
          The next post publishes next Monday at 9 AM EST automatically.
        </p>
      </div>
    `,
  })
}
