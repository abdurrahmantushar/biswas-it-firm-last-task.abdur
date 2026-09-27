import { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";
import Card from "../../components/common/Card";
import StatusBadge from "../../components/common/SatatusBadge";
import api from "../../services/api";

const ClientPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const response = await api.get("/payments");

      setPayments(response.data.payments || []);
    } catch (error) {
      console.error("Fetch Payments Error:", error);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Payments
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Track your project payment status and invoices.
        </p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
          Loading payments...
        </div>
      ) : payments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <CreditCard
            className="mx-auto text-slate-300"
            size={32}
          />

          <p className="mt-3 text-sm font-medium text-slate-600">
            No payments found
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Your project payments will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {payments.map((payment) => (
            <Card key={payment._id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <CreditCard size={20} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {payment.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      {payment.project?.name || "Project"}
                    </p>
                  </div>
                </div>

                <StatusBadge
                  status={payment.status || "pending"}
                />
              </div>

              <div className="mt-6">
                <p className="text-xs text-slate-400">
                  Amount
                </p>

                <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                  ৳{payment.amount}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs text-slate-400">
                    Due Date
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {payment.dueDate
                      ? new Date(
                          payment.dueDate
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Invoice
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {payment.invoice || "—"}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientPayments;