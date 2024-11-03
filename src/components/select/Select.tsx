import {
  createContext,
  MouseEventHandler,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface PropsWithChildren {
  children?: ReactNode;
  className?: string;
}

interface SelectContextValue {
  value?: string;
  setValue: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  toggle: () => void;
  close: () => void;
}

const SelectContext = createContext<SelectContextValue | undefined>(undefined);

export const useSelectContext = (): SelectContextValue => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useSelectContext must be used within a SelectProvider');
  }
  return context;
};

interface SelectProps extends PropsWithChildren {
  defaultValue?: string;
  defaultOpen?: boolean;
}

const Select = ({
  children,
  className,
  defaultValue,
  defaultOpen,
}: SelectProps) => {
  const localRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(!!defaultOpen);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        localRef.current &&
        !localRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <SelectContext.Provider
      value={{ value, setValue, isOpen, setIsOpen, toggle, close }}
    >
      <div
        className={className}
        ref={localRef}
      >
        {children}
      </div>
    </SelectContext.Provider>
  );
};

interface TriggerProps extends PropsWithChildren {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const SelectTrigger = ({ children, className, onClick }: TriggerProps) => {
  const { toggle } = useSelectContext();

  const handleTriggerClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    toggle();
    if (onClick) onClick(e);
  };

  return (
    <button
      className={className}
      onClick={handleTriggerClick}
    >
      {children}
    </button>
  );
};

interface SelectValueProps extends PropsWithChildren {
  placeholder?: string;
}

const SelectValue = ({ className, placeholder }: SelectValueProps) => {
  const { value } = useSelectContext();
  return <span className={className}>{value ? value : placeholder}</span>;
};

const SelectContent = ({ children, className }: PropsWithChildren) => {
  const { isOpen } = useSelectContext();

  if (!isOpen) return null;

  return <div className={className}>{children}</div>;
};

interface SelectItemProps extends PropsWithChildren {
  value: string;
  onSelect?: (value: string) => void;
}

const SelectItem = ({
  children,
  className,
  value,
  onSelect,
}: SelectItemProps) => {
  const { setValue, close } = useSelectContext();

  const handleSelect = () => {
    setValue(value);
    close();
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <div
      className={className}
      onClick={handleSelect}
    >
      {children}
    </div>
  );
};

Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Item = SelectItem;
Select.Value = SelectValue;

export default Select;
