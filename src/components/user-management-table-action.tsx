import { User } from "@/types";
import { Table } from "@tanstack/react-table";
import { EditIcon, TrashIcon } from "lucide-react";
import { ActionButton } from "./action-button";

export const UserManagementTableAction: React.FC<{
  table: Table<User>;
}> = ({ table }) => {
  const selectedCount = Object.values(table.getSelectedRowModel().rows).filter(
    (row) => row.getIsSelected()
  ).length;

  return (
    <div className="flex items-center h-8 ml-4">
      <div className="text-gray-80 font-medium leading-normal mr-6">
        {selectedCount} {selectedCount === 1 ? "user" : "users"} selected
      </div>
      {selectedCount > 0 && (
        <div className="flex space-x-2">
          <ActionButton
            onClick={() => {}}
            icon={<EditIcon className="size-4" />}
            text="Edit"
          />
          <ActionButton
            onClick={() => {}}
            icon={<TrashIcon className="size-4" />}
            text="Delete"
          />
        </div>
      )}
    </div>
  );
};
