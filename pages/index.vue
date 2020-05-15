<template>
  <div class="sm:max-w-sm sm:mx-auto px-6 px-8 py-6 flex-1 flex flex-col">
    <div v-if="hasMasks">
      <multiselect v-model="selectedMask" :options="masks" trackBy="id" label="name" />
      <div v-if="selectedMask" class="px-4 py-8 sm:px-0 flex flex-col items-center mt-16">
        <p class="text-6xl">{{ selectedMask.usage }}</p>
        <p class="text-xl mb-8">/ {{ selectedMask.lifetime }}</p>
        <span class="inline-flex rounded-md shadow-sm">
          <button
            :class="{
            'bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700': canIncr,
            'bg-gray-400': !canIncr
          }"
            type="button"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white transition ease-in-out duration-150"
            @click="incrCounter"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="plus"
              class="h-3 w-3 mr-2"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
              />
            </svg>
            <span>1</span>
          </button>
        </span>
      </div>
    </div>

    <div v-else class="flex flex-col items-center mt-16">
      <h1 class="text-3xl font-bold leading-tight text-gray-900 mb-16">Aucun masque</h1>
      <span class="inline-flex rounded-md shadow-sm">
        <button
          type="button"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
          @click="showAddModal = true"
        >En ajouter un</button>
      </span>
    </div>

    <AddMaskModal :show="showAddModal" @close="showAddModal = false" />
  </div>
</template>

<script>
import AddMaskModal from '~/components/AddMaskModal'
import Multiselect from 'vue-multiselect'
import { mapState } from 'vuex'
import Top from '~/components/Top'

import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  components: { Top, Multiselect, AddMaskModal },
  middleware: 'authMiddleware',
  data() {
    return {
      showAddModal: false,
      selectedMask: null
    }
  },
  computed: {
    hasMasks() {
      return this.masks && this.masks.length > 0
    },
    canIncr() {
      return this.selectedMask.usage < this.selectedMask.lifetime
    },
    ...mapState({
      masks: state => state.masks
    })
  },
  mounted() {
    this.selectedMask = { ...this.masks[0] }
  },
  methods: {
    incrCounter() {
      if (this.canIncr) {
        this.selectedMask.usage++

        this.$store.dispatch('updateMask', {
          id: this.selectedMask.id,
          usage: this.selectedMask.usage
        })
      }
    }
  }
}
</script>