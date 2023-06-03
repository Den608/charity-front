<script setup>

</script>

<template>
    <main>
        <div class="right">
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
                            <td><a class="primary" href="#">جزئیات</a></td>
                        </tr>
                    </tbody>
                </table>
                <a href="#" class="primary show-all">نمایش همه</a>
            </div>
            <!-- -------------- END OF Table ------------------ -->
        </div>

        <div class="left">
            <div class="top">
                <h2> بروز رسانی های اخیر</h2>
                <div class="recent-update">
                    <div class="updates">
                        <div class="update">
                            <div class="update-content">
                                <span class="material-symbols-sharp">info</span>
                                <p>کمک های اهدایی از طرف مرکز خیریه به عرفان قربانی {{ }}تحویل داده شد</p>
                            </div>
                            <small class="text-muted"> 3دقیقه ی پیش</small>
                        </div>
                    </div>
                    <!-- End of Update -->
                </div>
            </div>
            <!-- End of Top -->

        </div>
        <!-- ---------------End Of Left Container------------------- -->
    </main>
</template>

<style scoped>
main {
    margin-top: 1.4rem;
    display: grid;
    grid-template-columns: 2.5fr 1fr;
    margin: 0 1rem;
}

main .right .date {
    display: inline-block;
    border-radius: var(--border-radius-1);
    margin: .6rem 0;
}

main .right .date .input[type="date"] {
    background: transparent;
    color: var(--color-dark);
}

main .right .insight {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

main .right .insight>div {
    background: var(--color-white);
    padding: var(--card-padding);
    border-radius: var(--card-border-radius);
    margin-top: 1rem;
    box-shadow: var(--box-shadow);
    transition: all 300ms ease;
}

main .right .insight>div:hover {
    box-shadow: none;
}

main .right .insight .cash-donation span {
    padding: .5rem;
    text-align: center;
    color: white;
    background-color: var(--color-primary);
    border-radius: 50%;
}

main .right .insight .product-donation span {
    padding: .5rem;
    text-align: center;
    color: white;
    background-color: var(--color-danger);
    border-radius: 50%;
}

main .right .insight .help-seeker span {
    padding: .5rem;
    text-align: center;
    color: white;
    background-color: var(--color-green-dark);
    border-radius: 50%;
}

main .right .insight>div .middle {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

main .right .insight h3 {
    margin: 1rem 0 1.6rem;
    font-size: 1rem;
}

/* -------------- Table Bottom Insight--------------- */

main .right .recent-action {
    margin-top: 2rem;
}

main .right .recent-action h2 {
    margin-bottom: 0.8rem;
    font-weight: 600;
}

main .right .recent-action table {
    background: var(--color-white);
    text-align: center;
    width: 100%;
    border-radius: var(--card-border-radius);
    box-shadow: var(--box-shadow);
    padding: var(--card-padding);
    transition: all 300ms ease;
}

main .right .recent-action table:hover {
    box-shadow: none;
}

main .right .recent-action table tbody td {
    height: 2.8rem;
    border-bottom: 1px solid var(--color-light);
    color: var(--color-dark-variant);
}

main .right .recent-action table tbody tr:last-child td {
    border: none;
}

/* -------------Show All Link------------------ */
main .right .recent-action .show-all {
    margin: .8rem 0;
    text-align: center;
    display: block;
}

/* -----------------left Container -------------- */
main .left {
    margin: 0 .8rem;
    display: grid;
    grid-template-rows: .8fr;
}

main .left h2 {
    margin-top: 4rem;
    margin-bottom: 1rem;
}


main .left .top .recent-update {
    background-color: white;
    border-radius: var(--card-border-radius);
    display: flex;
    flex-direction: column;
    box-shadow: var(--box-shadow);
    padding: 1.2rem;
    height: 100%;
    transition: all 300ms ease;
}

main .left .top .recent-update:hover {
    box-shadow: none;
}

main .left .top .recent-update .update {
    display: flex;
    flex-direction: column;
    gap: .2rem;
    margin: .8rem 0;
    background-color: var(--color-light);
    padding: .8rem;
    border-radius: var(--card-border-radius);
}

main .left .top .recent-update .update .update-content {
    display: flex;
    gap: .2rem;
    margin: .8rem 0;
}

main .left .top .recent-update .update span {
    color: white;
    background-color: var(--color-primary);
    border-radius: 50%;
    height: 50%;
}
</style>
