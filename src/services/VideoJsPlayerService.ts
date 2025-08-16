import type Player from "video.js/dist/types/player";

export default class VideoJsPlayerService {
    private player: Player;

    constructor(player: Player) {
        this.player = player
    }

    updateSubtitles(subtitlesUrl: string, srcLang: string = "en", label: string = "OpenSRT Editor") {

        // Clear existing tracks
        let tracks: TextTrackList = this.player.remoteTextTracks()
        for (let i = tracks.length - 1; i >= 0; i--) {
            this.player.removeRemoteTextTrack(tracks[i])
        }

        // add track to player
        this.addSubtitlesTrack(subtitlesUrl, srcLang, label)
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

    /**
     * Adds a new subtitles track to the VideoJs player that this service handles
     *
     * @param subtitlesUrl
     * @param srcLang
     * @param label
     * @private
     */
    private addSubtitlesTrack(subtitlesUrl: string, srcLang: string, label: string): void {
        const elTrack: HTMLTrackElement = this.player.addRemoteTextTrack(
            {
                src: subtitlesUrl,
                kind: "subtitles",
                srclang: srcLang,
                label: label,
                default: true
            },
            true
        );

        elTrack.track.mode = "showing";
    }

}