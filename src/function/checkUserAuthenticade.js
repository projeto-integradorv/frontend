import Swal from 'sweetalert2';

export const checkUserAuthenticated = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData || !userData.token || !userData.user_type) {
        
        return false;
    }

    return true;
}

export const checkAdminAccess = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData && userData.user_type === 'Manager') {
        return true;
    }

    Swal.fire({
        title: 'Acesso Negado!',
        text: 'Você não tem permissão para acessar a área administrativa.',
        icon: 'warning',
        confirmButtonText: 'OK'
    });

    return false;
}
