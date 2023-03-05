import {React, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export const Dropdown = ({selectedItem, handleItemClick, items, dropdownTitle}) => {
    const [isOpen, setOpen] = useState(false);
    const toggleDropdown = () => setOpen(!isOpen);

  return(
    <div className={`dropdown ${isOpen && "open"}`}>
        <div className='dropdown-header' onClick={toggleDropdown}>
            {selectedItem ? items.find(item => item.id == selectedItem).label : dropdownTitle}
            <FontAwesomeIcon className={`icon ${isOpen && "open"}`} icon={faChevronRight} color="blue"/>
        </div>
        <div className={`dropdown-body ${isOpen && 'open'}`}>
            {items.map(item => (
            <div className="dropdown-item" onClick={e => {
                handleItemClick(e.target.id);
                setOpen(false);
            }} id={item.id} key={item.id}>
                <span className={`dropdown-item-dot ${item.id == selectedItem && 'selected'}`}>• </span>
                {item.label}
            </div>
            ))}
        </div>
    </div>
  );
}