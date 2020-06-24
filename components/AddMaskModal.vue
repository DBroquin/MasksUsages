<template>
  <div
    :class="{'fixed bottom-0 inset-x-0 px-4 pb-6': containerShow}"
    class="sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center z-10"
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
      @before-enter="containerShow = true"
      @after-leave="containerShow = false"
    >
      <div
        v-if="show"
        class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div>
          <div
            v-if="stored"
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
          >
            <svg
              class="h-6 w-6 text-green-600"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <h3
              class="text-lg leading-6 font-medium text-gray-900"
              id="modal-headline"
            >Ajouter un masque</h3>
            <div class="mt-2">
              <p v-if="stored" class="text-sm leading-5 text-gray-500">Le masque a été ajouté</p>
              <template v-else>
                <InputField
                  v-model="mask.name"
                  id="name"
                  label="Nom"
                  placeholder="Premier masque"
                  class="mt-6"
                />
                <InputField
                  v-model="mask.port_duration"
                  :placeholder="4"
                  id="port_duration"
                  label="Temps de port (h)"
                  type="number"
                  class="mt-6"
                />
                <InputField
                  v-model="mask.lifetime"
                  :placeholder="40"
                  id="lifetime"
                  label="Nombre de port / Lavage"
                  type="number"
                  class="mt-6"
                />
              </template>
            </div>
          </div>
        </div>
        <div
          v-if="!stored"
          class="mt-12 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
        >
          <span class="flex w-full rounded-md shadow-sm sm:col-start-2">
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              @click="addHandler"
            >Ajouter</button>
          </span>
          <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:col-start-1">
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              @click="close"
            >Annuler</button>
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import InputField from '~/components/InputField'

export default {
  name: 'AddMaskModal',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  components: {
    InputField
  },
  data() {
    return {
      containerShow: false,
      mask: {
        name: '',
        port_duration: '',
        lifetime: ''
      },
      stored: false
    }
  },
  methods: {
    async addHandler() {
      await this.$store.dispatch('addMask', this.mask)
      this.stored = true

      setTimeout(() => {
        this.close()
      }, 1700)
    },
    close() {
      this.$emit('close')
      this.name = ''
      this.lifetime = null
      this.port_duration = null
      this.stored = false
    }
  }
}
</script>