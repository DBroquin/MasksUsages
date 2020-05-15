<template>
  <div>
    <label :for="id" class="block text-sm font-medium leading-5 text-gray-700">{{ label }}</label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :value="value"
        @input="updateValue($event.target.value)"
        class="form-input block w-full sm:text-sm sm:leading-5"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputField',
  props: {
    value: {
      type: [Number, String],
      required: true
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: [String, Number],
      required: true
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    updateValue: function(value) {
      this.$emit('input', value)
    }
  }
}
</script> 