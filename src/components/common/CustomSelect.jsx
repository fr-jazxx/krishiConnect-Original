import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import './CustomSelect.css';

export default function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = 'Select option...',
  className = '',
  size = 'md', // 'sm', 'md', 'lg'
  disabled = false,
  id,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value) || null;

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optVal) => {
    onChange(optVal);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      id={id}
      className={`custom-select custom-select--${size} ${isOpen ? 'custom-select--open' : ''} ${
        disabled ? 'custom-select--disabled' : ''
      } ${className}`}
    >
      <button
        type="button"
        className="custom-select__trigger"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
      >
        <span className="custom-select__value-wrap">
          {selectedOption?.icon && (
            <span className="custom-select__icon">{selectedOption.icon}</span>
          )}
          <span className="custom-select__label">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>
        <ChevronDown
          size={16}
          className={`custom-select__arrow ${isOpen ? 'custom-select__arrow--rotated' : ''}`}
        />
      </button>

      {isOpen && (
        <ul className="custom-select__dropdown" role="listbox">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                className={`custom-select__option ${
                  isSelected ? 'custom-select__option--selected' : ''
                }`}
                onClick={() => handleSelect(option.value)}
              >
                <div className="custom-select__option-left">
                  {option.icon && (
                    <span className="custom-select__option-icon">{option.icon}</span>
                  )}
                  <div className="custom-select__option-text">
                    <span className="custom-select__option-title">{option.label}</span>
                    {option.subtitle && (
                      <span className="custom-select__option-sub">{option.subtitle}</span>
                    )}
                  </div>
                </div>
                {isSelected && <Check size={16} className="custom-select__check" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
