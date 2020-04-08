import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import ItemTypes from '../service/ItemTypes';
import Box from './Box';
import './style.scss';
import PropTypes from 'prop-types';
import pxToPercente from '../../../helpers/pxToPercente';

const DropContainer = ({ boxes, addBox, setBoxes, videoMetaInfo }) => {
    const ref = useRef();
    const [, drop] = useDrop({
        accept: [ItemTypes.BOX, ItemTypes.SOURCE_BOX],
        drop(item, monitor) {
            console.log(ref.current);
            let delta = monitor.getDifferenceFromInitialOffset();
            if (item.type === ItemTypes.BOX) {
                delta.x = pxToPercente(delta.x, videoMetaInfo.offsetWidth);
                delta.y = pxToPercente(
                    delta.y,
                    videoMetaInfo.offsetHeight - 60
                );
                moveBox(
                    item.id,
                    item.percenteLeft + delta.x,
                    item.percenteTop + delta.y
                );
            } else if (item.type === ItemTypes.SOURCE_BOX) {
                const position = monitor.getSourceClientOffset();
                item.percenteLeft = pxToPercente(
                    position.x,
                    videoMetaInfo.offsetWidth
                );
                item.percenteTop = pxToPercente(
                    position.y,
                    videoMetaInfo.offsetHeight - 60
                );
                addBox(item);
            }
            return undefined;
        },
        collect: props => props,
    });

    const moveBox = (id, percenteLeft, percenteTop) => {
        const boxIndex = boxes.findIndex(box => box.id === id);
        if (boxIndex !== -1) {
            boxes[boxIndex] = {
                ...boxes[boxIndex],
                percenteLeft,
                percenteTop,
            };
            setBoxes([...boxes]);
        }
    };
    console.log(boxes);
    return (
        <div ref={drop} className="drop-container">
            {boxes.map(box => (
                <Box key={box.id} box={box} />
            ))}
        </div>
    );
};

DropContainer.propTypes = {
    boxes: PropTypes.array,
    setBoxes: PropTypes.func,
    addBox: PropTypes.func,
    videoMetaInfo: PropTypes.object,
};

export default DropContainer;
