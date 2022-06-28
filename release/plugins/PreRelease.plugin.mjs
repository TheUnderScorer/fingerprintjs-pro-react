import { Plugin } from "release-it";
import pkg from "../../package.json" assert { type: "json" };
import { $ } from "zx";

export default class PreReleasePlugin extends Plugin {
  async afterRelease() {
    const isDryRun = this.config.options["dry-run"];

    if (!isDryRun) {
      await $`git checkout -b release/${pkg.version}`;
      await $`git push origin release/${pkg.version}`;
    }

    return super.afterRelease();
  }
}
