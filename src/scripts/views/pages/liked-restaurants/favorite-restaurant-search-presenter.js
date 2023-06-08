class FavoriteRestaurantSearchPresenter {
  constructor({ favoriteRestaurants }) {
    this._listenToSearchRequestByUser();
    this._favoriteRestaurants = favoriteRestaurants;
  }

  _listenToSearchRequestByUser() {
    this._queryElement = document.getElementById('query');
    this._queryElement.addEventListener('change', (event) => {
      this._searchRestaurants(event.target.value);
      // this._latestQuery = event.target.value;
      // this._favoriteRestaurants.searchRestaurants(this._latestQuery);
    });
  }

  async _searchRestaurants(latestQuery) {
    this._latestQuery = latestQuery.trim();

    let foundRestaurants;
    if (this.latestQuery.length > 0) {
      foundRestaurants = await this._favoriteRestaurants.searchRestaurants(this.latestQuery);
    } else {
      foundRestaurants = await this._favoriteRestaurants.getAllRestaurants();
    }

    // const foundRestaurants = await this._favoriteRestaurants.searchRestaurants(this.latestQuery);
    this._showFoundRestaurants(foundRestaurants);

    // this._favoriteRestaurants.searchRestaurants(this.latestQuery);
  }

  _showFoundRestaurants(restaurants) {
    if (!restaurants) return; // check if restaurants is undefined or null

    console.log(restaurants)
    const html = restaurants.reduce(
      (carry, restaurant) => carry.concat(`
        <li class="restaurant">
          <span class="restaurant__title">${restaurant.name || '-'}</span>
        </li>
      `),
      '',
    );

    document.querySelector('.restaurants').innerHTML = html
    document.getElementById('restaurant-search-container')
      .dispatchEvent(new Event('restaurants:searched:updated'))
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteRestaurantSearchPresenter;
