import { SearchField } from "./search-field";
import { Button } from "./ui/button";

export const PanelHeader = () => {
  return (
    <header className="pt-4 pb-[18px]">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-90 text-lg font-medium">Account users</h2>

        <div className="flex">
          <SearchField placeholder="Search" />
          <Button className="ml-3 w-[124px]">Connect users</Button>
        </div>
      </div>
    </header>
  );
};
