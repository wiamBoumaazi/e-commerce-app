module.exports = {
    apps: [
      {
        name: "TransactionService",
        script: "./TransactionService.js",
        watch: true,
        ignore_watch : ["node_modules"],
        watch: true,
      },
      {
        name: "Inventory",
        script: "./inventory.js",
        watch: true,
        ignore_watch : ["node_modules"],
        watch: true,
      },
      {
        name: "gateway",
        script: "./gateway.js",
        watch: true,
        ignore_watch : ["node_modules"],
        watch: true,
      },
      {
        name: "websocket",
        script: "./websocket.js",
        watch: true,
        ignore_watch : ["node_modules"],
        watch: true,
      },
      {
        name: "notification",
        script: "./notification.js",
        watch: true,
        ignore_watch : ["node_modules"],
        watch: true,
      },
      {
        name: "authService",
        script: "./authService.js",
        watch: true,
        ignore_watch : ["node_modules"],
        watch: true,
      },
      {
        name: "ReceiptService",
        script: "./consumerTest.js",
        watch: true,
        ignore_watch : ["node_modules"],
        watch: true,
      },
    ]
  }