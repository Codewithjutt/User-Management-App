
import { useEffect, useState } from "react";
import type {
  ChangeEvent,
  FormEvent
} from "react";

import { UserCard } from "./UserCard";
import type { User } from "./types";
import "./App.css";

function App() {

  // 1. STATE MANAGEMENT

  const [users, setUsers] = useState<User[]>([]);

  const [name, setName] = useState<string>("");

  const [email, setEmail] = useState<string>("");

  const [search, setSearch] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  const [update, setUpdate] = useState<User | null>(null);

  const [updateLoading, setUpdateLoading] = useState<boolean>(true)
  // 2. FETCH USERS FROM API
  useEffect(() => {

    const fetchUsers = async () => {

      try {

        setLoading(true);

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data: User[] = await response.json();

        setUsers(data);

      } catch (err) {

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong"
        );

      } finally {

        setLoading(false);

      }

    };

    fetchUsers();

  }, []);
  // 3. INPUT CHANGE HANDLERS
  const handleNameChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value);
  };
  const handleEmailChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };
  const handleSearchChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target.value);
  };
  // 4. ADD NEW USER
  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();

    const newUser: User = {
      id: Date.now(),
      name: name,
      email: email
    };

    setUsers((currentUsers) => [
      ...currentUsers,
      newUser
    ]);

    setName("");
    setEmail("");

  };
  // 5. DELETE USER
  const Delete = (id: number) => {

    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== id)
    );

  };
  // 6. SEARCH USERS
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(
      search.toLowerCase()
    )
  );
  //   8 update Users 
  const updateUsers = (id: number) => {
    const selectedUser = users.find((e) => e.id === id)
    console.log(selectedUser, "Slected user")
    if (selectedUser) {
      setUpdate(selectedUser)
      setName(selectedUser.name)
      setEmail(selectedUser.email)
      setUpdateLoading(false)
    }
  }
  // Save Button >
  const handleSave = () => {
    if(!update){
      console.log("No user stored in your ")
      return;
    }
    setUsers((prevuser) => prevuser.map((user) => user.id === update.id ? { ...user,name:name,email:email } : user))
    console.log("save Clicked....", "Your New name and Email:  ", name, email)
    setName("")
    setEmail("")
    setUpdateLoading(true)
  }

  // 7. DISPLAY APPLICATION

  return (

    <div className="container">

      <h1>User Management App</h1>

      <p>Manage your users with React and TypeScript.</p>


      {/* ADD USER FORM */}

      <form onSubmit={handleSubmit} className="user-form">

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={handleNameChange}
          required
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
          required
        />

        <button type="submit">
          Add User
        </button>

      </form>


      {/* SEARCH INPUT */}

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={handleSearchChange}
        className="search-input"
      />


      {/* LOADING */}

      {loading && <p>Loading users...</p>}


      {/* ERROR */}

      {error && <p className="error">{error}</p>}

      {!updateLoading && (
        <div className="update">
          <p>Update Now!</p>
          <button onClick={handleSave}>Save</button>
          <button>Cancel</button>
        </div>
      )}
      {/* USER LIST */}

      {!loading && !error && (

        <div className="user-list">

          {filteredUsers.length > 0 ? (

            filteredUsers.map((user) => (

              <UserCard
                key={user.id}
                user={user}
                Delete={Delete}
                Update={updateUsers}
              />

            ))

          ) : (

            <p>No users found.</p>

          )}

        </div>

      )}

    </div>

  );

}

export default App;
