const QUnit = require("steal-qunit");
const { mixinObject } = require("./helpers");

QUnit.module("can-define-mixin - define()");

const supportsCustomElements = "customElements" in window;

QUnit.test("Can define stuff", function(assert) {
  class Faves extends mixinObject() {
    static get define() {
      return {
		  color: {
			  default: "blue"
		  }
      };
    }
  }

  let faves = new Faves();
  assert.equal(faves.color, "blue", "Got the value");
});

QUnit.test("Does not throw if no define is provided", function(assert) {
	class Faves extends mixinObject() {}
	const faves = new Faves();
	assert.ok(true, "Did not throw");
});

QUnit.test("Stuff is defined in constructor for non-element classes", function(assert) {
  class Faves extends mixinObject(Object) {
    static get define() {
      return {
		  color: {
			  default: "blue"
		  }
      };
    }

	constructor() {
		super();
		assert.equal(this.color, "blue", "color exists after constructor");
	}
  }

  let faves = new Faves();
});
