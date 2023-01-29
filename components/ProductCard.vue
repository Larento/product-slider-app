<template>
	<div class="product-card-container">
		<div class="product-card border border-1 rounded">
			<div class="grid-container">
				<div class="image">
					<img
						class="object-fit-contain pe-none"
						:src="product.image"
					/>
				</div>
				<div class="stickers">
					<Sticker
						v-for="sticker in product.stickers"
						:key="sticker.type"
						:sticker="sticker"
					/>
				</div>
				<span class="article text-info">{{
					product.article
				}}</span>
				<p class="title">{{ product.title }}</p>
				<div class="rating flex-row">
					<Sprite
						v-for="rating in RATING_SIZE"
						:key="rating"
						name="star-fill"
						title="Star"
						class="text-secondary"
						:class="{
							'text-starred': rating <= product.rating,
						}"
					/>
				</div>
				<div class="price">
					<p
						class="old text-info text-decoration-line-through"
					>
						{{
							formatPrice(product.prices.rrc, true) ??
							'‎'
						}}
					</p>
					<p class="current">
						{{ formatPrice(product.prices.rrc) }}
					</p>
				</div>
				<div class="price-info">
					<p class="bulk">
						<span>Опт: </span
						>{{ formatPrice(product.prices.opt) }}
					</p>
					<p class="discount">
						<span v-if="getDiscount(product)"
							>Скидка: </span
						>{{ getDiscount(product) ?? '‎' }}
					</p>
				</div>
				<button class="cart bg-primary">
					<Sprite
						name="cart"
						title="Cart"
						class="text-white"
					/>
				</button>
				<button class="wish-list">
					<Sprite name="heart" title="Wish List" />
				</button>
				<button class="compare">
					<Sprite name="bar-chart" title="Compare" />
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Product, Price } from '~/product';
import Sticker from './Sticker.vue';
import Sprite from './Sprite.vue';

const RATING_SIZE = 5;

function formatPrice(price: Price, old: boolean = false) {
	const currentPrice = old ? price.old_price : price.price;
	if (!currentPrice) {
		return;
	}
	const priceString = currentPrice
		?.toLocaleString('en-US')
		.replaceAll(',', ' ');
	return `${priceString} руб.`;
}

function getDiscount(product: Product) {
	const oldPrice = product.prices.rrc.old_price;
	if (!oldPrice) {
		return;
	}

	const newPrice = product.prices.rrc.price;
	const discount = (100 * (oldPrice - newPrice)) / oldPrice;
	return `${Math.trunc(discount).toString()}%`;
}

const props = defineProps<{
	product: Product;
}>();
</script>

<style scoped lang="scss">
@use 'sass:math';
@import '~/assets/scss/index.scss';

@mixin line-clamp($line-height, $lines) {
	display: -webkit-box;
	overflow: hidden;
	height: $line-height * $lines * 1em;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: $lines;
	line-height: $line-height;
	text-overflow: ellipsis;
	// word-break: break-all;
}

.product-card-container {
	height: 100%;
	padding-inline: 0.5 * $card-gap;

	@include media-breakpoint-down(sm) {
		padding-inline: 0.5 * $card-padding-small;
	}
}

.product-card {
	padding: 28px $card-padding;

	@include media-breakpoint-down(sm) {
		padding: 19px 18px;
	}
}

.grid-container {
	$max-width: $card-width - 2 * $card-padding;
	$min-width: $max-width - 20px;

	display: grid;
	grid-template-columns: min-content 3fr min-content 2fr min-content;
	grid-template-rows: repeat(6, auto);
	grid-template-areas:
		'image		image		image		image		image'
		'article	article		article		article 	article'
		'title		title		title		title		title'
		'rating		rating		rating		rating		rating'
		'price		price		price		price		price'
		'cart		.			wish-list	.			compare';

	margin: auto;
	margin-left: 0;
	max-width: $max-width;
	min-width: $min-width;

	@include media-breakpoint-down(sm) {
		grid-template-columns: auto min-content min-content;
		grid-template-rows: 42px repeat(5, auto);
		grid-template-areas:
			'image		image		wish-list_image'
			'image		image		compare_image'
			'article	article		article'
			'title		title		title'
			'price		cart		cart'
			'price-info	cart		cart';

		max-width: unset;
		min-width: 220px;
	}
}

.image {
	grid-area: image;
	position: relative;
	z-index: -10;
	margin-bottom: 30px;
	padding-top: min(100%, $card-image-size);

	img {
		position: absolute;
		inset: 0;
		margin: auto;
		height: 100%;
	}

	@include media-breakpoint-down(sm) {
		grid-column: image / compare_image;
		margin-bottom: 11px;
		padding-top: min(100%, $card-image-size-small);
	}
}

.stickers {
	z-index: -10;
	display: flex;
	gap: 6px;
	grid-column: 1 / -1;
	grid-row: 1 / -1;
	padding-left: 3px;

	@include media-breakpoint-down(sm) {
		padding-left: 1px;
	}
}

.article {
	grid-area: article;
	margin-bottom: 7px;
	font-size: 13px;

	@include line-clamp(1.5, 1);

	@include media-breakpoint-down(sm) {
		margin-bottom: 5px;
		text-align: center;
		place-self: center;
	}
}

.title {
	grid-area: title;
	margin: 0;
	margin-bottom: 13px;
	font-size: 14px;
	line-height: 24px;

	@include line-clamp(1.7, 2);

	@include media-breakpoint-down(sm) {
		margin-bottom: 1px;
		text-align: center;
		place-self: center;

		@include line-clamp(1.5, 2);
	}
}

.rating {
	grid-area: rating;
	display: flex;
	column-gap: 2px;
	margin-bottom: 15px;

	.icon {
		fill: currentColor;
		width: 17px;
		height: 17px;
	}

	@include media-breakpoint-down(sm) {
		display: none;
	}
}

.price {
	grid-area: price;
	margin-bottom: 24px;

	.current,
	.old {
		line-height: 28px;
		margin: 0;
	}

	.old {
		font-size: 14px;
		margin-bottom: 1px;
	}

	.current {
		font-size: 20px;
		font-weight: 500;
	}

	@include media-breakpoint-down(sm) {
		margin-bottom: 0px;

		.old {
			display: none;
		}

		.current {
			font-size: 14px;
		}
	}
}

.price-info {
	grid-area: price-info;
	display: none;
	margin-top: -2px;
	padding-left: 1px;

	p {
		margin: 0;
		font-size: 13px;
		font-weight: 500;
		line-height: 1.45;
	}

	span {
		color: map-get($theme-colors, 'info');
		font-weight: 400;
	}

	@include media-breakpoint-down(sm) {
		display: block;
	}
}

.cart {
	grid-area: cart;
	place-self: center start;
	padding: 18px 38px;
	border-radius: 10px;

	.icon {
		color: map-get($theme-colors, 'white');
		width: 24px;
		height: 24px;
	}

	&:hover .icon {
		// color: map-get($theme-colors, 'white');
	}

	@include media-breakpoint-down(sm) {
		place-self: end;
		padding: 12px 18px;
	}
}

.wish-list {
	grid-area: wish-list;
	place-self: center;
	padding: 0;
	background: unset;

	.icon {
		color: map-get($theme-colors, 'secondary');
		width: 24px;
		height: 24px;
	}

	&:hover .icon {
		color: map-get($theme-colors, 'info');
	}

	&:active .icon {
		color: map-get($theme-colors, 'wish');
		--fill-color: currentColor;
	}

	@include media-breakpoint-down(sm) {
		grid-area: wish-list_image;
		place-self: start end;
	}
}

.compare {
	grid-area: compare;
	place-self: center;
	padding: 0;
	background: unset;

	.icon {
		color: map-get($theme-colors, 'secondary');
		width: 24px;
		height: 24px;
	}

	&:hover .icon {
		color: map-get($theme-colors, 'info');
	}

	&:active .icon {
		color: map-get($theme-colors, 'primary');
	}

	@include media-breakpoint-down(sm) {
		grid-area: compare_image;
		place-self: start end;
		margin-right: 2px;
	}
}
</style>
