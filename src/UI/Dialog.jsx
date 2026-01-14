import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = ({ cssClasses, children, ...props }) => {
    let cssClass = "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    cssClass += " " + (cssClasses || "");

    return <DialogPrimitive.Overlay
        className={cssClass}
        {...props}
    />
}

const DialogContent = ({ cssClasses, children, ...props }) => {
    let cssClass = "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-[hsl(var(--background))] p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg";
    cssClass += " " + (cssClasses || "");
    return <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            className={cssClass}
            {...props}
        >
            {children}
            <DialogPrimitive.Close
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-[hsl(var(--background))] transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-[hsl(var(--accent))] data-[state=open]:text-[hsl(var(--muted-foreground))]"
            >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPortal>
}

const DialogHeader = ({ cssClasses, children, ...props }) => {
    let cssClass = "flex flex-col space-y-1.5 text-center sm:text-left";
    cssClass += " " + (cssClasses || "");

    return <div className={cssClass} {...props}>{children}</div>
}

const DialogFooter = ({ cssClasses, children, ...props }) => {
    let cssClass = "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2";
    cssClass += " " + (cssClasses || "");

    return <div className={cssClass} {...props}>{children}</div>
}

const DialogTitle = ({ cssClasses, children, ...props }) => {
    let cssClass = "text-lg font-semibold leading-none tracking-tight";
    cssClass += " " + (cssClasses || "");

    return <DialogPrimitive.Title className={cssClass} {...props}>{children}</DialogPrimitive.Title>
}

const DialogDescription = ({ cssClasses, children, ...props }) => {
    let cssClass = "text-sm text-muted-foreground";
    cssClass += " " + (cssClasses || "");

    return <DialogPrimitive.Description className={cssClass} {...props}>{children}</DialogPrimitive.Description>
}

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
}

