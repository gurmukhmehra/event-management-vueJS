import { createRouter, createWebHistory } from 'vue-router';
import DashboardLayout from '@/views/pages/Layout.vue'
import Login from '@/views/auth/Login.vue'
import Signup from '@/views/auth/Signup.vue'
import ForgotPassword from '@/views/auth/ForgotPassword.vue'

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            component: DashboardLayout,
            children: [
                { 
                    path: '',
                    component: () => import ('@/views/pages/Home.vue'), 
                    meta:{title: 'MTE Homepage'} 
                },
                {
                    path: 'about', 
                    component: () => import ('@/views/pages/About.vue'), 
                    meta:{title: 'MTE About'} 
                },
                {
                    path: 'portfolio', 
                    component: () => import ('@/views/pages/Portfolio.vue'), 
                    meta:{title: 'MTE Portfolio'} 
                },
                { 
                    path: 'service', 
                    component: () => import ('@/views/pages/Service.vue'), 
                    meta:{title: 'MTE Service'}  
                },
                { 
                    path: 'event', 
                    component:() => import ('@/views/pages/Event.vue'), 
                    meta:{title: 'MTE Event'} 
                },
                { 
                    path: 'contact', 
                    component: () => import ('@/views/pages/Contact.vue'), 
                    meta:{title: 'MTE Contact'}  
                },
                {
                    path: 'event-detail/:slug', 
                    component: () => import ('@/views/pages/EventDetail.vue'),  
                    meta:{title: 'MTE Event Detail'} 
                },
                {
                    path: 'checkout', 
                    component: () => import ('@/views/pages/Checkout.vue'), 
                    meta:{title: 'MTE Checkout'} 
                },
                {
                    path: 'buy-package/:slug', 
                    component: () => import ('@/views/pages/BuyPackage.vue'), 
                    meta:{title: 'MTE Package'} 
                },
                {
                    path: 'profile', 
                    component: () => import ('@/views/pages/profile.vue'), 
                    meta:{
                        title: 'MTE Profile',
                        requiresAuth: true
                    } 
                },
                {
                    path: 'saved-events', 
                    component: () => import ('@/views/pages/SavedEvents.vue'), 
                    meta:{
                        title: 'MTE Saved Events',
                        requiresAuth: true
                    } 
                },
                {
                    path: 'booking-confirmed', 
                    component: () => import ('@/views/pages/BookingConfirmed.vue'), 
                    meta:{
                        title: 'MTE Booking Confirmed',
                        requiresAuth: true
                    } 
                },
                {
                    path: 'package-confirmed', 
                    component: () => import ('@/views/pages/PackageConfirmed.vue'), 
                    meta:{
                        title: 'MTE Package Confirmed',
                        requiresAuth: true
                    } 
                },
                {
                    path: 'booked-events', 
                    component: () => import ('@/views/pages/BookedEvents.vue'), 
                    meta:{
                        title: 'MTE Booked Events',
                        requiresAuth: true
                    } 
                },
                {
                    path: 'subscription', 
                    component: () => import ('@/views/pages/subscription.vue'), 
                    meta:{
                        title: 'MTE Subscription',
                        requiresAuth: true
                    } 
                },
                {
                    path: 'album/:slug', 
                    component: () => import ('@/views/pages/AlbumImages.vue'), 
                    meta:{title: 'MTE Album'} 
                }               
            ]
        },
        {
            path: '/login', 
            component: Login, 
            meta: { title: 'MTE Login' }
        },
        {
            path: '/signup', 
            component: Signup,  
            meta: { title: 'MTE Signup'}
        },
        {
            path: '/forgot-password', 
            component: ForgotPassword, 
            meta: { title: 'MTE Forgot Password'}
        },        
        // catch all redirect to home page
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
});

// router.beforeEach(async(to, from, next) => {
//     document.title = to.meta.title;
//     const authStore = useAuthStore();
//     if (to.meta.requiresAuth && !authStore.authUser) {
//         // this route requires auth, check if logged in
//         // // if not, redirect to login page.
//         // return {
//         //   path: '/',
//         //   // save the location we were at to come back later
//         //   query: { redirect: to.fullPath },
//         // }
       
//         next('/login')
//     }else{
//         next();
//     }    
// });

// router.beforeEach(async (to) => {
//     // redirect to login page if not logged in and trying to access a restricted page 
//     const publicPages = ['/login', '/signup', '/forgot-password'];
//     const authRequired = !publicPages.includes(to.path);
//     const authStore = useAuthStore();

//     if (authRequired && !authStore.authUser) {
//         authStore.returnUrl = to.fullPath;
//         return '/login';
//     }
// });