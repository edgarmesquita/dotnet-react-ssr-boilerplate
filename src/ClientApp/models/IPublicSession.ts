import { IServiceUser } from "./IServiceUser";
import { IConsentCookie } from "./IConsentCookie";

/**
 * Isomorphic application session data.
 */
export interface IPublicSession {
    consentCookie?: IConsentCookie;
    xsrfToken?: string;
    serviceUser?: IServiceUser;
}