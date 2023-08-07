<script setup>
import { Transition } from 'vue';

const emit=defineEmits(['submit'])
const {message}=defineProps(['message'])

function submitAction(type){
    emit('submit',type)
}

</script>

<template>
    <div class="alert-overlay">
        <Transition name="popupShow" appear>
            <div class="alert">
                <p class="message">{{ message }}</p>
                <div class="options">
                    <span @click="submitAction('yes')">بله</span>
                    <span @click="submitAction('no')">خیر</span>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.alert-overlay {
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    z-index: 999;
    overflow: auto;
}

.alert-overlay .alert {
    background-color: var(--color-dark);
    border-radius: var(--border-radius-2);
    display: flex;
    flex-direction: column;
    height: 10rem;
    width: 20rem;
    position: relative;
    z-index: 999;
    padding: 2rem;
}

.alert-overlay .alert .message {
    color: white;
    width: inherit;
}

.alert-overlay .alert .options {
    color: var(--color-white);
    display: flex;
    gap: 1rem;
    position: absolute;
    right: 4rem;
    bottom: 2rem;
}

.alert-overlay .alert .options span {
    cursor: pointer;
}

.alert-overlay .alert .options span:hover {
    color: red;
    transition: all 300ms ease;
}

.popupShow-enter-to {
    transform: translateY(0);
    opacity: 1;
}

.popupShow-enter-active {
    transition: all 1s ease;
}


.popupShow-leave-from {
    opacity: 1;
}

.popupShow-leave-to {
    opacity: 0;
}

.popupShow-leave-active {
    transition: all 1.5s ease;
}
</style>