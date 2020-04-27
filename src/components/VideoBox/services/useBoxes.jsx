import { useState, useEffect } from 'react';
import ItemTypes from './ItemTypes';

function useBoxes(videoMetaInfo) {
    const [boxes, setBoxes] = useState([]);
    const addBox = box => {
        const { currentTime, duration } = videoMetaInfo;
        console.log(videoMetaInfo);
        if (box.type === ItemTypes.SOURCE_BOX) {
            box.visible = isVisible(box);
            box.type = ItemTypes.BOX;
            box.visibleStart = currentTime;
            box.visibleStop =
                currentTime +
                (duration - 3 >= currentTime
                    ? 3
                    : currentTime === duration
                    ? 0
                    : 1);
            setBoxes(prev => {
                prev.push(box);
                return [...prev];
            });
        }
    };
    const updateBox = box => {
        const boxIndex = boxes.findIndex(item => item.id === box.id);
        if (boxIndex !== -1) {
            box.visible = isVisible(box);
            boxes[boxIndex] = box;
            setBoxes([...boxes]);
        }
    };
    const isVisible = box => {
        if (
            box.visibleStart <= videoMetaInfo.currentTime &&
            box.visibleStop >= videoMetaInfo.currentTime
        ) {
            return true;
        }
        return false;
    };
    useEffect(() => {
        setBoxes(prevBoxes => {
            return prevBoxes.map(box => {
                box.visible = isVisible(box);
                return box;
            });
        });
    }, [videoMetaInfo.currentTime]);

    return {
        getAll: () => boxes,
        updateBox: updateBox,
        addBox: addBox,
    };
}

export default useBoxes;
