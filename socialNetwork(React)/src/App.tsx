import React, {useEffect} from "react";
import Navigation from "./components/Navigation/Navigation";
import {BrowserRouter as Router, HashRouter, Redirect, Route, Switch} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Preloader from "./components/Common/Preloader";
import Error404 from "./components/Error404/Error404";
import {connect} from "react-redux";
import {initializeTC} from "./redux/appReducer";
import withSuspense from "./hoc/withSuspense";
import ArrowUp from "./components/Common/ArrowUp";
import PopUp from "./components/Common/PopUp/PopUp";
import Portal from "./components/Common/Portal";


const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));
const News = React.lazy(() => import("./components/News/NewsContainer"));
const CommunitiesContainer = React.lazy(() => import("./components/Communities/CommunitiesContainer"));


// Types
type appTypes = {
    isInitialize: boolean,
    initializeTC: () => void
}

const App = (props: appTypes) => {

    useEffect(() => {
        props.initializeTC()
    }, []);

    if(!props.isInitialize) {return <Preloader />}
    return (
        <HashRouter>
            <HeaderContainer />
            <div className="main-content">
                <div className="central-content">
                    <Navigation />
                    <div className="content">
                        <Switch>
                            <Route exact path="/" render={ () => <Redirect from={"/"} to={"/profile"} /> } />
                            <Route path="/profile/:userId?" render={ () => <ProfileContainer /> } />
                            <Route path="/news" render={ withSuspense(News) } />
                            <Route path="/users" render={ withSuspense(UsersContainer) } />
                            <Route path="/communities/:comId?" render={ withSuspense(CommunitiesContainer) } />
                            <Route path="/auth" render={ () => <LoginContainer /> } />
                            <Route path="/*" render={ () => <Error404 />} />
                        </Switch>
                    </div>
                    <ArrowUp />
                </div>
            </div>
            <Portal><PopUp /></Portal>
        </HashRouter>
    )
};

const mapStateToProps = (state) => ({
    isInitialize: state.app.isInitialize
});

export default connect(mapStateToProps, {initializeTC})(App);