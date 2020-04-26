import React from 'react';
import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';
import Box from '../models/Box';
import '../styles/boxConfig.scss';

const BoxConfig = ({ box, sliderLength = 0, updateBox }) => {
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
            <Slider
                className={'box-editor__range'}
                min={0}
                max={sliderLength}
                value={[box.visibleStart, box.visibleStop]}
                defaultValue={[0, 0]}
                onChange={(_, value) => handleChengeTimeRange(value)}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={value => `${value} s`}
            />
        </div>
    );
};

BoxConfig.propTypes = {
    box: PropTypes.instanceOf(Box),
    sliderLength: PropTypes.number,
    updateBox: PropTypes.func,
};

export default BoxConfig;
