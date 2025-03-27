export function EmptyState() {
  return (
    <div className="bg-card dark:bg-card border-border border rounded-lg p-8 text-center">
      <p className="text-muted-foreground dark:text-muted-foreground">
        There are no saved passwords.
      </p>
    </div>
  );
}
