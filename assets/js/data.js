/**
 * SiliconCraft — Central Data Store & LocalStorage Persistence
 * Shared across all public and admin pages.
 * Supports static hosting with zero backend server required.
 */

const STORAGE_KEY = 'siliconcraft_v2_store';

const SEED_DATA = {
  currentUser: {
    id: 'usr_arjun',
    name: 'Arjun Mehta',
    username: 'arjun_embedded',
    role: 'member', // 'visitor' | 'member' | 'admin'
    title: 'ECE Student | Aspiring Firmware Engineer',
    college: 'BMS College of Engineering, Bengaluru',
    bio: 'Learning low-level embedded software, ARM Cortex-M bare-metal C, and FreeRTOS. Currently building a CAN FD diagnostic tool on STM32G4.',
    skills: ['C (MISRA)', 'STM32', 'FreeRTOS', 'UART/SPI/I2C', 'CAN FD', 'KiCad'],
    completedSteps: ['fw_01', 'fw_02', 'fw_03'],
    bookmarks: ['art_01', 'int_01', 'proj_01']
  },

  domains: [
    {
      id: 'embedded-systems',
      name: 'Embedded Systems',
      icon: '⚡',
      tagline: 'Microcontrollers, firmware architecture, real-time control, and low-level C.',
      description: 'The foundation of low-power compute devices. From 8-bit to 32-bit ARM Cortex-M, learn register-level programming, interrupt handling, timers, and peripheral interfaces.',
      topics: ['Bare-Metal C', 'ARM Cortex-M Architecture', 'DMA & Interrupts', 'Linker Scripts & Startup Code', 'Debugging with SWD/JTAG'],
      tools: ['STM32CubeIDE', 'GDB/OpenOCD', 'Saleae Logic', 'SEGGER J-Link', 'Keil MDK'],
      beginnerGuide: 'Start by writing bare-metal register toggling on an STM32 Nucleo board without HAL libraries. Learn to inspect memory maps and write custom linker files.',
      resourceCount: 42
    },
    {
      id: 'firmware',
      name: 'Firmware Engineering',
      icon: '⚙️',
      tagline: 'Reliable, deterministic, safety-critical system software and RTOS.',
      description: 'Write robust, maintainable system software that controls physical hardware. Master FreeRTOS task scheduling, inter-task communication, mutexes, memory management, and bootloaders.',
      topics: ['FreeRTOS Internals', 'Priority Inversion & Mutexes', 'Custom Bootloaders', 'Firmware Over-The-Air (FOTA)', 'MISRA-C Compliance'],
      tools: ['FreeRTOS', 'Zephyr RTOS', 'CMake', 'Cppcheck', 'Unity/CMock'],
      beginnerGuide: 'Master FreeRTOS task prioritization, queues, and binary semaphores. Understand why you should never block inside an ISR.',
      resourceCount: 38
    },
    {
      id: 'embedded-linux',
      name: 'Embedded Linux',
      icon: '🐧',
      tagline: 'Kernel drivers, board support packages (BSP), Yocto, and system architecture.',
      description: 'Bring up custom Linux systems on ARM/MIPS/RISC-V SoCs. Learn Device Trees, writing character drivers, kernel modules, U-Boot, and building custom root filesystems with Yocto & Buildroot.',
      topics: ['Device Tree Overlays', 'Character Device Drivers', 'Yocto BitBake Recipes', 'U-Boot Bootloader', 'PREEMPT_RT Real-Time Patch'],
      tools: ['Yocto Project', 'Buildroot', 'QEMU ARM', 'Wireshark', 'ftrace / perf'],
      beginnerGuide: 'Spin up a BeagleBone Black or Raspberry Pi CM4. Cross-compile a simple "Hello Kernel" module and map an interrupt pin using Device Tree source (DTS).',
      resourceCount: 31
    },
    {
      id: 'electronics',
      name: 'Electronics & Circuits',
      icon: '🔌',
      tagline: 'Analog front-ends, power regulation, signal conditioning, and discrete design.',
      description: 'The physical backbone of technology. Master op-amps, buck/boost converters, filtering, impedance matching, transistor switching, and precision measurement.',
      topics: ['Op-Amp Filters', 'Switch-Mode Power Supplies (SMPS)', 'ADC Analog Front-Ends', 'ESD & Transient Protection', 'Crystal Oscillator Stability'],
      tools: ['LTspice', 'KiCad Eeschema', 'Digital Oscilloscope', 'Precision DMM', 'Function Generator'],
      beginnerGuide: 'Design and simulate an active Butterworth low-pass filter in LTspice before building it on a breadboard and measuring frequency response.',
      resourceCount: 29
    },
    {
      id: 'vlsi',
      name: 'VLSI & Chip Design',
      icon: '🔲',
      tagline: 'ASIC/FPGA design, SystemVerilog, UVM verification, and physical synthesis.',
      description: 'Design and verify millions of logic gates. From RTL coding to synthesis, Static Timing Analysis (STA), clock domain crossing (CDC), and physical design.',
      topics: ['SystemVerilog & UVM', 'Static Timing Analysis (Setup/Hold)', 'Clock Domain Crossing (CDC)', 'RISC-V Core Implementation', 'ASIC Synthesis & PnR'],
      tools: ['Synopsys Design Compiler', 'Cadence Innovus', 'ModelSim/Questa', 'Xilinx Vivado', 'Yosys Open EDA'],
      beginnerGuide: 'Implement an AXI4-Lite slave peripheral or a 5-stage pipelined RISC-V CPU core in SystemVerilog, verify it with testbenches in Vivado, and run timing simulation.',
      resourceCount: 47
    },
    {
      id: 'semiconductors',
      name: 'Semiconductor Manufacturing',
      icon: '🔬',
      tagline: 'Silicon fabrication, lithography, FinFET/GAAFET, packaging, and characterization.',
      description: 'Explore the fabrication plants (Fabs), wafer manufacturing, EUV lithography, chemical mechanical polishing (CMP), packaging (2.5D/3D Chiplets), and silicon yield analysis.',
      topics: ['EUV Lithography & 3nm Nodes', 'FinFET vs GAAFET Physics', 'Advanced Packaging & CoWoS', 'Silicon Wafer Doping & Etching', 'Defect Metrology & Yield'],
      tools: ['Sentaurus TCAD', 'KLA Metrology', 'Semiconductor Analytics', 'Yield Explorer'],
      beginnerGuide: 'Study solid-state device physics, understand the CMOS inverter transit delay equation, and follow how transistor gate dimensions scale below 5nm.',
      resourceCount: 26
    },
    {
      id: 'automotive',
      name: 'Automotive Electronics',
      icon: '🚗',
      tagline: 'CAN FD, AUTOSAR, ISO 26262 ASIL safety, ECUs, and EV battery management.',
      description: 'The mission-critical world of connected vehicles. Master in-vehicle networking (CAN FD, LIN, Automotive Ethernet), AUTOSAR Classic/Adaptive, and ISO 26262 functional safety.',
      topics: ['CAN FD Bit Timing & Arbitration', 'AUTOSAR BSW & RTE Layers', 'ISO 26262 ASIL-D Compliance', 'Unified Diagnostic Services (UDS)', 'BMS Cell Balancing'],
      tools: ['Vector CANoe / CANalyzer', 'Vector DaVinci', 'Kvaser Leaf', 'PCAN-USB', 'Matlab/Simulink'],
      beginnerGuide: 'Build a dual-node CAN bus network using two microcontrollers and CAN transceivers (MCP2551/TJA1050), send message frames, and inspect arbitration on a scope.',
      resourceCount: 34
    },
    {
      id: 'iot',
      name: 'IoT & Connected Systems',
      icon: '📡',
      tagline: 'Sensors, low-power RF, LoRaWAN, BLE, cellular IoT, and edge intelligence.',
      description: 'Bridge physical telemetry with cloud backends. Learn micro-amp sleep currents, antenna tuning, secure cryptographic boot, MQTT, CoAP, and edge ML.',
      topics: ['Sub-10uA Deep Sleep Strategies', 'LoRaWAN Protocol & ADR', 'BLE GATT Services & Advertising', 'Hardware Crypto & Secure Boot', 'MQTT/TLS Optimization'],
      tools: ['Nordic nRF Connect SDK', 'ESP-IDF', 'Wireshark BLE sniffer', 'Otii Arc Power Analyzer'],
      beginnerGuide: 'Measure the exact sleep current of an nRF52 or ESP32 using a shunt resistor or power analyzer. Optimize wake-up cycles to run on a CR2032 coin cell for 2 years.',
      resourceCount: 39
    },
    {
      id: 'pcb-hardware',
      name: 'Hardware & PCB Design',
      icon: '📐',
      tagline: 'Schematic capture, high-speed routing, stackups, signal integrity, and DFM.',
      description: 'Transform circuits into manufactured boards. Master 4-to-8 layer stackup design, controlled impedance differential pairs, power plane decoupling, and thermal management.',
      topics: ['Controlled Impedance & Microstrip', 'High-Speed USB/Ethernet Layout', 'Power Distribution Network (PDN)', 'EMI/EMC Shielding & Grounding', 'DFM & Assembly Rules'],
      tools: ['KiCad 8', 'Altium Designer', 'Saturn PCB Toolkit', 'JLCPCB/PCBWay CAM Viewers'],
      beginnerGuide: 'Design a 4-layer STM32 breakout board in KiCad with continuous ground planes, 90-ohm differential USB traces, and proper 100nF decoupling capacitors placed close to VDD pins.',
      resourceCount: 45
    }
  ],

  articles: [
    {
      id: 'art_01',
      title: 'How Engineers Actually Enter Automotive R&D in India',
      category: 'Automotive',
      readingTime: '8 min read',
      author: 'Vikramaditya Rao (ECU Lead @ Bosch)',
      date: 'Nov 2026',
      description: 'The real-world skill gaps between textbook automotive theory and what tier-1 suppliers expect in CAN FD, AUTOSAR, and ISO 26262 safety certification.',
      content: `Automotive electronics has undergone the most radical transformation in its history over the past decade. Ten years ago, an entry-level test engineer worked primarily with isolated 16-bit microcontrollers running CAN at 500 kbps.\n\nToday, modern Software-Defined Vehicles (SDVs) feature high-performance compute clusters running dual-core ARM Cortex-A with PREEMPT_RT Linux alongside Cortex-R lockstep safety cores. To break into this industry, candidates must demonstrate hands-on familiarity with CAN FD bit timing, diagnostic stacks (UDS/OBD-II), and why safety-critical design prohibits dynamic heap allocation.`
    },
    {
      id: 'art_02',
      title: 'What Freshers Should Know Before Starting Embedded Systems',
      category: 'Embedded',
      readingTime: '10 min read',
      author: 'Ananya Sen (Staff Firmware Architect @ TI)',
      date: 'Nov 2026',
      description: 'Why relying on Arduino libraries creates a false sense of security, how compilers optimize memory access, and what happens when hardware interrupts trigger.',
      content: `The most common rejection reason in firmware interviews is the inability to explain what happens beneath library wrappers. When a student writes 'digitalWrite(13, HIGH)', they never see the peripheral clock gate, the bus matrix latency, or the Atomic Bit Set/Reset Register (BSRR).\n\nIf you want to be taken seriously as an embedded engineer, spend 3 months writing bare-metal C without HAL. Learn linker scripts, inspect assembly listings with objdump, and learn how to trigger a digital logic analyzer.`
    },
    {
      id: 'art_03',
      title: 'From ECE to Semiconductor Engineering: Closing the Gap',
      category: 'Semiconductor',
      readingTime: '9 min read',
      author: 'Dr. Rajesh Ramanathan (Principal Silicon Architect)',
      date: 'Oct 2026',
      description: 'The domestic semiconductor boom in India, why verification is 70% of hiring, and how open-source silicon tools like SkyWater 130nm are democratizing chip design.',
      content: `With the India Semiconductor Mission (ISM) funding commercial fabs and packaging plants, domestic hiring for digital IC design and verification has reached an all-time peak.\n\nStudents who master SystemVerilog OOP, constrained-random testbenches, and functional coverage in UVM stand out in the top 1% of applicants.`
    }
  ],

  interviews: [
    {
      id: 'int_01',
      title: 'What We Actually Look For In Embedded Freshers: Moving Beyond Arduino to Bare-Metal STM32',
      expertName: 'Ananya Sen',
      expertRole: 'Staff Firmware Architect',
      expertCompany: 'Texas Instruments',
      expertAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      expertBio: '14+ years designing high-reliability firmware for industrial sensory nodes and motor controllers. Mentored 150+ engineers across India and Germany.',
      domain: 'firmware',
      readingTime: '12 min read',
      publishedDate: 'Nov 2026',
      summary: 'A candid conversation about why Arduino projects get filtered out of top semiconductor resumes, what true low-level understanding means in interview rooms, and how to write production-grade C.',
      keyTakeaways: [
        'Stop relying on library abstraction: In interviews, you will be asked to explain what happens inside registers when a peripheral clock is enabled.',
        'Master memory maps and pointer arithmetic: 80% of freshers fail basic questions about volatile, const pointers, and memory alignment.',
        'Build one deep project over ten surface-level ones: A single verified sensor logger with FreeRTOS, DMA, and power profiling beats five copy-pasted Arduino demos.',
        'Learn how to use a Logic Analyzer and GDB: Knowing how to trigger on an I2C NACK or trace a hard fault handler proves you can debug hardware.',
        'Write clean, defensive code: Industry code must handle bus timeouts, CRC failures, and memory starvation gracefully without hanging.'
      ],
      sections: [
        {
          title: 'Their Journey',
          question: 'How did you transition from an ECE student in Bengaluru to leading firmware teams at TI?',
          answer: 'I started like most students: confused by theoretical signal processing and memorizing transistor equations. The turning point was when my professor handed me an 8051 board and asked me to write an assembly routine to drive an LCD without libraries. When the first character showed up, I was hooked. In my career at TI, I realized that true engineering is knowing the exact electrical boundary where software turns into physical voltage transitions.',
          quote: 'True engineering is knowing the exact electrical boundary where software turns into physical voltage transitions.'
        },
        {
          title: 'Industry Expectations',
          question: 'When freshers interview for firmware positions, where do most of them stumble?',
          answer: 'The single biggest filter is the keyword "volatile". We ask candidates: "What does volatile uint32_t *p do? When will the compiler optimize away a memory read?" 70% stumble. Another common failure is debugging. When I ask: "Your I2C bus hangs at line 142. What are the first three things you check with an oscilloscope?", candidates who only did Arduino say "I restart the board". Candidates who understand hardware say: "I inspect SDA/SCL pull-up levels, check if a slave is holding SDA low, and test the clock frequency."',
          quote: 'Interviewers look for debugging methodology, not memorized syntax.'
        },
        {
          title: 'Advice for Students',
          question: 'What final message would you give to engineers overwhelmed by the breadth of embedded systems?',
          answer: 'Do not try to learn everything at once. Silicon does not change fundamental physical laws every 6 months like web frameworks do. An I2C bus or an interrupt vector table you master today will still be relevant 15 years from now. Be patient, write code, probe the pins, and celebrate when your LED blinks via your own timer register setup.'
        }
      ]
    },
    {
      id: 'int_02',
      title: 'Silicon Architecture & Verification: How 3nm Chips Are Tested Before Hitting the Fab',
      expertName: 'Dr. Rajesh Ramanathan',
      expertRole: 'Principal Silicon Architect',
      expertCompany: 'Qualcomm / Ex-Intel',
      expertAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      expertBio: '20+ years in ASIC design, microprocessor pipeline design, and SystemVerilog UVM verification. Holds 9 patents in on-chip interconnects and cache coherence protocols.',
      domain: 'vlsi',
      readingTime: '15 min read',
      publishedDate: 'Nov 2026',
      summary: 'A deep-dive into the realities of modern VLSI engineering in India, the rise of RISC-V, why verification engineers are in higher demand than RTL designers, and how to master STA.',
      keyTakeaways: [
        'Verification is 70% of the VLSI industry: There are roughly 3 verification engineers for every RTL designer in modern SoC teams.',
        'Master SystemVerilog OOP and UVM: Basic Verilog is necessary, but testbench architecture is where hiring happens.',
        'Static Timing Analysis (STA) is non-negotiable: You must understand setup time, hold time, clock jitter, and clock skew at a transistor level.',
        'India is entering a golden era for semiconductor design with the India Semiconductor Mission (ISM).'
      ],
      sections: [
        {
          title: 'Industry Expectations',
          question: 'Why are verification engineers in such high demand compared to RTL designers?',
          answer: 'Because a single silicon spin on a 3nm node costs upwards of $30 Million! If a hardware bug slips through to the fab, the company loses tens of millions and misses product market windows. Verification teams build constrained-random testbenches to prove mathematical correctness.',
          quote: 'When you hold a microchip with billions of transistors in sub-nanosecond synchronization, you understand the majesty of hardware.'
        }
      ]
    }
  ],

  roadmaps: [
    {
      id: 'firmware',
      title: 'Firmware Engineer Roadmap',
      domain: 'firmware',
      desc: 'The definitive path from C fundamentals and register maps to production RTOS and bare-metal debugging.',
      time: '6 to 9 Months (15 hrs/week)',
      stages: [
        {
          number: '01',
          title: 'Foundations & Low-Level C',
          steps: [
            { id: 'fw_01', title: 'Pointers, Volatile & Memory Maps', desc: 'Pointer arithmetic, struct padding (#pragma pack), volatile keyword, and memory-mapped register manipulation.' },
            { id: 'fw_02', title: 'ARM Cortex-M Architecture', desc: 'Registers (R0-R15), stack pointers (MSP/PSP), linker scripts (.ld), and startup Reset_Handler sequence.' }
          ]
        },
        {
          number: '02',
          title: 'Microcontroller Peripherals',
          steps: [
            { id: 'fw_03', title: 'Timers, Interrupts & NVIC', desc: 'Hardware timers, PWM generation, NVIC preemption priority, and writing non-blocking ISRs.' },
            { id: 'fw_04', title: 'Serial Protocols (UART, SPI, I2C)', desc: 'Clock polarity/phase, open-drain I2C bus arbitration, DMA circular transfers, and logic analyzer probing.' }
          ]
        },
        {
          number: '03',
          title: 'Real-Time Operating Systems (RTOS)',
          steps: [
            { id: 'fw_05', title: 'FreeRTOS Task Scheduling & Mutexes', desc: 'Context switching, queues, binary semaphores, and solving unbounded Priority Inversion with mutexes.' },
            { id: 'fw_06', title: 'Bootloaders & Field Firmware Updates', desc: 'Flash memory partitions, Vector Table relocation (VTOR), CRC32 verification, and UART/CAN bootloaders.' }
          ]
        }
      ]
    },
    {
      id: 'embedded-linux',
      title: 'Embedded Linux Engineer Roadmap',
      domain: 'embedded-linux',
      desc: 'Master the full Linux board bring-up stack: U-Boot bootloader, Device Tree, Kernel modules, and Yocto.',
      time: '8 to 12 Months',
      stages: [
        {
          number: '01',
          title: 'Linux Systems Programming',
          steps: [
            { id: 'el_01', title: 'POSIX File I/O & Sockets', desc: 'Multi-threading with pthreads, epoll event loops, and inter-process communication (IPC).' }
          ]
        },
        {
          number: '02',
          title: 'Bootloader & Device Tree',
          steps: [
            { id: 'el_02', title: 'U-Boot & Device Tree Source (.dts)', desc: 'Configuring U-Boot bootcmd, mapping hardware peripheral registers, and device tree overlays.' },
            { id: 'el_03', title: 'Writing Linux Kernel Drivers', desc: 'Character devices, platform drivers, request_threaded_irq, and sysfs debugging interfaces.' }
          ]
        },
        {
          number: '03',
          title: 'Build Systems & Yocto',
          steps: [
            { id: 'el_04', title: 'Yocto Project & Custom Layers', desc: 'BitBake recipes (.bb), custom meta-layers, systemd configuration, and creating minimal headless rootfs.' }
          ]
        }
      ]
    },
    {
      id: 'vlsi',
      title: 'VLSI & Digital ASIC Design Roadmap',
      domain: 'vlsi',
      desc: 'From synchronous digital logic and SystemVerilog to UVM verification and Static Timing Analysis (STA).',
      time: '9 to 12 Months',
      stages: [
        {
          number: '01',
          title: 'Digital Logic & SystemVerilog RTL',
          steps: [
            { id: 'vl_01', title: 'Synthesizable SystemVerilog & FSMs', desc: 'Blocking vs non-blocking rules, Mealy/Moore state machines, and clock domain crossing synchronizers.' }
          ]
        },
        {
          number: '02',
          title: 'Design Verification & UVM',
          steps: [
            { id: 'vl_02', title: 'Universal Verification Methodology (UVM)', desc: 'Constrained-random testbenches, functional coverage metrics, scoreboards, and TLM transactions.' }
          ]
        },
        {
          number: '03',
          title: 'Static Timing Analysis (STA)',
          steps: [
            { id: 'vl_03', title: 'Setup/Hold Slack & Timing Closure', desc: 'Setup and hold equations, SDC constraints, clock jitter/skew, and inserting pipeline stages to meet GHz timing.' }
          ]
        }
      ]
    }
  ],

  posts: [
    {
      id: 'post_01',
      type: 'question',
      title: 'Why is my UART DMA transmission dropping characters at 921600 baud on STM32F401?',
      author: 'Rahul Varma (Final Year ECE @ NIT Trichy)',
      content: 'I configured UART2 with DMA1 Stream 6 on STM32F401RE. At 115200 baud it works reliably, but at 921600 baud, 1 in every 30 packets has framing errors. Clock source is APB1 at 42 MHz. Is this baud prescaler fractional jitter?',
      domain: 'embedded-systems',
      likes: 18,
      status: 'published',
      time: '2 hours ago',
      solution: 'Set OVER8 = 1 in USART_CR1! Oversampling by 8 instead of 16 cuts your baud calculation error from 0.93% down to 0.16%, well within 2.5% tolerance. Also verify your USB-UART cable length is under 15cm at 1Mbps to avoid capacitive edge slew.'
    },
    {
      id: 'post_02',
      type: 'build_in_public',
      title: 'Day 14 of Learning STM32: Configured ADC1 with DMA in Circular Mode (Zero CPU Load!)',
      author: 'Arjun Mehta (ECE Student)',
      content: 'Previously I was doing blocking ADC polling in a while(1) loop which froze the CPU. Today I wired ADC1 with continuous scanning hooked to DMA2 in circular mode. Now the hardware dumps 100 samples straight into SRAM with 0 microseconds CPU overhead!',
      domain: 'embedded-systems',
      likes: 42,
      status: 'published',
      time: '5 hours ago'
    },
    {
      id: 'post_03',
      type: 'discussion',
      title: 'Priority Inversion in FreeRTOS: Mutexes vs Binary Semaphores Explained Simply',
      author: 'Kavita Iyer (Firmware Engineer @ Ather)',
      content: 'Always use Mutexes for resource locking (like protecting an I2C bus) instead of Binary Semaphores! Mutexes feature Priority Inheritance which temporarily raises the priority of the task holding the mutex to the highest waiting task, preventing unbounded delay.',
      domain: 'firmware',
      likes: 67,
      status: 'published',
      time: '1 day ago'
    }
  ],

  projects: [
    {
      id: 'proj_01',
      title: 'CAN FD Telemetry & Motor Controller Logger for Formula Student EV',
      creator: 'Arjun Mehta & Team',
      desc: 'Dual-channel CAN FD logging system sampling BMS and inverter metrics at 200 Hz with microsecond timestamps.',
      tech: ['STM32G474', 'CAN FD (5 Mbps)', 'FreeRTOS', 'FatFs', 'KiCad 8', 'C99'],
      hardware: ['STM32G474RE MCU @ 170MHz', 'Dual TCAN334G 3.3V CAN FD Transceivers', '4-Layer Impedance-Controlled PCB'],
      problem: 'Intermittent inverter shutdowns during track testing with no synchronized high-speed telemetry to correlate voltage dips and CAN error frames.',
      solution: 'Designed an isolated dual-bus hardware logger. Filtered CAN FD frames directly into a DMA ring buffer and streamed raw 512-byte blocks via 4-bit SDIO to industrial microSD.',
      github: 'https://github.com/arjun-embedded/canfd-telemetry-logger',
      likes: 128,
      status: 'published'
    },
    {
      id: 'proj_02',
      title: '32-Bit 5-Stage Pipelined RISC-V RV32I Processor in SystemVerilog',
      creator: 'Meera Nambiar (IIT Madras)',
      desc: 'Synthesizable RISC-V core with hazard detection, branch prediction, and AXI4-Lite memory bus interface running on Artix-7 FPGA.',
      tech: ['SystemVerilog', 'RISC-V (RV32I)', 'Xilinx Vivado', 'Artix-7 FPGA', 'UVM'],
      hardware: ['Digilent Basys 3 / Arty A7-35T FPGA Board'],
      problem: 'Most college labs only teach theoretical pipelines. Built a synthesizable core that executes real compiled C binaries from GCC.',
      solution: 'Implemented 5-stage classic RISC pipeline: Fetch, Decode, Execute, Memory, and Writeback with forwarding unit and branch prediction buffer.',
      github: 'https://github.com/meera-vlsi/rv32i-5stage-pipeline',
      likes: 215,
      status: 'published'
    },
    {
      id: 'proj_03',
      title: 'Ultra-Low-Power LoRaWAN Environmental Telemetry Node (Sub-4uA Sleep)',
      creator: 'Siddharth Nair (RVCE)',
      desc: 'Solar-harvesting IoT node monitoring forest soil moisture with 5-year battery life on a single primary lithium cell.',
      tech: ['STM32WL55', 'LoRaWAN 1.0.4', 'Nordic PPK2', 'Altium', 'C'],
      hardware: ['STM32WL55JC dual-core MCU', 'Sensirion SHT40', 'TI bq25570 MPPT charger'],
      problem: 'Remote sensors in Western Ghats depleted batteries in 2 months due to 15mA sleep currents. Reduced sleep current to 3.8 uA.',
      solution: 'Configured STM32WL55 in Standby mode with RTC wakeups. Switched unused GPIOs to Analog mode to eliminate floating pin leakage.',
      github: 'https://github.com/sid-iot/lorawan-forest-node',
      likes: 184,
      status: 'published'
    }
  ],

  opportunities: [
    {
      id: 'opp_01',
      title: 'Embedded Firmware Engineering Intern',
      org: 'Texas Instruments',
      type: 'Internship',
      location: 'Bengaluru (Hybrid)',
      deadline: '2026-12-15',
      link: 'https://careers.ti.com',
      eligibility: 'Pre-final & Final year B.Tech in ECE/EEE. Strong C programming and microcontroller fundamentals.'
    },
    {
      id: 'opp_02',
      title: 'Silicon Design Verification Engineer (Fresher)',
      org: 'Qualcomm',
      type: 'Fresher Job',
      location: 'Hyderabad / Bengaluru',
      deadline: '2026-12-20',
      link: 'https://qualcomm.com/careers',
      eligibility: 'Graduating 2026/2027 ECE/VLSI grads. Hands-on experience with SystemVerilog and digital logic.'
    },
    {
      id: 'opp_03',
      title: 'India Semiconductor Mission (ISM) RISC-V Challenge 2026',
      org: 'Ministry of Electronics & IT (MeitY)',
      type: 'Hackathon',
      location: 'All India / Virtual',
      deadline: '2026-12-30',
      link: 'https://semiconindia.gov.in',
      eligibility: 'Open to engineering students and early startups across India. Cash awards + prototyping fab grant.'
    }
  ]
};

// Data Store Manager
window.SiliconData = {
  get() {
    const local = localStorage.getItem(STORAGE_KEY);
    if (!local) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
      return JSON.parse(JSON.stringify(SEED_DATA));
    }
    try {
      return JSON.parse(local);
    } catch (e) {
      return JSON.parse(JSON.stringify(SEED_DATA));
    }
  },

  save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  resetDefaults() {
    localStorage.removeItem(STORAGE_KEY);
    return this.get();
  },

  reset() {
    return this.resetDefaults();
  }
};

