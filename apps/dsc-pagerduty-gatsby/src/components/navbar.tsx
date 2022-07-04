import { Link } from "gatsby";
// @ts-ignore
import logo from "../assets/images/Logo.png";
import "./navbar.scss";

const NavBar = ({ isLandingPage = false }: { isLandingPage?: boolean }) => (
  <nav className="flex items-center shadow-sm bg-[#353535] w-full min-w-[350px] max-w-[1180px] h-[60px] px-[25px] relative">
    <div className="w-full flex items-center text-white h-[60px] z-[11]">
      <Link to="/" className="text-[32px] logo">
        <img className="h-[28px] md:h-[35px] object-contain" src={logo} alt="PagerDuty" />
      </Link>
      <div className="flex grow w-[30px] md:w-full justify-end">
        <div className="w-[30px] h-[30px] md:w-full md:h-full flex flex-col items-center justify-center gap-[6px] cursor-pointer">
          <input
            aria-label="toggle navigation menu"
            type="checkbox"
            className="appearance-none w-[50px] h-full absolute right-[15px] peer cursor-pointer md:hidden"
          />
          <div className="w-full h-[2px] bg-white transition-all duration-75 peer-checked:translate-y-[7.5px] peer-checked:rotate-45 md:hidden"></div>
          <div className="w-full h-[2px] bg-white peer-checked:h-0 md:hidden"></div>
          <div className="w-full h-[2px] bg-white transition-all duration-75 peer-checked:-translate-y-[7.5px] peer-checked:-rotate-45 md:hidden"></div>
          <ul className="hidden ml-auto absolute bg-[#353535] w-full h-[calc(100vh-50px)] top-[95%] left-[50%] -translate-x-[50%] peer-checked:flex flex-col gap-[15px] justify-center md:flex md:flex-row md:relative md:top-0 md:h-full md:gap-0 md:justify-end items-center text-white">
            <li>
              <Link className="px-3 text-[14px] link" to="/product/">
                製品
              </Link>
            </li>
            <li className="relative">
              <Link className="px-3 text-[14px] link" to="/docs-guides/">
                インテグレーション
              </Link>
            </li>
            <li>
              <Link className="px-3 text-[14px] link" to="/casestudy/">
                事例
              </Link>
            </li>
            <li>
              <Link className="px-3 text-[14px] link" to="/support-help/">
                サポート
              </Link>
            </li>
            <li>
              <Link className="px-3 text-[14px] link" to="/blog/">
                ブログ
              </Link>
            </li>
            <li>
              <Link className="px-3 text-[14px] link" to="/pricelist/">
                価格
              </Link>
            </li>
            <li>
              <Link className="px-3 text-[14px] link" to="/contact-jp/">
                お問い合せ​
              </Link>
            </li>
            <li>
              <button className="p-3 text-[16px] bg-[#4EB346] rounded-[50px] w-[150px] h-[40px] whitespace-nowrap flex items-center justify-center group">
                <Link
                  to="/free-trial-2/?icid=mainmenu"
                  className="transition duration-[0.3s] ease-in group-hover:text-black text-white text-[16px] font-[700]"
                >
                  無料トライアル
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
);

export default NavBar;
