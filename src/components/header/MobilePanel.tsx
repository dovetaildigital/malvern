import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { MenuItem, ActionItem } from '../../types';

const containerVariants: Variants = {
  hidden: { 
    opacity: 1,
    y: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  visible: {
    y: 0,
    height: 'calc(100vh - 76px)',
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren"
    }
  },
  exit: {
    y: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1],
      when: "afterChildren"
    }
  }
};

const contentVariants: Variants = {
  hidden: { 
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.02,
      staggerDirection: -1,
    }
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.03,
      delayChildren: 0.1,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.02,
      staggerDirection: -1,
    }
  }
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 10,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.15,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

interface MobilePanelProps {
  isOpen: boolean;
  toggle: () => void;
  menu: MenuItem[];
  actionItems?: ActionItem[];
}

export default function MobilePanel({
  isOpen,
  toggle,
  menu,
  actionItems = []
}: MobilePanelProps) {
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="mobile-panel"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          className="fixed top-[76px] left-0 w-full z-40 bg-gradient-background backdrop-blur-xl border-t border-slate-100 overflow-hidden"
          style={{ willChange: 'transform, opacity' }}
        >
          <motion.div 
            className="h-full px-6 py-4 flex flex-col"
            variants={contentVariants}
          >
            <nav className="flex-1 flex flex-col gap-4 text-lg font-medium tracking-tight">
            {menu.flatMap(({ menuItem, submenu = [] }, index) => {
  // Ensure submenu is always an array
  const safeSubmenu = Array.isArray(submenu) ? submenu : [];
  
  return [
    <motion.a
      key={`main-${menuItem.url}-${index}`}
      href={menuItem.url}
      className="relative inline-flex items-center justify-between w-full py-2 text-xl font-semibold tracking-tight text-slate-900 hover:text-sky-600 transition-colors duration-300"
      variants={itemVariants}
    >
      {menuItem.title}
    </motion.a>,
    ...safeSubmenu.map(({ link }, subIndex) => (
      <motion.a
        key={`sub-${link.url}-${index}-${subIndex}`}
        href={link.url}
        variants={itemVariants}
        className="block text-base text-slate-600 py-1 pl-4 transition-colors hover:text-sky-500"
      >
        {link.title}
      </motion.a>
    ))
  ];
})}
            </nav>

            {/* Action Buttons */}
            {actionItems.length > 0 && (
              <motion.div 
                className="mt-auto pt-4 border-t border-slate-100"
                variants={itemVariants}
              >
                <div className="flex flex-col gap-3">
                  {actionItems.map(({ menuItem }, index) => (
                    <a
                      key={`action-${menuItem.url}-${index}`}
                      href={menuItem.url}
                      className="action-link block w-full text-center"
                    >
                      <span className="gradient-fill block w-full py-3 px-6 rounded-full text-sm font-semibold">
                        {menuItem.title}
                      </span>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}