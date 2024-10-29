import { createContext, ReactNode, useContext, useState } from 'react';

type SelectContextValue = {
  value?: string;
  setValue?(value: string): void;
  isOpen?: boolean;
  setIsOpen?(value: boolean): void;
};

const SelectContext = createContext<SelectContextValue | undefined>(undefined);

export const useSelectContext = (): SelectContextValue => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useSelectContext must be used within a SelectProvider');
  }
  return context;
};

interface SelectProps {
  children?: ReactNode;
  defaultValue?: string;
  defaultOpen?: boolean;
}

export const Select = ({
  children,
  defaultValue,
  defaultOpen,
}: SelectProps) => {
  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <SelectContext.Provider value={{ value, setValue, isOpen, setIsOpen }}>
      {children}
    </SelectContext.Provider>
  );
};

export default Select;
