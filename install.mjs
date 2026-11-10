#!/usr/bin/env node
// 安装/卸载 dsh-filebox 插件到 DSH profile（等价于 plugin_manager 的本地 link 安装）。
// 只在当前机器、当前 profile 上做：junction + profile package.json + bundles 选择。
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLUGIN_DIR = path.resolve(__dirname);
const argv = process.argv.slice(2);
let PROFILE = process.env.DSH_PROFILE || 'desktop';
let DSH_HOME_OVERRIDE = process.env.DSH_HOME || '';
for (let i = 0; i < argv.length; i += 1) {
  if (argv[i] === '--profile' && argv[i + 1]) { PROFILE = argv[i + 1]; i += 1; }
  else if (argv[i] === '--dsh-home' && argv[i + 1]) { DSH_HOME_OVERRIDE = argv[i + 1]; i += 1; }
}
const DSH_HOME = process.env.DSH_HOME || DSH_HOME_OVERRIDE || path.join(os.homedir(), '.dsh');
const PROFILE_DIR = path.join(DSH_HOME, 'profiles', PROFILE);
const PLUGIN_NAME = 'dsh-filebox';

function log(message) {
  console.log('[install-dsh-filebox] ' + message);
}

function fail(message) {
  console.error('[install-dsh-filebox] ERROR: ' + message);
  process.exit(1);
}

function backup(file) {
  if (!fs.existsSync(file)) return null;
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const target = file + '.bak-' + stamp;
  fs.copyFileSync(file, target);
  log('backup ' + path.basename(target));
  return target;
}

function ensureJunction(linkPath, targetPath) {
  if (!fs.existsSync(targetPath)) fail('missing plugin directory: ' + targetPath);
  fs.mkdirSync(path.dirname(linkPath), { recursive: true });
  let existing = null;
  try { existing = fs.lstatSync(linkPath); } catch (error) { if (error.code !== 'ENOENT') fail(String(error)); }
  if (existing) {
    if (!existing.isSymbolicLink()) fail('path exists and is not a junction: ' + linkPath);
    let same = false;
    try { same = path.resolve(fs.realpathSync(linkPath)).toLowerCase() === path.resolve(fs.realpathSync(targetPath)).toLowerCase(); } catch (error) { same = false; }
    if (same) { log('junction ok: ' + linkPath); return; }
    fs.rmSync(linkPath, { recursive: true, force: true });
    log('junction replaced: ' + linkPath);
  }
  fs.symlinkSync(targetPath, linkPath, process.platform === 'win32' ? 'junction' : 'dir');
  log('junction created: ' + linkPath);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeJson(file, value) {
  const payload = JSON.stringify(value, null, 2) + '\n';
  fs.writeFileSync(file, payload, 'utf8');
}

function install() {
  if (!fs.existsSync(PROFILE_DIR)) fail('profile directory not found: ' + PROFILE_DIR);
  const pkgFile = path.join(PROFILE_DIR, 'package.json');
  const pkg = fs.existsSync(pkgFile) ? readJson(pkgFile) : { name: 'dsh-profile-' + PROFILE, private: true, dependencies: {}, dsh: { profile: { bundles: [] } } };
  pkg.dependencies = pkg.dependencies || {};
  pkg.dsh = pkg.dsh || {};
  pkg.dsh.profile = pkg.dsh.profile || {};
  if (!Array.isArray(pkg.dsh.profile.bundles)) pkg.dsh.profile.bundles = [];

  ensureJunction(path.join(DSH_HOME, 'plugins', PLUGIN_NAME), PLUGIN_DIR);
  ensureJunction(path.join(PROFILE_DIR, 'node_modules', PLUGIN_NAME), path.join(DSH_HOME, 'plugins', PLUGIN_NAME));

  const linkValue = 'link:' + path.join(DSH_HOME, 'plugins', PLUGIN_NAME).replace(/\\/g, '/');
  let changed = false;
  if (pkg.dependencies[PLUGIN_NAME] !== linkValue) { pkg.dependencies[PLUGIN_NAME] = linkValue; changed = true; }
  if (!pkg.dsh.profile.bundles.includes(PLUGIN_NAME)) { pkg.dsh.profile.bundles.push(PLUGIN_NAME); changed = true; }

  if (changed) {
    backup(pkgFile);
    writeJson(pkgFile, pkg);
    log('profile package.json updated: dependency link + bundle selection');
  } else {
    log('profile package.json already up to date');
  }

  log('installed. profile=' + PROFILE + ' plugin=' + PLUGIN_DIR);
  console.log('INSTALL_OK ' + JSON.stringify({ profile: PROFILE, plugin: PLUGIN_NAME, dir: PLUGIN_DIR }));
}

install();