import SnippetInterpreter from "../services/SnippetInterpreter";
import StatBlock from "./StatBlock";
import { StatBlockHtmlEntry } from "./StatBlockHtmlEntry";

export class Trait {
    public name: string = '';
    public description: string = '';

    public static getHtml(trait: Trait, statBlock: StatBlock): StatBlockHtmlEntry {
        return {
            name: trait.name,
            htmlText: `<b>${trait.name} </b>${SnippetInterpreter.interpretEffectTextSnippets(trait.description, statBlock)}`
        }
    }
}