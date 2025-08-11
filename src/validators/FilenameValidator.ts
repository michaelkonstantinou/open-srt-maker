import {ExportActionType} from "@/types/ExportActionType.ts";

export default class FilenameValidator {

    /**
     * Throws an exception if the given file is empty
     *
     * @param filename
     */
    fileIsNotEmpty(filename: string): boolean {
        if (filename.length <= 0) {
            throw new Error("Filename cannot be empty")
        }

        return true;
    }

    /**
     * Throws an error if the filename extension is not the same as the chosen action
     * For GENERIC actions, all filename extensions are valid
     *
     * @param filename
     * @param action
     */
    fileExtensionSupportsAction(filename: string, action: ExportActionType): boolean {

        if (action === ExportActionType.SRT && !filename.toLowerCase().endsWith(".srt")) {
            throw new Error("Exporting to SRT requires a filename that ends in .srt");
        }

        if (action === ExportActionType.VTT && !filename.toLowerCase().endsWith(".vtt")) {
            throw new Error("Exporting to VTT requires a filename that ends in .vtt");
        }

        return true;
    }
}