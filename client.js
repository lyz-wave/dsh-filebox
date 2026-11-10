window.__ModuleLoader__.load({
  id: 'dsh-filebox',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const API = 'https://api.github.com';
    const OWNER = 'lyz-wave';
    const REPO = 'filebox';
    const BRANCH = 'main';
    const INBOX = 'inbox';
    const PAGE_URL = 'https://lyz-wave.github.io/filebox-web/';

    const LS_TOKEN = 'dsh-filebox.token';
    const LS_DEVICE = 'dsh-filebox.device';
    const LS_REMEMBER = 'dsh-filebox.remember';
    const LS_AUTOSYNC = 'dsh-filebox.autosync';

    const MAX_BYTES = 50 * 1024 * 1024;
    const SYNC_MS = 5000;

    const STYLE = "\n.fbx-page {\n  box-sizing: border-box;\n  height: 100%;\n  overflow: auto;\n  padding: 26px clamp(20px, 4vw, 52px) 40px;\n  background: var(--dsw-alias-bg-base, #f6f7f9);\n  color: var(--dsw-alias-label-primary, #1f2328);\n  font-family: var(--dsw-font-family, -apple-system, \"Segoe UI\", \"Microsoft YaHei\", sans-serif);\n  font-size: var(--dsw-font-base-16-font-size, 14px);\n}\n.fbx-inner { max-width: 920px; margin: 0 auto; }\n.fbx-header { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; margin-bottom:18px; }\n.fbx-title { margin:0; font-size:22px; font-weight:650; letter-spacing:.2px; }\n.fbx-sub { margin:6px 0 0; color:var(--dsw-alias-label-tertiary,#59636e); font-size:12.5px; }\n.fbx-header-actions { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }\n.fbx-pill { display:inline-flex; align-items:center; gap:6px; padding:5px 10px; border-radius:999px; border:1px solid var(--dsw-alias-border-l2,#d1d9e0); font-size:12px; color:var(--dsw-alias-label-secondary,#59636e); white-space:nowrap; }\n.fbx-pill.ok { color:var(--dsw-alias-state-success-primary,#1a7f37); }\n.fbx-pill.err { color:var(--dsw-alias-state-error-primary,#cf222e); }\n.fbx-btn { appearance:none; border:1px solid var(--dsw-alias-border-l2,#d1d9e0); background:var(--dsw-alias-bg-layer-1,#fff); color:var(--dsw-alias-label-primary,#1f2328); border-radius:8px; padding:7px 12px; font-size:13px; cursor:pointer; font-family:inherit; }\n.fbx-btn:hover { background:var(--dsw-alias-interactive-bg-hover,#f3f4f6); }\n.fbx-btn.primary { background:var(--dsw-alias-button-primary-fill,#0969da); border-color:var(--dsw-alias-button-primary-fill,#0969da); color:#fff; font-weight:600; }\n.fbx-btn.primary:hover { background:var(--dsw-alias-button-primary-hover,#0a5fc4); }\n.fbx-btn.danger { color:var(--dsw-alias-state-error-primary,#cf222e); border-color:color-mix(in srgb, var(--dsw-alias-state-error-primary,#cf222e) 35%, var(--dsw-alias-border-l2,#d1d9e0)); }\n.fbx-btn.small { padding:4px 9px; font-size:12px; }\n.fbx-btn:disabled { opacity:.55; cursor:not-allowed; }\n.fbx-card { background:var(--dsw-alias-bg-layer-1,#fff); border:1px solid var(--dsw-alias-border-l2,#d1d9e0); border-radius:14px; padding:16px 18px; margin-bottom:14px; }\n.fbx-card h2 { margin:0 0 6px; font-size:16px; }\n.fbx-field { display:block; margin-top:12px; }\n.fbx-field span { display:block; font-size:12.5px; font-weight:600; margin-bottom:6px; }\n.fbx-field input, .fbx-input, .fbx-textarea { width:100%; box-sizing:border-box; padding:9px 11px; border:1px solid var(--dsw-alias-border-l3,#b6c0ca); border-radius:8px; background:var(--dsw-alias-bg-base,#f6f7f9); color:var(--dsw-alias-label-primary,#1f2328); font:inherit; font-size:13.5px; outline:none; }\n.fbx-textarea { resize:vertical; min-height:76px; line-height:1.55; }\n.fbx-field input:focus, .fbx-input:focus, .fbx-textarea:focus { border-color:var(--dsw-alias-brand-primary,#0969da); box-shadow:0 0 0 3px var(--dsw-alias-interactive-bg-hover-accent, #ddf4ff); }\n.fbx-check { display:flex; align-items:center; gap:8px; margin-top:10px; font-size:12.5px; color:var(--dsw-alias-label-secondary,#59636e); }\n.fbx-check input { width:15px; height:15px; accent-color:var(--dsw-alias-brand-primary,#0969da); }\n.fbx-row-actions { display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-top:12px; }\n.fbx-muted { color:var(--dsw-alias-label-tertiary,#59636e); font-size:12px; }\n.fbx-error { margin:10px 0 0; padding:9px 12px; border-radius:9px; background:var(--dsw-alias-state-error-secondary,#ffebe9); color:var(--dsw-alias-state-error-primary,#cf222e); font-size:12.5px; }\n.fbx-howto { margin:12px 0 0; padding:10px 14px; border:1px solid var(--dsw-alias-border-l2,#d1d9e0); border-radius:10px; background:var(--dsw-alias-bg-base,#f6f7f9); font-size:12.5px; color:var(--dsw-alias-label-secondary,#59636e); }\n.fbx-howto ol { margin:8px 0 2px; padding-left:22px; }\n.fbx-howto li { margin:3px 0; }\n.fbx-toolbar { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }\n.fbx-toolbar .fbx-input { flex:1 1 180px; width:auto; }\n.fbx-drop { border:2px dashed var(--dsw-alias-border-l3,#b6c0ca); border-radius:12px; padding:20px 16px; text-align:center; cursor:pointer; margin-top:12px; }\n.fbx-drop:hover { border-color:var(--dsw-alias-brand-primary,#0969da); background:var(--dsw-alias-interactive-bg-hover,#f3f4f6); }\n.fbx-drop.drag { border-color:var(--dsw-alias-brand-primary,#0969da); background:var(--dsw-alias-interactive-bg-hover-accent,#ddf4ff); }\n.fbx-drop-title { margin:0; font-weight:600; font-size:14px; }\n.fbx-drop-hint { margin:4px 0 0; font-size:12px; color:var(--dsw-alias-label-tertiary,#59636e); }\n.fbx-list { list-style:none; margin:10px 0 0; padding:0; }\n.fbx-item { padding:11px 4px; border-top:1px solid var(--dsw-alias-border-l2,#d1d9e0); }\n.fbx-item:first-child { border-top:0; }\n.fbx-item-main { display:flex; align-items:center; gap:12px; }\n.fbx-icon { width:26px; text-align:center; font-size:18px; flex-shrink:0; }\n.fbx-item-text { min-width:0; flex:1; }\n.fbx-item-title { font-size:13.5px; font-weight:600; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }\n.fbx-item-meta { font-size:11.5px; color:var(--dsw-alias-label-tertiary,#59636e); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }\n.fbx-item-actions { display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; }\n.fbx-preview { margin:10px 0 2px; padding:12px; border-radius:10px; background:var(--dsw-alias-bg-base,#f6f7f9); border:1px solid var(--dsw-alias-border-l2,#d1d9e0); white-space:pre-wrap; word-break:break-word; font-family:var(--dsw-font-family-monospace, ui-monospace, Consolas, monospace); font-size:12.5px; max-height:320px; overflow:auto; }\n.fbx-empty { padding:24px 8px; text-align:center; color:var(--dsw-alias-label-tertiary,#59636e); font-size:13px; }\n.fbx-security { margin-top:14px; font-size:11.5px; color:var(--dsw-alias-label-tertiary,#59636e); }\n";

    function readPref(key, fallback) {
      try {
        const value = window.localStorage.getItem(key);
        return value === null ? fallback : value;
      } catch (error) {
        return fallback;
      }
    }

    function writePref(key, value) {
      try { window.localStorage.setItem(key, value); } catch (error) { /* ignore */ }
    }

    function removePref(key) {
      try { window.localStorage.removeItem(key); } catch (error) { /* ignore */ }
    }

    function pad2(n) { return n < 10 ? '0' + n : String(n); }

    function stampPrefix() {
      const d = new Date();
      return String(d.getFullYear()) + pad2(d.getMonth() + 1) + pad2(d.getDate()) + '-' +
        pad2(d.getHours()) + pad2(d.getMinutes()) + pad2(d.getSeconds()) + '_';
    }

    function defaultDevice() { return 'dsh'; }

    function normalizeDevice(value) {
      const s = String(value || '').toLowerCase()
        .replace(/[^a-z0-9._-]/g, '')
        .replace(/(^[._-]+)|([._-]+$)/g, '')
        .slice(0, 24);
      return s || defaultDevice();
    }

    function baseName(pathValue) {
      const s = String(pathValue || '').replace(/\\/g, '/');
      const index = s.lastIndexOf('/');
      return index >= 0 ? s.slice(index + 1) : s;
    }

    const TEXT_EXTENSIONS = ['txt', 'md', 'markdown', 'log', 'csv', 'tsv', 'json', 'yaml', 'yml'];
    function extensionOf(name) {
      const value = String(name || '');
      const index = value.lastIndexOf('.');
      return index >= 0 ? value.slice(index + 1).toLowerCase() : '';
    }
    function isTextName(name) {
      return TEXT_EXTENSIONS.indexOf(extensionOf(name)) !== -1;
    }

    function prettyName(name) {
      const m = String(name || '').match(/^[0-9]{8}-[0-9]{6}_([a-z0-9._-]+?)_(.*)$/i);
      return m ? m[2] : String(name || '');
    }

    function displayName(name) {
      let value = prettyName(name);
      if (isTextName(name)) {
        value = value.replace(/^text-/, '');
        const index = value.lastIndexOf('.');
        if (index >= 0) { value = value.slice(0, index); }
      }
      return value || String(name || '');
    }

    function prettyStamp(name) {
      const m = String(name || '').match(/^([0-9]{8})-([0-9]{6})_/);
      if (!m) { return ''; }
      return m[1].slice(0, 4) + '-' + m[1].slice(4, 6) + '-' + m[1].slice(6, 8) + ' ' +
        m[2].slice(0, 2) + ':' + m[2].slice(2, 4) + ':' + m[2].slice(4, 6);
    }

    function formatSize(bytes) {
      const n = Number(bytes) || 0;
      if (n < 1024) { return n + ' B'; }
      if (n < 1024 * 1024) { return (n / 1024).toFixed(1) + ' KB'; }
      return (n / (1024 * 1024)).toFixed(1) + ' MB';
    }

    function timeText() {
      const d = new Date();
      return pad2(d.getHours()) + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());
    }

    function textSnippet(value) {
      const newline = String.fromCharCode(10);
      const tab = String.fromCharCode(9);
      const backslash = String.fromCharCode(92);
      const lines = String(value || '').split(newline);
      let first = '';
      for (let i = 0; i < lines.length; i += 1) {
        if (lines[i].trim().length > 0) { first = lines[i].trim(); break; }
      }
      let s = '';
      for (let i = 0; i < first.length; i += 1) {
        const ch = first.charAt(i);
        if (ch === tab || ch === backslash || ch === '/' || ch === ':' || ch === '*' || ch === '?' || ch === String.fromCharCode(34) || ch === '<' || ch === '>' || ch === '|') { continue; }
        s += (ch === ' ') ? '_' : ch;
      }
      s = s.replace(/^[._-]+|[._-]+$/g, '');
      if (s.length > 24) { s = s.slice(0, 24); }
      if (!s) { s = 'msg-' + pad2(new Date().getHours()) + pad2(new Date().getMinutes()) + pad2(new Date().getSeconds()); }
      return s;
    }

    function suffixName(name, attempt) {
      const dot = name.lastIndexOf('.');
      if (dot <= 0) { return name + '-' + attempt; }
      return name.slice(0, dot) + '-' + attempt + name.slice(dot);
    }

    function fileToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = String(reader.result || '');
          const comma = result.indexOf(',');
          resolve(comma >= 0 ? result.slice(comma + 1) : result);
        };
        reader.onerror = () => reject(new Error('读取文件失败'));
        reader.readAsDataURL(blob);
      });
    }

    function errorText(error) {
      if (!error) { return '未知错误'; }
      if (error.network) { return '网络错误：连不上 api.github.com（检查网络或代理）'; }
      if (error.status === 401) { return '令牌无效或已过期，请重新生成。'; }
      if (error.status === 403) {
        if (error.data && error.data.message && /rate limit/i.test(error.data.message)) {
          return 'GitHub 限流了，等几分钟再试。';
        }
        return '令牌权限不足（需要 Contents: Read and write），或没有该仓库访问权限。';
      }
      if (error.status === 404) { return '仓库或 inbox 不存在，检查令牌是否选中 lyz-wave/filebox。'; }
      if (error.status === 422) { return '请求被拒绝：' + ((error.data && error.data.message) || '文件名冲突或内容过大'); }
      return '请求失败：' + (error.message || String(error));
    }

    async function readError(res) {
      let data = null;
      try { data = await res.json(); } catch (error) { data = null; }
      const err = new Error((data && data.message) || ('HTTP ' + res.status));
      err.status = res.status;
      err.data = data;
      return err;
    }

    function FileboxIcon({ size }) {
      return h('svg', {
        width: size || 18,
        height: size || 18,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.8,
        'aria-hidden': true,
        style: { display: 'block' }
      },
        h('rect', { x: 3, y: 6.5, width: 18, height: 13, rx: 3 }),
        h('path', { d: 'M3 10.5h18' }),
        h('path', { d: 'M8 15h8' })
      );
    }

    function FileboxPage() {
      const [token, setToken] = React.useState(readPref(LS_TOKEN, ''));
      const [device, setDevice] = React.useState(readPref(LS_DEVICE, defaultDevice()));
      const [remember, setRemember] = React.useState(readPref(LS_REMEMBER, '1') !== '0');
      const [autoSync, setAutoSync] = React.useState(readPref(LS_AUTOSYNC, '1') !== '0');
      const [connected, setConnected] = React.useState(false);
      const [files, setFiles] = React.useState([]);
      const [status, setStatus] = React.useState('未连接');
      const [error, setError] = React.useState('');
      const [showSetup, setShowSetup] = React.useState(readPref(LS_TOKEN, '') === '');
      const [text, setText] = React.useState('');
      const [query, setQuery] = React.useState('');
      const [busy, setBusy] = React.useState('');
      const [expanded, setExpanded] = React.useState({});
      const [texts, setTexts] = React.useState({});
      const [dragging, setDragging] = React.useState(false);

      const tokenRef = React.useRef(token);
      const deviceRef = React.useRef(device);
      const autoSyncRef = React.useRef(autoSync);
      const filesRef = React.useRef(files);
      const etagRef = React.useRef(null);
      const fileInputRef = React.useRef(null);

      tokenRef.current = token;
      deviceRef.current = device;
      autoSyncRef.current = autoSync;
      filesRef.current = files;

      async function api(pathname, options) {
        const opts = options || {};
        const headers = {
          Authorization: 'Bearer ' + tokenRef.current,
          Accept: 'application/vnd.github+json'
        };
        if (opts.body) { headers['Content-Type'] = 'application/json'; }
        let res;
        try {
          res = await fetch(API + pathname, {
            method: opts.method || 'GET',
            headers: headers,
            body: opts.body ? JSON.stringify(opts.body) : undefined,
            cache: 'no-store'
          });
        } catch (networkError) {
          const err = new Error('network');
          err.network = true;
          throw err;
        }
        if (!res.ok) { throw await readError(res); }
        if (res.status === 204) { return null; }
        const body = await res.text();
        return body ? JSON.parse(body) : null;
      }

      async function fetchInbox(conditional) {
        const pathname = '/repos/' + OWNER + '/' + REPO + '/contents/' + INBOX + '?ref=' + BRANCH;
        const headers = {
          Authorization: 'Bearer ' + tokenRef.current,
          Accept: 'application/vnd.github+json'
        };
        if (conditional && etagRef.current) { headers['If-None-Match'] = etagRef.current; }
        let res;
        try {
          res = await fetch(API + pathname, { headers: headers, cache: 'no-store' });
        } catch (networkError) {
          const err = new Error('network');
          err.network = true;
          throw err;
        }
        if (res.status === 304) { return { notModified: true, files: [] }; }
        if (res.status === 404) {
          etagRef.current = null;
          return { notModified: false, files: [] };
        }
        if (!res.ok) { throw await readError(res); }
        etagRef.current = res.headers.get('ETag');
        const data = await res.json();
        const list = Array.isArray(data) ? data.filter((item) => item.type === 'file' && item.name !== '.gitkeep') : [];
        return { notModified: false, files: list };
      }

      async function connect() {
        const trimmed = String(token || '').trim();
        if (!trimmed) { setError('请先填写令牌。'); return; }
        setBusy('connect');
        setError('');
        try {
          await api('/repos/' + OWNER + '/' + REPO);
          const result = await fetchInbox(false);
          setFiles(result.files || []);
          setConnected(true);
          setShowSetup(false);
          setStatus('自动同步' + (autoSyncRef.current ? ' · 每 5 秒' : '已关闭'));
          const dev = normalizeDevice(device);
          setDevice(dev);
          writePref(LS_DEVICE, dev);
          if (remember) {
            writePref(LS_TOKEN, trimmed);
            writePref(LS_REMEMBER, '1');
          } else {
            removePref(LS_TOKEN);
            writePref(LS_REMEMBER, '0');
          }
        } catch (connectError) {
          setConnected(false);
          setError(errorText(connectError));
        } finally {
          setBusy('');
        }
      }

      async function refreshList(silent) {
        try {
          const result = await fetchInbox(false);
          setFiles(result.files || []);
          setStatus('已同步 · ' + timeText());
          if (!silent) { setError(''); }
          return result.files || [];
        } catch (refreshError) {
          setStatus('刷新失败');
          setError(errorText(refreshError));
          return [];
        }
      }


      React.useEffect(() => {
        const saved = readPref(LS_TOKEN, '');
        if (saved) { connect(); }
      }, []);

      React.useEffect(() => {
        if (!connected || !autoSync) { return undefined; }
        let disposed = false;
        async function tick() {
          if (disposed || document.hidden) { return; }
          try {
            const result = await fetchInbox(true);
            if (result.notModified) { setStatus('已同步 · ' + timeText()); return; }
            const before = filesRef.current.map((file) => file.name + ':' + file.sha).join('|');
            const after = (result.files || []).map((file) => file.name + ':' + file.sha).join('|');
            if (before !== after) {
              const oldNames = {};
              filesRef.current.forEach((file) => { oldNames[file.name] = true; });
              const added = (result.files || []).filter((file) => !oldNames[file.name]);
              setFiles(result.files || []);
              setStatus(added.length > 0 ? ('刚同步到 ' + added.length + ' 个新条目') : ('列表已更新 · ' + timeText()));
            } else {
              setStatus('已同步 · ' + timeText());
            }
          } catch (pollError) {
            if (pollError && pollError.status === 401) { setStatus('令牌失效'); }
            else { setStatus('同步失败，稍后重试'); }
          }
        }
        const timer = setInterval(tick, SYNC_MS);
        const onVisible = () => { if (!document.hidden) { tick(); } };
        document.addEventListener('visibilitychange', onVisible);
        return () => {
          disposed = true;
          clearInterval(timer);
          document.removeEventListener('visibilitychange', onVisible);
        };
      }, [connected, autoSync]);

      async function uploadFiles(list) {
        if (!connected) { setError('请先连接 filebox。'); return; }
        const filesToSend = Array.from(list || []);
        if (filesToSend.length === 0) { return; }
        for (const file of filesToSend) {
          if (file.size > MAX_BYTES) {
            setError('「' + file.name + '」超过 50MB，请用电脑脚本发送。');
            continue;
          }
          setBusy('上传 ' + file.name);
          setError('');
          try {
            const content = await fileToBase64(file);
            const prefix = stampPrefix() + normalizeDevice(deviceRef.current) + '_';
            let name = prefix + file.name;
            let attempt = 0;
            while (true) {
              try {
                await api('/repos/' + OWNER + '/' + REPO + '/contents/' + INBOX + '/' + encodeURIComponent(name), {
                  method: 'PUT',
                  body: { message: 'dsh upload: ' + name, content: content, branch: BRANCH }
                });
                break;
              } catch (putError) {
                if (putError && putError.status === 422 && attempt < 5) {
                  attempt += 1;
                  name = suffixName(prefix + file.name, attempt);
                  continue;
                }
                throw putError;
              }
            }
            await refreshList(true);
          } catch (uploadError) {
            setError(errorText(uploadError));
          } finally {
            setBusy('');
          }
        }
      }

      async function sendText() {
        const value = String(text || '');
        if (!value.trim()) { setError('请先输入文字。'); return; }
        if (value.length > 200000) { setError('文字太长，请拆段发送。'); return; }
        setBusy('发送文字');
        setError('');
        try {
          const blob = new Blob([value], { type: 'text/plain;charset=utf-8' });
          const content = await fileToBase64(blob);
          const prefix = stampPrefix() + normalizeDevice(deviceRef.current) + '_';
          let name = prefix + 'text-' + textSnippet(value) + '.txt';
          let attempt = 0;
          while (true) {
            try {
              await api('/repos/' + OWNER + '/' + REPO + '/contents/' + INBOX + '/' + encodeURIComponent(name), {
                method: 'PUT',
                body: { message: 'dsh text: ' + name, content: content, branch: BRANCH }
              });
              break;
            } catch (putError) {
              if (putError && putError.status === 422 && attempt < 5) {
                attempt += 1;
                name = suffixName(prefix + 'text-' + textSnippet(value) + '.txt', attempt);
                continue;
              }
              throw putError;
            }
          }
          setText('');
          await refreshList(true);
          setStatus('文字已发送 · ' + timeText());
        } catch (sendError) {
          setError(errorText(sendError));
        } finally {
          setBusy('');
        }
      }

      async function deleteFile(file) {
        if (!window.confirm) { return; }
        const confirmed = window.confirm('删除 inbox/' + file.name + ' ？' + String.fromCharCode(10, 10) + '只从当前版本删除，git 历史里仍保留。');
        if (!confirmed) { return; }
        setBusy('删除');
        try {
          await api('/repos/' + OWNER + '/' + REPO + '/contents/' + INBOX + '/' + encodeURIComponent(file.name), {
            method: 'DELETE',
            body: { message: 'dsh delete: ' + file.name, sha: file.sha, branch: BRANCH }
          });
          await refreshList(true);
        } catch (deleteError) {
          setError(errorText(deleteError));
        } finally {
          setBusy('');
        }
      }

      async function downloadFile(file) {
        try {
          const url = API + '/repos/' + OWNER + '/' + REPO + '/contents/' + INBOX + '/' + encodeURIComponent(file.name) + '?ref=' + BRANCH;
          const res = await fetch(url, {
            headers: { Authorization: 'Bearer ' + tokenRef.current, Accept: 'application/vnd.github.raw' },
            cache: 'no-store'
          });
          if (!res.ok) { throw await readError(res); }
          const blob = await res.blob();
          const objectUrl = URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = objectUrl;
          anchor.download = prettyName(file.name) || file.name;
          anchor.rel = 'noopener';
          document.body.appendChild(anchor);
          anchor.click();
          anchor.remove();
          setTimeout(() => { URL.revokeObjectURL(objectUrl); }, 60000);
        } catch (downloadError) {
          setError(errorText(downloadError));
        }
      }

      async function copyTextFile(file) {
        try {
          const content = await getTextContent(file);
          await copyToClipboard(content);
          setStatus('已复制 ' + content.length + ' 个字');
        } catch (copyError) {
          setError('复制失败：' + (copyError && copyError.message ? copyError.message : String(copyError)));
        }
      }

      async function getTextContent(file) {
        const cached = texts[file.name];
        if (typeof cached === 'string') { return cached; }
        const url = API + '/repos/' + OWNER + '/' + REPO + '/contents/' + INBOX + '/' + encodeURIComponent(file.name) + '?ref=' + BRANCH;
        const res = await fetch(url, {
          headers: { Authorization: 'Bearer ' + tokenRef.current, Accept: 'application/vnd.github.raw' },
          cache: 'no-store'
        });
        if (!res.ok) { throw await readError(res); }
        const content = await res.text();
        setTexts((previous) => {
          const next = Object.assign({}, previous);
          next[file.name] = content;
          return next;
        });
        return content;
      }

      async function togglePreview(file) {
        if (expanded[file.name]) {
          setExpanded((previous) => {
            const next = Object.assign({}, previous);
            delete next[file.name];
            return next;
          });
          return;
        }
        try {
          await getTextContent(file);
          setExpanded((previous) => {
            const next = Object.assign({}, previous);
            next[file.name] = true;
            return next;
          });
        } catch (previewError) {
          setError(errorText(previewError));
        }
      }

      function copyToClipboard(content) {
        if (navigator.clipboard && window.isSecureContext) {
          return navigator.clipboard.writeText(content);
        }
        return new Promise((resolve, reject) => {
          const area = document.createElement('textarea');
          area.value = content;
          area.setAttribute('readonly', 'readonly');
          area.style.position = 'fixed';
          area.style.opacity = '0';
          document.body.appendChild(area);
          area.select();
          try {
            if (document.execCommand('copy')) { resolve(); } else { reject(new Error('浏览器不允许复制')); }
          } catch (copyError) {
            reject(copyError);
          } finally {
            document.body.removeChild(area);
          }
        });
      }

      function openExternalPage(event) {
        if (event) { event.preventDefault(); }
        try { window.open(PAGE_URL, '_blank'); } catch (openError) { /* ignore */ }
      }

      const filtered = files.slice().sort((a, b) => (a.name < b.name ? 1 : (a.name > b.name ? -1 : 0))).filter((file) => {
        const q = query.trim().toLowerCase();
        return !q || file.name.toLowerCase().indexOf(q) !== -1;
      });

      function renderSetup() {
        return h('section', { className: 'fbx-card' },
          h('h2', null, '连接 filebox'),
          h('p', { className: 'fbx-muted' }, '文件保存在私有仓库 lyz-wave/filebox 的 inbox/ 里；这个页面只负责界面，令牌只在本机浏览器中使用。'),
          h('details', { className: 'fbx-howto' },
            h('summary', null, '怎么生成令牌（约 1 分钟）'),
            h('ol', null,
              h('li', null, '打开 ', h('a', { href: 'https://github.com/settings/personal-access-tokens/new', target: '_blank', rel: 'noreferrer' }, 'GitHub 新建 Fine-grained token'), '；'),
              h('li', null, 'Resource owner 选 lyz-wave，Repository access 只选 lyz-wave/filebox；'),
              h('li', null, 'Repository permissions 把 Contents 设为 Read and write；'),
              h('li', null, '复制生成的 github_pat_... 粘贴到下面。')
            )
          ),
          h('label', { className: 'fbx-field' },
            h('span', null, '令牌'),
            h('input', {
              type: 'password',
              value: token,
              placeholder: 'github_pat_...',
              autocomplete: 'off',
              spellCheck: false,
              onChange: (event) => { setToken(event.target.value); }
            })
          ),
          h('label', { className: 'fbx-field' },
            h('span', null, '设备名（会写进文件名）'),
            h('input', {
              type: 'text',
              value: device,
              maxLength: 24,
              placeholder: 'dsh / ipad',
              onChange: (event) => { setDevice(event.target.value); }
            })
          ),
          h('label', { className: 'fbx-check' },
            h('input', { type: 'checkbox', checked: remember, onChange: (event) => { setRemember(event.target.checked); } }),
            '在这台机器上记住令牌（localStorage）'
          ),
          h('div', { className: 'fbx-row-actions' },
            h('button', { className: 'fbx-btn primary', type: 'button', disabled: busy === 'connect', onClick: () => connect() }, busy === 'connect' ? '连接中…' : '保存并连接'),
            connected ? h('button', { className: 'fbx-btn small', type: 'button', onClick: () => setShowSetup(false) }, '收起') : null
          )
        );
      }

      function renderTextPreview(file) {
        if (!expanded[file.name]) { return null; }
        const content = texts[file.name];
        return h('pre', { className: 'fbx-preview' }, typeof content === 'string' ? content : '读取中…');
      }

      function renderItem(file) {
        const isText = isTextName(file.name);
        return h('li', { className: 'fbx-item', key: file.name },
          h('div', { className: 'fbx-item-main' },
            h('span', { className: 'fbx-icon', 'aria-hidden': true }, isText ? '💬' : '📄'),
            h('div', { className: 'fbx-item-text' },
              h('div', { className: 'fbx-item-title', title: file.name }, displayName(file.name)),
              h('div', { className: 'fbx-item-meta' }, (prettyStamp(file.name) ? prettyStamp(file.name) + ' · ' : '') + formatSize(file.size) + ' · ' + file.name)
            ),
            h('div', { className: 'fbx-item-actions' },
              isText ? h('button', { className: 'fbx-btn small', type: 'button', onClick: () => { togglePreview(file); } }, expanded[file.name] ? '收起' : '查看') : null,
              isText ? h('button', { className: 'fbx-btn small', type: 'button', onClick: () => { copyTextFile(file); } }, '复制') : null,
              !isText ? h('button', { className: 'fbx-btn small', type: 'button', onClick: () => { downloadFile(file); } }, '下载') : null,
              h('button', { className: 'fbx-btn small danger', type: 'button', onClick: () => { deleteFile(file); } }, '删除')
            )
          ),
          renderTextPreview(file)
        );
      }

      function renderMain() {
        return h('div', null,
          h('section', { className: 'fbx-card' },
            h('div', { className: 'fbx-toolbar' },
              h('h2', { style: { margin: 0 } }, 'inbox'),
              h('span', { className: 'fbx-muted' }, String(files.length) + ' 个条目'),
              h('input', { className: 'fbx-input', type: 'search', placeholder: '搜索…', value: query, onChange: (event) => { setQuery(event.target.value); } }),
              h('label', { className: 'fbx-check' },
                h('input', { type: 'checkbox', checked: autoSync, onChange: (event) => { const value = event.target.checked; setAutoSync(value); writePref(LS_AUTOSYNC, value ? '1' : '0'); setStatus(value ? '自动同步已开启' : '自动同步已关闭'); } }),
                '自动同步'
              ),
              h('button', { className: 'fbx-btn small', type: 'button', disabled: busy !== '', onClick: () => { refreshList(false); } }, '刷新')
            ),
            h('p', { className: 'fbx-muted', style: { marginTop: 6 } },
              '状态：' + status + (busy ? ' · ' + busy : '')
            ),
            filtered.length === 0
              ? h('div', { className: 'fbx-empty' }, files.length === 0 ? '还没有条目；发一个文件或一段文字试试。' : '没有匹配。')
              : h('ul', { className: 'fbx-list' }, filtered.map(renderItem))
          ),
          h('section', { className: 'fbx-card' },
            h('h2', null, '发送文字 / 剪贴板'),
            h('textarea', {
              className: 'fbx-textarea',
              value: text,
              placeholder: '粘贴网址、口令、验证码、一段备忘……（Ctrl+Enter 发送）',
              onChange: (event) => { setText(event.target.value); },
              onKeyDown: (event) => { if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') { event.preventDefault(); sendText(); } }
            }),
            h('div', { className: 'fbx-row-actions' },
              h('button', { className: 'fbx-btn primary', type: 'button', disabled: busy === '发送文字', onClick: () => { sendText(); } }, '发送文字'),
              h('button', { className: 'fbx-btn small', type: 'button', onClick: () => { setText(''); } }, '清空'),
              h('span', { className: 'fbx-muted' }, String(text.length) + ' 字')
            )
          ),
          h('section', { className: 'fbx-card' },
            h('h2', null, '发送文件'),
            h('input', {
              ref: fileInputRef,
              type: 'file',
              multiple: true,
              style: { display: 'none' },
              onChange: (event) => { uploadFiles(event.target.files); event.target.value = ''; }
            }),
            h('div', {
              className: 'fbx-drop' + (dragging ? ' drag' : ''),
              role: 'button',
              tabIndex: 0,
              onClick: () => { if (fileInputRef.current) { fileInputRef.current.click(); } },
              onDragOver: (event) => { event.preventDefault(); setDragging(true); },
              onDragLeave: (event) => { event.preventDefault(); setDragging(false); },
              onDrop: (event) => {
                event.preventDefault();
                setDragging(false);
                if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length) { uploadFiles(event.dataTransfer.files); }
              }
            },
              h('p', { className: 'fbx-drop-title' }, '拖文件到这里，或点击选择'),
              h('p', { className: 'fbx-drop-hint' }, '单文件建议 25MB 以内，页面硬上限 50MB；文件会进入 inbox/')
            ),
            h('div', { className: 'fbx-row-actions' },
              h('span', { className: 'fbx-muted' }, '设备：' + normalizeDevice(device) + ' · 仓库：lyz-wave/filebox')
            )
          ),
          h('section', { className: 'fbx-card' },
            h('a', { className: 'fbx-btn small', href: PAGE_URL, target: '_blank', rel: 'noreferrer' }, '打开网页版'),
            h('span', { className: 'fbx-muted', style: { marginLeft: 10 } }, '同一套 inbox，浏览器里也能用'),
            h('div', { className: 'fbx-security' }, '令牌只保存在本机；上传/下载直接请求 api.github.com；删除只影响当前版本，历史仍保留。')
          )
        );
      }

      return h('div', { className: 'fbx-page' },
        h('style', null, STYLE),
        h('div', { className: 'fbx-inner' },
          h('header', { className: 'fbx-header' },
            h('div', null,
              h('h1', { className: 'fbx-title' }, '文件箱'),
              h('p', { className: 'fbx-sub' }, 'lyz-wave/filebox · 文件与文字投递箱')
            ),
            h('div', { className: 'fbx-header-actions' },
              h('span', { className: 'fbx-pill' + (connected ? ' ok' : '') }, connected ? status : '未连接'),
              h('button', { className: 'fbx-btn small', type: 'button', onClick: () => { setShowSetup((value) => !value); } }, connected ? '设置' : '连接'),
              h('button', { className: 'fbx-btn small', type: 'button', onClick: () => { refreshList(false); } }, '刷新')
            )
          ),
          error ? h('div', { className: 'fbx-error' }, error) : null,
          (showSetup || !connected) ? renderSetup() : null,
          connected ? renderMain() : null
        )
      );
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        try { window.__dshFileboxLoaded = true; } catch (error) { /* ignore */ }
        ctx.slots.inject('main', () => ctx.slots.register({
          name: 'main',
          key: 'filebox'
        }, FileboxPage));
        ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
          name: 'sidebar.panellist',
          id: 'filebox',
          order: 40,
          label: () => '文件箱'
        }, FileboxIcon));
      }
    };
  }
});
