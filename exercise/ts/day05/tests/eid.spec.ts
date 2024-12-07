
// TODO : an EID have a length of 8 Digits
// TODO :  First Digit is for sex of ELF 	Sex : 1 for Sloubi, 2 for Gagna, 3 for Catact
// TODO : 2, 3	Last two digits of the year of birth (which gives the year to the nearest century)	From 00 to 99
//TODO :4, 5, 6	"Serial number": birth order	From 001 to 999
const validateEID = (EID: string) => {
    return EID.length === 8 && (Number(EID.slice(0,1)) === 1 || Number(EID.slice(0,1)) === 2 || Number(EID.slice(0,1)) === 3 ); 
}

//TODO  :7, 8	control key = complement to 97 of the number formed by the first 6 digits of the EID modulo 97	From 01 to 97
describe('EID', () => {
    test('An EID have a length of 8 Digits', () => {
        expect(validateEID('12345678')).toBe(true);
        expect(validateEID('12345')).toBe(false);
        expect(validateEID('')).toBe(false);
    });
    test('Fist Digit of an EID is 1,2,3 for Sex of Elf', () => {
        expect(validateEID('12345678')).toBe(true);
        expect(validateEID('22345678')).toBe(true);
        expect(validateEID('32345678')).toBe(true);
        expect(validateEID('42345678')).toBe(false);
    }); 
});