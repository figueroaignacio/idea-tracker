export function UnauthorizedState() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <div className="bg-secondary dark:bg-secondary border-border border rounded-lg p-4">
        <p className="text-foreground dark:text-foreground">
          Unauthorized. Sign in to see your passwords.{" "}
        </p>
      </div>
    </div>
  );
}
