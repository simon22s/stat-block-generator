import { Ability } from "../enums/Ability";

export class SavingThrowEffect {
    public savingThrowType: Ability = Ability.Strength;
    public abilityModifier: Ability = Ability.Strength;
    public isProficient: boolean = true;
    public targetDescription: string = 'One creature that {{name}} can see within 60 feet of it.'
    public successDescription: string = '';
    public failureDescription: string = '';
}