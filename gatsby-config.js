module.exports = {
  siteMetadata: {
    title: `Marcus Sanatan`,
    description: `The personal website for Marcus Sanatan, who sometimes blogs about tech things`,
    author: {
      name: `Marcus Sanatan`,
      summary: `A creative coder from the Caribbean who loves building things`
    },
    siteUrl: `https://msanatan.com`,
    social: {
      twitter: `marcussanatan`,
      github: `msanatan`,
      linkedin: `msanatan`,
      itchio: `msanatan`
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Montserrat`,
          `Roboto`,
        ],
        display: 'swap'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/blog`,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Marcus Sanatan's Website`,
        short_name: `msanatan`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#00cdac`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
  ],
};
