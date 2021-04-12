export default function({ redirect, route })  {
  if(route.fullPath === '/app/messages/')
    redirect(301, '/app/messages/inbox');
}
