import { useSongData } from "../hooks/useSongData"
import { useEffect, useRef, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaPause, FaPlay, FaFastForward, FaFastBackward } from "react-icons/fa";

const Player = () => {
  const {
    song,
    fetchSingleSong,
    selectedSong,
    isPlaying,
    setIsPlaying,
    prevSong,
    nextSong,
    hasNextSong,
    hasPrevSong
  } = useSongData();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0)

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetaData = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime || 0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    }
  }, [song]);

  const handlePlayPause = () => {
    if(audioRef.current) {
      if(isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const volumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)/100;
    setVolume(newVolume);
    if(audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const durationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value)/100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setProgress(newTime);
  };

  useEffect(() => {
    fetchSingleSong();
  }, [fetchSingleSong, selectedSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
  
    const handleEnded = () => {
      if (hasNextSong) {
        nextSong();
        setIsPlaying(isPlaying);
      } else {
        setIsPlaying(!isPlaying);
      }
    };
  
    audio.addEventListener("ended", handleEnded);
  
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [hasNextSong, isPlaying, nextSong, setIsPlaying]);

  return (
    <div className="px-2">
      {song && (
        <div className="h-[10%] rounded w-full bg-[#212121] flex justify-between items-center px-4">
          <div className="lg:flex items-center gap-4">
            {song.thumbnail ? (
              <img src={song.thumbnail} className="mr-1 w-[70px] p-2 rounded" alt={song.title} />
              ) : (
              <MdOutlineFileDownload />
            )}
            <div className="hidden md:block">
              <p>{song.title}</p>
              <p>{song.description?.slice(0, 30)}...</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 m-auto">
            {song.audio && (
                <audio ref={audioRef} src={song.audio} autoPlay={isPlaying} />
            )}
            <div className="w-full items-center flex font-normal text-green-400">
              <input
                  type="range"
                  min={"0"}
                  max={"100"}
                  className="w-[120px] md:w-[300px] m-2 appearance-none bg-transparent
                            [&::-webkit-slider-runnable-track]:h-1.5
                            [&::-webkit-slider-runnable-track]:bg-neutral-500
                            [&::-webkit-slider-runnable-track]:rounded-full
                            [&::-webkit-slider-thumb]:appearance-none
                            [&::-webkit-slider-thumb]:h-4
                            [&::-webkit-slider-thumb]:w-4
                            [&::-webkit-slider-thumb]:rounded-full
                            [&::-webkit-slider-thumb]:bg-[#1DB954]
                            [&::-webkit-slider-thumb]:-translate-y-1
                            [&::-moz-range-thumb]:h-4
                            [&::-moz-range-thumb]:w-4
                            [&::-moz-range-thumb]:rounded-full
                            [&::-moz-range-thumb]:bg-[#1DB954]
                            focus:outline-none"
                  value={(progress / duration) * 100 || 0}
                  onChange={durationChange}
                />
            </div>
            <div className="flex justify-center items-center gap-4">
              <span className={`cursor-pointer text-green-600 ${!hasPrevSong ? "opacity-50 pointer-events-none" : ""}`} onClick={prevSong}>
                <FaFastBackward/>
              </span>
              <button className="bg-[#1DB954] 
                      rounded-full 
                      p-2
                      text-white 
                      flex 
                      items-center 
                      justify-center 
                      hover:bg-green-600 
                      active:scale-95 
                      transition 
                      duration-200
                      shadow-md" onClick={handlePlayPause}>
              {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
              </button>
              <span className={`cursor-pointer text-green-600 ${!hasNextSong ? "opacity-50 pointer-events-none" : "" }`} onClick={nextSong} >
                <FaFastForward />
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="range"
              className="w-16 md:w-32
                          m-2
                          appearance-none
                          bg-transparent
                          [&::-webkit-slider-runnable-track]:h-1.5
                          [&::-webkit-slider-runnable-track]:bg-neutral-500
                          [&::-webkit-slider-runnable-track]:rounded-full
                          [&::-webkit-slider-thumb]:appearance-none
                          [&::-webkit-slider-thumb]:h-4
                          [&::-webkit-slider-thumb]:w-4
                          [&::-webkit-slider-thumb]:rounded-full
                          [&::-webkit-slider-thumb]:bg-[#1DB954]
                          [&::-webkit-slider-thumb]:-translate-y-1
                          [&::-moz-range-thumb]:h-4
                          [&::-moz-range-thumb]:w-4
                          [&::-moz-range-thumb]:rounded-full
                          [&::-moz-range-thumb]:bg-[#1DB954]
                          focus:outline-none"
              min={"0"}
              max={"100"}
              step={"0.01"}
              value={volume * 100}
              onChange={volumeChange}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Player