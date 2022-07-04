import { graphql } from "gatsby";
import MdRenderer from "../components/mdrender";
import SiteWrapper from "../components/wrapper";
import { strapiRoute } from "../utils/helpers";
// @ts-ignore
import * as md from "../components/mdrender.module.sass";
import "../utils/parts.scss";
import "./casestudy.scss";
import { Helmet } from "react-helmet";
import TitleBlock from "../components/title";
import removeMd from "remove-markdown";

const CaseStudyTemplate = ({ data }) => {
  const { strapi } = data;

  return (
    <SiteWrapper>
      <Helmet>
        <title>
          {strapi.caseStudyPage.data.attributes.companyName || "Case Study"} |
          PagerDuty正規代理店 - 株式会社Digital Stacks
        </title>
        {strapi.caseStudyPage.data.attributes.overview && (
          <meta
            name="description"
            content={`${[
              ...removeMd(strapi.caseStudyPage.data.attributes.overview),
            ]
              .slice(0, 100)
              .join("")}...`}
          />
        )}
        {strapi.caseStudyPage.data.attributes.overview && (
          <meta
            property="og:description"
            content={`${[
              ...removeMd(strapi.caseStudyPage.data.attributes.overview),
            ]
              .slice(0, 100)
              .join("")}...`}
          />
        )}
        {strapi.caseStudyPage.data.attributes.overview && (
          <meta
            property="og:title"
            content={
              strapi.caseStudyPage.data.attributes.companyName || "Case Study"
            }
          />
        )}
        {strapi.caseStudyPage.data.attributes.overview && (
          <meta property="og:type" content="website" />
        )}
        {strapi.caseStudyPage.data.attributes.overview && (
          <meta
            property="og:image"
            content="https://pagerduty.digitalstacks.net/static/Logo-fcb0d40bea708966d9e28213abaa4811.png"
          />
        )}
        {strapi.caseStudyPage.data.attributes.overview && (
          <meta
            property="og:url"
            content="https://pagerduty.digitalstacks.net/"
          />
        )}
      </Helmet>
      <TitleBlock
        textYellow="Case Study"
        textGreen={strapi.caseStudyPage.data.attributes.companyName}
        classNames="mb-[40px] md:mb-[80px]"
      />
      <div className="caseStudyWrapper container pb-4 mb-[20px]">
        <div className="case-study-wrapper">
          {strapi.caseStudyPage.data.attributes.type === "A" && (
            <div className="two-col-media-contents !mt-0">
              <div className="media-contents-part">
                <img
                  src={strapiRoute(
                    strapi.caseStudyPage.data.attributes.mainImage.data
                      .attributes.url
                  )}
                  className="w-full"
                  alt={strapi.caseStudyPage.data.attributes.mainImageCaption}
                />
                <p>{strapi.caseStudyPage.data.attributes.mainImageCaption}</p>
              </div>
              <div className="text-part">
                <MdRenderer className={md.markdown}>
                  {strapi.caseStudyPage.data.attributes.mainText}
                </MdRenderer>
              </div>
            </div>
          )}
          {strapi.caseStudyPage.data.attributes.type === "A" && (
            <div className="body-para">
              <MdRenderer className={md.markdown}>
                {strapi.caseStudyPage.data.attributes.overview}
              </MdRenderer>
            </div>
          )}
          <div className="grid-container">
            <div className="left-grid">
              {strapi.caseStudyPage.data.attributes.type === "B" && (
                <div>
                  <MdRenderer className={md.markdown}>
                    {strapi.caseStudyPage.data.attributes.overview}
                  </MdRenderer>
                </div>
              )}
              {strapi.caseStudyPage.data.attributes.contents.map(
                (content, i) => {
                  if (content.img.data) {
                    return (
                      <div className="two-col">
                        <div className="left-part">
                          <MdRenderer className={md.markdown}>
                            {content.content}
                          </MdRenderer>
                        </div>
                        <div className="right-part">
                          <img
                            className="w-full"
                            src={strapiRoute(content.img.data.attributes.url)}
                            alt={content.caption}
                          />
                          <p>{content.caption}</p>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <MdRenderer key={i} className={md.markdown}>
                      {content.content}
                    </MdRenderer>
                  );
                }
              )}
            </div>
            <div className="right-grid">
              {strapi.caseStudyPage.data.attributes.type === "A" ? (
                <div className="mixi-container">
                  <div className="logo-header">
                    <img
                      src={strapiRoute(
                        strapi.caseStudyPage.data.attributes.companyInfo[0].logo
                          .data.attributes.url
                      )}
                      alt={strapi.caseStudyPage.data.attributes.companyName}
                    />
                  </div>
                  <p>
                    <span className="font-bold">会社・団体名</span>:{" "}
                    {strapi.caseStudyPage.data.attributes.companyInfo[0].name}
                  </p>
                  <p>
                    <span className="font-bold">業種</span>:{" "}
                    {
                      strapi.caseStudyPage.data.attributes.companyInfo[0]
                        .industry
                    }
                  </p>
                  <p>
                    <span className="font-bold">製品・サービス</span>:{" "}
                    {
                      strapi.caseStudyPage.data.attributes.companyInfo[0]
                        .product
                    }
                  </p>
                  <p>
                    <span className="font-bold">企業サイト</span>:{" "}
                    <a
                      href={
                        strapi.caseStudyPage.data.attributes.companyInfo[0].site
                      }
                      className="text-[#048a24] text-base whitespace-pre-wrap"
                      target="_blank"
                      rel="noreferer"
                    >
                      {strapi.caseStudyPage.data.attributes.companyInfo[0].site}
                    </a>
                  </p>
                  <div className="mixi-btn-gp">
                    <button className="solid-btn">
                      <a href="/free-trial-2/?icid=mainmenu">無料トライアル</a>
                    </button>
                    <button className="outlined-btn">
                      <a href="/contact-jp/">お問い合わせ</a>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mixi-container">
                  <div className="logo-header">
                    <img
                      src={strapiRoute(
                        strapi.caseStudyPage.data.attributes.mainImage.data
                          .attributes.url
                      )}
                      alt={strapi.caseStudyPage.data.attributes.companyName}
                    />
                  </div>
                  <p>
                    <span className="font-bold">従業員数</span>:{" "}
                    {
                      strapi.caseStudyPage.data.attributes.companyInfo[0]
                        .employeeCount
                    }
                  </p>
                  <p>
                    <span className="font-bold">業種</span>:{" "}
                    {
                      strapi.caseStudyPage.data.attributes.companyInfo[0]
                        .businessContent
                    }
                  </p>
                  <p>
                    <span className="font-bold">所在地</span>:{" "}
                    {
                      strapi.caseStudyPage.data.attributes.companyInfo[0]
                        .location
                    }
                  </p>
                  <p>
                    <span className="font-bold">取引期間</span>:{" "}
                    {strapi.caseStudyPage.data.attributes.companyInfo[0].period}
                  </p>
                  <div className="mixi-btn-gp">
                    <button className="solid-btn">
                      <a href="/free-trial-2/?icid=mainmenu">無料トライアル</a>
                    </button>
                    <button className="outlined-btn">
                      <a href="/contact-jp">お問い合わせ</a>
                    </button>
                  </div>
                </div>
              )}
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
      caseStudyPage(id: $id) {
        data {
          attributes {
            type
            companyInfo {
              ... on Strapi_ComponentCasestudypCompanyInfoA {
                id
                name
                product
                site
                industry
                logo {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
              ... on Strapi_ComponentCasestudypCompanyInfoB {
                id
                businessContent
                employeeCount
                location
                period
              }
            }
            companyName
            contents {
              content
              img {
                data {
                  attributes {
                    url
                  }
                }
              }
              imagePosition
              caption
            }
            mainImage {
              data {
                attributes {
                  url
                }
              }
            }
            mainText
            mainImageCaption
            overview
            rightContents
          }
        }
      }
    }
  }
`;

export default CaseStudyTemplate;
