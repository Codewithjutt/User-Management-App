import type { User } from "./types";

interface UserCardProps {
  user: User;
  Delete: (id: number) => void;
  Update: (id: number) => void;
}

export function UserCard({
  user,
  Delete,
  Update
}: UserCardProps) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>

      <button onClick={() => Update(user.id)}>
        Edit User
      </button>

      <button onClick={() => Delete(user.id)}>
        Delete
      </button>
    </div>
  );
}