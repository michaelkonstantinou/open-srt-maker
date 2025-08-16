export function formatTime(ms: number, millisecondSeparator: string = ","): string {
    const totalSeconds = Math.floor(ms / 1000)
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0")
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0")
    const seconds = String(totalSeconds % 60).padStart(2, "0")
    const milliseconds = String(Math.round(ms % 1000)).padStart(3, "0")

    return `${hours}:${minutes}:${seconds},${milliseconds}`.replace(",", millisecondSeparator)
}