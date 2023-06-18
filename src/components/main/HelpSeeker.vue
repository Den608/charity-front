<script setup>

</script>

<template>
    <main>
        <div class="header">
            <h1>افراد خیر</h1>
            <div class="search-bar">
                <span class="material-symbols-sharp">travel_explore</span>
                <input type="text" placeholder="جستجو ">
            </div>
            <div class="add">
                <span class="material-symbols-sharp">group_add</span></div>
            </div>
        <table>
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>نام مددیار</th>
                    <th>شماره ملی</th>
                    <th>شماره تلفن</th>
                    <th>کمک های نقدی</th>
                    <th>کالاهای اهدایی</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><img src="../images/profile-3.jpg" alt=""></td>
                    <td>عرفان باقری</td>
                    <td class="responsive-hidden">222586942</td>
                    <td> +9057622925</td>
                    <td class="responsive-hidden">1800000IR</td>
                    <td >56</td>
                    <td><a class="primary" href="#">جزئیات</a></td>
                </tr>
                <tr>
                    <td><img src="../images/profile-3.jpg" alt=""></td>
                    <td>عرفان باقری</td>
                    <td class="responsive-hidden">222586942</td>
                    <td> +9057622925</td>
                    <td class="responsive-hidden">1800000IR</td>
                    <td >56</td>
                    <td><a class="primary" href="#">جزئیات</a></td>
                </tr>
                <tr>
                    <td><img src="../images/profile-3.jpg" alt=""></td>
                    <td>عرفان باقری</td>
                    <td class="responsive-hidden">222586942</td>
                    <td> +9057622925</td>
                    <td class="responsive-hidden">1800000IR</td>
                    <td >56</td>
                    <td><a class="primary" href="#">جزئیات</a></td>
                </tr>
                <tr>
                    <td><img src="../images/profile-3.jpg" alt=""></td>
                    <td>عرفان باقری</td>
                    <td class="responsive-hidden">222586942</td>
                    <td> +9057622925</td>
                    <td class="responsive-hidden">1800000IR</td>
                    <td >56</td>
                    <td><a class="primary" href="#">جزئیات</a></td>
                </tr>
                <tr>
                    <td><img src="../images/profile-3.jpg" alt=""></td>
                    <td>عرفان باقری</td>
                    <td class="responsive-hidden">222586942</td>
                    <td> +9057622925</td>
                    <td class="responsive-hidden">1800000IR</td>
                    <td >56</td>
                    <td><a class="primary" href="#">جزئیات</a></td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<style scoped>

main .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
}

main .header .search-bar{
    display: flex;
    align-items: center;
    height: 3rem;
    width: 15rem;
    border-radius: .8rem;
    background-color: var(--color-white);
    color: var(--color-dark);
}

main .header .search-bar input{
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    border-radius:inherit;
    background-color: inherit;
    color: inherit;
    font-size: 1.4rem;
}

main .header .search-bar span{
    color: green;
}

main .header .add span{
    height: 3.5rem;
    width: 3.5rem;
    color: rgb(0, 155, 0);
    margin-left: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: var(--color-white);
    cursor: pointer;
    box-shadow: 0rem 0rem 1rem var(--color-dark);
    transition: all 300ms ease;
}

main .header .add span:hover{
    box-shadow: none;
    transition: all 300ms ease;
}

main table {
    text-align: center;
    width: 100%;
    border-radius: var(--card-border-radius);
    box-shadow: var(--box-shadow);
    padding: var(--card-padding);
    transition: all 300ms ease;
}

main table:hover {
    box-shadow: none;
}


main table thead tr {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

main table tbody tr {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    height: 10rem;
    background-color: var(--color-white);
    border-radius: var(--card-border-radius);
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
}

main table tbody tr {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    height: 10rem;
    background-color: var(--color-white);
    border-radius: var(--card-border-radius);
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
}

main table tbody tr td {
    flex-basis: 20%;
}

main table tbody tr td:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
}

main table tbody tr td>img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
}

main table thead tr th {
    flex-basis: 20%;

}
</style>
