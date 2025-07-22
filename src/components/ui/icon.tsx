// src/components/ui/icon.tsx

import React, { useState, useEffect } from 'react';
import * as PhosphorIcons from '@phosphor-icons/react';
import { icons } from '@/lib/icons';
import type { IconSlug } from '@/types/buttons';

type PhosphorIconName = keyof typeof PhosphorIcons;

// Map your icon slugs to Phosphor icon names (without 'Icon' suffix)
const iconMap: Partial<Record<IconSlug, string>> = {
  'accessibility': 'Accessibility',
  'arrow-down': 'ArrowDown',
  'build': 'Gear',
  'chat-1': 'Chat',
  'chat': 'Chat',
  'chats': 'Chats',
  'click': 'HandTap',
  'cursor-click': 'CursorClick',
  'cursor': 'Cursor',
  'design': 'PencilLine',
  'discovery': 'Compass',
  'down': 'CaretDown',
  'down-left': 'ArrowDownLeft',
  'down-right': 'ArrowDownRight',
  'graph': 'ChartLine',
  'launch': 'RocketLaunch',
  'left': 'CaretLeft',
  'measure': 'Ruler',
  'ongoing': 'ClockClockwise',
  'right': 'CaretRight',
  'search': 'MagnifyingGlass',
  'send': 'PaperPlaneTilt',
  'up': 'CaretUp',
  'up-left': 'ArrowUpLeft',
  'up-right': 'ArrowUpRight',
} as const;

interface IconProps {
  icon: IconSlug;
  className?: string;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  size?: number | string;
}

const Icon: React.FC<IconProps> = ({
  icon,
  className = 'w-4 h-4',
  weight = 'regular',
  size,
  ...props
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  
  // Get the mapped Phosphor icon name
  const phosphorIconName = iconMap[icon];
  
  // Find the icon component, trying both with and without 'Icon' suffix
  const IconComponent = phosphorIconName 
    ? (PhosphorIcons[`${phosphorIconName}Icon` as PhosphorIconName] as React.ComponentType<{
        className?: string;
        weight?: string;
        size?: number | string;
      }> || 
      PhosphorIcons[phosphorIconName as PhosphorIconName] as React.ComponentType<{
        className?: string;
        weight?: string;
        size?: number | string;
      }>)
    : null;

  // Fetch and process SVG content if using fallback
  useEffect(() => {
    if (!IconComponent && icons[icon]) {
      fetch(icons[icon] as string)
        .then(response => response.text())
        .then(svgText => {
          // Parse the SVG text to a DOM element
          const parser = new DOMParser();
          const doc = parser.parseFromString(svgText, 'image/svg+xml');
          const svg = doc.querySelector('svg');
          
          if (svg) {
            // Set SVG attributes
            svg.setAttribute('class', 'h-full w-full');
            
            // Remove any existing fill and stroke attributes from the SVG
            svg.removeAttribute('fill');
            svg.removeAttribute('stroke');
            
            // Set fill and stroke to currentColor for all child elements
            const elements = svg.querySelectorAll('*');
            elements.forEach(el => {
              // Only set fill if the element has a fill attribute
              if (el.hasAttribute('fill') && el.getAttribute('fill') !== 'none') {
                el.setAttribute('fill', 'currentColor');
              }
              // Only set stroke if the element has a stroke attribute
              if (el.hasAttribute('stroke') && el.getAttribute('stroke') !== 'none') {
                el.setAttribute('stroke', 'currentColor');
              }
              // Remove any inline styles that might set colors
              if (el.hasAttribute('style')) {
                const style = el.getAttribute('style') || '';
                const newStyle = style
                  .split(';')
                  .filter(declaration => !declaration.includes('fill:') && !declaration.includes('stroke:'))
                  .join(';');
                el.setAttribute('style', newStyle);
              }
            });
            
            // Convert back to string
            const serializer = new XMLSerializer();
            const processedSvg = serializer.serializeToString(svg);
            setSvgContent(processedSvg);
          } else {
            // Fallback to simple replacement if parsing fails
            const processedSvg = svgText
              .replace(/<svg/, '<svg class="h-full w-full"')
              .replace(/fill="[^"]*"/g, 'fill="currentColor"')
              .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
              .replace(/style="[^"]*fill:[^;"]*[;"]?/g, 'style="')
              .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ''); // Remove any style tags
            setSvgContent(processedSvg);
          }
        })
        .catch(error => {
          console.error('Error loading icon:', error);
        });
    }
  }, [icon, IconComponent]);

  // Fall back to the original SVG if no Phosphor icon is found
  if (!IconComponent) {
    if (!svgContent) return null;
    
    return (
      <span 
        className={className}
        dangerouslySetInnerHTML={{ __html: svgContent }}
        aria-hidden="true"
      />
    );
  }

  // Render the Phosphor icon
  return (
    <IconComponent
      className={className}
      weight={weight}
      size={size}
      {...props}
    />
  );
};

export default Icon;
