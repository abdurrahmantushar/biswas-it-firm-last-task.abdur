import { Mail, MoreHorizontal, Phone, Trash2, Eye, Pencil } from "lucide-react";
import { useState } from "react";
import StatusBadge from "../common/SatatusBadge";

const ClientTable = ({
  clients = [],
  onView,
  onEdit,
  onDelete,
}) => {
  const [openMenu, setOpenMenu] = useState(null);

  if (!clients.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <p className="text-sm font-semibold text-slate-700">
          No clients found
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Client records will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70">
              <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                Client
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                Contact
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                Projects
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500">
                Status
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {clients.map((client) => (
              <tr
                key={client._id}
                className="transition hover:bg-slate-50/70"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-700">
                      {client.name
                        ?.split(" ")
                        .map((name) => name[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {client.name}
                      </p>

                      <p className="text-xs text-slate-400">
                        {client.company || "Individual Client"}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="space-y-1">
                    {client.email && (
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Mail size={13} />
                        {client.email}
                      </div>
                    )}

                    {client.phone && (
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Phone size={13} />
                        {client.phone}
                      </div>
                    )}
                  </div>
                </td>

                <td className="px-5 py-4 text-sm font-medium text-slate-700">
                  {client.projects ?? 0}
                </td>

                <td className="px-5 py-4">
                  <StatusBadge status={client.status || "active"} />
                </td>

                <td className="px-5 py-4 text-right">
                  <div className="relative flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenu(
                          openMenu === client._id
                            ? null
                            : client._id
                        )
                      }
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {openMenu === client._id && (
                      <div className="absolute right-10 top-1/2 z-30 w-36 -translate-y-1/2 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                        <button
                          type="button"
                          onClick={() => {
                            setOpenMenu(null);
                            onView?.(client);
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50"
                        >
                          <Eye size={15} />
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setOpenMenu(null);
                            onEdit?.(client);
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50"
                        >
                          <Pencil size={15} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setOpenMenu(null);
                            onDelete?.(client._id);
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-500 transition hover:bg-red-50"
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => onDelete?.(client._id)}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientTable;