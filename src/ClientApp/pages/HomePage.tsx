import * as React from "react";
import { connect } from "react-redux";
import { Trans } from 'react-i18next';
import { RouteComponentProps } from "react-router";
import { Helmet } from "react-helmet";
import { ApplicationState } from "../store/index";
import { LocationStore } from "../store/LocationStore";

type Props = RouteComponentProps<{}> & typeof LocationStore.actionCreators & LocationStore.IState;

class HomePage extends React.Component<Props, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Helmet htmlAttributes={{lang: this.props.culture}}>
                    <meta property="og:locale" content={this.props.culture} />
                    <meta property="og:type" content="website" />

                    <meta name="twitter:card" content="summary" />

                    <title>Example</title>
                </Helmet>

            </React.Fragment>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.location, // Selects which state properties are merged into the component's props
    LocationStore.actionCreators // Selects which action creators are merged into the component's props
)(HomePage);