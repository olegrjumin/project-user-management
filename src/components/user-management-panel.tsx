import { PanelHeader } from "./header";
import { UserManagementTable } from "./user-management-table";

export const UserManagementPanel = () => {
  return (
    <section>
      <div className="mx-auto max-w-[714px]">
        <PanelHeader />
        <UserManagementTable />
      </div>
    </section>
  );
};
