<script setup>
import { defineProps } from 'vue'

const emit = defineEmits(['onClose'])
const { modalInputs, title } = defineProps(['modalInputs', 'title'])

</script>

<template>
    <div class="overlay">
        <div class="modal">
            <span class="material-symbols-sharp" @click="emit('onClose')">
                close
            </span>
            <h2>{{ title }}</h2>
                <slot>

                </slot>
            <input type="button" value="ثبت">
        </div>
    </div>
</template>

<style>
.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.overlay .modal {
    align-items: center;
    background-color: var(--color-white);
    border-radius: var(--card-border-radius);
    box-shadow: var(--box-shadow);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    padding: var(--card-padding);
    position: relative;
    width: 30rem;
    min-height: 30rem;
    right: -15rem;
    top: -5rem;
}

.overlay .modal span {
    color: var(--color-danger);
    font-weight: bold;
    position: absolute;
    padding: 1rem;
    top: 1rem;
    right: 1rem;
}

.overlay .modal span:hover {
    color: red;
    transition: all 300ms ease;
}

.overlay .modal input[type='text'] {
    background-color: var(--color-light);
    border-radius: var(--border-radius-1);
    color: var(--color-dark);
    font-size: 1.2rem !important;
    margin-top: 2rem;
    width: 90%;
    height: 4rem;
    padding: .6rem;

}

.overlay .modal textarea {
    background-color: var(--color-light);
    border-radius: var(--border-radius-1);
    color: var(--color-dark);
    font-size: 1.2rem !important;
    font-family: 'Vazirmatn', sans-serif;
    ;
    margin-top: 2rem;
    width: 90%;
    height: 8rem;
    padding: .6rem;

}

.overlay .modal input[type='button'] {
    background-color: var(--color-primary);
    border-radius: var(--card-border-radius);
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
    margin-top: 2.2rem;
    width: 90%;
    height: 3rem;
}
</style>