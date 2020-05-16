<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex">
        <div class="flex-shrink-0 flex items-center">
          <img class="block h-8 w-auto" src="~/assets/images/logo.png" alt="Masks logo" />
        </div>
      </div>
      <div class="ml-6 flex items-center">
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-50 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200 transition ease-in-out duration-150"
          @click="showAddModal = true"
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
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="head-side-mask"
            class="h-5 w-5"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M.15,184.42C-2.17,244.21,23,298.06,64,334.88V512H224V316.51L3.67,156.25A182.28,182.28,0,0,0,.15,184.42ZM509.22,275c-21-47.12-48.5-151.75-73.12-186.75A208.11,208.11,0,0,0,266.11,0H200C117,0,42.48,50.57,13.25,123.65L239.21,288H511.76A31.35,31.35,0,0,0,509.22,275ZM320,224a32,32,0,1,1,32-32A32.07,32.07,0,0,1,320,224Zm16,144H496l16-48H256V512H401.88a64,64,0,0,0,60.71-43.76L464,464H336a16,16,0,0,1,0-32H474.67l10.67-32H336a16,16,0,0,1,0-32Z"
            />
          </svg>
        </button>

        <!-- Profile dropdown -->
        <div class="ml-3 relative">
          <button
            v-click-outside="close"
            class="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
            id="user-menu"
            aria-label="User menu"
            aria-haspopup="true"
            @click="toggle"
          >
            <img class="h-8 w-8 rounded-full" :src="user.photoURL" alt />
          </button>

          <transition
            enter-active-class="transition ease-out duration-100 transform"
            enter-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75 transform"
            leave-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="showDropdown"
              ref="dropdown"
              class="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg z-10"
            >
              <div class="py-1 rounded-md bg-white shadow-xs text-right">
                <p
                  class="block px-4 py-2 text-sm font-medium leading-5 text-gray-700"
                >{{ user.displayName }}</p>
                <p class="block px-4 pb-4 text-xs leading-5 text-gray-700">{{ user.email }}</p>
                <div class="border-t border-gray-100"></div>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                  @click="showDeleteAccountAction = true"
                >Supprimer le compte</a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                  @click="logout"
                >Déconnexion</a>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <AddMaskModal :show="showAddModal" @close="showAddModal = false" />
    <DeleteAccountAction :show="showDeleteAccountAction" @close="showDeleteAccountAction = false" />
  </div>
</template>

<script>
import AddMaskModal from '~/components/AddMaskModal'
import DeleteAccountAction from '~/components/DeleteAccountAction'
import ClickOutside from 'vue-click-outside'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Top',
  components: {
    AddMaskModal,
    DeleteAccountAction
  },
  directives: { ClickOutside },
  data() {
    return {
      showAddModal: false,
      showDeleteAccountAction: false,
      showDropdown: false
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  mounted() {
    this.popupItem = this.$refs.dropdown
  },
  methods: {
    toggle() {
      this.showDropdown = !this.showDropdown
    },
    close() {
      this.showDropdown = false
    },
    ...mapActions(['logout'])
  }
}
</script>