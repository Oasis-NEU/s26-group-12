import { useState, type FormEvent } from "react";
import { authAPI } from "../api/client";

type Props = {
  onNavigateHome: () => void;
  onNavigateLogin: () => void;
};

export default function SignupPage({ onNavigateHome, onNavigateLogin }: Props) {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isStudent, setIsStudent] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !username || !password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);
      await authAPI.register(email, username, password, isStudent);
      setSuccess("Account created. You can log in now.");
    } catch (err) {
      setError("Sign up failed. Try a different email or username.");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f6f6f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.12)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <button
            onClick={onNavigateHome}
            style={{
              background: "transparent",
              border: "none",
              color: "#111111",
              fontSize: "0.95rem",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Back to Home
          </button>
          <button
            onClick={onNavigateLogin}
            style={{
              background: "transparent",
              border: "none",
              color: "#111111",
              fontSize: "0.95rem",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Log in
          </button>
        </div>

        <h1 style={{ fontSize: "1.8rem", margin: 0, marginBottom: "0.5rem" }}>
          Create account
        </h1>
        <p style={{ margin: 0, color: "#555555", marginBottom: "1.5rem" }}>
          Join the community and share reviews.
        </p>

        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", marginBottom: "0.75rem" }}>
            <span style={{ display: "block", marginBottom: "0.35rem", color: "#333333" }}>
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@northeastern.edu"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "10px",
                border: "1px solid #dddddd",
                fontSize: "1rem",
              }}
            />
          </label>

          <label style={{ display: "block", marginBottom: "0.75rem" }}>
            <span style={{ display: "block", marginBottom: "0.35rem", color: "#333333" }}
              >Username</span>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="yourusername"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "10px",
                border: "1px solid #dddddd",
                fontSize: "1rem",
              }}
            />
          </label>

          <label style={{ display: "block", marginBottom: "0.75rem" }}>
            <span style={{ display: "block", marginBottom: "0.35rem", color: "#333333" }}>
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "10px",
                border: "1px solid #dddddd",
                fontSize: "1rem",
              }}
            />
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <input
              type="checkbox"
              checked={isStudent}
              onChange={(event) => setIsStudent(event.target.checked)}
            />
            Northeastern student
          </label>

          {error && (
            <div style={{ color: "#b00020", marginBottom: "0.75rem" }}>{error}</div>
          )}
          {success && (
            <div style={{ color: "#0a7b45", marginBottom: "0.75rem" }}>{success}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.85rem",
              borderRadius: "999px",
              border: "none",
              backgroundColor: "#111111",
              color: "#ffffff",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
