
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";

// USER LIST COMPONENT
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>User List</h1>

      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>
            {user.name}
          </Link>
        </div>
      ))}
    </div>
  );
}


// USER DETAILS COMPONENT
function UserDetails() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user || !user.id) {
    return <h2>User not found!</h2>;
  }

  return (
    <div>
      <h1>User Profile</h1>

      <h2>{user.name}</h2>

      <p><b>Username:</b> {user.username}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Phone:</b> {user.phone}</p>
      <p><b>Website:</b> {user.website}</p>

      <h3>Address</h3>
      <p>{user.address.street}, {user.address.city}</p>

      <h3>Company</h3>
      <p>{user.company.name}</p>

      <Link to="/">Back to Users</Link>
    </div>
  );
}


// MAIN APP COMPONENT
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<UserList />} />

        <Route
          path="/users/:id"
          element={<UserDetails />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
