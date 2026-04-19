interface Props {
  steps: string[];
}

export default function SystemFlow({ steps }: Props) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center gap-0 min-w-max mx-auto w-fit">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="px-4 py-2.5 bg-white border border-[#E5E4DE] rounded-lg text-xs font-semibold text-[#0C0F14] whitespace-nowrap">
                {step}
              </div>
              <div className="w-px h-2 bg-transparent" />
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-center mx-1">
                <div className="w-6 h-px bg-[#C9A84C]" />
                <svg width="6" height="8" viewBox="0 0 6 8" fill="none" className="flex-shrink-0">
                  <path d="M0 0L6 4L0 8" fill="#C9A84C" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
