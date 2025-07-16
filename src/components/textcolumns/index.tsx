import React from 'react'
import Button from '@/components/ui/button'

export interface TextColumn {
  columnWidth: string
  columnContent: string
  columnButton?: {
    buttonLink: {
      title: string
      url: string
      target: string
    }
    buttonIcon: string
    buttonStyle: 'primary' | 'secondary' | 'default'
  }
}

interface TextColumnsProps {
  columnContent: TextColumn[]
  containerWidth?: string
  containerStyle?: 'plain' | 'blurb'
}

export const TextColumns: React.FC<TextColumnsProps> = ({
  columnContent,
  containerWidth = 'container-lg',
  containerStyle,
}) => {
  const effectiveStyle = containerStyle || 'plain'

  return (
    <section className="w-full px-4 py-18 lg:py-24">
      <div className={`${containerWidth} ${effectiveStyle}`}>
        <div className="grid grid-cols-12 gap-6">
          {columnContent.map((column, index) => {
            const spanClass = column.columnWidth
              ? `col-span-12 md:${column.columnWidth}`
              : `col-span-12 md:col-span-6`

            return (
              <article
                key={index}
                className={spanClass}
                data-fade
                aria-label={`Column ${index + 1}`}
              >
                <div className="h-full flex flex-col justify-between space-y-4">
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
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

