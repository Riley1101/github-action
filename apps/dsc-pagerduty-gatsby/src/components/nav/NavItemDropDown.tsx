import { NavItemBaseProps } from ".";
import NavItem from "./NavItem";
// @ts-ignore
import "./NavItemDropDown.sass";

// prettier-ignore
export interface NavItemDropDownProps extends NavItemBaseProps
  { dropdownItems: NavItemBaseProps[] }

const NavItemDropDown = ({ label, uri, dropdownItems }: NavItemDropDownProps) => (
  <NavItem itemClass={["NavItemDropDownNavItem"]} label={label} uri={uri}>
    <ul className="NavItemDropDown">
      {dropdownItems.map((dropdownItem, diIndex) => (
        <NavItem
          label={dropdownItem.label}
          key={diIndex}
          uri={dropdownItem.uri}
          itemClass={["NavItemDropDownItem"]}
          linkClass={["NavItemDropDownItemLink"]}
        />
      ))}
    </ul>
  </NavItem>
);

export default NavItemDropDown;
