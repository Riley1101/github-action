import { Link } from "gatsby";
import { ReactNode } from "react";
import type { NavItemBaseProps } from ".";
import cx from "classnames";
// @ts-ignore
import "./NavItem.sass";

const isExternalRoute = (uri: string): boolean => uri === "#" || uri.startsWith("http");

export type NavItemProps = NavItemBaseProps & { children?: ReactNode };

const NavItem = ({ label, uri, ...rest }: NavItemProps) => (
  <li className={cx("NavItemItem", rest.itemClass)}>
    {isExternalRoute(uri) ? (
      <a className={cx("NavItemLink", rest.linkClass)} href={uri}>
        {label}
      </a>
    ) : (
      <Link className={cx("NavItemLink", rest.linkClass)} to={uri}>
        {label}
      </Link>
    )}
    {rest.children}
  </li>
);

export default NavItem;
