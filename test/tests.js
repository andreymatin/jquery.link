QUnit.test('Registration', function (assert) {
  assert.ok($.fn.link, 'registered as a jQuery plugin');
});

QUnit.test('Cleanup', function (assert) {
  var $test = $('.test');

  $test.link();
  $test.link('destroy');

  assert.notOk($test.data('link'), 'destroyed successfully');
});

QUnit.test('Link Tabs', function (assert) {
  var link = $('a');
  link.link({
    tabs: false,
    links: false,
    auto: false,
    twitter: false
  });

  assert.ok(link, 'anchors list');
});