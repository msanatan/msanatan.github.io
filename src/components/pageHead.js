import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const PageHead = ({ location, meta, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            siteLang
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = meta?.description || site.siteMetadata.description
  const siteTitle = site.siteMetadata.title
  const pageTitle = meta?.title ? `${meta.title} — ${siteTitle}` : siteTitle

  return (
    <>
      <title>{pageTitle}</title>
      <html lang={meta?.lang || site.siteMetadata.siteLang} />
      <body className="h-100" />
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata?.social?.twitter || ""} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
    </>
  )
}

export default PageHead
