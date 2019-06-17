const QUnit = require("steal-qunit");
const { mixinObject } = require("./helpers");
const { hooks } = require("../src/define");

QUnit.module("can-define-mixin - define()");

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
	new Faves();
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

  new Faves();
});

QUnit.test("Default strings work when they are like can-define types", function(assert) {
	class Person extends mixinObject() {
		static get define() {
			return {
				someProp: "number"
			};
		}
	}

	let p = new Person();
	assert.equal(p.someProp, "number", "Is the string 'number'");
});

QUnit.test("initialize can be called multiple times if Symbol is reset", function(assert) {
	const metaSymbol = Symbol.for("can.meta");
	class Obj extends mixinObject() {
		static get define() {
			return { age: Number };
		}
	}

	const obj = new Obj({ age: 30 });
	assert.equal(obj.age, 30, "initialized once by constructor");

	obj[metaSymbol].initialized = false;
	hooks.initialize(obj, { age: 35 });
	assert.equal(obj.age, 35, "initialized again");
});
