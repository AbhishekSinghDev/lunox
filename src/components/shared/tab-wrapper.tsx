import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";
import TooltipWrapper from "./tooltip-wrapper";

interface TabItem {
  value: string;
  icon: LucideIcon;
  tooltip: string;
  content: ReactNode;
}

interface TabWrapperProps {
  tabs: TabItem[];
  defaultValue: string;
  withSeparator?: boolean;
}

const TabWrapper = ({ tabs, defaultValue }: TabWrapperProps) => {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
      <TabsList className="dark:bg-background">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            <TooltipWrapper
              trigger={
                <button>
                  <tab.icon />
                </button>
              }
              content={tab.tooltip}
              asChild
            />
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default TabWrapper;
