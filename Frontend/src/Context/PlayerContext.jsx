import { createContext, useRef, useState, useEffect } from "react";
import { songsData } from "../assets/assets"; // Assuming this is where your songs data is coming from

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(new Audio(songsData[0].src)); // Add an actual audio element
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = async (id) =>{
 
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayStatus(true);
  }

  const previous = async()=>{
    if(track.id>0)
    {
      await setTrack(songData[track.id-1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  }
  const next = async()=>{
    if(track.id < songData.length-1)
    {
      await setTrack(songData[track.id+1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  }

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setTime({
        currentTime: {
          second: Math.floor(audio.currentTime % 60),
          minute: Math.floor(audio.currentTime / 60),
        },
        totalTime: {
          second: Math.floor(audio.duration % 60) || 0,
          minute: Math.floor(audio.duration / 60) || 0,
        },
      });

      // Update seek bar
      if (seekBar.current && seekBg.current) {
        const progress = (audio.currentTime / audio.duration) * 100;
        seekBar.current.style.width = `${progress}%`;
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
    };
  }, [audioRef.current]);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next

  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
