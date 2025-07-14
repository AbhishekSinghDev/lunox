import InputChat from "@/components/shared/input-chat";
import { Button } from "@/components/ui/button";
import {
  Atom,
  AudioLines,
  Compass,
  Cpu,
  Globe,
  Home,
  LifeBuoy,
  MessageSquare,
  Mic,
  Paperclip,
  SearchCheck,
  Send,
} from "lucide-react";

export const CHAT_TABS = [
  {
    value: "search",
    icon: SearchCheck,
    tooltip: "Search",
    content: <InputChat placeholder="Search Anything" />,
  },
  {
    value: "research",
    icon: Atom,
    tooltip: "Research",
    content: <InputChat placeholder="Research Topic" />,
  },
];

export const CHAT_OPTIONS = [
  {
    trigger: (
      <Button variant="secondary" size="icon" className="hover:cursor-pointer">
        <Cpu className="size-4" />
      </Button>
    ),
    content: "Choose AI Model",
  },
  {
    trigger: (
      <Button variant="secondary" size="icon" className="hover:cursor-pointer">
        <Globe className="size-4" />
      </Button>
    ),
    content: "Choose Language",
  },
  {
    trigger: (
      <Button variant="secondary" size="icon" className="hover:cursor-pointer">
        <Paperclip className="size-4" />
      </Button>
    ),
    content: "Attach File",
  },
  {
    trigger: (
      <Button variant="secondary" size="icon" className="hover:cursor-pointer">
        <Mic className="size-4" />
      </Button>
    ),
    content: "Speech to Text",
  },
  {
    trigger: (
      <Button variant="default" size="icon" className="hover:cursor-pointer">
        <AudioLines className="size-4" />
      </Button>
    ),
    content: "Record Audio",
  },
];

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
