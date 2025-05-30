import { useState } from "react";
import QueueList from "./QueueList";
import type { Song } from "./types/Song";
import type { Playlist } from "./types/Playlist";

type QueueBuilderProps = {
  showPlaylists: boolean;
  selectedPlaylist: Playlist | null;
};

function QueueBuilder({ showPlaylists, selectedPlaylist }: QueueBuilderProps) {
  const [queue, setQueue] = useState<Song[] | null>(null);

  const removeFromQueue = (index: number) => {
    if (!queue) return;
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
              id: item.track.id,
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

    setQueue(songs.sort(() => Math.random() - 0.5).slice(0, 10));
  };

  const sendQueue = async () => {
    queue?.map((song: Song) => console.log(song.track.id));

    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No access token found");
      return;
    }
    console.log("token: " + token);

    queue?.map(async (song: Song) => {
      const response = await fetch(
        `https://api.spotify.com/v1/me/player/queue?uri=spotify:track:${song.track.id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        console.log("Song added to queue!");
      } else {
        let errorText = "";
        try {
          const errorBody = await response.json();
          errorText = JSON.stringify(errorBody, null, 2);
        } catch (e) {
          errorText = await response.text();
        }

        console.error(
          "Spotify API error:",
          response.status,
          response.statusText,
          "\nError body:\n",
          errorText
        );
        return;
      }
    });
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

        <div className="h-128 overflow-y-auto">
          <QueueList queue={queue} onQueueRemove={removeFromQueue} />
        </div>

        <button
          className="w-full p-3 bg-green-500 hover:bg-green-400 text-white border-none rounded-lg text-sm font-medium cursor-pointer transition-colors"
          onClick={() => sendQueue()}
        >
          Send Queue
        </button>
      </div>
    </>
  );
}

export default QueueBuilder;
