(function () {
  "use strict";

  // Capture currentScript immediately (before defer/async makes it null)
  // Also support a global variable set before this script loads
  const SCRIPT = document.currentScript ||
    document.querySelector('script[data-api-url][src*="chatbot-widget"]');
  const API_URL = (SCRIPT && SCRIPT.getAttribute("data-api-url")) ||
    (typeof window._ANYBOT_API_URL !== 'undefined' ? window._ANYBOT_API_URL : "") ||
    "https://anybot-api.onrender.com";

  const ICONS = {
    chat: '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/><path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
    send: '<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',
    bot: '<svg viewBox="0 0 24 24"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.07A7.001 7.001 0 0 1 7.07 19H6a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h-1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>',
    floor: '<svg viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>',
  };

  const QUICK_QUESTIONS = [
    "What SPC flooring options do you offer?",
    "Which floor is best for underfloor heating?",
    "Tell me about your herringbone flooring",
    "What certifications do your products have?",
  ];

  class AnywayChat {
    constructor() {
      this.isOpen = false;
      this.sessionId = localStorage.getItem("aw_chat_session") || null;
      this.isStreaming = false;
      this._createShadowDOM();
      this._bindEvents();
    }

    _createShadowDOM() {
      this.host = document.createElement("div");
      this.host.id = "anyway-chatbot";
      document.body.appendChild(this.host);

      this.shadow = this.host.attachShadow({ mode: "open" });

      const style = document.createElement("style");
      style.textContent = WIDGET_CSS;
      this.shadow.appendChild(style);

      const wrapper = document.createElement("div");
      wrapper.innerHTML = `
        <button class="aw-chat-toggle" aria-label="Open chat">
          <svg class="icon-chat" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/><path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/></svg>
          <svg class="icon-close" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
        <div class="aw-chat-panel">
          <div class="aw-chat-header">
            <div class="aw-chat-header-avatar">${ICONS.bot}</div>
            <div class="aw-chat-header-info">
              <h3>Anyway Flooring Assistant</h3>
              <p>Online — Ask me about our products</p>
            </div>
          </div>
          <div class="aw-chat-messages">
            <div class="aw-welcome">
              <div class="aw-welcome-icon">${ICONS.floor}</div>
              <h4>Welcome to Anyway Flooring!</h4>
              <p>I can help you find the perfect flooring solution. Ask me anything about our products.</p>
              <div class="aw-quick-btns">
                ${QUICK_QUESTIONS.map(
                  (q) => `<button class="aw-quick-btn">${q}</button>`
                ).join("")}
              </div>
            </div>
          </div>
          <div class="aw-chat-input-area">
            <textarea class="aw-chat-input" placeholder="Type your question..." rows="1"></textarea>
            <button class="aw-chat-send" aria-label="Send">${ICONS.send}</button>
          </div>
        </div>
      `;
      this.shadow.appendChild(wrapper);

      this.toggle = this.shadow.querySelector(".aw-chat-toggle");
      this.panel = this.shadow.querySelector(".aw-chat-panel");
      this.messages = this.shadow.querySelector(".aw-chat-messages");
      this.input = this.shadow.querySelector(".aw-chat-input");
      this.sendBtn = this.shadow.querySelector(".aw-chat-send");
    }

    _bindEvents() {
      this.toggle.addEventListener("click", () => this._toggleChat());

      this.sendBtn.addEventListener("click", () => this._sendMessage());

      this.input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          this._sendMessage();
        }
      });

      this.input.addEventListener("input", () => {
        this.input.style.height = "auto";
        this.input.style.height =
          Math.min(this.input.scrollHeight, 100) + "px";
      });

      this.shadow.querySelectorAll(".aw-quick-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          this.input.value = btn.textContent;
          this._sendMessage();
        });
      });
    }

    _toggleChat() {
      this.isOpen = !this.isOpen;
      this.panel.classList.toggle("open", this.isOpen);
      this.toggle.classList.toggle("active", this.isOpen);
      if (this.isOpen) {
        setTimeout(() => this.input.focus(), 300);
      }
    }

    _appendMessage(role, content) {
      const welcome = this.messages.querySelector(".aw-welcome");
      if (welcome) welcome.remove();

      const div = document.createElement("div");
      div.className = `aw-msg aw-msg-${role}`;

      if (role === "bot") {
        div.innerHTML = this._renderMarkdown(content);
      } else {
        div.textContent = content;
      }

      this.messages.appendChild(div);
      this._scrollToBottom();
      return div;
    }

    _showTyping() {
      const div = document.createElement("div");
      div.className = "aw-typing";
      div.id = "aw-typing-indicator";
      div.innerHTML = `<div class="aw-typing-dot"></div><div class="aw-typing-dot"></div><div class="aw-typing-dot"></div>`;
      this.messages.appendChild(div);
      this._scrollToBottom();
      return div;
    }

    _removeTyping() {
      const el = this.shadow.querySelector("#aw-typing-indicator");
      if (el) el.remove();
    }

    _scrollToBottom() {
      requestAnimationFrame(() => {
        this.messages.scrollTop = this.messages.scrollHeight;
      });
    }

    _renderMarkdown(text) {
      let html = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      html = html.replace(
        /\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)*)/g,
        (match, header, body) => {
          const headers = header
            .split("|")
            .map((h) => h.trim())
            .filter(Boolean);
          const rows = body
            .trim()
            .split("\n")
            .map((r) =>
              r
                .split("|")
                .map((c) => c.trim())
                .filter(Boolean)
            );
          let table = "<table><thead><tr>";
          headers.forEach((h) => (table += `<th>${h}</th>`));
          table += "</tr></thead><tbody>";
          rows.forEach((r) => {
            table += "<tr>";
            r.forEach((c) => (table += `<td>${c}</td>`));
            table += "</tr>";
          });
          table += "</tbody></table>";
          return table;
        }
      );

      html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

      html = html.replace(
        /^(\d+)\.\s+(.+)$/gm,
        '<li style="list-style:decimal;margin-left:20px">$2</li>'
      );
      html = html.replace(
        /^[-*]\s+(.+)$/gm,
        '<li style="list-style:disc;margin-left:20px">$1</li>'
      );

      html = html.replace(/\n{2,}/g, "</p><p>");
      html = html.replace(/\n/g, "<br>");
      html = `<p>${html}</p>`;
      html = html.replace(/<p><\/p>/g, "");

      return html;
    }

    async _sendMessage() {
      const text = this.input.value.trim();
      if (!text || this.isStreaming) return;

      this.input.value = "";
      this.input.style.height = "auto";
      this.isStreaming = true;
      this.sendBtn.disabled = true;

      this._appendMessage("user", text);
      this._showTyping();

      try {
        await this._streamResponse(text);
      } catch (err) {
        console.error("Anyway Chatbot error:", err);
        this._removeTyping();
        if (!this._lastStreamHadContent) {
          this._appendMessage(
            "bot",
            "Sorry, I couldn't get a response. Please try again in a moment."
          );
        }
      } finally {
        this.isStreaming = false;
        this.sendBtn.disabled = false;
        this.input.focus();
      }
    }

    _parseSSEBlock(block) {
      // Normalize CRLF to LF, then split lines
      const lines = block.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
      let event = "";
      const dataLines = [];
      for (const line of lines) {
        if (line.startsWith("event:")) {
          event = line.slice(6).trim();
        } else if (line.startsWith("data:")) {
          let d = line.slice(5);
          if (d.startsWith(" ")) d = d.slice(1);
          dataLines.push(d);
        }
      }
      return { event, data: dataLines.join("\n"), hasData: dataLines.length > 0 };
    }

    async _streamResponse(message) {
      const url = `${API_URL}/api/chat/stream`;
      this._lastStreamHadContent = false;

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 120000);

      let response;
      try {
        response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: message,
            session_id: this.sessionId,
          }),
          signal: controller.signal,
        });
      } catch (fetchErr) {
        clearTimeout(timeout);
        if (fetchErr.name === "AbortError") {
          throw new Error("Request timed out (120s)");
        }
        throw new Error("Network error: " + fetchErr.message);
      }

      if (!response.ok) {
        clearTimeout(timeout);
        let detail = "";
        try { detail = await response.text(); } catch {}
        throw new Error(`HTTP ${response.status}: ${detail}`);
      }

      this._removeTyping();
      const botMsg = this._appendMessage("bot", "");
      let fullText = "";

      try {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        const processBuffer = () => {
          // Split on both \n\n and \r\n\r\n (SSE event separators)
          const parts = buffer.split(/\r?\n\r?\n/);
          buffer = parts.pop() || "";

          for (const part of parts) {
            if (!part.trim()) continue;
            const sse = this._parseSSEBlock(part);

            if (sse.event === "meta") {
              try {
                const parsed = JSON.parse(sse.data);
                if (parsed.session_id) {
                  this.sessionId = parsed.session_id;
                  localStorage.setItem("aw_chat_session", this.sessionId);
                }
              } catch {}
            } else if (sse.event === "token" && sse.hasData) {
              fullText += sse.data;
              this._lastStreamHadContent = true;
              botMsg.innerHTML = this._renderMarkdown(fullText);
              this._scrollToBottom();
            } else if (sse.event === "error") {
              throw new Error("Server error: " + sse.data);
            }
          }
        };

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          processBuffer();
        }

        // Process any remaining buffer content
        if (buffer.trim()) {
          const sse = this._parseSSEBlock(buffer);
          if (sse.event === "token" && sse.hasData) {
            fullText += sse.data;
            this._lastStreamHadContent = true;
            botMsg.innerHTML = this._renderMarkdown(fullText);
            this._scrollToBottom();
          } else if (sse.event === "error") {
            throw new Error("Server error: " + sse.data);
          }
        }
      } finally {
        clearTimeout(timeout);
      }

      if (!fullText) {
        botMsg.remove();
        throw new Error("Empty response from server");
      }
    }
  }

  /* --- Inline CSS (loaded from external file if available, otherwise embedded) --- */

  let WIDGET_CSS = "";

  function loadCSS(callback) {
    if (API_URL) {
      const link = new XMLHttpRequest();
      link.open("GET", `${API_URL}/widget/chatbot-widget.css`, true);
      link.onload = function () {
        if (link.status === 200) {
          WIDGET_CSS = link.responseText;
        }
        callback();
      };
      link.onerror = function () {
        callback();
      };
      link.send();
    } else {
      callback();
    }
  }

  function init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        loadCSS(() => new AnywayChat());
      });
    } else {
      loadCSS(() => new AnywayChat());
    }
  }

  /* Fallback CSS — used when external CSS fails to load */
  const FALLBACK_CSS = `
    :host {
      --aw-green: #1a8754;
      --aw-green-dark: #136641;
      --aw-green-light: #e8f5ee;
      --aw-orange: #e8832a;
      --aw-orange-dark: #cc6e1a;
      --aw-orange-light: #fef3e2;
      --aw-bg: #ffffff;
      --aw-bg-secondary: #f7f9f8;
      --aw-text: #1a2e23;
      --aw-text-secondary: #5f7a6b;
      --aw-border: #dce8e0;
      --aw-shadow: 0 12px 48px rgba(26,135,84,.18), 0 2px 8px rgba(0,0,0,.06);
      --aw-radius: 20px;
      --aw-font: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
      all: initial;
      font-family: var(--aw-font);
      font-size: 14px;
      line-height: 1.5;
      color: var(--aw-text);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    .aw-chat-toggle {
      position: fixed; bottom: 24px; right: 24px; width: 62px; height: 62px;
      border-radius: 50%; background: linear-gradient(145deg, var(--aw-green), var(--aw-green-dark));
      border: 3px solid rgba(255,255,255,.25); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 20px rgba(26,135,84,.45);
      transition: transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease;
      z-index: 2147483647;
    }
    .aw-chat-toggle:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(26,135,84,.55); }
    .aw-chat-toggle:active { transform: scale(.93); }
    .aw-chat-toggle svg { width: 28px; height: 28px; fill: #fff; }
    .aw-chat-toggle.active svg.icon-chat { display: none; }
    .aw-chat-toggle:not(.active) svg.icon-close { display: none; }
    .aw-chat-panel {
      position: fixed; bottom: 100px; right: 24px; width: 400px;
      max-width: calc(100vw - 32px); height: 600px; max-height: calc(100vh - 140px);
      background: var(--aw-bg); border-radius: var(--aw-radius);
      box-shadow: var(--aw-shadow); display: flex; flex-direction: column;
      overflow: hidden; z-index: 2147483646;
      opacity: 0; transform: translateY(20px) scale(.95); pointer-events: none;
      transition: opacity .35s ease, transform .35s cubic-bezier(.34,1.56,.64,1);
      border: 1px solid rgba(26,135,84,.1);
    }
    .aw-chat-panel.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
    .aw-chat-header {
      background: linear-gradient(135deg, var(--aw-green) 0%, var(--aw-green-dark) 60%, #0f4f30 100%);
      color: #fff; padding: 16px 20px; display: flex; align-items: center; gap: 12px; flex-shrink: 0;
      position: relative; overflow: hidden;
    }
    .aw-chat-header::after {
      content: ''; position: absolute; top: -50%; right: -20%; width: 120px; height: 120px;
      background: radial-gradient(circle, rgba(232,131,42,.2) 0%, transparent 70%);
      border-radius: 50%; pointer-events: none;
    }
    .aw-chat-header-avatar {
      width: 42px; height: 42px; background: linear-gradient(135deg, var(--aw-orange), var(--aw-orange-dark));
      border-radius: 12px; display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; box-shadow: 0 3px 10px rgba(232,131,42,.35);
    }
    .aw-chat-header-avatar svg { width: 22px; height: 22px; fill: #fff; }
    .aw-chat-header-info h3 { font-size: 15px; font-weight: 700; margin: 0; line-height: 1.3; }
    .aw-chat-header-info p { font-size: 12px; opacity: .85; margin: 2px 0 0; line-height: 1.3; }
    .aw-chat-messages {
      flex: 1; overflow-y: auto; padding: 16px; display: flex;
      flex-direction: column; gap: 12px; background: var(--aw-bg-secondary);
    }
    .aw-msg {
      max-width: 85%; padding: 11px 15px; border-radius: 14px;
      font-size: 14px; line-height: 1.6; word-wrap: break-word;
      animation: aw-msg-in .3s ease;
    }
    @keyframes aw-msg-in { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
    .aw-msg-user {
      align-self: flex-end; background: linear-gradient(135deg, var(--aw-green), var(--aw-green-dark));
      color: #fff; border-bottom-right-radius: 4px; box-shadow: 0 2px 8px rgba(26,135,84,.2);
    }
    .aw-msg-bot {
      align-self: flex-start; background: var(--aw-bg); color: var(--aw-text);
      border: 1px solid var(--aw-border); border-bottom-left-radius: 4px;
      box-shadow: 0 1px 3px rgba(0,0,0,.04);
    }
    .aw-msg-bot p { margin: 0 0 8px; } .aw-msg-bot p:last-child { margin-bottom: 0; }
    .aw-msg-bot strong { font-weight: 600; color: var(--aw-green-dark); }
    .aw-msg-bot table { width:100%; border-collapse:collapse; margin:8px 0; font-size:13px; }
    .aw-msg-bot th, .aw-msg-bot td { border:1px solid var(--aw-border); padding:7px 10px; text-align:left; }
    .aw-msg-bot th { background: var(--aw-green-light); font-weight:600; color: var(--aw-green-dark); }
    .aw-msg-bot code { background:var(--aw-green-light); padding:1px 6px; border-radius:4px; font-size:13px; color:var(--aw-green-dark); }
    .aw-msg-bot ul, .aw-msg-bot ol { padding-left:20px; margin:6px 0; }
    .aw-msg-bot li { margin: 3px 0; }
    .aw-typing {
      align-self: flex-start; display: flex; gap: 5px; padding: 13px 18px;
      background: var(--aw-bg); border: 1px solid var(--aw-border);
      border-radius: 14px; border-bottom-left-radius: 4px;
    }
    .aw-typing-dot {
      width:8px; height:8px; background:var(--aw-green); border-radius:50%;
      animation: aw-bounce 1.4s ease-in-out infinite; opacity:.6;
    }
    .aw-typing-dot:nth-child(2) { animation-delay:.16s; background:var(--aw-orange); }
    .aw-typing-dot:nth-child(3) { animation-delay:.32s; }
    @keyframes aw-bounce { 0%,60%,100%{transform:translateY(0);opacity:.6} 30%{transform:translateY(-7px);opacity:1} }
    .aw-chat-input-area {
      padding: 12px 16px; border-top: 1px solid var(--aw-border);
      display: flex; gap: 10px; align-items: flex-end; background: var(--aw-bg); flex-shrink: 0;
    }
    .aw-chat-input {
      flex:1; border:1.5px solid var(--aw-border); border-radius:14px;
      padding:10px 14px; font-size:14px; font-family:var(--aw-font);
      resize:none; max-height:100px; outline:none;
      transition:border-color .2s ease, box-shadow .2s ease;
      line-height:1.4; color:var(--aw-text); background:var(--aw-bg-secondary);
    }
    .aw-chat-input:focus { border-color: var(--aw-green); box-shadow: 0 0 0 3px rgba(26,135,84,.1); background:var(--aw-bg); }
    .aw-chat-input::placeholder { color: #9ca3af; }
    .aw-chat-send {
      width:42px; height:42px; border-radius:12px;
      background:linear-gradient(135deg, var(--aw-orange), var(--aw-orange-dark));
      border:none; cursor:pointer; display:flex; align-items:center; justify-content:center;
      flex-shrink:0; transition: transform .15s ease, box-shadow .2s ease;
      box-shadow: 0 2px 8px rgba(232,131,42,.3);
    }
    .aw-chat-send:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(232,131,42,.45); }
    .aw-chat-send:active { transform: scale(.92); }
    .aw-chat-send:disabled { background:#d1d5db; cursor:not-allowed; box-shadow:none; transform:none; }
    .aw-chat-send svg { width:18px; height:18px; fill:#fff; }
    .aw-welcome { text-align:center; padding:28px 20px; }
    .aw-welcome-icon {
      width:60px; height:60px; background:linear-gradient(145deg,var(--aw-green),var(--aw-orange));
      border-radius:18px; display:flex; align-items:center; justify-content:center;
      margin:0 auto 14px; box-shadow:0 4px 16px rgba(26,135,84,.25);
    }
    .aw-welcome-icon svg { width:28px; height:28px; fill:#fff; }
    .aw-welcome h4 { font-size:17px; font-weight:700; margin:0 0 6px; color:var(--aw-text); }
    .aw-welcome p { font-size:13px; color:var(--aw-text-secondary); margin:0 0 18px; line-height:1.5; }
    .aw-quick-btns { display:flex; flex-wrap:wrap; gap:8px; justify-content:center; }
    .aw-quick-btn {
      background:var(--aw-bg); border:1.5px solid var(--aw-border); border-radius:22px;
      padding:7px 16px; font-size:12.5px; color:var(--aw-green); cursor:pointer;
      transition:all .2s ease; font-family:var(--aw-font); font-weight:500;
    }
    .aw-quick-btn:hover { background:var(--aw-orange-light); border-color:var(--aw-orange); color:var(--aw-orange-dark); transform:translateY(-1px); box-shadow:0 2px 8px rgba(232,131,42,.15); }
    @media (max-width:480px) {
      .aw-chat-panel { bottom:0; right:0; width:100vw; height:100vh; max-height:100vh; border-radius:0; }
      .aw-chat-toggle { bottom:16px; right:16px; width:54px; height:54px; }
    }
  `;

  /* Override loadCSS to also use fallback */
  const _origLoadCSS = loadCSS;
  loadCSS = function (callback) {
    if (API_URL) {
      _origLoadCSS(function () {
        if (!WIDGET_CSS) WIDGET_CSS = FALLBACK_CSS;
        callback();
      });
    } else {
      WIDGET_CSS = FALLBACK_CSS;
      callback();
    }
  };

  init();
})();
