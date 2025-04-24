import { useState, useCallback } from 'react';

/**
 * Custom hook for form management with validation
 * 
 * @param initialValues Initial form values
 * @param validationSchema Validation schema for form fields
 * @param onSubmit Submit handler function
 * @returns Form state and handlers
 */
export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationSchema: Record<keyof T, (value: any) => string>,
  onSubmit: (values: T) => void
) => {
  // Form state
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string>>({} as Record<keyof T, string>);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);
  
  /**
   * Validate a single field
   */
  const validateField = useCallback(
    (name: keyof T, value: any): string => {
      if (validationSchema[name]) {
        return validationSchema[name](value);
      }
      return '';
    },
    [validationSchema]
  );
  
  /**
   * Handle input change
   */
  const handleChange = useCallback(
    (name: keyof T, value: any) => {
      setValues(prev => ({ ...prev, [name]: value }));
      
      // Validate field on change if it's been touched
      if (touched[name]) {
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
      }
    },
    [touched, validateField]
  );
  
  /**
   * Handle input blur
   */
  const handleBlur = useCallback(
    (name: keyof T) => {
      setTouched(prev => ({ ...prev, [name]: true }));
      
      // Validate field on blur
      const error = validateField(name, values[name]);
      setErrors(prev => ({ ...prev, [name]: error }));
    },
    [values, validateField]
  );
  
  /**
   * Validate all form fields or specific fields
   */
  const validateForm = useCallback(
    (fieldNames?: Array<keyof T>): boolean => {
      const fieldsToValidate = fieldNames || (Object.keys(validationSchema) as Array<keyof T>);
      const newErrors: Record<keyof T, string> = { ...errors };
      let isValid = true;
      
      // Validate each field
      fieldsToValidate.forEach(name => {
        const error = validateField(name, values[name]);
        newErrors[name] = error;
        
        if (error) {
          isValid = false;
        }
      });
      
      setErrors(newErrors);
      return isValid;
    },
    [errors, validateField, values, validationSchema]
  );
  
  /**
   * Reset form state
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({} as Record<keyof T, string>);
    setTouched({} as Record<keyof T, boolean>);
  }, [initialValues]);
  
  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(() => {
    // Validate all fields
    const isValid = validateForm();
    
    // Mark all fields as touched
    const allTouched = Object.keys(validationSchema).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as Record<keyof T, boolean>
    );
    setTouched(allTouched);
    
    // Submit form if valid
    if (isValid) {
      onSubmit(values);
    }
  }, [validateForm, validationSchema, values, onSubmit]);
  
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    validateForm,
    resetForm,
  };
};
