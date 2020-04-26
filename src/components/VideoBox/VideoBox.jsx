import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from './components/VideoPlayer';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import DropContainer from './components/DropContainer';
import './styles/videoBox.scss';
import DragBox from './components/DragBox';
import useVideoMetaInfo from './services/useVideoMetaInfo';
import BoxConfig from './components/BoxConfig';
import useBoxes from './services/useBoxes';
import Box from './models/Box';

const VideoBox = ({ source }) => {
    const VideoPlayerRef = useRef();
    const videoMetaInfo = useVideoMetaInfo(VideoPlayerRef);
    const boxes = useBoxes(videoMetaInfo);
    const stylePlayer = {};
    const styleWrapper = {};
    if (videoMetaInfo && videoMetaInfo.offsetHeight) {
        stylePlayer.height = videoMetaInfo.offsetHeight;
        styleWrapper.height = videoMetaInfo.offsetHeight - 60;
    }
    console.log(boxes.getAll());
    return (
        <div className="video-box">
            <DndProvider backend={Backend}>
                <div className="video-box__target-container">
                    <div className="video-wrapper" style={stylePlayer}>
                        <VideoPlayer
                            source={source}
                            playerRef={VideoPlayerRef}
                            onDurationChange={
                                videoMetaInfo.handleChangeDuration
                            }
                            onPlay={videoMetaInfo.handleTogglePlay}
                            onPaused={videoMetaInfo.handleTogglePlay}
                            onTimeUpdate={videoMetaInfo.handleTimeUpdate}
                        />
                        <div className="video-wrapper__drop-container-wrapper">
                            <DropContainer
                                videoMetaInfo={videoMetaInfo}
                                boxes={boxes.getAll()}
                                addBox={boxes.addBox}
                                updateBox={boxes.updateBox}
                            />
                        </div>
                    </div>
                    <div className="boxes-config">
                        {boxes.getAll().map(box => (
                            <BoxConfig
                                key={`boxConfig-${box.id}`}
                                box={box}
                                updateBox={boxes.updateBox}
                                sliderLength={videoMetaInfo.duration}
                            />
                        ))}
                    </div>
                </div>
                <div className="video-box__source-container">
                    <div className="source-box__wrapper">
                        <DragBox box={new Box('Text Box')} />
                    </div>
                </div>
            </DndProvider>
        </div>
    );
};

VideoBox.propTypes = {
    source: PropTypes.string.isRequired,
};

export default VideoBox;
