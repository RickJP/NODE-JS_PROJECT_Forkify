import axios from 'axios';

export default class Search {
	constructor(query) {
		this.query = query;
	}

	async getResults() {
		const key = '3d02782f74a7fbc128e61977c8614a41';

		try {
			const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
			this.result = res.data.recipes;
			console.log('DATA');
			console.log(this.result);
			//console.log(this.result);
		} catch (error) {
			alert(error);
		}
	}
}
