import { ref } from 'vue'
import axiosInstance from '../services/axios'
import useComponentStore from '../store/componentStore'

export function useUsersApi() {
    const users = ref([])
    const lastPage = ref(1)
    const currentPage = ref(1)
    const usersCount = ref(0)
    const user_role = ref('')
    const errorInput = ref('')
    const componentStore = useComponentStore()

    async function setAllUsers(role) {
        await axiosInstance.get(`/api/users?role=${role}`)
            .then(response => {
                users.value = response.data.users
                usersCount.value = response.data.count
                lastPage.value = Math.ceil(usersCount.value / 10)
                user_role.value = role
            })
            .catch(error => {
                if (error.response.status != 401) {
                    componentStore.showPopup("مشکلی رخ داده است لطفا با پشتیبانی تماس حاصل نمایید", "error")
                }
            })
    }

    async function createUser(user) {
        const notValid = validate_fields(user)
        errorInput.value = notValid

        if (!notValid) {
            user['role'] = user_role.value
            await axiosInstance.post(`/api/register/${user_role.value}`, user).then(response => {
                componentStore.showPopup('با موفقیت افزوده شد !!!', 'success')
                users.value.unshift(response.data.details.user)
                usersCount.value++
            }).catch(error => {
                let message = ''
                if ('username' in error.response.data.errors) {
                    message = 'کاربری با این نام کاربری قبلا در سیسستم ثبت شده'
                } else if ('national_code' in error.response.data.errors) {
                    message = 'کاربری با این کد ملی قبلا در سیستم ثبت شده است '
                } else if ('email' in error.response.data.errors) {
                    message = 'کاربری با این ایمیل قبلا در سیستم ثبت شده است '
                } else {
                    message = 'خطایی در سیستم رخ داده است !!! با پشتیبانی ارتباط بگیرید'
                }
                componentStore.showPopup(message, 'error')
            })
        } else {
            setTimeout(() => {
                errorInput.value = ''
            }, 3000)
        }
    }

    async function updateUser(user) {
        const notValid = validate_fields(user)
        errorInput.value = notValid

        if (!notValid) {
            await axiosInstance.put(`/api/users/${user.id}`, user).then(response => {
                componentStore.showPopup('با موفقیت ویرایش شد !!!', 'success')

                const user = users.value.find(user => user.id = response.data.user.id)
                Object.assign(user, response.data.user)

            }).catch(error => {
                let message = ''
                if ('username' in error.response.data.errors) {
                    message = 'کاربری با این نام کاربری قبلا در سیسستم ثبت شده'
                } else if ('national_code' in error.response.data.errors) {
                    message = 'کاربری با این کد ملی قبلا در سیستم ثبت شده است '
                } else if ('email' in error.response.data.errors) {
                    message = 'کاربری با این ایمیل قبلا در سیستم ثبت شده است '
                } else if ('phone_number' in error.response.data.errors) {
                    message = 'کاربری با این شماره تلفن قبلا در سیستم ثبت شده است '
                } else {
                    message = 'خطایی در سیستم رخ داده است !!! با پشتیبانی ارتباط بگیرید'
                }
                componentStore.showPopup(message, 'error')
            })
        } else {
            setTimeout(() => {
                errorInput.value = ''
            }, 3000)
        }
    }

    async function deleteUsers(userList = []) {
        if (userList.length > 0) {
            let status = 'success'
            let message = ''
            let user_ids = []
            userList.map(obj => user_ids.push(obj.id))
            await axiosInstance.post(`/api/users/delete-multi`, {'user_ids':user_ids})
                .then(response => {

                    message = 'کاربران با موفقیت حذف شدند !!!'
                    status = 'success'
                })
                .catch(error => {
                    message = 'مشکلی پیش امده با پشتیبانی تماس حاصل نمایید'
                    status = 'error'
                })

            componentStore.showPopup(message, status)
        }
    }

    async function filterUser(filter_field) {
        let url = ''
        if (checkInputType(filter_field) == 'name') {
            let name = filter_field.split(" ")
            if (name.length > 1) {
                url = `/api/users?role=${user_role.value}&first_name=${name[0]}&last_name=${name[1]}`
            } else {
                url = `/api/users?role=${user_role.value}&first_name=${name[0]}&last_name=${name[0]}`
            }
        } else if (checkInputType(filter_field) == 'national_code') {
            url = `/api/users?role=${user_role.value}&national_code=${filter_field}`
        }

        if (url != '') {
            await axiosInstance.get(url)
                .then(response => {
                    users.value = response.data.users
                    usersCount.value = response.data.count
                    lastPage.value = Math.ceil(usersCount.value / 10)
                })
                .catch(error => {
                    if (error.response.status != 401) {
                        componentStore.showPopup("مشکلی رخ داده است لطفا با پشتیبانی تماس حاصل نمایید", "error")
                    }
                })
        }
    }

    async function nextPage() {
        if (currentPage.value < lastPage.value) {
            currentPage.value++

            componentStore.showLoading()
            await axiosInstance.get(`/api/users?role=${user_role.value}&&page=${currentPage.value}`)
                .then(response => {
                    users.value = response.data.users
                })
                .catch(error => {
                    if (error.response.status != 401) {
                        componentStore.showPopup("مشکلی رخ داده است لطفا با پشتیبانی تماس حاصل نمایید", "error")
                    }
                })
            componentStore.dismissLoading()
        }
    }

    async function prevPage() {
        if (currentPage.value > 1) {
            currentPage.value--

            componentStore.showLoading()
            await axiosInstance.get(`/api/users?role=${user_role.value}&&page=${currentPage.value}`)
                .then(response => {
                    users.value = response.data.users
                })
                .catch(error => {
                    if (error.response.status != 401) {
                        componentStore.showPopup("مشکلی رخ داده است لطفا با پشتیبانی تماس حاصل نمایید", "error")
                    }
                })
            componentStore.dismissLoading(0)
        }
    }

    async function gotoPage(number) {
        if (number <= lastPage.value && number >= 1) {
            currentPage.value = number

            componentStore.showLoading()
            await axiosInstance.get(`/api/users?role=${user_role.value}&&page=${number}`)
                .then(response => {
                    users.value = response.data.users
                })
                .catch(error => {
                    if (error.response.status != 401) {
                        componentStore.showPopup("مشکلی رخ داده است لطفا با پشتیبانی تماس حاصل نمایید", "error")
                    }
                })
            componentStore.dismissLoading()
        }
    }


    function validate_fields(obj) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\d{4,12}$/;

        if (obj.username == '' && obj.username.length < 4) {
            return 'فرمت نام کاربری صحیح نیست !!!'
        } else if ('password' in obj) {
            if (obj.password.length < 8)
                return 'رمز عبور باید حداقل از 8 کاراکتر تشکیل شده باشد '
        } else if (obj.first_name.length < 3) {
            return 'نام کاربر باید حداقل از 3 کاراکتر تشکیل شده باشد '
        } else if (obj.last_name.length < 3) {
            return 'نام خانوادگی کاربر باید حداقل از 3 کاراکتر تشکیل شده باشد '
        } else if (!emailPattern.test(obj.email)) {
            return 'فرمت ایمیل اشتباه است '
        } else if (!phonePattern.test(obj.phone_number)) {
            return 'فرمت شماره تلفن اشتباه است '

        }
    }

    function checkInputType(input) {
        const nationalCodeRegex = /^\d{0,10}$/

        if (!nationalCodeRegex.test(input)) {
            return 'name'
        } else if (nationalCodeRegex.test(input)) {
            return 'national_code'
        }
    }

    return {
        users,
        usersCount,
        currentPage,
        lastPage,
        errorInput,
        setAllUsers,
        createUser,
        updateUser,
        deleteUsers,
        filterUser,
        nextPage,
        prevPage,
        gotoPage
    }
}