
export const Routes = {
    // pages
    Home: { path: "/" },

    // admin paths
    AdminDashboard: { path: "/admin/dashboard" },
    AttendeeList: { path: "/admin/attendees" },
    EditAttendee : { path: "/admin/edit-attendee"},
    EditOrganizer : { path: "/admin/edit-organizer"},
    OrganizerList: { path: "/admin/orgaizers" },
    AdminEventList: { path: "/admin/events" },
    AdminEditEvent : { path: "/admin/edit-event"},

    // common paths
    Billing: { path: "/billing" },
    Invoice: { path: "/invoice" },
    Signin: { path: "/sign-in" },
    Signup: { path: "/sign-up" },
    ForgotPassword: { path: "/forgot-password" },
    ResetPassword: { path: "/reset-password" },
    Lock: { path: "/lock" },
    NotFound: { path: "/404" },
    ServerError: { path: "/500" },

    // organizer paths
    OrganizerDashboard: { path: "/organizer/dashboard" },
    AddEvents: { path: "/organizer/events/add" },
    EventList: { path: "/organizer/events" },
    EditEvent : { path: "/organizer/edit-event"},    

    // user paths
    Events: { path: "/events" },
    EventDetails: { path: "/events-details" },
    AttendeeEvents: { path: "/my-events"},
    EventAttendee: { path: "/events-attendee/:eventId"}, 


};