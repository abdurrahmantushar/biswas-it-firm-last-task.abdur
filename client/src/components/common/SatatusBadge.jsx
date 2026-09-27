const StatusBadge = ({ status }) => {
  const styles = {
    active: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
    completed: "bg-blue-50 text-blue-700 ring-blue-600/10",
    pending: "bg-amber-50 text-amber-700 ring-amber-600/10",
    "in-progress": "bg-violet-50 text-violet-700 ring-violet-600/10",
    cancelled: "bg-red-50 text-red-700 ring-red-600/10",
    paid: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
    unpaid: "bg-red-50 text-red-700 ring-red-600/10",
    overdue: "bg-red-50 text-red-700 ring-red-600/10",
  };

  const formatStatus = (value = "") => {
    return value
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${
        styles[status?.toLowerCase()] ||
        "bg-slate-100 text-slate-600 ring-slate-500/10"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {formatStatus(status)}
    </span>
  );
};

export default StatusBadge;