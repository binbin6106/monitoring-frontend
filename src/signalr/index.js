// src/signalr/index.js
let connection = null

export async function getConnection() {
  if (connection) return connection

  const signalR = await import('@microsoft/signalr')

  connection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:5131/sensorHub')
    // .withUrl('http://10.50.126.113:5131/sensorHub')
    .withAutomaticReconnect()
    .build()

  try {
    await connection.start()
    console.log('SignalR connected')
  } catch (err) {
    console.error('SignalR connection failed:', err)
  }

  return connection
}
