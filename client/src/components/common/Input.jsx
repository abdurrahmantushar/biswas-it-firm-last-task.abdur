const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  error = "",
  required = false,
  disabled = false,
  className = "",
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
            : "border-slate-200 focus:border-slate-400 focus:ring-4 focus:ring-slate-900/5"
        } ${className}`}
      />

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
