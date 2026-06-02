import InputData from "./InputData";

export class SerializationInfo {
    public displayName: string = '';
    public date: Date;
    public key: string = '';

    constructor(data: InputData) {
        this.displayName = data.name;
        this.date = new Date();
        this.key = crypto.randomUUID();
    }
}