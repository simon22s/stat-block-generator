import { Ability } from "../enums/Ability";
import { ActionTime } from "../enums/ActionTime";
import { AttackRange } from "../enums/AttackRange";
import { AttackType } from "../enums/AttackType";

export interface ActionInput {
    actionType: 'Attack' | 'General'
    name: string
    actionTime: ActionTime
    isIncludedInMultiattack: boolean
}

export class AttackActionInput implements ActionInput {
    public actionType: 'Attack' | 'General' = 'Attack';
    public name: string = '';
    public actionTime: ActionTime = 'Action';
    public attackStat: Ability = Ability.Strength;
    public attackType: AttackType = 'Weapon';
    public attackRange: AttackRange = 'Melee';
    public range: number = 5;
    public isProficient: boolean = true;
    public effectText: string = '';
    public isIncludedInMultiattack: boolean = false;
}

export class GeneralActionInput implements ActionInput {
    public actionType: 'Attack' | 'General' = 'General';
    public name: string = '';
    public actionTime: ActionTime = 'Special';
    public effectText: string = '';
    public isIncludedInMultiattack: boolean = false;
}