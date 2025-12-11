// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const rotasPublicas = ['/login']

  if (rotasPublicas.includes(to.path)) {
    return
  }

  const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()
  const auth = useState('auth')

  // loggedIn é um ref<boolean>
  if (!loggedIn.value) {
    return navigateTo('/login')
  }
})
