import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };
  let navigate = useNavigate();

  const onSwitchToSignup = (e) => {
    e.preventDefault();
    navigate('/signup');
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    alert(formData.email)
    alert(formData.password)

    const response = await fetch(`${props.backendurl}/api/v1/auth/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({email:formData.email,password:formData.password}),
    });
    // alert(response)
    
    const json=await response.json()
    alert(`auth token : ${json.authtoken}`);
    if(json.success===true){
      localStorage.setItem('token',json.authtoken)
      //props.showAlert("Logged In successfully","success")
      alert("Logged In Successfully")
      console.log("Logged in Successfully")
      navigate('/')
    }else{
      console.log("Login unsuccessfull")
      alert("Login Unsuccessfull")
    }
  };

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
        overflow: "hidden",
        width: "100%",
        maxWidth: "400px",
        position: "relative"
      }}>
        <div style={{
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          color: "white",
          padding: "30px 20px 20px",
          textAlign: "center"
        }}>
          <h1 style={{
            fontSize: "28px",
            fontWeight: "700",
            marginBottom: "8px",
            margin: "0 0 8px 0"
          }}>📰 NewsApp</h1>
          <p style={{
            opacity: "0.9",
            fontSize: "16px",
            margin: "0"
          }}>Welcome back! Sign in to continue</p>
        </div>

        <div style={{ padding: "30px" }}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              color: "#374151",
              fontWeight: "500",
              fontSize: "14px"
            }}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                fontSize: "16px",
                transition: "all 0.3s ease",
                background: "#f9fafb",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6";
                e.target.style.background = "white";
                e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.background = "#f9fafb";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              color: "#374151",
              fontWeight: "500",
              fontSize: "14px"
            }}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                fontSize: "16px",
                transition: "all 0.3s ease",
                background: "#f9fafb",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6";
                e.target.style.background = "white";
                e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.background = "#f9fafb";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {error && (
            <div style={{
              color: "#ef4444",
              fontSize: "14px",
              marginTop: "5px",
              marginBottom: "15px"
            }}>{error}</div>
          )}

          {success && (
            <div style={{
              color: "#10b981",
              fontSize: "14px",
              marginTop: "5px",
              marginBottom: "15px"
            }}>{success}</div>
          )}

          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              marginBottom: "20px",
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              color: "white"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 10px 25px rgba(59, 130, 246, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            Sign In
          </button>

          <div className="d-flex align-items-center my-3 Login-or">
            <hr className="flex-grow-1" />
            <span className="px-2 text-muted">New to NewsApp?</span>
            <hr className="flex-grow-1" />
          </div>

          <button
            onClick={onSwitchToSignup}
            style={{
              width: "100%",
              padding: "14px",
              border: "2px solid #e5e7eb",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              background: "#f3f4f6",
              color: "#374151"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#e5e7eb";
              e.target.style.borderColor = "#d1d5db";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#f3f4f6";
              e.target.style.borderColor = "#e5e7eb";
            }}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;