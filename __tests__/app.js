"use strict";

const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-vlcj:app", () => {
  beforeEach(() => {
    return helpers.run(path.join(__dirname, "../generators/app")).withPrompts({
      groupId: "uk.co.caprica",
      name: "test",
      description: "test project",
      packageName: "uk.co.caprica.test",
      mainClassName: "Main",
      useComponent: "Y",
      vlcjVersion: "4.4.1",
      sourceJdk: "1.8",
      targetJdk: "1.8",
      gitIgnore: "Y",
      gitKeep: "Y",
    });
  });

  it("creates files", () => {
    assert.file(["src/main/java/uk/co/caprica/test/Main.java"]);
  });
});
