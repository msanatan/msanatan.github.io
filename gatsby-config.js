module.exports = {
  siteMetadata: {
    title: "Marcus Sanatan",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Montserrat`,
          `Roboto`,
        ],
        display: 'swap'
      }
    }
  ],
};
