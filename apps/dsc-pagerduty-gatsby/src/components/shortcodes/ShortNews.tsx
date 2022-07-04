import { graphql, useStaticQuery } from "gatsby";
import moment from "moment";
// @ts-ignore
import externalLink from "./extern-link.svg";

const ShortNews = () => {
  const news = useStaticQuery(graphql`
    {
      dxdaily {
        scrapingData(
          where: { companyname: "PagerDuty", Not_to_publish_to_PD_site: false }
          sort: "releasedate:desc"
          limit: 5
        ) {
          link
          releasedate
          newstitle
        }
      }
      strapi {
        blogPages(sort: "date:desc", pagination: { limit: 5 }) {
          data {
            attributes {
              BlogOrNews
              title
              date
              slug
            }
          }
        }
        topPage {
          data {
            attributes {
              shortnews {
                url: link
                date
                pagerDutyRelated
                targetBlank
                title
              }
            }
          }
        }
      }
    }
  `);

  const displayNews: {
    title: string;
    date: string;
    url: string;
    pagerDutyRelated: boolean;
    targetBlank: boolean;
  }[] = [];

  news.dxdaily.scrapingData.forEach((dxnews) =>
    displayNews.push({
      date: dxnews.releasedate,
      title: dxnews.newstitle,
      pagerDutyRelated: true,
      targetBlank: true,
      url: dxnews.link,
    })
  );

  news.strapi.blogPages.data.forEach(({ attributes: blog }) =>
    displayNews.push({
      date: blog.date,
      title: blog.title,
      targetBlank: false,
      pagerDutyRelated: true,
      url: `/${blog.BlogOrNews.toLowerCase()}/${blog.slug}`,
    })
  );

  news.strapi.topPage.data?.attributes.shortnews?.forEach((shortnews) =>
    displayNews.push({
      ...shortnews,
    })
  );

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h3>最新情報</h3>
      </div>
      <div className="schedule-sub-header">
        PagerDuty関連のお知らせ・コンテンツ更新情報​
      </div>
      <div className="schedule-table">
        {displayNews
          .sort((a, b) => {
            let aDate = new Date(a.date);
            let bDate = new Date(b.date);

            if (aDate < bDate) return 1;
            if (bDate < aDate) return -1;
            return 0;
          })
          .slice(0, 5)
          .map((news, id) => (
            <a
              href={news.url}
              target={news.targetBlank ? "_blank" : "_self"}
              className="schedule-row gap-x-2 !leading-[2] font-custom1"
              key={id}
            >
              <div className="schedule-date">
                <p className="date">{moment(news.date).format("YYYY-MM-DD")}</p>
              </div>
              {news.pagerDutyRelated ? (
                <div className="schedule-name schedule-name-even">
                  <p className="btn btn-outlined">PagerDuty関連</p>
                </div>
              ) : (
                <div className="schedule-name">
                  <p className="btn">コンテンツ更新情報</p>
                </div>
              )}
              <div className="w-full schedule-desc">
                <p className="font-bold">
                  {news.title}{" "}
                  {news.targetBlank ? (
                    <span className="inline-flex align-middle">
                      <img
                        className="inline-block"
                        src={externalLink}
                        alt="External Link"
                      />
                      <span className="text-[#BFBFBF] text-sm self-end leading-[0.8] ml-1">
                        EN
                      </span>
                    </span>
                  ) : null}
                </p>
                {/* <p>DevOpsは、ソフトウェアの提供とインフラストラクチャの変更のプロセ…</p> */}
              </div>
            </a>
          ))}
      </div>
      <div className="schedule-cta-btn-gp">
        <div className="blog-cta-btn schedule-cta-btn">
          <a href="/blog/">
            Blog一覧をみる{" "}
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              className="inline-block"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="17" cy="17" r="17" fill="#4EB346" />
              <path
                d="M26.7071 17.7071C27.0976 17.3166 27.0976 16.6834 26.7071 16.2929L20.3431 9.92893C19.9526 9.53841 19.3195 9.53841 18.9289 9.92893C18.5384 10.3195 18.5384 10.9526 18.9289 11.3431L24.5858 17L18.9289 22.6569C18.5384 23.0474 18.5384 23.6805 18.9289 24.0711C19.3195 24.4616 19.9526 24.4616 20.3431 24.0711L26.7071 17.7071ZM6 18L26 18L26 16L6 16L6 18Z"
                fill="white"
              />
            </svg>
          </a>
        </div>
        <div className="blog-cta-btn schedule-cta-btn">
          <a href="/news/">
            News一覧をみる
            <svg
              className="inline-block"
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="17" cy="17" r="17" fill="#4EB346" />
              <path
                d="M26.7071 17.7071C27.0976 17.3166 27.0976 16.6834 26.7071 16.2929L20.3431 9.92893C19.9526 9.53841 19.3195 9.53841 18.9289 9.92893C18.5384 10.3195 18.5384 10.9526 18.9289 11.3431L24.5858 17L18.9289 22.6569C18.5384 23.0474 18.5384 23.6805 18.9289 24.0711C19.3195 24.4616 19.9526 24.4616 20.3431 24.0711L26.7071 17.7071ZM6 18L26 18L26 16L6 16L6 18Z"
                fill="white"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShortNews;
