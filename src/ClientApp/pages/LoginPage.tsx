import { LoginInputModel } from "../models/LoginInputModel";
import { LoginViewModel } from "../models/LoginViewModel";
import Loader from "../components/shared/Loader";
import { ApplicationState } from "../store/index";
import { LoginStore } from "../store/LoginStore";
//import "@Styles/main.scss";;
import * as React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
import bind from 'bind-decorator';
import { Button, Form, FormGroup, Label, ListGroup, ListGroupItem, Input } from "reactstrap";
import Globals from "../Globals";

type Props = RouteComponentProps<{}> & typeof LoginStore.actionCreators & LoginStore.IState;

class LoginPage extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    elLoader: Loader;

    componentDidMount() {
        this.props.init();

        if (this.elLoader) {
            this.elLoader.forceUpdate();
        }
    }

    @bind
    private async onClickSubmitBtn(e: React.MouseEvent<HTMLButtonElement>) {
        
        e.preventDefault();
        // var data = this.elForm.getData<ILoginModel>();
        // this.props.loginRequest(data);
    }

    render() {
        if (this.props.indicators.loginSuccess) {
            return <Redirect to="/" />;
        }
        const data = Globals.getData();
        const model: LoginViewModel = data && data.model ? data.model as LoginViewModel : new LoginViewModel();

        return (
            <div id="loginPage">

                <Helmet>
                    <title>Sign-in</title>
                </Helmet>
                <Loader ref={x => this.elLoader = x} show={this.props.indicators.operationLoading} />

                {model.enableLocalLogin && (
                    <div id="loginContainer">

                        <p className="text-center">Type any login and password to enter.</p>

                        <Form method={"POST"}>
                            <input type={"hidden"} name={nameof<LoginInputModel>(x => x.returnUrl)} value={model.returnUrl} />

                            <FormGroup>
                                <Label htmlFor={nameof<LoginInputModel>(x => x.username)}>Login</Label>
                                <Input type="text"
                                    name={nameof<LoginInputModel>(x => x.username)}
                                    id={nameof<LoginInputModel>(x => x.username)}
                                    data-value-type="string"
                                    data-val-required="true"
                                    data-msg-required="Login is required." />
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor={nameof<LoginInputModel>(x => x.password)}>Password</label>
                                <Input type="password"
                                    name={nameof<LoginInputModel>(x => x.password)}
                                    id={nameof<LoginInputModel>(x => x.password)}
                                    data-value-type="string"
                                    data-val-required="true"
                                    data-msg-required="Password is required." />
                            </FormGroup>
                            {model.allowRememberLogin && (
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name={nameof<LoginInputModel>(x => x.rememberLogin)} value={"true"} />{' '}
                                        Remember me
                                    </Label>
                                </FormGroup>
                            )}

                            <div className="form-inline">
                                <Button color={"success"} name="button" type={"submit"} value="login" onClick={this.onClickSubmitBtn}>Sign in</Button>
                            </div>
                        </Form>
                    </div>
                )}
                {model.visibleExternalProviders && model.visibleExternalProviders.length > 0 && (
                    <ul className="list-inline">
                        {model.visibleExternalProviders.map(p => {
                            return (
                                <li key={p.authenticationScheme}>
                                    <Button tag="a" color={"default"}
                                        href={`external/chalenge/${p.authenticationScheme}?returnUrl=${model.returnUrl}`}>
                                        {p.displayName}
                                    </Button>
                                </li>
                            );
                        })}
                    </ul>
                )}

            </div>
        );
    }
}

var component = connect(
    (state: ApplicationState) => state.login, // Selects which state properties are merged into the component's props
    LoginStore.actionCreators // Selects which action creators are merged into the component's props
)(LoginPage as any);

export default (withRouter(component as any) as any as typeof LoginPage)