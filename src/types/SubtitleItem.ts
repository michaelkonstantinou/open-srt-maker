import {formatTime} from "@/utils/timeUtils.ts";

export default class SubtitleItem {
    startingTimestamp: number;
    endingTimestamp: number;
    content: string;
    orderId: number;

    constructor(startingTimestamp: number, endingTimestamp: number, content: string, orderId: number = 1) {
        this.startingTimestamp = startingTimestamp;
        this.endingTimestamp = endingTimestamp;
        this.content = content;
        this.orderId = orderId;
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
}
