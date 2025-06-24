// components/Cf7CustomForm.tsx
import React, { useEffect, useState } from 'react';

interface Cf7CustomFormProps {
  formId: string; // updated from formId
  formIntro?: string;
  className?: string;
}

export const Cf7CustomForm: React.FC<Cf7CustomFormProps> = ({ formId, formIntro, className = '' }) => {
  const [formHtml, setFormHtml] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  console.log('Cf7CustomForm rendered with formId:', formId);

  useEffect(() => {
    if (!formId) return;

    const fetchForm = async () => {
      try {
        const res = await fetch(`/wp-json/contact-form-7/v1/contact-forms/${formId}`);
        const data = await res.json();
        console.log('CF7 form response:', data);
        setFormHtml(data.form);
      } catch (err) {
        console.error('Failed to fetch CF7 form:', err);
      }
    };

    fetchForm();
  }, [formId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    setStatus('submitting');
    setMessage('');

    try {
      const res = await fetch(`/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`, {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      if (result.status === 'mail_sent') {
        setStatus('success');
        setMessage(result.message || 'Thank you for your enquiry!');
        form.reset();
      } else {
        setStatus('error');
        setMessage(result.message || 'There was a problem submitting your form.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Submission failed. Please try again.');
    }
  };

  if (!formId) {
    return <div className="text-red-600 text-sm">No form selected. Please choose a Contact Form in the CMS.</div>;
  }

  return (
    <div className={`max-w-md mx-auto bg-white rounded-xl shadow p-8 space-y-6 ${className}`}>
      {formIntro && (
        <div
          className="prose text-gray-700"
          dangerouslySetInnerHTML={{ __html: formIntro }}
        />
      )}
      <form
        onSubmit={handleSubmit}
        dangerouslySetInnerHTML={{ __html: formHtml }}
      />
      {message && (
        <div className={`text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message}</div>
      )}
    </div>
  );
};
