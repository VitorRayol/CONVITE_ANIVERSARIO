'use client';

import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-gold-400 font-medium mb-2 text-sm">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'input-space w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 font-body',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-red-400 text-sm">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
