import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Login: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = form;

    try {
      const usersRef = ref(db, "users");
      const usersSnapshot = await get(usersRef);
      let userExists = false;
      let userData: any = null;
      usersSnapshot.forEach((userSnapshot) => {
        const user = userSnapshot.val();
        if (user.email === email) {
          userExists = true;
          userData = user;
        }
      });

      if (!userExists) {
        setError("Użytkownik o podanym adresie email nie istnieje");
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user && userData) {
        setUser(userData);
        navigate("/warehouse");
      } else {
        setError("Wystąpił problem podczas logowania");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
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
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
