export type SearchFieldProps = {
  value: string;
  onValueChange: (value: string) => void;
  /** Accessible name of the field. */
  label: string;
  placeholder?: string;
  /** Shows a spinner instead of the clear button, e.g. while a debounced request runs. */
  isLoading?: boolean;
};
