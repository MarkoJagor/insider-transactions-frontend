class Messages {
    loginSuccessful = (toast) => {
        toast.current.show({ severity: 'success', summary: 'Olete sisselogitud!', life: 3000 })
    }

    loginBadCredentials = (toast) => {
        toast.current.show({ severity: 'error', summary: 'Sisselogimine ebaõnnestus!', detail: 'Palun kontrollige sisestatud emaili või parooli.', sticky: true })
    }

    loginError = (toast) => {
        toast.current.show({ severity: 'error', summary: 'Sisselogimisel tekkis viga!', detail: 'Palun proovige hiljem uuesti.', sticky: true })
    }

    registrationSuccessful = (toast) => {
        toast.current.show({ severity: 'success', summary: 'Registreerimine õnnestus!', detail: 'Palun kasutage oma emaili ning parooli sisselogimiseks.', life: 3000 })
    }

    userExists = (toast) => {
        toast.current.show({ severity: 'error', summary: 'Registreerimine ebaõnnestus!', detail: 'Sellise emailiga kasutaja on juba registreeritud.', sticky: true })
    }

    registrationError = (toast) => {
        toast.current.show({ severity: 'error', summary: 'Registreerimisel tekkis viga!', detail: 'Palun proovige hiljem uuesti.', sticky: true })
    }

    logoutSuccesful = (toast) => {
        toast.current.show({ severity: 'success', summary: 'Olete välja logitud!', life: 3000 })
    }
}

export default new Messages();