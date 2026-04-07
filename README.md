# Natural Disaster Early Prediction and Response System

An integrated embedded and mobile platform for real-time environmental monitoring, early warning, and emergency communication, developed for ICAMES 2026.

---

## Project Overview

This project focuses on detecting early signs of natural hazards, with a primary emphasis on landslides. The system combines distributed embedded sensor nodes with a mobile application to create a complete monitoring and response solution.

The goal is to provide a compact, energy-efficient, and affordable system that continuously monitors environmental conditions, analyzes risk levels, alerts users in time, and enables direct emergency communication.

---

## Embedded System

The embedded system is built around the ESP32 microcontroller, which acts as the central unit for collecting, processing, and transmitting sensor data.

### Hardware Components

- ESP32 microcontroller
- BMP280 (pressure sensor)
- DHT22 (temperature and humidity)
- Soil moisture sensor
- Vibration sensor (SW-420)
- MPU6050 (accelerometer and gyroscope)
- OLED display (SSD1306)
- LED indicators (Safe / Warning / Danger)
- DFPlayer Mini (audio alert system)
- Firebase (data synchronization - optional)

### Functionality

The system continuously monitors environmental parameters relevant to landslides:

- soil moisture
- vibration intensity
- acceleration changes
- temperature and pressure

Sensor data is normalized and processed using a weighted risk algorithm:

risk = (soil × 0.3) + (vibration × 0.25) + (acceleration × 0.25) + (weather × 0.2)

Based on the calculated value, the system switches between:

- Safe state
- Warning state
- Danger state

### Alert System

Depending on the risk level:

- LEDs indicate current status
- OLED displays sensor data and system state
- DFPlayer triggers audio alarm in critical situations
- Data is sent to the mobile application

### Power Management

The system is designed for autonomous outdoor deployment:

- 18650 Li-Ion battery
- TP4056 charging module
- Solar panel support
- Boost converter (stable voltage output)

ESP32 uses deep sleep modes to optimize power consumption depending on the risk level.

---

## Mobile Application

The mobile application serves as the main interface between the system and the user.

### Main Features

#### Early Warning Module
Displays real-time risk levels and environmental data.

#### Field Map Visualization
Shows monitored areas with color-coded risk zones.

#### Device Connectivity
Displays device status, sensor values, and battery level.

#### SOS Emergency System
Allows users to send emergency alerts with location and status.

#### Education Module
Provides guidance on how to act before, during, and after a landslide.

#### System Response Overview
Displays alerts, affected users, and emergency response activity.

---

## System Architecture

The project follows an end-to-end architecture:

Sensors → ESP32 → Data Processing → Wireless Communication → Mobile App → User

This enables:

- real-time monitoring
- fast alert delivery
- scalability
- low-cost deployment
- future expansion (floods, earthquakes, wildfires)

---

## Current Status

- Embedded system prototype developed
- Sensor integration completed
- Risk calculation implemented
- Mobile app structure initialized (Expo)
- Communication between device and app in progress

---

## Future Development

- Full Firebase integration
- Real-time cloud dashboard
- Improved energy efficiency with solar optimization
- Enhanced risk prediction models
- Expansion to multiple hazard types

---

## Team

- Ibrahim Čustović — Project Lead & Embedded Systems Engineer  
- Merima Prcanović — Mobile Application Designer & Presentation Lead  
- Davud Sadikaj — Electronics & Power Systems Engineer  
- Lejla Kukuruzović — System Integration Engineer  

---

## License

This project is developed for academic and competition purposes (ICAMES 2026).hub.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
