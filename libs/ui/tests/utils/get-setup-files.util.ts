import { readdir } from 'fs/promises';
import path from 'path';

export async function getSetupFiles() {
  const setupFolder = path.resolve(__dirname, '..', 'setup');

  const files = await readdir(setupFolder, { withFileTypes: true });

  return files.map((file) => path.join(setupFolder, file.name));
}
