import { graphql, Link } from "gatsby";
import MdRenderer from "../components/mdrender";
// @ts-ignore
import * as css from "../components/mdrender.module.sass";
// @ts-ignore
import "./blogList.scss";
import SiteWrapper from "../components/wrapper";
import { strapiRoute } from "../utils/helpers";
import classNames from "classnames";
import moment from "moment";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

const TagsListTemplate = ({ data, pageContext }) => {
  const { strapi } = data;
  const { totalPages, page } = pageContext;

  const catCount = pageContext.metaCollector.data
    .map((blog) => {
      return blog.attributes.categories.data.map((cat) => {
        return cat.attributes;
      });
    })
    .flat()
    .reduce((acc, current) => {
      acc[current.name] =
        typeof acc[current.name] === "undefined"
          ? { ...current, count: 1 }
          : { ...current, count: acc[current.name].count + 1 };
      return acc;
    }, {});

  const isBrowser = () => typeof window !== "undefined";
  let url = isBrowser() ? window.location.pathname : "";
  let generatePath = (page) => {
    if (url.includes("/1/")) {
      return `- ${page}`;
    } else if (page > 1) {
      return ` - ${page}`;
    } else return ` `;
  };
  return (
    <SiteWrapper>
      <Helmet>
        <title>
          {`${
            pageContext.currentTag || "Tags"
          } | PagerDuty正規代理店 - 株式会社Digital Stacks ${generatePath(
            page
          )}`}
        </title>

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://pagerduty.digitalstacks.net/"
        />

        <meta
          property="og:title"
          content={`${
            pageContext.currentTag || "Tags"
          } | PagerDuty正規代理店 - 株式会社Digital Stacks ${generatePath(
            page
          )}`}
        />

        <meta
          property="og:image"
          content="https://pagerduty.digitalstacks.net/static/Logo-fcb0d40bea708966d9e28213abaa4811.png"
        />
      </Helmet>
      <div className="titleWrapper heading-banner-container-no-desc !mb-[40px] md:!mb-[80px]">
        <div className="heading-banner">
          <h1 className="heading-banner-title-1">
            <span className="heading-banner-title-2">Tags</span>
            <br />
            {pageContext.currentTag}
          </h1>
        </div>
      </div>
      <div className="container pb-4 TagsListWrapper">
        <div className="md:flex gap-x-4">
          <div className="mb-[50px] w-full">
            <div className="grid md:grid-cols-2 gap-x-4 mb-[50px]">
              {data.strapi.blogPages.data.slice(0, 6).map((blogPage, i) => {
                return (
                  <div
                    key={i}
                    className="mb-4 p-[20px]"
                    style={{ boxShadow: `0px 0px 4px rgba(0, 0, 0, 0.25)` }}
                  >
                    <img
                      className="w-full h-[150px] mb-4 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${strapiRoute(
                          blogPage.attributes.categories.data.filter(
                            (cat) =>
                              cat.attributes.slug ===
                              pageContext.currentCategory
                          )[0]?.attributes.coverImage.data.attributes.url ||
                            "https://picsum.photos/seed/cat/500/200"
                        )})`,
                      }}
                    />
                    <small className="text-[14px] text-[#71746E] block mb-[5px]">
                      {moment(blogPage.attributes.date).format("YYYY年M月D日")}
                      &nbsp; (更新日：
                      {moment(blogPage.attributes.updatedAt).format(
                        "YYYY年M月D日"
                      )}
                      )
                    </small>
                    <Link
                      to={`/${blogPage.attributes.BlogOrNews.toLowerCase()}/${
                        blogPage.attributes.slug
                      }`}
                    >
                      <h2
                        title={blogPage.attributes.title}
                        className="mb-2 h-[48px] text-base after:hidden contentPreview"
                      >
                        {blogPage.attributes.title}
                      </h2>
                    </Link>
                    <MdRenderer
                      isDescription
                      className={classNames(
                        "contentPreview font-normal description",
                        css.markdown,
                        "mb-3"
                      )}
                    >
                      {blogPage.attributes.content[0].content}
                    </MdRenderer>
                    <Link
                      to={`/${blogPage.attributes.BlogOrNews.toLowerCase()}/${
                        blogPage.attributes.slug
                      }`}
                      className="text-[#4EB346] text-base"
                    >
                      続きを読む
                    </Link>
                    <hr className="my-4" />
                    <small className="text-[#71746E] text-[14px]">
                      {blogPage.attributes.categories.data.map(
                        (cat, index, lst) => {
                          return (
                            <Fragment key={index}>
                              <Link
                                to={`/${pageContext.kind.toLowerCase()}/category/${
                                  cat.attributes.slug
                                }`}
                                className="text-[#71746E] text-[14px]"
                              >
                                {cat.attributes.name}
                              </Link>
                              {index === lst.length - 1 ? "" : ", "}
                            </Fragment>
                          );
                        }
                      )}
                    </small>
                  </div>
                );
              })}
            </div>
            <div>
              {data.strapi.blogPages.data.slice(6).map((blogPage, i) => {
                const sortedCat = blogPage.attributes.categories.data.sort(
                  (a, b) => a.attributes.rank - b.attributes.rank
                );
                return (
                  <div key={i} className="mb-[35px]">
                    <small className="block mb-[14px] text-[#71746E] text-[14px]">
                      {moment(blogPage.attributes.date).format("YYYY年M月D日")}
                      &nbsp; (更新日：
                      {moment(blogPage.attributes.updatedAt).format(
                        "YYYY年M月D日"
                      )}
                      ) &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                      {blogPage.attributes.categories.data.map(
                        (cat, index, lst) => {
                          return (
                            <Fragment key={index}>
                              <Link
                                to={`/${pageContext.kind.toLowerCase()}/category/${
                                  cat.attributes.slug
                                }`}
                                className="text-[#71746E] text-[14px]"
                              >
                                {cat.attributes.name}
                              </Link>
                              {index === lst.length - 1 ? "" : ", "}
                            </Fragment>
                          );
                        }
                      )}
                    </small>
                    <Link
                      to={`/${blogPage.attributes.BlogOrNews.toLowerCase()}/${
                        blogPage.attributes.slug
                      }`}
                    >
                      <h2 className="text-base font-bold after:hidden">
                        {blogPage.attributes.title}
                      </h2>
                    </Link>
                    <MdRenderer
                      isDescription
                      className={classNames(
                        "contentPreview",
                        css.markdown,
                        "mb-3 ![-webkit-line-clamp:1] text-base description  h-[24px]"
                      )}
                    >
                      {`${blogPage.attributes.content[0].content}`}
                    </MdRenderer>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full md:w-[280px] shrink-0 grow-0">
            <div className="table-one">
              <div className="table-title">新着情報</div>
              <ul className="table-lists">
                {strapi.recentPosts.data.map((blog, i) => {
                  return (
                    <li className="table-list-items" key={i}>
                      <Link
                        to={`/${blog.attributes.BlogOrNews.toLowerCase()}/${
                          blog.attributes.slug
                        }`}
                        className="text-base"
                      >
                        {blog.attributes.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="table-three">
              <div className="table-title">カテゴリ</div>
              <ul className="table-lists">
                {/* {Object.keys(catCount).map((k, i) => (
                  <li key={i}>
                    <Link
                      to={`/${pageContext.kind.toLowerCase()}/category/${k
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                    >
                      {k} ( {catCount[k]} )
                    </Link>
                  </li>
                ))} */}
                {Object.keys(catCount).map((k, i) => (
                  <li key={i} className="table-list-items">
                    <Link
                      to={`/${pageContext.kind.toLowerCase()}/category/${catCount[
                        k
                      ].slug
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                      className="px-1 text-base"
                    >
                      {k} ( {catCount[k].count} )
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* <div>
            <div className="mb-4">
              <h2 className="p-2 mb-2 bg-white">新着情報</h2>
              <ul className="list-disc list-inside [padding-inline-start:10px]">
                {strapi.recentPosts.data.map((blog, i) => {
                  return (
                    <li key={i}>
                      <Link
                        to={`/${blog.attributes.BlogOrNews.toLowerCase()}/${blog.attributes.slug}`}
                      >
                        {blog.attributes.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="mb-4">
              <h2 className="p-2 mb-2 bg-white">Category List</h2>
              <ul className="list-disc list-inside [padding-inline-start:10px]">
                {Object.keys(catCount).map((k, i) => (
                  <li key={i}>
                    <Link
                      to={`/${pageContext.kind.toLowerCase()}/category/${k
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                    >
                      {k} ( {catCount[k]} )
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}
        </div>
        <div className="text-center mb-[80px]">
          &lt;&nbsp;&nbsp;
          {[...Array(totalPages)].map((_v, index) => {
            return (
              <Link
                className={classNames(
                  "inline-flex items-center justify-center px-2 w-[30px] h-[30px] ring-1 ring-[#B5B5B5] mr-[8px] last:mr-0 mb-2",
                  page === index + 1 ? "text-[#dddddd]" : "text-[#4EB346]"
                )}
                key={index}
                to={`/${pageContext.kind.toLowerCase()}/category/${pageContext.currentTag
                  .toLowerCase()
                  .replace(/\s/g, "-")}/${index + 1}`}
              >
                {index + 1}
              </Link>
            );
          })}
          &nbsp;&nbsp; &gt;
        </div>
      </div>
    </SiteWrapper>
  );
};

export const query = graphql`
  query ($page: Int, $currentTag: String, $kind: String) {
    strapi {
      recentPosts: blogPages(
        pagination: { limit: 10 }
        filters: { BlogOrNews: { eq: $kind } }
      ) {
        data {
          attributes {
            BlogOrNews
            slug
            title
          }
        }
      }
      blogPages(
        pagination: { pageSize: 18, page: $page }
        filters: { tags: { containsi: $currentTag }, BlogOrNews: { eq: $kind } }
        sort: "updatedAt:desc"
      ) {
        data {
          attributes {
            BlogOrNews
            slug
            title
            tags
            date
            updatedAt
            content {
              ... on Strapi_ComponentBlogpHtmlInput {
                content
              }
              ... on Strapi_ComponentBlogpMarkdownInput {
                content
              }
            }
            categories {
              data {
                attributes {
                  name
                  rank
                  coverImage {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default TagsListTemplate;
