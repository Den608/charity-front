<script setup>
import { ref } from 'vue'
import UpdateCreateModal from '../UpdateCreateModal.vue';

const title = ref('ثبت  بسته های مناسبتی')
const modalShow = ref(false)


function setAllChecked(event) {
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]')
    allCheckboxes.forEach(el => {
        el.checked = event.target.checked
    })
}

</script>

<template>
    <main>
        <UpdateCreateModal v-if="modalShow" @onClose="modalShow = false" :title="title">
            <input type="text" placeholder="عنوان">
            <input type="text" placeholder="تعداد">
            <input type="text" placeholder="تعداد کالا">
            <textarea name="explanation" placeholder="توضیحات"></textarea>
        </UpdateCreateModal>
        <div class="header">
            <h1>بسته های مناسبتی</h1>

            <div class="input-fields">
                <div class="search-bar">
                    <span class="material-symbols-sharp">travel_explore</span>
                    <input type="text" placeholder="جستجو ">
                </div>
                <div class="buttons" >
                    <span class="material-symbols-sharp" style="color: red;">
                        delete
                    </span>
                    <span class="material-symbols-sharp">
                        assignment_add
                    </span>

                    <span class="material-symbols-sharp" @click="modalShow = true">
                        add
                    </span>
                </div>
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th><input type="checkbox" id="main-checkbox" @change="setAllChecked" /></th>
                    <th>عنوان</th>
                    <th>تعداد</th>
                    <th>تعداد کالاها </th>
                    <th class="responsive-hidden"> توضیحات </th>
                    <th class="responsive-hidden"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>پکیج اهدایی کمپین رمضان 1403</td>
                    <td>6</td>
                    <td>5</td>
                    <td class="responsive-hidden">Lor12 ipsum dolor sit amet consectetur adipisicing elit. Fugit sed sit
                        voluptatum....</td>
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
input[type="checkbox"] {
    width: 1.1rem;
    height: 1.1rem;
}

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

main table thead tr th:first-child {
    flex-basis: 8%;
}

main table tbody tr td:first-child {
    flex-basis: 8%;
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

