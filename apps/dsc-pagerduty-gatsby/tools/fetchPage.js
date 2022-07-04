require("dotenv").config();
const fetch = require("node-fetch");
const HTMLtoJSX = require("htmltojsx");
const { promises: fs, mkdirSync, existsSync, write } = require("fs");
const { resolve, dirname, relative: _relative, sep, posix } = require("path");
const { strapiRoute } = require("../src/utils/helpers");
const prettier = require("prettier");

const jsxConverter = new HTMLtoJSX({ createClass: false });
const relative = (from, to) => {
  let r = _relative(dirname(from), to);
  if (!r.startsWith("..")) r = `./${r}`;
  return r.split(sep).join(posix.sep);
};
let faqMark = {
  "@context": "https://pagerduty.digitalstacks.net/",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "PagerDutyとは何ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PagerDutyは監視ツールやアプリケーションからのアラートを受けて、いろいろな方法でインシデントの発生を確実に担当者に通報するシステムです。ダウンタイムやシステムの不正確さから企業を保護するサービスで、他の監視ツールとの統合も可能。チーム全体にとって必要な警告～警報に優先順位を付け、メールやSMS、音声メッセージなどでアラート送信してくれます。",
      },
    },
    {
      "@type": "Question",
      name: "PagerDutyの費用は?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Professional プランで21ドル（1ユーザー／月：年払い）、Businessプラン41ドル（1ユーザー／月：年払い）になります。詳しくは<a href="https://pagerduty.digitalstacks.net/pricelist/">プライスリスト</a>でご確認ください',
      },
    },
    {
      "@type": "Question",
      name: "14日間の無料トライアルはどんなことができますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: '無料トライアル期間中は、全部の機能が使えて、電話やSMSを無料で送信できます。ご購入するまではクレジットカード登録も不要ですので課金されることはありません。無料トライアルの申し込みは<a href="https://pagerduty.digitalstacks.net/free-trial-2/?icid=mainmenu">こちら</a>',
      },
    },
  ],
}.toString();
const snakeToCamel = (str) =>
  str.replace(/([/]\w)/g, (g) => g[1].toUpperCase());

const snakeToPascal = (str) => {
  let camelCase = snakeToCamel(str);
  let pascalCase = camelCase[0].toUpperCase() + camelCase.substr(1);
  return pascalCase;
};

fetch(
  `${process.env.GATSBY_STRAPI_URL}/api/pages?populate=sections&populate=pageTitleBanner&pagination[limit]=-1`
)
  .then((res) => res.json())
  .then((pages) => {
    pages.data.forEach((page) => {
      let fileName = (
        page.attributes.uri.endsWith("/")
          ? `${page.attributes.uri}index.js`
          : `${page.attributes.uri}.js`
      ).substring(1);
      let className = `Generated${snakeToPascal(fileName).slice(0, -3)}`;
      className = className.replace(/[-_][a-z0-9]/g, (group) =>
        group.toUpperCase().replace(/-/g, "").replace(/_/g, "")
      );

      const writePath = resolve(__dirname, "..", "src", "pages", fileName);
      let parentFolder = dirname(writePath);
      if (!existsSync(parentFolder))
        mkdirSync(parentFolder, { recursive: true });

      let imports = [];
      let hasCss =
        typeof page.attributes.css === "string" && page.attributes.css !== "";
      let hasHtml =
        Array.isArray(page.attributes.sections) &&
        page.attributes.sections.length > 0;
      let cssPath = resolve(
        __dirname,
        "..",
        "src",
        "pages",
        `${fileName.slice(0, -3)}@gen.scss`
      );
      // console.log(page.attributes)

      if (!hasHtml) return;

      if (hasCss) {
        let cssCode = page.attributes.css;

        let srcMatches = cssCode.matchAll(
          /url\(('|")?(\/uploads\/.*\.(jpg|webp|png|jpeg|ico|gif|svg))('|")?\)/g
        );
        [...srcMatches].forEach((match) => {
          // console.log(match.slice(0, 4));
          cssCode = cssCode.replace(
            match[0],
            `url('${strapiRoute(match[2])}')`
          );
        });

        const prettied = prettier.format(cssCode, { parser: "css" });
        fs.writeFile(cssPath, prettied).then(() => {
          console.log(`wrote CSS to ${cssPath}`);
        });
        imports.push({ path: relative(writePath, cssPath) });
      }

      const shortCode = (scode) =>
        relative(
          writePath,
          resolve(__dirname, "..", "src", "components", "shortcodes", scode)
        );

      let htmls = page.attributes.sections.map((section) => {
        let html = section.html;
        html = jsxConverter.convert(html);

        if (html.includes("[shortcode::ShortNews]")) {
          imports.push({ path: shortCode("ShortNews"), mod: "ShortNews" });
          if (
            existsSync(
              resolve(
                __dirname,
                "..",
                "src",
                "components",
                "shortcodes",
                "ShortNews.scss"
              )
            )
          ) {
            imports.push({
              path: relative(
                writePath,
                resolve(
                  __dirname,
                  "..",
                  "src",
                  "components",
                  "shortcodes",
                  "ShortNews.scss"
                )
              ),
            });
          }
          html = html.replace("[shortcode::ShortNews]", "<ShortNews />");
        }
        if (html.includes("[shortcode::HomeCompanies]")) {
          imports.push({
            path: shortCode("HomeCompanies"),
            mod: "HomeCompanies",
          });
          if (
            existsSync(
              resolve(
                __dirname,
                "..",
                "src",
                "components",
                "shortcodes",
                "HomeCompanies.scss"
              )
            )
          ) {
            imports.push({
              path: relative(
                writePath,
                resolve(
                  __dirname,
                  "..",
                  "src",
                  "components",
                  "shortcodes",
                  "HomeCompanies.scss"
                )
              ),
            });
          }
          html = html.replace(
            "[shortcode::HomeCompanies]",
            "<HomeCompanies />"
          );
        }

        // replace upload images
        let srcMatches = html.matchAll(
          /src=('|")(\/uploads\/.*\.(jpg|webp|png|jpeg|ico|gif|svg))('|")/g
        );
        [...srcMatches].forEach((match) => {
          // console.log(match.slice(0, 4));
          html = html.replace(match[0], `src="${strapiRoute(match[2])}"`);
        });
        // replace inline bg image
        let bgMatches = html.matchAll(
          /bg-\[url\(('|")?(\/uploads\/.*\.(jpg|webp|png|jpeg|ico|gif|svg))('|")?\)\]/g
        );
        [...bgMatches].forEach((match) => {
          // console.log(match.slice(0, 6));
          html = html.replace(match[0], `bg-[url('${strapiRoute(match[2])}')]`);
        });
        return html;
      });

      const wrapperPath = relative(
        writePath,
        resolve(__dirname, "..", "src", "components", "wrapper.tsx")
      );

      const generatedJsx = `
        import SiteWrapper from "${wrapperPath}";
        import { Helmet } from "react-helmet";
        ${page.attributes.script ? `import {useEffect} from "react"` : ""}
        ${
          page.attributes.pageTitleBanner
            ? `
          import MdRenderer from "${relative(
            writePath,
            resolve(__dirname, "..", "src", "components", "mdrender")
          )}";
          import * as md from "${relative(
            writePath,
            resolve(
              __dirname,
              "..",
              "src",
              "components",
              "mdrender.module.sass"
            )
          )}";
          import TitleBlock from "${relative(
            writePath,
            resolve(__dirname, "..", "src", "components", "title")
          )}";
        `
            : ""
        }

        ${imports
          .map((imp) => {
            if (imp.mod) {
              return `import ${imp.mod} from "${imp.path}"`;
            } else {
              return `import "${imp.path}"`;
            }
          })
          .join("\n")}

        const ${className} = () =>{
          ${
            page.attributes.script
              ? `
            useEffect(() => {
              ${page.attributes.script}
              ${
                page.attributes.cleanupScript
                  ? `
              return () => {
                ${page.attributes.cleanupScript}
              }
              `
                  : ""
              }
            }, []);
          `
              : ""
          }
          return (
    
          <SiteWrapper isLandingPage={${
            page.attributes.isLandingPage || false
          }}>
            <Helmet>
              <title>${page.attributes.metaTitle}</title>
               
              ${
                page.attributes.metaDescription
                  ? `<meta name="description" content="${page.attributes.metaDescription}" />`
                  : ""
              }
              ${
                page.attributes.metaTitle
                  ? `
                  <meta property="og:title" content="${page.attributes.metaTitle}" />`
                  : ""
              }
              ${
                page.attributes.metaDescription
                  ? `
                  <meta property="og:description" content="${page.attributes.metaDescription}" />`
                  : ""
              }
              <meta property="og:url" ${
                !page.attributes.uri.includes("404") ? 'rel="canonical"' : ""
              }  content="https://pagerduty.digitalstacks.net${
        page.attributes.uri !== "/" ? `${page.attributes.uri}/` : "/"
      }" />
              <meta property="og:type" content="website" />
              <meta property="og:image" content="https://pagerduty.digitalstacks.net/static/Logo-fcb0d40bea708966d9e28213abaa4811.png" />
            
              </Helmet>

           ${
             page.attributes.pageTitleBanner
               ? `
           <TitleBlock
              classNames="md:mb-[80px] mb-[40px]"
              textYellow="${page.attributes.pageTitleBanner.textYellow || ""}"
              textGreen="${page.attributes.pageTitleBanner.textGreen}"
              overview="${page.attributes.pageTitleBanner.overview || ""}"
            />
           `
               : ""
           }
           ${htmls.length ? htmls.join("\n") : ""}
          </SiteWrapper>
        )}
        export default ${className}
      `;

      fs.writeFile(
        writePath,
        prettier.format(generatedJsx, { parser: "babel" })
      ).then(() => {
        console.log(`wrote HTML to ${writePath}`);
      });
    });
  });
