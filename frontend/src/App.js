import React, { useState, useEffect } from 'react';
import { Route, Routes} from "react-router-dom";
import { Routes as CustomRoutes } from "./routes";

// Admin Components
import DashboardOverview from "./pages/admin/Dashboard";
import AdminSidebar from "./components/admin/Sidebar";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Preloader from "./components/common/Preloader";
import AttendeeList from "./pages/admin/AttendeeList";
import OrganizerList from "./pages/admin/OrganizerList";
import EditAttendee from "./pages/admin/EditAttendee";
import EditOrganizer from "./pages/admin/EditOrganizer";
import AdminEventList  from './pages/admin/EventList';

// common components
import Signin from "./pages/common/Signin";
import Signup from "./pages/common/Signup";
import ForgotPassword from "./pages/common/ForgotPassword";
import ResetPassword from "./pages/common/ResetPassword";
import Lock from "./pages/common/Lock";
import NotFoundPage from "./pages/common/NotFound";
import ServerError from "./pages/common/ServerError";

// Organizer Components
import OrganizerSidebar from "./components/organizer/Sidabar";
import OrganizerDashboard from "./pages/organizer/Dashboard";
import AddEvent from "./pages/organizer/AddEvent";
import EventList from "./pages/organizer/EventList";
import EditEvent from "./pages/organizer/EditEvent";

// Users Components
import NavBar from './components/user/navbar';
import Home from './pages/user/Home';
import Events from './pages/user/Events';
import EventDetails from './components/user/EventDetails';
import UserFooter from './components/user/Footer';
import EventAttendeeList from "./pages/user/UserEvent";

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
    <Route
      exact
      path={CustomRoutes.EventAttendee.path}
      element={<RouteWithNavBar component={EventAttendeeList} />}
    />

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default HomePage;