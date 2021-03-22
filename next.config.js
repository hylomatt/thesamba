module.exports = {
  trailingSlash: true,

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
