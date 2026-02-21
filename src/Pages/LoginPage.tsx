import { useState, type FormEvent } from "react";
import { authAPI } from "../api/client";

type Props = {
  onNavigateHome: () => void;
  onNavigateSignup: () => void;
  onLoginSuccess: () => void;
};

export default function LoginPage({ onNavigateHome, onNavigateSignup, onLoginSuccess }: Props) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!username || !password) {
      setError("Please enter a username and password.");
      return;
    }

    try {
      setLoading(true);
      const response = await authAPI.login(username, password);
      localStorage.setItem("rmc_auth", JSON.stringify(response));
      setSuccess("Logged in successfully.");
      onLoginSuccess();
    } catch (err) {
      setError("Login failed. Check your username and password.");
      console.error("Login error:", err);
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
          maxWidth: "420px",
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
            onClick={onNavigateSignup}
            style={{
              background: "transparent",
              border: "none",
              color: "#111111",
              fontSize: "0.95rem",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Create Account
          </button>
        </div>

        <h1 style={{ fontSize: "1.8rem", margin: 0, marginBottom: "0.5rem" }}>
          Log in
        </h1>
        <p style={{ margin: 0, color: "#555555", marginBottom: "1.5rem" }}>
          Access your ratings and reviews.
        </p>

        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", marginBottom: "0.75rem" }}>
            <span style={{ display: "block", marginBottom: "0.35rem", color: "#333333" }}>
              Username
            </span>
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

          <label style={{ display: "block", marginBottom: "1rem" }}>
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
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
