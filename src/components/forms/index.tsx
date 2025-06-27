"use client";

import React from 'react';
import FormRenderer from './formrenderer';
import type { FormData } from './formrenderer';

export default function FormBlock({
  form,
  intro,
}: {
  form: FormData;
  intro?: string;
}) {
  return (
    <section className="max-w-xl mx-auto px-4 py-18 lg:py-24" data-fade>
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
