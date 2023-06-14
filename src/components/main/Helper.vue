<script setup>

</script>

<template>
    <main>
        <div class="recent-help">
            <h2>افراد خیر </h2>
            <table>
                <thead>
                    <tr>
                        <th>نام کالا</th>
                        <th class="responsive-hidden">نام مددیار</th>
                        <th>نام مددجو</th>
                        <th class="responsive-hidden">تعدا کالا</th>
                        <th>وضعیت</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>کفش سایز56</td>
                        <td class="responsive-hidden">محمد رستمی</td>
                        <td>عرفان قربانی</td>
                        <td class="responsive-hidden">4</td>
                        <td class="warning">در حال تحویل </td>
                        <td><a class="primary" href="#">جزئیات</a></td>
                    </tr>

                    <tr>
                        <td>کفش سایز56</td>
                        <td class="responsive-hidden">محمد رستمی</td>
                        <td>عرفان قربانی</td>
                        <td class="responsive-hidden">4</td>
                        <td class="warning">در حال تحویل </td>
                        <td><a class="primary" href="#">جزئیات</a></td>
                    </tr>

                    <tr>
                        <td>کفش سایز56</td>
                        <td class="responsive-hidden">محمد رستمی</td>
                        <td>عرفان قربانی</td>
                        <td class="responsive-hidden">4</td>
                        <td class="warning">در حال تحویل </td>
                        <td><a class="primary" href="#">جزئیات</a></td>
                    </tr>

                    <tr>
                        <td>کفش سایز56</td>
                        <td class="responsive-hidden">محمد رستمی</td>
                        <td>عرفان قربانی</td>
                        <td class="responsive-hidden">4</td>
                        <td class="warning">در حال تحویل </td>
                        <td><a class="primary" href="#">جزئیات</a></td>
                    </tr>
                    <tr>
                        <td>کفش سایز56</td>
                        <td class="responsive-hidden">محمد رستمی</td>
                        <td>عرفان قربانی</td>
                        <td class="responsive-hidden">4</td>
                        <td class="warning">در حال تحویل </td>
                        <td><a class="primary" href="#">جزئیات</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<style scoped>
main .recent-help {
    grid-area: table;
    margin-top: 1rem;
}


main .recent-help h2 {
    margin-bottom: 0.8rem;
    font-weight: 600;
}

main .recent-help table {
    background: var(--color-white);
    text-align: center;
    width: 100%;
    border-radius: var(--card-border-radius);
    box-shadow: var(--box-shadow);
    padding: var(--card-padding);
    transition: all 300ms ease;
}

main .recent-help table:hover {
    box-shadow: none;
}

main .recent-help table tbody td {
    height: 2.8rem;
    border-bottom: 1px solid var(--color-light);
    color: var(--color-dark-variant);
    color: var(--color-dark);
}

main .recent-help table tbody tr:last-child td {
    border: none;
}
</style>
