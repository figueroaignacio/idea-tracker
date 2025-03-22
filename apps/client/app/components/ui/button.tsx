import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const buttonVarians = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-foreground hover:bg-secondary hover:text-black/90",
        secondary: "bg-secondary text-white hover:backdrop-brightness-200",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-border text-white hover:bg-primary",
        ghost: "hover:bg-primary hover:text-foreground",
      },
      size: {
        sm: "px-3 py-1 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVarians>;

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVarians({ className, size, variant }))}
      {...props}
    ></button>
  );
}

export { Button, buttonVarians };
