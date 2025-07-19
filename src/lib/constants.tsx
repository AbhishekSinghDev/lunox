import {
  Compass,
  Home,
  LifeBuoy,
  LucideImage,
  LucideList,
  LucidePlusSquare,
  LucideSparkles,
  LucideVideo,
  Send,
} from "lucide-react";

export const SIDEBAR = {
  navMain: [
    {
      title: "New Chat",
      url: "/",
      icon: LucidePlusSquare,
      isActive: false,
      items: [],
    },
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

export const THREAD_DETAILS_TABS = [
  {
    title: "Answer",
    icon: LucideSparkles,
  },
  {
    title: "Images",
    icon: LucideImage,
  },
  {
    title: "Videos",
    icon: LucideVideo,
  },
  {
    title: "Sources",
    icon: LucideList,
    badge: 10,
  },
] as const;
