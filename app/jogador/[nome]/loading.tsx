export default function JogadorLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="h-5 w-36 rounded bg-muted-light/30 animate-pulse mb-6" />

        {/* Header skeleton */}
        <div className="rounded-xl border border-card-border bg-card-bg p-6 shadow-sm animate-pulse">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-muted-light/30" />
            <div className="flex-1">
              <div className="h-7 w-48 rounded bg-muted-light/30" />
              <div className="mt-2 h-4 w-32 rounded bg-muted-light/20" />
            </div>
          </div>
        </div>

        {/* Stats Grid skeleton */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-card-border bg-card-bg p-4 shadow-sm animate-pulse"
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-muted-light/20" />
                <div className="h-3 w-16 rounded bg-muted-light/20" />
              </div>
              <div className="mt-2">
                <div className="h-8 w-12 rounded bg-muted-light/30" />
              </div>
              <div className="mt-1 h-3 w-20 rounded bg-muted-light/20" />
            </div>
          ))}
        </div>

        {/* Radar Chart skeleton */}
        <div className="mt-6 rounded-xl border border-card-border bg-card-bg p-5 shadow-sm animate-pulse">
          <div className="h-5 w-36 rounded bg-muted-light/30" />
          <div className="mt-1 h-3 w-48 rounded bg-muted-light/20" />
          <div className="mt-4 h-64 rounded-lg bg-muted-light/10 flex items-center justify-center">
            <div className="h-40 w-40 rounded-full border-8 border-muted-light/20" />
          </div>
        </div>

        {/* Medias skeleton */}
        <div className="mt-6 rounded-xl border border-card-border bg-card-bg p-5 shadow-sm animate-pulse">
          <div className="h-5 w-32 rounded bg-muted-light/30" />
          <div className="mt-1 h-3 w-48 rounded bg-muted-light/20" />
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-lg bg-background p-4">
                <div className="h-8 w-12 rounded bg-muted-light/30" />
                <div className="mt-1 h-3 w-16 rounded bg-muted-light/20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
