import * as React from "react";
import { RouteComponentProps } from "react-router";
import { ToastContainer } from "react-toastify";
import CookieConsent from "../components/CookieConsent";

interface IProps {
    children: any;
}

type Props = IProps & RouteComponentProps<any>;

export default class GuestLayout extends React.Component<Props, {}> {
    public isPublic: boolean = true;

    public render() {

        return (
            <React.Fragment>
                <div className="main-wrapper">
                    {this.props.children}

                </div>

                <CookieConsent />
                <ToastContainer />
            </React.Fragment>
        );
    }
}