import { useState } from "react";
import QueueList from "./QueueList";
import type { Song } from "./types/Song";
import type { Playlist } from "./types/Playlist";

type QueueBuilderProps = {
  showPlaylists: boolean;
  selectedPlaylist: Playlist | null;
};

function QueueBuilder({ showPlaylists, selectedPlaylist }: QueueBuilderProps) {
  const [queue, setQueue] = useState([
    "Blinding Lights - The Weeknd",
    "Levitating - Dua Lipa",
    "Good 4 U - Olivia Rodrigo",
  ]);

  const removeFromQueue = (index: number) => {
    setQueue(
      queue.filter((_, i) => {
        return i !== index;
      })
    );
  };

  const fetchSongs = async (playlist: Playlist | null) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No access token found");
      return [];
    }
    if (!playlist) {
      console.error("No playlist selected");
      return [];
    }

    const limit = 50;
    const total = playlist.tracks.total;
    const pages = Math.ceil(total / limit);

    const fetchPromises = Array.from({ length: pages }, (_, i) => {
      const offset = i * limit;
      return fetch(
        `https://api.spotify.com/v1/playlists/${playlist.id}/tracks?offset=${offset}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => response.json())
        .then((data) =>
          data.items.map((item: any) => ({
            track: {
              name: item.track.name,
              artists: item.track.artists,
            },
          }))
        );
    });

    const results = await Promise.all(fetchPromises);

    // Flatten the array of arrays into a single array
    const allTracks: Song[] = results.flat();

    return allTracks;
  };

  const generateRandomQueue = async (selectedPlaylist: Playlist | null) => {
    const songs = await fetchSongs(selectedPlaylist);
    if (!songs || songs.length === 0) return;

    const shuffled = songs.sort(() => Math.random() - 0.5).slice(0, 10);

    setQueue(
      shuffled.map((song: Song) => {
        const artistName =
          song.track.artists && song.track.artists.length > 0
            ? song.track.artists[0].name
            : "Unknown Artist";
        return song.track.name + " - " + artistName;
      })
    );
  };

  return (
    <>
      <div
        className={`bg-gray-800 flex flex-col md:flex ${
          !showPlaylists ? "flex mt-[60px] h-[calc(100vh-60px)]" : "hidden"
        } md:mt-0 md:h-screen`}
      >
        <div className="p-6 border-b border-gray-700">
          <button
            className="w-full p-3 bg-green-500 hover:bg-green-400 text-white border-none rounded-lg text-sm font-medium cursor-pointer transition-colors"
            onClick={() => generateRandomQueue(selectedPlaylist)}
          >
            Generate Queue
          </button>
        </div>

        <QueueList queue={queue} onQueueRemove={removeFromQueue} />
      </div>
    </>
  );
}

export default QueueBuilder;
