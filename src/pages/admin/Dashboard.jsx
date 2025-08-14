import React from "react";
import DashboardCards from "../admin/components/admin/DashboardCards";
import Charts from "../admin/components/admin/Charts";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardCards />
      <Charts />
    </div>
  );
};
