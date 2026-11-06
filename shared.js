/**
 * shared.js — Hệ Thống Văn Bằng Số Đại Học Huế (HUE Soulbound Token)
 * Hỗ trợ Web3 & MetaMask Thật 100% (Sepolia Testnet / Chain ID 11155111)
 */

const SEPOLIA_CHAIN_ID_HEX = "0xaa36a7"; // 11155111
const SEPOLIA_CHAIN_ID_DEC = 11155111;

const BADGE_TYPES = {
  1:  { title: "Sinh viên 5 tốt tiêu biểu cấp Đại học Huế",       icon: "🏆", desc: "Đạt thành tích Xuất sắc trong 5 tiêu chí: Đạo đức, Học tập, Thể lực, Tình nguyện, Hội nhập tốt." },
  2:  { title: "Thủ khoa tốt nghiệp Xuất sắc Khóa K58",           icon: "💡", desc: "Thành tích học tập Thủ khoa toàn khóa đào tạo với điểm học tập và rèn luyện xuất sắc dẫn đầu." },
  3:  { title: "Học bổng Khuyến tài Doanh nghiệp Bảo trợ",        icon: "🎖️", desc: "Sinh viên vượt khó đạt thành tích xuất sắc, được các tập đoàn tài chính/công nghệ bảo trợ." },
  4:  { title: "Giải Nhất NCKH Sinh viên HUE 2026",                icon: "🔬", desc: "Đề tài ứng dụng công nghệ Blockchain trong minh bạch hóa tài chính giáo dục công lập." },
  5:  { title: "Quán quân Cuộc thi Khởi nghiệp HUE Startup",      icon: "🚀", desc: "Dự án khởi nghiệp đổi mới sáng tạo xuất sắc nhất toàn Đại học Huế năm 2026." },
  6:  { title: "Giải Nhất Olympic Tin học & Công nghệ Web3",       icon: "💻", desc: "Giải Nhất cuộc thi Lập trình giải thuật và Ứng dụng Hợp đồng thông minh phân tán." },
  7:  { title: "Cán bộ Đoàn - Hội xuất sắc tiêu biểu HUE",       icon: "🌟", desc: "Thành tích đặc biệt xuất sắc trong công tác Đoàn và phong trào Thanh niên HUE 2024-2026." },
  8:  { title: "Chiến sĩ Tình nguyện Xuất sắc Mùa hè Xanh",      icon: "🎗️", desc: "Cống hiến nổi bật vì cộng đồng tại vùng cao, biên giới và hải đảo miền Trung." },
  9:  { title: "Huy hiệu Tôn vinh Hiến máu Nhân đạo (≥5 lần)",   icon: "🩸", desc: "Hiến máu tình nguyện cứu người liên tục từ 5 lần trở lên trong thời gian học tập." },
  10: { title: "Chứng chỉ Xuất sắc Kỹ sư Smart Contract ECO2432", icon: "📜", desc: "Hoàn thành xuất sắc khóa phát triển Smart Contract, vượt qua Gate Review và Audit bảo mật." }
};

const STUDENT_ACCOUNTS = {
  "23K4300014": { password: "hue@2026", name: "Phan Thị Yến Nhi" },
  "23K4300028": { password: "hue@2026", name: "Nguyễn Quốc Bảo" },
  "23K4300085": { password: "hue@2026", name: "Lê Thị Diệu Linh" },
};

const ADMIN_ACCOUNTS = {
  "admin.hue": { password: "admin@2026", displayName: "Hội đồng Khen thưởng — Đại học Huế" },
  "giam.doc":  { password: "admin@2026", displayName: "Ban Giám đốc Đại học Huế" },
};

const ENTERPRISE_ACCOUNTS = {
  "DN001": { password: "verify@2026", displayName: "FPT Software — Nhà tuyển dụng đối tác" },
  "DN002": { password: "verify@2026", displayName: "VNG Corporation — Nhà tuyển dụng đối tác" },
  "DN003": { password: "verify@2026", displayName: "Viettel Group — Đối tác học thuật" },
};

const DB_KEY = "hue_sbt_database";

const DEFAULT_DB = [
  { tokenId: 1, badgeType: 1, studentName: "Phan Thị Yến Nhi",  studentId: "23K4300014", recipient: "0x71C26071493b86EFA7AC41b38f828a2aC41Ea47B", issuedAt: "10/10/2026, 09:30:15", isRevoked: false, revokeReason: "" },
  { tokenId: 2, badgeType: 4, studentName: "Nguyễn Quốc Bảo",   studentId: "23K4300028", recipient: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", issuedAt: "11/10/2026, 14:15:00", isRevoked: false, revokeReason: "" },
  { tokenId: 3, badgeType: 7, studentName: "Lê Thị Diệu Linh",  studentId: "23K4300085", recipient: "0x90F79bf6EB2c4f870365E785982E1f101E93b906", issuedAt: "12/10/2026, 16:45:20", isRevoked: false, revokeReason: "" },
];

function loadDatabase() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) { saveDatabase(DEFAULT_DB); return DEFAULT_DB; }
    return JSON.parse(raw);
  } catch { return DEFAULT_DB; }
}

function saveDatabase(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// ====================================================
// TOAST NOTIFICATIONS
// ====================================================
function showToast(message, type = "info") {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const icon = type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️";
  toast.innerHTML = `<span style="font-size:1.15rem;">${icon}</span><span style="flex:1;">${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    setTimeout(() => toast.remove(), 250);
  }, 4200);
}

// Toggle hiển thị mật khẩu
function togglePwd(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === "password") {
    input.type = "text";
    if (btn) btn.innerText = "🙈";
  } else {
    input.type = "password";
    if (btn) btn.innerText = "👁️";
  }
}

// Modal cảnh báo Soulbound (chặn chuyển nhượng)
function triggerSimulateTransfer(tokenId) {
  const modal = document.getElementById("revertModalOverlay");
  if (modal) {
    modal.classList.add("active");
  }
}

function closeRevertModal() {
  const modal = document.getElementById("revertModalOverlay");
  if (modal) {
    modal.classList.remove("active");
  }
}

// ====================================================
// METAMASK REAL WEB3 INTEGRATION
// ====================================================
let currentConnectedWallet = null;
let currentChainId = null;
let currentWalletBalance = "0";

function isMetaMaskAvailable() {
  return typeof window.ethereum !== "undefined";
}

function getConnectedWallet() {
  return currentConnectedWallet || sessionStorage.getItem("connected_wallet");
}

function formatAddress(addr) {
  if (!addr || addr.length < 10) return addr || "";
  return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
}

// Kết nối thật với MetaMask Extension
async function connectMetaMask(silent = false) {
  if (!isMetaMaskAvailable()) {
    if (!silent) showWalletModal();
    return null;
  }

  try {
    // Gọi method eth_requestAccounts thật — MetaMask sẽ hiện Popup yêu cầu kết nối
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    
    if (accounts && accounts.length > 0) {
      currentConnectedWallet = accounts[0];
      sessionStorage.setItem("connected_wallet", currentConnectedWallet);
      sessionStorage.removeItem("is_simulated_wallet");

      // Lấy Chain ID thật
      currentChainId = await window.ethereum.request({ method: "eth_chainId" });
      sessionStorage.setItem("connected_chain_id", currentChainId);

      // Lấy số dư ETH thật
      try {
        const balanceHex = await window.ethereum.request({
          method: "eth_getBalance",
          params: [currentConnectedWallet, "latest"]
        });
        const wei = parseInt(balanceHex, 16);
        currentWalletBalance = (wei / 1e18).toFixed(4);
      } catch (e) {
        currentWalletBalance = "0";
      }

      updateAllWalletButtons();

      if (!silent) {
        showToast(`🦊 Kết nối thành công ví MetaMask thật: ${formatAddress(currentConnectedWallet)}`, "success");
        // Kiểm tra mạng Sepolia
        checkAndPromptSepoliaNetwork();
      }

      window.dispatchEvent(new CustomEvent("walletConnected", { 
        detail: { 
          address: currentConnectedWallet,
          chainId: currentChainId,
          balance: currentWalletBalance,
          isReal: true 
        } 
      }));

      return currentConnectedWallet;
    }
  } catch (err) {
    console.warn("Lỗi hoặc từ chối kết nối MetaMask:", err);
    if (!silent) {
      if (err.code === 4001) {
        showToast("Bạn đã từ chối yêu cầu kết nối trên ví MetaMask.", "error");
      } else {
        showToast(`Lỗi kết nối MetaMask: ${err.message || err}`, "error");
      }
    }
    return null;
  }
}

// Chuyển mạng sang Sepolia Testnet
async function switchToSepolia() {
  if (!isMetaMaskAvailable()) {
    showToast("Vui lòng cài đặt ví MetaMask trên trình duyệt!", "error");
    return false;
  }

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: SEPOLIA_CHAIN_ID_HEX }]
    });
    showToast("✅ Đã chuyển thành công sang mạng Sepolia Testnet!", "success");
    return true;
  } catch (switchError) {
    // Mã lỗi 4902: Mạng Sepolia chưa có trong danh sách ví MetaMask
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: SEPOLIA_CHAIN_ID_HEX,
            chainName: "Sepolia Testnet",
            nativeCurrency: { name: "Sepolia ETH", symbol: "ETH", decimals: 18 },
            rpcUrls: ["https://rpc.sepolia.org", "https://ethereum-sepolia.publicnode.com"],
            blockExplorerUrls: ["https://sepolia.etherscan.io"]
          }]
        });
        showToast("✅ Đã thêm và chuyển sang Sepolia Testnet!", "success");
        return true;
      } catch (addError) {
        showToast("Không thể thêm mạng Sepolia vào MetaMask.", "error");
      }
    } else {
      showToast("Không thể chuyển mạng Sepolia.", "error");
    }
    return false;
  }
}

function checkAndPromptSepoliaNetwork() {
  if (currentChainId && currentChainId.toLowerCase() !== SEPOLIA_CHAIN_ID_HEX.toLowerCase()) {
    setTimeout(() => {
      if (confirm(`Ví MetaMask của bạn đang kết nối ở mạng khác (Chain ID: ${currentChainId}).\n\nBạn có muốn tự động chuyển sang mạng Ethereum Sepolia Testnet (Mạng chính thức của HUE-SBT) không?`)) {
        switchToSepolia();
      }
    }, 400);
  }
}

// Ký xác thực danh tính số bằng MetaMask (Personal Sign)
async function signIdentityWithMetaMask(studentNameOrUser) {
  const wallet = getConnectedWallet();
  if (!wallet) {
    showToast("Vui lòng kết nối ví MetaMask trước!", "error");
    return null;
  }
  if (!isMetaMaskAvailable()) {
    showToast("Tính năng ký số chỉ hoạt động trên ví MetaMask thật!", "info");
    return null;
  }

  const timestamp = new Date().toLocaleString("vi-VN");
  const msg = `[HUE SOULBOUND CREDENTIALS - ĐẠI HỌC HUẾ]\n\nTôi xác nhận là chủ sở hữu hợp pháp của ví Web3:\n${wallet}\n\nĐại diện cho: ${studentNameOrUser || 'Cá nhân được xác thực'}\nThời điểm ký: ${timestamp}\nMạng: Sepolia Testnet (ProjectCore.sol)`;

  try {
    const from = wallet;
    const msgHex = "0x" + Array.from(new TextEncoder().encode(msg)).map(b => b.toString(16).padStart(2, "0")).join("");

    showToast("🦊 Mở cửa sổ MetaMask: Vui lòng bấm [Ký / Sign] để xác thực...", "info");

    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [msgHex, from]
    });

    showToast(`✅ Đã ký số Web3 thành công! Chữ ký: ${formatAddress(signature)}`, "success");
    return signature;
  } catch (err) {
    if (err.code === 4001) {
      showToast("Bạn đã hủy ký xác thực trên MetaMask.", "error");
    } else {
      showToast("Lỗi khi ký số MetaMask.", "error");
    }
    return null;
  }
}

// Kết nối ví thủ công / giả lập
function connectManualWallet(addr) {
  if (!addr || !addr.startsWith("0x") || addr.length < 10) {
    showToast("Địa chỉ ví không hợp lệ (phải bắt đầu bằng 0x...).", "error");
    return;
  }
  currentConnectedWallet = addr;
  currentChainId = SEPOLIA_CHAIN_ID_HEX;
  currentWalletBalance = "0.2500";
  sessionStorage.setItem("connected_wallet", currentConnectedWallet);
  sessionStorage.setItem("is_simulated_wallet", "true");
  sessionStorage.setItem("connected_chain_id", currentChainId);
  updateAllWalletButtons();
  closeWalletModal();
  showToast(`🦊 Đã kích hoạt ví Web3: ${formatAddress(currentConnectedWallet)}`, "success");
  window.dispatchEvent(new CustomEvent("walletConnected", { 
    detail: { 
      address: currentConnectedWallet,
      chainId: currentChainId,
      balance: currentWalletBalance,
      isReal: false 
    } 
  }));
}

// Khi người dùng bấm vào nút Ví ở Header
function handleWalletBtnClick() {
  const wallet = getConnectedWallet();
  if (wallet) {
    showConnectedWalletDrawer();
  } else {
    connectMetaMask();
  }
}

// Drawer chi tiết ví đang kết nối
function showConnectedWalletDrawer() {
  const wallet = getConnectedWallet();
  if (!wallet) return;

  const isSim = sessionStorage.getItem("is_simulated_wallet") === "true";
  const chainId = currentChainId || sessionStorage.getItem("connected_chain_id") || "0xaa36a7";
  const isSepolia = chainId.toLowerCase() === SEPOLIA_CHAIN_ID_HEX.toLowerCase();

  let drawer = document.getElementById("walletInfoDrawer");
  if (!drawer) {
    drawer = document.createElement("div");
    drawer.id = "walletInfoDrawer";
    drawer.className = "modal-overlay active";
    document.body.appendChild(drawer);
  } else {
    drawer.className = "modal-overlay active";
  }

  drawer.onclick = (e) => { if (e.target === drawer) closeWalletDrawer(); };

  drawer.innerHTML = `
    <div class="modal-box" style="max-width: 500px; text-align: left; padding: 26px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; border-bottom:1px solid var(--border-color); padding-bottom:14px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="font-size:30px;">🦊</span>
          <div>
            <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-main); margin:0;">
              ${isSim ? 'Ví Web3 (Chế độ Thử nghiệm)' : 'Ví MetaMask (Đang Kết Nối)'}
            </h3>
            <span style="font-size:0.78rem; color:var(--text-dim);">Hệ thống văn bằng số Đại học Huế</span>
          </div>
        </div>
        <button onclick="closeWalletDrawer()" style="background:none; border:none; font-size:20px; cursor:pointer; color:var(--text-dim);">✕</button>
      </div>

      <div style="background:var(--bg-subtle); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:16px; margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--text-dim); letter-spacing:0.04em;">Địa chỉ ví của bạn:</span>
          <button class="chip-suggestion" onclick="navigator.clipboard.writeText('${wallet}'); showToast('Đã sao chép địa chỉ ví!', 'success');">📋 Sao chép</button>
        </div>
        <div style="font-family:monospace; font-size:0.86rem; color:var(--primary); font-weight:700; word-break:break-all; background:#fff; padding:8px 12px; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
          ${wallet}
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; font-size:0.82rem;">
          <span style="color:var(--text-muted); font-weight:600;">Mạng Blockchain:</span>
          ${isSepolia 
            ? `<span class="badge-tag" style="background:var(--emerald-bg); color:var(--emerald); border-color:var(--emerald-border);"><span class="wallet-dot"></span> Ethereum Sepolia Testnet</span>`
            : `<button class="btn-outline" style="font-size:0.75rem; padding:4px 8px; color:var(--rose); border-color:var(--rose-border);" onclick="switchToSepolia()">⚠️ Đổi sang Sepolia</button>`
          }
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px; font-size:0.82rem;">
          <span style="color:var(--text-muted); font-weight:600;">Số dư ví:</span>
          <strong style="color:var(--text-main); font-family:monospace;">${currentWalletBalance} ETH</strong>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:8px;">
        <a href="https://sepolia.etherscan.io/address/${wallet}" target="_blank" class="btn-outline" style="font-size:0.84rem; justify-content:center; text-decoration:none;">
          🔍 Xem ví trên Sepolia Etherscan ↗
        </a>
        <button class="btn-primary" style="font-size:0.84rem; justify-content:center;" onclick="signIdentityWithMetaMask('Sinh viên Đại học Huế')">
          ✍️ Ký Xác Thực Danh Tính Web3 (Personal Sign)
        </button>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; border-top:1px solid var(--border-color); padding-top:14px;">
        <button class="btn-outline" style="font-size:0.82rem; color:var(--rose); border-color:var(--rose-border);" onclick="disconnectWallet()">
          🚪 Ngắt kết nối ví
        </button>
        <button class="btn-outline" style="font-size:0.82rem;" onclick="closeWalletDrawer()">
          Đóng cửa sổ
        </button>
      </div>
    </div>
  `;
}

function closeWalletDrawer() {
  const drawer = document.getElementById("walletInfoDrawer");
  if (drawer) drawer.className = "modal-overlay";
}

function disconnectWallet() {
  currentConnectedWallet = null;
  currentChainId = null;
  currentWalletBalance = "0";
  sessionStorage.removeItem("connected_wallet");
  sessionStorage.removeItem("is_simulated_wallet");
  sessionStorage.removeItem("connected_chain_id");
  updateAllWalletButtons();
  closeWalletDrawer();
  showToast("Đã ngắt kết nối ví Web3.", "info");
  window.dispatchEvent(new CustomEvent("walletDisconnected"));
}

// Modal hướng dẫn & chọn ví mẫu khi chưa cài MetaMask
function showWalletModal() {
  let modal = document.getElementById("walletConnectHelpModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "walletConnectHelpModal";
    modal.className = "modal-overlay active";
    document.body.appendChild(modal);
  } else {
    modal.className = "modal-overlay active";
  }

  modal.onclick = (e) => { if (e.target === modal) closeWalletModal(); };

  modal.innerHTML = `
    <div class="modal-box" style="max-width: 580px; text-align: left; padding: 26px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; border-bottom:1px solid var(--border-color); padding-bottom:12px;">
        <div style="display:flex; align-items:center; gap:12px;">
          <span style="font-size:32px;">🦊</span>
          <div>
            <h3 style="font-size:1.2rem; font-weight:850; color:var(--text-main); margin:0;">Kết Nối Ví MetaMask Thật</h3>
            <span style="font-size:0.8rem; color:var(--text-dim);">Hệ sinh thái Soulbound Token Đại học Huế</span>
          </div>
        </div>
        <button onclick="closeWalletModal()" style="background:none; border:none; font-size:22px; cursor:pointer; color:var(--text-dim);">✕</button>
      </div>

      <div style="background:linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border:1.5px solid #fed7aa; border-radius:var(--radius-md); padding:16px; margin-bottom:18px; font-size:0.86rem; line-height:1.6;">
        <div style="font-weight:800; color:#c2410c; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
          <span>💡</span> <span>Cách Kết Nối MetaMask Chuẩn 100%:</span>
        </div>
        <ol style="padding-left:20px; margin:0; color:#7c2d12;">
          <li style="margin-bottom:8px;">
            <strong>Mở qua máy chủ cục bộ (Khuyên dùng):</strong> Bạn hãy chạy lệnh <code>node server.js</code> và mở trang qua đường dẫn <a href="http://localhost:3000" target="_blank" style="color:var(--primary); font-weight:800; text-decoration:underline;">http://localhost:3000</a> để MetaMask tự động tiêm extension trực tiếp.
          </li>
          <li>
            <strong>Nếu đang mở file offline (dạng <code>file:///C:...</code>):</strong>
            Mở tiện ích mở rộng Chrome: <code style="background:#fff; padding:2px 6px; border-radius:4px; color:var(--primary); font-weight:700;">chrome://extensions</code> ➔ Bấm <strong>Chi tiết (Details)</strong> của MetaMask ➔ Bật <strong>"Cho phép truy cập vào các URL tệp" (Allow access to file URLs)</strong>.
          </li>
        </ol>
        <div style="margin-top:12px; text-align:center;">
          <a href="https://metamask.io/download/" target="_blank" class="btn-primary" style="font-size:0.82rem; padding:6px 16px; text-decoration:none;">
            Tải Tiện Ích MetaMask Miễn Phí (Chrome / Edge) ↗
          </a>
        </div>
      </div>

      <div style="border-top:1px dashed var(--border-color); padding-top:16px;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
          <h4 style="font-size:0.95rem; font-weight:800; color:var(--primary); margin:0;">
            ⚡ Trải Nghiệm Nhanh Bằng Ví Mẫu Sinh Viên
          </h4>
          <span class="badge-tag" style="background:var(--emerald-bg); color:var(--emerald); border-color:var(--emerald-border);">Có sẵn</span>
        </div>
        <p style="font-size:0.82rem; color:var(--text-muted); margin-bottom:12px;">
          Nếu máy bạn chưa kịp cài extension, bạn có thể chọn ngay một ví sinh viên có sẵn để test trọn vẹn mọi tính năng:
        </p>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <button class="btn-outline" style="font-size:0.75rem; padding:8px 10px; text-align:left;" onclick="connectManualWallet('0x71C26071493b86EFA7AC41b38f828a2aC41Ea47B')">
            🎓 <strong>Phan Thị Yến Nhi</strong><br><small style="color:var(--text-dim); font-family:monospace;">0x71C2...a47B</small>
          </button>
          <button class="btn-outline" style="font-size:0.75rem; padding:8px 10px; text-align:left;" onclick="connectManualWallet('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC')">
            🎓 <strong>Nguyễn Quốc Bảo</strong><br><small style="color:var(--text-dim); font-family:monospace;">0x3C44...93BC</small>
          </button>
          <button class="btn-outline" style="font-size:0.75rem; padding:8px 10px; text-align:left;" onclick="connectManualWallet('0x90F79bf6EB2c4f870365E785982E1f101E93b906')">
            🎓 <strong>Lê Thị Diệu Linh</strong><br><small style="color:var(--text-dim); font-family:monospace;">0x90F7...b906</small>
          </button>
          <button class="btn-outline" style="font-size:0.75rem; padding:8px 10px; text-align:left;" onclick="createAndConnectRandomWallet()">
            🎲 <strong>Tạo Ví Mới Ngẫu Nhiên</strong><br><small style="color:var(--text-dim);">Tạo ví 0x... ngẫu nhiên</small>
          </button>
        </div>
      </div>

      <div style="display:flex; justify-content:flex-end; margin-top:20px; border-top:1px solid var(--border-color); padding-top:14px;">
        <button class="btn-outline" onclick="closeWalletModal()" style="font-size:0.85rem; padding:7px 18px;">Đóng</button>
      </div>
    </div>
  `;
}

function closeWalletModal() {
  const modal = document.getElementById("walletConnectHelpModal");
  if (modal) modal.className = "modal-overlay";
}

function createAndConnectRandomWallet() {
  const hex = "0123456789abcdef";
  let addr = "0x";
  for (let i = 0; i < 40; i++) {
    addr += hex[Math.floor(Math.random() * hex.length)];
  }
  connectManualWallet(addr);
}

// Cập nhật tất cả các nút hiển thị ví trên toàn trang
function updateAllWalletButtons() {
  const wallet = getConnectedWallet();
  const btns = document.querySelectorAll(".btn-connect-metamask");
  const chainId = currentChainId || sessionStorage.getItem("connected_chain_id");
  const isSepolia = chainId && chainId.toLowerCase() === SEPOLIA_CHAIN_ID_HEX.toLowerCase();

  btns.forEach(btn => {
    if (wallet) {
      btn.innerHTML = `
        <span class="wallet-dot"></span>
        <span>🦊 <code>${formatAddress(wallet)}</code></span>
        ${isSepolia ? '<span class="network-pill">Sepolia</span>' : '<span class="network-pill" style="background:#fee2e2;color:#991b1b;">Mạng khác</span>'}
      `;
      btn.classList.add("wallet-connected");
      btn.title = `Ví MetaMask: ${wallet} (Bấm để xem chi tiết hoặc ngắt kết nối)`;
    } else {
      btn.innerHTML = `🦊 Kết nối MetaMask`;
      btn.classList.remove("wallet-connected");
      btn.title = `Kết nối ví Web3 cá nhân`;
    }
  });
}

// Tự động kiểm tra trạng thái MetaMask khi mở trang
document.addEventListener("DOMContentLoaded", async () => {
  if (isMetaMaskAvailable()) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts && accounts.length > 0) {
        currentConnectedWallet = accounts[0];
        sessionStorage.setItem("connected_wallet", currentConnectedWallet);
        currentChainId = await window.ethereum.request({ method: "eth_chainId" });
        sessionStorage.setItem("connected_chain_id", currentChainId);
      }
    } catch (e) {
      // Bỏ qua lỗi ngầm
    }
  }
  updateAllWalletButtons();
});

// Lắng nghe sự kiện chuyển đổi tài khoản hoặc mạng trên MetaMask
if (typeof window.ethereum !== "undefined") {
  window.ethereum.on("accountsChanged", (accounts) => {
    if (accounts && accounts.length > 0) {
      currentConnectedWallet = accounts[0];
      sessionStorage.setItem("connected_wallet", currentConnectedWallet);
      showToast(`🦊 MetaMask đã chuyển sang ví: ${formatAddress(accounts[0])}`, "info");
      window.dispatchEvent(new CustomEvent("walletConnected", { 
        detail: { address: currentConnectedWallet, isReal: true } 
      }));
    } else {
      currentConnectedWallet = null;
      sessionStorage.removeItem("connected_wallet");
      showToast("Đã ngắt kết nối ví MetaMask.", "info");
      window.dispatchEvent(new CustomEvent("walletDisconnected"));
    }
    updateAllWalletButtons();
  });

  window.ethereum.on("chainChanged", (newChainId) => {
    currentChainId = newChainId;
    sessionStorage.setItem("connected_chain_id", newChainId);
    showToast(`🌐 Đã chuyển sang Chain ID: ${newChainId}`, "info");
    updateAllWalletButtons();
  });
}
