export function GetUserDateTimeInfo() {
    const now = new Date();

    return {
        timeStampUtc: now.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
}