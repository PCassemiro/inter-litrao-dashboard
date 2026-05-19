export function StatsCardSkeleton() {
  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm animate-pulse">
      <div className="flex items-start justify-between">
        <div>
          <div className="h-4 w-24 rounded bg-muted-light/30" />
          <div className="mt-2 flex items-baseline gap-2">
            <div className="h-8 w-16 rounded bg-muted-light/30" />
            <div className="h-4 w-12 rounded bg-muted-light/20" />
          </div>
          <div className="mt-1 h-3 w-20 rounded bg-muted-light/20" />
        </div>
        <div className="h-9 w-9 rounded-lg bg-muted-light/20" />
      </div>
      <div className="mt-4 flex items-end gap-1 h-8">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-muted-light/20"
            style={{ height: `${20 + Math.random() * 60}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function TopRankingCardSkeleton() {
  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm animate-pulse">
      <div className="h-5 w-32 rounded bg-muted-light/30" />
      <div className="mt-4 space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-full bg-muted-light/20" />
            <div className="flex-1">
              <div className="h-4 w-24 rounded bg-muted-light/30" />
              <div className="mt-1 h-3 w-16 rounded bg-muted-light/20" />
            </div>
            <div className="h-4 w-12 rounded bg-muted-light/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TeamOverviewCardSkeleton() {
  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm animate-pulse">
      <div className="h-5 w-24 rounded bg-muted-light/30" />
      <div className="mt-5 space-y-5">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-muted-light/20" />
            <div>
              <div className="h-6 w-12 rounded bg-muted-light/30" />
              <div className="mt-1 h-3 w-24 rounded bg-muted-light/20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PlayerStatsTableSkeleton() {
  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-3 shadow-sm sm:p-5 animate-pulse">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="h-5 w-48 rounded bg-muted-light/30" />
          <div className="mt-1 h-3 w-32 rounded bg-muted-light/20" />
        </div>
        <div className="h-9 w-56 rounded-lg bg-muted-light/20" />
      </div>
      <div className="mt-4 space-y-3">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-3">
            <div className="h-4 w-6 rounded bg-muted-light/20 hidden sm:block" />
            <div className="h-8 w-8 rounded-full bg-muted-light/20" />
            <div className="flex-1">
              <div className="h-4 w-24 rounded bg-muted-light/30" />
              <div className="mt-1 h-3 w-16 rounded bg-muted-light/20" />
            </div>
            <div className="h-4 w-8 rounded bg-muted-light/20" />
            <div className="h-4 w-8 rounded bg-muted-light/20" />
            <div className="h-4 w-8 rounded bg-muted-light/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-xl border border-card-border bg-card-bg p-5 shadow-sm animate-pulse ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="h-5 w-32 rounded bg-muted-light/30" />
          <div className="mt-1 h-3 w-48 rounded bg-muted-light/20" />
        </div>
        <div className="h-8 w-16 rounded-lg bg-muted-light/20" />
      </div>
      <div className="mt-4 h-52 rounded-lg bg-muted-light/10 flex items-end justify-around gap-2 px-4 pb-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-muted-light/20"
            style={{ height: `${30 + Math.random() * 50}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function PerformanceChartSkeleton() {
  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm animate-pulse">
      <div>
        <div className="h-5 w-36 rounded bg-muted-light/30" />
        <div className="mt-1 h-3 w-48 rounded bg-muted-light/20" />
      </div>
      <div className="relative mx-auto mt-4 h-44 w-44">
        <div className="h-full w-full rounded-full border-[20px] border-muted-light/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-12 rounded bg-muted-light/30" />
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-muted-light/20" />
            <div className="flex-1">
              <div className="h-3 w-16 rounded bg-muted-light/20" />
              <div className="mt-1 h-4 w-24 rounded bg-muted-light/30" />
            </div>
            <div className="h-4 w-16 rounded bg-muted-light/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <StatsCardSkeleton key={i} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <TopRankingCardSkeleton />
        <TopRankingCardSkeleton />
        <TeamOverviewCardSkeleton />
      </div>

      <div className="mt-6">
        <PlayerStatsTableSkeleton />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <PerformanceChartSkeleton />
        </div>
        <div className="lg:col-span-3">
          <ChartSkeleton />
        </div>
      </div>
    </>
  );
}
