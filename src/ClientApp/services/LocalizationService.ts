import { ServiceBase } from "./ServiceBase";
import Result from "../models/Result";

export default class LocalizationService extends ServiceBase {
    static async setLanguage(culture: string): Promise<Result<{}>> {
        var result = await this.requestJson({
            url: "language?culture=" + culture,
            method: "POST"
        });
        return result;
    }
}