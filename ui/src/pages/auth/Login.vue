<template>
	<div class="mx-auto max-w-xl my-16">
		<form @submit.prevent="onSubmit">
			<TextInput
				type="email"
				name="email"
				id="email"
				label="Email"
				v-model="model.email"
				:validation="schema.fields.email"
			/>
			<TextInput
				type="password"
				name="password"
				id="password"
				label="Password"
				v-model="model.password"
				:validation="schema.fields.password"
			/>
			<p>{{ errors }}</p>
			<button type="submit">Submit</button>
		</form>
	</div>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { useForm, Form } from 'vee-validate';
import TextInput from '../../components/form/TextInput.vue';
import firebaseService from '../../services/firebase';
import { useRouter } from 'vue-router';

const schema = yup.object({
	email: yup
		.string()
		.email('Must be a valid email')
		.required('Email is required'),
	password: yup
		.string()
		.min(4, 'Password must be at least 4 characters')
		.required('Password is required')
});

const model = reactive({
	email: '',
	password: ''
});

const router = useRouter();

const onSubmit = async () => {
	if (errors.value.email || errors.value.password) {
		alert('Invalid form');
		return;
	}

	try {
		await firebaseService.login(model.email, model.password);
		router.push('/');
	} catch (e) {
		console.error(e);
	}
};

const { errors } = useForm({
	validationSchema: schema,
	initialValues: model
});
</script>
