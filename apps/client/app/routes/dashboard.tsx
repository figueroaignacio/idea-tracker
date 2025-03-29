// Hooks
import { useAuth } from "~/hooks/use-auth";

// Components
import { PageHeader } from "~/components/page-header";
import { Button } from "~/components/ui/button";

export function meta() {
  return [
    { title: "Aegis - Dashboard" },
    { name: "description", content: "Aegis Dashboard" },
  ];
}

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    <div className="text-center py-10 text-gray-500">
      No user data available.
    </div>;
  }

  return (
    <>
      <PageHeader title="Dashboard" />

      <section className="min-h-dvh page-container space-y-6">
        <div className="bg-card p-6 rounded-md border border-border">
          <h2 className="text-3xl font-bold">Welcome {user?.name}</h2>
          <p className="text-sm text-foreground">
            You are connected with {user?.provider}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-md border border-border flex flex-col justify-between gap-y-3">
            <h3 className="text-xl font-semibold">Manage Passwords</h3>
            <p className="text-sm text-muted-foreground">
              Securely store and manage your passwords.
            </p>
            <Button variant="outline" className="w-full">
              Go to Vault
            </Button>
          </div>

          <div className="bg-card p-6 rounded-md border border-border flex flex-col justify-between gap-y-3">
            <h3 className="text-xl font-semibold">Generate Strong Passwords</h3>
            <p className="text-sm text-muted-foreground">
              Create secure passwords instantly.
            </p>
            <Button variant="outline" className="w-full">
              Generate Now
            </Button>
          </div>

          <div className="bg-card p-6 rounded-md border border-border flex flex-col justify-between gap-y-3">
            <h3 className="text-xl font-semibold">Security Tips</h3>
            <p className="text-sm text-muted-foreground">
              Read articles and learn how to keep your online information
              secure.
            </p>
            <Button variant="outline" className="w-full">
              Learn More
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-card p-6 rounded-md border border-border flex flex-col justify-between gap-y-3">
            <h3 className="text-xl font-semibold">Recent Activity</h3>
            <p className="text-sm text-muted-foreground">
              View your latest logins and security events.
            </p>
            <Button variant="outline" className="w-full">
              {" "}
              View Logs
            </Button>
          </div>

          <div className="bg-card p-6 rounded-md border border-border flex flex-col justify-between gap-y-3">
            <h3 className="text-xl font-semibold">Account Settings</h3>
            <p className="text-sm text-muted-foreground">
              Update your account details and preferences.
            </p>
            <Button variant="outline" className="w-full">
              Manage Account
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
