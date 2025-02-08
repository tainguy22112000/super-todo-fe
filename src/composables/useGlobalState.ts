import { computed } from "vue";
import { useRoute } from "vue-router";
import { UserRole } from "@/types";

export const useGlobalState = () => {
  const route = useRoute();
  const userRole = computed(() => {
    if (![UserRole.FREE, UserRole.PAID].includes(route.query.userRole as UserRole)) {
      return UserRole.FREE;
    }
    return route.query.userRole as UserRole;
  });

  return {
    userRole,
  };
};