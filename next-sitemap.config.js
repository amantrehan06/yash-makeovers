/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // Must match site.canonicalHost in config/site.ts so sitemap URLs line up
  // with <link rel="canonical"> on each page.
  siteUrl: 'https://www.yashmakeovers.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*'],
}
