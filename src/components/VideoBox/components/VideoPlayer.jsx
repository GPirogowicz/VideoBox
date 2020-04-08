import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = ({
    wrapperOptions = { controls: true, width: 320 },
    source,
    playerRef,
    onDurationChange,
    onPlay,
    onPaused,
}) => {
    return (
        <div className="video-player">
            <video
                {...wrapperOptions}
                ref={playerRef}
                onDurationChange={onDurationChange}
                onPlay={onPlay}
                onPause={onPaused}
            >
                <source src={source} />
            </video>
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
};

export default VideoPlayer;
