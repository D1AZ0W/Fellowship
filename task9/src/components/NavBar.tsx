import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export const NavBar = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="flex">
          <NavigationMenuLink>Home</NavigationMenuLink>
          <NavigationMenuLink>Products</NavigationMenuLink>
          <NavigationMenuLink>Cart</NavigationMenuLink>
          <NavigationMenuLink>Login/Register</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
