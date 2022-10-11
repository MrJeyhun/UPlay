import NextImage from "next/image";
import NextLink from "next/link";
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  Center,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";

import { usePlaylist } from "../lib/hooks";
import SidebarMenu from "./sidebarMenu";

const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/search",
  },
  {
    name: "Your library",
    icon: MdLibraryMusic,
    route: "/library",
  },
];

const musicMenu = [
  {
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    route: "/",
  },
  {
    name: "Favorites",
    icon: MdFavorite,
    route: "/favorites",
  },
];

const Sidebar = () => {
  const { playlists } = usePlaylist();

  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      color="gray"
      paddingX="5px"
    >
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px" paddingY="15px">
          <NextImage src="/logo.svg" width={120} height={60} />
        </Box>
        <Box marginBottom="20px">
          <List spacing={2}>
            {navMenu.map((menu) => (
              <SidebarMenu menu={menu} />
            ))}
          </List>
        </Box>
        <Box marginTop="20px">
          <List spacing={2}>
            {musicMenu.map((menu) => (
              <SidebarMenu menu={menu} />
            ))}
          </List>
        </Box>
        <Divider color="gray.800" />
        {/* FIXME: Scroll has to be nicely designed */}
        <Box height="66%" overflowY="auto" paddingY="20px">
          <List spacing={2}>
            {playlists.map((playlist) => (
              <SidebarMenu menu={playlist} isPlaylist={true} />
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
