import { useEffect, useState } from "react";
import { Download, FileText, FolderOpen, Eye } from "lucide-react";
import Card from "../../components/common/Card";
import api from "../../services/api";

const ClientFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    try {
      const response = await api.get("/files");

      setFiles(response.data.files || []);
    } catch (error) {
      console.error("Fetch Files Error:", error);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const formatSize = (size) => {
    if (!size) return "—";

    const mb = size / (1024 * 1024);

    return `${mb.toFixed(1)} MB`;
  };

  const isPdf = (file) => {
    return (
      file.type === "application/pdf" ||
      file.name?.toLowerCase().endsWith(".pdf")
    );
  };

  const handleDownload = async (file) => {
    try {
      const response = await fetch(file.url);

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = file.name;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download File Error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Files
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Access files shared by your project team.
        </p>
      </div>

      <Card>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
            <FolderOpen size={21} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Project Files
            </h2>

            <p className="text-sm text-slate-500">
              {files.length} files available
            </p>
          </div>
        </div>
      </Card>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
          Loading files...
        </div>
      ) : files.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <FileText
            className="mx-auto text-slate-300"
            size={32}
          />

          <p className="mt-3 text-sm font-medium text-slate-600">
            No files available
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Project files will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {files.map((file) => (
            <Card key={file._id}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="rounded-xl bg-slate-100 p-3 text-slate-600">
                    <FileText size={21} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-medium text-slate-900">
                      {file.name}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {isPdf(file) ? "PDF" : file.type} •{" "}
                      {formatSize(file.size)} •{" "}
                      {new Date(
                        file.createdAt
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>

                    {file.project?.name && (
                      <p className="mt-1 text-xs text-slate-400">
                        {file.project.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex w-full gap-2 sm:w-auto">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:flex-none"
                  >
                    <Eye size={16} />
                    View
                  </a>

                  <button
                    type="button"
                    onClick={() => handleDownload(file)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 sm:flex-none"
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientFiles;