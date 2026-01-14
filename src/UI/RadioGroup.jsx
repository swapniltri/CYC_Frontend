import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';

const RadioGroup = ({ cssClasses, children, ...props }) => {
    let cssClass = "grid gap-2 " + (cssClasses || "");

    return <RadioGroupPrimitive.Root
        className={cssClass}
        {...props}
    >
        {children}
    </RadioGroupPrimitive.Root>
}

const RadioGroupItem = ({ cssClasses, children, ...props }) => {
    let cssClass = "aspect-square h-4 w-4 rounded-full border border-[hsl(var(--primary))] text-[hsl(var(--primary))] ring-offset-[hsl(var(--background))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 " + (cssClasses || "");

    return <RadioGroupPrimitive.Item
        className={cssClass}
        {...props}
    >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <Circle className="h-2.5 w-2.5 fill-current text-current" />
        </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
}

export { RadioGroup, RadioGroupItem }