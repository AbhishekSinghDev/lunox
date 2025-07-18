import { Compass, Home, LifeBuoy, MessageSquare, Send } from "lucide-react";

export const SIDEBAR = {
  user: {
    name: "Abhishek",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
  threadHistory: [
    {
      name: "Thread title 1",
      url: "/thread/1",
      icon: MessageSquare,
    },
    {
      name: "Thread title 2",
      url: "/thread/2",
      icon: MessageSquare,
    },
    {
      name: "Thread title 3",
      url: "/thread/3",
      icon: MessageSquare,
    },
  ],
};
