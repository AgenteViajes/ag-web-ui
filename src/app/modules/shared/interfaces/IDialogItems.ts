import { DialogAction } from "../enums/EDialogAction";
import { DialogType } from "../enums/EDialogType";

export interface DialogItems {
    title:string;
    labelBtnAccept: string;
    labelBtnCancel: string;
    type: DialogType;
    actionType: DialogAction;
}