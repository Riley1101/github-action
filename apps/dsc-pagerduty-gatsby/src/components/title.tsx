// @ts-ignore
import * as css from "./title.module.sass";
// @ts-ignore
import * as md from "./mdrender.module.sass";
import cx from "classnames";
import { over } from "lodash";
import MdRenderer from "./mdrender";

const TitleBlock = ({
  textYellow,
  textGreen,
  overview,
  classNames,
}: {
  textYellow?: string;
  textGreen: string;
  overview?: string;
  classNames?: string;
}) => (
  <div
    className={cx(
      "titleWrapper",
      overview ? "md:h-[190px]" : "md:h-[140px]",
      classNames,
      css.headingBannerContainer
    )}
  >
    <div className={css.headingBanner}>
      <h1 className={css.headingTitle1}>
        {textYellow && (
          <>
            <span className={css.headingTitle2}>{textYellow}</span>
            <br />
          </>
        )}
        {textGreen}
      </h1>
      <MdRenderer
        className={cx("text-[#353535] text-[18px] leading-[32px] pt-[15px]", md.markdown)}
      >
        {overview}
      </MdRenderer>
    </div>
  </div>
);

export default TitleBlock;
