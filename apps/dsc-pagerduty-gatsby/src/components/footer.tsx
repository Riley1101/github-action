import "./footer.scss";
// @ts-ignore
import twttier from "../assets/images/twitter.png";
// @ts-ignore
import facebook from "../assets/images/facebook.png";

import { Link } from "gatsby";

const Footer = ({ isLandingPage = false }: { isLandingPage?: boolean }) => (
  <>
    <div className="footer">
      <div className="footer-header-container">
        <div className="footer-header">
          <p className="footer-text">
            PagerDutyに関するお問い合わせは
            <br />
            お気軽にお寄せください。
          </p>
        </div>
        <div className="footer-btn-group">
          <button className="footer-btn-1">
            <Link to="/free-trial-2/?icid=mainmenu">無料トライアル</Link>
          </button>
          <button className="footer-btn-2">
            <Link to="/contact-jp/">お問い合せ</Link>
          </button>
        </div>
      </div>
      <div className="footer-links-container">
        <div className="footer-col">
          <p className="w-full leading-[24px] mb-[5px] text-white text-[18px] font-bold">
            会社情報
          </p>
          <p className="footer-col-li mb30">株式会社Digital Stacks</p>
          <p className="footer-col-li">〒141-0001</p>
          <p className="footer-col-li">東京都品川区北品川5-5-15​</p>
          <p className="footer-col-li">大崎ブライトコア 4F SHIP 414</p>
          <div className="sns-logo-container mb-[35px] mt-[15px]">
            <Link
              to="https://twitter.com/DigitalStacks_p/"
              target="_blank"
              rel="noreferrer"
              className="twitter-logo"
            >
              <img src={twttier} alt="Twitter" />
            </Link>
            <Link
              to="https://www.facebook.com/DigitalStacksCorporation"
              className="facebook-logo"
              target="_blank"
              rel="noreferrer"
            >
              <img src={facebook} alt="Facebook" />
            </Link>
          </div>
        </div>
        <div className="footer-col">
          <ul className="footer-col-ul">
            <li className="footer-col-li">
              <Link to="/">Home</Link>​
            </li>
            <li className="footer-col-li">
              <Link to="/product/">製品情報​</Link>
            </li>
            <li className="footer-col-li">
              <Link to="/product/features/">PagerDutyの製品機能​</Link>
            </li>
            <li className="footer-col-li">
              <Link to="/product/applications/">操作画面の特徴​</Link>
            </li>
            <li className="footer-col-li">
              <Link to="/product/developers/">開発者の責任</Link>​
            </li>
            <li className="footer-col-li">
              <Link to="/product/use-cases/">部門ごとのPagerDuty活用法​</Link>
            </li>
            <li className="footer-col-li">
              <Link to="/product/it-operations/">ITの運用​</Link>
            </li>
            <li className="footer-col-li">
              <Link to="/video/">ビデオで学ぶPagerDuty</Link>​
            </li>
            <li className="footer-col-li">
              <Link to="/casestudy/">PagerDuty導入事例​</Link>
            </li>
          </ul>
          <ul className="footer-col-ul">
            <li className="footer-col-li">
              <Link to="/support-help/">サポート​</Link>
            </li>
            <li className="footer-col-li">
              <Link to="/faq/">FAQ​</Link>
            </li>
            <li className="footer-col-li">
              <Link to="/docs-guides/">インテグレーションガイド​</Link>
            </li>
            <li className="footer-col-li">
              <Link
                to="https://pagerduty-digitalstacks.zendesk.com/hc/ja/"
                target="_blank"
              >
                日本語サポートサイト​
              </Link>
            </li>
          </ul>
          <ul className="footer-col-ul">
            <li className="footer-col-li">
              <Link to="/merit/">DSCが選ばれるポイント</Link>​
            </li>
            <li className="footer-col-li">
              <Link to="/pricelist/">価格</Link>​
            </li>
            <li className="footer-col-li">
              <Link to="/news/">お知らせ​</Link>
            </li>
            <li className="footer-col-li">
              <Link to="/blog/">Blog</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <ul className="footer-col-ul">
            <li className="footer-col-li">
              <Link to="/product/features/event-grouping-and-enrichment/">
                アラートの集約と分類​
              </Link>
            </li>
            <li className="footer-col-li">
              <Link to="/product/features/service-and-team-organization/">
                サービスとチームの組織​
              </Link>
            </li>
            <li className="footer-col-li">
              <Link to="/product/features/system-and-user-reporting/">
                システム＆ユーザーレポート​
              </Link>
            </li>
            <li className="footer-col-li">
              <Link to="/product/features/platform-extensibility/">
                プラットフォームの拡張性
              </Link>
              ​
            </li>
            <li className="footer-col-li">
              <Link to="/product/features/mobile-incident-management/">
                モバイルでのインシデント管理​
              </Link>
            </li>
            <li className="footer-col-li">
              <Link to="/product/features/live-call-routing/">
                ライブコールルーティング​
              </Link>
            </li>
            <li className="footer-col-li">
              <Link to="/product/features/real-time-collaboration/">
                リアルタイムコラボレーション​
              </Link>
            </li>
            <li className="footer-col-li">
              <Link to="/product/features/post-mortems/">
                事後検証から学び改善する
              </Link>
              ​
            </li>
            <li className="footer-col-li">
              <Link to="/product/features/always-on-reliability/">
                信頼性の高い環境​
              </Link>
            </li>
            <li className="footer-col-li">
              <Link to="/product/features/reliable-alerting/">
                多様なアラート機能​
              </Link>
            </li>
            <li className="footer-col-li">
              <Link to="/product/features/easy-scheduling/">
                簡単なスケジューリング​
              </Link>
            </li>
            <li className="footer-col-li">
              <Link to="/product/features/enterprise-grade-security/">
                エンタープライズレベルのセキュリティ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="py-4 bot-footer md:flex-row">
      <div className="mb-2 copy-right md:mb-0">
        Copyright © Digital Stacks Corporation. All Rights Reserved.
      </div>
      <div className="water-marks">
        <Link
          className="water-marks-text"
          to="https://www.digitalstacks.net/company/"
          target="_blank"
        >
          販売会社情報
        </Link>
        <Link
          className="water-marks-text"
          to="https://www.digitalstacks.net/privacypolicy/"
          target="_blank"
        >
          個人情報保護方針
        </Link>
        <Link
          className="water-marks-text"
          to="https://www.digitalstacks.net/termsofuse/"
          target="_blank"
        >
          サイト利用規約
        </Link>
      </div>
    </div>
  </>
);

export default Footer;
