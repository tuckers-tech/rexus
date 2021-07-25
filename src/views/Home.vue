<template>
  <div class="h-screen">
    <Layout>
      <div class="flex flex-col w-full overflow-y-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Time
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Args
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Raw Reply
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(event, eventIDX) in redisEvents"
              :key="event.time"
              :class="eventIDX % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
            >
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                {{ event.message.time }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ event.message.args }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ event.message.rawReply }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout/Layout.vue';

export default {
  name: 'Home',
  components: {
    Layout,
  },
  data: function() {
    return {
      connection: null,
      redisEvents: [],
    };
  },
  created() {
    this.startWebsocketConnection();
  },
  methods: {
    startWebsocketConnection() {
      this.connection = new WebSocket('ws://localhost:4375');

      this.connection.onmessage = (event) => {
        console.log(JSON.parse(event.data));
        this.redisEvents.push(JSON.parse(event.data));
      };
      this.connection.onopen = (event) => {
        console.log(event);
        console.log('Successfully connected to the echo websocket server...');
      };

      this.connection.onclose = () => {
        console.log('Websocket Connection Closed by the server.');
        console.log('Attempting to reconnect....');
        this.startWebsocketConnection();
      };
    },
    sendMessage: function(message) {
      console.log(this.connection);
      this.connection.send(message);
    },
  },
};
</script>
