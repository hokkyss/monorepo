import path from 'path';

export async function createEntries() {
  const srcFolder = path.resolve(__dirname, '..', '..', 'src');

  const folders = [
    path.join(srcFolder, 'atoms'),
    path.join(srcFolder, 'molecules'),
    path.join(srcFolder, 'organisms'),
    path.join(srcFolder, 'templates'),
  ];

  const [atomsFolder, moleculesFolder, organismsFolder, templatesFolder] = folders;
  // const [atomsFolderContent, moleculesFolderContent, organismsFolderContent, templatesFolderContent] =
  //   await Promise.all(folders.map((src) => readdir(src, { withFileTypes: true })));

  // const entries: Record<string, string> = {};

  // atomsFolderContent.forEach((dirent) => {
  //   if (dirent.name === 'index.ts' && dirent.isFile()) {
  //     entries['atoms/index'] = path.join(atomsFolder, dirent.name);
  //   }
  //   if (dirent.isDirectory()) {
  //     const folderPath = path.join(atomsFolder, dirent.name);

  //     entries[`atoms/${dirent.name}`] = path.join(folderPath, `${dirent.name}.atom`);
  //   }
  // });

  // moleculesFolderContent.forEach((dirent) => {
  //   if (dirent.name === 'index.ts' && dirent.isFile()) {
  //     entries['molecules/index'] = path.join(moleculesFolder, dirent.name);
  //   }
  //   if (dirent.isDirectory()) {
  //     const folderPath = path.join(moleculesFolder, dirent.name);

  //     entries[`molecules/${dirent.name}`] = path.join(folderPath, `${dirent.name}.molecule`);
  //   }
  // });

  // organismsFolderContent.forEach((dirent) => {
  //   if (dirent.name === 'index.ts' && dirent.isFile()) {
  //     entries['organisms/index'] = path.join(organismsFolder, dirent.name);
  //   }
  //   if (dirent.isDirectory()) {
  //     const folderPath = path.join(organismsFolder, dirent.name);

  //     entries[`organisms/${dirent.name}`] = path.join(folderPath, `${dirent.name}.organism`);
  //   }
  // });

  // templatesFolderContent.forEach((dirent) => {
  //   if (dirent.name === 'index.ts' && dirent.isFile()) {
  //     entries['templates/index'] = path.join(templatesFolder, dirent.name);
  //   }
  //   if (dirent.isDirectory()) {
  //     const folderPath = path.join(templatesFolder, dirent.name);

  //     entries[`templates/${dirent.name}`] = path.join(folderPath, `${dirent.name}.template`);
  //   }
  // });

  const entries = {
    'atoms/index': atomsFolder,
    'molecules/index': moleculesFolder,
    'organisms/index': organismsFolder,
    'templates/index': templatesFolder,
  };

  return entries;
}
