import type SubtitleItem from "@/types/SubtitleItem.ts";
import {formatTime} from "@/utils/timeUtils.ts";

export default class OpenSRTProject {
    id: number;
    name: string;
    subtitleItems: Array<SubtitleItem>;
    url: string;

    constructor(id: number, name: string, subtitleItems: Array<SubtitleItem> = [], videoUrl: string) {
        this.id = id;
        this.name = name;
        this.subtitleItems = subtitleItems;
        this.url = videoUrl;
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
}