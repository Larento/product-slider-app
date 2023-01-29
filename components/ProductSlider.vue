<template>
	<div class="product-slider">
		<div class="topbar">
			<h1>Новые поступления</h1>
			<div class="controls">
				<button
					v-for="dir in Object.values(ButtonsDir)"
					class="arrow"
					@click="advanceProduct(dir)"
				>
					<Sprite
						name="arrow-right"
						:title="dir"
						:class="{ reverse: dir == ButtonsDir.PREV }"
					/>
				</button>
			</div>
		</div>
		<div
			v-if="true"
			class="carousel"
			:class="{ loading: carouselNotLoaded }"
		>
			<VueSlickCarousel
				ref="carouselElemRef"
				v-bind="carouselSettings"
				@init="handleCarouselInit"
				@reInit="handleCarouselUpdate"
			>
				<ProductCard
					v-for="product in products"
					:key="product.id"
					:product="product"
				/>
			</VueSlickCarousel>
			<div
				v-if="carouselNotLoaded"
				class="carousel-placeholder bg-white rounded"
			></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from '@nuxtjs/composition-api';

import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';

import { Product } from '~/product';
import { RootState } from '~/store';
import ProductCard from './ProductCard.vue';
import Sprite from './Sprite.vue';

type VueSlickCarouselElement = {
	next: () => void;
	prev: () => void;
};

type BreakpointSlides = {
	screenSize: number;
	slidesCount: number;
};

enum ButtonsDir {
	PREV = 'prev',
	NEXT = 'next',
}

const carouselNotLoaded = ref(true);
const carouselElemRef = ref<VueSlickCarouselElement | null>(null);

const products = computed<Product[] | null>(() => {
	return useStore<RootState>().state.products;
});

const sliderBreakpoints = computed(() =>
	generateBreakpoints([
		{
			screenSize: 1366,
			slidesCount: 3,
		},
		{
			screenSize: 1600,
			slidesCount: 4,
		},
		{
			screenSize: 1920,
			slidesCount: 5,
		},
	])
);

const carouselSettings = computed(() => {
	return {
		dots: false,
		arrows: false,
		infinite: false,
		speed: 300,
		slidesToShow: 6,
		slidesToScroll: 1,
		initialSlide: 0,
		swipeToSlide: true,
		responsive: [
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 1,
					variableWidth: true,
				},
			},
			...sliderBreakpoints.value,
		],
	};
});

function handleCarouselInit() {
	carouselNotLoaded.value = false;
}

function handleCarouselUpdate() {
	console.log(carouselElemRef.value);
}

function generateBreakpoints(sizes: BreakpointSlides[]) {
	const obj: any[] = [];
	for (const { screenSize, slidesCount } of sizes) {
		obj.push({
			breakpoint: screenSize - 1,
			settings: {
				slidesToShow: slidesCount,
			},
		});
	}
	return obj;
}

function advanceProduct(dir: ButtonsDir) {
	switch (dir) {
		case ButtonsDir.PREV:
			carouselElemRef.value?.prev();
			break;

		case ButtonsDir.NEXT:
			carouselElemRef.value?.next();
			break;

		default:
			break;
	}
}
</script>

<style scoped lang="scss">
@use 'sass:math';
@import '~/assets/scss/index.scss';
@mixin overflow-gradient($angle, $color) {
	background: linear-gradient($angle, $color, transparent);
}
$color: white;

.product-slider {
	max-width: 1920px;
	margin: auto;
	padding: ($topbar-padding-bottom - 1)
		($slider-padding-inline - $topbar-padding-inline);

	@include media-breakpoint-down(lg) {
		padding-inline: $slider-padding-inline-small - 0.5 * $card-gap;
	}

	@include media-breakpoint-down(md) {
		padding-inline: $slider-padding-inline-small - 0.5 *
			$card-gap-small;
	}

	@include media-breakpoint-down(sm) {
		padding-top: 35px;
	}
}

.topbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-inline: $topbar-padding-inline;
	padding-bottom: $topbar-padding-bottom;

	h1 {
		font-size: 28px;
		font-weight: 400;
		margin: 0;
	}

	@include media-breakpoint-down(sm) {
		padding-inline: 8px;
		padding-bottom: 35px;

		h1 {
			font-size: 20px;
		}
	}
}

.controls {
	display: flex;
	justify-content: space-between;
	align-items: center;
	column-gap: $card-padding;
}

.arrow {
	width: 20px;
	height: 20px;
	padding: 0;
	background: none;
	border: none;

	& .icon.reverse {
		transform: scaleX(-1);
	}

	.icon {
		color: map-get($theme-colors, 'info');
	}

	&:hover .icon {
		color: map-get($theme-colors, 'primary');
	}

	@include media-breakpoint-down(md) {
		display: none;
	}
}

.carousel-placeholder {
	position: absolute;
	inset: 0;
	z-index: 10;
	margin-inline: 0.5 * $card-gap;
	background: $gray-100;
}

.carousel.loading {
	&::before,
	&::after {
		background: $color;
	}
}

.carousel {
	position: relative;

	&::before,
	&::after {
		position: absolute;
		z-index: 2;
		inset: 0;
		width: 0.5 * $card-gap;
		content: '';
	}

	&::before {
		right: unset;
		@include overflow-gradient(90deg, $color);
	}

	&::after {
		left: unset;
		@include overflow-gradient(270deg, $color);
	}

	@include media-breakpoint-down(sm) {
		&::before,
		&::after {
			width: 0.5 * $card-gap-small;
		}
	}
}
</style>
