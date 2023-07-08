<script setup>
import { onMounted } from 'vue';
import { usePeoplesAid } from '../../composables/usePeoplesAid'
import { useHelpSeeker } from '../../composables/useHelpSeeker'
import useComponentStore from '../../store/componentStore'

const componentStore=useComponentStore()

const peoplesAid = usePeoplesAid()
const {cashDonations,productDonations,productDonationsCount}=peoplesAid

const helpSeeker = useHelpSeeker()
const {helpSeekerCount}=helpSeeker

onMounted(async() => {
    componentStore.showLoading()
    
    await peoplesAid.setCashDonation()
    await peoplesAid.setProductDonation()
    await helpSeeker.setHelpSeekerCount()

    componentStore.dismissLoading()
})

</script>

<template>
    <main>
        <div class="dash-header">
            <h1>داشبورد</h1>
        </div>

        <div class="right">
            <h2>درخواست های 24 ساعت گذشته</h2>
            <div class="insight">
                <div class="cash-donation">
                    <span class="material-symbols-sharp">account_balance</span>
                    <div class="middle">
                        <div class="left">
                            <h3>مجموع کمک های نقدی</h3>
                            <h1>{{ cashDonations }}IR</h1>
                        </div>

                    </div>
                    <small>
                        <p class="text-muted">24 ساعت گذشته</p>
                    </small>
                </div>

                <div class="product-donation">
                    <span class="material-symbols-sharp">inventory</span>
                    <div class="middle">
                        <div class="left">
                            <h3>کالاهای اهدایی</h3>
                            <h1>{{ productDonationsCount }}</h1>
                        </div>
                    </div>
                    <small>
                        <p class="text-muted">24 ساعت گذشته</p>
                    </small>
                </div>

                <div class="help-seeker">
                    <span class="material-symbols-sharp">groups</span>
                    <div class="middle">
                        <div class="left">
                            <h3>تعداد کل افراد تحت پوشش</h3>
                            <h1>{{helpSeekerCount }}</h1>
                        </div>
                    </div>
                    <small>
                        <p class="text-muted">24 ساعت گذشته</p>
                    </small>
                </div>

            </div>
        </div>
        <!-- ----------- End Of Insight ------------- -->

        <div class="recent-help">
            <h2>کمک های اخیر </h2>
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
                    <tr v-for="aid in productDonations.peopleAids">
                        <td>{{ aid.title }}</td>
                        <td class="responsive-hidden">محمد رستمی</td>
                        <td>عرفان قربانی</td>
                        <td class="responsive-hidden">{{ aid.quantity }}</td>
                        <td class="warning">در حال تحویل </td>
                        <td><a class="primary" href="#">جزئیات</a></td>
                    </tr>
                </tbody>
            </table>
            <a href="#" class="primary show-all">نمایش همه</a>
            <!-- -------------- END OF Table ------------------ -->
        </div>
        <!-- ----------- End Of Recent Help ---------------->

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
                </div>
            </div>
            <!----------- End of Recent Update ----------------->
        </div>

        <!-- ---------------End Of Left Container--------------------->
    </main>
</template>

<style scoped>
main {
    display: grid;
    grid-template-columns: 2.5fr 1fr;
    grid-template-rows: 5rem 1fr 2fr;
    grid-template-areas: "haeder header"
        "right left"
        "table left";
    margin: 0 1rem;
}

main h1,
h2,
h3,
p,
table {
    color: var(--color-dark);
}

main .dashboard-header {
    grid-area: header;
}

main .right {
    grid-area: right;
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
    cursor: pointer;
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
    color: var(--color-dark);
}

main .recent-help table tbody tr:last-child td {
    border: none;
}

/* -------------Show All Link------------------ */
main .recent-help .show-all {
    margin: .8rem 0;
    text-align: center;
    display: block;
}

/* -----------------left Container -------------- */
main .left {
    margin: 0 1rem;
    display: grid;
    grid-template-rows: .8fr;
    grid-area: left;
}

main .left h2 {
    margin-bottom: 1rem;
}


main .left .top .recent-update {
    background-color: var(--color-white);
    border-radius: var(--card-border-radius);
    display: flex;
    flex-direction: column;
    box-shadow: var(--box-shadow);
    padding: 1.2rem;
    transition: all 300ms ease;
}

main .left .top .recent-update:hover {
    box-shadow: none;
}

main .left .top .recent-update .update {
    display: flex;
    height: 10rem;
    flex-direction: column;
    gap: .2rem;
    margin: 1.2rem 0;
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
    border-radius: 100%;
    height: 1.8rem;
    margin: 0px auto;
}



/* -------------- Media Query 1----------------- */
@media screen and (max-width:1200px) {
    main {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 5rem 1fr;
        grid-template-areas: "haeder header"
            "right left"
            "table table";
    }

    main .right .insight {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

}


/* -------------- Media Query 2----------------- */

@media screen and (max-width:768px) {
    main {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 5rem 1fr .7fr auto;
        grid-template-areas: "header"
            "right"
            "left"
            "table";
        margin: 0px auto;
        gap: 1rem;
    }

    main .dash-header {
        margin-top: 2rem;
        padding: 0rem 1rem;
    }

    main h2 {
        padding: 0rem 1rem;
    }

    main .insight {
        padding: 1rem;
    }

    main .recent-help {
        padding: 1rem;
    }

    main .responsive-hidden {
        display: none;
    }
}
</style>
