export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="relative size-16">
        <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
