import * as React from "react";
import { Trans } from 'react-i18next';

class ServiceSection extends React.Component<{}, {}> {

    constructor(props) {
        super(props);
    }
    public render() {
        return (
            <section data-scroll-index="1">
                <div className="container">
                    <div className="text-center section-heading">
                        <h2>We Provide Awesome Services</h2>
                        <p className="width-55 sm-width-75 xs-width-95">
                            <Trans i18nKey="home.services.text">
                                O crescimento institucional e empresarial pode depender a partir de problemas que precisam de soluções rápidas,
                                concisas e objetivas. Ilustramos abaixo um rol de situações sobre as quais a eQuantic tem habilidade de gestão
                                progressiva e continuada em diversificadas áreas dentro do âmbito de Tecnologia da Informação (TI).
                                Nossas soluções são efetivas para este rol ilustrativo de problemas e outros de toda especificidade.
                            </Trans>
                        </p>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md-12 sm-margin-20px-bottom">
                            <div className="services-block bg-light-gray padding-45px-tb padding-25px-lr sm-padding-35px-tb sm-padding-20px-lr xs-padding-30px-tb xs-padding-15px-lr last-paragraph-no-margin wow fadeInUp" data-wow-delay=".2s">
                                <div className="title-box margin-25px-bottom sm-margin-15px-bottom">
                                    <i className="fas fa-brain text-theme-color"></i>
                                    <div className="box-circle-large"></div>
                                    <div className="box-circle-small"></div>
                                </div>
                                <h3 className="margin-10px-bottom font-size22 md-font-size20 xs-font-size18">Logística via Web</h3>
                                <ul className="list-style font-size14 text-left">
                                    <li>Codificação e planejamento de rotinas</li>
                                    <li>Gestão virtual efetiva</li>
                                    <li>Padronização crítica inteligente</li>
                                    <li>Depuração de sistemas ativos</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 sm-margin-20px-bottom">
                            <div className="services-block bg-light-gray padding-45px-tb padding-25px-lr sm-padding-35px-tb sm-padding-20px-lr xs-padding-30px-tb xs-padding-15px-lr last-paragraph-no-margin wow fadeInUp" data-wow-delay=".4s">
                                <div className="title-box margin-25px-bottom sm-margin-15px-bottom">
                                    <i className="fas fa-shopping-cart text-theme-color"></i>
                                    <div className="box-circle-large"></div>
                                    <div className="box-circle-small"></div>
                                </div>
                                <h3 className="margin-10px-bottom font-size22 md-font-size20 xs-font-size18">Marketing Digital</h3>
                                <ul className="list-style font-size14 text-left">
                                    <li>Presença de sua marca na internet</li>
                                    <li>Otimização de sites</li>
                                    <li>Conversão de acessos em lucros</li>
                                    <li>Análise detalhada do seu negócio</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="services-block bg-light-gray padding-45px-tb padding-25px-lr sm-padding-35px-tb sm-padding-20px-lr xs-padding-30px-tb xs-padding-15px-lr last-paragraph-no-margin wow fadeInUp" data-wow-delay=".6s">
                                <div className="title-box margin-25px-bottom sm-margin-15px-bottom">
                                    <i className="fas fa-microchip text-theme-color"></i>
                                    <div className="box-circle-large"></div>
                                    <div className="box-circle-small"></div>
                                </div>
                                <h3 className="margin-15px-bottom font-size22 md-font-size20 xs-font-size18">Software On Demand</h3>
                                <ul className="list-style font-size14 text-left">
                                    <li>Detecção de necessidades</li>
                                    <li>Modelagem personalizada</li>
                                    <li>Tratamento de complexidades</li>
                                    <li>Resolução de especificidades</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        );
    }
}

export default ServiceSection;