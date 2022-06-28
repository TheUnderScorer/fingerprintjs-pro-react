export async function getCurrentVersion() {
  const pkg = await import('../../package.json', {
    assert: {
      type: 'json'
    }
  }).then(module => module.default)

  return pkg.version;
}
