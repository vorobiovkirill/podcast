import ReactPlayer from 'react-player/file';
import { BsPauseCircle, BsPlayCircle } from 'react-icons/bs';
import { GrBackTen, GrFastForward } from 'react-icons/gr';
import { useRef, useState } from 'react';
import { IconContext } from 'react-icons';
import { ImVolumeHigh, ImVolumeMute2 } from 'react-icons/im';

const CustomControls = (props: any) => {
    return (
        <IconContext.Provider value={{ size: '2em' }}>
            <div className="flex flex-row justify-around">
                <div>
                    <button
                        onClick={props.handleRewind}
                    >
                        <GrBackTen />
                    </button>
                    {props.plaing ? <button
                        onClick={props.handlePause}
                    >
                        <BsPauseCircle />
                    </button> : <button
                        onClick={props.handlePlay}
                    >
                        <BsPlayCircle />
                    </button>
                    }
                    <button
                        onClick={props.handleFastForward}
                    >
                        <GrFastForward />
                    </button>
                </div>
                <div>
                    <input
                        className="seek-range"
                        type="range"
                        min={0}
                        max={props.totalDuration}
                        onChange={props.handleSeekChange}
                        value={props.played * 100}
                    />
                </div>
                <div>
                    <button
                        onClick={props.handleMute}
                    >
                        {props.muted ? <ImVolumeMute2 /> : < ImVolumeHigh />}
                    </button>

                </div>
            </div>
        </IconContext.Provider>
    );
};

export const PodcastPlayer = ({ audio }: { audio: string }) => {
    const [data, setData] = useState({
        isPlay: false,
        volumeBar: 0,
        volume: 1,
        played: 0,
        totalDuration: 0,
        muted: false
    });

    const playerRef = useRef(null);
    const { played, isPlay, muted, totalDuration, volume, volumeBar } = data;

    console.log('======', { played, isPlay, muted, totalDuration, volume, volumeBar })
    console.log('=------', playerRef?.current)

    const handleRewind = () => {
        playerRef?.current?.seekTo(playerRef?.current?.getCurrentTime() - 10)
    }

    const handleFastForward = () => {
        playerRef?.current?.seekTo(playerRef?.current?.getCurrentTime() + 10)
    }

    const handleVolumeChange = (e: any) => {
        setData((prevState) => ({
            ...prevState,
            volume: e.target.value / 100,
            volumeBar: e.target.value
        }));
    };

    const handleMute = () => {
        setData((prevState) => ({
            ...prevState,
            muted: !prevState.muted
        }));
    }

    const handleOnProgress = (e: React.FormEvent<HTMLInputElement>) => {
        setData((prevState) => ({
            ...prevState,
            currentSeek: e.playSeconds
        }));

        playerRef?.current?.seekTo(e.currentTarget.value);
    };

    const handlePlay = () => {
        console.log('PLAY')
        if (totalDuration === 0) {
            console.log('IF')
            setData((prevState) => ({
                ...prevState,
                totalDuration: playerRef?.current?.getDuration()
            }));
        }

        setData((prevState) => ({
            ...prevState,
            isPlay: true
        }));
    };

    const handlePause = () => {
        setData((prevState) => ({
            ...prevState,
            isPlay: false
        }));
    };

    const handleSeekChange = (e: React.FormEvent<HTMLInputElement>, newValue: any) => {
        console.log('1111', e.currentTarget.value)
        setData((prevState) => ({
            ...prevState,
            played: parseFloat(newValue / 100)
        }));
    };

    return (

        <div className="sp-mockup-window border border-base-300">
            <div className="flex flex-col justify-center border-t border-base-300 px-4 py-16">
                <ReactPlayer
                    ref={playerRef}
                    onProgress={(e) => handleOnProgress(e)}
                    playing={isPlay}
                    muted={muted}
                    volume={volume}
                    url={audio}
                    controls
                    width="100%"
                    height="50px"
                />
                <CustomControls
                    played={played}
                    handlePause={handlePause}
                    handlePlay={handlePlay}
                    handleSeekChange={handleSeekChange}
                    handleVolumeChange={handleVolumeChange}
                    handleRewind={handleRewind}
                    handleFastForward={handleFastForward}
                    handleMute={handleMute}
                    muted={muted}
                    plaing={isPlay}
                    totalDuration={totalDuration}
                    volumeBar={volumeBar}
                />
            </div>
        </div>

    );
};
