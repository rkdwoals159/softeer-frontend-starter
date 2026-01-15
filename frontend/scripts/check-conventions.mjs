import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'src');

const pascalCase = /^[A-Z][A-Za-z0-9]*$/;
const camelCase = /^[a-z][A-Za-z0-9]*$/;

const componentDirs = [
  path.join(SRC_DIR, 'components'),
  path.join(SRC_DIR, 'screens'),
  path.join(SRC_DIR, 'shared', 'ui'),
];

const camelCaseDirs = [
  path.join(SRC_DIR, 'hooks'),
  path.join(SRC_DIR, 'utils'),
  path.join(SRC_DIR, 'styles'),
  path.join(SRC_DIR, 'shared', 'lib'),
  path.join(SRC_DIR, 'shared', 'api'),
];

const allowedSuffixes = ['types', 'test', 'spec', 'stories', 'styles'];

const errors = [];

const listDirs = (dirPath) =>
  fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

const listFiles = (dirPath) =>
  fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);

const isPascalCaseDirName = (name) => name.startsWith('@') || pascalCase.test(name);

const isCamelCaseFile = (filename) => {
  const ext = path.extname(filename);
  if (!ext) return true;
  const basename = filename.slice(0, -ext.length);
  if (basename === 'index') return true;
  const parts = basename.split('.');
  const name = parts[0];
  const suffix = parts[1];
  if (!camelCase.test(name)) return false;
  if (suffix && !allowedSuffixes.includes(suffix)) return false;
  return true;
};

const isComponentFile = (filename, dirName) => {
  const ext = path.extname(filename);
  if (!ext || !['.ts', '.tsx'].includes(ext)) return true;
  const base = filename.slice(0, -ext.length);
  if (base === 'index') return true;
  if (base === dirName) return true;
  if (base.startsWith(`${dirName}.`)) {
    const suffix = base.replace(`${dirName}.`, '');
    return allowedSuffixes.includes(suffix);
  }
  return false;
};

const checkComponentDirs = () => {
  for (const baseDir of componentDirs) {
    if (!fs.existsSync(baseDir)) continue;
    for (const dirName of listDirs(baseDir)) {
      if (!isPascalCaseDirName(dirName)) {
        errors.push(
          `컴포넌트 폴더명은 PascalCase 여야 합니다: ${path.relative(
            ROOT,
            path.join(baseDir, dirName),
          )}`,
        );
      }
      const targetDir = path.join(baseDir, dirName);
      const files = listFiles(targetDir).filter((file) => !file.startsWith('.'));
      for (const file of files) {
        if (!isComponentFile(file, dirName)) {
          errors.push(
            `컴포넌트 파일명은 폴더명과 일치해야 합니다: ${path.relative(
              ROOT,
              path.join(targetDir, file),
            )}`,
          );
        }
      }
    }
  }
};

const checkCamelCaseDirs = () => {
  for (const baseDir of camelCaseDirs) {
    if (!fs.existsSync(baseDir)) continue;
    const stack = [baseDir];
    while (stack.length) {
      const current = stack.pop();
      for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
        if (entry.name.startsWith('.')) continue;
        const fullPath = path.join(current, entry.name);
        if (entry.isDirectory()) {
          stack.push(fullPath);
          continue;
        }
        if (!isCamelCaseFile(entry.name)) {
          errors.push(`파일명은 camelCase 여야 합니다: ${path.relative(ROOT, fullPath)}`);
        }
      }
    }
  }
};

const main = () => {
  if (!fs.existsSync(SRC_DIR)) {
    console.error('src 폴더를 찾지 못했습니다.');
    process.exit(1);
  }

  checkComponentDirs();
  checkCamelCaseDirs();

  if (errors.length) {
    console.error('\n[컨벤션 위반]');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }
};

main();
