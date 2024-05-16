export class Sense {
    public senseType: string = '';
    public distance: number = 30;   // in feet

    constructor(senseType: string, distance: number) {
        this.senseType = senseType;
        this.distance = distance;
    }

    public getDisplayString(): string {
        return this.senseType + ' ' + this.distance + ' ft.';
    }
}