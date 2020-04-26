import ItemTypes from '../services/ItemTypes';
import uniqueId from '../../../helpers/uniqueId';
const randomUniqueId = uniqueId();
class Box {
    id;
    content;
    type;
    visible = true;
    visibleStart = 0;
    visibleStop = 3;
    style = {
        width: 50,
        height: 50,
    };

    constructor(content = '', type = ItemTypes.SOURCE_BOX, visible = true) {
        this.id = randomUniqueId();
        this.content = content;
        this.type = type;
        this.visible = visible;
    }
}

export default Box;
