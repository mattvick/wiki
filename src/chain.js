import { api } from './util';

const processors = {
	extracts: data => {
		return { extract: data.extract };
	},
	links: data => {
		return { links: data.links.map(e => e.title) };
	},
	extlinks: data => {
		return { extlinks: data.extlinks.map(e => e['*']) };
	},
	langlinks: data => {
		return { langlinks: data.langlinks };
	},
	categories: data => {
		return { categories: data.categories.map(e => e.title) };
	},
	pageimages: data => {
		return {
			image: {
				name: data.pageimage,
				thumbnail: data.thumbnail
			}
		};
	}
};

/**
 * Chain API requests together
 * @example
 * // Get page summary and images in same request
 * wiki.page('batman').then(page => page.chain().summary().image().request()).then(console.log);
 * @namespace QueryChain
 */
export default class QueryChain {
	constructor(apiOptions, id) {
		this.id = id;
		this.apiOptions = apiOptions;
		this.params = { pageids: id };
		this.props = new Set();
	}

	/**
	 * Make combined API request
	 * @param {Object} params - Extra params to pass to the API
	 * @method QueryChain#request
	 * @returns {Object}
	 */
	request(params = {}) {
		const props = [...this.props];
		const prop = props.join('|');
		return api(this.apiOptions, Object.assign(this.params, { prop }, params))
			.then(res => res.query.pages[this.id])
			.then(data => {
				return props.reduce((memo, prop) => {
					if (processors[prop]) Object.assign(memo, processors[prop](data));
					return memo;
				}, {});
			});
	}

	chain(prop, params = {}) {
		this.props.add(prop);
		Object.assign(this.params, params);
		return this;
	}

	// TODO: add geo

	/**
	 * @summary Useful for extracting structured section content
	 * @method QueryChain#content
	 * @returns {QueryChain}
	 */
	content() {
		return this.chain('extracts', {
			explaintext: '1'
		});
	}

	/**
	 * @summary Useful for extracting summary content
	 * @method QueryChain#summary
	 * @returns {QueryChain}
	 */
	summary() {
		return this.chain('extracts', {
			explaintext: '1',
			exintro: '1'
		});
	}

	/**
	 * @summary Extract image
	 * @method QueryChain#image
	 * @returns {QueryChain}
	 */
	image(types = { thumbnail: true, original: false, name: true }) {
		return this.chain('pageimages', {
			piprop: Object.keys(types)
				.filter(k => types[k])
				.join('|')
		});
	}

	/**
	 * @summary Extract external links
	 * @method QueryChain#extlinks
	 * @returns {QueryChain}
	 */
	extlinks() {
		return this.chain('extlinks', {
			ellimit: 'max'
		});
	}

	/**
	 * @summary Extract page links
	 * @method QueryChain#links
	 * @returns {QueryChain}
	 */
	links(limit = 100) {
		return this.chain('links', {
			plnamespace: 0,
			pllimit: limit
		});
	}

	/**
	 * @summary Extract categories
	 * @method QueryChain#categories
	 * @returns {QueryChain}
	 */
	categories(limit = 100) {
		return this.chain('categories', {
			pllimit: limit
		});
	}

	/**
	 * @summary Extract coordinates
	 * @method QueryChain#coordinates
	 * @returns {QueryChain}
	 */
	coordinates() {
		return this.chain('coordinates');
	}

	/**
	 * @summary Extract language links
	 * @method QueryChain#langlinks
	 * @returns {QueryChain}
	 */
	langlinks() {
		return this.chain('langlinks', {
			lllimit: 'max',
			llprop: 'url'
		});
	}
}
