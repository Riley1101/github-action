require("dotenv").config(),
  (module.exports = {
    siteMetadata: {
      title: "headless-ui",
      siteUrl: "https://pagerduty.digitalstacks.net/",
    },
    jsxRuntime: "automatic",
    plugins: [
      {
        resolve: "gatsby-source-graphql",
        options: {
          typeName: "Strapi",
          fieldName: "strapi",
          url: `${
            process.env.GATSBY_STRAPI_URL || "http://localhost:1337"
          }/graphql`,
        },
        __key: "strapi-graphql",
      },
      {
        resolve: `gatsby-plugin-google-tagmanager`,
        options: {
          id: "GTM-MXT5736",
        },
      },
      {
        resolve: "gatsby-source-graphql",
        options: {
          typeName: "DxDaily",
          fieldName: "dxdaily",
          url: `https://dxdailypost.com/api/graphql`,
        },
        __key: "dxdaily-graphql",
      },
      "gatsby-plugin-sass",
      "gatsby-plugin-postcss",
      "gatsby-plugin-image",
      "gatsby-plugin-react-helmet",
      {
        resolve: "gatsby-plugin-manifest",
        options: { icon: "./src/assets/images/icon.png" },
      },
      "gatsby-plugin-sharp",
      "gatsby-transformer-sharp",
      `gatsby-plugin-preload-fonts`,
      {
        resolve: "gatsby-source-filesystem",
        options: { name: "images", path: "./src/assets/images/" },
        __key: "assets-images",
      },
      "gatsby-plugin-use-query-params",
      {
        resolve: "gatsby-plugin-sitemap",
        exclude: [
          /\/blog\/\d+\//,
          /\/news\/\d+\//,
          /\/blog\/category\/[^/]+\/1\//,
          /\/blog\/tag\/[^/]+\/1\//,
          /\/blog\/[^/]+\/[^/]+\/1\//,
          /\/news\/category\/[^/]+\/1\//,
          /\/news\/tag\/[^/]+\/1\//,
          /\/news\/[^/]+\/[^/]+\/1\//,
        ],
      },

      {
        resolve: "gatsby-plugin-robots-txt",
        options: {
          host: "https://pagerduty.digitalstacks.net",
          sitemap: "https://pagerduty.digitalstacks.net/sitemap/sitemap-0.xml",
          policy: [{ userAgent: "*", allow: "/" }],
        },
      },
      {
        resolve: `gatsby-plugin-canonical-urls`,
        options: {
          siteUrl: `https://pagerduty.digitalstacks.net`,
          stripQueryString: true,
        },
      },
      {
        resolve: `gatsby-plugin-force-trailing-slashes`,
        options: {
          excludedPaths: [`/404.html`],
        },
      },
      {
        resolve: "gatsby-plugin-exclude",
        options: {
          paths: [
            "/blog/1/",
            "/news/1/",
            "!/blog/category/**/1",
            "!/blog/category/**/1",
            "!/blog/tag/**/1",
            "!/blog/tag/**/1",
            "/blog/**/**/1/",
          ],
        },
      },
    ],
  });
