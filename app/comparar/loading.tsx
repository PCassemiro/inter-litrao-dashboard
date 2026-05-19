export default function CompararLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="h-5 w-36 rounded bg-muted-light/30 animate-pulse mb-6" />

        <div className="flex items-center gap-3 mb-6">
          <div className="h-6 w-6 rounded bg-muted-light/30 animate-pulse" />
          <div className="h-7 w-48 rounded bg-muted-light/30 animate-pulse" />
        </div>

        {/* Seletores skeleton */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm animate-pulse"
            >
              <div className="h-4 w-20 rounded bg-muted-light/20 mb-3" />
              <div className="h-10 w-full rounded-lg bg-muted-light/20" />
            </div>
          ))}
        </div>

        {/* Placeholder */}
        <div className="mt-12 text-center animate-pulse">
          <div className="mx-auto h-12 w-12 rounded-full bg-muted-light/20" />
          <div className="mt-4 mx-auto h-4 w-64 rounded bg-muted-light/20" />
        </div>
      </div>
    </div>
  );
}
