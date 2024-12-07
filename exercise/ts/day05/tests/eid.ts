enum Sex {
    SLOUBI = 1,
    GAGNA = 2,
    CATACT = 3,
}

export class EID {
    constructor(EID: string) {
        this.EID = EID;
    }
    EID: string;

    private readonly VALID_LENGTH = 8;

    validateEIDLength = () => this.EID.length === this.VALID_LENGTH;

    validateElfSex = () => Number(this.EID.slice(0, 1)) in Sex;

    validateElfYear = () => Number(this.EID.slice(1, 3)) > 0 && Number(this.EID.slice(1, 3)) < 100;

    validateOrderSerialNumber = () => Number(this.EID.slice(3, 6)) > 0 && Number(this.EID.slice(3, 6)) < 1000;

    controlKey = () => this.getData() % 97 === this.getKey();

    private getData = () => Number(this.EID.slice(0, 6));

    private getKey = () => Number(this.EID.slice(6, 8));
}

const EIDValidators: EIDValidator[] = [
    eid => eid.validateEIDLength(),
    eid => eid.validateElfSex(),
    eid => eid.validateElfYear(),
    eid => eid.validateOrderSerialNumber(),
    eid => eid.controlKey()
];


export const validateEID = (eid: EID) => {
    return EIDValidators.every(validator => validator(eid));
}

type EIDValidator = (eid: EID) => boolean;
