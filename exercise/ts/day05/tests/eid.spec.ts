import { EID, validateEID } from './eid';

describe('EID', () => {
    test('An EID have a length of 8 Digits', () => {
        expect(validateEID(new EID('12345672'))).toBe(true);
        expect(validateEID(new EID('12345'))).toBe(false);
        expect(validateEID(new EID(''))).toBe(false);
    });
    test('First Digit of an EID is 1,2,3 for Sex of Elf', () => {
        expect(validateEID(new EID('12345672'))).toBe(true);
        expect(validateEID(new EID('22345665'))).toBe(true);
        expect(validateEID(new EID('32345658'))).toBe(true);
        expect(validateEID(new EID('42345678'))).toBe(false);
    });

    test('Digit 2,3 id for Year of Elf between 00 and 99', () => {
        expect(validateEID(new EID('12345672'))).toBe(true);
        expect(validateEID(new EID('22x45678'))).toBe(false);
        expect(validateEID(new EID('3b345678'))).toBe(false);
    });
    
    test('Digit 4,5,6 are serial number', () => {
        expect(validateEID(new EID('12345672'))).toBe(true);
        expect(validateEID(new EID('1234a67a'))).toBe(false);
        expect(validateEID(new EID('123a4678'))).toBe(false);
        expect(validateEID(new EID('12345672'))).toBe(true);
    });
    test('Last two digit is key with modul 97', () => {
        expect(validateEID(new EID('12345672'))).toBe(true);
        expect(validateEID(new EID('18946423'))).toBe(true);
        expect(validateEID(new EID('18946413'))).toBe(false);
        expect(validateEID(new EID('12345678'))).toBe(false);
    });
});