import { useEffect, useRef, useState } from 'react';
import FormRenderer from './formrenderer';
import type { FormData } from './formrenderer';

export default function FormBlock({
  form,
  intro,
  containerWidth,
}: {
  form: FormData;
  intro?: string;
  containerWidth?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px', // Adjust this to control when the animation triggers
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`max-w-xl mx-auto px-4 py-18 lg:py-24 transition-opacity duration-700 ease-out ${containerWidth ? containerWidth : 'max-w-xl'} ${
        isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto p-8 space-y-8 bg-white rounded-lg shadow">
        {intro && (
          <div
            className="body"
            dangerouslySetInnerHTML={{ __html: intro }}
          />
        )}
        <FormRenderer form={form} />
      </div>
    </section>
  );
}