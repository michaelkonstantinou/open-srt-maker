import {formatTime} from "@/utils/timeUtils.ts";

interface SubtitleItemInterface {
    id: number;
    startingTimestamp: number;
    endingTimestamp: number;
    content: string;
}

export default class SubtitleItem implements SubtitleItemInterface{
    id: number;
    startingTimestamp: number;
    endingTimestamp: number;
    content: string;

    constructor(startingTimestamp: number, endingTimestamp: number, content: string, id: number = 1) {
        this.startingTimestamp = startingTimestamp;
        this.endingTimestamp = endingTimestamp;
        this.content = content;
        this.id = id;
    }

    static fromJSON(obj: SubtitleItemInterface): SubtitleItem {
        return new SubtitleItem(
            obj.startingTimestamp,
            obj.endingTimestamp,
            obj.content,
            obj.id
        )
    }

    /**
     * Returns the subtitle's supported timestamp in the valid SRT format
     * e.g. 00:00:05 -> 00:00:10
     */
    toTimeRange(): string {
        return `${formatTime(this.startingTimestamp)} → ${formatTime(this.endingTimestamp)}`;
    }

    getContentText(): string {
        if (this.content.length <= 0) {
            return "<Content is missing>"
        }

        return this.content
    }

    copy(): SubtitleItem {
        return new SubtitleItem(this.startingTimestamp, this.endingTimestamp, this.content, this.id)
    }
}
