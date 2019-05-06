import { LoginInputModel as ILoginModel } from "../models/LoginInputModel";
import { IServiceUser } from "../models/IServiceUser";
import Result from "../models/Result";
import { ServiceBase } from "./ServiceBase";
import Globals from "../Globals";

export default class AccountService extends ServiceBase {
    static async login(loginModel: ILoginModel): Promise<Result<IServiceUser>> {
        var result = await this.requestJson<IServiceUser>({
            url: "api/Account/Login",
            method: "POST",
            data: loginModel
        });

        if (!result.hasErrors) {
            Globals.serviceUser = result.value;
        }

        return result;
    }

    static async logout(): Promise<Result<{}>> {
        var result = await this.requestJson<IServiceUser>({
            url: "api/Account/Logout",
            method: "POST"
        });

        if (!result.hasErrors) {
            Globals.serviceUser = null;
        }

        return result;
    }
}