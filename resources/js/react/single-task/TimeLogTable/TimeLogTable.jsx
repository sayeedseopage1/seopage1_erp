import * as React from 'react'
import { Outlet } from 'react-router-dom'
import { useDragLayer } from 'react-dnd';


// custom drag layer 
const DragLayer = () => {
  const { item, itemType, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getClientOffset(),
  }));
 
  if (!currentOffset) {
    return null;
  }  
  return (
    <div 
      style={{ 
        position: 'fixed', 
        pointerEvents: 'none', 
        zIndex: 999999, 
        left: currentOffset.x, 
        top: currentOffset.y, 
      }}>
      {/* Render your custom preview here based on the dragged item */} 
      {itemType === 'column' && 
        <div  className='py-2 px-2 pl-3 bg-white shadow border' style={{width: 200}}>
          {item?.column?.header}
        </div>
      }
    </div>
  );
}


const TimeLogTable = () => {
  return (
    <React.Fragment>
        <DragLayer />
        <Outlet />
    </React.Fragment>
  )
}

export default TimeLogTable