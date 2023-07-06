import { ref } from 'vue'
import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';
import { router }  from '@/router';
import { useToast } from 'vue-toastification'
import { useTicketStore } from './ticket'

export const useAuthStore = defineStore('auth', () => { 
    const tickets = useTicketStore()
    const toast = useToast()
    const authUser  = ref(JSON.parse(localStorage.getItem('token')))  
    const user  = ref([])   
    const avatar = ref('')
    const profileForm = ref({
        name: '',
        email: '',
        phone: '',        
        country: '',
        city: '',
    })
    const login = async (email, password) => {       
        const response = await fetchWrapper.post('signin', { email, password });
        if(response.message == 'success'){
            authUser.value =  response.data;
            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', JSON.stringify(response.data));
            // redirect to previous url or default to home page
            router.push('/');
        }else{
            toast.error(response.data);      
        } 
    } 
    
    const getUser = async () => {          
        const response = await fetchWrapper.get('profile');    
        user.value = response.data
        avatar.value = response.data.profilePic
        profileForm.value.email = response.data.email
        profileForm.value.phone = response.data.phone
        profileForm.value.name = response.data.name      
        profileForm.value.city = response.data.city
        profileForm.value.country = response.data.country
    }

    const logout = async() => {
        const response = await fetchWrapper.get('logout');
        authUser.value = null
        tickets.resetCart()
        localStorage.removeItem('token');
        router.push('/login')
    } 

    const setAuthToken = (authToken) => {
        authUser.value = authToken
        localStorage.setItem('token', JSON.stringify(authToken))
    }

    return { authUser, login, logout, user, getUser, avatar, profileForm, setAuthToken}
})

