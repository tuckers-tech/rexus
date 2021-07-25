<template>
  <div>
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
</template>

<script>
export default {
  name: 'ConnectionWatch',
  data: function() {
    return {
      connection: null,
      redisEvents: [],
    };
  },
  created() {
    this.startWebsocketConnection();
    this.$store.dispatch('startWatchingConnection', this.$route.params.id);
  },
  destroyed() {
    this.stopWebsocketConnection();
    this.$store.dispatch('stopWatchingConnection', this.$route.params.id);
  },
  methods: {
    startWebsocketConnection() {
      this.connection = new WebSocket('ws://localhost:4375');

      this.connection.onmessage = (event) => {
        this.redisEvents.push(JSON.parse(event.data));
      };
      this.connection.onopen = () => {
        console.log('Successfully connected to the echo websocket server...');
      };

      this.connection.onclose = () => {
        console.log('Websocket Connection Closed by the server.');
        console.log('Attempting to reconnect....');
        this.startWebsocketConnection();
      };
    },
    stopWebsocketConnection() {
      this.connection = null;
    },
    sendMessage: function(message) {
      this.connection.send(message);
    },
  },
};
</script>

<style></style>
