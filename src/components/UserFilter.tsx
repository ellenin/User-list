import { Input } from "antd";

interface UserFilterProps {
  search: string;
  onSearch: (value: string) => void;
}

function UserFilter({ search, onSearch }: UserFilterProps) {
  return (
    <Input.Search
      placeholder="Поиск по имени..."
      value={search}
      onChange={(e) => onSearch(e.target.value)}
      allowClear
      style={{ minWidth: 240 }}
    />
  );
}

export default UserFilter;
