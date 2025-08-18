import type Player from "video.js/dist/types/player";

export default class VideoJsPlayerService {
    private player: Player;
    private track: TextTrack;

    constructor(player: Player) {
        this.player = player
        const track = player.addTextTrack("subtitles", "OpenSRT Editor", "en")
        if (track === undefined) {
            throw new Error("Could not create subtitles track")
        }

        this.track = track;
    }

    /**
     * The method removes all existing cues, and appends the ones provided in the method's arguments
     *
     * @param subtitleCues
     */
    updateSubtitles(subtitleCues: VTTCue[]) {
        // clear old cues
        for (let i = this.track.cues?.length ?? 0; i > 0; i--) {
            this.track.removeCue(this.track.cues![i - 1])
        }

        // add new cues
        subtitleCues.forEach((item) => {
            this.track.addCue(item)
        })
    }

    /**
     * If a new video url is given, then invoke the VideoJS' API to change the src value
     */
    setSourceUrl(url: string): void {
        this.player.src({src: url})
    }

    destroy(): void {
        this.player.dispose();
    }
}