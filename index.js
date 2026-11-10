import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const LOG_FILE = path.join(os.tmpdir(), 'dsh-filebox-plugin.log');

function log(message) {
  try {
    fs.appendFileSync(LOG_FILE, '[' + new Date().toISOString() + '] ' + message + String.fromCharCode(10));
  } catch (error) {
    // Diagnostics must never fail activation.
  }
}

export const name = 'dsh-filebox';
export const inject = ['tools'];

function repoCandidates() {
  return [
    process.env.FILEBOX_REPO,
    path.join(os.homedir(), 'Desktop', '文件传输'),
    path.join(os.homedir(), 'filebox')
  ].filter((value) => typeof value === 'string' && value.length > 0);
}

function resolveRepo() {
  for (const dir of repoCandidates()) {
    try {
      if (fs.statSync(dir).isDirectory() && fs.existsSync(path.join(dir, 'send.ps1')) && fs.existsSync(path.join(dir, 'recv.ps1'))) {
        return dir;
      }
    } catch (error) {
      // try the next candidate
    }
  }
  throw new Error('找不到 filebox 仓库目录。可用环境变量 FILEBOX_REPO 指定；候选：' + repoCandidates().join(' / '));
}

async function invokeScript(scriptBaseName, positional, switches) {
  const repo = resolveRepo();
  const isWindows = process.platform === 'win32';
  const script = path.join(repo, scriptBaseName + (isWindows ? '.ps1' : '.sh'));
  if (!fs.existsSync(script)) {
    throw new Error('filebox 脚本不存在：' + script);
  }
  const positionalArgs = positional || [];
  const switchArgs = switches || [];
  const command = isWindows ? 'powershell.exe' : 'bash';
  const argv = isWindows
    ? ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', script, ...positionalArgs, ...switchArgs]
    : [script, ...positionalArgs, ...switchArgs];
  try {
    const result = await execFileAsync(command, argv, {
      cwd: repo,
      timeout: 180000,
      maxBuffer: 16 * 1024 * 1024,
      windowsHide: true
    });
    const output = ((result.stdout || '') + (result.stderr ? String.fromCharCode(10) + result.stderr : '')).trim();
    return { ok: true, output: output };
  } catch (error) {
    const output = ((error.stdout || '') + (error.stderr ? String.fromCharCode(10) + error.stderr : '')).trim();
    return { ok: false, output: output || (error.message || String(error)) };
  }
}

const OUTPUT = {
  schema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      ok: { type: 'boolean' },
      output: { type: 'string' }
    },
    required: ['ok', 'output']
  },
  render: (args, value) => [{ type: 'text', text: value.ok ? value.output : ('filebox 失败：' + value.output) }]
};

const SEND_TOOL = {
  name: 'filebox_send',
  description: '把本机上的文件或文件夹发送到 filebox 私有仓库（其他设备可用 recv 或网页版收到）。',
  parameters: {
    type: 'object',
    additionalProperties: false,
    properties: {
      paths: {
        type: 'array',
        items: { type: 'string' },
        description: '要发送的本地绝对路径，可一次给多个文件或文件夹。'
      },
      note: {
        type: 'string',
        description: '可选的自定义提交说明。'
      }
    },
    required: ['paths']
  },
  output: OUTPUT,
  async execute(args, exec) {
    const switches = [];
    if (args.note) { switches.push('-Message', args.note); }
    return invokeScript('send', args.paths, switches);
  }
};

const TEXT_TOOL = {
  name: 'filebox_text',
  description: '把一段文字（网址、口令、验证码、备忘）发送到 filebox 私有仓库。',
  parameters: {
    type: 'object',
    additionalProperties: false,
    properties: {
      text: {
        type: 'string',
        description: '要发送的文字，保留换行。'
      },
      note: {
        type: 'string',
        description: '可选的自定义提交说明。'
      }
    },
    required: ['text']
  },
  output: OUTPUT,
  async execute(args, exec) {
    const switches = [];
    if (args.note) { switches.push('-Message', args.note); }
    return invokeScript('text', [args.text], switches);
  }
};

const RECEIVE_TOOL = {
  name: 'filebox_receive',
  description: '从 filebox 私有仓库拉取最新文件，并列出本次收到或变化的内容。',
  parameters: {
    type: 'object',
    additionalProperties: false,
    properties: {}
  },
  output: OUTPUT,
  async execute(args, exec) {
    const isWindows = process.platform === 'win32';
    const switches = isWindows ? ['-Quiet'] : [];
    return invokeScript('recv', [], switches);
  }
};

function registerTools(ctx) {
  const disposers = [];
  const register = (tool, label) => {
    try {
      const dispose = ctx.tools.register(tool);
      disposers.push({ label: label, dispose: dispose });
      log('registered tool: ' + label);
    } catch (error) {
      log('register failed ' + label + ': ' + (error && error.message ? error.message : String(error)));
    }
  };
  register(SEND_TOOL, 'filebox_send');
  register(TEXT_TOOL, 'filebox_text');
  register(RECEIVE_TOOL, 'filebox_receive');
  return () => {
    for (const item of disposers) {
      try { if (typeof item.dispose === 'function') { item.dispose(); } } catch (error) { /* ignore */ }
      log('disposed tool: ' + item.label);
    }
  };
}

export function apply(ctx) {
  log('apply called; tools=' + typeof ctx.tools + '; repo=' + repoCandidates().join(' | '));
  if (!ctx.tools) {
    log('tools service missing; filebox tools not registered');
    return;
  }
  try {
    ctx.effect(() => registerTools(ctx), 'dsh-filebox tools');
    log('filebox tools registered');
  } catch (error) {
    log('apply failed: ' + (error && error.message ? error.message : String(error)));
  }
}
