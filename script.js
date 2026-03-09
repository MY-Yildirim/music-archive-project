/* =====================================================
   FAKE AUTH SYSTEM (localStorage tabanlı)
   Bu sistem ileride .NET API ile değiştirilecek
===================================================== */

// kullanıcıyı kaydet
function registerUser() {
  const user = document.getElementById("regUser").value;
  const pass = document.getElementById("regPass").value;

  // basit kontrol
  if (!user || !pass) {
    alert("Boş bırakılamaz");
    return;
  }

  // kullanıcıyı localStorage'a kaydet
  localStorage.setItem("volifyUser", user);
  localStorage.setItem("volifyPass", pass);

  alert("Kayıt başarılı!");
  window.location.href = "login.html";
}

// giriş yap
function loginUser() {
  const user = document.getElementById("loginUser").value;
  const pass = document.getElementById("loginPass").value;

  // kayıtlı veriyi çek
  const savedUser = localStorage.getItem("volifyUser");
  const savedPass = localStorage.getItem("volifyPass");

  if (user === savedUser && pass === savedPass) {
    localStorage.setItem("volifyLoggedIn", "true");
    window.location.href = "index.html";
  } else {
    alert("Bilgiler yanlış");
  }
}

/* =====================================================
   NAVBAR USER PANEL
   Kullanıcı giriş yaptıysa göster
===================================================== */

function updateUserPanel() {
  const panel = document.getElementById("userPanel");
  if (!panel) return;

  const isLogged = localStorage.getItem("volifyLoggedIn");

  // giriş yapılmışsa
  if (isLogged === "true") {
    const user = localStorage.getItem("volifyUser");

    panel.innerHTML = `
      <span class="text-white me-2">👤 ${user}</span>
      <button class="btn btn-sm btn-danger" onclick="logout()">
        Çıkış
      </button>
    `;
  } else {
    panel.innerHTML = `
      <a href="login.html" class="btn btn-sm btn-outline-light me-2">Giriş</a>
      <a href="register.html" class="btn btn-sm btn-success">Kayıt</a>
    `;
  }
}

// çıkış
function logout() {
  localStorage.removeItem("volifyLoggedIn");
  location.reload();
}

// sayfa yüklenince çalış
updateUserPanel();