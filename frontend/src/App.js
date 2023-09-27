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

// documentation pages
import DocsOverview from "./components/documentation/DocsOverview";
import DocsDownload from "./components/documentation/DocsDownload";
import DocsQuickStart from "./components/documentation/DocsQuickStart";
import DocsLicense from "./components/documentation/DocsLicense";
import DocsFolderStructure from "./components/documentation/DocsFolderStructure";
import DocsBuild from "./components/documentation/DocsBuild";
import DocsChangelog from "./components/documentation/DocsChangelog";

// components
import Sidebar from "./components/common/Sidebar";
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

const RouteWithSidebar = ({ component: Component, ...rest }) => {
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
        <Sidebar />
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
    {/* <RouteWithLoader exact path={CustomRoutes.Presentation.path} component={Presentation} /> */}
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
      path={CustomRoutes.DashboardOverview.path}
      element={<RouteWithSidebar component={DashboardOverview} />}
    />
    <Route
      exact
      path={CustomRoutes.Presentation.path}
      element={<RouteWithSidebar component={DashboardOverview} />}
    />
    <Route
      exact
      path={CustomRoutes.Settings.path}
      element={<RouteWithSidebar component={Settings} />}
    />
    <Route
      exact
      path={CustomRoutes.AttendeeList.path}
      element={<RouteWithSidebar component={AttendeeList} />}
    />
    <Route
      exact
      path={CustomRoutes.EditAttendee.path}
      element={<RouteWithSidebar component={EditAttendee} />}
    />
    <Route
      exact
      path={CustomRoutes.OrganizerList.path}
      element={<RouteWithSidebar component={OrganizerList} />}
    />
    <Route
      exact
      path={CustomRoutes.EditOrganizer.path}
      element={<RouteWithSidebar component={EditOrganizer} />}
    />


    <Route
      exact
      path={CustomRoutes.Accordions.path}
      element={<RouteWithSidebar component={Accordion} />}
    />
    <Route
      exact
      path={CustomRoutes.Alerts.path}
      element={<RouteWithSidebar component={Alerts} />}
    />
    <Route
      exact
      path={CustomRoutes.Badges.path}
      element={<RouteWithSidebar component={Badges} />}
    />
    <Route
      exact
      path={CustomRoutes.Breadcrumbs.path}
      element={<RouteWithSidebar component={Breadcrumbs} />}
    />
    <Route
      exact
      path={CustomRoutes.Buttons.path}
      element={<RouteWithSidebar component={Buttons} />}
    />
    <Route
      exact
      path={CustomRoutes.Forms.path}
      element={<RouteWithSidebar component={Forms} />}
    />
    <Route
      exact
      path={CustomRoutes.Modals.path}
      element={<RouteWithSidebar component={Modals} />}
    />
    <Route
      exact
      path={CustomRoutes.Navs.path}
      element={<RouteWithSidebar component={Navs} />}
    />
    <Route
      exact
      path={CustomRoutes.Navbars.path}
      element={<RouteWithSidebar component={Navbars} />}
    />
    <Route
      exact
      path={CustomRoutes.Pagination.path}
      element={<RouteWithSidebar component={Pagination} />}
    />
    <Route
      exact
      path={CustomRoutes.Popovers.path}
      element={<RouteWithSidebar component={Popovers} />}
    />
    <Route
      exact
      path={CustomRoutes.Progress.path}
      element={<RouteWithSidebar component={Progress} />}
    />
    <Route
      exact
      path={CustomRoutes.Tables.path}
      element={<RouteWithSidebar component={Tables} />}
    />
    <Route
      exact
      path={CustomRoutes.Tabs.path}
      element={<RouteWithSidebar component={Tabs} />}
    />
    <Route
      exact
      path={CustomRoutes.Tooltips.path}
      element={<RouteWithSidebar component={Tooltips} />}
    />
    <Route
      exact
      path={CustomRoutes.Toasts.path}
      element={<RouteWithSidebar component={Toasts} />}
    />

    {/* documentation */}
    <Route
      exact
      path={CustomRoutes.DocsOverview.path}
      element={<RouteWithSidebar component={DocsOverview} />}
    />
    <Route
      exact
      path={CustomRoutes.DocsDownload.path}
      element={<RouteWithSidebar component={DocsDownload} />}
    />
    <Route
      exact
      path={CustomRoutes.DocsQuickStart.path}
      element={<RouteWithSidebar component={DocsQuickStart} />}
    />
    <Route
      exact
      path={CustomRoutes.DocsLicense.path}
      element={<RouteWithSidebar component={DocsLicense} />}
    />
    <Route
      exact
      path={CustomRoutes.DocsFolderStructure.path}
      element={<RouteWithSidebar component={DocsFolderStructure} />}
    />
    <Route
      exact
      path={CustomRoutes.DocsBuild.path}
      element={<RouteWithSidebar component={DocsBuild} />}
    />
    <Route
      exact
      path={CustomRoutes.DocsChangelog.path}
      element={<RouteWithSidebar component={DocsChangelog} />}
    />

    navigate(CustomRoutes.NotFound.path);
    {/* <Redirect to={CustomRoutes.NotFound.path} /> */}
  </Routes>
);

export default HomePage;