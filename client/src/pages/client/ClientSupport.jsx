import { useEffect, useState } from "react";
import { CheckCircle2, MessageSquare } from "lucide-react";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import StatusBadge from "../../components/common/SatatusBadge";
import api from "../../services/api";

const ClientSupport = () => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    priority: "medium",
  });

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

const fetchRequests = async () => {
  try {
    const response = await api.get("/support-requests");
    setRequests(response.data.requests || []);
  } catch (error) {
    console.error(error);
    setRequests([]);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchRequests();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.subject || !formData.message) {
      return;
    }

    try {
      setSubmitting(true);

      const response = await api.post("/support-requests", formData);

      setRequests((prev) => [response.data.request, ...prev]);

      setFormData({
        subject: "",
        message: "",
        priority: "medium",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Support Request
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Contact your project team for help or assistance.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card title="Create Support Request">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter request subject"
              required
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Message
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                placeholder="Describe your issue or request..."
                required
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={submitting}
            >
              <MessageSquare size={17} />
              {submitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </Card>

        <Card title="Previous Requests">
          {loading ? (
            <div className="py-10 text-center text-sm text-slate-500">
              Loading requests...
            </div>
          ) : (
            <div className="space-y-4">
              {requests.length === 0 ? (
                <div className="py-10 text-center">
                  <MessageSquare
                    className="mx-auto text-slate-300"
                    size={30}
                  />

                  <p className="mt-3 text-sm text-slate-500">
                    No support requests yet.
                  </p>
                </div>
              ) : (
                requests.map((request) => (
                  <div
                    key={request._id}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {request.subject}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {request.message}
                        </p>
                      </div>

                      <StatusBadge status={request.status || "open"} />
                    </div>

                    {request.response && (
                      <div className="mt-4 rounded-lg bg-slate-50 p-3">
                        <p className="text-xs font-semibold text-slate-600">
                          Admin Response
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {request.response}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-xs text-slate-400">
                      <CheckCircle2 size={14} />
                      {new Date(request.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ClientSupport;