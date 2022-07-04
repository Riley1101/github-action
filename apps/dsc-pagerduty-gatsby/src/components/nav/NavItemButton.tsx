import { NavItemBaseProps } from ".";
import NavItem from "./NavItem";
// @ts-ignore
import "./NavItemButton.sass";

const NavItemButton = (props: NavItemBaseProps) => (
  <NavItem itemClass={["NavItemButton"]} linkClass={["NavItemButtonLink"]} {...props} />
);

export default NavItemButton;
