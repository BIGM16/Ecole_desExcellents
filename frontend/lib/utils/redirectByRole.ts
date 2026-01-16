import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function redirectByRole(role: string, router: AppRouterInstance) {
  switch (role) {
    case "ADMIN":
      router.replace("/admin");
      break;
    case "COORDON":
      router.replace("/coordon");
      break;
    case "ENCADREUR":
      router.replace("/encadreur");
      break;
    case "ETUDIANT":
      router.replace("/etudiant");
      break;
    default:
      router.replace("/login");
  }
}
