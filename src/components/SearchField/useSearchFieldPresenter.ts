import type { ChangeEvent } from 'react';

import type { SearchFieldProps } from './SearchField.types';

export const useSearchFieldPresenter = ({
  value,
  onValueChange,
  label,
  placeholder,
  isLoading = false,
}: SearchFieldProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onValueChange(event.target.value);
  const handleClear = () => onValueChange('');

  return {
    value,
    label,
    placeholder,
    isLoading,
    canClear: !isLoading && value.length > 0,
    handleChange,
    handleClear,
  };
};
