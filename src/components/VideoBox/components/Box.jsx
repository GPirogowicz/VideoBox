import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import './style.scss';
import ItemTypes from '../service/ItemTypes';

const Box = ({ box }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { ...box },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const { percenteLeft, percenteTop, scale } = box;
    const boxStyle = { left: `${percenteLeft}%`, top: `${percenteTop}%` };
    if (scale !== undefined) {
        boxStyle.transform = `scale(${scale})`;
    }
    if (isDragging && box.type === ItemTypes.BOX) {
        return <div className={'drag'} ref={drag} style={{ ...boxStyle }} />;
    }
    return (
        <div
            className={`box ${!box.visible ? 'box-hidden' : ''}`}
            ref={drag}
            style={{ ...boxStyle }}
        >
            {box.content}
        </div>
    );
};

Box.propTypes = {
    box: PropTypes.object,
};

export default Box;
