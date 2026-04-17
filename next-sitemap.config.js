/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://tonle.app',
  generateRobotsTxt: false, // we have a custom one
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    // Priority by path depth
    let priority = 0.7
    let changefreq = 'weekly'
    if (path === '/') { priority = 1.0; changefreq = 'daily' }
    else if (path === '/about' || path === '/privacy' || path === '/contact') { priority = 0.5; changefreq = 'monthly' }
    else if (path.startsWith('/crypto-profit-calculator') || path.startsWith('/loan-calculator')) { priority = 0.9; changefreq = 'weekly' }
    else if (path.startsWith('/dca-calculator') || path.startsWith('/currency-converter') || path.startsWith('/compound-interest-calculator')) { priority = 0.8; changefreq = 'weekly' }
    else if (path.startsWith('/password-generator') || path.startsWith('/json-formatter')) { priority = 0.8; changefreq = 'weekly' }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
}
