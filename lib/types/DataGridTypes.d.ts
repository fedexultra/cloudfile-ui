import { CloudItem } from './CloudItemTypes';
import { IconDefinition } from '../types/IconTypes';
interface Column {
    id: number;
    title: string;
    width: string;
    hasBorder: boolean;
    getIconFromRow: (row: Row) => IconDefinition;
    getCellFromRow: (row: Row) => string;
}
interface Row {
    cloudItem: CloudItem;
}
export { Row, Column };
