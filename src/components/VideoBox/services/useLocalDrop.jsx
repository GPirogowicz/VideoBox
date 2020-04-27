import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';
import pxToPercente from '../../../helpers/pxToPercente';

function useLocalDrop(videoMetaInfo, addBox, updateBox) {
    const ref = useRef();

    const [, dropTarget] = useDrop({
        accept: [ItemTypes.BOX, ItemTypes.SOURCE_BOX],
        drop(box, monitor) {
            let delta = monitor.getDifferenceFromInitialOffset();
            if (box.type === ItemTypes.BOX) {
                delta.x = pxToPercente(delta.x, videoMetaInfo.offsetWidth);
                delta.y = pxToPercente(delta.y, videoMetaInfo.offsetHeight);
                box.style.left += delta.x;
                box.style.top += delta.y;
                updateBox(box);
            } else if (box.type === ItemTypes.SOURCE_BOX) {
                const offset = monitor.getSourceClientOffset();
                if (offset && ref.current) {
                    const dropTargetXy = ref.current.getBoundingClientRect();
                    box.style.left = pxToPercente(
                        offset.x - dropTargetXy.left,
                        videoMetaInfo.offsetWidth
                    );
                    box.style.top = pxToPercente(
                        offset.y - dropTargetXy.top,
                        videoMetaInfo.offsetHeight
                    );
                    addBox(box);
                }
            }
            return undefined;
        },
        collect: props => props,
    });
    return elem => {
        ref.current = elem;
        dropTarget(ref);
    };
}

export default useLocalDrop;
