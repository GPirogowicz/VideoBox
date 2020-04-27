import React from 'react';
import PropTypes from 'prop-types';
import Box from '../models/Box';
import '../styles/boxConfig.scss';
import Slider from '../../Slider/Slider';

const BoxConfig = ({ box, sliderLength = 0, updateBox, currentTime = 0 }) => {
    const handleChengeTimeRange = value => {
        const [start, stop] = value;
        box.visibleStart = start;
        box.visibleStop = stop;
        updateBox(box);
    };
    const handleChengeContent = value => {
        box.content = value;
        updateBox(box);
    };
    return (
        <div className="box-editor" key={box.id}>
            <input
                className="box-editor__input"
                defaultValue={box.content}
                onChange={e => handleChengeContent(e.currentTarget.value)}
            />
            <div className="box-editor__range">
                <div
                    className="current-time"
                    style={{ left: `${(currentTime * 100) / sliderLength}%` }}
                />
                <Slider
                    min={0}
                    max={sliderLength}
                    value={[box.visibleStart, box.visibleStop]}
                    defaultValue={[0, 0]}
                    onChange={(_, value) => handleChengeTimeRange(value)}
                    valueLabelDisplay="auto"
                />
            </div>
        </div>
    );
};

BoxConfig.propTypes = {
    box: PropTypes.instanceOf(Box),
    sliderLength: PropTypes.number,
    updateBox: PropTypes.func,
    currentTime: PropTypes.number,
};

export default BoxConfig;
