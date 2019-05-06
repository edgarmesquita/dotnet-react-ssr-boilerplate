import { IPublicSession } from "./IPublicSession";
import { IPrivateSession } from "./IPrivateSession";

/**
 * Represents the isomorphic session.
 */
export interface INodeSession {
    culture?: string;
    public?: IPublicSession;
    private?: IPrivateSession;
    model?: any
}