import { Ability, AbilityToStringMap } from "../enums/Ability";
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
        const optionalSuccessText = this.successDescription ? ` <i>Success:</i> ${this.successDescription}` : '';
        const templateString = `<i>${AbilityToStringMap[this.savingThrowType]} Saving Throw:</i> {{saveDC:${AbilityToStringMap[this.abilityModifier].toLowerCase()}}}, ${this.targetDescription}. <i>Failure:</i> ${this.failureDescription}.${optionalSuccessText}`;

        return SnippetInterpreter.interpretEffectTextSnippets(templateString, statBlock);
    }
}