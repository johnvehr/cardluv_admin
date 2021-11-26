import {
  Bell,
  BookOpen,
  Calendar,
  CheckSquare,
  Grid,
  Heart,
  Layout,
  List,
  PieChart,
  Sliders,
  MapPin,
  Users,
  Share,
} from "react-feather";

const pagesSection = [
  {
    href: "/admin",
    icon: Sliders,
    title: "Operations",
    badge: "4",
    children: [
      {
        href: "/admin/cards",
        title: "Cards",
      },
      {
        href: "/admin/cards",
        title: "Bracelets",
      },
      {
        href: "/admin/cards",
        title: "Orders",
      },
      {
        href: "/admin/cards",
        title: "Customers",
      }
    ],
  }
];

const navItems = [
  {
    title: "Pages",
    pages: pagesSection,
  }
];

export default navItems;
