import { LayoutDashboard, Settings2, VaultIcon } from "lucide-react";

export const sidebarLinks = [
  {
    label: "Dasboard",
    to: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    label: "Vaults",
    to: "/vault",
    icon: <VaultIcon />,
  },
  {
    label: "Settings",
    to: "/settings",
    icon: <Settings2 />,
  },
];
