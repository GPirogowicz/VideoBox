import React from 'react';
import PropTypes from 'prop-types';
import '../styles/videoPlayer.scss';
import Slider from '../../Slider/Slider';

const VideoPlayer = ({
    wrapperOptions = { controls: false, width: 320 },
    source,
    playerRef,
    onDurationChange,
    onPlay,
    onPaused,
    onTimeUpdate,
}) => {
    const { current } = playerRef;
    const currentTime = current ? current.currentTime : 0;
    const duration = current ? current.duration : 0;

    const togglePlayPause = () => {
        if (current.paused) {
            current.play();
        } else {
            current.pause();
        }
    };
    const handleTimeUpdate = () => {
        onTimeUpdate();
    };
    const handleChangeProgressBar = (_, value) => {
        current.currentTime = value;
    };
    return (
        <div className="video-player">
            <video
                {...wrapperOptions}
                className={'video'}
                ref={playerRef}
                src={source}
                onDurationChange={onDurationChange}
                onPlay={onPlay}
                onPause={onPaused}
                onTimeUpdate={handleTimeUpdate}
            ></video>
            <div className="video-player__controls">
                <div className="tools">
                    <button
                        onClick={togglePlayPause}
                        className={`btn-toggle ${
                            current && current.paused
                                ? 'btn-toggle--play'
                                : 'btn-toggle--pause'
                        }`}
                    />
                    <span className="progress-time">
                        {`${Math.round(currentTime)} / ${Math.round(
                            duration
                        )} s`}
                    </span>
                </div>
                <div className="progress-bar">
                    <Slider
                        onChange={handleChangeProgressBar}
                        max={duration}
                        value={currentTime}
                    />
                </div>
            </div>
        </div>
    );
};

VideoPlayer.propTypes = {
    wrapperOptions: PropTypes.object,
    source: PropTypes.string,
    playerRef: PropTypes.object.isRequired,
    onDurationChange: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onPaused: PropTypes.func.isRequired,
    onTimeUpdate: PropTypes.func.isRequired,
};

export default VideoPlayer;
