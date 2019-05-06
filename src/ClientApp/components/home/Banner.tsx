import * as React from "react";
import { Trans } from 'react-i18next';
import { connect } from "react-redux";
import { ApplicationState } from "../../store/index";
import { LocationStore } from "../../store/LocationStore";

class Banner extends React.Component<{}, {}> {

    constructor(props)
    {
        super(props);
    }
    public render() {
        const bannerImage = "img/banner/banner.jpg";
        return (
            <React.Fragment>
                <div className="banner-creative bg-img cover-background theme-overlay" data-scroll-index="0" data-overlay-dark="9"
                    data-background={bannerImage}
                    style={{backgroundImage: `url(${bannerImage})`}}>

                    <div className="container">

                        <div className="row">
                            
                            <div className="col-lg-6 col-md-12 sm-margin-50px-bottom xs-margin-20px-bottom">
                                <div className="header-text sm-width-75 xs-width-100">

                                    <h1 className="line-height-55 md-line-height-50 xs-line-height-40 xs-font-size28 wow fadeInUp text-white" data-wow-delay=".1s">
                                        <Trans i18nKey="banner.title">
                                            Nós construímos serviços empresariais poderosos
                                        </Trans>
                                    </h1>
                                    <p className="text-white font-size16 line-height-28 xs-font-size14 xs-line-height-26 margin-30px-bottom sm-margin-20px-bottom width-80 xs-width-90 wow fadeInUp" data-wow-delay=".2s">
                                        <Trans i18nKey="banner.text">
                                            A eQuantic Systems promove e apoia startups para desenvolver inovação e tecnologia disruptiva. Procuramos solucionar as necessidades do mercado.
                                        </Trans>
                                    </p>
                                    <a href="javascript:void(0)" className="butn white margin-10px-right vertical-align-middle">
                                        <Trans i18nKey="banner.button">
                                            Vamos começar
                                        </Trans>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 sm-text-center">
                                <div className="banner-img">
                                    <img src="img/content/content-05.png" className="img-fluid float-right width-100" alt="" />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="header-shape xs-display-none">
                    <img src="img/banner/header-bg03.png" className="img-fluid width-100" alt="" />
                </div>
            </React.Fragment>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.location, // Selects which state properties are merged into the component's props
    LocationStore.actionCreators // Selects which action creators are merged into the component's props
)(Banner);