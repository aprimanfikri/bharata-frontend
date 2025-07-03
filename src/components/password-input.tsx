'use client';

import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder: string;
  id?: string;
}

export const PasswordInput = ({
  value,
  onChange,
  disabled,
  placeholder,
  id = 'password',
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const togglePasswordVisibility = () => {
    if (!inputRef.current) return;

    const cursorPosition = inputRef.current.selectionStart;

    setShowPassword((prev) => !prev);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 0);
  };

  return (
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? 'text' : 'password'}
        placeholder={showPassword ? placeholder : '********'}
        className="pr-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        ref={(e) => {
          inputRef.current = e;
        }}
        disabled={disabled}
      />
      <Button
        variant="ghost"
        type="button"
        size="icon"
        className="absolute bottom-1 right-1 h-7 w-7"
        onClick={togglePasswordVisibility}
        disabled={disabled}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
        <span className="sr-only">Toggle password visibility</span>
      </Button>
    </div>
  );
};
