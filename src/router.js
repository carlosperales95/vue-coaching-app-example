import { createRouter, createWebHistory } from 'vue-router';
import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import CoachesList from './pages/coaches/CoachesList.vue';

import NotFound from './pages/NotFound.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestReceived from './pages/requests/RequestReceived.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/coaches'
        },
        {
            path: '/coaches',
            component: CoachesList
        },
        {
            path: '/coaches/:id',
            component: CoachDetails,
            props: true,
            children: [
                {
                    path: 'contact',
                    component: ContactCoach
                }
            ]
        },
        {
            path: '/register',
            component: CoachRegistration
        },
        {
            path: '/requests',
            component: RequestReceived
        },
        {
            path: '/:notFound(.*)',
            component: NotFound
        }
    ],
});


export default router;