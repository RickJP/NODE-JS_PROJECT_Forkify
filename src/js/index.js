import Search from './models/Search';
import { elements, renderLoader, clearLoader } from './views/base';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';

/** Global state of app */
/** Search object
 * 
 *  Current recipe object
 *  Shopping list object
 *  Liked recipes
 */

const state = {};

/**
 *  SEARCH CONTROLLER
 * 
 */
const controlSearch = async () => {
	// Get query from view
	const query = searchView.getInput(); //TODO

	if (query) {
		// New search object; Add to state
		state.search = new Search(query);

		try {
			// Prepare UI for results
			searchView.clearInput();
			searchView.clearResults();

			renderLoader(elements.searchRes);

			// Search for recipes
			await state.search.getResults();

			// Render results on UI
			clearLoader();
			searchView.renderResults(state.search.result);
		} catch (err) {
			alert('Something is up with search.');
			clearLoader();
		}
	}
};

elements.searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	controlSearch();
});

elements.searchResPages.addEventListener('click', (e) => {
	const btn = e.target.closest('.btn-inline');
	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10); // 10 base 10
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage);
	}
});

/**
 *  RECIPE CONTROLLER
 * 
 */
const controlRecipe = async () => {
	// Get ID from url
	const id = window.location.hash.replace('#', '');

	// Prepare the UI for changes

	//	Create a new recipe object
	state.recipe = new Recipe(id);

	try {
		// Get recipe data
		await state.recipe.getRecipe();

		// Calculate servings and time
		state.recipe.calcTime();
		state.recipe.calcServings();

		// Render recipe
		console.log(state.recipe);
	} catch (err) {
		alert('Problem getting recipe');
	}
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

[ 'hasChange', 'load' ].forEach((event) => window.addEventListener(event, controlRecipe));
