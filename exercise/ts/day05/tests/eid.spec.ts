

// TODO : 4, 5, 6	"Serial number": birth order	From 001 to 999
// TODO : 7, 8	control key = complement to 97 of the number formed by the first 6 digits of the EID modulo 97	From 01 to 97

enum Sex {
    SLOUBI = 1,
    GAGNA = 2,
    CATACT = 3,
}

class EID {
    constructor(EID: string) {
        this.EID = EID;
    }
    EID: string;
    
    private readonly VALID_LENGTH = 8;

    validateEIDLength() {
        return this.EID.length === this.VALID_LENGTH;
    }

    validateElfSex() {
        return Number(this.EID.slice(0, 1)) in Sex;
    }

    validateElfYear() {
        return Number(this.EID.slice(1, 3)) > 0 && Number(this.EID.slice(1, 3)) < 100;
    }

    validateOrderSerialNumber() {
        return Number(this.EID.slice(3, 5)) > 0 && Number(this.EID.slice(3, 5)) < 1000;
    }
}

type EIDValidator = (eid: EID) => boolean;

const EIDValidators: EIDValidator[] = [
    eid => eid.validateEIDLength(),
    eid => eid.validateElfSex(),
    eid => eid.validateElfYear(),
    eid => eid.validateOrderSerialNumber(),
];


//TODO :4, 5, 6	"Serial number": birth order	From 001 to 999
const validateEIDNew = (eid: EID) => {
    return EIDValidators.every(validator => validator(eid));
}


//TODO  :7, 8	control key = complement to 97 of the number formed by the first 6 digits of the EID modulo 97	From 01 to 97
describe('EID', () => {
    test('An EID have a length of 8 Digits', () => {
        expect(validateEIDNew(new EID('12345678'))).toBe(true);
        expect(validateEIDNew(new EID('12345'))).toBe(false);
        expect(validateEIDNew(new EID(''))).toBe(false);
    });
    test('First Digit of an EID is 1,2,3 for Sex of Elf', () => {
        expect(validateEIDNew(new EID('12345678'))).toBe(true);
        expect(validateEIDNew(new EID('22345678'))).toBe(true);
        expect(validateEIDNew(new EID('32345678'))).toBe(true);
        expect(validateEIDNew(new EID('42345678'))).toBe(false);
    });

    test('Digit 2,3 id for Year of Elf between 00 and 99', () => {
        expect(validateEIDNew(new EID('12445678'))).toBe(true);
        expect(validateEIDNew(new EID('22x45678'))).toBe(false);
        expect(validateEIDNew(new EID('3b345678'))).toBe(false);
    });
    
    test('Digit 4,5,6 are serial number', () => {
        expect(validateEIDNew(new EID('12345678'))).toBe(true);
        expect(validateEIDNew(new EID('1234a67a'))).toBe(false);
        expect(validateEIDNew(new EID('123a4678'))).toBe(false);
        expect(validateEIDNew(new EID('12345678'))).toBe(true);
    });
});