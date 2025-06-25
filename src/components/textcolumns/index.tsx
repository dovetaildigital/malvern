import React from 'react';
import Button from '@/components/ui/button';

interface TextColumn {
  columnWidth: string; // e.g. 'col-span-6', 'col-span-8'
  columnContent: string;
  columnButton?: {
    buttonLink: {
      title: string;
      url: string;
      target: string;
    };
    buttonIcon: string;
    buttonStyle: 'primary' | 'secondary' | 'default';
  };
}

interface TextColumnsProps {
  columnContent: TextColumn[];
  containerWidth?: string;
}

export const TextColumns: React.FC<TextColumnsProps> = ({
  columnContent,
  containerWidth = 'container-lg',
}) => {
  return (
    <section className="w-full px-4 py-18 lg:py-24">
      <div className={containerWidth}>
        <div className="grid grid-cols-12 gap-6">
          {columnContent.map((column, index) => {
            const spanClass = column.columnWidth
              ? `col-span-12 md:${column.columnWidth}`
              : `col-span-12 md:col-span-6`;

            return (
              <div key={index} className={spanClass}>
                <div dangerouslySetInnerHTML={{ __html: column.columnContent }} />

                {column.columnButton?.buttonLink?.url && (
                  <Button
                    label={column.columnButton.buttonLink.title}
                    url={column.columnButton.buttonLink.url}
                    target={column.columnButton.buttonLink.target}
                    icon={column.columnButton.buttonIcon}
                    style={column.columnButton.buttonStyle}
                    className="mt-4"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
