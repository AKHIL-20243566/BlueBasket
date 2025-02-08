document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      alert(data.message);
      window.location.href = "login.html"; // Redirect to login page
    } else {
      alert(data.error);
    }
  });
  
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      alert(data.message);
      localStorage.setItem("user", JSON.stringify(data.user)); // Store user info
      window.location.href = "index.html"; // Redirect to homepage
    } else {
      alert(data.error);
    }
  });
  