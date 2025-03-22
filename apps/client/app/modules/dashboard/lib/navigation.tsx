import {
  LayoutDashboard,
  Settings2,
  SquareAsterisk,
  VaultIcon,
} from "lucide-react";

export const sidebarLinks = [
  {
    label: "Dasboard",
    to: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    label: "Password Generator",
    to: "/generator",
    icon: <SquareAsterisk />,
  },
  {
    label: "Vault",
    to: "/vault",
    icon: <VaultIcon />,
  },
  {
    label: "Settings",
    to: "/settings",
    icon: <Settings2 />,
  },
];
