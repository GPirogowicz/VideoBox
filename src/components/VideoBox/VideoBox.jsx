import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from './components/VideoPlayer';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import DropContainer from './components/DropContainer';
import './style.scss';
import ItemTypes from './service/ItemTypes';
import Box from './components/Box';
import useVideoMetaInfo from './service/useVideoMetaInfo';
import Slider from '@material-ui/core/Slider';

const VideoBox = ({ source }) => {
    const VideoPlayerRef = useRef();
    const videoMetaInfo = useVideoMetaInfo(VideoPlayerRef);
    const [boxes, setBoxes] = useState([]);
    const addBox = box => {
        box.id = boxes.length + 1;
        box.content += ` #${box.id}`;
        box.type = ItemTypes.BOX;
        (box.visible = true),
            (box.start = box.stop = 0),
            setBoxes(prev => {
                prev.push(box);
                return [...prev];
            });
    };
    const stylePlayer = {};
    const styleWrapper = {};
    if (videoMetaInfo && videoMetaInfo.offsetHeight) {
        stylePlayer.height = videoMetaInfo.offsetHeight;
        styleWrapper.height = videoMetaInfo.offsetHeight - 60;
    }
    useEffect(() => {
        setBoxes(prevBoxes => {
            return prevBoxes.map(box => {
                const { scale } = videoMetaInfo;
                box.scale = scale;
                return box;
            });
        });
    }, [videoMetaInfo.offsetHeight]);
    useEffect(() => {
        setBoxes(prevBoxes => {
            return prevBoxes.map(box => {
                if (
                    box.start <= videoMetaInfo.currentTime &&
                    box.stop > videoMetaInfo.currentTime
                ) {
                    box.visible = true;
                } else {
                    box.visible = false;
                }
                return box;
            });
        });
    }, [videoMetaInfo.currentTime]);
    const handleChengeTimeRange = (currentBox, value) => {
        const [start, stop] = value;
        const boxIndex = boxes.findIndex(box => box.id === currentBox.id);
        if (boxIndex !== -1) {
            boxes[boxIndex] = {
                ...boxes[boxIndex],
                start,
                stop,
            };
            setBoxes([...boxes]);
        }
    };
    const handleChengeContent = (currentBox, value) => {
        const boxIndex = boxes.findIndex(box => box.id === currentBox.id);
        if (boxIndex !== -1) {
            boxes[boxIndex] = {
                ...boxes[boxIndex],
                content: value,
            };
            setBoxes([...boxes]);
        }
    };
    return (
        <div className="video-box">
            <DndProvider backend={Backend}>
                <div className="video-box__target-box">
                    <div
                        className="target-box__video-player"
                        style={stylePlayer}
                    >
                        <VideoPlayer
                            source={source}
                            playerRef={VideoPlayerRef}
                            onDurationChange={
                                videoMetaInfo.handleChangeDuration
                            }
                            onPlay={videoMetaInfo.handleTogglePlay}
                            onPaused={videoMetaInfo.handleTogglePlay}
                        />
                        <div className="target-box__drop-container-wrapper">
                            <DropContainer
                                videoMetaInfo={videoMetaInfo}
                                boxes={boxes}
                                addBox={addBox}
                                setBoxes={updatedBoxes =>
                                    setBoxes(updatedBoxes)
                                }
                            />
                        </div>
                    </div>
                    <div className="target-box__boxes-config">
                        {boxes.map(box => (
                            <div
                                className="boxes-config__box-wrapper"
                                key={box.id}
                            >
                                <input
                                    className="box-wrapper__input"
                                    defaultValue={box.content}
                                    onChange={e =>
                                        handleChengeContent(
                                            box,
                                            e.currentTarget.value
                                        )
                                    }
                                />
                                <Slider
                                    className={'box-wrapper__range'}
                                    min={0}
                                    max={videoMetaInfo.duration}
                                    defaultValue={[0, 0]}
                                    onChange={(_, value) =>
                                        handleChengeTimeRange(box, value)
                                    }
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    getAriaValueText={value => `${value} s`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="video-box__source-box">
                    <div className="source-box__wrapper">
                        <Box
                            box={{
                                content: 'Text Box',
                                type: ItemTypes.SOURCE_BOX,
                                visible: true,
                            }}
                        />
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
