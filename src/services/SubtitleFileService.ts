import SubtitleItem from "@/types/SubtitleItem.ts";

export default class SubtitleFileService {

    readSubtitleItemsFromFile(file: File): Promise<SubtitleItem[]> {
        return new Promise(resolve => {
            let subtitles: SubtitleItem[] = []

            const reader = new FileReader()

            reader.onload = (e) => {
                const text = e.target?.result as string
                if (file.name.endsWith(".srt")) {
                    subtitles = this.parseSrt(text)
                } else if (file.name.endsWith(".vtt")) {
                    subtitles = this.parseVtt(text)
                }
                resolve(subtitles)
            }

            reader.readAsText(file)
        })
    }

    /** Parse SRT text into SubtitleItem[] */
    parseSrt(srtText: string): SubtitleItem[] {
        const entries = srtText.trim().split(/\r?\n\r?\n/)
        return entries.map((entry) => {
            const lines = entry.split(/\r?\n/)
            const timeLine = lines[1]
            const [start, end] = timeLine.split(" --> ").map(this.parseTime)
            const content = lines.slice(2).join("\n")

            return new SubtitleItem(start, end, content)
        })
    }

    /** Parse VTT text into SubtitleItem[] */
    parseVtt(vttText: string): SubtitleItem[] {
        const cleanText = vttText.replace(/^WEBVTT\s*\n/, "")
        const entries = cleanText.trim().split(/\r?\n\r?\n/)
        return entries.map((entry) => {
            const lines = entry.split(/\r?\n/)
            const timeLine = lines[0]
            const [start, end] = timeLine.split(" --> ").map(this.parseTime)
            const content = lines.slice(1).join("\n")
            return new SubtitleItem(start, end, content)
        })
    }

    /** Convert "00:00:05,000" or "00:00:05.000" → milliseconds */
    private parseTime(timeStr: string): number {
        const [h, m, s] = timeStr.replace(",", ".").split(":")
        const [sec, ms] = s.split(".")
        return (
            parseInt(h) * 3600000 +
            parseInt(m) * 60000 +
            parseInt(sec) * 1000 +
            parseInt(ms || "0")
        )
    }
}