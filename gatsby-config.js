module.exports = {
  siteMetadata: {
    title: `Marcus Sanatan`,
    description: `The personal website for Marcus Sanatan, who sometimes blogs about tech things`,
    author: {
      name: `Marcus Sanatan`,
      summary: `A creative coder from the Caribbean who loves building things`
    },
    siteUrl: `https://msanatan.com`,
    siteLang: `en`,
    social: {
      instagram: `gameboymarcus`,
      github: `msanatan`,
      linkedin: `msanatan`,
      itchio: `gameboymarcus`
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
              maxWidth: 600,
            },
          },
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 600,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              related: false,
              noIframeBorder: true,
              loadingStrategy: 'lazy',
              urlOverrides: [
                {
                  id: "youtube",
                  embedURL: videoId =>
                    `https://www.youtube-nocookie.com/embed/${videoId}`,
                },
              ],
              containerClass: "embedVideo-container",
              iframeId: false,
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
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const rssProperties = {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  updated: edge.node.frontmatter.updated,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                  categories: edge.node.frontmatter.categories,
                  tags: edge.node.frontmatter.tags,
                  language: 'en',
                }
                return Object.assign({}, edge.node.frontmatter, rssProperties)
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                        tags
                        updated
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Marcus Sanatan's RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          `G-E6KKM2E3QG`
        ],
        pluginConfig: {
          head: true,
        },
      },
    },
  ],
};
