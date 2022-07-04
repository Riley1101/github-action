import { Link } from "gatsby";
import ReactMarkdown from "react-markdown";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { strapiURL } from "../utils/helpers";
import removeMd from "remove-markdown";
// @ts-ignore
import * as css from "./mdrender.module.sass";

const MdRenderer = ({
  children,
  isDescription = false,
  ...props
}: ReactMarkdownOptions & { children: string; isDescription?: boolean }) => {
  let c = children?.replace(/\]\(\/upload/g, `](${strapiURL}/upload`) || "";

  if (isDescription) {
    // remove image ?
    c = c.replace(/!\[([^\]]+)\]\((.*)\)/gm, "");
    // remove formatting
    c = removeMd(c);
  }

  // console.log(c);

  return (
    <ReactMarkdown
      components={{
        a: (props) =>
          props.href === "#" || props.href.startsWith("http") ? (
            <a
              href={props.href}
              target={props.href === "#" ? "_self" : "_blank"}
            >
              {props.children}
            </a>
          ) :
          props.href.startsWith("support@pagerduty.com") ? (
            <a href="mailto:support@pagerduty.com">
              {props.children}
            </a>
          )
          : (
            <a href={props.href}>{props.children}</a>
          ),
        iframe: (props) => (
          <div className={css.iframeContainer}>
            <iframe {...props} />
          </div>
        ),
      }}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      {...props}
      children={c}
    ></ReactMarkdown>
  );
};

export default MdRenderer;
