module.exports = {
  trailingSlash: true,

  images: {
    domains: ["www.thesamba.com"],
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/vw",
        permanent: false,
      },
    ];
  },
};
