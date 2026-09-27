const Loader = ({ size = "md", fullScreen = false }) => {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-7 w-7 border-2",
    lg: "h-10 w-10 border-[3px]",
  };

  const loader = (
    <div
      className={`${sizes[size]} animate-spin rounded-full border-slate-200 border-t-slate-900`}
    />
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        {loader}
      </div>
    );
  }

  return <div className="flex items-center justify-center p-6">{loader}</div>;
};

export default Loader;