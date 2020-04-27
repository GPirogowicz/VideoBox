import React from 'react';
import PropTypes from 'prop-types';
import SliderMaterial from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core';

const StyledSlider = withStyles({
    root: {
        color: '#52af77',
        height: 10,
    },
    thumb: {
        height: 20,
        width: 20,
        borderRadius: 0,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -5,
        marginLeft: 0,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 10,
        borderRadius: 0,
    },
    rail: {
        height: 10,
        borderRadius: 0,
    },
})(SliderMaterial);
const Slider = ({
    value,
    min = 0,
    max = 0,
    step = 0.5,
    onChange,
    valueLabelDisplay = 'off',
    className = '',
}) => {
    return (
        <StyledSlider
            className={className}
            valueLabelDisplay={valueLabelDisplay}
            getAriaValueText={value => `${value}`}
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={onChange}
        />
    );
};

Slider.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    type: PropTypes.string,
    onChange: PropTypes.func,
    valueLabelDisplay: PropTypes.string,
    className: PropTypes.string,
};

export default Slider;
