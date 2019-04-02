import axios from 'axios';

async function getResults(query) {
	const key = '3d02782f74a7fbc128e61977c8614a41';

	try {
		const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query}`);
		const recipes = res.data.recipes;
		console.log(recipes);
	} catch (error) {
		alert(error);
	}
}

getResults('chocolate cake');
