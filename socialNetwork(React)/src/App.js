import React from "react";
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


const MessagesContainer = React.lazy(() => import("./components/Messages/MessagesContainer"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));
const News = React.lazy(() => import("./components/News/News"));


class App extends React.Component{

    componentDidMount() {
        this.props.initializeTC()
    }

    render() {
        if(!this.props.isInitialize) {return <Preloader />}
        return (
            <HashRouter> {/* basename={'/socialNetwork'} */}
                <HeaderContainer />
                <div className="main-content">
                    <div className="central-content main-content-grid">
                        <Navigation />
                        <div className="content">
                            <Switch>
                                <Route exact path="/" render={ () => <Redirect from={"/"} to={"/profile"} /> } />
                                <Route path="/profile/:userId?" render={ () => <ProfileContainer /> } />
                                <Route path="/news" render={ withSuspense(News) } />
                                <Route path="/messages" render={ withSuspense(MessagesContainer) } />
                                <Route path="/users" render={ withSuspense(UsersContainer) } />
                                <Route path="/auth" render={ () => <LoginContainer /> } />
                                <Route path="/*" render={ () => <Error404 />} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

const mapStateToProps = (state) => ({
    isInitialize: state.app.isInitialize
});

export default connect(mapStateToProps, {initializeTC})(App);