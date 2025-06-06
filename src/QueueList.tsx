import type { Song } from "./types/Song";

type QueueListProps = {
  queue: Song[] | null;
  onQueueRemove: (index: number) => void;
};

function QueueList({ queue, onQueueRemove }: QueueListProps) {
  return (
    <>
      <div className="flex-1 px-6 flex flex-col">
        <h3 className="sticky top-0 z-10 bg-gray-800 m-0 py-4 text-base font-medium text-white">
          Current Queue
        </h3>

        <div className="flex-1 h-64 overflow-y-auto">
          {queue ? (
            queue.map((song, index) => (
              <div
                key={index}
                className="flex items-center p-3 rounded-md mb-2 bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                <span className="w-6 text-xs text-gray-400 font-medium">
                  {index + 1}
                </span>
                <span className="flex-1 text-sm text-white ml-2">
                  {song.track.name + " - " + song.track.artists[0]?.name}
                </span>
                <button
                  className="w-6 h-6 border-none bg-transparent text-gray-400 hover:bg-gray-600 hover:text-white cursor-pointer rounded-full text-lg flex items-center justify-center transition-colors"
                  onClick={() => onQueueRemove(index)}
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 text-sm py-10 px-5 italic">
              No songs in queue. Enter a prompt above to generate your
              AI-powered playlist!
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto"></div>
      </div>
    </>
  );
}

export default QueueList;
