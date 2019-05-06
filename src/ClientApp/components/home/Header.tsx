import * as React from "react";
import { Container, Nav, Navbar, NavItem, NavbarToggler } from "reactstrap";
import { ApplicationState } from "../../store/index";
import { LocationStore } from "../../store/LocationStore";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import bind from 'bind-decorator';
import { Trans } from 'react-i18next';
import { FlagSelect } from "../FlagSelect";
import { Country } from "../../data/countries";

interface IHeaderState {
    fixed: boolean;
    isOpen: boolean;
}
interface IHeaderMenu {
    path: string;
    name: string;
    text: string;
}

type Props = typeof LocationStore.actionCreators & LocationStore.IState;

class Header extends React.Component<Props, IHeaderState> {

    private menu: IHeaderMenu[] = [
        { path: "/", name: "home", text: "Principal" },
        { path: "/about", name: "about", text: "Sobre" },
        { path: "/services", name: "services", text: "Serviços" },
        { path: "/contact", name: "contact", text: "Contato" }
    ];
    constructor(props) {
        super(props);

        this.state = {
            fixed: true,
            isOpen: false
        };
    }
    componentDidMount() {
        window.addEventListener("scroll", this.onWindowScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onWindowScroll);
    }

    @bind
    onWindowScroll(e: Event) {
        this.setState({ fixed: window.scrollY <= 50 });
    }

    @bind
    onFlagSelectChange(country: Country) {
        this.props.change(country);
    }

    @bind
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    public render() {
        let headerClass = "header onepage-header ";
        headerClass += this.state.fixed ? "fixedHeader" : "scrollHeader";

        return (

            <header className={headerClass} data-scroll-index="0">

                <div className="container">

                    <div className="menu_area alt-font">

                        <Navbar expand="lg" className="no-padding">

                            <Container className="sm-position-relative">


                                <div className="navbar-header navbar-header-custom">
                                    <Link to="/" data-scroll-nav="0" className="navbar-brand white-logo">
                                        <img id="logo" src="img/logos/logo-white.png" alt="logo" />
                                    </Link>
                                </div>

                                <NavbarToggler onClick={this.toggle} />

                                <Nav navbar id="nav" className={`ml-auto${this.state.isOpen ? " open" : ""}`}
                                    style={this.state.isOpen ? { display: "block" } : null}>
                                    {this.menu.map((item, idx) => {
                                        return (
                                            <NavItem key={idx}>
                                                <NavLink exact activeClassName="active" className="nav-link" to={item.path} data-scroll-nav={idx}>
                                                    <Trans i18nKey={`header.menu.${item.name}`}>{item.text}</Trans>
                                                </NavLink>
                                            </NavItem>
                                        );
                                    })}
                                </Nav>

                                {/*<div className="margin-20px-left sm-display-none">
                                    <a className="butn white" href="javascript:void(0);">Download</a>
                                </div>*/}
                                <div className="margin-20px-left sm-display-none">
                                    <FlagSelect defaultCulture={this.props.culture}
                                        alignOptions="left" selectedSize={20} optionsSize={24}
                                        onSelect={this.onFlagSelectChange} />
                                </div>
                            </Container>

                        </Navbar>
                    </div>

                </div>

            </header>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.location, // Selects which state properties are merged into the component's props
    LocationStore.actionCreators // Selects which action creators are merged into the component's props
)(Header);