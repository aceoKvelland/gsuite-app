const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'akeo-gsuit-win32-ia32/'),
    authors: 'Naveen Agarwal',
    noMsi: false,
    setupMsi: 'AkeoGSuit.msi',
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'akeo-gsuit.exe',
    setupExe: 'AkeoGSuit.exe',
    loadingGif: path.join(rootPath, 'assets', 'icons', 'win', 'loading.gif'),
    setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'akeo.ico')
  })
}