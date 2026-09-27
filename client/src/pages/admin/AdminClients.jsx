import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ClientTable from "../../components/admin/ClientTable";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import api from "../../services/api";
import useProjects from "../../hooks/useProjects";

const AdminClients = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingClient, setEditingClient] = useState(null);
  const [viewingClient, setViewingClient] = useState(null);

  const { projects } = useProjects();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    phone: "",
  });

  const fetchClients = async () => {
    try {
      const response = await api.get("/users/clients");
      setClients(response.data.clients || []);
    } catch (error) {
      console.error(error);
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const clientsWithProjects = clients.map((client) => ({
    ...client,
    projects: projects.filter(
      (project) => project.client?._id === client._id
    ).length,
    status: "active",
  }));

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      company: "",
      phone: "",
    });
  };

  const handleOpenCreate = () => {
    setEditingClient(null);
    resetForm();
    setIsModalOpen(true);
  };

  const handleEdit = (client) => {
    setEditingClient(client);

    setFormData({
      name: client.name || "",
      email: client.email || "",
      password: "",
      company: client.company || "",
      phone: client.phone || "",
    });

    setIsModalOpen(true);
  };

  const handleView = (client) => {
    setViewingClient(client);
    setIsViewModalOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingClient) {
        const response = await api.put(
          `/users/clients/${editingClient._id}`,
          {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            phone: formData.phone,
          }
        );

        setClients((prev) =>
          prev.map((client) =>
            client._id === editingClient._id
              ? response.data.client
              : client
          )
        );
      } else {
        const response = await api.post("/users/clients", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          company: formData.company,
          phone: formData.phone,
        });

        setClients((prev) => [
          response.data.client,
          ...prev,
        ]);
      }

      resetForm();
      setEditingClient(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this client?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/users/clients/${id}`);

      setClients((prev) =>
        prev.filter((client) => client._id !== id)
      );
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete client"
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Clients
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your agency clients.
          </p>
        </div>

        <Button onClick={handleOpenCreate}>
          <Plus size={17} />
          Add Client
        </Button>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
          Loading clients...
        </div>
      ) : (
        <ClientTable
          clients={clientsWithProjects}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingClient(null);
          resetForm();
        }}
        title={editingClient ? "Edit Client" : "Add New Client"}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Client Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter client name"
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="client@example.com"
            required
          />

          {!editingClient && (
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter client password"
              required
            />
          )}

          <Input
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter company name"
          />

          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
                setEditingClient(null);
                resetForm();
              }}
            >
              Cancel
            </Button>

            <Button type="submit">
              {editingClient
                ? "Update Client"
                : "Create Client"}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setViewingClient(null);
        }}
        title="Client Details"
      >
        {viewingClient && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-lg font-bold text-slate-700">
                {viewingClient.name
                  ?.split(" ")
                  .map((name) => name[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {viewingClient.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {viewingClient.company ||
                    "Individual Client"}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  Email
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {viewingClient.email || "Not available"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  Phone
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {viewingClient.phone || "Not available"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  Projects
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {viewingClient.projects ?? 0}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  Status
                </p>

                <div className="mt-2">
                  <span className="text-sm font-medium text-green-600">
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                variant="secondary"
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminClients;