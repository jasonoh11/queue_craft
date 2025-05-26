import "./Home.css";
import { useEffect, useState } from "react";
import type { Playlist } from './types/Playlist';
import PlaylistTable from "./PlaylistTable";
import QueueBuilder from "./QueueBuilder";


function Dashboard() {
  const [showPlaylists, setShowPlaylists] = useState(false);

  const fetchPlaylists = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No access token found");
      return;
    }

    const response = await fetch(
      "https://api.spotify.com/v1/me/playlists?offset=0",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    console.log(data);
    return data.items;
  };


  useEffect(() => {
    // Get the 10 playlists with the most songs
    const loadPlaylists = async () => {
      const data = await fetchPlaylists();
      setPlaylists(
        data
          .sort((a: Playlist, b: Playlist) => {
            return b.tracks.total - a.tracks.total;
          })
          .slice(0, 10)
      );
    };

    loadPlaylists();
  }, []);

  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen font-sans bg-gray-950 gap-px relative">
        {/* Mobile Playlist Toggle */}
        <div className="md:hidden absolute top-0 left-0 right-0 z-10 bg-gray-800 border-b border-gray-700 p-3">
          <button
            className="bg-green-500 hover:bg-green-400 text-white border-none rounded-md px-4 py-2 text-sm font-medium cursor-pointer w-full transition-colors"
            onClick={() => setShowPlaylists(!showPlaylists)}
          >
            {showPlaylists ? "← Hide Playlists" : "View Playlists"}
          </button>
        </div>

		<PlaylistTable playlists={playlists} showPlaylists={showPlaylists}/>

		<QueueBuilder showPlaylists={showPlaylists}/>
      </div>
    </>
  );
}

export default Dashboard;
