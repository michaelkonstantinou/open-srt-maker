import type SubtitleItem from "@/types/SubtitleItem.ts";

export default class OpenSRTProject {
    id: number;
    name: string;
    subtitleItems: Array<SubtitleItem>;

    constructor(id: number, name: string, subtitleItems: Array<SubtitleItem> = []) {
        this.id = id;
        this.name = name;
        this.subtitleItems = subtitleItems;
    }
}