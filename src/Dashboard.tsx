import "./Home.css";
import {useEffect, useState} from "react";

function Dashboard() {

  const fetchPlaylists = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
        console.error("No access token found");
        return;
      }
    
    const response = await fetch("https://api.spotify.com/v1/me/playlists?offset=0", {
        headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    console.log(data);
    return data.items;
  }

  type Playlist = {
    id: string;
    name: string;
    tracks: {
        total: number;
      };
  };

  useEffect(() => {
    // Get the 10 playlists with the most songs
    const loadPlaylists = async () => {
        const data = await fetchPlaylists();
        setPlaylists(data.sort((a: Playlist, b: Playlist) => {
            return b.tracks.total - a.tracks.total;
        }).slice(0, 10));
    };

    loadPlaylists();
  }, [])

  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  return (
    <>
      <div className="home-container">
        <div className="playlist-table">
          {playlists.length == 0 ? <div>No playlists</div> : playlists.map((playlist) => {
            return <div key={playlist.id}>{playlist.name}</div>;
          })}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
