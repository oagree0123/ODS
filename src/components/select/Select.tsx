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

type SelectContextValue = {
  value?: string;
  setValue?: (value: string) => void;
  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
  toggle: () => void;
};

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
  ...props
}: SelectProps) => {
  const localRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => setIsOpen((prev) => !prev);

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
      value={{ value, setValue, isOpen, setIsOpen, toggle }}
    >
      <div
        className={className}
        ref={localRef}
        {...props}
      >
        {children}
      </div>
    </SelectContext.Provider>
  );
};

interface TriggerProps extends PropsWithChildren {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Trigger = ({ children, className, onClick, ...props }: TriggerProps) => {
  const { toggle } = useSelectContext();

  const handleTriggerClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    toggle();
    if (onClick) onClick(e);
  };

  return (
    <button
      className={className}
      onClick={handleTriggerClick}
      {...props}
    >
      {children}
    </button>
  );
};

Select.Trigger = Trigger;

export default Select;
