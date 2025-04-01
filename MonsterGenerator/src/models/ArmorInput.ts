export class ArmorInput {
    public description: string = '';
    public armorBehavior: 'IncludeDex' | 'ExcludeDex' = 'IncludeDex';
    public armorValue: number = 10;
}