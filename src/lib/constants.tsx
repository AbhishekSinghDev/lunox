import { Compass, Home, LifeBuoy, Send } from "lucide-react";

export const SIDEBAR = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "Finance",
          url: "/finance",
        },
        {
          title: "Travel",
          url: "/travel",
        },
        {
          title: "Academic",
          url: "/academic",
        },
      ],
    },
    {
      title: "Discover",
      url: "/discover",
      icon: Compass,
      items: [
        {
          title: "For You",
          url: "/discover/for-you",
        },
        {
          title: "Top",
          url: "/discover/top",
        },
        {
          title: "Tech & Science",
          url: "/discover/tech-and-science",
        },
        {
          title: "Finance",
          url: "/discover/finance",
        },
        {
          title: "Arts & Culture",
          url: "/discover/arts-and-culture",
        },
        {
          title: "Health & Fitness",
          url: "/discover/health-and-fitness",
        },
        {
          title: "Entertainment",
          url: "/discover/entertainment",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: Send,
    },
  ],
};
