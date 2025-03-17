# MiniRedis - A Simple Redis Clone

MiniRedis is a lightweight in-memory key-value store built using Node.js with TCP support, mimicking basic Redis functionalities.

## Features

- Supports basic Redis commands: `SET`, `GET`, `DEL`, `EXISTS`
- TCP-based client-server architecture
- Append-only file (AOF) persistence for data recovery

## Installation

### 1. Clone the repository

```sh
git clone https://github.com/your-username/miniredis.git
cd miniredis
```

### 2. Install dependencies

```sh
npm install
```

## Usage

### 1. Start the MiniRedis server

```sh
node server/tcpServer.js
```

This starts the server on **port 6379**.

### 2. Connect using Telnet or Netcat

#### Using Telnet

```sh
telnet 127.0.0.1 6379
```

#### Using Netcat (Recommended)

```sh
nc 127.0.0.1 6379
```

### 3. Try Redis Commands

```sh
SET mykey hello
OK
GET mykey
hello
DEL mykey
OK
EXISTS mykey
0
```

## Project Structure

```
miniredis/
├── core/
│   ├── store.js       # Key-value store logic
│   ├── aof.js         # Append-only file persistence
├── server/
│   ├── tcpServer.js   # TCP server handling client connections
│   ├── handlers.js    # Command handler logic
├── README.md          # Project documentation
├── package.json       # Dependencies and scripts
```

## Notes

- If Telnet misaligns responses, use **Netcat (nc)** for better compatibility.
- Ensure **port 6379** is not blocked by firewall or in use.

## Contributing

Pull requests are welcome! Open an issue for discussions.

## License

MIT
