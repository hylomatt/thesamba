module.exports = {
  trailingSlash: true,

  images: {
    domains: ['www.thesamba.com'],
    disableStaticImages: true
  },

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
