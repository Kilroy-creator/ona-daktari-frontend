// simple reactive auth store (singleton)
// replace/mock with your real auth logic (Firebase, API, etc)
import { reactive, readonly } from 'vue';

const state = reactive({
  user: null,
  userType: null, // "patient" | "doctor" | null
});

export function setAuth(user, userType) {
  state.user = user;
  state.userType = userType;
}

export function clearAuth() {
  state.user = null;
  state.userType = null;
}

export function useAuth() {
  // expose readonly for safety, and helpers
  return {
    state: readonly(state),
    setAuth,
    clearAuth,
  };
}
