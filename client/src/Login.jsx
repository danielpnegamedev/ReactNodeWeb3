import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const connectWallet = async () => {
    if (!window.ethereum) {
      setMessage("Please install MetaMask.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(accounts[0]);
      setMessage("Wallet connected successfully: " + accounts[0]);
    } catch (err) {
      setMessage("Wallet connection failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, wallet: walletAddress }),
      });

      const data = await response.json();

      if (response.ok) {
         setMessage("Login successful!");
         setTimeout(() => navigate("/meetings"), 1000); // pequeno delay só pra mostrar a mensagem
        
        // redirecionamento ou chamada para Meetings
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      setMessage("Server error.");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: 8,
    backgroundColor: "#1e1e1e",
    color: "#fff",
    border: "1px solid #333",
    borderRadius: 4,
  };

  const labelStyle = { color: "#fff", display: "block", marginBottom: 4 };

  return (
    <div style={{
      maxWidth: 320,
      margin: "auto",
      padding: 20,
      backgroundColor: "#121212",
      color: "#fff",
      borderRadius: 8,
    }}>
      <h2 style={{ textAlign: "center", marginTop: 70 }}>Connect your Wallet</h2>

      <button
        onClick={connectWallet}
        style={{
          padding: 10,
          width: "100%",
          backgroundColor: walletAddress ? "#4caf50" : "#ff9800",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          fontWeight: "bold",
          marginBottom: 40,
          marginTop: 30,
          alignContent: "center",
        }}
      >
        {walletAddress ? "Wallet Connected!" : "Connect Wallet"}
      </button>

      <hr style={{ border: "none", borderTop: "1px solid #464646ff", margin: "16px 0" }}/>



      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: 40, marginBottom: 12 }}>

<h2 style={{ textAlign: "center" }}>Sign In</h2>

          <label style={labelStyle}>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={!walletAddress}
        style={{
          ...inputStyle,
          opacity: !walletAddress ? 0.5 : 1,
          pointerEvents: !walletAddress ? "none" : "auto",
          borderColor: walletAddress ? "#1e1e1e" : "#313131ff",
        }}
      />

        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>Password:</label>
<input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
  disabled={!walletAddress}
  style={{
    ...inputStyle,
    opacity: !walletAddress ? 0.5 : 1,
    pointerEvents: !walletAddress ? "none" : "auto",
    borderColor: walletAddress ? "#1e1e1e" : "#313131ff",
  }}
/>

        </div>
<button
  type="submit"
  disabled={!walletAddress}
  style={{
    padding: 10,
    width: "100%",
    backgroundColor: "#6200ea",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: walletAddress ? "pointer" : "not-allowed",
    fontWeight: "bold",
    opacity: walletAddress ? 1 : 0.6,
  }}
>
  Sign In
</button>

{!walletAddress && (
  <p style={{ textAlign: "center", fontSize: 12, color: "#bbb", marginTop: 8 }}>
    Please connect your wallet to continue.
  </p>
)}

      </form>

      {message && (
        <p style={{
          marginTop: 20,
          color: message.includes("successful") ? "#4caf50" : "#f44336",
        }}>
          {message}
        </p>
      )}
    </div>
  );
}
