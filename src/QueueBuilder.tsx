type QueueBuilderProps = {
	showPlaylists: boolean;
  };

function QueueBuilder({showPlaylists} : QueueBuilderProps) {
  return (
    <>
      <div
        className={`bg-gray-800 flex flex-col md:flex ${
          !showPlaylists ? "flex mt-[60px] h-[calc(100vh-60px)]" : "hidden"
        } md:mt-0 md:h-screen`}
      >
        {/* Prompt Input */}
        <form className="p-6 border-b border-gray-700">
          <button
            type="submit"
            className="w-full p-3 bg-green-500 hover:bg-green-400 text-white border-none rounded-lg text-sm font-medium cursor-pointer transition-colors"
          >
            Generate Queue
          </button>
        </form>

        {/* Current Queue */}
        <div className="flex-1 p-6 flex flex-col">
          <h3 className="m-0 mb-4 text-base font-medium text-white">
            Current Queue
          </h3>
          <div className="flex-1 overflow-y-auto"></div>
        </div>
      </div>
    </>
  );
}

export default QueueBuilder;
