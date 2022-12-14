import prisma from "../../lib/prisma";
import { validateToken } from "../../lib/auth";
import SongTable from "../../components/songsTable";
import GradientLayout from "../../components/gradientLayout";

const getBgColors = (id) => {
  const colors = [
    "red",
    "green",
    "yellow",
    "blue",
    "orange",
    "purple",
    "gray",
    "teal",
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist = ({ playlist }) => {
  const color = getBgColors(playlist.id);
  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let user;

  try {
    user = validateToken(req.cookies.UPLAY_ACCESS_TOKEN);
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { playlist },
  };
};

export default Playlist;
