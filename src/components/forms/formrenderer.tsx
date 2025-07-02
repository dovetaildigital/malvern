"use client";

import React, { useState } from 'react';
import FieldRenderer from './fieldrenderer';
import { Envelope } from '@phosphor-icons/react';
import Submit from '@/components/ui/submit';

interface Field {
  formFieldLabel: string;
  formFieldName: string;
  formFieldType: string;
  formFieldsRequired: boolean;
  formFieldsPlaceholder?: string;
  formFieldsOptions?: string[];
  formFieldsDefault?: string;
}

export interface FormData {
  id: string;
  title: string;
  fields: Field[];
}

export default function FormRenderer({
  form,
}: {
  form: FormData;
}) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(form.fields.map(f => [f.formFieldName, f.formFieldsDefault || '']))
  );
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form', values);

    try {
      const res = await fetch(`http://localhost:10008/wp-json/custom-forms/v1/submit/${form.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch (err) {
      setError('There was an issue submitting the form. Please try again.');
    }
  };

  return (
    <div>
        {submitted ? (
  <div className="bg-lightgrey border-fadedgrey border rounded-lg p-4 text-foreground space-y-4">
    <h4 className="heading-3">Nice to meet you{values.name ? `, ${values.name}` : ''}!</h4>

    {values.email && (
      <p className="body">
        I'll reply to you at <strong>{values.email}</strong> as soon as I can.
      </p>
    )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {form.fields.map((field, index) => (
              <FieldRenderer
                key={index}
                field={{
                  label: field.formFieldLabel,
                  name: field.formFieldName,
                  type: field.formFieldType,
                  required: field.formFieldsRequired,
                  placeholder: field.formFieldsPlaceholder,
                  options: field.formFieldsOptions,
                  default: field.formFieldsDefault,
                }}
                value={values[field.formFieldName] || ''}
                onChange={(value) => handleChange(field.formFieldName, value)}
              />
            ))}

            {error && <p className="text-red-600">{error}</p>}
            <div className="flex justify-end">
            <Submit type="submit" variant="primary" className="items-end flex justify-center">
              Send <Envelope className="w-6 h-6" />
            </Submit>
            </div>
          </form>
        )}
    </div>
  );
}
