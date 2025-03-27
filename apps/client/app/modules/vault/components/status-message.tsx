interface StatusMessageProps {
  error: string | null;
  successMessage: string | null;
}

export function StatusMessage({ error, successMessage }: StatusMessageProps) {
  if (!error && !successMessage) return null;

  return (
    <>
      {error && (
        <div className="mb-6 bg-destructive/10 dark:bg-destructive/20 border-destructive/20 border rounded-lg p-4">
          <p className="text-destructive dark:text-destructive">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 border border-green-400 dark:border-green-500 rounded-lg p-4">
          <p>{successMessage}</p>
        </div>
      )}
    </>
  );
}
