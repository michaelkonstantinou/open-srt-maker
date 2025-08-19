import type SubtitleItem from "@/types/SubtitleItem.ts";
import {formatTime} from "@/utils/timeUtils.ts";
import {slugify} from "@/utils/textUtils.ts";

export default class OpenSRTProject {
    id: number;
    name: string;
    subtitleItems: Array<SubtitleItem>;
    url: string;
    slug: string;

    constructor(id: number, name: string, subtitleItems: Array<SubtitleItem> = [], videoUrl: string) {
        this.id = id;
        this.name = name;
        this.subtitleItems = subtitleItems;
        this.url = videoUrl;
        this.slug = slugify(this.name);
    }

    /**
     * Filters out the SubtitleItem that has the given id
     * @param id
     */
    public removeItemById(id: Number) {
        this.subtitleItems = this.subtitleItems.filter(el => el.id !== id);
    }

    public toSrtContent() {
        return this.subtitleItems
            .map((sub, index) => {
                return `${index + 1}\n${formatTime(sub.startingTimestamp)} --> ${formatTime(sub.endingTimestamp)}\n${sub.content.trim()}\n\n`
            })
            .join("")
    }

    public toVttContent(): string {
        return (
            "WEBVTT\n\n" +
            this.subtitleItems
                .map((item) => {
                    return `${formatTime(item.startingTimestamp, ".")} --> ${formatTime(item.endingTimestamp, ".")}\n${item.content}\n`
                })
                .join("\n")
        )
    }

    /**
     * Creates a Blob url in VTT format that can be used by the video player to show the subtitles
     */
    createVttUrl(): string {
        const blob = new Blob([this.toVttContent()], { type: "text/vtt" })
        return URL.createObjectURL(blob)
    }

    /**
     * Creates an array of VTTCue items that can be used as input to an html-track object
     * to show the subtitles. It is wiser to use VTTCue instances for optimization purposes
     */
    toVttCues(): VTTCue[] {
        const cues: VTTCue[] = []
        this.subtitleItems.forEach((item) => {
            const cue: VTTCue = new VTTCue(
                item.startingTimestamp / 1000,
                item.endingTimestamp / 1000,
                item.content
            )
            cues.push(cue)
        })

        return cues;
    }
}