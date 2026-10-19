import React, { useState, useRef, useEffect } from "react";
import { FiPhone } from "react-icons/fi";

/**
 * SimplePhoneInput
 *
 * A lightweight phone input component that mimics the styling of the primary
 * PhoneInputWithCountry component but **does not** include a country code
 * selector. It accepts free‑form text (no digit‑only validation) and provides
 * the same container height, border, focus/hover styles so it blends seamlessly
 * with the registration form.
 *
 * Props:
 *   - value: string – current input value
 *   - onChange: (newValue: string) => void – called when the input changes
 *   - placeholder?: string
 *   - disabled?: boolean
 *   - containerClassName?: string – optional additional class for the outer wrapper
 */
const SimplePhoneInput = ({
  value = "",
  onChange,
  placeholder = "",
  disabled = false,
  containerClassName = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Expose focus handling similar to the main component (optional)
  useEffect(() => {
    if (inputRef.current && disabled) {
      inputRef.current.blur();
    }
  }, [disabled]);

  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {/* No label here – the caller renders its own label */}
      <div
        className={`relative flex items-center h-[52px] w-full rounded-xl border transition-all
          ${
            isFocused
              ? "border-[#2563eb] ring-4 ring-[#2563eb]/12 bg-white"
              : "border-[#e2e8f0] bg-[#f8fafc] hover:border-[#cbd5e1] hover:bg-[#f1f5f9]"
          }`}
      >
        <FiPhone className="absolute left-3 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className="w-full h-full pl-8 pr-3.5 bg-transparent border-none outline-none text-[0.95rem] font-medium text-slate-900 placeholder:text-slate-400 tracking-wide"
        />
      </div>
    </div>
  );
};

export default SimplePhoneInput;
