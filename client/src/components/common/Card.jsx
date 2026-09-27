const Card = ({
  children,
  className = "",
  title,
  description,
  action,
}) => {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:shadow-md ${className}`}
    >
      {(title || description || action) && (
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
          <div>
            {title && (
              <h3 className="text-base font-semibold text-slate-900">
                {title}
              </h3>
            )}

            {description && (
              <p className="mt-1 text-sm text-slate-500">{description}</p>
            )}
          </div>

          {action && <div>{action}</div>}
        </div>
      )}

      <div className="p-5">{children}</div>
    </div>
  );
};

export default Card;