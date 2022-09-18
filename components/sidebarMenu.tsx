import React from "react";
import NextLink from "next/link";
import { ListItem, LinkBox, LinkOverlay, ListIcon } from "@chakra-ui/layout";

const SidebarMenu = ({ menu }) => {
  return (
    <ListItem paddingX="20px" fontSize="16px" key={menu.id}>
      <LinkBox>
        <NextLink href={menu.route ? menu.route : "/"} passHref>
          <LinkOverlay>
            {menu.icon && (
              <ListIcon as={menu.icon} color="white" marginRight="20px" />
            )}

            {menu.name ? menu.name : menu}
          </LinkOverlay>
        </NextLink>
      </LinkBox>
    </ListItem>
  );
};

export default SidebarMenu;
