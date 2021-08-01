<template>
  <div class="bg-white m-4 shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        CPU
      </h3>
    </div>
    <div class="border-t border-gray-200">
      <dl>
        <div
          class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
        >
          <dt class="text-sm font-medium text-gray-500">
            Usage
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ serverInfo.used_cpu_sys }} %
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CPUCard',
  props: {
    serverInfo: {
      type: Object,
      required: true,
    },
  },
};
</script>
