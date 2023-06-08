Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#restaurants');
  I.see('Daftar restaurant favorite masih kosong', '.empty-favorite-tag');

  // I.waitForElement('#restaurants', 5); // Wait for 5 seconds for the element to appear
  // I.waitForElement('.restaurant-item__not__found', 5);

  // I.waitForVisible('#restaurants', 5);
});

Scenario('liking one restaurant', ({ I }) => {
  I.see('Daftar restaurant favorite masih kosong', '.empty-favorite-tag');
  I.amOnPage('/');

  I.wait(10);
  I.waitForElement('.restaurant__title a');
  const firstResto = locate('.restaurant__title a').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);
  
  // I.waitForElement('.restaurant__title a');
  // I.seeElement('.restaurant__title a');
  // I.click(locate('.restaurant__title a').first());

  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.favorite-tag');

  // pause();
  // … kita akan mengisi uji coba berikutnya …

  const favoritedRestoTitle = await I.grabTextFrom('.restaurant__title');
  assert.strictEqual(firstRestoTitle, favoritedRestoTitle);
});
