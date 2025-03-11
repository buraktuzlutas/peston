"use client"
import dynamic from 'next/dynamic'
import { DragDropContext as DragDropContextType, 
         Droppable as DroppableType,
         Draggable as DraggableType,
         DroppableProvided,
         DraggableProvided,
         DropResult } from 'react-beautiful-dnd'

// DragDropContext'i client-side'da dinamik olarak import et
const DragDropContext = dynamic<any>(
  () => import('react-beautiful-dnd').then(mod => mod.DragDropContext),
  { ssr: false }
)
const Droppable = dynamic<any>(
  () => import('react-beautiful-dnd').then(mod => mod.Droppable),
  { ssr: false }
)
const Draggable = dynamic<any>(
  () => import('react-beautiful-dnd').then(mod => mod.Draggable),
  { ssr: false }
)

interface Props {
  items: any[]
  onDragEnd: (result: DropResult) => void
  renderItem: (item: any, index: number, provided: DraggableProvided) => React.ReactNode
}

export function DraggableContent({ items = [], onDragEnd, renderItem }: Props) {
  if (!items) return null // items undefined ise null döndür

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable 
        droppableId="droppable"
        isDropDisabled={false}
        isCombineEnabled={false}
        ignoreContainerClipping={false}
        mode="standard"
        type="DEFAULT"
        direction="vertical"
      >
        {(provided: DroppableProvided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-6"
          >
            {items.map((item, index) => (
              <Draggable 
                key={item.id} 
                draggableId={item.id} 
                index={index}
                isDragDisabled={false}
              >
                {(provided) => renderItem(item, index, provided)}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
} 