import { Ability } from "../enums/Ability";
import SnippetInterpreter from "../services/SnippetInterpreter";
import StatBlock from "./StatBlock";

export class SavingThrowEffect {
    public savingThrowType: Ability = Ability.Strength;
    public abilityModifier: Ability = Ability.Strength;
    public isProficient: boolean = true;
    public targetDescription: string = 'One creature that {{name}} can see within 60 feet of it.'
    public successDescription: string = '';
    public failureDescription: string = '';

    public getHtmlText(statBlock: StatBlock): string {
        const templateString = `<i>${this.savingThrowType.toString()} Saving Throw:</i> {{saveDC:${this.abilityModifier.toString().toLowerCase()}}}, ${this.targetDescription}. <i>Failure:</i> ${this.failureDescription}. <i>Success:</i>${this.successDescription}.`;

        return SnippetInterpreter.interpretEffectTextSnippets(templateString, statBlock);
    }
}