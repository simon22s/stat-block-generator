export class Sense {
    public senseType: string = '';
    public distance: number = 30;   // in feet

    public getDisplayString(): string {
        return this.senseType + ' ' + this.distance + ' ft.';
    }
}