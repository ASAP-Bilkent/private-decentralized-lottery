# ⚫ Private Decentralized Lottery

**Private Decentralized Lottery** is a cryptographic protocol developed by the ASAP Research Group at Bilkent University.
It enables a publicly verifiable lottery system that ensures participant anonymity and fairness without relying on a centralized authority.

## 🛠️ Installation

### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install)
- [Node.js](https://nodejs.org/) (for frontend components)
- [npm](https://www.npmjs.com/) (comes with Node.js)

**Windows-specific requirements:**
- [MSYS2](https://www.msys2.org/) (required for building on Windows)
- GCC (install via MSYS2: `pacman -S mingw-w64-x86_64-gcc`)

> **Important:** The repository must be cloned and built in a directory path containing **ASCII characters only**. Non-ASCII characters in the path may cause build issues.

### Environment Variables

Before building and running the project, create a `.env` file in the root directory and add the following values:

```
PRIVATE_KEY="your private key"
RPC_URL="https://sepolia.infura.io/v3/yourcustomurl"
```

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ASAP-Bilkent/private-decentralized-lottery.git
   cd private-decentralized-lottery
   ```

   1.1 **Clone Accumulator Repository**
   ```bash
      git clone https://github.com/cambrian/accumulator.git
   ```

2. **Install Dependencies and Build**

   ```bash
   cargo build --release
   ```

3. **Run the Backend**

   ```bash
   cargo run
   ```

### Frontend Setup

1. **Navigate to the Frontend Directory**

   ```bash
   cd frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Build the Frontend**

   ```bash
   npm run build
   ```

4. **Start the Frontend**

   ```bash
   npm start
   ```

---

Feel free to customize this file further to align with your project's specifics.
