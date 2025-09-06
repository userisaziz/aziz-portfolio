import { useState, useCallback } from 'react';
import { FormData } from '@/types';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

interface ValidationErrors {
  [key: string]: string;
}

export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: ValidationRules = {}
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name: string, value: any): string => {
    const rules = validationRules[name];
    if (!rules) return '';

    if (rules.required && (!value || value.toString().trim() === '')) {
      return rules.message || `${name} is required`;
    }

    if (value && rules.minLength && value.toString().length < rules.minLength) {
      return rules.message || `${name} must be at least ${rules.minLength} characters`;
    }

    if (value && rules.maxLength && value.toString().length > rules.maxLength) {
      return rules.message || `${name} must be less than ${rules.maxLength} characters`;
    }

    if (value && rules.pattern && !rules.pattern.test(value.toString())) {
      return rules.message || `${name} format is invalid`;
    }

    return '';
  }, [validationRules]);

  const validateForm = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField, validationRules]);

  const handleChange = useCallback((name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleBlur = useCallback((name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField, values]);

  const handleSubmit = useCallback(async (
    onSubmit: (values: T) => Promise<void> | void
  ) => {
    setIsSubmitting(true);
    
    // Mark all fields as touched
    const allFieldsTouched = Object.keys(validationRules).reduce(
      (acc, key) => ({ ...acc, [key]: true }), 
      {}
    );
    setTouched(allFieldsTouched);

    const isValid = validateForm();
    
    if (isValid) {
      try {
        await onSubmit(values);
        // Reset form on successful submission
        setValues(initialValues);
        setTouched({});
        setErrors({});
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
  }, [values, validateForm, initialValues, validationRules]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const getFieldProps = useCallback((name: string) => ({
    value: values[name] || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
      handleChange(name, e.target.value),
    onBlur: () => handleBlur(name),
    error: touched[name] ? errors[name] : '',
    isInvalid: touched[name] && !!errors[name]
  }), [values, handleChange, handleBlur, touched, errors]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    validateForm,
    reset,
    getFieldProps,
    isValid: Object.keys(errors).length === 0
  };
}

// Pre-defined validation rules for common fields
export const commonValidationRules = {
  email: {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
    message: 'Please enter a valid email address'
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'Name must be between 2 and 50 characters'
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000,
    message: 'Message must be between 10 and 1000 characters'
  },
  phone: {
    pattern: /^[\\+]?[1-9][\\d\\s\\-\\(\\)]{8,15}$/,
    message: 'Please enter a valid phone number'
  }
};"