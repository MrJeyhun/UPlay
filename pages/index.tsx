import { Box, Flex, Text } from "@chakra-ui/layout";

import prisma from "../lib/prisma";
import GradientLayout from "../components/gradientLayout";

const Home = ({ artists }) => {
  return (
    <GradientLayout
      color="purple"
      subtitle="profile"
      title="Scott Moss"
      description="15 public playlists"
      image="https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0"
      roundImage
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artist this month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Text>{artist.name}</Text>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists },
  };
};

export default Home;
