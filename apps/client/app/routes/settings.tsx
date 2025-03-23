import { useNavigate } from "react-router";
import { useAuth } from "~/modules/auth/context/auth-context";

export default function Settings() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  return <div>Settings</div>;
}
