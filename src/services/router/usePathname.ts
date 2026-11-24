import { useLocation } from 'wouter';

export const usePathname = () => useLocation()[0];
