import { useState } from "react";
import { PanelHeader } from "./header";
import { UserManagementTable } from "./user-management-table";

export const UserManagementPanel = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  return (
    <section>
      <div className="mx-auto max-w-[714px]">
        <PanelHeader onSearch={handleSearch} />
        <UserManagementTable query={query} />
      </div>
    </section>
  );
};
