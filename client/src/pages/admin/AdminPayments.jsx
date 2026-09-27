import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import useProjects from "../../hooks/useProjects";
import api from "../../services/api";
import StatusBadge from "../../components/common/SatatusBadge";

const AdminPayments = () => {
  const { projects, loading: projectsLoading } = useProjects();

  const [payments, setPayments] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    client: "",
    project: "",
    amount: "",
    status: "pending",
    dueDate: "",
    invoice: "",
  });

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

  const fetchClients = async () => {
    try {
      const response = await api.get("/users/clients");
      setClients(response.data.clients || []);
    } catch (error) {
      console.error("Fetch Clients Error:", error);
      setClients([]);
    }
  };

  useEffect(() => {
    fetchPayments();
    fetchClients();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      client: "",
      project: "",
      amount: "",
      status: "pending",
      dueDate: "",
      invoice: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.title ||
      !formData.client ||
      !formData.project ||
      !formData.amount
    ) {
      return;
    }

    try {
      setSubmitting(true);

      if (editingId) {
        const response = await api.put(
          `/payments/${editingId}`,
          formData
        );

        setPayments((prev) =>
          prev.map((payment) =>
            payment._id === editingId
              ? response.data.payment
              : payment
          )
        );
      } else {
        const response = await api.post(
          "/payments",
          formData
        );

        setPayments((prev) => [
          response.data.payment,
          ...prev,
        ]);
      }

      resetForm();
    } catch (error) {
      console.error(
        "Payment Save Error:",
        error.response?.data || error.message
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (payment) => {
    setEditingId(payment._id);

    setFormData({
      title: payment.title || "",
      client: payment.client?._id || "",
      project: payment.project?._id || "",
      amount: payment.amount || "",
      status: payment.status || "pending",
      dueDate: payment.dueDate
        ? payment.dueDate.slice(0, 10)
        : "",
      invoice: payment.invoice || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/payments/${id}`);

      setPayments((prev) =>
        prev.filter((payment) => payment._id !== id)
      );
    } catch (error) {
      console.error("Delete Payment Error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Payments
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage client payment status and invoices.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card
          title={editingId ? "Edit Payment" : "Create Payment"}
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <Input
              label="Payment Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Homepage Redesign Payment"
              required
            />

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Client
              </label>

              <select
                name="client"
                value={formData.client}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-900/5"
              >
                <option value="">Select client</option>

                {clients.map((client) => (
                  <option
                    key={client._id}
                    value={client._id}
                  >
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Project
              </label>

              <select
                name="project"
                value={formData.project}
                onChange={handleChange}
                required
                disabled={projectsLoading}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-900/5 disabled:bg-slate-50"
              >
                <option value="">
                  {projectsLoading
                    ? "Loading projects..."
                    : "Select project"}
                </option>

                {projects.map((project) => (
                  <option
                    key={project._id}
                    value={project._id}
                  >
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              placeholder="15000"
              required
            />

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-400"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            <Input
              label="Due Date"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
            />

            <Input
              label="Invoice"
              name="invoice"
              value={formData.invoice}
              onChange={handleChange}
              placeholder="INV-001"
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? "Saving..."
                  : editingId
                  ? "Update Payment"
                  : "Create Payment"}
              </Button>

              {editingId && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Card>

        <Card
          title="Payment History"
          description="All client payments."
        >
          {loading ? (
            <div className="py-10 text-center text-sm text-slate-500">
              Loading payments...
            </div>
          ) : payments.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-500">
              No payments yet.
            </div>
          ) : (
            <div className="space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment._id}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {payment.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        {payment.client?.name || "Client"} ·{" "}
                        {payment.project?.name || "Project"}
                      </p>
                    </div>

                    <StatusBadge
                      status={payment.status || "pending"}
                    />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-slate-400">
                        Amount
                      </p>

                      <p className="mt-1 font-bold text-slate-900">
                        ৳{payment.amount}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Due Date
                      </p>

                      <p className="mt-1 text-sm text-slate-700">
                        {payment.dueDate
                          ? new Date(
                              payment.dueDate
                            ).toLocaleDateString()
                          : "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Invoice
                      </p>

                      <p className="mt-1 text-sm text-slate-700">
                        {payment.invoice || "—"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={() => handleEdit(payment)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(payment._id)
                      }
                      className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminPayments;