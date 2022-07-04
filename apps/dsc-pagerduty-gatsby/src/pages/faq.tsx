import SiteWrapper from "../components/wrapper";
import MdRenderer from "../components/mdrender";
import cx from "classnames";
// @ts-ignore
import * as md from "../components/mdrender.module.sass";
import { useState } from "react";
import openIcon from "../assets/images/pages/faq/open.png";
import closeIcon from "../assets/images/pages/faq/close.png";
import { Helmet } from 'react-helmet';


const FaqComponent = ({ row }: { row: any }) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <li>
      <h3 className="mb-2 flex text-[18px] cursor-pointer select-none" onClick={() => setShow(!show)}>
        <img
          className="inline-block mt-[8px] w-[34px] h-[34px] mr-[15px]"
          src={show ? closeIcon : openIcon}
          alt="toggle FAQ"
        />
        {row.cells[0].value}
      </h3>
      <MdRenderer
        className={cx(
          md.markdown,
          "overflow-hidden mb-6 text-[18px] leading-[2]",
          show ? "pl-[48px] max-h-[1000px]" : "max-h-0"
        )}
        children={row.cells[1].value}
      ></MdRenderer>
    </li>
  );
};

const FaqPage = ({ pageContext: { faqs } }) => {
  const publicFaqs = faqs.rows.filter((row) => row.cells[3].value);
  const [activeTag, setActiveTag] = useState("All");

  const tagLists = [
    ...new Set([
      "All",
      ...publicFaqs
        .filter((row) => row.cells[2].value)
        .map((row) => row.cells[2].value.split(","))
        .flat(),
    ]),
  ];

  return (
    <SiteWrapper>
      <Helmet>
        <title>よくある質問 | PagerDuty正規代理店 - 株式会社Digital Stacks</title>
        <meta
          name="description"
          content="よくある質問 | PagerDuty正規代理店 - 株式会社Digital Stacks"
        />
        <meta
          property="og:description"
          content="よくある質問 | PagerDuty正規代理店 - 株式会社Digital Stacks"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pagerduty.digitalstacks.net/" />
        <meta property="og:title" content="よくある質問 | PagerDuty正規代理店 - 株式会社Digital Stacks" />
        <meta property="og:image" content="https://pagerduty.digitalstacks.net/static/Logo-fcb0d40bea708966d9e28213abaa4811.png" />
      </Helmet>

      <div className="titleWrapper heading-banner-container-no-desc !mb-[40px] md:!mb-[80px]">
        <div className="heading-banner">
          <h1 className="heading-banner-title-1">
            <span className="heading-banner-title-2">FAQ</span>
            <br />
            よくある質問
          </h1>
        </div>
      </div>
      <div className="FaqWrapper container pb-8">
        <div className="mb-[20px]">
          {tagLists.map((tag, i) => (
            <button
              onClick={() => setActiveTag(tag)}
              className="text-[18px] w-[143px] p-[10px] rounded-[25px] border-[#4EB346] border-[1px] mr-[16px] mb-[10px]"
              style={{ backgroundColor: tag === activeTag ? "#4EB346" : "transparent" }}
              key={i}
            >
              {tag}
            </button>
          ))}
        </div>
        <ul>
          {publicFaqs
            .filter(
              (row) => activeTag === "All" || row.cells[2].value?.split(",").includes(activeTag)
            )
            .map((row, index) => {
              return <FaqComponent key={index} row={row} />;
            })}
        </ul>
      </div>
    </SiteWrapper>
  );
};

export default FaqPage;
