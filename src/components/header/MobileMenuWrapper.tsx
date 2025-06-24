import { useState } from 'react';
import MobileToggle from './MobileToggle';
import MobilePanel from './MobilePanel';
import type { MenuItem, ActionItem } from '../../types';

interface MobileMenuWrapperProps {
  menu: MenuItem[];
  actionItems?: ActionItem[];
}

export default function MobileMenuWrapper({ menu, actionItems = [] }: MobileMenuWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(prev => {
      return !prev;
    });
  };


  return (
    <>
      <MobileToggle isOpen={isOpen} toggle={toggle} />
      <MobilePanel 
        isOpen={isOpen} 
        toggle={toggle} 
        menu={menu} 
        actionItems={actionItems} 
      />
    </>
  );
}