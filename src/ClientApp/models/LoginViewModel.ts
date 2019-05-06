import { LoginInputModel } from "./LoginInputModel";
import { IExternalProvider } from "./IExternalProvider";

export class LoginViewModel extends LoginInputModel {
    allowRememberLogin: boolean = true;
    enableLocalLogin: boolean = true;
    isExternalLoginOnly: boolean;
    externalLoginScheme: string;

    externalProviders: IExternalProvider[];
    visibleExternalProviders: IExternalProvider[];
}