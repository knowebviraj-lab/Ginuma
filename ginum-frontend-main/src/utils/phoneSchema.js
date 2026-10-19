import { z } from "zod";

/**
 * Static list of country calling codes used for the phone-number
 * country-code dropdown.  The backend `CountryResponseDto` does not ship
 * phone codes, so we keep a curated list here.
 */
export const COUNTRY_CODES = [
  { id: "LK", name: "Sri Lanka", flag: "🇱🇰", code: "+94", label: "🇱🇰 Sri Lanka (+94)" },
  { id: "US", name: "United States", flag: "🇺🇸", code: "+1", label: "🇺🇸 United States (+1)" },
  { id: "GB", name: "United Kingdom", flag: "🇬🇧", code: "+44", label: "🇬🇧 United Kingdom (+44)" },
  { id: "CA", name: "Canada", flag: "🇨🇦", code: "+1", label: "🇨🇦 Canada (+1)" },
  { id: "IN", name: "India", flag: "🇮🇳", code: "+91", label: "🇮🇳 India (+91)" },
  { id: "AU", name: "Australia", flag: "🇦🇺", code: "+61", label: "🇦🇺 Australia (+61)" },
  { id: "AE", name: "United Arab Emirates", flag: "🇦🇪", code: "+971", label: "🇦🇪 United Arab Emirates (+971)" },
  { id: "SA", name: "Saudi Arabia", flag: "🇸🇦", code: "+966", label: "🇸🇦 Saudi Arabia (+966)" },
  { id: "SG", name: "Singapore", flag: "🇸🇬", code: "+65", label: "🇸🇬 Singapore (+65)" },
  { id: "MY", name: "Malaysia", flag: "🇲🇾", code: "+60", label: "🇲🇾 Malaysia (+60)" },
  { id: "DE", name: "Germany", flag: "🇩🇪", code: "+49", label: "🇩🇪 Germany (+49)" },
  { id: "FR", name: "France", flag: "🇫🇷", code: "+33", label: "🇫🇷 France (+33)" },
  { id: "IT", name: "Italy", flag: "🇮🇹", code: "+39", label: "🇮🇹 Italy (+39)" },
  { id: "ES", name: "Spain", flag: "🇪🇸", code: "+34", label: "🇪🇸 Spain (+34)" },
  { id: "JP", name: "Japan", flag: "🇯🇵", code: "+81", label: "🇯🇵 Japan (+81)" },
  { id: "CN", name: "China", flag: "🇨🇳", code: "+86", label: "🇨🇳 China (+86)" },
  { id: "KR", name: "South Korea", flag: "🇰🇷", code: "+82", label: "🇰🇷 South Korea (+82)" },
  { id: "ID", name: "Indonesia", flag: "🇮🇩", code: "+62", label: "🇮🇩 Indonesia (+62)" },
  { id: "TH", name: "Thailand", flag: "🇹🇭", code: "+66", label: "🇹🇭 Thailand (+66)" },
  { id: "VN", name: "Vietnam", flag: "🇻🇳", code: "+84", label: "🇻🇳 Vietnam (+84)" },
  { id: "PH", name: "Philippines", flag: "🇵🇭", code: "+63", label: "🇵🇭 Philippines (+63)" },
  { id: "PK", name: "Pakistan", flag: "🇵🇰", code: "+92", label: "🇵🇰 Pakistan (+92)" },
  { id: "BD", name: "Bangladesh", flag: "🇧🇩", code: "+880", label: "🇧🇩 Bangladesh (+880)" },
  { id: "NP", name: "Nepal", flag: "🇳🇵", code: "+977", label: "🇳🇵 Nepal (+977)" },
  { id: "NZ", name: "New Zealand", flag: "🇳🇿", code: "+64", label: "🇳🇿 New Zealand (+64)" },
  { id: "ZA", name: "South Africa", flag: "🇿🇦", code: "+27", label: "🇿🇦 South Africa (+27)" },
  { id: "MX", name: "Mexico", flag: "🇲🇽", code: "+52", label: "🇲🇽 Mexico (+52)" },
  { id: "BR", name: "Brazil", flag: "🇧🇷", code: "+55", label: "🇧🇷 Brazil (+55)" },
  { id: "NL", name: "Netherlands", flag: "🇳🇱", code: "+31", label: "🇳🇱 Netherlands (+31)" },
  { id: "CH", name: "Switzerland", flag: "🇨🇭", code: "+41", label: "🇨🇭 Switzerland (+41)" },
  { id: "SE", name: "Sweden", flag: "🇸🇪", code: "+46", label: "🇸🇪 Sweden (+46)" },
  { id: "NO", name: "Norway", flag: "🇳🇴", code: "+47", label: "🇳🇴 Norway (+47)" },
  { id: "DK", name: "Denmark", flag: "🇩🇰", code: "+45", label: "🇩🇰 Denmark (+45)" },
  { id: "IE", name: "Ireland", flag: "🇮🇪", code: "+353", label: "🇮🇪 Ireland (+353)" },
  { id: "AT", name: "Austria", flag: "🇦🇹", code: "+43", label: "🇦🇹 Austria (+43)" },
  { id: "BE", name: "Belgium", flag: "🇧🇪", code: "+32", label: "🇧🇪 Belgium (+32)" },
  { id: "QA", name: "Qatar", flag: "🇶🇦", code: "+974", label: "🇶🇦 Qatar (+974)" },
  { id: "KW", name: "Kuwait", flag: "🇰🇼", code: "+965", label: "🇰🇼 Kuwait (+965)" },
  { id: "OM", name: "Oman", flag: "🇴🇲", code: "+968", label: "🇴🇲 Oman (+968)" },
  { id: "EG", name: "Egypt", flag: "🇪🇬", code: "+20", label: "🇪🇬 Egypt (+20)" },
  { id: "NG", name: "Nigeria", flag: "🇳🇬", code: "+234", label: "🇳🇬 Nigeria (+234)" },
  { id: "KE", name: "Kenya", flag: "🇰🇪", code: "+254", label: "🇰🇪 Kenya (+254)" },
  { id: "GH", name: "Ghana", flag: "🇬🇭", code: "+233", label: "🇬🇭 Ghana (+233)" },
  { id: "CL", name: "Chile", flag: "🇨🇱", code: "+56", label: "🇨🇱 Chile (+56)" },
  { id: "AR", name: "Argentina", flag: "🇦🇷", code: "+54", label: "🇦🇷 Argentina (+54)" },
  { id: "CO", name: "Colombia", flag: "🇨🇴", code: "+57", label: "🇨🇴 Colombia (+57)" },
  { id: "PE", name: "Peru", flag: "🇵🇪", code: "+51", label: "🇵🇪 Peru (+51)" },
  { id: "JM", name: "Jamaica", flag: "🇯🇲", code: "+1", label: "🇯🇲 Jamaica (+1)" },
];

/**
 * Strip duplicate codes while preserving order of first occurrence.
 */
const uniqueCountryCodes = (() => {
  const seen = new Set();
  return COUNTRY_CODES.filter((c) => {
    if (seen.has(c.code)) return false;
    seen.add(c.code);
    return true;
  });
})();

export { uniqueCountryCodes as COUNTRY_CODES_UNIQUE };

// ---------------------------------------------------------------------------
// Zod schema
// ---------------------------------------------------------------------------

/**
 * Zod schema for phone-number validation.
 *
 * Requirements fulfilled:
 *  - countryCode: required, chosen from the dropdown.
 *  - phoneNumber: required, **digits only**, minimum 9 digits.
 *    Non-digit insertions are rejected by the `.regex(/^\d+$/)`.
 *  - extension: optional – accepts **any** digits or characters.
 *
 * The raw value stored in state is always digits-only because the
 * PhoneInputWithCountry component strips non-digits before onChange.
 */
export const phoneSchema = z.object({
  countryCode: z
    .string()
    .min(1, "Please select a country code"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d+$/, "Only digits are allowed in the phone number")
    .min(9, "Phone number must be at least 9 digits"),
  extension: z
    .string()
    .optional(),
});

/**
 * Helper — combine the validated parts into a single string that can be
 * sent to the backend, e.g.  "+94 771234567"  or  "+94 771234567 ext. 123".
 */
export const formatPhoneForBackend = ({ countryCode, phoneNumber, extension }) => {
  const base = `${countryCode} ${phoneNumber}`;
  return extension ? `${base} ext. ${extension}` : base;
};

export default phoneSchema;