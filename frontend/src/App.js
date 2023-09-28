import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate} from "react-router-dom";
import { Routes as CustomRoutes } from "./routes";

// pages
import DashboardOverview from "./pages/admin/dashboard/DashboardOverview";
// import Transactions from "./Transactions";
import Settings from "./Settings";
import Signin from "./pages/admin/examples/Signin";
import Signup from "./pages/admin/examples/Signup";
import ForgotPassword from "./pages/admin/examples/ForgotPassword";
import ResetPassword from "./pages/admin/examples/ResetPassword";
import Lock from "./pages/admin/examples/Lock";
import NotFoundPage from "./pages/admin/examples/NotFound";
import ServerError from "./pages/admin/examples/ServerError";

// components
import AdminSidebar from "./components/admin/Sidebar";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Preloader from "./components/common/Preloader";

import Accordion from "./components/admin/Accordion";
import Alerts from "./components/admin/Alerts";
import Badges from "./components/admin/Badges";
import Breadcrumbs from "./components/admin/Breadcrumbs";
import Buttons from "./components/admin/Buttons";
import Forms from "./components/admin/Forms";
import Modals from "./components/admin/Modals";
import Navs from "./components/admin/Navs";
import Navbars from "./components/admin/Navbars";
import Pagination from "./components/admin/Pagination";
import Popovers from "./components/admin/Popovers";
import Progress from "./components/admin/Progress";
import Tables from "./components/admin/Tables";
import Tabs from "./components/admin/Tabs";
import Tooltips from "./components/admin/Tooltips";
import Toasts from "./components/admin/Toasts";

import AttendeeList from "./components/admin/AttendeeList";
import OrganizerList from "./components/admin/OrganizerList";
import EditAttendee from "./components/admin/EditAttendee";
import EditOrganizer from "./components/admin/EditOrganizer";

// Organizer import
import OrganizerSidebar from "./components/organizer/Sidabar";
import OrganizerDashboard from "./pages/organizer/DashboardOverview";
import AddEvent from "./components/organizer/AddEvent";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
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
      path={CustomRoutes.Presentation.path}
      element={<RouteWithAdminSidebar component={DashboardOverview} />}
    />
    <Route
      exact
      path={CustomRoutes.Settings.path}
      element={<RouteWithAdminSidebar component={Settings} />}
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

    {/* Example Components Routes */}
    <Route
      exact
      path={CustomRoutes.Accordions.path}
      element={<RouteWithAdminSidebar component={Accordion} />}
    />
    <Route
      exact
      path={CustomRoutes.Alerts.path}
      element={<RouteWithAdminSidebar component={Alerts} />}
    />
    <Route
      exact
      path={CustomRoutes.Badges.path}
      element={<RouteWithAdminSidebar component={Badges} />}
    />
    <Route
      exact
      path={CustomRoutes.Breadcrumbs.path}
      element={<RouteWithAdminSidebar component={Breadcrumbs} />}
    />
    <Route
      exact
      path={CustomRoutes.Buttons.path}
      element={<RouteWithAdminSidebar component={Buttons} />}
    />
    <Route
      exact
      path={CustomRoutes.Forms.path}
      element={<RouteWithAdminSidebar component={Forms} />}
    />
    <Route
      exact
      path={CustomRoutes.Modals.path}
      element={<RouteWithAdminSidebar component={Modals} />}
    />
    <Route
      exact
      path={CustomRoutes.Navs.path}
      element={<RouteWithAdminSidebar component={Navs} />}
    />
    <Route
      exact
      path={CustomRoutes.Navbars.path}
      element={<RouteWithAdminSidebar component={Navbars} />}
    />
    <Route
      exact
      path={CustomRoutes.Pagination.path}
      element={<RouteWithAdminSidebar component={Pagination} />}
    />
    <Route
      exact
      path={CustomRoutes.Popovers.path}
      element={<RouteWithAdminSidebar component={Popovers} />}
    />
    <Route
      exact
      path={CustomRoutes.Progress.path}
      element={<RouteWithAdminSidebar component={Progress} />}
    />
    <Route
      exact
      path={CustomRoutes.Tables.path}
      element={<RouteWithAdminSidebar component={Tables} />}
    />
    <Route
      exact
      path={CustomRoutes.Tabs.path}
      element={<RouteWithAdminSidebar component={Tabs} />}
    />
    <Route
      exact
      path={CustomRoutes.Tooltips.path}
      element={<RouteWithAdminSidebar component={Tooltips} />}
    />
    <Route
      exact
      path={CustomRoutes.Toasts.path}
      element={<RouteWithAdminSidebar component={Toasts} />}
    />

    <Route path="*" element={<NotFoundPage />} />
    {/* <Redirect to={CustomRoutes.NotFound.path} /> */}
  </Routes>
);

export default HomePage;