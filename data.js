// TESMUN XXII — Complete Data Model
const TESMUN_DATA = {
    about: {
        mission: "The mission of TESMUN XXII is to shape curious, critical and inquisitive delegates who refuse to settle for easy or mediocre answers and who understand that real change demands analysis, empathy, and determination. The model seeks to cultivate individuals driven by knowledge and purpose, capable of giving meaning to every action they take and committed to the world as positive, ethical leaders. This mission is achieved through an innovative model that honors its legacy while embracing educational transformation, maintaining quality and tradition as it challenges conventional frameworks. TESMUN XXII is an experience designed to inspire leadership, promote peace through multiple perspectives, and empower delegates to question, debate with purpose, and transform reality through the power of words.",
        vision: "The vision of TESMUN XXII is to consolidate itself as a globally minded model that forms citizens of the world: delegates who are conscious of their role in an interconnected society and prepared to engage with complex global realities. This edition aspires to broaden perspectives by bringing visibility to overlooked and underrepresented issues that often remain outside mainstream international debate, encouraging delegates to look beyond the obvious and engage with the deeper roots of global challenges. TESMUN XXII envisions a generation of young leaders who think critically, act responsibly, and understand that global citizenship requires awareness, empathy, and a commitment to meaningful change."
    },
    levels: [
        { id: "bootcamp", name: "Bootcamp", icon: "school" },
        { id: "junior", name: "Junior", icon: "star_rate" },
        { id: "intermediate", name: "Intermediate", icon: "trending_up" },
        { id: "senior", name: "Senior", icon: "psychology" },
        { id: "expert", name: "Expert", icon: "verified" }
    ],
    committees: {
        bootcamp: [
            {
                id: "unicef", name: "UNICEF", lang: "English",
                description: "United Nations Children\u2019s Fund \u2013 Primary committee for introductory delegates.",
                icon: "child_care",
                chairs: [
                    { name: "Sara De Castro", school: "The English School", img: "assets/chairs/chair_06.png" },
                    { name: "Mariana Serna", school: "The English School" },
                    { name: "Adelaida Del Río", school: "Colegio Marymount" }
                ],
                topics: [
                    { label: "A", title: "Safeguarding Children Amid Protracted Humanitarian Crises: The Case of the Russian\u2013Ukrainian Conflict.", icon: "child_care" },
                    { label: "B", title: "Ensuring Every Child\u2019s Right to a Nationality: The Situation of Stateless Rohingya Children in Myanmar.", icon: "public_off" }
                ]
            }
        ],
        junior: [
            {
                id: "unesco", name: "UNESCO", lang: "Espa\u00f1ol",
                description: "Organizaci\u00f3n de las Naciones Unidas para la Educaci\u00f3n, la Ciencia y la Cultura.",
                icon: "menu_book",
                chairs: [
                    { name: "Ana Sof\u00eda Rivera", school: "The English School", img: "assets/chairs/chair_01.png" },
                    { name: "Danna Sofia S\u00e1nchez", school: "Colegio San Viator" },
                    { name: "Sebastian Padilla", school: "The English School", img: "assets/chairs/chair_14.png" }
                ],
                topics: [
                    { label: "A", title: "La Globalizaci\u00f3n Cultural y la Homogeneizaci\u00f3n de la Juventud: \u00bfP\u00e9rdida de identidad o intercambio cultural positivo?", icon: "language" },
                    { label: "B", title: "La desinformaci\u00f3n en redes sociales durante conflictos armados y su impacto en la polarizaci\u00f3n ideol\u00f3gica.", icon: "share" }
                ]
            },
            {
                id: "fia", name: "FIA: Formula 1", lang: "English",
                description: "F\u00e9d\u00e9ration Internationale de l\u2019Automobile \u2013 Formula 1 Commission.",
                icon: "speed",
                chairs: [
                    { name: "Santiago Escobar", school: "The English School", img: "assets/chairs/chair_08.png" },
                    { name: "Martin Alexander Duarte", school: "Colegio Biling\u00fce Buckingham" },
                    { name: "Samuel Guerra", school: "The English School", img: "assets/chairs/chair_07.png" }
                ],
                topics: [
                    { label: "A", title: "Advancing Environmental Sustainability within the Framework of Formula 1 Operations.", icon: "eco" },
                    { label: "B", title: "Global Safety and Technological Regulation in High-Speed Motorsport: Lessons from Ayrton Senna\u2019s Death.", icon: "health_and_safety" }
                ]
            },
            {
                id: "onumujeres", name: "ONU Mujeres", lang: "Espa\u00f1ol",
                description: "Entidad de las Naciones Unidas para la Igualdad de G\u00e9nero y el Empoderamiento de las Mujeres.",
                icon: "female",
                chairs: [
                    { name: "Mariana Blanco", school: "The English School", img: "assets/chairs/chair_05.png" },
                    { name: "Sof\u00eda Montserrat Herrera", school: "The English School", img: "assets/chairs/chair_11.png" },
                    { name: "Natalia Maz", school: "Colegio Colombo Gales" }
                ],
                topics: [
                    { label: "A", title: "Intensificaci\u00f3n del combate contra el matrimonio infantil y forzado.", icon: "shield" },
                    { label: "B", title: "El rol de las mujeres en la construcci\u00f3n de la paz en Colombia: Eficacia internacional del enfoque de g\u00e9nero en la reincorporaci\u00f3n de mujeres excombatientes. Caso de estudio: ETCR de Agua Bonita (Caquet\u00e1).", icon: "diversity_3" }
                ]
            },
            {
                id: "who", name: "WHO", lang: "English",
                description: "World Health Organization \u2013 Directing and coordinating international health.",
                icon: "local_hospital",
                chairs: [
                    { name: "Gabriela Valbuena", school: "The English School", img: "assets/chairs/chair_03.png" },
                    { name: "Alejandro Guzman", school: "The English School", img: "assets/chairs/chair_12.png" },
                    { name: "Sara Barbosa", school: "Colegio Marymount" }
                ],
                topics: [
                    { label: "A", title: "Snakebite Envenoming as a Neglected Tropical Disease. Case study: Treatment Scarcity and Antivenom Shortages in Rural Eswatini.", icon: "vaccines" },
                    { label: "B", title: "The Impact of Private Health Care Systems on Universal Access to Medical Services. Case Study: The United States Health System.", icon: "medical_services" }
                ]
            }
        ],
        intermediate: [
            {
                id: "unhcr", name: "UNHCR", lang: "English",
                description: "United Nations High Commissioner for Refugees.",
                icon: "home_work",
                chairs: [
                    { name: "Juan Felipe Berrocal", school: "The English School" },
                    { name: "Enrique Chavez", school: "The English School", img: "assets/chairs/chair_13.png" },
                    { name: "Valentina Castellanos", school: "Saint Matthew School" }
                ],
                topics: [
                    { label: "A", title: "Preserving the Cultural Identity of Syrian Refugees in Turkey: Integration versus Assimilation.", icon: "groups" },
                    { label: "B", title: "Humanitarian Crisis in the Gaza Strip: Displacement and the Right of Return.", icon: "crisis_alert" }
                ]
            },
            {
                id: "filosofico", name: "Filos\u00f3fico", lang: "Espa\u00f1ol",
                description: "Comit\u00e9 de Debate Filos\u00f3fico.",
                icon: "psychology_alt",
                chairs: [
                    { name: "Juan Andr\u00e9s Montero", school: "Gimnasio Vermont" },
                    { name: "Geronimo Martinez", school: "Colegio Cristo Rey Bogot\u00e1" }
                ],
                topics: [
                    { label: "A", title: "Ambientes humanos modernos y cautiverio psicol\u00f3gico: \u00bfse parecen nuestros trastornos mentales a la zoocosis en animales?", icon: "neurology" },
                    { label: "B", title: "\u00bfPuede existir una identidad global?", icon: "public" }
                ]
            },
            {
                id: "ga", name: "General Assembly", lang: "English",
                description: "United Nations General Assembly \u2013 Main deliberative body.",
                icon: "account_balance",
                chairs: [
                    { name: "Sof\u00eda Casas", school: "The English School", img: "assets/chairs/chair_10.png" },
                    { name: "Lorenzo Londo\u00f1o", school: "Colegio Hacienda Los Alcaparros" },
                    { name: "Simon Iriondo", school: "The English School", img: "assets/chairs/chair_09.png" }
                ],
                topics: [
                    { label: "Main", title: "Reform to the Security Council.", icon: "gavel" },
                    { label: "Sub-1", title: "Ensuring the Security Council\u2019s Accountability and Legitimacy in Global Decision-Making.", icon: "balance" },
                    { label: "Sub-2", title: "The Democratization of the Security Council.", icon: "how_to_vote" }
                ]
            },
            {
                id: "brics", name: "BRICS", lang: "English",
                description: "Brazil, Russia, India, China, South Africa \u2013 Intergovernmental forum.",
                icon: "handshake",
                chairs: [
                    { name: "Miranda Muriel", school: "The English School" },
                    { name: "C\u00e9sar Diaz", school: "The English School", img: "assets/chairs/chair_02.png" },
                    { name: "Emiliano Monta\u00f1ez", school: "Colegio Hacienda Los Alcaparros" }
                ],
                topics: [
                    { label: "A", title: "De-dollarization in International Trade and Its Impact on the Global Financial System.", icon: "currency_exchange" },
                    { label: "B", title: "The possible creation of a BRICS agricultural bloc and its implications for global food security and market competition.", icon: "agriculture" }
                ]
            }
        ],
        senior: [
            {
                id: "gac", name: "GAC", lang: "English", crisis: true,
                description: "General Assembly Crisis \u2013 Book 3: Fire. Final Invasion.",
                icon: "local_fire_department",
                chairs: [
                    { name: "Santiago Lucas Pineda", school: "Gimnasio Los Cerros", faction: 1 },
                    { name: "Martin Pardo", school: "Gimnasio Los Cerros", faction: 1 },
                    { name: "Nicol\u00e1s Mesa Dur\u00e1n", school: "The Victoria School", faction: 1 },
                    { name: "Samuel Martinez", school: "Colegio San Carlos", faction: 2 },
                    { name: "Samanta Duque", school: "Colegio Santa Francisca Romana", faction: 2 },
                    { name: "Juan Pablo Perdomo", school: "Colegio San Carlos", faction: 2 }
                ],
                topics: [
                    { label: "Crisis", title: "Book 3: Fire. Final Invasion.", icon: "local_fire_department" }
                ]
            },
            {
                id: "sclac", name: "SCLAC", lang: "English", crisis: true,
                description: "Superior Court of Los Angeles County \u2013 Crisis Court.",
                icon: "gavel",
                chairs: [
                    { name: "Matilde Silva", school: "Colegio La Colina" },
                    { name: "Catalina Bohorquez", school: "The English School" },
                    { name: "Juan David Ramirez", school: "Metropolitan School of Panama" }
                ],
                topics: [
                    { label: "Case", title: "Judicial Examination of the Men\u00e9ndez Brothers Case.", icon: "gavel" }
                ]
            },
            {
                id: "senado", name: "Senado Hist\u00f3rico", lang: "Espa\u00f1ol", crisis: true,
                description: "Senado Hist\u00f3rico de Colombia \u2013 Crisis en Espa\u00f1ol.",
                icon: "history_edu",
                chairs: [
                    { name: "Mariana Villamil", school: "Colegio San Bartolom\u00e9 La Merced" },
                    { name: "Geronimo Benjumea", school: "Colegio San Carlos" },
                    { name: "Manuela Camargo", school: "Colegio Santa Francisca Romana" }
                ],
                topics: [
                    { label: "A", title: "Espionaje y persecuci\u00f3n pol\u00edtica del DAS (2002\u20132010).", icon: "visibility" },
                    { label: "B", title: "Proceso de paz \u201cEl Cagu\u00e1n\u201d (1998\u20132002).", icon: "handshake" }
                ]
            }
        ],
        expert: [
            {
                id: "security-council", name: "Security Council", lang: "English", crisis: true,
                description: "United Nations Security Council \u2013 Expert-level Crisis Committee.",
                icon: "shield",
                chairs: [
                    { name: "Maria Alejandra Espinosa", school: "The English School" },
                    { name: "Lucas V\u00e1squez", school: "Colegio Biling\u00fce Buckingham" },
                    { name: "Manuela Camargo", school: "Colegio Santa Francisca Romana" }
                ],
                topics: [
                    { label: "A", title: "Humanitarian Crisis in the Republic of Sudan.", icon: "crisis_alert" },
                    { label: "B", title: "Examination of the Humanitarian and Security Consequences of the \u201cAlligator Alcatraz\u201d Migrant Detention Facility in Southern Florida.", icon: "domain_disabled" }
                ]
            }
        ]
    },
    schedule: [
        {
            day: 1, weekday: "Wednesday", location: "The English School",
            events: [
                { time: "8:00 AM \u2013 4:00 PM", title: "Entry to Facilities", icon: "login" },
                { time: "4:30 PM \u2013 5:30 PM", title: "Opening Ceremony", icon: "celebration" },
                { time: "5:30 PM \u2013 6:00 PM", title: "Departure", icon: "logout" }
            ]
        },
        {
            day: 2, weekday: "Thursday", location: "Universidad de La Sabana",
            events: [
                { time: "8:00 AM", title: "Arrival", icon: "flight_land" },
                { time: "9:00 AM \u2013 9:40 AM", title: "Registration", icon: "how_to_reg" },
                { time: "9:50 AM \u2013 12:00 PM", title: "First Session", icon: "groups" },
                { time: "12:00 PM \u2013 1:00 PM", title: "Lunch", icon: "restaurant" },
                { time: "1:00 PM \u2013 3:00 PM", title: "Second Session", icon: "groups" },
                { time: "3:00 PM \u2013 4:00 PM", title: "Break / Snack", icon: "coffee" },
                { time: "4:30 PM \u2013 5:00 PM", title: "Departure", icon: "logout" }
            ]
        },
        {
            day: 3, weekday: "Friday", location: "Universidad de La Sabana",
            events: [
                { time: "8:00 AM", title: "Arrival", icon: "flight_land" },
                { time: "8:40 AM \u2013 10:30 AM", title: "First Session", icon: "groups" },
                { time: "10:30 AM \u2013 11:00 AM", title: "Break", icon: "coffee" },
                { time: "11:00 AM \u2013 1:00 PM", title: "Second Session", icon: "groups" },
                { time: "1:00 PM \u2013 2:00 PM", title: "Lunch", icon: "restaurant" },
                { time: "2:00 PM \u2013 4:00 PM", title: "Third Session", icon: "groups" },
                { time: "4:00 PM \u2013 4:30 PM", title: "Snack", icon: "coffee" },
                { time: "4:30 PM \u2013 5:00 PM", title: "Departure", icon: "logout" }
            ]
        },
        {
            day: 4, weekday: "Saturday", location: "The English School",
            events: [
                { time: "8:00 AM", title: "Entry", icon: "login" },
                { time: "8:50 AM \u2013 10:00 AM", title: "First Session", icon: "groups" },
                { time: "10:00 AM \u2013 10:30 AM", title: "Break", icon: "coffee" },
                { time: "10:30 AM \u2013 12:00 PM", title: "Second Session", icon: "groups" },
                { time: "12:00 PM \u2013 1:00 PM", title: "Lunch", icon: "restaurant" },
                { time: "1:00 PM \u2013 2:00 PM", title: "Closing Ceremony", icon: "emoji_events" },
                { time: "2:00 PM \u2013 3:00 PM", title: "General Departure", icon: "logout" }
            ]
        }
    ]
};
