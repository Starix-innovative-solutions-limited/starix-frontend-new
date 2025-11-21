"use client";

import React, { useState } from "react";

type NotificationChannel = "inApp" | "email";

interface NotificationSetting {
  inApp: boolean;
  email: boolean;
}

interface NotificationsState {
  billingAlerts: NotificationSetting;
  paymentAlerts: NotificationSetting;
  campaignMaintenance: NotificationSetting;
  newsletter: NotificationSetting;
  performanceSuggestions: NotificationSetting;
  specialOffers: NotificationSetting;
}

interface NotificationType {
  key: keyof NotificationsState;
  label: string;
}

export default function Notification() {
  const [notifications, setNotifications] = useState<NotificationsState>({
    billingAlerts: { inApp: true, email: true },
    paymentAlerts: { inApp: true, email: true },
    campaignMaintenance: { inApp: false, email: false },
    newsletter: { inApp: false, email: true },
    performanceSuggestions: { inApp: false, email: false },
    specialOffers: { inApp: false, email: false },
  });

  const toggleNotification = (
    type: keyof NotificationsState,
    channel: NotificationChannel
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [channel]: !prev[type][channel],
      },
    }));
  };

  const notificationTypes: NotificationType[] = [
    { key: "billingAlerts", label: "Billing Alerts" },
    { key: "paymentAlerts", label: "Payment Alerts" },
    { key: "campaignMaintenance", label: "Campaign Maintenance Alerts" },
    { key: "newsletter", label: "Newsletter" },
    { key: "performanceSuggestions", label: "Performance Suggestions" },
    { key: "specialOffers", label: "Special Offers" },
  ];

  return (
    <div className="mx-auto lg:px-6 bg-white">
      <h2 className="text-xl font-medium text-[#666666] mb-6">
        Choose what notifications and emails you’d like to receive
      </h2>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-white border-b border-gray-200">
          <div className="text-sm text-gray-600">Notification type</div>
          <div className="text-sm text-gray-600 text-center">
            In-app Notification
          </div>
          <div className="text-sm text-gray-600 text-center">Email</div>
        </div>

        {/* Notification Rows */}
        {notificationTypes.map((type, index) => (
          <div
            key={type.key}
            className={`grid grid-cols-3 gap-4 px-6 py-4 items-center ${
              index !== notificationTypes.length - 1
                ? "border-b border-gray-200"
                : ""
            }`}
          >
            <div className="text-sm text-gray-800">{type.label}</div>

            {/* In-app Toggle */}
            <div className="flex justify-center">
              <button
                onClick={() => toggleNotification(type.key, "inApp")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications[type.key].inApp ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications[type.key].inApp
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Email Toggle */}
            <div className="flex justify-center">
              <button
                onClick={() => toggleNotification(type.key, "email")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications[type.key].email ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications[type.key].email
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Button */}
      <div className="mt-12 flex">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Update changes
        </button>
      </div>
    </div>
  );
}
