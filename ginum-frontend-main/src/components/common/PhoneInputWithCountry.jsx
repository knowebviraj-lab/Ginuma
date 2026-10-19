import React, { useState, useEffect, useRef } from "react";
import { FiPhone, FiChevronDown, FiSearch } from "react-icons/fi";
import { COUNTRY_CODES } from "../../utils/phoneSchema";

/**
 * PhoneInputWithCountry
 *
 * Integrated phone number input:
 *  - Displays the country name, flag, and dial code directly inside the dropdown selection.
 *  - Once selected, displays the country name & code along with the phone number input
 *    in a single, unified 52px control (no separate country code dropdown above).
 *  - Accepts digits only in the phone number field.
 *  - Optional extension field that can be expanded if needed.
 */
const PhoneInputWithCountry = ({
  countryCode = "",
  phoneNumber = "",
  extension = "",
  onCountryCodeChange,
  onPhoneNumberChange,
  onExtensionChange,
  error = "",
  label = "Primary Phone Number",
  required = false,
  disabled = false,
  showExtension = true,
  containerClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [digitError, setDigitError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showExtInput, setShowExtInput] = useState(Boolean(extension));

  const [selectedCountryId, setSelectedCountryId] = useState(() => {
    const match = COUNTRY_CODES.find((c) => c.code === countryCode);
    return match ? match.id : "";
  });

  const containerRef = useRef(null);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Sync internal selected country ID when countryCode prop changes
  useEffect(() => {
    if (countryCode) {
      const match =
        COUNTRY_CODES.find((c) => c.id === selectedCountryId && c.code === countryCode) ||
        COUNTRY_CODES.find((c) => c.code === countryCode);
      if (match) setSelectedCountryId(match.id);
    }
  }, [countryCode]);

  // Clear digit error when country code changes
  useEffect(() => {
    if (countryCode) setDigitError("");
  }, [countryCode]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentCountry =
    COUNTRY_CODES.find((c) => c.id === selectedCountryId) ||
    COUNTRY_CODES.find((c) => c.code === countryCode) ||
    (countryCode ? { name: countryCode, flag: "🌐", code: countryCode } : null);

  const filteredCountries = COUNTRY_CODES.filter((c) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.code.includes(q) ||
      c.label.toLowerCase().includes(q)
    );
  });

  const handleSelectCountry = (c) => {
    setSelectedCountryId(c.id);
    onCountryCodeChange(c.code);
    setIsOpen(false);
    setSearch("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  /** Digits-only onChange: strip non-digits and pop an error if any were found */
  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    if (/\D/.test(raw)) {
      setDigitError("Only digits are allowed in the phone number");
      onPhoneNumberChange(raw.replace(/\D/g, ""));
      return;
    }
    setDigitError("");
    onPhoneNumberChange(raw);
  };

  /** Block non-digit before input (covers keyboard, context menu, etc.) */
  const handleBeforeInput = (e) => {
    if (e.data && /\D/.test(e.data)) {
      e.preventDefault();
      setDigitError("Only digits are allowed in the phone number");
    }
  };

  const handlePaste = (e) => {
    const paste = (e.clipboardData || e.originalEvent.clipboardData).getData("text");
    if (/\D/.test(paste)) {
      e.preventDefault();
      const cleaned = paste.replace(/\D/g, "");
      onPhoneNumberChange(cleaned);
      setDigitError("");
    }
  };

  const displayError = error || digitError;

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`} ref={containerRef}>
      {label && (
        <label className="reg-label">
          {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
        </label>
      )}

      {/* Unified Input Container matching .reg-input */}
      <div
        className={`
          relative flex items-center h-[52px] w-full rounded-xl border transition-all
          ${
            displayError
              ? "border-red-400 ring-4 ring-red-100 bg-white"
              : isFocused || isOpen
              ? "border-[#2563eb] ring-4 ring-[#2563eb]/12 bg-white"
              : "border-[#e2e8f0] bg-[#f8fafc] hover:border-[#cbd5e1] hover:bg-[#f1f5f9]"
          }
        `}
      >
        {/* Integrated Country Dropdown Trigger Button - Compact Code Only */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          disabled={disabled}
          className="flex items-center gap-1.5 h-full px-3 bg-slate-50 hover:bg-slate-100 border-r border-[#e2e8f0] rounded-l-xl text-sm font-semibold text-slate-800 transition-colors shrink-0 cursor-pointer outline-none select-none"
          title={currentCountry ? `${currentCountry.name} (${currentCountry.code})` : "Select country code"}
        >
          {currentCountry ? (
            <>
              <span className="text-base leading-none shrink-0">{currentCountry.flag}</span>
              <span className="text-[0.9rem] font-bold text-slate-800 tracking-tight shrink-0">
                {currentCountry.code}
              </span>
            </>
          ) : (
            <span className="text-slate-400 text-xs font-semibold">Code</span>
          )}
          <FiChevronDown
            className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-blue-600" : ""
            }`}
          />
        </button>

        {/* Primary Phone Number Input with ample typing space */}
        <div className="relative flex-1 h-full flex items-center min-w-0">
          <FiPhone className="absolute left-3 text-slate-400 w-3.5 h-3.5 pointer-events-none shrink-0" />
          <input
            ref={inputRef}
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={15}
            placeholder={currentCountry ? "Phone number (min 9 digits)" : "Select code first"}
            value={phoneNumber}
            onChange={handlePhoneChange}
            onBeforeInput={handleBeforeInput}
            onPaste={handlePaste}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            className="w-full h-full pl-8 pr-3.5 bg-transparent border-none outline-none text-[0.95rem] font-medium text-slate-900 placeholder:text-slate-400 tracking-wide"
          />
        </div>

        {/* Dropdown Menu Overlay */}
        {isOpen && (
          <div
            className="absolute left-0 top-[56px] w-[320px] max-w-[95vw] bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden"
            style={{ animation: "slideUpFade 0.2s ease forwards" }}
          >
            {/* Search Header */}
            <div className="p-2.5 border-b border-slate-100 bg-slate-50">
              <div className="relative flex items-center">
                <FiSearch className="absolute left-3 text-slate-400 w-3.5 h-3.5" />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search country name or code..."
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Scrollable Country List with visible country names */}
            <div className="max-h-[220px] overflow-y-auto divide-y divide-slate-50 py-1">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((c) => {
                  const isSelected =
                    currentCountry?.id === c.id ||
                    (!currentCountry?.id && currentCountry?.code === c.code);
                  return (
                    <button
                      key={c.id || c.name}
                      type="button"
                      onClick={() => handleSelectCountry(c)}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-left text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-blue-50/80 text-blue-900 font-semibold"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate mr-2">
                        <span className="text-base shrink-0">{c.flag}</span>
                        <span className="truncate">{c.name}</span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                        {c.code}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="p-4 text-center text-xs text-slate-400">
                  No matching countries found
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {displayError && (
        <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }}>
          {displayError}
        </p>
      )}

      {/* Optional Extension Expander */}
      {showExtension && (
        <div className="flex items-center gap-2 mt-1">
          {!showExtInput && !extension ? (
            <button
              type="button"
              onClick={() => setShowExtInput(true)}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
            >
              + Add extension
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="font-medium">Ext:</span>
              <input
                type="text"
                value={extension}
                onChange={(e) => onExtensionChange(e.target.value)}
                placeholder="e.g. 101"
                disabled={disabled}
                className="h-7 px-2 w-24 border border-slate-200 rounded-md text-xs bg-slate-50 focus:bg-white focus:border-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  onExtensionChange("");
                  setShowExtInput(false);
                }}
                className="text-slate-400 hover:text-slate-600 text-xs px-1 cursor-pointer"
                title="Remove extension"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhoneInputWithCountry;