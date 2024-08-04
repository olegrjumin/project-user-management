import { Button } from "../ui/button";
import { SearchField } from "./search-field";

interface UserManagementPanelHeaderProps {
  onSearch: (value: string) => void;
}

export const UserManagementPanelHeader: React.FC<
  UserManagementPanelHeaderProps
> = ({ onSearch }) => {
  return (
    <header className="pt-4 pb-[18px]">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-90 text-lg font-medium">Account users</h2>

        <div className="flex">
          <SearchField placeholder="Search" onChange={onSearch} />
          <Button className="ml-3 w-[124px]">Connect users</Button>
        </div>
      </div>
    </header>
  );
};
