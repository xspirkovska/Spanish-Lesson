// MemoryGame JS Unit Tests go here
/* QUnit, $ */

var module,
stub,
$fixture;

QUnit.module('main.js', function(hooks) {

  hooks.beforeEach( function () {
    $fixture = $('#qunit-fixture');
    module = MemoryGame;
  });

  hooks.afterEach(function() {
    stub.restore();
  });

  QUnit.module('setup()', function() {
    QUnit.test('Should initialize', function (assert) {
      stub = sinon.stub(module, 'setup');
      module.startButton.click();
      assert.ok(module.setup, 'setup() method is invoked');
    });
  });

  QUnit.module('updateMarkup()', function() {
    QUnit.test('Should setup game', function (assert) {
      stub = sinon.stub(module, 'updateMarkup');
      module.setup();
      assert.ok(module.updateMarkup, 'updateMarkup() method is invoked');
    });
  });

});
