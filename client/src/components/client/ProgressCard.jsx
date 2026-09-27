import { TrendingUp } from "lucide-react";
import Card from "../common/Card";

const ProgressCard = ({ progress = 0, title = "Overall Progress" }) => {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <div className="mt-2 flex items-end gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              {progress}%
            </span>

            <span className="mb-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <TrendingUp size={13} />
              On track
            </span>
          </div>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <TrendingUp size={20} />
        </div>
      </div>

      <div className="mt-6">
        <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-slate-900 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-2 flex justify-between text-[11px] text-slate-400">
          <span>Started</span>
          <span>Project completion</span>
        </div>
      </div>
    </Card>
  );
};

export default ProgressCard;