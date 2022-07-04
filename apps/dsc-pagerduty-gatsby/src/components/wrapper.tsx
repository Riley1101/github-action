import { Fragment, ReactNode, useEffect } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
// @ts-ignore
import searchIcon from "../assets/images/SearchIcon.png";
// @ts-ignore
import digitalStack from "../assets/images/DigitalStacksLogo.png";
import "./wrapper.scss";

const SiteWrapper = ({
  children,
  isLandingPage = false,
}: {
  children: ReactNode;
  isLandingPage?: boolean;
}) => {
  useEffect(() => {
    if (document.location.hostname === "dsc-pagerduty-gatsby.pages.local") {
      const newURL = `https://pagerduty.digitalstacks.net${document.location.pathname}${document.location.search}${document.location.hash}`;
      window.location.replace(newURL);
    }
  }, []);

  return (
    <Fragment>
      <div className="top-nav !max-w-[1180px]">
        <div className="top-nav-logo">
          <img src={digitalStack} alt="Digita Stack Corporate Site" />
        </div>
        <div className="top-nav-cta">
          <a className="flex group" href="https://www.digitalstacks.net/" target="_blank">
            <p className="mr-2 text-[12px]">
              Corporate Site
            </p>
            {/* <svg
              className="group-hover:stroke-[#4EB346]"
              width="14"
              height="17"
              viewBox="0 0 14 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 16L13 8.5L1 0.999999" stroke="#959595" />
            </svg> */}
            <svg className="fill-[#959595] group-hover:fill-[#4EB346]" width="14px" height="17px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
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
          </a>
        </div>
        {/* <div className="top-nav-search">
        <input className="top-nav-input" placeholder="Googleサイト内検索" />
        <img className="search-icon" src={searchIcon} />
      </div> */}
      </div>
      <div className="top-page-padding-wrapper mx-auto">
        <Navbar isLandingPage={isLandingPage} />
        <main className="w-full">{children}</main>
      </div>
      <Footer isLandingPage={isLandingPage} />
    </Fragment>
  );
};

export default SiteWrapper;
