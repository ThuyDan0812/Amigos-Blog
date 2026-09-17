/* ==========================================================================
   sketch.js - SYSTEM LOGIC, VIRUS OPERATOR, AND DOM GENERATION
   ========================================================================== */

// --- GLOBAL VARIABLES (Shared with sketchUI.js) ---
let activeHeartbeatSound = null;
let activeKeyboardSound = null;
let activeChimeSound = null;
let sessionAvatarFile = "";

const avatarFiles = [
  "edited-media/ava1.jpg",
  "edited-media/ava2.jpg",
  "edited-media/ava3.png",
];
sessionAvatarFile = avatarFiles[Math.floor(Math.random() * avatarFiles.length)];

// ==========================================================================
// [ANNOTATION] CUSTOM OPERATOR: CorruptionOperator
// Purpose: A custom object serving as our state manager. It tracks user
// interactions, triggers the virus at a threshold, and stores references
// to cloned buttons so we can easily delete them later.
// ==========================================================================
const CorruptionOperator = {
  sessions: 0, // Current number of scratches
  threshold: 3, // Required scratches to trigger virus
  clonedButtons: [], // Array holding all spawned "virus" buttons
  originalTexts: [], // Array holding original website text HTML

  incrementAndCheck: function () {
    this.sessions++;
    console.log(
      `[CorruptionOperator] Interaction ${this.sessions}/${this.threshold}`
    );
    return this.sessions >= this.threshold ? true : false;
  },

  reset: function () {
    this.sessions = 0;

    // [ANNOTATION] LOOP FOREACH:
    // Iterating through our array of spawned virus buttons and removing them from the DOM
    this.clonedButtons.forEach((btn) => btn.remove());
    this.clonedButtons = []; // Empty the array
  },
};

window.addEventListener("DOMContentLoaded", () => {
  const heartbeatPool = [
    "edited-sounds/heartbeat1.wav",
    "edited-sounds/heartbeat2.wav",
  ];
  const keyboardPool = [
    "edited-sounds/keyboard1.wav",
    "edited-sounds/keyboard2.wav",
  ];
  const chimePool = [
    "edited-sounds/message-chime.wav",
    "edited-sounds/message-chime2.wav",
  ];

  try {
    activeHeartbeatSound = new Audio(
      heartbeatPool[Math.floor(Math.random() * heartbeatPool.length)]
    );
    activeKeyboardSound = new Audio(
      keyboardPool[Math.floor(Math.random() * keyboardPool.length)]
    );
    activeChimeSound = new Audio(
      chimePool[Math.floor(Math.random() * chimePool.length)]
    );
  } catch (e) {
    console.warn("Audio preloading error:", e);
  }

  setupModalInteraction();
  setupSearchAudio();
  generateDynamicContent();
});

/* ==========================================================================
   VIRUS LOGIC (DARK CASCADING STYLE)
   ========================================================================== */
window.isGlitchActive = false;
window.glitchIntervals = [];

function triggerGlobalGlitch() {
  if (window.isGlitchActive) return;
  window.isGlitchActive = true;

  // Apply the dark grayscale filter to the whole body
  document.body.classList.add("grayscale-glitch-body");

  const baseBtn = document.getElementById("whats-new-btn");
  if (baseBtn) {
    baseBtn.classList.add("glitching-btn-dark");
    baseBtn.innerText = "SYSTEM ERROR. READ ME.";
  }

  // CHAOS INTERVAL (SLOWER SPAWNING)
  const chaosInterval = setInterval(() => {
    if (activeChimeSound) {
      activeChimeSound.currentTime = 0;
      activeChimeSound.play().catch(() => {});
    }

    if (baseBtn && CorruptionOperator.clonedButtons.length < 25) {
      // Cap at 25 buttons
      const clone = baseBtn.cloneNode(true);
      const randomTop = Math.random() * 85;
      const randomLeft = Math.random() * 80;

      clone.style.cssText += `
        top: ${randomTop}vh !important; 
        left: ${randomLeft}vw !important; 
      `;

      clone.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("whats-new-modal").classList.remove("hidden");
        cureVirus();
      });

      document.body.appendChild(clone);
      CorruptionOperator.clonedButtons.push(clone);
    }
  }, 800);

  const textElements = Array.from(
    document.querySelectorAll(
      "p, h2, h3, h4, span.english-sub, span.teencode-text, .retro-comment-item, small, strong"
    )
  );

  CorruptionOperator.originalTexts = textElements.map((el) => {
    return {
      element: el,
      originalHTML: el.innerHTML,
    };
  });

  // SLOW TEXT CORRUPTION
  const virusInterval = setInterval(() => {
    textElements.forEach((el) => {
      if (
        !el.classList.contains("corrupted-text-dark") &&
        !el.closest("#whats-new-modal")
      ) {
        if (Math.random() < 0.02) {
          el.innerText = "You saw the addiction. Did you see the person?";
          el.classList.add("corrupted-text-dark");
        }
      }
    });
  }, 200);

  window.glitchIntervals.push(chaosInterval, virusInterval);
}

function cureVirus() {
  if (!window.isGlitchActive) return;

  window.isGlitchActive = false;
  window.glitchIntervals.forEach(clearInterval);
  document.body.classList.remove("grayscale-glitch-body");

  const baseBtn = document.getElementById("whats-new-btn");
  if (baseBtn) {
    baseBtn.classList.remove("glitching-btn-dark");
    baseBtn.innerText = "What's New?";
    baseBtn.style.cssText = "";
  }

  CorruptionOperator.originalTexts.forEach((item) => {
    if (item.element) {
      item.element.innerHTML = item.originalHTML;
      item.element.classList.remove("corrupted-text-dark");
    }
  });

  CorruptionOperator.reset();
}

function setupSearchAudio() {
  const searchInput = document.querySelector(".search-box input");
  if (searchInput) {
    searchInput.addEventListener("focus", () => {
      if (activeKeyboardSound) {
        activeKeyboardSound.currentTime = 0;
        activeKeyboardSound.play().catch(() => {});
      }
    });
  }
}

function setupModalInteraction() {
  const openBtn = document.getElementById("whats-new-btn");
  const closeBtn = document.getElementById("close-modal-btn");
  const modal = document.getElementById("whats-new-modal");

  if (!openBtn || !closeBtn || !modal) return;

  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("hidden");
    cureVirus();
  });

  closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });
}

/* ==========================================================================
   DYNAMIC CONTENT GENERATION
   ========================================================================== */
function generateDynamicContent() {
  const isFemale = sessionAvatarFile.includes("ava1");
  const names = isFemale
    ? ["b3' d4u cut3 ng0c ngh3ch", "c0ng chUa' m1t u0t", "t13u thu d0ng d4nh"]
    : [
        "l4ng tu c0 d0n",
        "h13p s1 b0ng d3m",
        "y3u 3m 4000 n4m",
        "h4n d0i v0 d0i",
      ];

  const selectedName = names[Math.floor(Math.random() * names.length)];
  const genderIcon = isFemale ? "♀" : "♂";
  const randomVip = Math.floor(Math.random() * 10) + 1;

  const profileElement = document.getElementById("dynamic-profile");
  if (profileElement) {
    profileElement.innerHTML = `
      <div class="profile-box-inner" style="padding: 10px;">
        <strong style="font-size: 1.1em; color: black; font-family: Arial;">${selectedName} ${genderIcon}</strong>
        <div class="vip-banner">
          <marquee scrollamount="3">✨👑 Amigos! VIP ${randomVip} 👑✨</marquee>
        </div>
        <table class="retro-stats-table">
          <tr><th colspan="2">Personal Info</th></tr>
          <tr><td>Age:</td><td>${Math.floor(Math.random() * 5) + 18}</td></tr>
          <tr><td>Join Date:</td><td>14/02/2009</td></tr>
          <tr><td>Posts:</td><td>${
            Math.floor(Math.random() * 500) + 100
          }</td></tr>
          <tr><td>EXP:</td><td>99,999 🌟</td></tr>
          <tr><td>Pro Index:</td><td>Level ${
            Math.floor(Math.random() * 50) + 10
          }</td></tr>
        </table>
        <div style="margin-top: 15px; font-size: 0.9em; font-family: Arial; color: black;">
          <strong>Interests / Sở thích:</strong><br>
          Đi bay 🚀, Kẹo ke 🍬, Vinahouse xập xình 🎶<br>
          <span class="english-sub">[Partying/using 🚀, Molly/Ket 🍬, Loud Vinahouse music 🎶]</span>
        </div>
      </div>
    `;
  }

  const drugImages = [
    "edited-media/drug1.png",
    "edited-media/drug2.png",
    "edited-media/drug3.png",
  ];
  const randomDrugImage =
    drugImages[Math.floor(Math.random() * drugImages.length)];

  const postTemplates = [
    {
      date: "14/06/2009 - 02:14 AM",
      text: "H0m n4y b4y qu4' 43 3j... L3n lu0n 🚀",
      sub: "[Today I'm so high bros... Let's go 🚀]",
      hasImage: false,
      isInteractive: false,
      isCrashInteractive: false,
      comments: [
        {
          name: "b0y_s4d",
          text: "ch0 3m th3o daika v0i!!! 🤤",
          sub: "[Let me tag along big bro!!! 🤤]",
        },
      ],
    },
    {
      date: "22/08/2009 - 04:30 AM",
      text: "K0 b4y k0 v3^`... s4p ngu0n r0i 💊",
      sub: "[Not going home unless I'm high... crashing now 💊]",
      hasImage: false,
      isInteractive: false,
      isCrashInteractive: true,
      comments: [
        {
          name: "pRinC3ss",
          text: "l3n d0` di 4nh 3i 🔥",
          sub: "[Get dressed/ready to roll bro 🔥]",
        },
        {
          name: "You",
          text:
            "...ông lại dùng nữa à? Lên mạng nhắn tôi đi, dạo này ông ổn không?",
          sub:
            "[...are you using again? Get online and message me, are you okay lately?]",
          isContrast: true,
        },
      ],
    },
    {
      date: "10/10/2009 - 15:20 PM",
      text:
        "Id0l m0i n0i b1. b4t' v1\\` ch0i m4 tuY', b0i v4y. 4nh 3m ch0i l3n' th0i s40 l4i ch0i c0ng kh4i =)))",
      sub:
        "[Newly rising idol got arrested for doing drugs, that's why you gotta do it secretly bros, why do it in public =)))]",
      hasImage: false,
      isInteractive: true,
      isCrashInteractive: false,
      comments: [
        {
          name: "d4rk_k1ng",
          text: "qu4' non =)))",
          sub: "[Too green/noob =)))]",
        },
        {
          name: "You",
          text: "Nghiện ngập tàn phá cuộc đời họ đấy, đừng đùa giỡn nữa.",
          sub: "[Addiction destroys their lives, stop joking around.]",
          isContrast: true,
        },
      ],
    },
  ];

  postTemplates.sort(() => 0.5 - Math.random());
  let feedHTML = "";
  let allCommentsPool = [];

  postTemplates.forEach((post) => {
    let commentsHTML = "";
    post.comments.forEach((c) => {
      const contrastClass = c.isContrast ? "contrast-comment" : "";
      const commenterName = c.isContrast ? "You" : c.name;

      commentsHTML += `
        <div class="retro-comment-item ${contrastClass}">
          <strong>${commenterName}:</strong>
          <span class="teencode-text" style="font-size:0.95em;">${c.text}</span>
          <span class="english-sub">${c.sub}</span>
        </div>
      `;
      allCommentsPool.push({ name: commenterName, text: c.text });
    });

    const imageHTML = post.hasImage
      ? `
      <div class="drug-image-container">
        <img src="${
          post.imgSrc || randomDrugImage
        }" alt="Partying" onerror="this.style.display='none'">
      </div>`
      : "";

    const crashHTML = post.isCrashInteractive
      ? `
      <div style="background: black; border: 2px solid #ff00ff; margin: 15px 0;">
        <div id="interactive-crash-canvas" style="width:100%; height:250px; position:relative;"></div>
        <div style="text-align:center; color:#ff00ff; font-size:0.8em; margin-bottom:5px;">(Move cursor to experience the crash)</div>
      </div>`
      : "";

    const interactiveHTML = post.isInteractive
      ? `
      <div style="background: black; border: 3px dashed #ff00ff; padding: 5px; margin: 15px 0;">
        <marquee scrollamount="5" style="color:#00ffff; font-weight:bold; font-family:'Times New Roman', serif;">
          !!! H0T N3WS !!! b4y l4c. bi. bat' !!! [HOT NEWS: Got caught high!] !!!
        </marquee>
        <div id="interactive-post-canvas" style="width:100%; height:300px; position:relative;"></div>
        <div style="text-align:center; color:#ff00ff; font-size:0.8em; margin-top:5px;">(Hover to scratch and reveal the person)</div>
      </div>`
      : "";

    feedHTML += `
      <div class="random-post">
        <div class="random-post-date">${post.date}</div>
        <p class="teencode-text">${post.text}</p>
        <span class="english-sub">${post.sub}</span>
        ${imageHTML}
        ${crashHTML}
        ${interactiveHTML}
        <div class="retro-comments">
          <strong style="margin-bottom:8px; display:block; font-family:Arial; color:black;">Comments:</strong>
          ${commentsHTML}
        </div>
      </div>
    `;
  });

  feedHTML += `
    <div class="punchline">
      “You saw the addiction.<br />Did you see the person?”
    </div>
  `;

  const feedElement = document.getElementById("dynamic-blog-feed");
  if (feedElement) feedElement.innerHTML = feedHTML;

  // Initialize inner canvas sketches after the HTML is injected
  if (document.getElementById("interactive-crash-canvas"))
    new p5(interactiveCrashSketch, "interactive-crash-canvas");
  if (document.getElementById("interactive-post-canvas"))
    new p5(interactivePostSketch, "interactive-post-canvas");

  const marquee = document.getElementById("marquee-comments");
  if (marquee && allCommentsPool.length > 0) {
    allCommentsPool.sort(() => 0.5 - Math.random());
    marquee.innerHTML = allCommentsPool
      .map(
        (c) => `
      <p class="marquee-comment-item">
        <span class="marquee-comment-name">${c.name}:</span> ${c.text}
      </p>
    `
      )
      .join("");
  }

  const keywordContainer = document.getElementById("random-keywords-container");
  const searchInput = document.querySelector(".search-box input");
  if (keywordContainer && searchInput) {
    const searchKeywords = [
      "Tobacco impact VN",
      "Substance abuse data",
      "Synthetic drugs effects",
      "Rehab center near me",
      "Mental health support 111",
    ];
    searchKeywords.sort(() => 0.5 - Math.random());

    keywordContainer.innerHTML = searchKeywords
      .slice(0, 3)
      .map((kw) => `<div class="keyword-link">► ${kw}</div>`)
      .join("");

    document.querySelectorAll(".keyword-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        const text = e.target.innerText.replace("► ", "");
        searchInput.value = text;
        searchInput.focus();
      });
    });
  }

  const promoBox = document.getElementById("promo-ad-container");
  if (promoBox) {
    const adImages = [
      "edited-media/ads1.png",
      "edited-media/ads2.png",
      "edited-media/ads3.png",
      "edited-media/ads4.png",
    ];
    const randomImageSrc =
      adImages[Math.floor(Math.random() * adImages.length)];
    promoBox.innerHTML = `
      <img src="${randomImageSrc}" alt="Retro Advertisement" class="promo-ad-image" onerror="this.style.display='none'">
    `;
  }
}
