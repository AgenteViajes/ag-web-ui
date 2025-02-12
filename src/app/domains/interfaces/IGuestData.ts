export interface IGuestData {
    firstName: string;
    secondName: string;
    firstLastname: string;
    secondlastname: string;
    documentType: string;
    documentNumber: number;
    email: string;
    phoneNumber: number;
}

export interface IEmergencyContactData extends Omit<
        IGuestData, 
        'email'|
        'documentType'|
        'documentNumber'
    >{}