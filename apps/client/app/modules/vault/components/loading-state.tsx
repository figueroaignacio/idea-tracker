export function LoadingState() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-8 w-64 bg-muted-secondary rounded mb-4"></div>
        <div className="h-64 w-full max-w-3xl bg-muted-secondary dark:bg-muted-secondary rounded"></div>
      </div>
    </div>
  );
}
