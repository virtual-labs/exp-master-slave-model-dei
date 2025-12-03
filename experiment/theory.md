I2C (Inter-Integrated Circuit) is a widely used serial communication protocol especially designed for connecting multiple low-speed peripherals to microcontrollers. It operates on a simple two-wire interface and enables efficient data transfer between devices using Master–Slave architecture. In this experiment, we simulate communication between two Arduino boards using I2C, where one acts as a Master and the other as a Slave.

# Arduino Microcontroller in I2C Communication
## Overview

Arduino boards (like Arduino UNO, Nano) contain built-in hardware support for I2C communication.

SDA (A4) → Serial Data Line

SCL (A5) → Serial Clock Line

These pins allow Arduino to communicate with sensors, displays, EEPROMs, and even other Arduino boards.

## Role in I2C Communication

One Arduino acts as the Master

Another Arduino acts as the Slave

Master initiates communication and sends commands/data

Slave waits for Master request and responds accordingly
This allows smooth data transfer in multi-device systems.

# I2C Protocol in Embedded Systems
## Key Characteristics

Two-wire protocol (SDA + SCL)

Supports multiple slave devices

Each slave has a unique 7-bit or 10-bit address

Synchronous communication (clock provided by master)

Reliable data transfer using ACK/NACK signals

## Advantages

Uses very few pins

Ideal for communication between microcontrollers

Supports multiple devices on the same bus

Low power consumption

# I2C Components
## Master

Controls clock signal

Initiates communication

Decides when to read/write

## Slave

Responds to Master

Identified using unique address

## SDA (Data Line)

Carries data between devices.

## SCL (Clock Line)

Synchronizes data transfer.

# Example Workflow

Master starts communication

Sends slave address

Sends data or requests data

Slave receives or sends data

Communication ends

# Master–Slave Data Exchange Simulation

Two Arduino boards are connected:

Master Arduino → Sends data periodically (e.g., “Hello Slave”)

Slave Arduino → Listens to its address and prints received data

## Data Flow

Master Arduino → I2C Bus (SDA/SCL) → Slave Arduino

## How Communication Happens

Both boards share common ground

SDA lines are connected together

SCL lines are connected together

Master sends bytes

Slave reads them using interrupt-based I2C receive events

## Applications

Multi-controller projects

Robotics (main controller + sensor controllers)

Industrial communication networks

Smart home automation

# I2C vs UART vs SPI (Why I2C is used)
| Feature              | UART                 | SPI                    | I2C                                 |
| -------------------- | -------------------- | ---------------------- | ----------------------------------- |
| Number of Wires      | 2                    | 4+                     | 2                                   |
| Multi-device Support | No                   | Limited                | Excellent                           |
| Speed                | Medium               | Fast                   | Medium                              |
| Complexity           | Low                  | High                   | Medium                              |
| Usage                | Serial communication | High-speed peripherals | Sensor networks, controller linking |


I2C is chosen because it provides multi-slave communication with minimal wiring.


## Simulation Features

Real-time SDA/SCL signal visualization

Multiple device communication

Live serial monitor output

Master–Slave address matching

Smooth debugging of communication errors

## Benefits

No physical hardware required

Easy code testing

Safe environment for beginners

Accurate emulation of bus timing

# Experiment Environment

The simulation environment allows:

Creating two virtual Arduino boards

Linking SDA and SCL lines

Setting one as Master and other as Slave

Monitoring data exchange in real-time

Debugging I2C events

This makes it highly useful for learning inter-device communication.