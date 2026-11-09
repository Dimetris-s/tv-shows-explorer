import { LoaderCircle, Search, X } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';

import type { SearchFieldProps } from './SearchField.types';
import { useSearchFieldPresenter } from './useSearchFieldPresenter';

export const SearchField = (props: SearchFieldProps) => {
  const { value, label, placeholder, isLoading, canClear, handleChange, handleClear } =
    useSearchFieldPresenter(props);

  return (
    <InputGroup className="h-14 rounded-[12px]">
      <InputGroupAddon className="pl-4">
        <Search className="size-5" />
      </InputGroupAddon>
      <InputGroupInput
        type="search"
        aria-label={label}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="text-[17px] font-medium [&::-webkit-search-cancel-button]:appearance-none"
      />
      <InputGroupAddon align="inline-end" className="pr-1.5">
        {isLoading && (
          <LoaderCircle aria-label="Загрузка" className="mr-2.5 size-5 animate-spin text-primary" />
        )}
        {canClear && (
          <InputGroupButton
            size="icon-sm"
            aria-label="Очистить поиск"
            className="size-11 text-muted-foreground hover:bg-secondary hover:text-foreground"
            onClick={handleClear}
          >
            <X className="size-[18px]" />
          </InputGroupButton>
        )}
      </InputGroupAddon>
    </InputGroup>
  );
};
