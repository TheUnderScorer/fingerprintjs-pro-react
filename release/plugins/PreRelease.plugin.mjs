import { Plugin } from "release-it";
import { $ } from "zx";

export default class PreReleasePlugin extends Plugin {
  async afterRelease() {
    const isDryRun = this.config.options["dry-run"];

    const pkg = await import('../../package.json', {
      assert: {
        type: 'json'
      }
    }).then(module => module.default)

    if (!isDryRun) {
      await $`git checkout -b release/${pkg.version}`;
      await $`git push origin release/${pkg.version} --follow-tags`;
    }

    return super.afterRelease();
  }
}
