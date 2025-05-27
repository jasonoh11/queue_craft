import type { Playlist } from "./types/Playlist";

type PlaylistProps = {
  playlist: Playlist;
  selectedPlaylist: Playlist | null;
  onSelectPlaylist: (playlist: Playlist) => void;
};

function PlaylistTile({
  playlist,
  selectedPlaylist,
  onSelectPlaylist,
}: PlaylistProps) {
  return (
    <>
      <div
        onClick={() => onSelectPlaylist(playlist)}
        key={playlist.id}
        className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-700 mb-2 border ${
          selectedPlaylist?.id == playlist.id
            ? "border-black dark:border-white"
            : "border-transparent"
        }`}
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
    </>
  );
}

export default PlaylistTile;
