<template>
  <Modal
    v-if="isModalOpen"
    title="Add Connection"
    size="lg"
    @close="$emit('close')"
  >
    <div class="w-full flex flex-col">
      <div class="flex mb-2">
        <TextInput
          v-model="connection.name"
          label="Name:"
          name="name"
          placeholder="Local"
        />
      </div>
      <div class="flex">
        <TextInput
          v-model="connection.host"
          class="mr-2"
          label="Host:"
          name="host"
          placeholder="localhost"
        />
        <TextInput
          v-model="connection.port"
          label="Port:"
          name="port"
          placeholder="6379"
        />
      </div>
    </div>
    <template v-slot:actions>
      <div class="flex justify-end items-center">
        <button
          class="test-btn bg-gray-200 hover:bg-gray-300 px-5 py-2 border-2 border-gray-200 hover:border-gray-400 rounded"
          @click="sendConnectionTest"
        >
          <span v-if="!isTestingConnection">Test Connection</span>
          <!--
            TODO(TUCKER) - This should be pulled out into a loading button component
            That Would remove all the extra styles as well.a
          -->
          <div v-if="isTestingConnection" class="sk-circle">
            <div class="sk-circle1 sk-child"></div>
            <div class="sk-circle2 sk-child"></div>
            <div class="sk-circle3 sk-child"></div>
            <div class="sk-circle4 sk-child"></div>
            <div class="sk-circle5 sk-child"></div>
            <div class="sk-circle6 sk-child"></div>
            <div class="sk-circle7 sk-child"></div>
            <div class="sk-circle8 sk-child"></div>
            <div class="sk-circle9 sk-child"></div>
            <div class="sk-circle10 sk-child"></div>
            <div class="sk-circle11 sk-child"></div>
            <div class="sk-circle12 sk-child"></div>
          </div>
        </button>

        <svg
          v-if="connectionTestStatus === 'success'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#059669"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          v-if="connectionTestStatus === 'failure'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#DC2626"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div class="flex-grow"></div>
        <button
          class="hover:bg-red-300 px-5 py-2 border-2 border-gray-200 hover:border-red-400 hover:text-white rounded mr-2"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button
          class="bg-green-400 text-white px-5 py-2 border-2 border-green-400 hover:border-green-500 rounded"
          @click="submitFormData"
        >
          Add Connection
        </button>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modals/Parent/Modal.vue';
import TextInput from '@/components/Inputs/TextInput.vue';

export default {
  name: 'AddConnectionModal',
  components: {
    Modal,
    TextInput,
  },
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      connectionTestStatus: '',
      isTestingConnection: false,
      connection: {
        name: '',
        host: '',
        port: '',
      },
    };
  },
  methods: {
    clearFormData() {
      this.connection = {
        name: '',
        host: '',
        port: '',
      };
    },
    async submitFormData() {
      if (
        this.connection.name.length > 0 &&
        this.connection.host.length > 0 &&
        this.connection.port.length > 0
      ) {
        await this.$store.dispatch('addConnection', this.connection);
        this.$emit('close');
        this.clearFormData();
      }
    },

    async sendConnectionTest() {
      this.isTestingConnection = true;
      try {
        const { connectionValid } = await fetch(
          `${window.API_LOCATION}/api/v1/connection/test`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.connection),
          },
        ).then((response) => response.json());
        if (connectionValid) {
          this.connectionTestStatus = 'success';
        } else {
          this.connectionTestStatus = 'failure';
        }
        this.isTestingConnection = false;
      } catch (err) {
        this.connectionTestStatus = 'failure';
        this.isTestingConnection = false;
      }
    },
  },
};
</script>

<style scoped>
.test-btn {
  width: 175px;
}

.sk-circle {
  margin: auto;
  width: 20px;
  height: 20px;
  position: relative;
}
.sk-circle .sk-child {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.sk-circle .sk-child:before {
  content: '';
  display: block;
  margin: 0 auto;
  width: 15%;
  height: 15%;
  background-color: rgb(98, 98, 98);
  border-radius: 100%;
  -webkit-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
  animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
}
.sk-circle .sk-circle2 {
  -webkit-transform: rotate(30deg);
  -ms-transform: rotate(30deg);
  transform: rotate(30deg);
}
.sk-circle .sk-circle3 {
  -webkit-transform: rotate(60deg);
  -ms-transform: rotate(60deg);
  transform: rotate(60deg);
}
.sk-circle .sk-circle4 {
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
}
.sk-circle .sk-circle5 {
  -webkit-transform: rotate(120deg);
  -ms-transform: rotate(120deg);
  transform: rotate(120deg);
}
.sk-circle .sk-circle6 {
  -webkit-transform: rotate(150deg);
  -ms-transform: rotate(150deg);
  transform: rotate(150deg);
}
.sk-circle .sk-circle7 {
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
.sk-circle .sk-circle8 {
  -webkit-transform: rotate(210deg);
  -ms-transform: rotate(210deg);
  transform: rotate(210deg);
}
.sk-circle .sk-circle9 {
  -webkit-transform: rotate(240deg);
  -ms-transform: rotate(240deg);
  transform: rotate(240deg);
}
.sk-circle .sk-circle10 {
  -webkit-transform: rotate(270deg);
  -ms-transform: rotate(270deg);
  transform: rotate(270deg);
}
.sk-circle .sk-circle11 {
  -webkit-transform: rotate(300deg);
  -ms-transform: rotate(300deg);
  transform: rotate(300deg);
}
.sk-circle .sk-circle12 {
  -webkit-transform: rotate(330deg);
  -ms-transform: rotate(330deg);
  transform: rotate(330deg);
}
.sk-circle .sk-circle2:before {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
.sk-circle .sk-circle3:before {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}
.sk-circle .sk-circle4:before {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
.sk-circle .sk-circle5:before {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
.sk-circle .sk-circle6:before {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}
.sk-circle .sk-circle7:before {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}
.sk-circle .sk-circle8:before {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
.sk-circle .sk-circle9:before {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
.sk-circle .sk-circle10:before {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}
.sk-circle .sk-circle11:before {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
.sk-circle .sk-circle12:before {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}

@-webkit-keyframes sk-circleBounceDelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes sk-circleBounceDelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
