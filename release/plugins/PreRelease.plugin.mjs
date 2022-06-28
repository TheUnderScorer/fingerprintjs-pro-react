import { Plugin } from "release-it";
import { $ } from "zx";
import { getCurrentVersion } from "./utils.mjs";

export default class PreReleasePlugin extends Plugin {
  async afterRelease() {
    const isDryRun = this.config.options["dry-run"];

    const version = getCurrentVersion();

    if (!isDryRun) {
      await $`git checkout -b release/${version}`;
      await $`git push origin release/${version} --follow-tags`;
      await $`gh pr create --title "Release ${version}" --body "Release ${version}"`;
    }

    return super.afterRelease();
  }
}
