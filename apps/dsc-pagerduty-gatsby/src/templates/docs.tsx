import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import SiteWrapper from "../components/wrapper";
import { strapiRoute, strapiURL } from "../utils/helpers";
import MdRenderer from "../components/mdrender";
// @ts-ignore
import * as css from "../components/mdrender.module.sass";
import TitleBlock from "../components/title";
import cx from "classnames";
import removeMd from "remove-markdown";

const DocsPageTemplate = ({ data }) => {
  const { strapi } = data;

  // console.log(...removeMd(strapi.docsPage.data.attributes.overview));

  return (
    <SiteWrapper>
      <Helmet>
        <title>
          {strapi.docsPage.data.attributes.title} | Integration Guide |
          PagerDuty Authorized Distributor - Digital Stacks Inc.
        </title>

        {strapi.docsPage.data.attributes.overview && (
          <meta
            name="description"
            content={`${[...removeMd(strapi.docsPage.data.attributes.overview)]
              .slice(100)
              .join("")}...`}
          />
        )}
        {strapi.docsPage.data.attributes.overview && (
          <meta
            property="og:description"
            content={`${[...removeMd(strapi.docsPage.data.attributes.overview)]
              .slice(100)
              .join("")}...`}
          />
        )}
        {strapi.docsPage.data.attributes.overview && (
          <meta
            property="og:title"
            content={strapi.docsPage.data.attributes.title}
          />
        )}
        {strapi.docsPage.data.attributes.overview && (
          <meta property="og:type" content="website" />
        )}
        {strapi.docsPage.data.attributes.overview && (
          <meta
            property="og:url"
            content="https://pagerduty.digitalstacks.net/"
          />
        )}
        {strapi.docsPage.data.attributes.overview && (
          <meta
            property="og:image"
            content="https://pagerduty.digitalstacks.net/static/Logo-fcb0d40bea708966d9e28213abaa4811.png"
          />
        )}
      </Helmet>
      <TitleBlock
        classNames="md:mb-[80px] mb-[40px]"
        textYellow="DOCS"
        textGreen={`インテグレーションガイド / ${strapi.docsPage.data.attributes.title}`}
      />

      <div className="DocsWrapper container mb-[80px]">
        <div className="flex flex-col mb-6 md:flex-row">
          <img
            src={strapiRoute(
              strapi.docsPage.data.attributes.logo.data.attributes.url
            )}
            alt={strapi.docsPage.data.attributes.title}
            className="w-[150px] mr-8 mb-8 object-contain"
          />
          <div className={css.markdown}>
            <MdRenderer>{strapi.docsPage.data.attributes.overview}</MdRenderer>
          </div>
        </div>
        {strapi.docsPage.data.attributes.contents.map((contentBlock, i) => {
          return (
            <div key={i} className={cx(css.markdown, "mb-[80px]")}>
              <h2 className="mb-4 text-xl font-bold">{contentBlock.title}</h2>
              <MdRenderer children={contentBlock.content}></MdRenderer>
            </div>
          );
        })}
        {strapi.docsPage.data.attributes.faqs?.items.length && (
          <div className={css.markdown}>
            <h2 className="mb-4 text-xl font-bold">よくある質問</h2>
            <ol>
              {strapi.docsPage.data.attributes.faqs.items.map((faq, index) => (
                <li key={index}>
                  <p className="font-bold text-[18px] mb-2">{faq.question}</p>
                  <MdRenderer>{faq.answer}</MdRenderer>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </SiteWrapper>
  );
};

export const query = graphql`
  query ($id: ID) {
    strapi {
      docsPage(id: $id) {
        data {
          attributes {
            title
            overview
            logo {
              data {
                attributes {
                  url
                }
              }
            }
            contents {
              __typename
              ... on Strapi_ComponentDocspContentBlock {
                title
                content
              }
            }
            faqs {
              items {
                question
                answer
              }
            }
          }
        }
      }
    }
  }
`;

export default DocsPageTemplate;
