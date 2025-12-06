import { useState, useEffect } from "react";

const TabbedInterface = ({ info_for_id, type }) => {
  console.log(type);
  const renderContent = () => {
    switch (activeTab) {
      case "wiki":
        return (
          <div dangerouslySetInnerHTML={{ __html: info_for_id.description }} />
        );
      case "video":
        return <div>Video Content</div>;
      case "images":
        return <div>Images Content</div>;
      case "forum":
        return <div>Forum Content</div>;
      default:
        return <div>Default Content</div>;
    }
  };

  const tabs = [
    {
      id: "wiki",
      label: "Character Wiki",
      content: "Welcome to the Home tab! This is where you start your journey.",
    },
    {
      id: "about",
      label: "Videos",
      content:
        "Learn more about us in the About section. We are dedicated to creating great experiences.",
    },
    {
      id: "services",
      label: "Images",
      content:
        "Explore our Services: Web Development, Design, and Consulting solutions.",
    },
    {
      id: "contact",
      label: "Forum",
      content:
        "Get in touch with us! Email: contact@example.com | Phone: (555) 123-4567",
    },
  ];

  const [activeTab, setActiveTab] = useState("wiki");

  useEffect(() => {
    // Read URL hash on mount
    const hash = window.location.hash.slice(1);
    if (hash && tabs.find((tab) => tab.id === hash)) {
      setActiveTab(hash);
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1);
      if (newHash && tabs.find((tab) => tab.id === newHash)) {
        setActiveTab(newHash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    window.location.hash = tabId;
  };

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div>
      <div className="max-w-5xl mx-auto shadow-lg overflow-hidden">
        {/* Tab Headers */}
        <div className="flex ">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex-1 px-6 py-1 font-medium transition-all border-x-indigo-500 ${
                activeTab === tab.id
                  ? "bg-[grey] text-white border-b-2 border-indigo-600"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {activeTabData.label}
          </h2>
          <div className="text-gray-600 text-lg leading-relaxed">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabbedInterface;
