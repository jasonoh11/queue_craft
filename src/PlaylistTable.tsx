import "./Home.css";
import type { Playlist } from "./types/Playlist";
import PlaylistTile from "./PlaylistTile";


type PlaylistTableProps = {
  playlists: Playlist[];
  showPlaylists: boolean;
  selectedPlaylist: Playlist | null;
  onSelectPlaylist: (playlist: Playlist) => void;
};

function PlaylistTable({
  playlists,
  showPlaylists,
  selectedPlaylist,
  onSelectPlaylist,
}: PlaylistTableProps) {
  return (
    <>
      <div
        className={`bg-gray-800 border-r border-gray-700 flex flex-col md:flex ${
          showPlaylists ? "flex mt-[60px] h-[calc(100vh-60px)]" : "hidden"
        } md:mt-0 md:h-screen`}
      >
        <div className="p-6 border-b border-gray-700">
          <h2 className="m-0 text-xl font-semibold text-white">
            Your Playlists
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {playlists.map((playlist: Playlist) => (
            <PlaylistTile key={playlist.id} playlist={playlist} selectedPlaylist={selectedPlaylist} onSelectPlaylist={onSelectPlaylist}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default PlaylistTable;
