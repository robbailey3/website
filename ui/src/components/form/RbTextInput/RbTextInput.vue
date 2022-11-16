<template>
	<div class="block">
		<label :for="id" class="block">{{ label }}</label>
		<input
			class="border border-gray-200 px-2 py-1 rounded-sm shadow-sm block"
			@change="handleChange"
			@blur="handleChange"
			:type="type"
			:name="id"
			:id="id"
			v-model="model"
		/>
		<span v-if="errorMessage" class="text-red-800 italic text-sm">{{
			errorMessage
		}}</span>
	</div>
</template>

<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate';
import { MaybeRef, useVModel } from '@vueuse/core';

const props = defineProps<{
	name: string;
	id: string;
	type: 'text' | 'password' | 'email' | 'search' | 'url';
	label: string;
	validation?: MaybeRef<RuleExpression<string>>;
	modelValue: string;
}>();

const emits = defineEmits(['update:modelValue']);

const model = useVModel(props, 'modelValue', emits);

const name = toRef(props, 'name');

const { errorMessage, handleChange } = useField(name, props.validation);
</script>
