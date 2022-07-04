const path = require("path");
const fetch = require("node-fetch");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage: _createPage } = actions;

  const createPage = ({ path, component, ...options }) => {
    // console.info("creating", path, "with", component, "component");
    _createPage({ path, component, ...options });
  };

  const {
    data: { strapi },
  } = await graphql(`
    {
      strapi {
        docsPages(pagination: { limit: -1 }) {
          data {
            id
            attributes {
              uri
            }
          }
        }
        caseStudyPages(pagination: { limit: -1 }) {
          data {
            id
            attributes {
              slug
              type
            }
          }
        }
        blogPages(
          pagination: { limit: -1 }
          filters: { BlogOrNews: { eq: "Blog" } }
          sort: "updatedAt:desc"
        ) {
          meta {
            pagination {
              total
            }
          }
          data {
            id
            attributes {
              slug
              BlogOrNews
            }
          }
        }
        newsPages: blogPages(
          pagination: { limit: -1 }
          filters: { BlogOrNews: { eq: "News" } }
          sort: "updatedAt:desc"
        ) {
          meta {
            pagination {
              total
            }
          }
          data {
            id
            attributes {
              slug
              BlogOrNews
            }
          }
        }
        blogCategoriesCollector: blogPages(
          pagination: { limit: -1 }
          filters: { BlogOrNews: { eq: "Blog" } }
          sort: "updatedAt:desc"
        ) {
          data {
            attributes {
              slug
              BlogOrNews
              tags
              categories {
                data {
                  attributes {
                    name
                    slug
                  }
                }
              }
            }
          }
        }
        newsCategoriesCollector: blogPages(
          pagination: { limit: -1 }
          filters: { BlogOrNews: { eq: "News" } }
          sort: "updatedAt:desc"
        ) {
          data {
            attributes {
              slug
              BlogOrNews
              tags
              categories {
                data {
                  attributes {
                    name
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  // create all docs pages
  strapi.docsPages.data.forEach((node) => {
    createPage({
      path: decodeURIComponent(`/docs/guides/${node.attributes.uri}`),
      component: path.resolve(`./src/templates/docs.tsx`),
      context: {
        id: node.id,
      },
    });
  });

  strapi.caseStudyPages.data.forEach((node) => {
    createPage({
      path: decodeURIComponent(
        node.attributes.type === "A"
          ? `/casestudy-${node.attributes.slug}`
          : `/casestudy/${node.attributes.slug}`
      ),
      component: path.resolve(`./src/templates/casestudy.tsx`),
      context: {
        id: node.id,
      },
    });
  });

  // create all blog pages
  strapi.blogPages.data.forEach((node) => {
    // console.log(`creating /${node.attributes.BlogOrNews.toLowerCase()}/${node.attributes.slug}`)
    createPage({
      path: decodeURIComponent(`/blog/${node.attributes.slug}`),
      component: path.resolve(`./src/templates/blog.tsx`),
      context: {
        id: node.id,
        kind: "Blog",
        metaCollector: strapi.blogCategoriesCollector,
      },
    });
  });

  const perPage = 18;

  // create blog pagination
  const totalBlogPages = Math.ceil(
    strapi.blogPages.meta.pagination.total / perPage
  );
  createPage({
    path: `/blog/`,
    component: path.resolve("./src/templates/blogList.tsx"),
    context: {
      page: 1,
      totalPages: totalBlogPages,
      kind: "Blog",
      metaCollector: strapi.blogCategoriesCollector,
    },
  });
  for (let i = 1; i <= totalBlogPages; i++) {
    // console.log(`creating /blog/${i}`);
    createPage({
      path: `/blog/${i}`,
      component: path.resolve("./src/templates/blogList.tsx"),
      context: {
        totalPages: totalBlogPages,
        page: i,
        kind: "Blog",
        metaCollector: strapi.blogCategoriesCollector,
      },
    });
  }

  // create blog pagination
  strapi.newsPages.data.forEach((node) => {
    createPage({
      path: decodeURIComponent(`/news/${node.attributes.slug}`),
      component: path.resolve(`./src/templates/blog.tsx`),
      context: {
        id: node.id,
        kind: "News",
        metaCollector: strapi.newsCategoriesCollector,
      },
    });
  });
  const totalNewsPages = Math.ceil(
    strapi.newsPages.meta.pagination.total / perPage
  );
  createPage({
    path: `/news/`,
    component: path.resolve("./src/templates/blogList.tsx"),
    context: {
      page: 1,
      totalPages: totalNewsPages,
      kind: "News",
      metaCollector: strapi.newsCategoriesCollector,
    },
  });
  for (let i = 1; i <= totalNewsPages; i++) {
    // console.log(`creating /news/${i}`);
    createPage({
      path: `/news/${i}`,
      component: path.resolve("./src/templates/blogList.tsx"),
      context: {
        totalPages: totalNewsPages,
        page: i,
        kind: "News",
        metaCollector: strapi.newsCategoriesCollector,
      },
    });
  }

  const catNameToSlug = (cat) => cat.toLowerCase().replace(/\s/g, "-");

  // create blog categories
  const allBlogCats = strapi.blogCategoriesCollector.data
    .map((post) =>
      post.attributes.categories.data.map(
        (cat) => cat.attributes.slug || cat.attributes.name
      )
    )
    .flat();
  const uniqueBlogCats = [...new Set(allBlogCats)];

  const globalStrapi = strapi;

  uniqueBlogCats.forEach(async (cat) => {
    const {
      data: { strapi },
    } = await graphql(`
      {
        strapi {
          blogPages(pagination: {limit: -1}, filters: { categories: { slug: { in: "${cat}" } }, BlogOrNews: { eq: "Blog" } }, sort: "updatedAt:desc") {
            meta {
              pagination {
                total
              }
            }
            data {
              attributes {
                slug
              }
            }
          }
        }
      }
    `);
    const totalCatPages = Math.ceil(
      strapi.blogPages.meta.pagination.total / perPage
    );

    createPage({
      path: `/blog/category/${catNameToSlug(cat)}`,
      component: path.resolve("./src/templates/cateList.tsx"),
      context: {
        page: 1,
        totalPages: totalCatPages,
        currentCategory: cat,
        kind: "Blog",
        metaCollector: globalStrapi.blogCategoriesCollector,
      },
    });
    for (let i = 1; i <= totalCatPages; i++) {
      // console.log(`creating /blog/category/${catNameToSslug(cat)}/${i}`);
      createPage({
        path: `/blog/category/${catNameToSlug(cat)}/${i}`,
        component: path.resolve("./src/templates/cateList.tsx"),
        context: {
          totalPages: totalCatPages,
          page: i,
          currentCategory: cat,
          kind: "Blog",
          metaCollector: globalStrapi.blogCategoriesCollector,
        },
      });
    }
  });

  // create news categories
  const allNewsCats = strapi.blogCategoriesCollector.data
    .map((post) =>
      post.attributes.categories.data.map(
        (cat) => cat.attributes.slug || cat.attributes.name
      )
    )
    .flat();
  const uniqueNewsCats = [...new Set(allNewsCats)];

  uniqueNewsCats.forEach(async (cat) => {
    const {
      data: { strapi },
    } = await graphql(`
      {
        strapi {
          blogPages(pagination: {limit: -1}, filters: { categories: { slug: { in: "${cat}" } }, BlogOrNews: { eq: "News" } }, sort: "updatedAt:desc") {
            meta {
              pagination {
                total
              }
            }
            data {
              attributes {
                slug
              }
            }
          }
        }
      }
    `);
    const totalCatPages = Math.ceil(
      strapi.blogPages.meta.pagination.total / perPage
    );

    createPage({
      path: `/news/category/${catNameToSlug(cat)}`,
      component: path.resolve("./src/templates/cateList.tsx"),
      context: {
        page: 1,
        totalPages: totalCatPages,
        currentCategory: cat,
        kind: "News",
        metaCollector: globalStrapi.newsCategoriesCollector,
      },
    });
    for (let i = 1; i <= totalCatPages; i++) {
      // console.log(`creating /news/category/${cat}/${i}`);
      createPage({
        path: `/news/category/${catNameToSlug(cat)}/${i}`,
        component: path.resolve("./src/templates/cateList.tsx"),
        context: {
          totalPages: totalCatPages,
          page: i,
          currentCategory: cat,
          kind: "News",
          metaCollector: globalStrapi.newsCategoriesCollector,
        },
      });
    }
  });

  // create blog tags
  const allBlogTags = strapi.blogCategoriesCollector.data
    .map((post) => post.attributes.tags?.split(",") || [])
    .flat();
  const uniqueBlogTags = [...new Set(allBlogTags)];
  // console.log("blog tags", uniqueBlogTags)

  uniqueBlogTags.forEach(async (tag) => {
    const {
      data: { strapi },
    } = await graphql(`
      {
        strapi {
          blogPages(pagination: {limit: -1}, filters: { tags: { containsi: "${tag}" }, BlogOrNews: { eq: "Blog" } }, sort: "updatedAt:desc") {
            meta {
              pagination {
                total
              }
            }
            data {
              attributes {
                slug
              }
            }
          }
        }
      }
    `);
    const totalTagPages = Math.ceil(
      strapi.blogPages.meta.pagination.total / perPage
    );
    createPage({
      path: `/blog/tag/${catNameToSlug(tag)}`,
      component: path.resolve("./src/templates/tagsList.tsx"),
      context: {
        page: 1,
        totalPages: totalTagPages,
        currentTag: tag,
        kind: "Blog",
        metaCollector: globalStrapi.blogCategoriesCollector,
      },
    });
    for (let i = 1; i <= totalTagPages; i++) {
      // console.log(`creating /blog/tag/${catNameToSlug(tag)}/${i}`);
      createPage({
        path: `/blog/tag/${catNameToSlug(tag)}/${i}`,
        component: path.resolve("./src/templates/tagsList.tsx"),
        context: {
          totalPages: totalTagPages,
          page: i,
          currentTag: tag,
          kind: "Blog",
          metaCollector: globalStrapi.blogCategoriesCollector,
        },
      });
    }
  });

  // create news tags
  const allNewsTags = strapi.newsCategoriesCollector.data
    .map((post) => post.attributes.tags?.split(",") || [])
    .flat();
  const uniqueNewsTags = [...new Set(allNewsTags)];
  // console.log("news tags", uniqueNewsTags)

  uniqueNewsTags.forEach(async (tag) => {
    const {
      data: { strapi },
    } = await graphql(`
      {
        strapi {
          blogPages(pagination: {limit: -1}, filters: { tags: { containsi: "${tag}" }, BlogOrNews: { eq: "News" } }, sort: "updatedAt:desc") {
            meta {
              pagination {
                total
              }
            }
            data {
              attributes {
                slug
              }
            }
          }
        }
      }
    `);
    const totalCatPages = Math.ceil(
      strapi.blogPages.meta.pagination.total / perPage
    );
    createPage({
      path: `/news/tag/${catNameToSlug(tag)}`,
      component: path.resolve("./src/templates/tagsList.tsx"),
      context: {
        page: 1,
        totalPages: totalCatPages,
        currentTag: tag,
        kind: "News",
        metaCollector: globalStrapi.newsCategoriesCollector,
      },
    });
    for (let i = 1; i <= totalCatPages; i++) {
      // console.log(`creating /news/tag/${catNameToSlug(tag)}/${i}`);
      createPage({
        path: `/news/tag/${catNameToSlug(tag)}/${i}`,
        component: path.resolve("./src/templates/tagsList.tsx"),
        context: {
          totalPages: totalCatPages,
          page: i,
          currentTag: tag,
          kind: "News",
          metaCollector: globalStrapi.newsCategoriesCollector,
        },
      });
    }
  });
};

exports.onCreatePage = async ({ page, actions }) => {
  if (page.path === "/faq" || page.path === "/faq/") {
    const { createPage, deletePage } = actions;
    deletePage(page);

    const faqs = await fetch(
      "https://api.smartsheet.com/2.0/sheets/5613529211398020",
      {
        headers: {
          Authorization: `Bearer ${process.env.SMARTSHEET_TOKEN}`,
        },
      }
    ).then((res) => res.json());

    createPage({
      ...page,
      context: {
        ...page.context,
        faqs,
      },
    });
  }
};
