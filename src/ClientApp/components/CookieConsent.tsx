import * as React from "react";
import { connect } from "react-redux";
import { Trans } from 'react-i18next';
import bind from 'bind-decorator';
import { Button, Container, Nav, Navbar, Form, NavItem, NavbarToggler } from "reactstrap";
import { ApplicationState } from "../store/index";
import { LocationStore } from "../store/LocationStore";
import Globals from "../Globals";
import { IConsentCookie } from "../models/IConsentCookie";

type Props = typeof LocationStore.actionCreators & LocationStore.IState;

export interface ICookieConsentState {
    visible: boolean;
}
class CookieConsent extends React.Component<Props, ICookieConsentState> {

    private cookieConsent: IConsentCookie | null;
    constructor(props) {
        super(props);

        const publicData = Globals.getData().public;
        this.cookieConsent = publicData ? publicData.consentCookie : null;
        this.state = {
            visible: !this.cookieConsent.canTrack
        };
    }

    @bind
    onAcceptClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        document.cookie = this.cookieConsent.cookieName;

        this.setState({ visible: false});
    }

    @bind
    onCloseClick(e: React.MouseEvent<HTMLButtonElement>)
    {
        e.preventDefault();

        this.setState({ visible: false});
    }

    public render() {
        if(this.state.visible)
        return (
            <Navbar expand="lg" dark fixed="bottom" color="dark">
                <Container>
                    <p className="navbar-text mr-auto">
                        <Trans i18nKey="cookieConsent.text">
                            Usamos cookies para personalizar o conteúdo, os anúncios e para analisar o tráfego para o nosso site. Além disso, nossos parceiros de mídia social, publicidade e análise de cookies recebem informações pseudôminas sobre o uso do nosso site. Mais informações. Por favor, clique em" Aceitar cookies "se concorda com a configuração de cookies. Isso não afeta os cookies que não exigem consentimento.
                        </Trans>
                    </p>
                    <Form inline>
                        <Button type="button" color="secondary" onClick={this.onAcceptClick}>Aceitar cookies</Button>
                    </Form>
                </Container>
                <button type="button" className="close" aria-label="Close" onClick={this.onCloseClick}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </Navbar>
        );
        else return null;
    }
}


export default connect(
    (state: ApplicationState) => state.location, // Selects which state properties are merged into the component's props
    LocationStore.actionCreators // Selects which action creators are merged into the component's props
)(CookieConsent);