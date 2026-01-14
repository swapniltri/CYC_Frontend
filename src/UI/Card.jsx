export default function Card({ cssClasses, children, ...props }) {
    let cssClass = "rounded-lg border border-custom bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] shadow-sm " + (cssClasses || "");

    return <div className={cssClass} {...props}>{children}</div>
}

export function CardHeader({ cssClasses, children, ...props }) {
    let cssClass = "flex flex-col space-y-1.5 p-6 " + (cssClasses || "");

    return <div className={cssClass} {...props}>{children}</div>
}

export function CardTitle({ cssClasses, children, ...props }) {
    let cssClass = "text-2xl font-semibold leading-none tracking-tight " + (cssClasses || "");

    return <div className={cssClass} {...props}>{children}</div>
}

export function CardDescription({ cssClasses, children, ...props }) {
    let cssClass = "text-sm text-[hsl(var(--muted-foreground))] " + (cssClasses || "");

    return <div className={cssClass} {...props}>{children}</div>
}

export function CardContent({ cssClasses, children, ...props }) {
    let cssClass = "p-6 " + (cssClasses || "");

    return <div className={cssClass} {...props}>{children}</div>
}

export function CardFooter({ cssClasses, children, ...props }) {
    let cssClass = "flex items-center p-6 pt-0 " + (cssClasses || "");

    return <div className={cssClass} {...props}>{children}</div>
}
