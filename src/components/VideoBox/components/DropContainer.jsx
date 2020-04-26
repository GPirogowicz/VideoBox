import React from 'react';
import DragBox from './DragBox';
import PropTypes from 'prop-types';
import useLocalDrop from '../services/useLocalDrop';

const DropContainer = ({ boxes, videoMetaInfo, addBox, updateBox }) => {
    const ref = useLocalDrop(videoMetaInfo, addBox, updateBox);

    return (
        <div ref={ref} className="drop-container">
            {boxes.map(box => (
                <DragBox
                    key={box.id}
                    box={box}
                    scale={videoMetaInfo.scale || 1}
                />
            ))}
        </div>
    );
};

DropContainer.propTypes = {
    boxes: PropTypes.array,
    addBox: PropTypes.func,
    updateBox: PropTypes.func,
    videoMetaInfo: PropTypes.object,
};

export default DropContainer;
