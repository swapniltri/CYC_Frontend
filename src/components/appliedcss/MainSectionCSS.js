const button = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[hsl(var(--background))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer";

const basic = "bg-primary text-primary-[hsl(var(--foreground))] hover:bg-primary/90";

const destructive = "bg-destructive text-destructive-[hsl(var(--foreground))] hover:bg-destructive/90";

const outline = "border border-input bg-[hsl(var(--background))] hover:bg-accent hover:text-accent-[hsl(var(--foreground))]";

const secondary = "bg-secondary text-secondary-[hsl(var(--foreground))] hover:bg-secondary/80";

const ghost = "hover:bg-accent hover:text-accent-[hsl(var(--foreground))]";

const link = "text-primary underline-offset-4 hover:underline";

const sizeBasic = "h-10 px-4 py-2";

const sizesm = "h-9 rounded-md px-3";

const sizelg = "h-11 rounded-md px-8";

const sizeicon = "h-10 w-10";

export const viewMenuButton = button + " h-11 rounded-md px-8 bg-primary text-primary-[hsl(var(--foreground))] hover:bg-primary/90 bg-[#1a5e63] hover:bg-[#164549] text-white"

export const trackYourCalorieButton = button + " h-11 rounded-md px-8 border border-input bg-[var(--button-white-bg)] hover:bg-accent hover:text-accent-[hsl(var(--foreground))] group border-[#1a5e63] text-[#1a5e63] hover:bg-[#1a5e63] hover:text-white";

export const viewFullMenuButton = button + " " + outline + " " + sizeBasic + " mt-4 md:mt-0 bg-[var(--button-white-bg)] border-[#1a5e63] text-[#1a5e63] hover:bg-[#1a5e63] hover:text-white";

export const addToCartButton = button + " " + basic + " " + sizeBasic + " w-full bg-[#1a5e63] hover:bg-[#164549] text-white";

export const heroSection = "relative py-20 md:py-28 bg-[#ffd84d]/10";

export const heroSectionDiv = "my-container flex flex-col md:flex-row items-center gap-8 md:gap-16";

export const heroSectionDiv1 = "flex-1 space-y-6 text-center md:text-left";

export const heroSectionDiv1_1 = "flex flex-col sm:flex-row gap-4 justify-center md:justify-start";

export const heroSectionH1 = "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight";

export const heroSectionP = "text-lg md:text-xl text-gray-600 max-w-md md:max-w-lg";

export const heroSectionDiv2 = "flex-1 relative";

export const heroSectionDiv2_1 = "relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden";

export const heroSectionDiv2_2 = "absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg";