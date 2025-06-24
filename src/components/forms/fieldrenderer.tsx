interface FieldProps {
    field: {
      label: string;
      name: string;
      type: string;
      required: boolean;
      placeholder?: string;
      options?: string;
      default?: string;
    };
    value: string;
    onChange: (value: string) => void;
  }
  
  export default function FieldRenderer({ field, value, onChange }: FieldProps) {
    const sharedProps = {
      id: field.name,
      name: field.name,
      required: field.required,
      value: value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        onChange(e.target.value),
      placeholder: field.placeholder,
      className:
        'block w-full',
    };
  
    // Fixed label width (adjust px as needed)
    const labelWidth = 'w-24'; // 9rem wide labels, tweak for your design
  
    const containerClass =
      'flex items-top mb-4 border-b border-fadedgrey'; // flex container for label + input aligned vertically center
  
    switch (field.type) {
      case 'textarea':
        return (
          <div className={containerClass}>
            <label htmlFor={field.name} className={`body text-foreground ${labelWidth} pr-4 text-left`}>
              {field.label}
              {field.required && <span className="text-red-500"></span>}
            </label>
            <textarea {...sharedProps} rows={4} className={`${sharedProps.className} min-h-[100px] flex-grow resize-none placeholder:text-fadedgrey placeholder:body`} />
          </div>
        );
  
      case 'select':
        const options = (field.options || '').split('\n').filter((opt) => opt.trim() !== '');
        return (
          <div className={containerClass}>
            <label htmlFor={field.name} className={`body text-foreground ${labelWidth} pr-4 text-left`}>
              {field.label}
              {field.required && <span className="text-red-500"></span>}
            </label>
            <select {...sharedProps} className={`${sharedProps.className} flex-grow`} value={value}>
              <option value="">Select an option</option>
              {options.map((option, i) => (
                <option key={i} value={option.trim()}>
                  {option.trim()}
                </option>
              ))}
            </select>
          </div>
        );
  
      case 'checkbox':
        return (
          <div className="flex items-center mb-4">
            <input
              id={field.name}
              name={field.name}
              type="checkbox"
              checked={value === 'true'}
              onChange={(e) => onChange(String(e.target.checked))}
              className="h-4 w-4 rounded border-fadedgrey text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={field.name} className="ml-3 text-fadedgrey body">
              {field.label}
              {field.required && <span className="text-red-500"></span>}
            </label>
          </div>
        );
  
      default:
        return (
          <div className={containerClass}>
            <label htmlFor={field.name} className={`body text-foreground ${labelWidth} pr-4 text-left`}>
              {field.label}
              {field.required && <span className="text-red-500"></span>}
            </label>
            <input
              type={field.type || 'text'}
              {...sharedProps}
              className={`${sharedProps.className} flex-grow`}
            />
          </div>
        );
    }
  }
  