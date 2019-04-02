import Search from './models/Search';
import { elements } from './views/base';
import * as searchView from './views/searchView';

/** Global state of app */
/** Search object
 * 
 *  Current recipe object
 *  Shopping list object
 *  Liked recipes
 */

const state = {};
const controlSearch = async () => {
	// Get query from view
	const query = searchView.getInput(); //TODO

	if (query) {
		// New search object; Add to state
		state.search = new Search(query);

		// Prepare UI for results
		searchView.clearInput();
		searchView.claearResults();

		// Search for recipes
		await state.search.getResults();

		// Render results on UI
		searchView.renderResults(state.search.result);
	}
};

elements.searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	controlSearch();
});
