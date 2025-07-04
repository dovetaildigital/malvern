import React from 'react';
import Button from '@/components/ui/button';

/**
 * Interface for a single text column
 */
export interface TextColumn {
  columnWidth: string;
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
  columnLinkedForm?: {
    __typename: string;
    id: string;
    title: string;
    formFields: {
      formFields: {
        formFieldName: string;
        formFieldLabel: string;
        formFieldType: string;
        formFieldsRequired: boolean;
        formFieldsPlaceholder?: string;
        formFieldsOptions?: string[];
        formFieldsDefault?: string;
      }[];
    };
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
        <div className="grid grid-cols-12 gap-6 gap-y-36 md:gap-y-6">
          {columnContent.map((column, index) => {
            const spanClass = column.columnWidth
              ? `col-span-12 md:${column.columnWidth}`
              : `col-span-12 md:col-span-6`;

            return (
              <div key={index} className={spanClass} data-fade>
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
