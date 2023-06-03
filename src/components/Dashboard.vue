<script setup>

</script>

<template>
    <main>
        <h1>داشبورد</h1>
        <div class="date">
            <input class="date" type="date">
        </div>

        <div class="insight">
            <div class="cash-donation">
                <span class="material-symbols-sharp">account_balance</span>
                <div class="middle">
                    <div class="left">
                        <h3>مجموع کمک های نقدی</h3>
                        <h1>2400000IR</h1>
                    </div>

                </div>
                <small>
                    <p class="text-muted">24 ساعت گذشته</p>
                </small>
            </div>

            <!-- -----------END OF SALES------------- -->

            <div class="product-donation">
                <span class="material-symbols-sharp">inventory</span>
                <div class="middle">
                    <div class="left">
                        <h3>کالاهای اهدایی</h3>
                        <h1>56</h1>
                    </div>
                </div>
                <small>
                    <p class="text-muted">24 ساعت گذشته</p>
                </small>
            </div>

            <!-- -----------END OF SALES------------- -->

            <div class="help-seeker">
                <span class="material-symbols-sharp">groups</span>
                <div class="middle">
                    <div class="left">
                        <h3>تعداد کل افراد تحت پوشش</h3>
                        <h1>225</h1>
                    </div>
                </div>
                <small>
                    <p class="text-muted">24 ساعت گذشته</p>
                </small>
            </div>

            <!-- -----------END OF SALES------------- -->
        </div>

        <!-- -----------------Table Bottom------------------- -->
        <div class="recent-action">
            <h2>کمک های اخیر </h2>
            <table>
                <thead>
                    <tr>
                        <th>نام کالا</th>
                        <th>نام مددیار</th>
                        <th>نام مددجو</th>
                        <th>تعدا کالا</th>
                        <th>وضعیت</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>کفش سایز45</td>
                        <td>محمد رستمی</td>
                        <td>عرفان قربانی</td>
                        <td>4</td>
                        <td class="warning">در حال تحویل </td>
                        <td ><a class="primary" href="#">جزئیات</a></td>
                    </tr>
                    <tr>
                        <td>کفش سایز45</td>
                        <td>محمد رستمی</td>
                        <td>عرفان قربانی</td>
                        <td>4</td>
                        <td class="warning">در حال تحویل </td>
                        <td ><a class="primary" href="#">جزئیات</a></td>
                    </tr>

                    <tr>
                        <td>کفش سایز45</td>
                        <td>محمد رستمی</td>
                        <td>عرفان قربانی</td>
                        <td>4</td>
                        <td class="warning">در حال تحویل </td>
                        <td ><a class="primary" href="#">جزئیات</a></td>
                    </tr>

                    <tr>
                        <td>کفش سایز45</td>
                        <td>محمد رستمی</td>
                        <td>عرفان قربانی</td>
                        <td>4</td>
                        <td class="warning">در حال تحویل </td>
                        <td ><a class="primary" href="#">جزئیات</a></td>
                    </tr>

                    <tr>
                        <td>کفش سایز45</td>
                        <td>سینا ذکایی</td>
                        <td>عرفان قربانی</td>
                        <td>4</td>
                        <td class="warning">در حال تحویل </td>
                        <td ><a class="primary" href="#">جزئیات</a></td>
                    </tr>

                    <tr>
                        <td>کفش سایز45</td>
                        <td>محمدرضا روحانی</td>
                        <td>عرفان باقری</td>
                        <td>4</td>
                        <td class="warning">در حال تحویل </td>
                        <td ><a class="primary" href="#">جزئیات</a></td>
                    </tr>
                </tbody>
            </table>
            <a href="#" class="primary show-all">نمایش همه</a>
        </div>
    </main>
</template>

<style scoped>
main {
    margin-top: 1.4rem;
}

main .date {
    display: inline-block;
    border-radius: var(--border-radius-1);
}

main .date .input[type="date"] {
    background: transparent;
    color: var(--color-dark);
}

main .insight {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

main .insight > div {
    background: var(--color-white);
    padding: var(--card-padding);
    border-radius: var(--card-border-radius);
    margin-top: 1rem;
    box-shadow: var(--box-shadow);
    transition: all 300ms ease;
}

main .insight > div:hover {
    box-shadow: none;
}

main .insight .cash-donation span {
    padding: .5rem;
    text-align: center;
    color: white;
    background-color: var(--color-primary);
    border-radius: 50%;
}

main .insight .product-donation span {
    padding: .5rem;
    text-align: center;
    color: white;
    background-color: var(--color-danger);
    border-radius: 50%;
}

main .insight .help-seeker span {
    padding: .5rem;
    text-align: center;
    color: white;
    background-color: var(--color-green-dark);
    border-radius: 50%;
}

main .insight>div .middle {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

main .insight h3 {
    margin: 1rem 0 1.6rem;
    font-size: 1rem;
}

/* -------------- Table Bottom Insight--------------- */

main .recent-action{
    margin-top: 2rem;
}

main .recent-action h1{
    margin-bottom:0.8rem ;
}

main .recent-action table{
    background: var(--color-white);
    text-align: center;
    width: 100%;
    border-radius: var(--card-border-radius);
    box-shadow: var(--box-shadow);
    padding: var(--card-padding);
    transition: all 300ms ease;
}

main .recent-action table:hover{
    box-shadow: none;
}

main .recent-action table tbody td{
    height: 2.8rem;
    border-bottom: 1px solid var(--color-light);
    color: var(--color-dark-variant);
}

main .recent-action table tbody tr:last-child td{
    border: none;
}

main .recent-action .show-all{
    margin-top: 1.2rem;
    text-align: center;
    display: block;
}
</style>
