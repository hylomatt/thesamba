module.exports = {
  trailingSlash: true,

  images: {
    domains: ['www.thesamba.com']
  },

  swcMinify: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/vw/',
        permanent: false
      }
    ]
  }
}
