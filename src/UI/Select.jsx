import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react"

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = ({ cssClasses, children, ...props }) => {
    let cssClass = "flex h-10 items-center justify-between rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-2 text-sm ring-offset-[hsl(var(--background))] data-[placeholder]:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"

    cssClass += " " + (cssClasses || "");

    return <SelectPrimitive.Trigger className={cssClass} {...props}>
        {children}
        <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
}

const SelectScrollUpButton = ({ cssClasses, ...props }) => {
    let cssClass = "flex cursor-default items-center justify-center py-1";

    cssClass += " " + (cssClasses || "");

    return <SelectPrimitive.ScrollUpButton className={cssClass} {...props}>
        <ChevronUp className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
}

const SelectScrollDownButton = ({ cssClasses, ...props }) => {
    let cssClass = "flex cursor-default items-center justify-center py-1";

    cssClass += " " + (cssClasses || "");

    return <SelectPrimitive.ScrollDownButton className={cssClass} {...props}>
        <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
}

const SelectContent = ({ cssClasses, children, position = "popper", ...props }) => {
    let cssClass = "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border border-custom bg-[hsl(var(--popover))] text-[hsl(var(--popover-foreground))] shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]"

    cssClass += " " + (cssClasses || "") + (position === "popper" && " data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1");

    let cssClassViewPort = "p-1" + (position === "popper" && " h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]");

    return <SelectPrimitive.Portal>
        <SelectPrimitive.Content className={cssClass} position={position} {...props}>
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport className={cssClassViewPort}>
                {children}
            </SelectPrimitive.Viewport>
            <SelectScrollDownButton />
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
}

const SelectItem = ({ cssClasses, children, ...props }) => {
    let cssClass = "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-[hsl(var(--accent))] focus:text-[hsl(var(--accent-foreground))] data-[disabled]:pointer-events-none data-[disabled]:opacity-50"

    cssClass += " " + (cssClasses || "");

    return <SelectPrimitive.Item className={cssClass} {...props}>
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <SelectPrimitive.ItemIndicator>
                <Check className="h-4 w-4" />
            </SelectPrimitive.ItemIndicator>
        </span>

        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
}

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectScrollUpButton,
    SelectScrollDownButton,
    SelectContent,
    SelectItem
}