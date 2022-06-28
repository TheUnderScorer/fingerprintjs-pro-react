import { Plugin } from "release-it";
import { getCurrentVersion } from "./utils.mjs";

export default class ReleasePlugin extends Plugin {
  async getIncrement() {
    return await getCurrentVersion();
  }

  async init() {
    this.config.options.version.increment = await getCurrentVersion();
  }
}
