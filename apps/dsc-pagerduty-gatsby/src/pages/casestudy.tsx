import { graphql, Link } from "gatsby";
import MdRenderer from "../components/mdrender";
import SiteWrapper from "../components/wrapper";
// @ts-ignore
import * as md from "../components/mdrender.module.sass";
// @ts-ignore
import "../templates/blogList.scss";
import { strapiRoute } from "../utils/helpers";
import classNames from "classnames";
import "../utils/parts.scss";
import { Helmet } from "react-helmet";

const CaseStudyPage = ({ data }) => {
  const { strapi } = data;
  return (
    <SiteWrapper>
      <Helmet>
        <title>Case Studies | PagerDuty正規代理店 - 株式会社Digital Stacks</title>
        <meta
          name="description"
          content="Case Studies | PagerDuty正規代理店 - 株式会社Digital Stacks"
        />
        <meta
          property="og:description"
          content="Case Studies | PagerDuty正規代理店 - 株式会社Digital Stacks"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pagerduty.digitalstacks.net/" />
        <meta property="og:title" content="Case Studies | PagerDuty正規代理店 - 株式会社Digital Stacks" />
        <meta property="og:image" content="https://pagerduty.digitalstacks.net/static/Logo-fcb0d40bea708966d9e28213abaa4811.png" />
      </Helmet>
      <div className="titleWrapper heading-banner-container-no-desc !mb-[40px] md:!mb-[80px]">
        <div className="heading-banner">
          <h1 className="heading-banner-title-1">
            <span className="heading-banner-title-2">Case Study</span>
            <br />
            Pager Duty導入事例
          </h1>
        </div>
      </div>
      <div className="CaseStudyWrapper container pb-4 bg-white">
        {/* <div className="left-1 !mt-0 !pr-0 !pl-0">
          <h3 className="left-title">Overview</h3>
          <MdRenderer className={classNames(md.markdown, "mb-[50px] left-para")}>
            {strapi.caseStudyTop.data.attributes.overview}
          </MdRenderer>
        </div> */}
        <div className="grid md:grid-cols-2 gap-x-4 gap-y-8 mb-[100px]">
          {strapi.caseStudyPages.data
            .filter((c) => c.attributes.type === "A")
            .map((casestudy, i) => {
              return (
                <div key={i}>
                  <Link
                    className="block w-full mb-4"
                    to={`/casestudy-${casestudy.attributes.slug}/`}
                  >
                    <img
                      className="w-full md:h-[285px]"
                      src={strapiRoute(casestudy.attributes.mainImage.data.attributes.url)}
                      alt={casestudy.attributes.companyName}
                    />
                  </Link>
                  <h2 className="font-bold mb-4 after:hidden">
                    <Link
                      className="block w-full mb-4 text-base"
                      to={`/casestudy-${casestudy.attributes.slug}/`}
                    >
                      {casestudy.attributes.companyName}
                    </Link>
                  </h2>

                  <MdRenderer
                    className={classNames(
                      md.markdown,
                      "contentPreview description",
                      "[-webkit-line-clamp:1] mb-4"
                    )}
                  >
                    {casestudy.attributes.overview}
                  </MdRenderer>
                  {/* <div>
                    <Link
                      className="relative after:content-[url('./svg_cta.png')] after:absolute after:top-[50%] after:-right-[40px] after:-translate-y-[40%]"
                      to={`/${casestudy.attributes.slug}`}
                    >
                      詳しくはこちら
                    </Link>
                  </div> */}
                  <div className="three-col-cta">
                    <Link
                      to={`/casestudy-${casestudy.attributes.slug}/`}
                      className="ml-auto text-base flex group"
                    >
                      <span className="text-[16px]">詳しくはこちら</span>
                      <svg className="mt-[5px] ml-[2px] fill-[#929292] group-hover:fill-[#4EB346]" width="16px" height="16px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
                        viewBox="0 0 490 490" >
                        <polygon points="96.536,490 403.019,244.996 96.536,0 86.981,11.962 378.496,244.996 86.981,478.038 "/>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="center-1 !mt-0 !pl-0">
          <h2 className="center-title">信頼できる企業はPagerDutyを導入しています</h2>
          <MdRenderer className={classNames(md.markdown, "mb-4 center-para")}>
            {strapi.caseStudyTop.data.attributes.content}
          </MdRenderer>
        </div>
        <div className="grid md:grid-cols-2 gap-x-4 gap-y-4 mb-[100px]">
          {strapi.caseStudyTop.data.attributes.videos.map((video, i) => {
            return (
              <MdRenderer key={i} className={md.markdown}>
                {video.embedCode}
              </MdRenderer>
            );
          })}
        </div>
        <div className="grid md:grid-cols-4 gap-x-4 gap-y-4 mb-[100px]">
          {strapi.caseStudyPages.data
            .filter((c) => c.attributes.type === "B")
            .map((casestudy, i) => {
              return (
                <div key={i}>
                  <div className="h-auto md:h-[100px] flex items-center justify-center">
                    <img
                      className="w-[300px] mb-[-30px] md:w-[150px] h-auto md:h-[100px]"
                      src={strapiRoute(casestudy.attributes.mainImage.data.attributes.url)}
                      alt={casestudy.attributes.companyName}
                    />
                  </div>
                  {/* <div
                    className="w-full md:w-[150px] h-[100px] bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url('${strapiRoute(
                        casestudy.attributes.mainImage.data.attributes.url
                      )}')`,
                    }}
                  ></div> */}
                  <MdRenderer
                    className={classNames(
                      md.markdown,
                      "contentPreview description",
                      "[-webkit-line-clamp:1] mb-2"
                    )}
                  >
                    {casestudy.attributes.overview}
                  </MdRenderer>
                  <div className="three-col-cta">
                    <Link
                      className="text-center group flex"
                      to={`/casestudy/${casestudy.attributes.slug}/`}
                    >
                        <span className="text-[16px]">詳しくはこちら</span>
                        <svg className="fill-[#929292] group-hover:fill-[#4EB346] mt-[3px] ml-[2px]" width="16px" height="16px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
                          viewBox="0 0 490 490" >
                          <polygon points="96.536,490 403.019,244.996 96.536,0 86.981,11.962 378.496,244.996 86.981,478.038 "/>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                          <g>
                          </g>
                        </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-4 mb-4">
          {strapi.caseStudyTop.data.attributes.logos.map((logo, i) => {
            return (
              <div key={i}>
                <img className="mx-auto" src={strapiRoute(logo.image.data.attributes.url)} />
              </div>
            );
          })}
        </div>
      </div>
    </SiteWrapper>
  );
};

export const query = graphql`
  {
    strapi {
      caseStudyPages(pagination: { limit: -1 }) {
        data {
          attributes {
            type
            companyName
            overview
            slug
            mainImage {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
      caseStudyTop {
        data {
          attributes {
            overview
            content
            videos {
              embedCode
            }
            logos(pagination: { limit: -1 }) {
              image {
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
`;

export default CaseStudyPage;
