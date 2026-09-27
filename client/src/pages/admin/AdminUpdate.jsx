import { useEffect, useState } from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import Card from "../../components/common/Card";
import UpdateTimeline from "../../components/client/UpdateTimeline";
import UpdateForm from "../../components/admin/UpdateFrom";
import StatusBadge from "../../components/common/SatatusBadge";
import api from "../../services/api";

const AdminUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [loadingUpdates, setLoadingUpdates] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [responseData, setResponseData] = useState({});
  const [updatingId, setUpdatingId] = useState(null);

  const fetchUpdates = async () => {
    try {
      const response = await api.get("/updates");
      setUpdates(response.data.updates || []);
    } catch (error) {
      console.error("Fetch Updates Error:", error);
      setUpdates([]);
    } finally {
      setLoadingUpdates(false);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await api.get("/support-requests");

      const supportRequests = response.data.requests || [];

      setRequests(supportRequests);

      const savedResponses = {};

      supportRequests.forEach((request) => {
        savedResponses[request._id] = request.response || "";
      });

      setResponseData(savedResponses);
    } catch (error) {
      console.error("Fetch Support Requests Error:", error);
      setRequests([]);
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
    fetchRequests();
  }, []);

  const handleSubmit = async (data) => {
    try {
      const response = await api.post("/updates", data);

      setUpdates((prev) => [
        response.data.update,
        ...prev,
      ]);
    } catch (error) {
      console.error("Create Update Error:", error);
    }
  };

  const handleDeleteUpdate = async (id) => {
    try {
      setDeletingId(id);

      await api.delete(`/updates/${id}`);

      setUpdates((prev) =>
        prev.filter((update) => update._id !== id)
      );
    } catch (error) {
      console.error("Delete Update Error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleResponseChange = (id, value) => {
    setResponseData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleStatusChange = (id, status) => {
    setRequests((prev) =>
      prev.map((request) =>
        request._id === id
          ? {
              ...request,
              status,
            }
          : request
      )
    );
  };

  const handlePriorityChange = (id, priority) => {
    setRequests((prev) =>
      prev.map((request) =>
        request._id === id
          ? {
              ...request,
              priority,
            }
          : request
      )
    );
  };

  const handleUpdateRequest = async (request) => {
    try {
      setUpdatingId(request._id);

      const responseValue =
        responseData[request._id] ?? request.response ?? "";

      const response = await api.put(
        `/support-requests/${request._id}`,
        {
          status: request.status,
          priority: request.priority,
          response: responseValue,
        }
      );

      const updatedRequest = response.data.request;

      setRequests((prev) =>
        prev.map((item) =>
          item._id === request._id
            ? updatedRequest
            : item
        )
      );

      setResponseData((prev) => ({
        ...prev,
        [request._id]: updatedRequest.response || "",
      }));

      alert("Response saved successfully");
    } catch (error) {
      console.error(
        "Update Support Request Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to save response"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Project Updates
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Publish updates and manage client support requests.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <UpdateForm onSubmit={handleSubmit} />

        <Card
          title="Update History"
          description="Recently published project updates."
        >
          {loadingUpdates ? (
            <div className="py-10 text-center text-sm text-slate-500">
              Loading updates...
            </div>
          ) : updates.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-500">
              No project updates yet.
            </div>
          ) : (
            <div className="space-y-4">
              {updates.map((update) => (
                <div
                  key={update._id}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900">
                        {update.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        {update.project?.name || "Project"}
                      </p>

                      <p className="mt-3 text-sm leading-6 text-slate-500">
                        {update.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteUpdate(update._id)
                      }
                      disabled={deletingId === update._id}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-400">
                    {new Date(
                      update.createdAt
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card
        title="Support Requests"
        description="Review and respond to client requests."
      >
        {loadingRequests ? (
          <div className="py-10 text-center text-sm text-slate-500">
            Loading support requests...
          </div>
        ) : requests.length === 0 ? (
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
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request._id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-900">
                      {request.subject}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      {request.client?.name || "Client"} ·{" "}
                      {request.client?.email || ""}
                    </p>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {request.message}
                    </p>

                    {request.response && (
                      <div className="mt-4 rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold text-slate-600">
                          Admin Response
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {request.response}
                        </p>
                      </div>
                    )}
                  </div>

                  <StatusBadge
                    status={request.status || "open"}
                  />
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Status
                    </label>

                    <select
                      value={request.status}
                      onChange={(event) =>
                        handleStatusChange(
                          request._id,
                          event.target.value
                        )
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400"
                    >
                      <option value="open">Open</option>
                      <option value="in-progress">
                        In Progress
                      </option>
                      <option value="resolved">
                        Resolved
                      </option>
                      <option value="closed">
                        Closed
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Priority
                    </label>

                    <select
                      value={request.priority}
                      onChange={(event) =>
                        handlePriorityChange(
                          request._id,
                          event.target.value
                        )
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400"
                    >
                      <option value="low">Low</option>
                      <option value="medium">
                        Medium
                      </option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Response
                  </label>

                  <textarea
                    value={
                      responseData[request._id] ?? ""
                    }
                    onChange={(event) =>
                      handleResponseChange(
                        request._id,
                        event.target.value
                      )
                    }
                    rows={4}
                    placeholder="Write a response to the client..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  />
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateRequest(request)
                    }
                    disabled={
                      updatingId === request._id
                    }
                    className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
                  >
                    {updatingId === request._id
                      ? "Saving..."
                      : "Save Response"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminUpdates;