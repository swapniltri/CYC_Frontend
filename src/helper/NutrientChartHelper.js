export const getColors = (nutrient) => {
    nutrient = nutrient.toLowerCase();
    switch (nutrient) {
        case "calories":
            return {
                gradient1: "#1a5e63",
                gradient2: "#2fcbbb",
                background: "#e6f0f1",
                text: "#1a5e63",
            }
        case "protein":
            return {
                gradient1: "#3b82f6",
                gradient2: "#60a5fa",
                background: "#e6f0ff",
                text: "#2563eb",
            }
        case "fats":
            return {
                gradient1: "#f59e0b",
                gradient2: "#fbbf24",
                background: "#fef3e6",
                text: "#d97706",
            }
        default:
            return {
                gradient1: "#1a5e63",
                gradient2: "#2fcbbb",
                background: "#e6f0f1",
                text: "#1a5e63",
            }
    }
}