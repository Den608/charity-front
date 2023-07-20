<script setup>

</script>

<template>
    <main>
        <div class="header">
            <h1>کمک های مردمی</h1>

            <div class="input-fields">
                <div class="search-bar">
                    <span class="material-symbols-sharp">travel_explore</span>
                    <input type="text" placeholder="جستجو ">
                </div>
                <div class="buttons">
                    <span class="material-symbols-sharp">
                        add
                    </span>
                </div>
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th><input type="checkbox" /></th>
                    <th>عنوان</th>
                    <th>تعداد</th>
                    <th>اهدا کننده</th>
                    <th> توضیحات </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="table-column"><input type="checkbox" /></td>
                    <td class="table-column">کفش سایز 43</td>
                    <td class="table-column">6</td>
                    <td class="table-column">پرویز</td>
                    <td class="table-column">کفش چرمی سایز 43 ارزش تقریبی 800 هزار تومان</td>
                    <td class="primary">جزِییات</td>
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
    text-align: center;
    width: 100%;
    padding: var(--card-padding);
    margin-top: 2rem;
}

main table tr td,
th {
    border-bottom: 1px solid var(--color-light);
    cursor: pointer;
    height: 3.8rem;
}

main table .table-column:hover td{
    box-shadow: none;
    border-bottom: .8px solid var(--color-dark);
    transition: all 300ms ease;
}


</style>

