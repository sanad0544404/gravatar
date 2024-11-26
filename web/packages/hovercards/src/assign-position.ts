export type Placement =
	| 'top'
	| 'top-start'
	| 'top-end'
	| 'bottom'
	| 'bottom-start'
	| 'bottom-end'
	| 'left'
	| 'left-start'
	| 'left-end'
	| 'right'
	| 'right-start'
	| 'right-end';

type Options = Partial< {
	placement: Placement;
	offset: number;
	autoFlip: boolean;
	autoShift: boolean;
} >;

const paddingMap: Record< string, 'paddingBottom' | 'paddingTop' | 'paddingRight' | 'paddingLeft' > = {
	top: 'paddingBottom',
	bottom: 'paddingTop',
	left: 'paddingRight',
	right: 'paddingLeft',
};

/**
 * Computes and assigns the position of the card element.
 *
 * @param {HTMLElement}    ref          - The ref element.
 * @param {HTMLDivElement} card         - The card element.
 * @param {Options}        [options={}] - The placement, offset, auto-flip, and auto-shift options.
 * @return {void}
 */
export default function assignPosition(
	ref: HTMLElement,
	card: HTMLDivElement,
	{ placement = 'right-start', offset = 0, autoFlip = true, autoShift = true }: Options = {}
): void {
	// Reset the card's padding for re-calculation
	card.style.padding = '0';

	const refRect = ref.getBoundingClientRect();
	const cardRect = card.getBoundingClientRect();
	const refScrollT = refRect.top + scrollY;
	const refScrollB = refRect.bottom + scrollY;
	const refScrollR = refRect.right + scrollX;
	const refScrollL = refRect.left + scrollX;
	const topSpace = refRect.top;
	const bottomSpace = innerHeight - refRect.bottom;
	const leftSpace = refRect.left;
	const rightSpace = innerWidth - refRect.right;
	let x = 0;
	let y = 0;
	let [ dir, align ] = placement.split( '-' );
	offset = Math.max( 0, offset );

	// Auto flip the card when there's not enough space
	if ( autoFlip ) {
		const dirSpaceV = cardRect.height + offset;
		const dirSpaceH = cardRect.width + offset;

		if ( dir === 'top' && topSpace < dirSpaceV && bottomSpace > topSpace ) {
			dir = 'bottom';
		} else if ( dir === 'bottom' && bottomSpace < dirSpaceV && topSpace > bottomSpace ) {
			dir = 'top';
		} else if ( dir === 'left' && leftSpace < dirSpaceH && rightSpace > leftSpace ) {
			dir = 'right';
		} else if ( dir === 'right' && rightSpace < dirSpaceH && leftSpace > rightSpace ) {
			dir = 'left';
		}
	}

	// Auto shift the card when there's not enough space
	if ( autoShift ) {
		const alignSpaceV = cardRect.height - refRect.height;
		const alignSpaceH = cardRect.width - refRect.width;
		const halfAlignSpaceV = alignSpaceV / 2;
		const halfAlignSpaceH = alignSpaceH / 2;

		if ( dir === 'top' || dir === 'bottom' ) {
			if ( align === 'start' && rightSpace < alignSpaceH ) {
				if ( rightSpace < halfAlignSpaceH ) {
					align = 'end';
				} else {
					align = undefined;
				}
			} else if ( align === 'end' && leftSpace < alignSpaceH ) {
				if ( leftSpace < halfAlignSpaceH ) {
					align = 'start';
				} else {
					align = undefined;
				}
			} else if ( align === undefined && ( rightSpace < halfAlignSpaceH || leftSpace < halfAlignSpaceH ) ) {
				if ( rightSpace > leftSpace ) {
					align = 'start';
				} else {
					align = 'end';
				}
			}
		}

		if ( dir === 'right' || dir === 'left' ) {
			if ( align === 'start' && bottomSpace < alignSpaceV ) {
				if ( bottomSpace < halfAlignSpaceV ) {
					align = 'end';
				} else {
					align = undefined;
				}
			} else if ( align === 'end' && topSpace < alignSpaceV ) {
				if ( topSpace < halfAlignSpaceV ) {
					align = 'start';
				} else {
					align = undefined;
				}
			} else if ( align === undefined && ( bottomSpace < halfAlignSpaceV || topSpace < halfAlignSpaceV ) ) {
				if ( bottomSpace > topSpace ) {
					align = 'start';
				} else {
					align = 'end';
				}
			}
		}
	}

	// Calculate the position of the card
	if ( dir === 'top' || dir === 'bottom' ) {
		x = refScrollL + refRect.width / 2 - cardRect.width / 2;
		// The bottom offset will be filled with the card's padding
		y = dir === 'top' ? refScrollT - cardRect.height - offset : refScrollB;

		if ( align === 'start' ) {
			x = refScrollL;
		}

		if ( align === 'end' ) {
			x = refScrollR - cardRect.width;
		}
	} else {
		// The right offset will be filled with the card's padding
		x = dir === 'right' ? refScrollR : refScrollL - cardRect.width - offset;
		y = refScrollT + refRect.height / 2 - cardRect.height / 2;

		if ( align === 'start' ) {
			y = refScrollT;
		}

		if ( align === 'end' ) {
			y = refScrollB - cardRect.height;
		}
	}

	card.style.position = 'absolute';
	card.style.left = `${ x }px`;
	card.style.top = `${ y }px`;
	// To bridge the gap between the ref and the hovercard,
	// ensuring that the hovercard remains visible when the mouse hovers over the gap
	card.style[ paddingMap[ dir ] ] = `${ offset }px`;
}
