export function slugify(text: string): string {
    return text
        .toString()                 // ensure string
        .normalize("NFD")           // normalize accents
        .replace(/[\u0300-\u036f]/g, "") // remove diacritics
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with -
        .replace(/^-+|-+$/g, "");   // trim - from start/end
}
