import { Modal, Form, Input, InputNumber, Button } from "antd";
import type { User } from "../types/User";
import { useEffect } from "react";

interface UserFormModalProps {
  open: boolean;
  onCancel: () => void;
  onAddUser: (user: Omit<User, "id">) => void;
  editingUser?: User | null;
  onUpdateUser?: (user: User) => void;
}

function UserFormModal({
  open,
  onCancel,
  onAddUser,
  editingUser,
  onUpdateUser,
}: UserFormModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingUser) {
      form.setFieldsValue(editingUser);
    } else {
      form.resetFields();
    }
  }, [editingUser, form]);

  const handleFinish = (values: Omit<User, "id">) => {
    if (editingUser) {
      onUpdateUser?.({ ...editingUser, ...values });
    } else {
      onAddUser(values);
    }

    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={
        editingUser ? "Редактировать пользователя" : "Добавить пользователя"
      }
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form<Omit<User, "id">>
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Имя"
          name="name"
          rules={[
            { required: true, message: "Введите имя" },
            { min: 2, message: "Минимум 2 символа" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Возраст"
          name="age"
          rules={[
            { required: true, message: "Введите возраст" },
            { type: "number", min: 1, max: 120, message: "Возраст 1–120" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Введите email" },
            { type: "email", message: "Некорректный email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {editingUser ? "Сохранить" : "Добавить"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UserFormModal;
