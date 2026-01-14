import * as LabelPrimitive from '@radix-ui/react-label';

export const Label = ({ cssClasses, children, ...props }) => {
    let cssClass = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";
    cssClass += " " + (cssClasses || "");

    return <LabelPrimitive.Root className={cssClass} {...props}>
        {children}
    </LabelPrimitive.Root>
}