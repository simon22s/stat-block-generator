import { Ability } from '../enums/Ability'

export type Skill = 'Acrobatics' | 'Animal Handling' | 'Arcana' | 'Athletics' | 'Deception' | 'History' | 'Insight' | 'Intimidation' | 'Investigation' | 'Medicine' | 'Nature'
    | 'Perception' | 'Performance' | 'Persuasion' | 'Religion' | 'Sleight of Hand' | 'Stealth' | 'Survival';

export const Skills = ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature'
    , 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth', 'Survival'];

export class SkillToAbilityMap {
    public static convert(skill: Skill) {
        switch (skill) {
            case 'Athletics':
                return Ability.Strength;
            case 'Acrobatics':
            case 'Sleight of Hand':
            case 'Stealth':
                return Ability.Dexterity;
            case 'Arcana':
            case 'History':
            case 'Investigation':
            case 'Nature':
            case 'Religion':
                return Ability.Intelligence;
            case 'Animal Handling':
            case 'Insight':
            case 'Medicine':
            case 'Perception':
            case 'Survival':
                return Ability.Wisdom;
            case 'Deception':
            case 'Intimidation':
            case 'Performance':
            case 'Persuasion':
                return Ability.Charisma;
        }
    }
}