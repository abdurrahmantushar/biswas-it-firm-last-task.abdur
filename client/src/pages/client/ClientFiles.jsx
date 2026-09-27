import { Download, FileText, FolderOpen } from "lucide-react";
import Card from "../../components/common/Card";

const ClientFiles = () => {
  const files = [
    {
      id: 1,
      name: "Project Proposal.pdf",
      type: "PDF",
      size: "2.4 MB",
      date: "Sep 20, 2026",
    },
    {
      id: 2,
      name: "UI Design.fig",
      type: "Design",
      size: "8.7 MB",
      date: "Sep 22, 2026",
    },
    {
      id: 3,
      name: "Project Requirements.docx",
      type: "Document",
      size: "1.2 MB",
      date: "Sep 18, 2026",
    },
    {
      id: 4,
      name: "Final Assets.zip",
      type: "Archive",
      size: "14.5 MB",
      date: "Sep 25, 2026",
    },
  ];

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
            <h2 className="font-semibold text-slate-900">Project Files</h2>
            <p className="text-sm text-slate-500">
              {files.length} files available
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4">
        {files.map((file) => (
          <Card key={file.id}>
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
                    {file.type} • {file.size} • {file.date}
                  </p>
                </div>
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:w-auto">
                <Download size={16} />
                Download
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientFiles;