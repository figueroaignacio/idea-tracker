// Components
import { ShieldPlus } from "lucide-react";
import { Link } from "react-router";

// Utils
import { buttonVarians } from "~/components/ui/button";

export function VaultActions() {
  return (
    <div className="flex justify-between items-center px-5 my-5 relative">
      <h2>My passwords</h2>
      <Link
        to="/generator"
        className={`${buttonVarians({
          variant: "primary",
          size: "sm",
        })} space-x-3`}
      >
        <span>Create new password</span>
        <ShieldPlus />
      </Link>
    </div>
  );
}
