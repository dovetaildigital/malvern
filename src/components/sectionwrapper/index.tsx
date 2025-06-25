import clsx from 'clsx';

const paddingMap = {
  more: 'lg',
  normal: 'md',
  less: 'sm',
};

type Padding = 'more' | 'normal' | 'less' | undefined;

export const SectionWrapper = ({
  paddingTop = 'normal',
  children,
}: {
  paddingTop?: Padding;
  children: React.ReactNode;
}) => {
  return (
    <section
      className={clsx(
        `pt-${paddingMap[paddingTop ?? 'normal']}`,
      )}
    >
      {children}
    </section>
  );
};
