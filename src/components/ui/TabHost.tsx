import { createContext, forwardRef, ReactNode, useContext, useState } from "react";

interface HostProps {
  children: ReactNode;
  defaultActiveTab: number;
}

interface TabContextProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const TabContext = createContext<TabContextProps | undefined>(undefined);

const TabHost = forwardRef<HTMLDivElement, HostProps>(({ children, defaultActiveTab = 0 }, ref) => {
  const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div ref={ref}>{children}</div>
    </TabContext.Provider>
  );
});

TabHost.displayName = "TabHost";

interface TabItemProps {
  index: number;
  children: ReactNode;
}

const TabItem = forwardRef<HTMLDivElement, TabItemProps>(({ index, children }, ref) => {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error("TabItem must be used within a TabHost");
  }

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === index;

  return (
    <div
      ref={ref}
      onClick={() => setActiveTab(index)}
      style={{ display: isActive ? "block" : "none" }}
    >
      {children}
    </div>
  );
});

TabItem.displayName = "TabItem";

export default { TabHost, TabItem };
