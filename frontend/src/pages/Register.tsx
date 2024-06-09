import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, onValue } from "firebase/database";
import { auth, db } from "../firebaseConfig";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [maxId, setMaxId] = useState<number | null>(null);

  useEffect(() => {
    const fetchMaxId = async () => {
      try {
        const usersRef = ref(db, "users");
        onValue(usersRef, (snapshot) => {
          let max = 0;
          snapshot.forEach((childSnapshot) => {
            const userId = childSnapshot.key;
            if (userId) {
              const id = parseInt(userId);
              if (id > max) {
                max = id;
              }
            }
          });
          setMaxId(max);
        });
      } catch (err) {
        console.error("Error fetching max ID:", err);
      }
    };

    fetchMaxId();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { firstName, lastName, username, email, password } = form;

    if (maxId !== null) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log(user)

        await set(ref(db, `users/${maxId + 1}`), {
          firstName,
          lastName,
          position: "client",
          username,
          email,
        });
      } catch (err: any) {
        setError(err.message);
      }
    } else {
      console.error("Max ID is null");
    }
  };
  

  return (
    <div>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;