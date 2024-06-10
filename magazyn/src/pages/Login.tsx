import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { ref, get } from "firebase/database";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = form;

    try {
      // Sprawdzenie czy użytkownik o podanym adresie email istnieje w bazie danych
      const usersRef = ref(db, "users");
      const usersSnapshot = await get(usersRef);
      let userExists = false;
      let userPassword = "";
      usersSnapshot.forEach((userSnapshot) => {
        const userData = userSnapshot.val();
        if (userData.email === email) {
          userExists = true;
          userPassword = userData.password;
        }
      });

      if (!userExists) {
        setError("Użytkownik o podanym adresie email nie istnieje");
        return;
      }

      // Porównanie hasła podanego przez użytkownika z hasłem w bazie danych
      if (password !== userPassword) {
        setError("Niepoprawne hasło");
        return;
      }

      // Logowanie użytkownika
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Użytkownik został pomyślnie zalogowany, przekieruj na odpowiednią stronę
      console.log("Logowanie pomyślne");
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
