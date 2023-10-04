import React, { useState, useEffect } from 'react';
import { Route, Routes} from "react-router-dom";
import { Routes as CustomRoutes } from "./routes";

// Admin components
import DashboardOverview from "./components/admin/DashboardOverview";
import AdminSidebar from "./components/admin/Sidebar";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Preloader from "./components/common/Preloader";
import AttendeeList from "./components/admin/AttendeeList";
import OrganizerList from "./components/admin/OrganizerList";
import EditAttendee from "./components/admin/EditAttendee";
import EditOrganizer from "./components/admin/EditOrganizer";
import AdminEventList  from './components/admin/EventList';

// common components
import Signin from "./components/common/Signin";
import Signup from "./components/common/Signup";
import ForgotPassword from "./components/common/ForgotPassword";
import ResetPassword from "./components/common/ResetPassword";
import Lock from "./components/common/Lock";
import NotFoundPage from "./components/common/NotFound";
import ServerError from "./components/common/ServerError";

// Organizer Components
import OrganizerSidebar from "./components/organizer/Sidabar";
import OrganizerDashboard from "./components/organizer/DashboardOverview";
import AddEvent from "./components/organizer/AddEvent";
import EventList from "./components/organizer/EventList";
import EditEvent from "./components/organizer/EditEvent";

// Users Components
import NavBar from './components/users/navbar';
import Home from './components/users/Home';
import Events from './components/users/Events';
import EventDetails from './components/users/EventDetails';
import UserFooter from './components/users/Footer';


const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <> <Preloader show={loaded ? false : true} /> <Component {...rest} /> </>
  );
};

const RouteWithAdminSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true;
  };

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  };

  return (
      <>
      <Preloader show={loaded ? false : true} />
        <AdminSidebar />
        <div className="content">
          <Navbar />
          <main>
            <Component {...rest} />
            <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
          </main>
        </div>
      </>
  );
};

const RouteWithOrganizerSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true;
  };

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  };

  return (
      <>
      <Preloader show={loaded ? false : true} />
        <OrganizerSidebar />
        <div className="content">
          <Navbar />
          <main>
            <Component {...rest} />
            <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
          </main>
        </div>
      </>
  );
};

const RouteWithNavBar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true;
  };

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  };

  return (
      <>
      <Preloader show={loaded ? false : true} />
        <NavBar />
        <div className="mx-0" style={{backgroundColor: "#f5f5f5"}}>
          <main>
            <Component {...rest} />
            <UserFooter />
          </main>
        </div>
      </>
  );
};

const HomePage =  () => (
  <Routes>
    <Route
      exact
      path={CustomRoutes.Signin.path}
      element={<RouteWithLoader component={Signin} />}
    />
    <Route
      exact
      path={CustomRoutes.Signup.path}
      element={<RouteWithLoader component={Signup} />}
    />
    <Route
      exact
      path={CustomRoutes.ForgotPassword.path}
      element={<RouteWithLoader component={ForgotPassword} />}
    />
    <Route
      exact
      path={CustomRoutes.ResetPassword.path}
      element={<RouteWithLoader component={ResetPassword} />}
    />
    <Route
      exact
      path={CustomRoutes.Lock.path}
      element={<RouteWithLoader component={Lock} />}
    />
    <Route
      exact
      path={CustomRoutes.NotFound.path}
      element={<RouteWithLoader component={NotFoundPage} />}
    />
    <Route
      exact
      path={CustomRoutes.ServerError.path}
      element={<RouteWithLoader component={ServerError} />}
    />

    <Route
      exact
      path={CustomRoutes.AdminDashboard.path}
      element={<RouteWithAdminSidebar component={DashboardOverview} />}
    />
    <Route
      exact
      path={CustomRoutes.AttendeeList.path}
      element={<RouteWithAdminSidebar component={AttendeeList} />}
    />
    <Route
      exact
      path={CustomRoutes.EditAttendee.path}
      element={<RouteWithAdminSidebar component={EditAttendee} />}
    />
    <Route
      exact
      path={CustomRoutes.OrganizerList.path}
      element={<RouteWithAdminSidebar component={OrganizerList} />}
    />
    <Route
      exact
      path={CustomRoutes.EditOrganizer.path}
      element={<RouteWithAdminSidebar component={EditOrganizer} />}
    />
    <Route
      exact
      path={CustomRoutes.AdminEventList.path}
      element={<RouteWithAdminSidebar component={AdminEventList} />}
    />
    <Route
      exact
      path={CustomRoutes.AdminEditEvent.path}
      element={<RouteWithAdminSidebar component={EditEvent} />}
    />
    {/* Organizer Routes */}
    <Route
      exact
      path={CustomRoutes.OrganizerDashboard.path}
      element={<RouteWithOrganizerSidebar component={OrganizerDashboard} />}
    />
    <Route
      exact
      path={CustomRoutes.AddEvents.path}
      element={<RouteWithOrganizerSidebar component={AddEvent} />}
    />
    <Route
      exact
      path={CustomRoutes.EventList.path}
      element={<RouteWithOrganizerSidebar component={EventList} />}
    />
    <Route
      exact
      path={CustomRoutes.EditEvent.path}
      element={<RouteWithOrganizerSidebar component={EditEvent} />}
    />

    {/* Users Routes */}
    <Route
      exact
      path={CustomRoutes.Home.path}
      element={<RouteWithNavBar component={Home} />}
    />
    <Route
      exact
      path={CustomRoutes.Events.path}
      element={<RouteWithNavBar component={Events} />}
    />
    <Route
      exact
      path={CustomRoutes.EventDetails.path}
      element={<RouteWithNavBar component={EventDetails} />}
    />


    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default HomePage;