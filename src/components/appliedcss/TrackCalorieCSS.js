const button = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[hsl(var(--background))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

const variantBasic = "bg-primary text-primary-[hsl(var(--background))] hover:bg-primary/90";

const variantLink = "text-primary underline-offset-4 hover:underline";

const basicSize = "h-10 px-4 py-2";

const smallSize = "h-9 rounded-md px-3"

const outline = "border border-input bg-[hsl(var(--background))] hover:bg-accent hover:text-accent-[hsl(var(--foreground))]";

export const foodSearchButton = button + " " + variantBasic + " " + basicSize + " bg-[#1a5e63] hover:bg-[#164549] text-white";

export const trackCalorieDiv1 = "flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4";

export const addFoodButton = button + " " + outline + " " + smallSize + " text-[#1a5e63] border-[#1a5e63]"



// Badge CSS:

export const basicBadge = "inline-flex items-center rounded-full border border-custom px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2";

export const destructiveBadge = "border-transparent bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] hover:bg-[hsl(var(--destructive))]/80";

export const outlineBadge = "text-[hsl(var(--foreground))]";

export const secondaryBadge = "border-transparent bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/80";

export const defaultBadge = "border-transparent bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/80";


//NutrientInsight CSS:

export const linkNutrientInsight = button + " " + variantLink + " text-[#1a5e63] p-0"; 