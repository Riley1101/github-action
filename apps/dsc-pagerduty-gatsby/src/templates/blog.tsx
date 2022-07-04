import { graphql, Link } from "gatsby";
import MdRenderer from "../components/mdrender";
import cx from "classnames";
// @ts-ignore
import * as css from "../components/mdrender.module.sass";
import SiteWrapper from "../components/wrapper";
import "../utils/parts.scss";
import "./blog.scss";
// @ts-ignore
import bookMark from "../assets/images/book_mark.png";
// @ts-ignore
import bookTag from "../assets/images/book_tag.png";
import moment from "moment";
import { Helmet } from "react-helmet";
import removeMd from "remove-markdown";

const BlogPageTemplate = ({ data, pageContext }) => {
  const { strapi } = data;

  const tags = new Set<string>();
  const catCount = pageContext.metaCollector.data
    .map((blog) => {
      if (blog.attributes.tags)
        blog.attributes.tags.split(",").forEach((t) => tags.add(t));
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
  return (
    <SiteWrapper>
      <Helmet>
        <title>
          {strapi.blogPage.data.attributes.title} | PagerDuty正規代理店 -
          株式会社Digital Stacks
        </title>

        {strapi.blogPage.data.attributes.content &&
          strapi.blogPage.data.attributes.content.length > 0 && (
            <meta
              name="description"
              content={`${[
                ...removeMd(strapi.blogPage.data.attributes.content[0].content),
              ]
                .slice(0, 100)
                .join("")}...`}
            />
          )}
        {strapi.blogPage.data.attributes.content &&
          strapi.blogPage.data.attributes.content.length > 0 && (
            <meta
              property="og:description"
              content={`${[
                ...removeMd(strapi.blogPage.data.attributes.content[0].content),
              ]
                .slice(0, 100)
                .join("")}...`}
            />
          )}
        {strapi.blogPage.data.attributes.content &&
          strapi.blogPage.data.attributes.content.length > 0 && (
            <meta
              property="og:title"
              content={strapi.blogPage.data.attributes.title}
            />
          )}
        {strapi.blogPage.data.attributes.content &&
          strapi.blogPage.data.attributes.content.length > 0 && (
            <meta property="og:type" content="website" />
          )}
        {strapi.blogPage.data.attributes.content &&
          strapi.blogPage.data.attributes.content.length > 0 && (
            <meta
              property="og:image"
              content="https://pagerduty.digitalstacks.net/static/Logo-fcb0d40bea708966d9e28213abaa4811.png"
            />
          )}
        {strapi.blogPage.data.attributes.content &&
          strapi.blogPage.data.attributes.content.length > 0 && (
            <meta
              property="og:url"
              content="https://pagerduty.digitalstacks.net/"
            />
          )}
      </Helmet>
      <div className="titleWrapper">
        <div className="heading-banner-container">
          <div className="heading-banner">
            <h1 className="heading-banner-title-1">
              <span className="heading-banner-title-2">
                {pageContext.kind.toUpperCase()}
              </span>
              <br />
              {strapi.blogPage.data.attributes.title}
            </h1>
            <p className="heading-banner-subtitle text-[14px]">
              投稿：
              {moment(strapi.blogPage.data.attributes.date)
                .locale("ja")
                .format("YYYY年M月D日")}
              &nbsp;&nbsp; | &nbsp;&nbsp; 更新：
              {moment(strapi.blogPage.data.attributes.updatedAt)
                .locale("ja")
                .format("YYYY年M月D日")}
            </p>
          </div>
        </div>
      </div>
      <div className="pb-4 blogWrapper">
        <div className="grid-container">
          <div className="left-grid">
            {strapi.blogPage.data.attributes.content.map((contentNode, i) =>
              contentNode.__typename === "Strapi_ComponentBlogpHtmlInput" ? (
                <div
                  className="mb-4 break-all"
                  key={i}
                  dangerouslySetInnerHTML={{ __html: contentNode.content }}
                ></div>
              ) : (
                <MdRenderer
                  className={cx("mb-4 break-all", css.markdown)}
                  key={i}
                  children={contentNode.content}
                ></MdRenderer>
              )
            )}
            {pageContext.kind == "Blog" && (
              <>
                <div className="book-mark">
                  <img src={bookMark} alt="book-mark" />
                  カテゴリ：
                  {strapi.blogPage.data.attributes.categories.data.map(
                    (cat, index, list) => (
                      <>
                        <Link
                          className="text-base"
                          to={`/${strapi.blogPage.data.attributes.BlogOrNews.toLowerCase()}/category/${cat.attributes.slug
                            .toLowerCase()
                            .replace(/\s/g, "-")}`}
                        >
                          {cat.attributes.name}
                        </Link>
                        {index === list.length - 1 ? "" : ", "}
                      </>
                    )
                  )}
                </div>
                <div className="book-tag">
                  <img src={bookTag} alt="book-mark" />
                  タグ：{strapi.blogPage.data.attributes.tags}
                </div>
              </>
            )}
          </div>
          <div className="right-grid">
            <div className="table-one">
              <div className="table-title">新着情報</div>
              <ul className="table-lists">
                {strapi.blogPages.data
                  .filter(
                    (blog) =>
                      pageContext.kind.toLowerCase() ===
                      strapi.blogPage.data.attributes.BlogOrNews.toLowerCase()
                  )
                  .map((blog, i) => {
                    return (
                      <li key={i} className="table-list-items">
                        <Link
                          className="text-base"
                          to={`/${blog.attributes.BlogOrNews.toLowerCase()}/${
                            blog.attributes.slug
                          }`}
                        >
                          {blog.attributes.title}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="table-two">
              <div className="table-title">カテゴリ</div>
              <ul className="table-lists">
                {Object.keys(catCount).map((k, i) => (
                  <li key={i} className="table-list-items">
                    <Link
                      className="text-base"
                      to={`/${strapi.blogPage.data.attributes.BlogOrNews.toLowerCase()}/category/${(
                        catCount[k].slug || k
                      )
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                    >
                      {k} ( {catCount[k].count} )
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="table-three">
              <div className="table-title">タグ</div>
              <ul className="table-lists">
                {[...tags].map((tag, index) => (
                  <li key={index} className="table-list-items">
                    <Link
                      key={index}
                      to={`/${strapi.blogPage.data.attributes.BlogOrNews.toLowerCase()}/tag/${tag
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                      className="px-1 text-base"
                    >
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SiteWrapper>
  );
};

export const query = graphql`
  query ($id: ID) {
    strapi {
      blogPages(
        pagination: { limit: 10 }
        filters: { BlogOrNews: { eq: "Blog" } }
      ) {
        data {
          attributes {
            BlogOrNews
            slug
            title
            tags
            categories {
              data {
                attributes {
                  name
                }
              }
            }
          }
        }
      }
      blogPage(id: $id) {
        data {
          attributes {
            BlogOrNews
            title
            date
            slug
            updatedAt
            content {
              __typename
              ... on Strapi_ComponentBlogpHtmlInput {
                content
              }
              ... on Strapi_ComponentBlogpMarkdownInput {
                content
              }
            }
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
`;

export default BlogPageTemplate;
