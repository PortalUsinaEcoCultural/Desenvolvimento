document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.querySelector("input[name='email']").value;
    const senha = document.querySelector("input[name='senha']").value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem("loggedIn", "true");
            alert(data.message);
            window.location.href = "/HTML/admin.html";
        } else {
            alert("Login falhou: " + data.message);
        }
    })
    .catch(error => {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao tentar fazer login.");
    });
});