import { Action, Reducer } from "redux";
import { AppThunkAction } from "./index";
import { clone } from "../utils";
import i18n from "../i18n";
import { Country } from "../data/countries";
import { LocalizationService } from "../services";

export module LocationStore {
    export interface IState {
        culture: string;
        indicators: {
            operationLoading: boolean;
            changed: boolean;
        };
    }

    export enum Actions {
        Init = "LOCATION_INIT",
        Request = "LOCATION_REQUEST",
        Success = "LOCATION_SUCCESS",
        Failure = "LOCATION_FAILURE"
    }
    interface IInit {
        type: Actions.Init
    }

    interface IRequest {
        type: Actions.Request;
    }

    interface ISuccess {
        type: Actions.Success;
        payload: string;
    }

    interface IFailure {
        type: Actions.Failure;
    }

    type KnownAction = IInit | IRequest | ISuccess | IFailure;

    export const actionCreators = {
        change: (country: Country): AppThunkAction<KnownAction> => async (dispatch, getState) => {

            dispatch({ type: Actions.Request });

            let culture = country.language;
            if (country.enabled) culture += "-" + country.acronym;
            var i18nResult = await i18n.changeLanguage(culture);

            if (i18nResult) {

                var result = await LocalizationService.setLanguage(culture);
                if (result.hasErrors) {
                    dispatch({ type: Actions.Failure });
                    return;
                }
                dispatch({ type: Actions.Success, payload: culture });
                return;
            }
            dispatch({ type: Actions.Failure });
            return;
        }
    }

    const initialState: IState = {
        culture: "",
        indicators: {
            operationLoading: false,
            changed: false
        }
    };

    export const reducer: Reducer<IState> = (currentState: IState, incomingAction: Action) => {
        const action = incomingAction as KnownAction;

        var cloneIndicators = () => clone(currentState.indicators);

        switch (action.type) {
            case Actions.Init:
                return initialState;
            case Actions.Request:
                var indicators = cloneIndicators();
                indicators.operationLoading = true;
                return { ...currentState, indicators };
            case Actions.Success:
                var indicators = cloneIndicators();
                var culture = action.payload;
                indicators.operationLoading = false;
                indicators.changed = true;
                return { ...currentState, indicators, culture };
            case Actions.Failure:
                var indicators = cloneIndicators();
                indicators.operationLoading = false;
                return { ...currentState, indicators };
            default:
                // The following line guarantees that every action in the KnownAction union has been covered by a case above
                const exhaustiveCheck: never = action;
        }

        return currentState || initialState;
    }
}