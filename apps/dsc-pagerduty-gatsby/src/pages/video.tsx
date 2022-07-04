import { graphql } from "gatsby";
import SiteWrapper from "../components/wrapper";
// @ts-ignore
import * as css from "./video.module.sass";
import MdRenderer from "../components/mdrender";
// @ts-ignore
import * as md from "../components/mdrender.module.sass";
import cx from "classnames";
import TitleBlock from "../components/title";
import { Helmet } from 'react-helmet';

const VideoPage = ({ data }) => (
  <SiteWrapper>

    <Helmet>
      <title>ビデオで学ぶPager Duty | PagerDuty正規代理店 - 株式会社Digital Stacks</title>
      <meta
        name="description"
        content="PagerDuty の Video を公開しているページです。 Youtube の字幕機能をONにして御覧ください。"
      />
      <meta
        property="og:description"
        content="PagerDuty の Video を公開しているページです。 Youtube の字幕機能をONにして御覧ください。"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://pagerduty.digitalstacks.net/" />
      <meta property="og:title" content="ビデオで学ぶPager Duty | PagerDuty正規代理店 - 株式会社Digital Stacks" />
      <meta property="og:image" content="https://pagerduty.digitalstacks.net/static/Logo-fcb0d40bea708966d9e28213abaa4811.png" />
    </Helmet>

    <TitleBlock
      classNames="mb-[80px]"
      textYellow="Video"
      textGreen="ビデオで学ぶPager Duty"
      overview="PagerDuty の Video を公開しているページです。 Youtube の字幕機能をONにして御覧ください。"
    />
    <div className="VideoWrapper container px-[25px] mb-[80px]">
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {data.strapi.videoPage.data.attributes.videos.map((video, index) => {
          return (
            <div className={css.videoSection}>
              <p className="font-bold mb-4 text-[18px]">{video.title}</p>
              <div
                className="mb-4 h-[300px]"
                dangerouslySetInnerHTML={{ __html: video.embedCode }}
              />
              <MdRenderer className={cx(md.markdown, "text-[18px]")}>{video.overview}</MdRenderer>
            </div>
          );
        })}
      </div>
    </div>
  </SiteWrapper>
);

export const query = graphql`
  {
    strapi {
      videoPage {
        data {
          attributes {
            videos {
              ... on Strapi_ComponentVideopVideoBlock {
                title
                overview
                embedCode
              }
            }
          }
        }
      }
    }
  }
`;

export default VideoPage;
