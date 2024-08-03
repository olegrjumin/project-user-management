import { useState } from "react";
import { UserManagementPanelHeader } from "./user-management-panel-header";
import { UserManagementTable } from "./user-management-table";

export const UserManagementPanel = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  return (
    <section>
      <div className="mx-auto max-w-[716px]">
        <UserManagementPanelHeader onSearch={handleSearch} />
        <UserManagementTable query={query} />
      </div>
    </section>
  );
};
