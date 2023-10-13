import { User } from '../utils/user-details'

export const useAuth = () => {
    const auth = new User(window.Laravel.user);
    return auth;
}
