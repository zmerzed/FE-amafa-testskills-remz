<script setup lang="ts">
import logo from '@/assets/logo.png';
import { UserStore } from '@/stores/user';
import { useVuelidate } from '@vuelidate/core';
import { computed, onMounted, ref } from 'vue';

const { validations } = useValidation();
const user = UserStore();
const { login } = useAuth();

const emits = defineEmits<{
  (e: 'continue'): void;
}>();

const form = ref({ email: '', password: '' });
const loading = ref(false);
const signInErrors = ref();

const rules = {
  email: {
    required: validations.required('Email'),
    email: validations.email(),
  },
  password: {
    required: validations.required('Password'),
  },
};
const v$ = useVuelidate(rules, form, { $autoDirty: true });

const handleLogin = async () => {
  if (!(await v$.value.$validate())) return;

  try {
    loading.value = true;
    await login({ username: form.value.email, password: form.value.password });
    loading.value = false;

    if (user.isLoggedIn) {
      navigateTo('/', { replace: true });
    }
  } catch (error) {
    loading.value = false;
    signInErrors.value = error;
  }
};

const errors = computed(() => {
  return Object.keys(form.value).reduce((prev, curr) => {
    if (curr === 'email' && signInErrors.value?.data?.message) {
      prev[curr] = signInErrors.value?.data?.message;
    } else {
      prev[curr] = v$.value[curr]?.$errors[0]?.$message;
    }

    return prev;
  }, {});
});

const emailRef = ref();
onMounted(() => {
  emailRef.value.focus();
});
</script>

<template>
  <v-container fluid class="d-flex justify-center fill-height">
    <v-card width="100%" max-width="500px" class="pa-5 custom-card" flat>
      <v-card-title class="text-center mb-10">
        <h1 class="mb-5 font-title-3">Exam</h1>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            ref="emailRef"
            v-model="form.email"
            label="Email"
            variant="outlined"
            color="primary"
            :error-messages="errors.email ?? signInErrors?.message"
            :readonly="loading"
            class="mb-2"
          />
          <v-text-field
            class="mb-2"
            v-model="form.password"
            label="Password"
            variant="outlined"
            color="primary"
            type="password"
            :readonly="loading"
            autocomplete="current-password"
            :error-messages="errors.password"
          />
          <v-btn type="submit" :loading="loading" block rounded="xl" size="large" elevation="0" color="primary">
            Continue
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style lang="scss" scoped>
p.font-body {
  white-space: break-spaces;
}
</style>
