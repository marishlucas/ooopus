class ScriptLoader {
  constructor() {
    this.init();
  }

  async init() {
    try {
      await this.loadScript("./animation.js");
      console.log("animation.js loaded successfully");
      await this.loadScript("./locomotive.js");
      console.log("locomotive.js loaded successfully");
    } catch (error) {
      console.error("Error loading scripts:", error);
    }
  }

  async loadScript(scriptPath) {
    return import(scriptPath);
  }
}

new ScriptLoader();
