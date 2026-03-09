import { useState, useEffect } from "react";
import { Layout, Button, Card, Space } from "antd";
import UsersList from "./components/UserList";
import UserFormModal from "./components/UserFormModal";
import UserFilter from "./components/UserFilter";
import type { User } from "./types/User";

import styles from "./App.module.css";

const { Header, Content } = Layout;

function App() {
  const [users, setUsers] = useState<User[]>(() => {
    const stored = localStorage.getItem("users");
    return stored ? (JSON.parse(stored) as User[]) : [];
  });

  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (user: Omit<User, "id">): void => {
    const newUser: User = {
      id: crypto.randomUUID(),
      ...user,
    };

    setUsers((prev) => [...prev, newUser]);
    setSearch("");
  };

  const updateUser = (updatedUser: User): void => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
  };

  const deleteUser = (id: string): void => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Layout className={styles.app}>
      <Header className={styles.header}>
        <h1 className={styles.title}>Список пользователей</h1>

        <Space size="middle">
          <UserFilter search={search} onSearch={setSearch} />

          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Добавить пользователя
          </Button>
        </Space>
      </Header>

      <Content className={styles.content}>
        <div className={styles.container}>
          <Card className={styles.card}>
            <div className={styles.usersScroll}>
              <UsersList
                users={filteredUsers}
                onDeleteUser={deleteUser}
                onEditUser={(user) => {
                  setEditingUser(user);
                  setIsModalOpen(true);
                }}
              />
            </div>

            <p className={styles.usersCount}>
              Показано: {filteredUsers.length} из {users.length}
            </p>
          </Card>
        </div>
      </Content>

      <UserFormModal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingUser(null);
        }}
        onAddUser={addUser}
        onUpdateUser={updateUser}
        editingUser={editingUser}
      />
    </Layout>
  );
}

export default App;
