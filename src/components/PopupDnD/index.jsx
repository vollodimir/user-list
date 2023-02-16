import Example from './example';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function PopupDnD() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Example />
    </DndProvider>
  );
}
