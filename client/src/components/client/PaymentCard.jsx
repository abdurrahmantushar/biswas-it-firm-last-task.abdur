import { ArrowUpRight, CreditCard, ReceiptText } from "lucide-react";
import Card from "../common/Card";
import StatusBadge from "../common/SatatusBadge";

const PaymentCard = ({ payment }) => {
  const {
    title,
    amount,
    status,
    dueDate,
    invoice,
  } = payment || {};

  return (
    <Card className="group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <CreditCard size={20} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {title || "Payment"}
            </h3>

            <p className="mt-0.5 text-xs text-slate-400">
              {invoice || "Invoice unavailable"}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <ArrowUpRight size={17} />
        </button>
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs text-slate-400">Amount</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            ৳{amount || "0"}
          </p>
        </div>

        <StatusBadge status={status || "pending"} />
      </div>

      {dueDate && (
        <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
          <ReceiptText size={15} />
          Due date: {dueDate}
        </div>
      )}
    </Card>
  );
};

export default PaymentCard;