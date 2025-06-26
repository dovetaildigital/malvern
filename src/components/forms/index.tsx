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
    <section className="max-w-xl mx-auto py-12 md:py-20">
      <div className="container space-y-8">
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
