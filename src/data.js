export const obj = [
  {
    id: 1,
    name: "Dashboard",
    img: require("./Images/Sidenavbar/dashboard.svg"),
    wimg: require("./Images/Sidenavbar/wdashboard.png"),
    status: false,
    link: "dashboard",
    submenu: {
      menulist: [],
      status: false,
    },
  },
  {
    id: 2,
    name: "Dine-In",
    img: require("./Images/Sidenavbar/dinein.svg"),
    wimg: require("./Images/Sidenavbar/wdinein.png"),
    status: false,
    link: "dinein",
    submenu: {
      status: false,
      menulist: [
        {
          menuItem: "Dashboard",
          menuimg: require("./Images/Sidenavbar/dashboard.svg"),
          status: false,
          mainmenu: "dinein",
          link: "dinein/dashboard",
        },
        {
          menuItem: "Active Order",
          status: false,
          mainmenu: "dinein",
          menuimg: require("./Images/Sidenavbar/activeorder.svg"),  
        },
        {
          menuItem: "Past Order",
          status: false,
          mainmenu: "dinein",
          menuimg: require("./Images/Sidenavbar/pastorder.svg"), 
        },
        {
          menuItem: "Manage Table",
          status: false,
          mainmenu: "dinein",
          menuimg: require("./Images/Sidenavbar/managetable.svg"),
        },
      ],
    },
  },
  {
    id: 3,
    name: "KDS",
    img: require("./Images/Sidenavbar/kds.svg"),
    wimg: require("./Images/Sidenavbar/kds.svg"),
    status: false,
    link: "kds",
    submenu: {
      status: false,
      menulist: [
        {
          menuItem: "View KDS",
          status: false,
          mainmenu: "kds",
          menuimg: require("./Images/Subtract.png"),
          link: "kds/view-kds/:id",
        },
        {
          menuItem: "Create KDS",
          status: false,
          mainmenu: "kds",
          menuimg: require("./Images/KDS/createkds.png"),
          link: "kds/create-kds",
        },
      ],
    },
  },
  {
    id: 4,
    name: "Manage Menu",
    img: require("./Images/Sidenavbar/managemenu.svg"),
    wimg: require("./Images/Sidenavbar/wmanagemenu.png"),
    status: false,
    link: "manage-menu",
    submenu: {
      menulist: [],
      status: false,
    },
  },
  {
    id: 5,
    name: "Manage Category",
    img: require("./Images/Sidenavbar/managecategory.svg"),
    wimg: require("./Images/Sidenavbar/wmanagecategory.png"),
    status: false,
    link: "manage-category",
    submenu: {
      menulist: [],
      status: false,
    },
  },
  {
    id: 6,
    name: "Take Away",
    img: require("./Images/Sidenavbar/takeaway.svg"),
    wimg: require("./Images/Sidenavbar/wtakeaway.png"),
    status: false,
    link: "take-away",
    submenu: {
      status: false,
      menulist: [
        {
          menuItem: "Dashboard",
          status: false,
          mainmenu: "take-away",
          menuimg: require("./Images/Sidenavbar/dashboard.svg"),
          link: "take-away/dashboard",
        },
        {
          menuItem: "Manage Order",
          status: false,
          mainmenu: "take-away",
          menuimg: require("./Images/Sidenavbar/activeorder.svg"),
        },
      ],
    },
  },
  {
    id: 7,
    name: "Party Order",
    img: require("./Images/Sidenavbar/party.png"),
    wimg: require("./Images/Sidenavbar/wpartyorder.png"),
    status: false,
    link: "party-order",
    submenu: {
      status: false,
      menulist: [
        {
          menuItem: "Active Order",
          status: false,
          mainmenu: "party-order",
          menuimg: require("./Images/Sidenavbar/activeorder.svg"),
        },
        {
          menuItem: "Past Order",
          status: false,
          mainmenu: "party-order",
          menuimg: require("./Images/Sidenavbar/pastorder.svg"),
        },
      ],
    },
  },
  {
    id: 8,
    name: "Manage Staff",
    img: require("./Images/Sidenavbar/managestaff.png"),
    wimg: require("./Images/Sidenavbar/wmanagestaff.png"),
    status: false,
    link: "managestaff",
    submenu: {
      menulist: [],
      status: false,
    },
  },
  {
    id: 9,
    name: "Feedback",
    img: require("./Images/Sidenavbar/feedback.svg"),
    wimg: require("./Images/Sidenavbar/wfeedback.png"),
    status: false,
    link: "feedback",
    submenu: {
      menulist: [],
      status: false,
    },
  },
  {
    id: 10,
    name: "Reports",
    img: require("./Images/Sidenavbar/reports.svg"),
    wimg: require("./Images/Sidenavbar/wreports.png"),
    status: false,
    link: "reports",
    submenu: {
      menulist: [
        {
          menuItem: "Sales Report",
          status: false,
          mainmenu: "reports",
          menuimg: require("./Images/Sidenavbar/staffreport.png"),
        },
        {
          menuItem: "Staff Report",
          status: false,
          mainmenu: "reports",
          menuimg: require("./Images/Sidenavbar/staffreport.png"),
        },
      ],
      status: false,
    },
  },
  {
    id: 11,
    name: "Setting",
    img: require("./Images/Sidenavbar/setting.png"),
    wimg: require("./Images/Sidenavbar/wsetting.png"),
    status: false,
    link: "setting",
    submenu: {
      menulist: [
        {
          menuItem: "Store",
          status: false,
          mainmenu: "setting",
          menuimg: require("./Images/Sidenavbar/store.png"),
        },
        {
          menuItem: "Table",
          status: false,
          mainmenu: "setting",
          menuimg: require("./Images/Sidenavbar/table.png"),
        },
        {
          menuItem: "Discount",
          status: false,
          mainmenu: "setting",
          menuimg: require("./Images/Sidenavbar/discount.png"),
        },
      ],
      status: false,
    },
  },
];

export const waiter = [
  {
    id: 1,
    name: "Dine-In",
    img: require("./Images/Sidenavbar/dinein.svg"),
    wimg: require("./Images/Sidenavbar/wdinein.png"),
    status: false,
    link: "dinein",
    submenu: {
      status: false,
      menulist: [
        {
          menuItem: "Active Order",
          status: false,
          mainmenu: "dinein",
          menuimg: require("./Images/Sidenavbar/activeorder.svg"),
        },
        {
          menuItem: "Past Order",
          status: false,
          mainmenu: "dinein",
          menuimg: require("./Images/Sidenavbar/pastorder.svg"),
        },
        {
          menuItem: "Manage Table",
          status: false,
          mainmenu: "dinein",
          menuimg: require("./Images/Sidenavbar/managetable.svg"),
        },
      ],
    },
  },

  {
    id: 6,
    name: "Take Away",
    img: require("./Images/Sidenavbar/takeaway.svg"),
    wimg: require("./Images/Sidenavbar/wtakeaway.png"),
    status: false,
    link: "take-away",
    submenu: {
      status: false,
      menulist: [
        {
          menuItem: "Manage Order",
          status: false,
          mainmenu: "take-away",
          menuimg: require("./Images/Sidenavbar/activeorder.svg"),
        },
      ],
    },
  },
  {
    id: 7,
    name: "Party Order",
    img: require("./Images/Sidenavbar/party.png"),
    wimg: require("./Images/Sidenavbar/wpartyorder.png"),
    status: false,
    link: "party-order",
    submenu: {
      status: false,
      menulist: [
        {
          menuItem: "Active Order",
          status: false,
          mainmenu: "party-order",
          menuimg: require("./Images/Sidenavbar/activeorder.svg"),
        },
        {
          menuItem: "Past Order",
          status: false,
          mainmenu: "party-order",
          menuimg: require("./Images/Sidenavbar/pastorder.svg"),
        },
      ],
    },
  },
];
