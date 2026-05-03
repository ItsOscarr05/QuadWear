export default function RouteFallback() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="card-sticker animate-pulse space-y-4 border-4 border-black">
        <div className="h-9 w-48 rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
        <div className="mt-6 aspect-square max-w-lg rounded-lg bg-gray-100" />
      </div>
    </div>
  );
}
