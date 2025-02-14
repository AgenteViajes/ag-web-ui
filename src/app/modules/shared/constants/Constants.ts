import { DocumentType } from "../../../domains/enums/EDocumentType";
import { Gender } from "../../../domains/enums/EGender";

export const Constants = {
    dateFormat: 'DD/MM/YYYY',
    storageKeys: {
        session: {
            user: 'userAuthData',
            searchBkParams: 'searchBookingParams',
            bookingRoom: 'bookingRoomData',
            roomsFound: 'roomsFound',
            bookingConfirmed: 'bookingConfirmed',
        },
        local: {

        }

    },
    documentTypes: [
        { label: 'Cédula de Ciudadanía', value: DocumentType.CC},
        { label: 'Cédula de Extranjería', value: DocumentType.CE},
        { label: 'Tarjeta de Extranjería', value: DocumentType.TE},
        { label: 'Registro Civil de Nacimiento', value: DocumentType.RC},
        { label: 'Tarjeta de Identidad', value: DocumentType.TC},
        { label: 'Pasaporte', value: DocumentType.PP},
    ],
    genderTypes: [
        { label: 'Masculino', value: Gender.MALE},
        { label: 'Femenino', value: Gender.FEMALE},
        { label: 'No Binario', value: Gender.NO_BINARIE},
        { label: 'Otro', value: Gender.OTHER}
    ]
}