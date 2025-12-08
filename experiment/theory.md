## I2C Communication (Inter-Integrated Circuit)

I2C is a widely used serial communication protocol designed for connecting multiple low-speed peripherals to microcontrollers. It works on a simple two-wire interface and enables efficient Master–Slave communication.  
In this experiment, we simulate communication between two Arduino boards using I2C, where one acts as the Master and the other as the Slave.

---

## Arduino Microcontroller in I2C Communication

### Overview
Arduino boards (UNO, Nano, etc.) have built-in hardware support for I2C.

- **SDA (A4)** → Serial Data Line  
- **SCL (A5)** → Serial Clock Line  

These pins allow Arduino to communicate with sensors, displays, EEPROMs, and even other Arduino boards.

### Role in I2C Communication
- One Arduino acts as the **Master**
- Another Arduino acts as the **Slave**
- Master initiates communication and sends data
- Slave listens for its address and responds

This setup enables smooth multi-device communication.

---

## I2C Protocol in Embedded Systems

### Key Characteristics
- Two-wire protocol (**SDA + SCL**)
- Supports multiple slave devices
- Each slave has a unique **7-bit or 10-bit address**
- Synchronous communication (clock from master)
- Reliable transfer using ACK/NACK

### Advantages
- Very few pins required  
- Ideal for microcontroller-to-microcontroller communication  
- Supports many devices on one bus  
- Low power consumption  

---

## I2C Components

### Master
- Controls the clock  
- Initiates communication  
- Decides read/write operations  

### Slave
- Responds to master requests  
- Identified by unique address  

### SDA (Data Line)
Carries data between devices.

### SCL (Clock Line)
Synchronizes data transfer.

---

## Example Workflow
1. Master starts communication  
2. Sends slave address  
3. Sends data or requests data  
4. Slave receives or sends data  
5. Communication ends  

---

## Master–Slave Data Exchange Simulation

Two Arduino boards are connected:  
- **Master Arduino** → Sends data periodically (e.g., “Hello Slave”)  
- **Slave Arduino** → Listens to its address and processes the data  

### Data Flow
Master Arduino → I2C Bus (SDA/SCL) → Slave Arduino

### Communication Method
- Both boards share **common ground**
- SDA lines connected together  
- SCL lines connected together  
- Master sends bytes  
- Slave reads them using interrupt-based functions  

### Applications
- Multi-controller robotics  
- Industrial control systems  
- Smart home automation  
- Distributed sensor networks  

---

## I2C vs UART vs SPI

| Feature              | UART                 | SPI                    | I2C                                 |
| -------------------- | -------------------- | ---------------------- | ----------------------------------- |
| Number of Wires      | 2                    | 4+                     | 2                                   |
| Multi-device Support | No                   | Limited                | Excellent                           |
| Speed                | Medium               | Fast                   | Medium                              |
| Complexity           | Low                  | High                   | Medium                              |
| Usage                | Serial communication | High-speed peripherals | Sensor networks, controller linking |

**I2C is preferred** because it provides multi-slave communication with minimal wiring.

---

## Simulation Features
- Real-time SDA/SCL signal visualization  
- Multi-device communication  
- Live serial monitor output  
- Master–Slave addressing  
- Error debugging support  

### Benefits
- No physical hardware required  
- Easy code testing  
- Safe for beginners  
- Accurate timing emulation  

---

## Experiment Environment
Simulation environment allows:

- Creating two virtual Arduino boards  
- Connecting SDA and SCL  
- Assigning Master and Slave roles  
- Monitoring data exchange in real-time  
- Debugging I2C events  

This makes I2C simulation extremely effective for learning inter-device communication.

