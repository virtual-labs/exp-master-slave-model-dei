## Procedure

1. Open the experiment in the virtual lab for establishing a master–slave model using the I2C protocol.  
   Two Arduino boards (Master and Slave) are already connected through SDA and SCL lines, along with power and ground.

2. Observe the circuit connections.  
   Check how the SDA and SCL pins of both Arduinos are connected.  
   Verify that a pushbutton is connected to the Master Arduino and an LED is connected to the Slave Arduino.

3. Open and review the Arduino codes.  
   Read the Master Arduino code to understand:  
   - Detecting the pushbutton press  
   - Sending an I2C command to the Slave Arduino  
   Read the Slave Arduino code to understand:  
   - Receiving data over I2C  
   - Turning the LED ON/OFF based on the Master command

4. Start the simulation.  
   Click the "Start Simulation" button.  
   Press the pushbutton on the Master Arduino in the simulation interface.

5. Observe the output on the Slave Arduino.  
   When the pushbutton is pressed, the Master sends a command via I2C.  
   The LED connected to the Slave Arduino turns ON based on the received I2C signal.

6. Record observations.  
   Note how pressing and releasing the pushbutton affects the LED status on the Slave Arduino.  
   Verify that communication occurs correctly through the I2C protocol.

7. Stop the simulation.  
   Click the "Stop Simulation" button after completing the experiment.
