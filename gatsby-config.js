module.exports = {
  siteMetadata: {
    title: "Marcus Sanatan",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
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
