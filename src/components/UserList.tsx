import UserCard from "./UserCard";
import type { User } from "../types/User";
import { Empty } from "antd";

interface UserListProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (id: string) => void;
}

function UserList({ users, onEditUser, onDeleteUser }: UserListProps) {
  if (users.length === 0) {
    return <Empty description="Пользователи не найдены" />;
  }
  return (
    <>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={onEditUser}
          onDelete={onDeleteUser}
        />
      ))}
    </>
  );
}

export default UserList;
