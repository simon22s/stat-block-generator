import InputData from "../models/InputData";
import { SerializationInfo } from "../models/SerializationInfo";

export default class SerializationUtilities {
    private static keyDirectoryKey = 'stat_block_keys';
    public static saveStatBlock(key: string, model: InputData) {
        let keyDirectory: SerializationInfo[] = [];
        const keyDirectoryString = localStorage.getItem(SerializationUtilities.keyDirectoryKey);

        if (keyDirectoryString) {
            keyDirectory = (JSON.parse(keyDirectoryString) as SerializationInfo[]);
        }

        // update directory
        const info = new SerializationInfo(model);
        const index = (keyDirectory as SerializationInfo[]).findIndex(x => x.key == key);

        if (index >= 0) {
            keyDirectory[index] = info;
        } else {
            keyDirectory.push(info);
        }

        localStorage.setItem(SerializationUtilities.keyDirectoryKey, JSON.stringify(keyDirectory));
        localStorage.setItem(info.key, JSON.stringify(model));
    }

    public static getStatBlockFromLocalStorage(key: string): InputData {
        const json = localStorage.getItem(key);
        return json ? JSON.parse(json) as InputData : new InputData();
    }

    public static getKeyDirectory(): SerializationInfo[] {
        const keyDirectoryString = localStorage.getItem(SerializationUtilities.keyDirectoryKey);

        if (keyDirectoryString) {
            return JSON.parse(keyDirectoryString, this.dateReviver) as SerializationInfo[];
        } else {
            return [];
        }
    }

    public static removeStatBlockFromLocalStorage(key: string) {
        localStorage.removeItem(key);
    }
    
    private static dateReviver(key: string, value: any) {
        const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:Z|[+-]\d{2}:?\d{2})?$/;

        if (typeof value === 'string' && isoDateFormat.test(value)) {
            return new Date(value);
        }
        return value;
    }
}