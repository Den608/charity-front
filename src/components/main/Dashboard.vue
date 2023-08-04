<script setup>
import { onMounted } from 'vue';
import { useUsersApi } from '../../composables/useUsersApi';
import { useAids } from '../../composables/useAidsApi'
import { useAidAllocation } from '../../composables/useAidAllocationApi';
import useComponentStore from '../../store/componentStore'
import EmptyContent from '../EmptyContent.vue';

const componentStore = useComponentStore()

//aid
const aidApi = useAids()
const { cashDonations, productDonations } = aidApi

//user
const userApi = useUsersApi()
const { usersCount } = userApi

//aloocation
const aidAllocation = useAidAllocation()
const { assignedAids, aidAllocations } = aidAllocation


onMounted(async () => {
    componentStore.showLoading()

    await aidApi.setCashDonation()
    await aidApi.setProductDonation()

    await userApi.setAllUsers('help_seeker')

    await aidAllocation.setAllAidAllocations()
    await aidAllocation.setAssignedAids()

    componentStore.dismissLoading()
})


function getTimeDetail(time) {
    let timeInfo = ""
    const currentTime = new Date();
    const createdAtTime = new Date(time);
    const timeDifference = currentTime - createdAtTime;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    if (days != 0) {
        timeInfo += ` ${days} روز`
    }
    if (hours != 0) {
        timeInfo += ` ${hours} ساعت`
    }
    if (minutes != 0) {
        timeInfo += ` ${minutes} دقیقه`
    }
    if (seconds != 0) {
        timeInfo += ` ${seconds} ثانیه`
    }

    timeInfo += ' پیش'

    return timeInfo
}

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
                            <h1> {{ productDonations.count }}</h1>
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
                            <h1>{{ usersCount }}</h1>
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
            <table v-if="aidAllocations.length > 0">
                <thead>
                    <tr>
                        <th>نام کالا</th>
                        <th class="responsive-hidden">نام مددیار</th>
                        <th>نام مددجو</th>
                        <th class="responsive-hidden">تعدا کالا</th>
                        <th>وضعیت</th>
                    </tr>
                </thead>
                <tbody v-for="aid in aidAllocations.slice(0, 5)" :key="aid.id">
                    <tr>
                        <td>{{ aid.people_aid.title }}</td>
                        <td class="responsive-hidden">
                            {{ aid.helper_name.first_name + ' ' + aid.helper_name.last_name }}
                        </td>
                        <td>{{ aid.help_seeker_name.first_name + ' ' + aid.help_seeker_name.last_name }} </td>
                        <td class="responsive-hidden">{{ aid.quantity }}</td>
                        <td :id="aid.status == 'assigned' ? 'deliver' : 'not-deliver'">
                            {{ aid.status == "assigned" ? "تحویل داده شده" : "در حال تحویل..." }}
                        </td>
                        <td><a class="primary" href="#">جزئیات</a></td>
                    </tr>
                </tbody>
            </table>
            <EmptyContent v-else />

            <a v-if="aidAllocations.length > 0" href="#" class="primary show-all">نمایش همه</a>

            <!-- -------------- END OF Table ------------------ -->
        </div>
        <!-- ----------- End Of Recent Help ---------------->

        <div class="left" v-if="assignedAids.length > 0">
            <div class="top">
                <h2> بروز رسانی های اخیر</h2>
                <div v-if="assignedAids.length > 0" class="recent-update">
                    <div class="updates">
                        <div class="update" v-for="aid in assignedAids" :key="aid.id">
                            <div class="update-content">
                                <span class="material-symbols-sharp">info</span>
                                <p>کمک های اهدایی از طرف مرکز خیریه به {{ aid.help_seeker_name.first_name }} {{
                                    aid.help_seeker_name.last_name }} تحویل داده شد</p>
                            </div>
                            <small class="text-muted">{{ getTimeDetail(aid.created_at) }} </small>
                        </div>
                    </div>
                </div>
                <!-- <EmptyContent v-else/> -->

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

#deliver {
    color: var(--color-info-dark);
}

#not-deliver {
    color: var(--color-warning);
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

main .recent-help table tbody tr td {
    height: 2.8rem;
    border-bottom: 1px solid var(--color-light);
    color: var(--color-dark);
}

main .recent-help table tbody:last-child td {
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
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 5rem 1fr 1fr 1fr;
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
