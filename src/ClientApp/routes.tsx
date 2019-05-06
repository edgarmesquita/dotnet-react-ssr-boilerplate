import GuestLayout from "./layouts/GuestLayout";
import LoginPage from './pages/LoginPage';
import { AppRoute } from "./components/shared/AppRoute";
import * as React from 'react';
import { Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";

export const routes = <Switch>
    <AppRoute layout={GuestLayout} exact path="/login" component={LoginPage} />
    <AppRoute layout={GuestLayout} exact path="/" component={HomePage} />
    <AppRoute layout={GuestLayout} exact path="/about" component={AboutPage} />
    <AppRoute layout={GuestLayout} exact path="/services" component={ServicesPage} />
    <AppRoute layout={GuestLayout} exact path="/contact" component={ContactPage} />
</Switch>;