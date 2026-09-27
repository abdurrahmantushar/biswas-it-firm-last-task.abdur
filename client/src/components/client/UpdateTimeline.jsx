import { CheckCircle2, Clock3 } from "lucide-react";

const UpdateTimeline = ({ updates = [] }) => {
  return (
    <div className="space-y-6">
      {updates.length === 0 ? (
        <div className="py-8 text-center">
          <Clock3 className="mx-auto text-slate-300" size={28} />
          <p className="mt-3 text-sm text-slate-500">
            No project updates yet.
          </p>
        </div>
      ) : (
        updates.map((update, index) => (
          <div key={update.id || index} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                <CheckCircle2 size={17} />
              </div>

              {index !== updates.length - 1 && (
                <div className="mt-2 h-full w-px bg-slate-200" />
              )}
            </div>

            <div className="min-w-0 flex-1 pb-2">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-sm font-semibold text-slate-900">
                  {update.title || "Project Update"}
                </h3>

                {update.date && (
                  <span className="text-xs text-slate-400">
                    {update.date}
                  </span>
                )}
              </div>

              {update.description && (
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {update.description}
                </p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UpdateTimeline;