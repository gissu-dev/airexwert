import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition-all duration-200 focus-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-radar hover:bg-primary/90 hover:shadow-[0_0_46px_rgba(31,214,154,0.24)]",
        secondary:
          "border border-white/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border border-white/[0.15] bg-white/[0.025] text-foreground hover:border-primary/35 hover:bg-white/10",
        ghost: "text-muted-foreground hover:bg-white/10 hover:text-foreground",
        amber:
          "bg-accent text-accent-foreground shadow-[0_0_30px_rgba(245,158,11,0.16)] hover:bg-accent/90 hover:shadow-[0_0_42px_rgba(245,158,11,0.22)]"
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3",
        lg: "h-12 px-6",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
