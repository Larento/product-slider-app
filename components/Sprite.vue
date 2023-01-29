<template>
	<svg class="icon">
		<use :xlink:href="'#' + sprite.id"></use>
	</svg>
</template>

<script setup lang="ts">
import {
	Component,
	ref,
	reactive,
	onMounted,
	withDefaults,
} from 'vue';

const props = withDefaults(
	defineProps<{
		name: string;
		title?: string;
	}>(),
	{
		title: 'Icon',
	}
);

const sprite = reactive({
	id: '',
	viewBox: '',
});

onMounted(() => {
	const spriteModule =
		require(`~/assets/icons/${props.name}.svg?sprite`).default;
	sprite.id = spriteModule.id;
	sprite.viewBox = spriteModule.viewBox;
});
</script>
