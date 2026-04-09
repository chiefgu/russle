import { cn } from '@/lib/cn';

type FieldShellProps = {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  hint?: string;
};

export function FieldShell({ id, label, required, children, className, hint }: FieldShellProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="label text-[var(--color-text-mute)]">
        {label}
        {required && <span className="ml-1 text-[var(--color-accent)]">*</span>}
      </label>
      {children}
      {hint && <p className="text-small text-[var(--color-text-soft)]">{hint}</p>}
    </div>
  );
}

const fieldClasses =
  'w-full rounded-[var(--radius-m)] bg-[var(--color-surface)] px-5 py-4 text-body text-[var(--color-text)] placeholder:text-[var(--color-text-soft)] outline-none transition-all duration-200 focus:bg-[var(--color-surface-2)]';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ label, id, required, className, ...props }: InputProps) {
  const fieldId = id ?? props.name ?? label.replace(/\s+/g, '-').toLowerCase();
  return (
    <FieldShell id={fieldId} label={label} required={required} className={className}>
      <input id={fieldId} required={required} className={fieldClasses} {...props} />
    </FieldShell>
  );
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export function Textarea({ label, id, required, className, rows = 5, ...props }: TextareaProps) {
  const fieldId = id ?? props.name ?? label.replace(/\s+/g, '-').toLowerCase();
  return (
    <FieldShell id={fieldId} label={label} required={required} className={className}>
      <textarea
        id={fieldId}
        required={required}
        rows={rows}
        className={cn(fieldClasses, 'resize-none')}
        {...props}
      />
    </FieldShell>
  );
}
