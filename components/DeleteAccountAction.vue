<template>
  <div
    class="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center z-10"
  >
    <transition
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="show" class="fixed inset-0 transition-opacity" @click="close">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
    </transition>

    <transition
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="ease-in duration-200"
      leave-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div
        v-if="show"
        class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Suppression de compte</h3>
          <div class="mt-2 max-w-xl text-sm leading-5 text-gray-500">
            <p v-if="deleted">Le compte a été supprimé.</p>
            <p v-else>Une fois le compte supprimé, les données relatives aux masques seront perdues.</p>
          </div>
          <div class="mt-5">
            <button
              type="button"
              class="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-50 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              @click="deleteAccount"
            >Supprimer le compte</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'DeleteAccountAction',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      deleted: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
      this.deleted = false
    },
    async deleteAccount() {
      await this.$store.dispatch('deleteAccount')
      this.deleted = true

      setTimeout(() => {
        this.close()
        this.$router.push({ path: '/login' })
      }, 1700)
    }
  }
}
</script>