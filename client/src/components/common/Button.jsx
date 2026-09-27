const Button = ({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  variant = "primary",
}) => {
  const variants = {
    primary:
      "bg-slate-900 text-white hover:bg-slate-800 shadow-sm hover:shadow-md",
    secondary:
      "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
    danger:
      "bg-red-500 text-white hover:bg-red-600 shadow-sm",
    ghost:
      "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;