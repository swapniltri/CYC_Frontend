import { Slot } from '@radix-ui/react-slot';

export default function Button({ cssClasses, children, variant, size, asChild = false, ...props }) {
    let cssClass = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[hsl(var(--background))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer";

    if (variant === "link") {
        cssClass += " text-[hsl(var(--primary))] underline-offset-4 hover:underline";
    } else if (variant === "destructive") {
        cssClass += " bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] hover:bg-[hsl(var(--destructive))]/90";
    } else if (variant === "outline") {
        cssClass += " border border-[hsl(var(--input))] bg-[hsl(var(--background))] hover:bg-[#f5f5f5] hover:text-[hsl(var(--accent-foreground))]";
    } else if (variant === "secondary") {
        cssClass += " bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/80";
    } else if (variant === "ghost") {
        cssClass += " hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]";
    } else { //FOR DEFAULT
        cssClass += " bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90";
    }

    if (size === "sm") {
        cssClass += " h-9 rounded-md px-3";
    } else if (size === "lg") {
        cssClass += " h-11 rounded-md px-8"
    } else if (size === "icon") {
        cssClass += " h-10 w-10";
    } else { //FOR DEFAULT
        cssClass += " h-10 px-4 py-2";
    }

    cssClass += " " + (cssClasses || "");

    const Comp = asChild ? Slot : "button";
    return <Comp className={cssClass} {...props}>{children}</Comp>
}