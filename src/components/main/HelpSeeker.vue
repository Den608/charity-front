<script setup>
import { onMounted } from 'vue'
import { useHelpSeeker } from '../../composables/useHelpSeeker';
import useComponentStore from '../../store/componentStore';

const helpSeeker = useHelpSeeker()
const { helpSeekers, helpSeekerCount } = helpSeeker

const componentStore = useComponentStore()

onMounted(async () => {
    componentStore.showLoading()
    await helpSeeker.setAllHelpSeekers()
    componentStore.dismissLoading()
})
</script>

<template>
    <main>
        <div class="header">
            <h1>افراد نیازمند</h1>

            <div class="input-fields">
                <div class="search-bar">
                    <span class="material-symbols-sharp">travel_explore</span>
                    <input type="text" placeholder="جستجو ">
                </div>
                <div class="buttons">
                    <span class="material-symbols-sharp">group_add</span>
                </div>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>نام مددجو</th>
                    <th class="responsive-hidden">شماره ملی</th>
                    <th class="responsive-hidden">شماره تلفن</th>
                    <th>کمک نقدی</th>
                    <th>کالا ها</th>
                    <th class="responsive-hidden"></th>
                </tr>
            </thead>
            <tbody v-for="helpSeeker in helpSeekers" :key="helpSeeker.id">
                <tr>
                    <td>{{ helpSeeker.first_name + " " + helpSeeker.last_name }} </td>
                    <td class="responsive-hidden">{{ helpSeeker.national_code }}</td>
                    <td class="responsive-hidden"> {{ helpSeeker.phone_number }}</td>
                    <td style="color: red;">50000IR</td>
                    <td style="color: red;"> 20</td>
                    <td class="responsive-hidden"><a class="primary" href="#">جزئیات</a></td>
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

main .header .input-fields{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
main .header .search-bar {
    display: flex;
    align-items: center;
    height: 3rem;
    width: 15rem;
    border-radius: .8rem;
    background-color: var(--color-white);
    color: var(--color-dark);
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

main .header .buttons span {
    height: 3rem;
    width: 3rem;
    color: rgb(0, 155, 0);
    margin-left: 4rem;
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
    cursor: pointer;
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
    main{
        width: 100vw;
    }
    main .header {
        margin-top: 2rem;
    }

    main .header * {
        margin: 0 1rem 0 0;
    }


    table .responsive-hidden {
        display: none;
    }

    main table tbody tr {
        box-shadow: none;
    }
}
</style>
