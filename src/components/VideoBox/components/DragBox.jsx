import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import '../styles/dragBox.scss';
import ItemTypes from '../services/ItemTypes';
import Box from '../models/Box';

const DragBox = ({ box, scale = 1 }) => {
    const [{ isDragging }, drag] = useDrag({
        item: box,
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const [, setBoxDomRef] = useState();
    const attachDrag = useCallback(
        domElement => {
            drag(domElement);
            setBoxDomRef(domElement);
        },
        [drag]
    );
    const { content, style } = box;
    const boxStyle = {
        ...box.style,
        left: `${style.left}%`,
        top: `${style.top}%`,
    };
    if (scale !== undefined) {
        boxStyle.width = `calc(${style.width}px * ${scale})`;
        boxStyle.height = `calc(${style.height}px * ${scale})`;
    }
    if (isDragging && box.type === ItemTypes.BOX) {
        return <div className={'drag'} ref={drag} style={{ ...boxStyle }} />;
    }
    return (
        <div
            className={`box ${!box.visible ? 'box-hidden' : ''}`}
            ref={attachDrag}
            style={{ ...boxStyle }}
        >
            {content}
        </div>
    );
};

DragBox.propTypes = {
    box: PropTypes.instanceOf(Box),
    scale: PropTypes.number,
};

export default DragBox;
