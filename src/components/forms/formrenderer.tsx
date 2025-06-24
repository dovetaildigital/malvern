"use client";

import React, { useEffect, useState } from 'react';
import FieldRenderer from './fieldrenderer';
import { Envelope } from '@phosphor-icons/react';
import Submit from '@/components/ui/submit';

interface Field {
  formFieldLabel: string;
  formFieldName: string;
  formFieldType: string;
  formFieldsRequired: boolean;
  formFieldsPlaceholder?: string;
  formFieldsOptions?: string;
  formFieldsDefault?: string;
}

interface FormData {
  id: string;
  title: string;
  fields: Field[];
}
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: string;
  }
export default function FormRenderer({ formId }: { formId: number }) {
  const [form, setForm] = useState<FormData | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchForm = async () => {
      try {
        const url = `http://localhost:10008/wp-json/custom-forms/v1/form/${formId}`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        if (isMounted) {
          setForm(data);

          const initialValues: Record<string, string> = {};
          if (data.fields && Array.isArray(data.fields)) {
            data.fields.forEach((field: Field) => {
              initialValues[field.formFieldName] = field.formFieldsDefault || '';
            });
          }
          setValues(initialValues);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load form');
          setLoading(false);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (formId) fetchForm();
    else {
      setError('No form ID provided');
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [formId]);

  const handleChange = (name: string, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:10008/wp-json/custom-forms/v1/submit/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit form. Please try again.');
    }
  };

  if (loading) return (
    <div className="text-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p>Loading form {formId}...</p>
      <p className="text-sm text-gray-500">If this takes too long, check the browser console for errors.</p>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
      <p>Error: {error}</p>
    </div>
  );

  if (submitted) return (
    <div className="bg-lightgrey border-fadedgrey border rounded-lg p-4 text-foreground">
      <h4 className="heading-3">Thanks for getting in touch!</h4>
      <p className="body">Your message has been sent.</p>
    </div>
  );

  if (!form) return <div>No form data available</div>;

  return (
    <div className="space-y-6 ">
      <form onSubmit={handleSubmit} className="space-y-6">
        {form.fields.map((field, index) => (
          <div key={index} className="space-y-2">
            <FieldRenderer
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
          </div>
        ))}
        
        <Submit type="submit" variant="primary" className="flex justify-center">
      Send <Envelope className="w-6 h-6" />
    </Submit>
      </form>
    </div>
  );
}
