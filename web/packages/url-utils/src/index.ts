import { sha256 } from 'js-sha256';

const AVATAR_BASE_URL = 'https://www.gravatar.com/avatar/';
const PROFILE_BASE_URL = 'https://www.gravatar.com/';

// Gravatar profile formats
export enum GravatarFormat {
	HTML = '',
	JSON = 'json',
	XML = 'xml',
	PHP = 'php',
	VCF = 'vcf',
	QR = 'qr',
}

// Gravatar default images
export enum GravatarDefault {
	STATUS_404 = '404',
	MYSTERY_PERSON = 'mp',
	IDENTICON = 'identicon',
	MONSTERID = 'monsterid',
	WAVATAR = 'wavatar',
	RETRO = 'retro',
	ROBOHASH = 'robohash',
	TRANSPARENT_PNG = 'blank',
}

// Gravatar ratings
export enum GravatarRating {
	GENERAL = 'g',
	PARENTAL_GUIDANCE = 'pg',
	RESTRICTED = 'r',
	X = 'x',
}

interface GravatarAvatarOptions {
	default?: GravatarDefault | string;
	size?: number;
	rating?: GravatarRating;
	forceDefault?: boolean;
}

// Function to get the SHA256 hash of the email
function getHash( email: string ): string {
	if ( typeof email !== 'string' || email.trim() === '' ) {
		throw new Error( 'Valid email is required' );
	}
	return sha256( email.trim().toLowerCase() );
}

// Function to generate the query string from options
function getQueryString( options: GravatarAvatarOptions ): string {
	const params: { [ key: string ]: string } = {};
	for ( const key in options ) {
		if ( key === 'size' ) {
			params.size = options.size.toString();
		} else if ( key === 'default' ) {
			const defaultValue = options.default;
			params.default = defaultValue;
		} else if ( key === 'rating' ) {
			const ratingValue = options.rating;
			params.rating = ratingValue;
		} else if ( key === 'forceDefault' ) {
			params.forcedefault = options.forceDefault ? 'y' : 'n';
		}
	}

	const queryParams = Object.keys( params )
		.map( ( key ) => {
			const value = params[ key ];
			return encodeURIComponent( key ) + '=' + encodeURIComponent( String( value ) );
		} )
		.join( '&' );
	return queryParams ? `?${ queryParams }` : '';
}

// Generate the Gravatar image URL using SHA256 hash
// Documentation: https://docs.gravatar.com/api/avatars/images/
export function avatarUrl( email: string, options: GravatarAvatarOptions = {} ): string {
	const hash = getHash( email );
	const query = getQueryString( options );
	return `${ AVATAR_BASE_URL }${ hash }${ query }`;
}

// Generate the Gravatar profile URL using SHA256 hash
// Documentation: https://docs.gravatar.com/api/profiles/
export function profileUrl( email: string, format: GravatarFormat = GravatarFormat.HTML ): string {
	const hash = getHash( email );
	const formatString = format === GravatarFormat.HTML ? '' : `.${ format }`;
	return `${ PROFILE_BASE_URL }${ hash }${ formatString }`;
}
