import { basicBadge, destructiveBadge, outlineBadge, secondaryBadge, defaultBadge } from '../components/appliedcss/TrackCalorieCSS';

export default function Badge({ cssClasses, variant, children, ...props }) {
    let cssClass = basicBadge;

    if (variant === "destructive") {
        cssClass += " " + (destructiveBadge || "");
    } else if (variant === "outline") {
        cssClass += " " + (outlineBadge || "");
    } else if (variant === "secondary") {
        cssClass += " " + (secondaryBadge || "");
    } else {
        cssClass += " " + (defaultBadge || "");
    }

    cssClass += " " + (cssClasses || "");

    return <div className={cssClass}>{children}</div>
}