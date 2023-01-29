<template>
	<div class="sticker text-white rounded-pill" :class="classObject">
		{{ props.sticker.text }}
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { Sticker, StickerType } from '~/product';

const props = defineProps<{
	sticker: Sticker;
}>();

const classObject = reactive({
	'bg-promo': props.sticker.type == StickerType.PROMO,
	'bg-new': props.sticker.type == StickerType.NEW,
});
</script>

<style scoped lang="scss">
.sticker {
	width: max-content;
	height: max-content;
	padding: 3px 19px;
	font-size: 12px;
	font-weight: 500;
}
</style>
