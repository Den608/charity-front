<script setup>

</script>

<template>
    <aside>
        <div class="top">
            <div class="logo">
                <img src="./images/logo.png">
                <h2>سامانه <span class="danger">اسایش</span></h2>
            </div>
            <div class="close">
                <span class="material-symbols-sharp">close</span>
            </div>
        </div>
        <div class="sidebar">

            <div class="tab-contaner active">
                <div class="tab">
                    <span class="material-symbols-sharp">dashboard</span>
                    <h3>داشبورد</h3>
                </div>
            </div>

            <div class="tab-contaner">
                <div class="tab">
                    <span class="material-symbols-sharp">group</span>
                    <h3>افراد خیر</h3>
                </div>
            </div>

            <div class="tab-contaner">
                <div class="tab">
                    <span class="material-symbols-sharp">settings_accessibility</span>
                    <h3>افراد نیازمند</h3>
                </div>
            </div>

            <div class="tab-contaner">
                <div class="tab">
                    <span class="material-symbols-sharp">inventory_2</span>
                    <h3>کمک های مردمی</h3>
                </div>
            </div>

            <div class="tab-contaner">
                <div class="tab">
                    <span class="material-symbols-sharp">deployed_code</span>
                    <h3>بسته های مناسبتی</h3>
                </div>
            </div>

            <div class="tab-contaner">
                <div class="tab">
                    <span class="material-symbols-sharp">school</span>
                    <h3>دانشجویان و دانش اموزان</h3>
                </div>
            </div>

            <div class="tab-contaner last-child">
                <div class="tab">
                    <span class="material-symbols-sharp">logout</span>
                    <h3>خروج از سیستم</h3>
                </div>
            </div>
        </div>
    </aside>
</template>

<style scoped>
aside {
    height: 100vh;
}

aside .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
}



aside .top .logo {
    display: flex;
    gap: 0.8rem;
}

aside .top .logo img {
    width: 2rem;
    height: 2rem;
}

aside .close {
    display: none;
}


/* -------Side Bar--------- */
aside .sidebar {
    display: flex;
    flex-direction: column;
    height: 86vh;
    position: relative;
    top: 1rem;
}

aside h3 {
    font-weight: 500;
}

aside .sidebar .tab-contaner {
    cursor: pointer;
    height: 3.7rem;
    display: flex;
    align-items: center;
    position: relative;
    color: var(--color-info-dark);
    transition: all 300ms ease;
}

aside .sidebar .tab-contaner .tab {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-right: 1rem;
}

aside .sidebar .tab-contaner .tab {
    font-size: 1.6rem;
    transition: all 300ms ease;
}

aside .sidebar .tab-contaner:last-child {
    position: absolute;
    bottom: 2rem;
    width: 100%;
}

aside .sidebar .tab-contaner.active {
    background-color: var(--color-light);
    color: var(--color-primary);
}

aside .sidebar .tab-contaner.active::before {
    content: '';
    width: 6px;
    height: 100%;
    background: var(--color-primary);
}

aside .sidebar .tab-contaner .tab:hover {
    color: var(--color-primary);
    margin-right: 1rem;
}
</style>