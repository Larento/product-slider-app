export type Price = {
	price: number;
	old_price: number | null;
	currency: string;
	title: string;
};

export enum StickerType {
	PROMO = 'promo',
	NEW = 'new',
}

export type Sticker = {
	type: StickerType;
	text: string;
};

export type Availability = {
	status: boolean;
	text: string;
};

export type Product = {
	id: number;
	url: string;
	category: string;
	article: string;
	title: string;
	image: string;
	prices: {
		rrc: Price;
		opt: Price;
	};
	stickers: Sticker[];
	availability: Availability;
	rating: number;
	reviews: number;
	wish_list: boolean;
	compare: boolean;
};
