import { useState } from "react";
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      
      const userRef = ref(db, "users/" + user.uid); 
      const userDataSnapshot = await get(userRef); 
      if (userDataSnapshot.exists()) {
        const userData = userDataSnapshot.val();
        if (userData.password === password) {
          console.log("Logowanie pomyślne");
        } else {
          setError("Niepoprawne hasło");
        }
      } else {
        setError("Użytkownik nie istnieje");
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
