import { StatBlockHtmlEntry } from "./StatBlockHtmlEntry";

export class Trait {
    public name: string = '';
    public description: string = '';

    public static getHtml(trait: Trait): StatBlockHtmlEntry {
        return {
            name: trait.name,
            htmlText: trait.description
        }
    }
}