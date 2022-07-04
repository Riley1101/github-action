import SiteWrapper from "../components/wrapper";
import Title from "../components/title";
import "./docs-guide.scss";
import { graphql, Link } from "gatsby";
import { strapiRoute } from "../utils/helpers";
import { Helmet } from "react-helmet";

const DocsPage = ({ data }) => {
  const { strapi } = data;
  let blogPages = Array.from(Array(26), () => []);

  // console.log(strapi);
  strapi.docsPages.data.forEach(({ attributes: docs }) => {
    const firstLetter = docs.title.toUpperCase().charCodeAt(0);
    const index = firstLetter - 65;
    blogPages[index].push(docs);
  });

  return (
    <SiteWrapper>
      <Helmet>
        <title>Integration Guides | PagerDuty正規代理店 - 株式会社Digital Stacks</title>
        <meta
          name="description"
          content="米国PagerDutyサイトには200を超える他社サービスとのインテグレーションの仕方を解説したガイドが掲載されています。下記には、それを和訳したものを紹介しています。米国のインテグレーションガイドは"
        />
        <meta
          property="og:description"
          content="米国PagerDutyサイトには200を超える他社サービスとのインテグレーションの仕方を解説したガイドが掲載されています。下記には、それを和訳したものを紹介しています。米国のインテグレーションガイドは"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pagerduty.digitalstacks.net/" />
        <meta property="og:title" content="Integration Guides | PagerDuty正規代理店 - 株式会社Digital Stacks" />
        <meta property="og:image" content="https://pagerduty.digitalstacks.net/static/Logo-fcb0d40bea708966d9e28213abaa4811.png" />


      </Helmet>
      <Title textYellow="Docs Guides" textGreen="Docs Guides" classNames="mb-[40px] md:mb-[80px]" />
      <div className="docsguide-container px-[22px] !pt-0">
        <div className="heading-container text-center mb-[80px]">
          <p className="mb-4">
            米国PagerDutyサイトには200を超える他社サービスとのインテグレーションの仕方を解説したガイドが掲載されています。下記には、それを和訳したものを紹介しています。米国のインテグレーションガイドは
            <a
              href="https://www.pagerduty.com/integrations/"
              className="text-[#4EB346]"
              target="_blank"
              rel="noreferer"
            >
              こちら
            </a>
            を参照してください。
          </p>
          <p>
            なお、あなたが実際にPagerDutyサイトにログインして、各監視ツールとのインテグレーションを設定する際には、英語のインテグレーションガイドを参照できるリンクが用意されています。いったんそのページに飛んだあとで、
            <a
              href="https://www.pagerduty.com/"
              target="_blank"
              rel="noreferer"
              className="text-[#4EB346]"
            >
              https://www.pagerduty.com/
            </a>{" "}
            の部分を　
            <a
              href="https://pagerduty.digitalstacks.net/"
              target="_blank"
              rel="noreferer"
              className="text-[#4EB346]"
            >
              https://pagerduty.digitalstacks.net/
            </a>{" "}
            に変更して再度アクセスすると、私たちDigitalStacksが翻訳した日本語のページを見ることができます。
          </p>
        </div>

        {blogPages.map((section, index) => {
          if (!section.length) return null;
          return (
            <>
              <div className="divider-container !mb-[80px]">
                <div className="divider-left"></div>
                {String.fromCharCode(index + 65)}
                <div className="divider-right"></div>
              </div>
              <div className="gridSection mb-[80px]">
                {section.map((docs) => {
                  return (
                    <div className="grid-item">
                      <Link className="hover:text-[#4EB346]" to={`/docs/guides/${docs.uri}/`}>
                        <div className="img-container mx-auto">
                          <img
                            className="mx-auto w-[160px] max-h-[160px]"
                            src={strapiRoute(docs.logo.data.attributes.url)}
                          />
                        </div>
                        <div className="lable">{docs.title} インテグレーションガイド</div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </SiteWrapper>
  );
};

export const query = graphql`
  {
    strapi {
      docsPages(pagination: { limit: -1 }) {
        data {
          attributes {
            title
            logo {
              data {
                attributes {
                  url
                }
              }
            }
            uri
          }
        }
      }
    }
  }
`;

export default DocsPage;
