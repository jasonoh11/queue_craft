import "./Home.css";
import type { Playlist } from './types/Playlist';

type PlaylistTableProps = {
    playlists: Playlist[];
	showPlaylists: boolean;
  };

function PlaylistTable({ playlists, showPlaylists }: PlaylistTableProps) {

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
            <div
              key={playlist.id}
              className="flex items-center p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-700 mb-2"
            >
              <img
                src={playlist.images[0]?.url || "/placeholder.svg"}
                alt={playlist.name}
                className="w-12 h-12 rounded mr-3 bg-gray-600"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-white mb-1">
                  {playlist.name}
                </div>
                <div className="text-xs text-gray-400">
                  {playlist.tracks.total} songs
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PlaylistTable;
