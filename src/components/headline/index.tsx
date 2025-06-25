import React from 'react';

const validTags = ['1', '2', '3', '4', '5', 'p'] as const;
type Tag = (typeof validTags)[number];

interface HeadlineProps {
  headlineText: string
  headlineSize: string[] // still passed from CMS as array
  containerWidth: string
}

const Headline: React.FC<HeadlineProps> = ({
  headlineText,
  headlineSize,
  containerWidth,
}) => {
  const sizeValue = Array.isArray(headlineSize) ? headlineSize[0] : headlineSize;
  const normalizedSize = typeof sizeValue === 'string' ? sizeValue.toLowerCase().trim() : '';
  const tagSuffix = validTags.includes(normalizedSize as Tag) ? (normalizedSize as Tag) : 'p';
  const tagName = tagSuffix === 'p' ? 'p' : `h${tagSuffix}`;

  return React.createElement(
    'div',
    {
      className: `${containerWidth} text-center mt-24 mb-12`
    },
    React.createElement(
      tagName,
      { className: `heading-${tagSuffix}` },
      headlineText
    )
  );
};

export default Headline;
