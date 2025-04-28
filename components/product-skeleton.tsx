export function ProductSkeleton() {
  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="aspect-square rounded-lg bg-gray-200 animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 w-2/3 rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-1/3 rounded bg-gray-200 animate-pulse" />
      </div>
      <div className="h-10 rounded bg-gray-200 animate-pulse" />
    </div>
  )
}
