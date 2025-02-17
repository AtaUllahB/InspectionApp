import {
  BookOpen,
  Briefcase,
  Calendar,
  CheckSquare,
  CreditCard,
  Grid,
  Heart,
  Layout,
  List,
  Map,
  ShoppingCart,
  PieChart,
  Sliders,
  Users,
} from 'react-feather'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
const pagesSection = [
  {
    href: '/dashboard',
    icon: Sliders,
    title: 'Dashboard',
    children: [
      {
        href: '/dashboard/admin',
        title: 'Admin',
      },
    ],
  },
 
  {
    href: '/tables',
    icon: PeopleOutlinedIcon,
    title: 'Users',
    children: [
      {
        href: '/tables/data-grid',
        title: 'Inspectors',
      },
    ],
  },
  {
    href: '/tables',
    icon: Diversity3OutlinedIcon,
    title: 'Customer',
    children: [
      {
        href: '/tables/customer-grid',
        title: 'Customer',
      },
    ],
  },
  {
    href: '/tables',
    icon: QueryStatsOutlinedIcon,
    title: 'Inspections',
    children: [
      {
        href: '/tables/inspection-grid',
        title: 'Inspections',
      },
    ],
  },
  // {
  //   href: "/projects",
  //   icon: Briefcase,
  //   title: "Projects",
  //   badge: "8",
  // },
  // {
  //   href: "/orders",
  //   icon: ShoppingCart,
  //   title: "Orders",
  // },
  // {
  //   href: "/invoices",
  //   icon: CreditCard,
  //   title: "Invoices",
  //   children: [
  //     {
  //       href: "/invoices",
  //       title: "List",
  //     },
  //     {
  //       href: "/invoices/detail",
  //       title: "Detail",
  //     },
  //   ],
  // },
  // {
  //   href: "/tasks",
  //   icon: CheckSquare,
  //   title: "Tasks",
  //   badge: "17",
  // },
  // {
  //   href: "/calendar",
  //   icon: Calendar,
  //   title: "Calendar",
  // },
  // {
  //   href: '/auth',
  //   icon: Users,
  //   title: 'Auth',
  //   // children: [
  //   //   // {
  //   //   //   href: "/auth/sign-in",
  //   //   //   title: "Sign In",
  //   //   // },
  //   //   // {
  //   //   //   href: '/auth/sign-up',
  //   //   //   title: 'Register Inspector',
  //   //   // },
  //   //   // {
  //   //   //   href: "/auth/reset-password",
  //   //   //   title: "Reset Password",
  //   //   // },
  //   //   // {
  //   //   //   href: "/auth/404",
  //   //   //   title: "404 Page",
  //   //   // },
  //   //   // {
  //   //   //   href: "/auth/500",
  //   //   //   title: "500 Page",
  //   //   // },
  //   // ],
  // },
]

const elementsSection = [
  {
    href: '/components',
    icon: Grid,
    title: 'Components',
    children: [
      //   {
      //     href: "/components/alerts",
      //     title: "Alerts",
      //   },
      //   {
      //     href: "/components/accordion",
      //     title: "Accordion",
      //   },
      //   {
      //     href: "/components/avatars",
      //     title: "Avatars",
      //   },
      //   {
      //     href: "/components/badges",
      //     title: "Badges",
      //   },
      //   {
      //     href: "/components/buttons",
      //     title: "Buttons",
      //   },
      //   {
      //     href: "/components/cards",
      //     title: "Cards",
      //   },
      //   {
      //     href: "/components/chips",
      //     title: "Chips",
      //   },
      //   {
      //     href: "/components/dialogs",
      //     title: "Dialogs",
      //   },
      //   {
      //     href: "/components/lists",
      //     title: "Lists",
      //   },
      //   {
      //     href: "/components/menus",
      //     title: "Menus",
      //   },
      //   {
      //     href: "/components/pagination",
      //     title: "Pagination",
      //   },
      //   {
      //     href: "/components/progress",
      //     title: "Progress",
      //   },
      //   {
      //     href: "/components/snackbars",
      //     title: "Snackbars",
      //   },
      //   {
      //     href: "/components/tooltips",
      //     title: "Tooltips",
      //   },
    ],
  },
  {
    href: '/charts',
    icon: PieChart,
    title: 'Charts',
    children: [
      // {
      //   href: "/charts/chartjs",
      //   title: "Chart.js",
      // },
      // {
      //   href: "/charts/apexcharts",
      //   title: "ApexCharts",
      // },
    ],
  },
  {
    href: '/forms',
    icon: CheckSquare,
    title: 'Forms',
    children: [
      // {
      //   href: "/forms/pickers",
      //   title: "Pickers",
      // },
      // {
      //   href: "/forms/selection-controls",
      //   title: "Selection Controls",
      // },
      // {
      //   href: "/forms/selects",
      //   title: "Selects",
      // },
      // {
      //   href: "/forms/text-fields",
      //   title: "Text Fields",
      // },
      // {
      //   href: "/forms/editors",
      //   title: "Editors",
      // },
      // {
      //   href: "/forms/formik",
      //   title: "Formik",
      // },
    ],
  },

  {
    href: '/icons',
    icon: Heart,
    title: 'Icons',
    children: [
      // {
      //   href: "/icons/material-icons",
      //   title: "Material Icons",
      // },
      // {
      //   href: "/icons/feather-icons",
      //   title: "Feather Icons",
      // },
    ],
  },
  {
    href: '/maps',
    icon: Map,
    title: 'Maps',
    children: [
      // {
      //   href: "/maps/google-maps",
      //   title: "Google Maps",
      // },
      // {
      //   href: "/maps/vector-maps",
      //   title: "Vector Maps",
      // },
    ],
  },
]

const docsSection = [
  // {
  //   href: "/documentation/welcome",
  //   icon: BookOpen,
  //   title: "Documentation",
  // },
  // {
  //   href: "/changelog",
  //   icon: List,
  //   title: "Changelog",
  //   badge: "v4.5.0",
  // },
]

const navItems = [
  {
    title: 'Pages',
    pages: pagesSection,
  },
  // {
  //   title: "Elements",
  //   pages: elementsSection,
  // },
  // {
  //   title: "Mira Pro",
  //   pages: docsSection,
  // },
]

export default navItems
