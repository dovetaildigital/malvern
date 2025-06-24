import React from 'react';
import FormRenderer from './formrenderer';

interface FormBlockProps {
  formId: number;
  formTitle?: string;
  title?: string;
  intro?: string;
}

export default function FormBlock({ formId, formTitle, title, intro }: FormBlockProps) {
  console.log('intro HTML:', intro);
  return (
    <section className="form-block max-w-3xl mx-auto p-4">
      {title && <h2 className="heading-2">{title}</h2>}
      {intro && <div className="mb-6" dangerouslySetInnerHTML={{ __html: intro }} />}
      <FormRenderer formId={formId} />
    </section>
  );
}
