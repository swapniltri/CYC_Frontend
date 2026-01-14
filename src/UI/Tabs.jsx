import * as TabsPrimitive from "@radix-ui/react-tabs";

const Tabs = TabsPrimitive.Root;

const TabsList = ({ cssClasses, children, ...props }) => {
    let cssClass = "inline-flex h-10 items-center justify-center rounded-md bg-[hsl(var(--muted))] p-1 text-[hsl(var(--muted-foreground))]";
    cssClass += " " + (cssClasses || "");

    return <TabsPrimitive.List
        className={cssClass}
        {...props}
    >{children}</TabsPrimitive.List>
}

const TabsTrigger = ({ cssClasses, children, ...props }) => {
    let cssClass = "inline-flex items-center justify-center cursor-pointer whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-[hsl(var(--background))] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[hsl(var(--background))] data-[state=active]:text-[hsl(var(--foreground))] data-[state=active]:shadow-sm";
    cssClass += " " + (cssClasses || "");

    return <TabsPrimitive.Trigger
        className={cssClass}
        {...props}
    >{children}</TabsPrimitive.Trigger>
}

const TabsContent = ({ cssClasses, children, ...props }) => {
    let cssClass = "mt-2 ring-offset-[hsl(var(--background))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2";
    cssClass += " " + (cssClasses || "");

    return <TabsPrimitive.Content
        className={cssClass}
        {...props}
    >{children}</TabsPrimitive.Content>
}

export {
    Tabs,
    TabsList,
    TabsContent,
    TabsTrigger
};

