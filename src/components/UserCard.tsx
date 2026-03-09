import { Card, Button, Popconfirm, message } from "antd";
import type { User } from "../types/User";

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <Card title={user.name} style={{ marginBottom: 16 }}>
      <p>
        <strong>Возраст:</strong> {user.age}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <Button
        type="default"
        style={{ marginRight: 8 }}
        onClick={() => onEdit(user)}
      >
        Редактировать
      </Button>

      <Popconfirm
        title="Удалить пользователя?"
        description="Это действие нельзя отменить"
        onConfirm={() => {
          onDelete(user.id);
          message.success("Пользователь удалён");
        }}
        okText="Да"
        cancelText="Нет"
      >
        <Button danger>Удалить</Button>
      </Popconfirm>
    </Card>
  );
}

export default UserCard;
