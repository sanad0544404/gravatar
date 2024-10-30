/**
 * Adds or updates a query parameter to the given URL.
 *
 * @param {string} url   - The URL to which the query parameter will be added.
 * @param {string} key   - The query parameter key to add or update.
 * @param {string} value - The value of the query parameter to add or update.
 * @return {string}      - The updated URL with the new or updated query parameter, or an empty string if the URL is invalid.
 */
export default function addQueryArg( url: string, key: string, value: string ): string {
	const [ baseUrl, queryStr ] = url.split( '?' );
	const queryParams = new URLSearchParams( queryStr || '' );

	queryParams.set( key, value );

	return `${ baseUrl }?${ queryParams.toString() }`;
}
