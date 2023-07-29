<script setup>
import { onMounted, ref } from 'vue'
import { useUsersApi } from '../../composables/useUsersApi'
import useComponentStore from '../../store/componentStore';
import Pagination from '../Pagination.vue';
import UpdateCreateModal from '../UpdateCreateModal.vue';


const title = ref('ثبت مددیار')
const modalShow = ref(false)
const userApi = useUsersApi()
const { users, currentPage, lastPage } = userApi
const componentStore = useComponentStore()


onMounted(async () => {
    componentStore.showLoading()

    await userApi.setAllUsers('helper')

    componentStore.dismissLoading()

    if (currentPage.value != lastPage.value) {
        const pagination = document.getElementById('pagination')
        pagination.style.display = 'flex'
    }
})

</script>

<template>
    <main>
        <UpdateCreateModal v-if="modalShow" @onClose="modalShow = false" :title="title">
            <input type="text" placeholder="نام ">
            <input type="text" placeholder="نام خانوادگی">
            <input type="text" placeholder="شماره ملی">
            <input type="text" placeholder="شماره تلفن">
        </UpdateCreateModal>
        <div class="header">
            <h1>افراد خیر</h1>

            <div class="input-fields">
                <div class="search-bar">
                    <span class="material-symbols-sharp">travel_explore</span>
                    <input type="text" placeholder="جستجو ">
                </div>
                <div class="buttons">
                    <span class="material-symbols-sharp" style="color: red;">
                        delete
                    </span>
                    <span class="material-symbols-sharp" @click="modalShow = true">group_add</span>
                </div>
            </div>
        </div>

        <Pagination id="pagination" :currentPage="currentPage" :lastPage="lastPage" @next="userApi.nextPage"
            @prev="userApi.prevPage" @goTo="userApi.gotoPage" />

        <table>
            <thead>
                <tr>
                    <th>نام مددیار</th>
                    <th class="responsive-hidden">شماره ملی</th>
                    <th class="responsive-hidden">شماره تلفن</th>
                    <th>کمک های نقدی</th>
                    <th>کالاهای اهدایی</th>
                    <th class="responsive-hidden"></th>
                </tr>
            </thead>
            <tbody v-for="user in users" :key="user.id">
                <tr>
                    <td>{{ user.first_name + ' ' + user.last_name }}</td>
                    <td class="responsive-hidden">{{ user.national_code }}</td>
                    <td class="responsive-hidden">{{ user.phone_number }}</td>
                    <td>{{ user.total_cash }}</td>
                    <td>{{ user.total_product }}</td>
                    <td class="responsive-hidden primary">
                        <span class="material-symbols-sharp">
                            edit_square
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<style scoped>
main .header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

main .header .input-fields {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

main .header .search-bar {
    align-items: center;
    background-color: var(--color-white);
    border-radius: .8rem;
    color: var(--color-dark);
    display: flex;
    gap: .3rem;
    height: 3rem;
    width: 20rem;
}

main .header .search-bar input {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    border-radius: inherit;
    background-color: inherit;
    color: inherit;
    font-size: 1.4rem;
}

main .header .search-bar span {
    color: green;
}

main .header .buttons {
    display: flex;
    flex-direction: row;
    margin-left: 4rem;
    gap: .8rem;
}

main .header .buttons span {
    height: 3rem;
    width: 3rem;
    color: rgb(0, 155, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: var(--color-white);
    cursor: pointer;
    box-shadow: var(--box-shadow);
    transition: all 300ms ease;
}

main .header .buttons span:hover {
    box-shadow: none;
    transition: all 300ms ease;
}

main table {
    border-radius: var(--card-border-radius);
    text-align: center;
    transition: all 300ms ease;
    width: 100%;
    padding: var(--card-padding);
}

main table thead tr {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1rem;
}


main table tbody tr {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    height: 6rem;
    background-color: var(--color-white);
    border-radius: var(--card-border-radius);
    box-shadow: var(--box-shadow);
    transition: all 300ms ease;
}

main table tbody tr:hover {
    box-shadow: none;
    transition: all 300ms ease;
}

main table tbody tr td {
    flex-basis: 20%;
}

main table tbody tr td:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
}

main table thead tr th {
    flex-basis: 20%;
}

@media screen and (max-width:768px) {

    main {
        width: 100vw;
    }

    main .header {
        margin-top: 2rem;
    }

    main .header * {
        margin: 0 1rem 0 0;
    }

    main table thead tr th {
        flex-basis: 33%;
    }

    main table tbody tr td {
        flex-basis: 33%;
    }

    table .responsive-hidden {
        display: none;
    }

    main table tbody tr {
        box-shadow: none;
    }
}
</style>
