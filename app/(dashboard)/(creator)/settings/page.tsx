/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import { useSearchParams } from "next/navigation";
import React, { useState, Suspense } from "react";
import MyDetails from "@/components/Profile/MyDetails";
import BillingInfo from "@/components/Profile/BillingInfo";
import Notifications from "@/components/Profile/Notifications";
import Password2FA from "@/components/Profile/Password2FA";
import ProfileForm from "@/components/Profile/ProfileForm";
import Loader from "@/components/Loader";

interface TabsNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { id: "my-details", label: "My details" },
  { id: "profile", label: "Profile" },
  { id: "password", label: "Password & 2FA" },
  { id: "billing", label: "Billing" },
  { id: "notifications", label: "Email & Notifications" },
];

const TabsNav: React.FC<TabsNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const Page = () => {
  const [activeTab, setActiveTab] = useState<any>("my-details");

  return (
    <Suspense fallback={<Loader />}>
      <div className="min-h-screen mx-auto md:px-6">
        {/* Tabs Navigation */}
        <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Tab Content */}
        <div className="bg-white  p-8 md:px-16">
          {activeTab === "my-details" && <MyDetails />}
          {activeTab === "profile" && <ProfileForm />}
          {activeTab === "password" && <Password2FA />}
          {activeTab === "billing" && <BillingInfo />}
          {activeTab === "notifications" && <Notifications />}
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
