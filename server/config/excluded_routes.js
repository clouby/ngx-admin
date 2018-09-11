const routes = [
    '/login', 
    '/signup'
];

export const excluded_routes = (newRoutes = []) => [...routes, ...newRoutes]
