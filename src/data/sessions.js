export const SESSIONS = [
  {
    "id": 1,
    "phase": 1,
    "type": "A",
    "name": "Piernas + Core — Activación y base",
    "intensity": "Medio",
    "duration": "65-75 min",
    "muscles": [
      "Cuádriceps",
      "Glúteo mayor/medio",
      "Isquiotibiales",
      "Pantorrillas",
      "Core"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata rápida o trote suave",
        "20 círculos de cadera (10 c/lado)",
        "15 sentadillas de activación sin peso",
        "10 puentes de glúteo lentos",
        "10 rotaciones de rodilla c/lado"
      ],
      "mobility": [
        "Movilidad tobillo: círculos + flexión (30 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)",
        "Desbloqueo psoas: rodilla en suelo, inclinación adelante (20 seg c/lado)"
      ],
      "mental": "Visualiza la sesión completa. El tren inferior es el motor del cuerpo. Cada rep construye la base de tu maratón."
    },
    "workout": {
      "blocks": [
        {
          "name": "Bloque 1 — Compound principal",
          "exercises": [
            {
              "id": "squat_goblet",
              "name": "Sentadilla goblet (mancuerna)",
              "muscle": "Cuádriceps, Glúteo",
              "equip": "Mancuerna",
              "sets": "3",
              "reps": "15",
              "rest": "90 seg",
              "notes": "Enfócate en la técnica. Rodillas siguen dirección de los pies.",
              "weight_guide": "Mancuerna ligera: 10-16 kg"
            },
            {
              "id": "rdl",
              "name": "Peso muerto rumano",
              "muscle": "Isquiotibiales, Glúteo mayor, Erectores",
              "equip": "Barra o mancuernas",
              "sets": "3",
              "reps": "12",
              "rest": "90 seg",
              "notes": "Cadera hacia atrás, espalda neutra. Siente el estiramiento del isquiotibial.",
              "weight_guide": "Mancuernas: 10-20 kg c/u"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 2 — Unilateral y glúteo",
          "exercises": [
            {
              "id": "lunge_walk",
              "name": "Estocada caminando",
              "muscle": "Cuádriceps, Glúteo, Isquiotibiales",
              "equip": "Mancuernas o peso corporal",
              "sets": "3",
              "reps": "10 c/pierna",
              "rest": "75 seg",
              "notes": "Tronco erguido, rodilla no pasa la punta del pie.",
              "weight_guide": "Peso corporal o mancuernas ligeras 5-8 kg"
            },
            {
              "id": "glute_bridge",
              "name": "Puente de glúteo (unilateral)",
              "muscle": "Glúteo mayor, Isquiotibiales",
              "equip": "Peso corporal",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "Aprieta el glúteo en el punto más alto. Baja lento (2 seg).",
              "weight_guide": "Peso corporal"
            },
            {
              "id": "abduction_machine",
              "name": "Abducción cadera (máquina)",
              "muscle": "Glúteo medio y menor, Abductores",
              "equip": "Máquina abducción",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "Controla el regreso. No dejes que la máquina te jale.",
              "weight_guide": "Carga inicial: 20-35 kg"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 3 — Pantorrillas y Core",
          "exercises": [
            {
              "id": "calf_unilateral",
              "name": "Elevación pantorrilla unilateral",
              "muscle": "Gastrocnemio, Sóleo",
              "equip": "Peso corporal + escalón",
              "sets": "3",
              "reps": "20",
              "rest": "45 seg",
              "notes": "Rango completo: baja hasta el talón toca el suelo.",
              "weight_guide": "Peso corporal (+mancuerna opcional)"
            },
            {
              "id": "plank",
              "name": "Plancha frontal",
              "muscle": "Transverso abdominal, Core completo",
              "equip": "Peso corporal",
              "sets": "3",
              "reps": "30 seg",
              "rest": "45 seg",
              "notes": "Glúteo apretado, ombligo adentro. Respira.",
              "weight_guide": "Progresión: 30 → 45 → 60 seg"
            },
            {
              "id": "dead_bug",
              "name": "Dead bug (bicho muerto)",
              "muscle": "Transverso, Core anti-extensión",
              "equip": "Peso corporal",
              "sets": "3",
              "reps": "8 c/lado",
              "rest": "45 seg",
              "notes": "Nunca despegues la zona lumbar del suelo.",
              "weight_guide": "Peso corporal"
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave para bajar FC",
        "Respiración: 4 inhala / 4 retén / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps de pie (40 seg c/lado)",
        "Isquiotibial con banda o toalla (40 seg c/lado)",
        "Paloma/figura 4 glúteo en suelo (45 seg c/lado)",
        "Aductor sentado pies juntos (30 seg)",
        "Pantorrilla contra pared (25 seg c/lado)",
        "Torsión espinal tumbado (30 seg c/lado)"
      ],
      "nutrition": "Ingiere proteína + carbohidrato en los 30-60 min siguientes (ej: batido de proteína + plátano, o arroz con pollo). Los carbohidratos post-piernas son esenciales para reponer glucógeno muscular.",
      "recovery": "Piernas: 48-72h de recuperación antes del próximo estímulo pesado de piernas. Si sientes DOMS (agujetas) intensas, camina suave y toma baño frío de pies."
    }
  },
  {
    "id": 2,
    "phase": 1,
    "type": "B",
    "name": "Pecho + Tríceps — Patrón de empuje horizontal",
    "intensity": "Medio",
    "duration": "60-70 min",
    "muscles": [
      "Pectoral mayor",
      "Pectoral menor",
      "Tríceps (3 cabezas)",
      "Deltoides anterior",
      "Serrato anterior"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta estática o elíptica",
        "20 círculos de hombros (adelante y atrás)",
        "15 aperturas de pecho con banda",
        "10 push-ups de rodilla lentos",
        "10 rotaciones de hombro con banda c/lado"
      ],
      "mobility": [
        "Apertura de pecho en marco de puerta (30 seg)",
        "Extensión de muñeca y antebrazo (20 seg c/lado)",
        "Rotación interna/externa de hombro (15 reps c/lado)"
      ],
      "mental": "El pecho y hombros definen tu postura. Cada press es una afirmación de fuerza. Activa el músculo desde el inicio, no solo mueves peso."
    },
    "workout": {
      "blocks": [
        {
          "name": "Bloque 1 — Press horizontal",
          "exercises": [
            {
              "id": "bench_flat",
              "name": "Press de banca plano (barra)",
              "muscle": "Pectoral mayor, Tríceps, Deltoides ant.",
              "equip": "Barra + banco",
              "sets": "4",
              "reps": "12",
              "rest": "90 seg",
              "notes": "Codos a 45° del tronco. Baja la barra al esternón bajo. Pecho arriba.",
              "weight_guide": "Barra: empieza con peso que puedas controlar x12 reps"
            },
            {
              "id": "db_press_incline",
              "name": "Press inclinado (mancuernas)",
              "muscle": "Pectoral mayor superior",
              "equip": "Mancuernas + banco inclinado",
              "sets": "3",
              "reps": "12",
              "rest": "90 seg",
              "notes": "Banco a 30°. No más: sobreactiva el hombro anterior.",
              "weight_guide": "Mancuernas: 60-70% del peso que usas en banca plana"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 2 — Aislamiento y fondos",
          "exercises": [
            {
              "id": "db_fly_flat",
              "name": "Apertura plana (mancuernas)",
              "muscle": "Pectoral mayor (estiramiento)",
              "equip": "Mancuernas + banco",
              "sets": "3",
              "reps": "14",
              "rest": "75 seg",
              "notes": "Codo ligeramente flexionado. Siente el estiramiento del pecho.",
              "weight_guide": "Mancuernas ligeras"
            },
            {
              "id": "dips_tricep",
              "name": "Fondos en banco (tríceps)",
              "muscle": "Tríceps",
              "equip": "Banco",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "Cuerpo vertical para énfasis tríceps. Si no puedes, usa banco.",
              "weight_guide": "Peso corporal → con peso si es fácil"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 3 — Tríceps aislado",
          "exercises": [
            {
              "id": "tricep_pushdown",
              "name": "Extensión tríceps (cuerda/cable)",
              "muscle": "Tríceps (3 cabezas)",
              "equip": "Cable + cuerda",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "Codos pegados al cuerpo. Extiende completamente.",
              "weight_guide": "Cable: peso moderado"
            },
            {
              "id": "overhead_ext_db",
              "name": "Extensión overhead (mancuerna)",
              "muscle": "Tríceps cabeza larga",
              "equip": "Mancuerna",
              "sets": "3",
              "reps": "14",
              "rest": "60 seg",
              "notes": "Cabeza larga del tríceps. Rango completo de movimiento.",
              "weight_guide": "1 mancuerna: 8-14 kg"
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata suave",
        "Respiración profunda: 5 respiraciones largas"
      ],
      "stretches": [
        "Estiramiento pecho en marco de puerta (30 seg, 3 ángulos: bajo/medio/alto)",
        "Tríceps sobre la cabeza (35 seg c/lado)",
        "Cruce de brazo (deltoides anterior, 25 seg c/lado)",
        "Extensión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Proteína en los 45 min siguientes. Si entrenaste en ayunas, prioriza fuente rápida (suero de leche). El pecho requiere entre 0.3-0.4 g/kg de proteína por sesión para síntesis óptima.",
      "recovery": "48h de descanso antes de volver a empujar pesado. Puedes hacer cardio suave o espalda al día siguiente sin problema."
    }
  },
  {
    "id": 3,
    "phase": 1,
    "type": "C",
    "name": "Espalda + Bíceps — Patrón de tirón vertical y horizontal",
    "intensity": "Medio",
    "duration": "65-75 min",
    "muscles": [
      "Dorsal ancho",
      "Redondo mayor",
      "Romboides",
      "Trapecio medio/inferior",
      "Erectores",
      "Bíceps braquial",
      "Braquiorradial"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min remo ergómetro suave",
        "15 retracciones escapulares con banda",
        "Colgarse de barra: 3 × 20 seg",
        "10 superman lentos en el suelo",
        "Rotación externa de hombro con banda: 15 reps c/lado"
      ],
      "mobility": [
        "Movilidad de hombro: círculos de brazo (20 c/dirección)",
        "Estiramiento de antebrazo dorsal (20 seg c/lado)",
        "Descompresión lumbar: colgado de barra 30 seg"
      ],
      "mental": "La espalda fuerte es el escudo del cuerpo. El 80% de los dolores lumbares se previenen con espalda fuerte. Cada jalón acerca tu objetivo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Bloque 1 — Jalones (tirón vertical)",
          "exercises": [
            {
              "id": "pulldown_wide",
              "name": "Jalón al pecho agarre ancho",
              "muscle": "Dorsal ancho, Redondo mayor",
              "equip": "Polea + barra ancha",
              "sets": "4",
              "reps": "12",
              "rest": "90 seg",
              "notes": "Pecho hacia la barra. Retrae las escápulas al bajar.",
              "weight_guide": "Cable: 60-70% de tu peso corporal"
            },
            {
              "id": "pulldown_neutral",
              "name": "Jalón agarre neutro",
              "muscle": "Dorsal ancho, Bíceps",
              "equip": "Polea + agarre neutro",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "Agarre neutro activa más bíceps y dorsal inferior.",
              "weight_guide": "Peso similar o ligeramente mayor"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 2 — Remos (tirón horizontal)",
          "exercises": [
            {
              "id": "row_bar",
              "name": "Remo con barra inclinado",
              "muscle": "Dorsal ancho, Romboides, Trapecio medio",
              "equip": "Barra",
              "sets": "3",
              "reps": "12",
              "rest": "90 seg",
              "notes": "Cuerpo a 45°. Jala el codo hacia la cadera, no hacia afuera.",
              "weight_guide": "Empieza con peso que mantengas la espalda plana"
            },
            {
              "id": "row_db",
              "name": "Remo mancuerna unilateral",
              "muscle": "Dorsal ancho, Romboide, Trapecio",
              "equip": "Mancuerna + banco",
              "sets": "3",
              "reps": "12 c/lado",
              "rest": "75 seg",
              "notes": "Apoyo en banco. Rotación leve del tronco al subir.",
              "weight_guide": "Mancuerna: 16-30 kg"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 3 — Trapecio y Bíceps",
          "exercises": [
            {
              "id": "facepull",
              "name": "Facepull con cuerda",
              "muscle": "Trapecio inferior, Deltoides post., Manguito",
              "equip": "Cable alto + cuerda",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "Al final del movimiento: rotación externa. Codos arriba.",
              "weight_guide": "Cable: peso ligero-moderado"
            },
            {
              "id": "curl_bar",
              "name": "Curl con barra recta o Z",
              "muscle": "Bíceps braquial",
              "equip": "Barra Z o recta",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "Sin balancear el cuerpo. Baja el peso en 2-3 seg.",
              "weight_guide": "Barra: 70-80% de lo que puedes levantar"
            },
            {
              "id": "curl_hammer",
              "name": "Curl martillo (mancuernas)",
              "muscle": "Braquiorradial, Braquial",
              "equip": "Mancuernas",
              "sets": "3",
              "reps": "12 c/lado",
              "rest": "60 seg",
              "notes": "Activa braquiorradial. Más funcional que el curl clásico.",
              "weight_guide": "Mancuerna"
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata o trote suave",
        "Colgado de barra: 30 seg (descompresión)",
        "Respiración profunda: 5 ciclos"
      ],
      "stretches": [
        "Estiramiento dorsal: brazo en alto con inclinación lateral (30 seg c/lado)",
        "Bíceps contra pared, palma arriba (25 seg c/lado)",
        "Gato-vaca en el suelo: 10 reps lentas",
        "Niño extendido con brazos al frente (45 seg)",
        "Extensión y flexión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Alta demanda proteica: la espalda es el grupo muscular más grande de la parte superior. Prioriza 30-40g de proteína en los 60 min post-entreno.",
      "recovery": "La espalda y bíceps se recuperan en 48-72h. Si sientes rigidez lumbar, aplica calor suave y haz movilidad de cadera al día siguiente."
    }
  },
  {
    "id": 4,
    "phase": 1,
    "type": "E",
    "name": "Cardio suave + Movilidad global — Recuperación activa",
    "intensity": "Bajo",
    "duration": "50-60 min",
    "muscles": [
      "Sistema cardiovascular",
      "Flexibilidad: cadera, columna, hombros, cadena posterior"
    ],
    "pre": {
      "hydration": "Bebe agua durante toda la sesión. Puedes hacerla en ayunas si prefieres: el cardio suave en ayunas es excelente para la oxidación de grasas.",
      "warmup": [
        "5 min caminata suave",
        "10 círculos de tobillo c/lado",
        "Extensiones de pantorrilla lentas: 20 reps",
        "Elevaciones de rodilla marchando: 30 seg"
      ],
      "mobility": [
        "Estiramiento dinámico de cuádriceps (10 c/lado)",
        "Estiramiento isquiotibial de pie (20 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)"
      ],
      "mental": "El cardio es una meditación en movimiento. Hoy no compites contra nadie. Solo construyes tu motor aeróbico ladrillo a ladrillo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Cardio aeróbico base",
          "exercises": [
            {
              "id": "treadmill_walk",
              "name": "Caminata rápida (cinta/parque)",
              "muscle": "Sistema cardiovascular",
              "equip": "Cinta / parque",
              "sets": "1",
              "reps": "20-25 min",
              "rest": "--",
              "notes": "Ritmo: puedes mantener una conversación. FC: 115-130 bpm.",
              "weight_guide": "Inclinación: 3-5% en cinta si quieres más intensidad"
            }
          ],
          "note": ""
        },
        {
          "name": "Movilidad articular (circuito)",
          "exercises": [
            {
              "id": "mobility_hip",
              "name": "Movilidad de cadera 90/90",
              "muscle": "Cápsula articular cadera, Glúteo",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "60 seg c/lado",
              "rest": "20 seg",
              "notes": "Transición lenta entre posiciones. Respira profundo.",
              "weight_guide": ""
            },
            {
              "id": "mobility_thoracic",
              "name": "Apertura torácica con rodillo",
              "muscle": "Columna torácica, Pectoral",
              "equip": "Foam roller",
              "sets": "2",
              "reps": "60 seg",
              "rest": "20 seg",
              "notes": "Vértebra por vértebra. Deja caer el peso hacia el suelo.",
              "weight_guide": "Foam roller"
            },
            {
              "id": "mobility_shoulder",
              "name": "Movilidad de hombro (péndulo + círculos)",
              "muscle": "Cápsula articular hombro",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "30 seg c/lado",
              "rest": "20 seg",
              "notes": "Rango amplio pero sin dolor.",
              "weight_guide": ""
            },
            {
              "id": "psoas_stretch",
              "name": "Estiramiento de psoas (estocada)",
              "muscle": "Psoas, Recto femoral",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "45 seg c/lado",
              "rest": "20 seg",
              "notes": "Cadera hacia adelante. Mantén el glúteo del lado trasero activo.",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata muy lenta",
        "Respiración controlada: 5 min sentado"
      ],
      "stretches": [
        "Psoas (estocada estática): 45 seg c/lado",
        "Piriforme/paloma en suelo: 45 seg c/lado",
        "Isquiotibiales con cinta: 40 seg c/lado",
        "Apertura de pecho en suelo (brazos en T): 60 seg",
        "Perro boca abajo: 45 seg",
        "Pose del niño: 60 seg",
        "Savasana / respiración consciente: 3 min"
      ],
      "nutrition": "El cardio quema glucógeno. Repón con carbohidratos en los 30 min siguientes si vas a entrenar mañana. Si es día de recuperación, puedes priorizar proteína y grasas buenas.",
      "recovery": "Hidratación post-cardio: repón electrolitos si sudaste mucho (agua con limón + pizca de sal). El cardio activa el sistema parasimpático si lo mantienes aeróbico."
    }
  },
  {
    "id": 5,
    "phase": 1,
    "type": "D",
    "name": "Hombros completos + Trapecio + Manguito rotador",
    "intensity": "Medio",
    "duration": "60-70 min",
    "muscles": [
      "Deltoides anterior/lateral/posterior",
      "Trapecio superior/medio/inferior",
      "Manguito rotador",
      "Romboides"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta o elíptica",
        "Rotación externa con banda: 15 reps c/lado",
        "15 encogimientos circulares de hombros",
        "Y-T-W con banda elástica: 10 reps c/posición",
        "10 elevaciones frontales muy ligeras"
      ],
      "mobility": [
        "Péndulo de brazo: 30 seg c/lado",
        "Sleeper stretch (rotación interna): 20 seg c/lado",
        "Estiramiento cruzado de hombro: 20 seg c/lado"
      ],
      "mental": "Los hombros son el punto débil más frecuente. Trabaja siempre con control, nunca con inercia. El manguito rotador vale más que el peso en la barra."
    },
    "workout": {
      "blocks": [
        {
          "name": "Bloque 1 — Press vertical (mass builder)",
          "exercises": [
            {
              "id": "ohp_db",
              "name": "Press militar con mancuernas",
              "muscle": "Deltoides anterior y lateral, Tríceps",
              "equip": "Mancuernas",
              "sets": "4",
              "reps": "12",
              "rest": "90 seg",
              "notes": "Sentado o de pie. Core activo. No arquear la espalda.",
              "weight_guide": "Mancuernas: empieza con 60-70% de tu 1RM estimado"
            },
            {
              "id": "lateral_raise",
              "name": "Elevación lateral (mancuernas)",
              "muscle": "Deltoides lateral",
              "equip": "Mancuernas",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "Codo ligeramente flexionado. No subas más de la horizontal.",
              "weight_guide": "Mancuernas: 5-12 kg"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 2 — Deltoides posterior y trapecio",
          "exercises": [
            {
              "id": "rear_delt_fly",
              "name": "Pájaro (deltoides posterior)",
              "muscle": "Deltoides posterior, Romboides",
              "equip": "Mancuernas (tronco inclinado)",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "Espalda a 45°. Codo ligeramente doblado. Aprieta escápulas.",
              "weight_guide": "Mancuernas muy ligeras: 4-8 kg"
            },
            {
              "id": "facepull",
              "name": "Facepull con cuerda",
              "muscle": "Trapecio inferior, Deltoides post., Manguito",
              "equip": "Cable alto + cuerda",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "Énfasis en la rotación externa al final.",
              "weight_guide": "Cable"
            },
            {
              "id": "shrug_db",
              "name": "Encogimiento de hombros (mancuernas)",
              "muscle": "Trapecio superior",
              "equip": "Mancuernas",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "Solo hacia arriba. Sin rotar los hombros.",
              "weight_guide": "Mancuernas pesadas o barra"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 3 — Manguito rotador",
          "exercises": [
            {
              "id": "rotator_band",
              "name": "Rotación externa con banda",
              "muscle": "Manguito rotador (infraespinoso, red. menor)",
              "equip": "Banda elástica",
              "sets": "3",
              "reps": "15 c/lado",
              "rest": "45 seg",
              "notes": "Codo a 90°. Movimiento lento y controlado.",
              "weight_guide": "Banda elástica ligera"
            },
            {
              "id": "scapular_ret",
              "name": "Retracción escapular con banda (T)",
              "muscle": "Trapecio medio/inf., Romboides",
              "equip": "Banda elástica",
              "sets": "3",
              "reps": "15",
              "rest": "45 seg",
              "notes": "Posición T: retrae y baja las escápulas.",
              "weight_guide": "Banda elástica"
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min movilidad suave de hombros: péndulos y círculos",
        "Respiración diafragmática: 3 min"
      ],
      "stretches": [
        "Estiramiento sleeper (rotación interna): 30 seg c/lado",
        "Cruzado de hombro: 30 seg c/lado",
        "Trapecio: inclinación lateral de cabeza (25 seg c/lado)",
        "Extensión de hombro posterior: brazo cruzado bajo (25 seg c/lado)"
      ],
      "nutrition": "Los hombros son articulaciones complejas: además de proteína, asegura ingesta de colágeno (gelatina o suplemento) para salud del manguito rotador.",
      "recovery": "Los hombros se involucran en casi todos los ejercicios. Prioriza el descanso de este grupo si sientes fatiga articular. Masaje suave en zona del trapecio si hay tensión."
    }
  },
  {
    "id": 6,
    "phase": 1,
    "type": "A",
    "name": "Piernas — Fuerza y glúteo (variación A2)",
    "intensity": "Medio",
    "duration": "65-75 min",
    "muscles": [
      "Cuádriceps",
      "Glúteo mayor/medio/menor",
      "Isquiotibiales",
      "Aductores",
      "Pantorrillas"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata rápida o trote suave",
        "20 círculos de cadera (10 c/lado)",
        "15 sentadillas de activación sin peso",
        "10 puentes de glúteo lentos",
        "10 rotaciones de rodilla c/lado"
      ],
      "mobility": [
        "Movilidad tobillo: círculos + flexión (30 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)",
        "Desbloqueo psoas: rodilla en suelo, inclinación adelante (20 seg c/lado)"
      ],
      "mental": "Visualiza la sesión completa. El tren inferior es el motor del cuerpo. Cada rep construye la base de tu maratón."
    },
    "workout": {
      "blocks": [
        {
          "name": "Bloque 1 — Compound principal",
          "exercises": [
            {
              "id": "squat_bar",
              "name": "Sentadilla trasera (barra)",
              "muscle": "Cuádriceps, Glúteo mayor",
              "equip": "Barra + Rack",
              "sets": "4",
              "reps": "10-12",
              "rest": "90 seg",
              "notes": "Sesión de técnica: foco en profundidad y postura. Espalda baja neutral.",
              "weight_guide": "Barra: peso que puedas bajar paralelo al suelo"
            },
            {
              "id": "rdl",
              "name": "Peso muerto rumano",
              "muscle": "Isquiotibiales, Glúteo mayor, Erectores",
              "equip": "Barra o mancuernas",
              "sets": "3",
              "reps": "12",
              "rest": "90 seg",
              "notes": "Variación: baja hasta tibias. Siente el jalón en isquiotibiales.",
              "weight_guide": "Barra o mancuernas"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 2 — Glúteo y unilateral",
          "exercises": [
            {
              "id": "hip_thrust_db",
              "name": "Hip thrust con mancuerna",
              "muscle": "Glúteo mayor",
              "equip": "Mancuerna + banco",
              "sets": "3",
              "reps": "15",
              "rest": "75 seg",
              "notes": "Hombros en banco, mancuerna en cadera. Aprieta glúteo arriba.",
              "weight_guide": "Mancuerna: 16-30 kg"
            },
            {
              "id": "bulgarian",
              "name": "Zancada búlgara (pie elevado)",
              "muscle": "Cuádriceps, Glúteo mayor/medio",
              "equip": "Mancuernas + banco",
              "sets": "3",
              "reps": "10 c/pierna",
              "rest": "90 seg",
              "notes": "Pie trasero en banco. Baja hasta que rodilla casi toca el suelo.",
              "weight_guide": "Peso corporal o mancuernas ligeras"
            },
            {
              "id": "clamshell",
              "name": "Clamshell con banda",
              "muscle": "Glúteo medio y menor",
              "equip": "Banda elástica",
              "sets": "3",
              "reps": "20 c/lado",
              "rest": "45 seg",
              "notes": "Glúteo medio y menor. Pies juntos, abre la rodilla.",
              "weight_guide": "Banda elástica"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 3 — Aislamiento y Core",
          "exercises": [
            {
              "id": "leg_curl_lying",
              "name": "Curl de isquiotibiales tumbado",
              "muscle": "Isquiotibiales",
              "equip": "Máquina curl tumbado",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "Isquiotibiales. Baja el peso en 3 seg.",
              "weight_guide": "Máquina: moderado"
            },
            {
              "id": "adduction_machine",
              "name": "Aducción de cadera (máquina)",
              "muscle": "Aductores",
              "equip": "Máquina aducción",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "Aductores. Control en la apertura.",
              "weight_guide": "Máquina: moderado"
            },
            {
              "id": "side_plank",
              "name": "Plancha lateral",
              "muscle": "Oblicuos, Core lateral",
              "equip": "Peso corporal",
              "sets": "3",
              "reps": "25 seg c/lado",
              "rest": "45 seg",
              "notes": "Cuerpo recto de cabeza a pies.",
              "weight_guide": "Peso corporal"
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave para bajar FC",
        "Respiración: 4 inhala / 4 retén / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps de pie (40 seg c/lado)",
        "Isquiotibial con banda o toalla (40 seg c/lado)",
        "Paloma/figura 4 glúteo en suelo (45 seg c/lado)",
        "Aductor sentado pies juntos (30 seg)",
        "Pantorrilla contra pared (25 seg c/lado)",
        "Torsión espinal tumbado (30 seg c/lado)"
      ],
      "nutrition": "Ingiere proteína + carbohidrato en los 30-60 min siguientes (ej: batido de proteína + plátano, o arroz con pollo). Los carbohidratos post-piernas son esenciales para reponer glucógeno muscular.",
      "recovery": "Piernas: 48-72h de recuperación antes del próximo estímulo pesado de piernas. Si sientes DOMS (agujetas) intensas, camina suave y toma baño frío de pies."
    }
  },
  {
    "id": 7,
    "phase": 1,
    "type": "F",
    "name": "Full Body funcional — Movimientos completos",
    "intensity": "Medio",
    "duration": "60-70 min",
    "muscles": [
      "Full body: cuádriceps, glúteo, pecho, espalda, hombros, core"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "7 min trote suave",
        "10 jumping jacks",
        "10 sentadillas cuerpo libre",
        "10 push-ups de rodilla",
        "10 remo con banda",
        "5 burpees lentos"
      ],
      "mobility": [
        "Gato-vaca: 10 reps lentas",
        "Apertura de cadera 90/90: 30 seg c/lado",
        "Movilidad de hombros: círculos 20 c/dirección"
      ],
      "mental": "El full body te entrena como atleta completo. Cada patrón de movimiento (empuje, tirón, sentadilla, bisagra) te hace más funcional en la vida real."
    },
    "workout": {
      "blocks": [
        {
          "name": "Circuito A — Patrón bisagra + empuje (3 vueltas)",
          "exercises": [
            {
              "id": "rdl",
              "name": "Peso muerto rumano",
              "muscle": "Isquiotibiales, Glúteo mayor, Erectores",
              "equip": "Barra o mancuernas",
              "sets": "3",
              "reps": "12",
              "rest": "60 seg entre bloques",
              "notes": "Cadena posterior. Mantén la espalda plana.",
              "weight_guide": "Barra o mancuernas moderadas"
            },
            {
              "id": "bench_flat",
              "name": "Press de banca plano (barra)",
              "muscle": "Pectoral mayor, Tríceps, Deltoides ant.",
              "equip": "Barra + banco",
              "sets": "3",
              "reps": "12",
              "rest": "60 seg",
              "notes": "Controla la bajada. 2 seg abajo, 1 arriba.",
              "weight_guide": "Moderado"
            },
            {
              "id": "plank",
              "name": "Plancha frontal",
              "muscle": "Transverso abdominal, Core completo",
              "equip": "Peso corporal",
              "sets": "3",
              "reps": "40 seg",
              "rest": "30 seg",
              "notes": "Core apretado siempre.",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Circuito B — Sentadilla + tirón + core (3 vueltas)",
          "exercises": [
            {
              "id": "squat_goblet",
              "name": "Sentadilla goblet (mancuerna)",
              "muscle": "Cuádriceps, Glúteo",
              "equip": "Mancuerna",
              "sets": "3",
              "reps": "12",
              "rest": "60 seg",
              "notes": "Buena profundidad. Talones en el suelo.",
              "weight_guide": "Mancuerna moderada"
            },
            {
              "id": "pulldown_neutral",
              "name": "Jalón agarre neutro",
              "muscle": "Dorsal ancho, Bíceps",
              "equip": "Polea + agarre neutro",
              "sets": "3",
              "reps": "12",
              "rest": "60 seg",
              "notes": "Retrae escápulas. Pecho hacia el agarre.",
              "weight_guide": "Cable moderado"
            },
            {
              "id": "reverse_crunch",
              "name": "Crunch inverso",
              "muscle": "Recto abdominal inferior, Core",
              "equip": "Peso corporal",
              "sets": "3",
              "reps": "15",
              "rest": "30 seg",
              "notes": "Enrolla la columna vértebra a vértebra.",
              "weight_guide": "Peso corporal"
            }
          ],
          "note": ""
        },
        {
          "name": "Circuito C — Funcional y cardio (3 vueltas)",
          "exercises": [
            {
              "id": "lunge_walk",
              "name": "Estocada caminando",
              "muscle": "Cuádriceps, Glúteo, Isquiotibiales",
              "equip": "Mancuernas o peso corporal",
              "sets": "3",
              "reps": "10 c/pierna",
              "rest": "45 seg",
              "notes": "Continuidad de pasos. Mantén el equilibrio.",
              "weight_guide": ""
            },
            {
              "id": "pushup",
              "name": "Flexiones (push-up)",
              "muscle": "Pectoral mayor, Tríceps, Serrato",
              "equip": "Peso corporal",
              "sets": "3",
              "reps": "10-15",
              "rest": "45 seg",
              "notes": "Modifica si necesitas: rodillas en suelo.",
              "weight_guide": "Peso corporal"
            },
            {
              "id": "jump_rope",
              "name": "Comba / soga de saltar",
              "muscle": "Sistema cardiovascular, Pantorrillas, Coordinación",
              "equip": "Comba",
              "sets": "3",
              "reps": "60 seg",
              "rest": "30 seg",
              "notes": "Ritmo sostenido. Si no tienes comba, haz stepping rápido.",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave",
        "Respiración: 4 inhala / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps (30 seg c/lado)",
        "Isquiotibiales (30 seg c/lado)",
        "Pecho en marco de puerta (25 seg)",
        "Dorsal en inclinación (25 seg c/lado)",
        "Rotación espinal tumbado (25 seg c/lado)",
        "Niño extendido (45 seg)"
      ],
      "nutrition": "Sesión full body: alta demanda energética. Meal completa: 30-40g proteína + 60-80g carbohidratos + verduras. Es tu mejor momento para absorber nutrientes.",
      "recovery": "El full body genera más fatiga sistémica que un split. Descansa 48h antes del próximo full body. Un día de cardio suave o movilidad entre sesiones es ideal."
    }
  },
  {
    "id": 8,
    "phase": 1,
    "type": "B",
    "name": "Pecho + Tríceps — Variación B2 (ángulos diferentes)",
    "intensity": "Medio",
    "duration": "60-70 min",
    "muscles": [
      "Pectoral mayor (fibras inferiores y medias)",
      "Pectoral menor",
      "Tríceps",
      "Serrato anterior"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta estática o elíptica",
        "20 círculos de hombros (adelante y atrás)",
        "15 aperturas de pecho con banda",
        "10 push-ups de rodilla lentos",
        "10 rotaciones de hombro con banda c/lado"
      ],
      "mobility": [
        "Apertura de pecho en marco de puerta (30 seg)",
        "Extensión de muñeca y antebrazo (20 seg c/lado)",
        "Rotación interna/externa de hombro (15 reps c/lado)"
      ],
      "mental": "El pecho y hombros definen tu postura. Cada press es una afirmación de fuerza. Activa el músculo desde el inicio, no solo mueves peso."
    },
    "workout": {
      "blocks": [
        {
          "name": "Bloque 1 — Press inclinado y plano",
          "exercises": [
            {
              "id": "db_press_incline",
              "name": "Press inclinado (mancuernas)",
              "muscle": "Pectoral mayor superior",
              "equip": "Mancuernas + banco inclinado",
              "sets": "4",
              "reps": "12",
              "rest": "90 seg",
              "notes": "Mancuernas permiten mayor rango que barra.",
              "weight_guide": "Mancuernas"
            },
            {
              "id": "bench_decline",
              "name": "Press declinado (barra)",
              "muscle": "Pectoral mayor inferior, Tríceps",
              "equip": "Barra + banco declinado",
              "sets": "3",
              "reps": "12",
              "rest": "90 seg",
              "notes": "Pecho inferior. Cuidado con el flujo de sangre a la cabeza.",
              "weight_guide": "Barra moderada"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 2 — Aperturas y cruce",
          "exercises": [
            {
              "id": "pec_dec",
              "name": "Pec deck (apertura máquina)",
              "muscle": "Pectoral mayor",
              "equip": "Máquina pec deck",
              "sets": "3",
              "reps": "15",
              "rest": "75 seg",
              "notes": "Máquina. Siente el apretón en el centro del pecho al cerrar.",
              "weight_guide": ""
            },
            {
              "id": "cable_crossover_high",
              "name": "Cruce poleas alto a bajo",
              "muscle": "Pectoral mayor inferior",
              "equip": "Cables altos",
              "sets": "3",
              "reps": "14",
              "rest": "60 seg",
              "notes": "Cruza los brazos al final para máxima contracción.",
              "weight_guide": "Cable alto"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 3 — Tríceps variado",
          "exercises": [
            {
              "id": "skull_crusher",
              "name": "Press francés / skullcrusher",
              "muscle": "Tríceps (cabeza larga)",
              "equip": "Barra Z o mancuernas",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "Baja el peso a la frente. Codos fijos.",
              "weight_guide": "Barra Z: moderada"
            },
            {
              "id": "kickback",
              "name": "Patada de tríceps (kickback)",
              "muscle": "Tríceps cabeza lateral",
              "equip": "Mancuerna",
              "sets": "3",
              "reps": "14 c/lado",
              "rest": "60 seg",
              "notes": "Cuerpo casi horizontal. Extiende completamente.",
              "weight_guide": "Mancuerna ligera"
            },
            {
              "id": "dips_tricep",
              "name": "Fondos en banco (tríceps)",
              "muscle": "Tríceps",
              "equip": "Banco",
              "sets": "3",
              "reps": "12",
              "rest": "60 seg",
              "notes": "Si es fácil: añade peso en las piernas.",
              "weight_guide": "Peso corporal"
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata suave",
        "Respiración profunda: 5 respiraciones largas"
      ],
      "stretches": [
        "Estiramiento pecho en marco de puerta (30 seg, 3 ángulos: bajo/medio/alto)",
        "Tríceps sobre la cabeza (35 seg c/lado)",
        "Cruce de brazo (deltoides anterior, 25 seg c/lado)",
        "Extensión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Proteína en los 45 min siguientes. Si entrenaste en ayunas, prioriza fuente rápida (suero de leche). El pecho requiere entre 0.3-0.4 g/kg de proteína por sesión para síntesis óptima.",
      "recovery": "48h de descanso antes de volver a empujar pesado. Puedes hacer cardio suave o espalda al día siguiente sin problema."
    }
  },
  {
    "id": 9,
    "phase": 1,
    "type": "C",
    "name": "Espalda + Bíceps — Variación C2 (dominadas + remo unilateral)",
    "intensity": "Medio",
    "duration": "65-75 min",
    "muscles": [
      "Dorsal ancho",
      "Romboides",
      "Trapecio",
      "Bíceps",
      "Antebrazos"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min remo ergómetro suave",
        "15 retracciones escapulares con banda",
        "Colgarse de barra: 3 × 20 seg",
        "10 superman lentos en el suelo",
        "Rotación externa de hombro con banda: 15 reps c/lado"
      ],
      "mobility": [
        "Movilidad de hombro: círculos de brazo (20 c/dirección)",
        "Estiramiento de antebrazo dorsal (20 seg c/lado)",
        "Descompresión lumbar: colgado de barra 30 seg"
      ],
      "mental": "La espalda fuerte es el escudo del cuerpo. El 80% de los dolores lumbares se previenen con espalda fuerte. Cada jalón acerca tu objetivo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Bloque 1 — Dominadas y jalón",
          "exercises": [
            {
              "id": "assisted_pullup",
              "name": "Dominadas asistidas (máquina)",
              "muscle": "Dorsal ancho, Romboides",
              "equip": "Máquina asistida",
              "sets": "4",
              "reps": "8-12",
              "rest": "90 seg",
              "notes": "Si puedes hacer dominadas libres, úsalas. Retrae escápulas arriba.",
              "weight_guide": "Asistida: mínima asistencia posible"
            },
            {
              "id": "pulldown_supine",
              "name": "Jalón agarre supino",
              "muscle": "Dorsal ancho inferior, Bíceps",
              "equip": "Polea + barra",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "Agarre supino (palmas hacia ti): más bíceps y dorsal inferior.",
              "weight_guide": "Cable"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 2 — Remos variados",
          "exercises": [
            {
              "id": "row_db",
              "name": "Remo mancuerna unilateral",
              "muscle": "Dorsal ancho, Romboide, Trapecio",
              "equip": "Mancuerna + banco",
              "sets": "4",
              "reps": "12 c/lado",
              "rest": "75 seg",
              "notes": "Rango completo. Baja el codo completamente.",
              "weight_guide": "Mancuerna: 20-32 kg"
            },
            {
              "id": "row_seated_wide",
              "name": "Remo sentado agarre ancho",
              "muscle": "Romboides, Trapecio medio (énfasis)",
              "equip": "Máquina o cable",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "Agarre ancho activa más romboides. Aprieta las escápulas.",
              "weight_guide": "Máquina"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 3 — Bíceps y antebrazos",
          "exercises": [
            {
              "id": "curl_conc",
              "name": "Curl concentrado (mancuerna)",
              "muscle": "Bíceps braquial (pico)",
              "equip": "Mancuerna + banco",
              "sets": "3",
              "reps": "12 c/lado",
              "rest": "60 seg",
              "notes": "No muevas el codo. Contracción máxima arriba.",
              "weight_guide": "Mancuerna moderada"
            },
            {
              "id": "curl_reverse",
              "name": "Curl inverso (agarre prono)",
              "muscle": "Braquiorradial, Extensores antebrazo",
              "equip": "Barra o cable",
              "sets": "2",
              "reps": "12",
              "rest": "60 seg",
              "notes": "Agarre prono. Activa extensores del antebrazo.",
              "weight_guide": "Barra ligera"
            },
            {
              "id": "wrist_curl",
              "name": "Curl de muñeca (flexores)",
              "muscle": "Flexores del antebrazo",
              "equip": "Barra o mancuerna",
              "sets": "2",
              "reps": "20",
              "rest": "45 seg",
              "notes": "Antebrazo sobre la rodilla. Sólo mueve la muñeca.",
              "weight_guide": "Mancuerna o barra ligera"
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata o trote suave",
        "Colgado de barra: 30 seg (descompresión)",
        "Respiración profunda: 5 ciclos"
      ],
      "stretches": [
        "Estiramiento dorsal: brazo en alto con inclinación lateral (30 seg c/lado)",
        "Bíceps contra pared, palma arriba (25 seg c/lado)",
        "Gato-vaca en el suelo: 10 reps lentas",
        "Niño extendido con brazos al frente (45 seg)",
        "Extensión y flexión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Alta demanda proteica: la espalda es el grupo muscular más grande de la parte superior. Prioriza 30-40g de proteína en los 60 min post-entreno.",
      "recovery": "La espalda y bíceps se recuperan en 48-72h. Si sientes rigidez lumbar, aplica calor suave y haz movilidad de cadera al día siguiente."
    }
  },
  {
    "id": 10,
    "phase": 1,
    "type": "E",
    "name": "Cardio progresivo + Flexibilidad profunda",
    "intensity": "Bajo",
    "duration": "55-65 min",
    "muscles": [
      "Sistema cardiovascular",
      "Flexibilidad global"
    ],
    "pre": {
      "hydration": "Hidratación extra hoy: añade limón al agua para vitamina C y electrolitos naturales.",
      "warmup": [
        "5 min caminata suave",
        "10 círculos de tobillo c/lado",
        "Extensiones de pantorrilla lentas: 20 reps",
        "Elevaciones de rodilla marchando: 30 seg"
      ],
      "mobility": [
        "Estiramiento dinámico de cuádriceps (10 c/lado)",
        "Estiramiento isquiotibial de pie (20 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)"
      ],
      "mental": "El cardio es una meditación en movimiento. Hoy no compites contra nadie. Solo construyes tu motor aeróbico ladrillo a ladrillo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Cardio: walk-jog intervals",
          "exercises": [
            {
              "id": "treadmill_jog",
              "name": "Trote continuo",
              "muscle": "Sistema cardiovascular, Pantorrillas",
              "equip": "Cinta / parque",
              "sets": "6",
              "reps": "2 min trote / 1 min caminar",
              "rest": "--",
              "notes": "Alterna: 2 min a ritmo conversacional, 1 min caminata. Total 18 min.",
              "weight_guide": "Velocidad trote: 7-9 km/h según tu condición"
            }
          ],
          "note": ""
        },
        {
          "name": "Rutina de flexibilidad activa",
          "exercises": [
            {
              "id": "psoas_stretch",
              "name": "Estiramiento de psoas (estocada)",
              "muscle": "Psoas, Recto femoral",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "45 seg c/lado",
              "rest": "20 seg",
              "notes": "Psoas crucial: acortar aquí genera dolor lumbar.",
              "weight_guide": ""
            },
            {
              "id": "pigeon",
              "name": "Paloma / figura 4 (piriforme)",
              "muscle": "Piriforme, Glúteo profundo",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "45 seg c/lado",
              "rest": "20 seg",
              "notes": "Piriforme y glúteo profundo. Respira hacia la tensión.",
              "weight_guide": ""
            },
            {
              "id": "mobility_thoracic",
              "name": "Apertura torácica con rodillo",
              "muscle": "Columna torácica, Pectoral",
              "equip": "Foam roller",
              "sets": "2",
              "reps": "60 seg",
              "rest": "20 seg",
              "notes": "Columna torácica: clave para postura y respiración.",
              "weight_guide": "Foam roller"
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata muy lenta",
        "Respiración controlada: 5 min sentado"
      ],
      "stretches": [
        "Psoas (estocada estática): 45 seg c/lado",
        "Piriforme/paloma en suelo: 45 seg c/lado",
        "Isquiotibiales con cinta: 40 seg c/lado",
        "Apertura de pecho en suelo (brazos en T): 60 seg",
        "Perro boca abajo: 45 seg",
        "Pose del niño: 60 seg",
        "Savasana / respiración consciente: 3 min"
      ],
      "nutrition": "El cardio quema glucógeno. Repón con carbohidratos en los 30 min siguientes si vas a entrenar mañana. Si es día de recuperación, puedes priorizar proteína y grasas buenas.",
      "recovery": "Hidratación post-cardio: repón electrolitos si sudaste mucho (agua con limón + pizca de sal). El cardio activa el sistema parasimpático si lo mantienes aeróbico."
    }
  },
  {
    "id": 11,
    "phase": 1,
    "type": "D",
    "name": "Hombros — Variación D2 (Arnold + cables)",
    "intensity": "Medio",
    "duration": "60-70 min",
    "muscles": [
      "Deltoides (3 haces)",
      "Trapecio",
      "Manguito rotador"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta o elíptica",
        "Rotación externa con banda: 15 reps c/lado",
        "15 encogimientos circulares de hombros",
        "Y-T-W con banda elástica: 10 reps c/posición",
        "10 elevaciones frontales muy ligeras"
      ],
      "mobility": [
        "Péndulo de brazo: 30 seg c/lado",
        "Sleeper stretch (rotación interna): 20 seg c/lado",
        "Estiramiento cruzado de hombro: 20 seg c/lado"
      ],
      "mental": "Los hombros son el punto débil más frecuente. Trabaja siempre con control, nunca con inercia. El manguito rotador vale más que el peso en la barra."
    },
    "workout": {
      "blocks": [
        {
          "name": "Bloque 1 — Press con rotación",
          "exercises": [
            {
              "id": "arnold_press",
              "name": "Press Arnold",
              "muscle": "Deltoides (3 haces), Trapecio",
              "equip": "Mancuernas",
              "sets": "4",
              "reps": "12",
              "rest": "90 seg",
              "notes": "Rotación completa del antebrazo durante el press. Trabaja los 3 haces.",
              "weight_guide": "Mancuernas: más liviano que el press normal"
            },
            {
              "id": "lateral_cable",
              "name": "Elevación lateral en cable",
              "muscle": "Deltoides lateral (énfasis)",
              "equip": "Cable bajo",
              "sets": "3",
              "reps": "15 c/lado",
              "rest": "60 seg",
              "notes": "Cable bajo al lado contrario. Tensión constante en el deltoides.",
              "weight_guide": "Cable ligero"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 2 — Posterior y trapecio",
          "exercises": [
            {
              "id": "reverse_pec_dec",
              "name": "Pec deck inverso (deltoides post.)",
              "muscle": "Deltoides posterior, Romboides",
              "equip": "Máquina pec deck",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "Pec deck inverso para deltoides posterior. Codos a la altura del hombro.",
              "weight_guide": ""
            },
            {
              "id": "rear_delt_cable",
              "name": "Cable posterior (deltoides post.)",
              "muscle": "Deltoides posterior",
              "equip": "Cable alto",
              "sets": "3",
              "reps": "15 c/lado",
              "rest": "60 seg",
              "notes": "Cable alto. Jala hacia atrás y abajo.",
              "weight_guide": "Cable ligero"
            },
            {
              "id": "shrug_bar",
              "name": "Encogimiento de hombros (barra)",
              "muscle": "Trapecio superior",
              "equip": "Barra",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "Sólo hacia arriba. Sin movimiento circular.",
              "weight_guide": "Barra con carga moderada"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 3 — Estabilización",
          "exercises": [
            {
              "id": "yt_w",
              "name": "Y-T-W con mancuernas (tumbado)",
              "muscle": "Trapecio, Romboides, Manguito rotador",
              "equip": "Mancuernas ligeras",
              "sets": "3",
              "reps": "10 c/posición",
              "rest": "60 seg",
              "notes": "Y-T-W con mancuernas muy ligeras tumbado. Trabaja todos los estabilizadores.",
              "weight_guide": "Mancuernas 2-4 kg"
            },
            {
              "id": "rotator_cable",
              "name": "Rotación externa en cable",
              "muscle": "Manguito rotador",
              "equip": "Cable bajo",
              "sets": "3",
              "reps": "12 c/lado",
              "rest": "45 seg",
              "notes": "Manguito rotador. El ejercicio más importante que pocos hacen.",
              "weight_guide": "Cable muy ligero"
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min movilidad suave de hombros: péndulos y círculos",
        "Respiración diafragmática: 3 min"
      ],
      "stretches": [
        "Estiramiento sleeper (rotación interna): 30 seg c/lado",
        "Cruzado de hombro: 30 seg c/lado",
        "Trapecio: inclinación lateral de cabeza (25 seg c/lado)",
        "Extensión de hombro posterior: brazo cruzado bajo (25 seg c/lado)"
      ],
      "nutrition": "Los hombros son articulaciones complejas: además de proteína, asegura ingesta de colágeno (gelatina o suplemento) para salud del manguito rotador.",
      "recovery": "Los hombros se involucran en casi todos los ejercicios. Prioriza el descanso de este grupo si sientes fatiga articular. Masaje suave en zona del trapecio si hay tensión."
    }
  },
  {
    "id": 12,
    "phase": 1,
    "type": "A",
    "name": "Piernas — Énfasis isquiotibiales y cadena posterior (A3)",
    "intensity": "Medio-Alto",
    "duration": "70-80 min",
    "muscles": [
      "Isquiotibiales",
      "Glúteo mayor",
      "Erectores de columna",
      "Aductores",
      "Pantorrillas"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata rápida o trote suave",
        "20 círculos de cadera (10 c/lado)",
        "15 sentadillas de activación sin peso",
        "10 puentes de glúteo lentos",
        "10 rotaciones de rodilla c/lado"
      ],
      "mobility": [
        "Movilidad tobillo: círculos + flexión (30 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)",
        "Desbloqueo psoas: rodilla en suelo, inclinación adelante (20 seg c/lado)"
      ],
      "mental": "Visualiza la sesión completa. El tren inferior es el motor del cuerpo. Cada rep construye la base de tu maratón."
    },
    "workout": {
      "blocks": [
        {
          "name": "Bloque 1 — Cadena posterior pesada",
          "exercises": [
            {
              "id": "deadlift",
              "name": "Peso muerto convencional",
              "muscle": "Cadena posterior completa",
              "equip": "Barra",
              "sets": "4",
              "reps": "8",
              "rest": "120 seg",
              "notes": "El rey de los ejercicios. Foco absoluto en la técnica.",
              "weight_guide": "Peso que puedas hacer con espalda perfecta"
            },
            {
              "id": "rdl",
              "name": "Peso muerto rumano",
              "muscle": "Isquiotibiales, Glúteo mayor, Erectores",
              "equip": "Barra o mancuernas",
              "sets": "3",
              "reps": "12",
              "rest": "90 seg",
              "notes": "Después del peso muerto: más volumen de isquiotibiales.",
              "weight_guide": "Moderado"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 2 — Isquiotibiales aislados",
          "exercises": [
            {
              "id": "leg_curl_lying",
              "name": "Curl de isquiotibiales tumbado",
              "muscle": "Isquiotibiales",
              "equip": "Máquina curl tumbado",
              "sets": "3",
              "reps": "14",
              "rest": "75 seg",
              "notes": "Baja 3 seg. Contrae arriba 1 seg.",
              "weight_guide": "Máquina"
            },
            {
              "id": "good_morning",
              "name": "Good morning (barra)",
              "muscle": "Isquiotibiales, Erectores, Glúteo",
              "equip": "Barra",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "Barra en trapecios. Bisagra de cadera. Cadera atrás.",
              "weight_guide": "Barra ligera: prioriza técnica"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 3 — Glúteo y Core",
          "exercises": [
            {
              "id": "hip_thrust",
              "name": "Hip thrust (barra)",
              "muscle": "Glúteo mayor",
              "equip": "Barra + banco",
              "sets": "3",
              "reps": "15",
              "rest": "75 seg",
              "notes": "Con barra. El glúteo en el punto más alto.",
              "weight_guide": "Barra: 20-60 kg según nivel"
            },
            {
              "id": "adduction_machine",
              "name": "Aducción de cadera (máquina)",
              "muscle": "Aductores",
              "equip": "Máquina aducción",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "ab_wheel",
              "name": "Rueda abdominal (ab wheel)",
              "muscle": "Transverso, Recto abdominal, Dorsal",
              "equip": "Ab wheel",
              "sets": "3",
              "reps": "10-15",
              "rest": "60 seg",
              "notes": "Rodillas en el suelo. Extiende hasta donde puedas sin perder la lumbar.",
              "weight_guide": "Ab wheel o plancha deslizante"
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave para bajar FC",
        "Respiración: 4 inhala / 4 retén / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps de pie (40 seg c/lado)",
        "Isquiotibial con banda o toalla (40 seg c/lado)",
        "Paloma/figura 4 glúteo en suelo (45 seg c/lado)",
        "Aductor sentado pies juntos (30 seg)",
        "Pantorrilla contra pared (25 seg c/lado)",
        "Torsión espinal tumbado (30 seg c/lado)"
      ],
      "nutrition": "Ingiere proteína + carbohidrato en los 30-60 min siguientes (ej: batido de proteína + plátano, o arroz con pollo). Los carbohidratos post-piernas son esenciales para reponer glucógeno muscular.",
      "recovery": "Piernas: 48-72h de recuperación antes del próximo estímulo pesado de piernas. Si sientes DOMS (agujetas) intensas, camina suave y toma baño frío de pies."
    }
  },
  {
    "id": 13,
    "phase": 1,
    "type": "F",
    "name": "Full Body — Fuerza funcional y cardio integrado",
    "intensity": "Medio",
    "duration": "60-70 min",
    "muscles": [
      "Full body integrado"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "7 min trote suave",
        "10 jumping jacks",
        "10 sentadillas cuerpo libre",
        "10 push-ups de rodilla",
        "10 remo con banda",
        "5 burpees lentos"
      ],
      "mobility": [
        "Gato-vaca: 10 reps lentas",
        "Apertura de cadera 90/90: 30 seg c/lado",
        "Movilidad de hombros: círculos 20 c/dirección"
      ],
      "mental": "El full body te entrena como atleta completo. Cada patrón de movimiento (empuje, tirón, sentadilla, bisagra) te hace más funcional en la vida real."
    },
    "workout": {
      "blocks": [
        {
          "name": "Circuito A (3 rondas): Fuerza",
          "exercises": [
            {
              "id": "squat_bar",
              "name": "Sentadilla trasera (barra)",
              "muscle": "Cuádriceps, Glúteo mayor",
              "equip": "Barra + Rack",
              "sets": "3",
              "reps": "10",
              "rest": "90 seg",
              "notes": "Peso moderado. Técnica perfecta.",
              "weight_guide": "60-70% de lo que puedes en una sentadilla pesada"
            },
            {
              "id": "row_bar",
              "name": "Remo con barra inclinado",
              "muscle": "Dorsal ancho, Romboides, Trapecio medio",
              "equip": "Barra",
              "sets": "3",
              "reps": "10",
              "rest": "90 seg",
              "notes": "Misma lógica: técnica antes que peso.",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Circuito B (3 rondas): Metabólico",
          "exercises": [
            {
              "id": "pushup",
              "name": "Flexiones (push-up)",
              "muscle": "Pectoral mayor, Tríceps, Serrato",
              "equip": "Peso corporal",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "Variación: pies elevados si es fácil.",
              "weight_guide": ""
            },
            {
              "id": "lunge_rev",
              "name": "Estocada inversa",
              "muscle": "Cuádriceps, Glúteo medio",
              "equip": "Peso corporal o mancuernas",
              "sets": "3",
              "reps": "10 c/pierna",
              "rest": "60 seg",
              "notes": "Estocada inversa: rodilla trasera baja.",
              "weight_guide": ""
            },
            {
              "id": "plank",
              "name": "Plancha frontal",
              "muscle": "Transverso abdominal, Core completo",
              "equip": "Peso corporal",
              "sets": "3",
              "reps": "40 seg",
              "rest": "30 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Cardio final",
          "exercises": [
            {
              "id": "jump_rope",
              "name": "Comba / soga de saltar",
              "muscle": "Sistema cardiovascular, Pantorrillas, Coordinación",
              "equip": "Comba",
              "sets": "5",
              "reps": "45 seg activo / 15 seg descanso",
              "rest": "--",
              "notes": "Intervalos intensos. Si no tienes comba: saltar en el lugar.",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave",
        "Respiración: 4 inhala / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps (30 seg c/lado)",
        "Isquiotibiales (30 seg c/lado)",
        "Pecho en marco de puerta (25 seg)",
        "Dorsal en inclinación (25 seg c/lado)",
        "Rotación espinal tumbado (25 seg c/lado)",
        "Niño extendido (45 seg)"
      ],
      "nutrition": "Sesión full body: alta demanda energética. Meal completa: 30-40g proteína + 60-80g carbohidratos + verduras. Es tu mejor momento para absorber nutrientes.",
      "recovery": "El full body genera más fatiga sistémica que un split. Descansa 48h antes del próximo full body. Un día de cardio suave o movilidad entre sesiones es ideal."
    }
  },
  {
    "id": 14,
    "phase": 1,
    "type": "B",
    "name": "Pecho + Tríceps — Bodyweight y máquinas (B3)",
    "intensity": "Medio",
    "duration": "60-70 min",
    "muscles": [
      "Pectoral mayor",
      "Tríceps",
      "Serrato anterior",
      "Deltoides anterior"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta estática o elíptica",
        "20 círculos de hombros (adelante y atrás)",
        "15 aperturas de pecho con banda",
        "10 push-ups de rodilla lentos",
        "10 rotaciones de hombro con banda c/lado"
      ],
      "mobility": [
        "Apertura de pecho en marco de puerta (30 seg)",
        "Extensión de muñeca y antebrazo (20 seg c/lado)",
        "Rotación interna/externa de hombro (15 reps c/lado)"
      ],
      "mental": "El pecho y hombros definen tu postura. Cada press es una afirmación de fuerza. Activa el músculo desde el inicio, no solo mueves peso."
    },
    "workout": {
      "blocks": [
        {
          "name": "Bloque 1 — Press con mancuernas",
          "exercises": [
            {
              "id": "db_press_flat",
              "name": "Press de banca plano (mancuernas)",
              "muscle": "Pectoral mayor, Serrato anterior",
              "equip": "Mancuernas + banco",
              "sets": "4",
              "reps": "12",
              "rest": "90 seg",
              "notes": "Mancuernas permiten mayor rango que barra. Lleva hasta estirar pecho.",
              "weight_guide": "Mancuernas"
            },
            {
              "id": "db_press_fitball",
              "name": "Press mancuernas sobre fitball",
              "muscle": "Pectoral, Serrato, Core",
              "equip": "Mancuernas + fitball",
              "sets": "3",
              "reps": "12",
              "rest": "90 seg",
              "notes": "Inestabilidad activa serrato anterior y core.",
              "weight_guide": "Mancuernas ligeras"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 2 — Cruce y fondos",
          "exercises": [
            {
              "id": "cable_crossover_low",
              "name": "Cruce poleas bajo a alto",
              "muscle": "Pectoral mayor superior",
              "equip": "Cables bajos",
              "sets": "3",
              "reps": "14",
              "rest": "75 seg",
              "notes": "Bajo a alto: pecho superior. Cruza los brazos al final.",
              "weight_guide": "Cable bajo"
            },
            {
              "id": "dips_chest",
              "name": "Fondos en paralelas (pecho)",
              "muscle": "Pectoral mayor inferior, Tríceps",
              "equip": "Paralelas",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "Inclina el cuerpo hacia adelante para énfasis en el pecho.",
              "weight_guide": "Peso corporal → añade lastre si es fácil"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 3 — Tríceps y agarre cerrado",
          "exercises": [
            {
              "id": "close_grip_bench",
              "name": "Press banca agarre cerrado",
              "muscle": "Tríceps (énfasis), Pectoral interno",
              "equip": "Barra + banco",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "Agarre cerrado: manos a ancho de hombros. Codos pegados.",
              "weight_guide": "Barra moderada"
            },
            {
              "id": "tricep_bar_pushdown",
              "name": "Extensión tríceps (barra recta/V)",
              "muscle": "Tríceps lateral y medial",
              "equip": "Cable + barra V",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "Barra V. Bloquea los codos al cuerpo.",
              "weight_guide": "Cable"
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata suave",
        "Respiración profunda: 5 respiraciones largas"
      ],
      "stretches": [
        "Estiramiento pecho en marco de puerta (30 seg, 3 ángulos: bajo/medio/alto)",
        "Tríceps sobre la cabeza (35 seg c/lado)",
        "Cruce de brazo (deltoides anterior, 25 seg c/lado)",
        "Extensión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Proteína en los 45 min siguientes. Si entrenaste en ayunas, prioriza fuente rápida (suero de leche). El pecho requiere entre 0.3-0.4 g/kg de proteína por sesión para síntesis óptima.",
      "recovery": "48h de descanso antes de volver a empujar pesado. Puedes hacer cardio suave o espalda al día siguiente sin problema."
    }
  },
  {
    "id": 15,
    "phase": 1,
    "type": "C",
    "name": "Espalda + Bíceps — Variación C3 (T-bar + curl predicador)",
    "intensity": "Medio",
    "duration": "65-75 min",
    "muscles": [
      "Dorsal ancho",
      "Trapecio",
      "Bíceps (cabeza corta)",
      "Erectores"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min remo ergómetro suave",
        "15 retracciones escapulares con banda",
        "Colgarse de barra: 3 × 20 seg",
        "10 superman lentos en el suelo",
        "Rotación externa de hombro con banda: 15 reps c/lado"
      ],
      "mobility": [
        "Movilidad de hombro: círculos de brazo (20 c/dirección)",
        "Estiramiento de antebrazo dorsal (20 seg c/lado)",
        "Descompresión lumbar: colgado de barra 30 seg"
      ],
      "mental": "La espalda fuerte es el escudo del cuerpo. El 80% de los dolores lumbares se previenen con espalda fuerte. Cada jalón acerca tu objetivo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Bloque 1 — Jalón y dominadas",
          "exercises": [
            {
              "id": "pulldown_wide",
              "name": "Jalón al pecho agarre ancho",
              "muscle": "Dorsal ancho, Redondo mayor",
              "equip": "Polea + barra ancha",
              "sets": "3",
              "reps": "12",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "chinup",
              "name": "Chin-up (agarre supino)",
              "muscle": "Dorsal ancho, Bíceps (énfasis)",
              "equip": "Barra de dominadas",
              "sets": "3",
              "reps": "8-12",
              "rest": "90 seg",
              "notes": "Chin-up: agarre supino. Mayor activación bíceps.",
              "weight_guide": "Peso corporal o asistida"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 2 — Remos compuestos",
          "exercises": [
            {
              "id": "row_tbar",
              "name": "Remo T-bar",
              "muscle": "Dorsal ancho, Romboides, Trapecio",
              "equip": "T-bar o barra",
              "sets": "4",
              "reps": "10",
              "rest": "90 seg",
              "notes": "T-bar remo: mayor carga que el remo con mancuerna.",
              "weight_guide": "T-bar con moderado peso"
            },
            {
              "id": "row_cable",
              "name": "Remo en cable agarre neutro",
              "muscle": "Dorsal ancho, Romboides",
              "equip": "Cable bajo",
              "sets": "3",
              "reps": "14",
              "rest": "75 seg",
              "notes": "Cable remo: tensión constante en el músculo.",
              "weight_guide": "Cable bajo"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 3 — Bíceps especializados",
          "exercises": [
            {
              "id": "curl_preacher",
              "name": "Curl predicador (máquina o barra)",
              "muscle": "Bíceps braquial (porción corta)",
              "equip": "Máquina predicador",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "Predicador elimina el impulso. Movimiento puro de bíceps.",
              "weight_guide": "Máquina o banco predicador"
            },
            {
              "id": "curl_incline",
              "name": "Curl en banco inclinado",
              "muscle": "Bíceps (cabeza larga, estiramiento)",
              "equip": "Mancuernas + banco inclinado",
              "sets": "3",
              "reps": "12 c/lado",
              "rest": "60 seg",
              "notes": "Banco inclinado: estira la cabeza larga del bíceps.",
              "weight_guide": "Mancuernas ligeras"
            },
            {
              "id": "grip_squeeze",
              "name": "Squeeze de pinza (grip training)",
              "muscle": "Flexores del antebrazo, Fuerza de agarre",
              "equip": "Gripper o plato",
              "sets": "2",
              "reps": "20 seg",
              "rest": "45 seg",
              "notes": "Fuerza de agarre: crítica para todos los jalones.",
              "weight_guide": "Gripper o plato"
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata o trote suave",
        "Colgado de barra: 30 seg (descompresión)",
        "Respiración profunda: 5 ciclos"
      ],
      "stretches": [
        "Estiramiento dorsal: brazo en alto con inclinación lateral (30 seg c/lado)",
        "Bíceps contra pared, palma arriba (25 seg c/lado)",
        "Gato-vaca en el suelo: 10 reps lentas",
        "Niño extendido con brazos al frente (45 seg)",
        "Extensión y flexión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Alta demanda proteica: la espalda es el grupo muscular más grande de la parte superior. Prioriza 30-40g de proteína en los 60 min post-entreno.",
      "recovery": "La espalda y bíceps se recuperan en 48-72h. Si sientes rigidez lumbar, aplica calor suave y haz movilidad de cadera al día siguiente."
    }
  },
  {
    "id": 16,
    "phase": 1,
    "type": "E",
    "name": "Cardio + Movilidad — Progresión aeróbica",
    "intensity": "Bajo-Medio",
    "duration": "55-65 min",
    "muscles": [
      "Sistema cardiovascular",
      "Flexibilidad",
      "Coordinación"
    ],
    "pre": {
      "hydration": "Hoy es buen día para practicar hidratación durante el ejercicio: toma 100-150 ml cada 15-20 min.",
      "warmup": [
        "5 min caminata suave",
        "10 círculos de tobillo c/lado",
        "Extensiones de pantorrilla lentas: 20 reps",
        "Elevaciones de rodilla marchando: 30 seg"
      ],
      "mobility": [
        "Estiramiento dinámico de cuádriceps (10 c/lado)",
        "Estiramiento isquiotibial de pie (20 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)"
      ],
      "mental": "El cardio es una meditación en movimiento. Hoy no compites contra nadie. Solo construyes tu motor aeróbico ladrillo a ladrillo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Cardio: trote continuo (progresión)",
          "exercises": [
            {
              "id": "treadmill_jog",
              "name": "Trote continuo",
              "muscle": "Sistema cardiovascular, Pantorrillas",
              "equip": "Cinta / parque",
              "sets": "1",
              "reps": "20-25 min continuos",
              "rest": "--",
              "notes": "Primer intento de trote continuo. Si necesitas caminar: OK. No pares más de 60 seg.",
              "weight_guide": "7-9 km/h. Ajusta según tu capacidad"
            }
          ],
          "note": ""
        },
        {
          "name": "Movilidad dinámica complementaria",
          "exercises": [
            {
              "id": "mobility_hip",
              "name": "Movilidad de cadera 90/90",
              "muscle": "Cápsula articular cadera, Glúteo",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "60 seg c/lado",
              "rest": "15 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "pigeon",
              "name": "Paloma / figura 4 (piriforme)",
              "muscle": "Piriforme, Glúteo profundo",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "45 seg c/lado",
              "rest": "15 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "hollow_body",
              "name": "Hollow body hold",
              "muscle": "Core completo, Transverso",
              "equip": "Peso corporal",
              "sets": "3",
              "reps": "25 seg",
              "rest": "30 seg",
              "notes": "Mantén la zona lumbar en el suelo. Respira.",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata muy lenta",
        "Respiración controlada: 5 min sentado"
      ],
      "stretches": [
        "Psoas (estocada estática): 45 seg c/lado",
        "Piriforme/paloma en suelo: 45 seg c/lado",
        "Isquiotibiales con cinta: 40 seg c/lado",
        "Apertura de pecho en suelo (brazos en T): 60 seg",
        "Perro boca abajo: 45 seg",
        "Pose del niño: 60 seg",
        "Savasana / respiración consciente: 3 min"
      ],
      "nutrition": "El cardio quema glucógeno. Repón con carbohidratos en los 30 min siguientes si vas a entrenar mañana. Si es día de recuperación, puedes priorizar proteína y grasas buenas.",
      "recovery": "Hidratación post-cardio: repón electrolitos si sudaste mucho (agua con limón + pizca de sal). El cardio activa el sistema parasimpático si lo mantienes aeróbico."
    }
  },
  {
    "id": 17,
    "phase": 1,
    "type": "A",
    "name": "Piernas — Fuerza de cuádriceps (A4)",
    "intensity": "Alto",
    "duration": "70-80 min",
    "muscles": [
      "Cuádriceps (vastos + recto femoral)",
      "Glúteo mayor/medio",
      "Pantorrillas",
      "Core"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata rápida o trote suave",
        "20 círculos de cadera (10 c/lado)",
        "15 sentadillas de activación sin peso",
        "10 puentes de glúteo lentos",
        "10 rotaciones de rodilla c/lado"
      ],
      "mobility": [
        "Movilidad tobillo: círculos + flexión (30 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)",
        "Desbloqueo psoas: rodilla en suelo, inclinación adelante (20 seg c/lado)"
      ],
      "mental": "Visualiza la sesión completa. El tren inferior es el motor del cuerpo. Cada rep construye la base de tu maratón."
    },
    "workout": {
      "blocks": [
        {
          "name": "Bloque 1 — Sentadilla pesada",
          "exercises": [
            {
              "id": "squat_bar",
              "name": "Sentadilla trasera (barra)",
              "muscle": "Cuádriceps, Glúteo mayor",
              "equip": "Barra + Rack",
              "sets": "5",
              "reps": "8",
              "rest": "120 seg",
              "notes": "Hoy es día de fuerza. 75-80% de tu máximo. Profundidad completa.",
              "weight_guide": "Pesado pero controlado"
            },
            {
              "id": "leg_press",
              "name": "Prensa de pierna (máquina)",
              "muscle": "Cuádriceps, Glúteo",
              "equip": "Máquina prensa",
              "sets": "4",
              "reps": "10",
              "rest": "90 seg",
              "notes": "Pies a ancho de hombros. Baja hasta 90°. No bloquees rodillas al subir.",
              "weight_guide": "Máquina con carga moderada-alta"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 2 — Cuádriceps y glúteo",
          "exercises": [
            {
              "id": "leg_ext",
              "name": "Extensión de cuádriceps (máquina)",
              "muscle": "Cuádriceps (énfasis)",
              "equip": "Máquina extensión",
              "sets": "3",
              "reps": "15",
              "rest": "75 seg",
              "notes": "Aislamiento de cuádriceps. Baja en 3 seg.",
              "weight_guide": "Máquina"
            },
            {
              "id": "step_up",
              "name": "Step-up con mancuernas",
              "muscle": "Cuádriceps, Glúteo mayor",
              "equip": "Mancuernas + banco",
              "sets": "3",
              "reps": "12 c/pierna",
              "rest": "75 seg",
              "notes": "Step-up con mancuernas. Empuja con el talón.",
              "weight_guide": "Mancuernas + banco"
            },
            {
              "id": "clamshell",
              "name": "Clamshell con banda",
              "muscle": "Glúteo medio y menor",
              "equip": "Banda elástica",
              "sets": "3",
              "reps": "20 c/lado",
              "rest": "45 seg",
              "notes": "Glúteo medio. Con banda.",
              "weight_guide": "Banda elástica"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 3 — Pantorrillas y Core",
          "exercises": [
            {
              "id": "calf_machine",
              "name": "Extensión de pantorrilla (máquina)",
              "muscle": "Gastrocnemio, Sóleo",
              "equip": "Máquina pantorrilla",
              "sets": "4",
              "reps": "20",
              "rest": "45 seg",
              "notes": "Rango completo. Al fondo: 1 seg. Arriba: 1 seg.",
              "weight_guide": "Máquina"
            },
            {
              "id": "pallof_press",
              "name": "Pallof press (anti-rotacional)",
              "muscle": "Oblicuos, Core anti-rotación",
              "equip": "Cable o banda",
              "sets": "3",
              "reps": "12 c/lado",
              "rest": "60 seg",
              "notes": "Anti-rotación. Mantén el core rígido.",
              "weight_guide": "Cable"
            },
            {
              "id": "cable_crunch",
              "name": "Crunch en polea alta",
              "muscle": "Recto abdominal",
              "equip": "Cable + cuerda",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "Crunch en polea. Recto abdominal puro.",
              "weight_guide": "Cable moderado"
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave para bajar FC",
        "Respiración: 4 inhala / 4 retén / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps de pie (40 seg c/lado)",
        "Isquiotibial con banda o toalla (40 seg c/lado)",
        "Paloma/figura 4 glúteo en suelo (45 seg c/lado)",
        "Aductor sentado pies juntos (30 seg)",
        "Pantorrilla contra pared (25 seg c/lado)",
        "Torsión espinal tumbado (30 seg c/lado)"
      ],
      "nutrition": "Ingiere proteína + carbohidrato en los 30-60 min siguientes (ej: batido de proteína + plátano, o arroz con pollo). Los carbohidratos post-piernas son esenciales para reponer glucógeno muscular.",
      "recovery": "Piernas: 48-72h de recuperación antes del próximo estímulo pesado de piernas. Si sientes DOMS (agujetas) intensas, camina suave y toma baño frío de pies."
    }
  },
  {
    "id": 18,
    "phase": 1,
    "type": "D",
    "name": "Hombros — Press barra + posterior intensivo (D3)",
    "intensity": "Medio-Alto",
    "duration": "65-75 min",
    "muscles": [
      "Deltoides (3 haces)",
      "Trapecio superior y medio",
      "Manguito rotador"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta o elíptica",
        "Rotación externa con banda: 15 reps c/lado",
        "15 encogimientos circulares de hombros",
        "Y-T-W con banda elástica: 10 reps c/posición",
        "10 elevaciones frontales muy ligeras"
      ],
      "mobility": [
        "Péndulo de brazo: 30 seg c/lado",
        "Sleeper stretch (rotación interna): 20 seg c/lado",
        "Estiramiento cruzado de hombro: 20 seg c/lado"
      ],
      "mental": "Los hombros son el punto débil más frecuente. Trabaja siempre con control, nunca con inercia. El manguito rotador vale más que el peso en la barra."
    },
    "workout": {
      "blocks": [
        {
          "name": "Bloque 1 — Press con barra",
          "exercises": [
            {
              "id": "ohp_bar",
              "name": "Press militar con barra (de pie)",
              "muscle": "Deltoides anterior, Tríceps, Core",
              "equip": "Barra",
              "sets": "4",
              "reps": "10",
              "rest": "90 seg",
              "notes": "Press militar con barra. De pie: activa core. Sentado: más aislamiento.",
              "weight_guide": "Barra: moderado-pesado"
            },
            {
              "id": "front_raise",
              "name": "Elevación frontal (mancuerna)",
              "muscle": "Deltoides anterior",
              "equip": "Mancuernas o disco",
              "sets": "3",
              "reps": "12",
              "rest": "60 seg",
              "notes": "Con disco. Ambos brazos simultáneos. Más difícil que con mancuernas.",
              "weight_guide": "Disco: 5-15 kg"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 2 — Lateral y posterior",
          "exercises": [
            {
              "id": "lateral_raise",
              "name": "Elevación lateral (mancuernas)",
              "muscle": "Deltoides lateral",
              "equip": "Mancuernas",
              "sets": "4",
              "reps": "14",
              "rest": "60 seg",
              "notes": "4 series: semana de más volumen en laterales.",
              "weight_guide": "Mancuernas"
            },
            {
              "id": "facepull",
              "name": "Facepull con cuerda",
              "muscle": "Trapecio inferior, Deltoides post., Manguito",
              "equip": "Cable alto + cuerda",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "Siempre incluir: salud del manguito.",
              "weight_guide": "Cable"
            },
            {
              "id": "rear_delt_fly",
              "name": "Pájaro (deltoides posterior)",
              "muscle": "Deltoides posterior, Romboides",
              "equip": "Mancuernas (tronco inclinado)",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": "Mancuernas ligeras"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 3 — Trapecios y estabilizadores",
          "exercises": [
            {
              "id": "upright_row",
              "name": "Remo al mentón (barra)",
              "muscle": "Trapecio superior, Deltoides lateral",
              "equip": "Barra",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "Agarre ancho para evitar impingement. Codos arriba.",
              "weight_guide": "Barra o cable"
            },
            {
              "id": "scapular_ret",
              "name": "Retracción escapular con banda (T)",
              "muscle": "Trapecio medio/inf., Romboides",
              "equip": "Banda elástica",
              "sets": "3",
              "reps": "15",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": "Banda"
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min movilidad suave de hombros: péndulos y círculos",
        "Respiración diafragmática: 3 min"
      ],
      "stretches": [
        "Estiramiento sleeper (rotación interna): 30 seg c/lado",
        "Cruzado de hombro: 30 seg c/lado",
        "Trapecio: inclinación lateral de cabeza (25 seg c/lado)",
        "Extensión de hombro posterior: brazo cruzado bajo (25 seg c/lado)"
      ],
      "nutrition": "Los hombros son articulaciones complejas: además de proteína, asegura ingesta de colágeno (gelatina o suplemento) para salud del manguito rotador.",
      "recovery": "Los hombros se involucran en casi todos los ejercicios. Prioriza el descanso de este grupo si sientes fatiga articular. Masaje suave en zona del trapecio si hay tensión."
    }
  },
  {
    "id": 19,
    "phase": 1,
    "type": "F",
    "name": "Full Body — Circuito metabólico de cierre de fase",
    "intensity": "Medio-Alto",
    "duration": "60-70 min",
    "muscles": [
      "Full body: todos los grupos musculares principales"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "7 min trote suave",
        "10 jumping jacks",
        "10 sentadillas cuerpo libre",
        "10 push-ups de rodilla",
        "10 remo con banda",
        "5 burpees lentos"
      ],
      "mobility": [
        "Gato-vaca: 10 reps lentas",
        "Apertura de cadera 90/90: 30 seg c/lado",
        "Movilidad de hombros: círculos 20 c/dirección"
      ],
      "mental": "El full body te entrena como atleta completo. Cada patrón de movimiento (empuje, tirón, sentadilla, bisagra) te hace más funcional en la vida real."
    },
    "workout": {
      "blocks": [
        {
          "name": "Circuito compuesto (4 rondas, 45 seg descanso entre ejercicios)",
          "exercises": [
            {
              "id": "squat_goblet",
              "name": "Sentadilla goblet (mancuerna)",
              "muscle": "Cuádriceps, Glúteo",
              "equip": "Mancuerna",
              "sets": "4",
              "reps": "10",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": "Mancuerna moderada"
            },
            {
              "id": "db_press_flat",
              "name": "Press de banca plano (mancuernas)",
              "muscle": "Pectoral mayor, Serrato anterior",
              "equip": "Mancuernas + banco",
              "sets": "4",
              "reps": "10",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": "Mancuernas moderadas"
            },
            {
              "id": "row_db",
              "name": "Remo mancuerna unilateral",
              "muscle": "Dorsal ancho, Romboide, Trapecio",
              "equip": "Mancuerna + banco",
              "sets": "4",
              "reps": "10 c/lado",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": "Mancuerna moderada"
            },
            {
              "id": "ohp_db",
              "name": "Press militar con mancuernas",
              "muscle": "Deltoides anterior y lateral, Tríceps",
              "equip": "Mancuernas",
              "sets": "4",
              "reps": "10",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": "Mancuernas moderadas"
            }
          ],
          "note": ""
        },
        {
          "name": "Circuito cardio-core (3 rondas)",
          "exercises": [
            {
              "id": "burpee",
              "name": "Burpee",
              "muscle": "Full body, Sistema cardiovascular",
              "equip": "Peso corporal",
              "sets": "3",
              "reps": "8",
              "rest": "60 seg",
              "notes": "Técnica antes que velocidad.",
              "weight_guide": ""
            },
            {
              "id": "leg_raise",
              "name": "Elevación de piernas colgado",
              "muscle": "Recto abdominal inferior, Psoas",
              "equip": "Barra de dominadas",
              "sets": "3",
              "reps": "12",
              "rest": "45 seg",
              "notes": "Colgado de barra. Sube las piernas rectas.",
              "weight_guide": "Barra de dominadas"
            },
            {
              "id": "jump_rope",
              "name": "Comba / soga de saltar",
              "muscle": "Sistema cardiovascular, Pantorrillas, Coordinación",
              "equip": "Comba",
              "sets": "3",
              "reps": "60 seg",
              "rest": "30 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave",
        "Respiración: 4 inhala / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps (30 seg c/lado)",
        "Isquiotibiales (30 seg c/lado)",
        "Pecho en marco de puerta (25 seg)",
        "Dorsal en inclinación (25 seg c/lado)",
        "Rotación espinal tumbado (25 seg c/lado)",
        "Niño extendido (45 seg)"
      ],
      "nutrition": "Sesión full body: alta demanda energética. Meal completa: 30-40g proteína + 60-80g carbohidratos + verduras. Es tu mejor momento para absorber nutrientes.",
      "recovery": "El full body genera más fatiga sistémica que un split. Descansa 48h antes del próximo full body. Un día de cardio suave o movilidad entre sesiones es ideal."
    }
  },
  {
    "id": 20,
    "phase": 1,
    "type": "G",
    "name": "Sesión de descarga — Deload activo (fin de Fase 1)",
    "intensity": "Bajo",
    "duration": "50-60 min",
    "muscles": [
      "Todos los grupos: volumen y carga reducidos al 50-60%"
    ],
    "pre": {
      "hydration": "Hoy es día de cuidado. Bebe abundante agua. Es el día perfecto para preparar las comidas de la semana.",
      "warmup": [
        "10 min caminata tranquila",
        "10 círculos de hombros",
        "10 sentadillas suaves sin peso",
        "Respiración diafragmática: 5 respiraciones profundas"
      ],
      "mobility": [
        "Movilidad global suave: 5 min",
        "Foam rolling: zona lumbar y piernas (3 min)"
      ],
      "mental": "El descanso activo NO es perder el tiempo. Es cuando el cuerpo consolida las ganancias. Llega relajado, sin presión de rendimiento."
    },
    "workout": {
      "blocks": [
        {
          "name": "Repaso de patrones (peso ligero, sin esfuerzo)",
          "exercises": [
            {
              "id": "squat_goblet",
              "name": "Sentadilla goblet (mancuerna)",
              "muscle": "Cuádriceps, Glúteo",
              "equip": "Mancuerna",
              "sets": "2",
              "reps": "15",
              "rest": "60 seg",
              "notes": "50% del peso que usarías normalmente. Solo movimiento.",
              "weight_guide": "Ligero"
            },
            {
              "id": "db_press_flat",
              "name": "Press de banca plano (mancuernas)",
              "muscle": "Pectoral mayor, Serrato anterior",
              "equip": "Mancuernas + banco",
              "sets": "2",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": "Ligero"
            },
            {
              "id": "pulldown_neutral",
              "name": "Jalón agarre neutro",
              "muscle": "Dorsal ancho, Bíceps",
              "equip": "Polea + agarre neutro",
              "sets": "2",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": "Ligero"
            },
            {
              "id": "ohp_db",
              "name": "Press militar con mancuernas",
              "muscle": "Deltoides anterior y lateral, Tríceps",
              "equip": "Mancuernas",
              "sets": "2",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": "Ligero"
            },
            {
              "id": "plank",
              "name": "Plancha frontal",
              "muscle": "Transverso abdominal, Core completo",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "30 seg",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "curl_db_alt",
              "name": "Curl con mancuernas alternado",
              "muscle": "Bíceps braquial, Braquial",
              "equip": "Mancuernas",
              "sets": "2",
              "reps": "15",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": "Ligero"
            }
          ],
          "note": ""
        },
        {
          "name": "Cardio suave y recuperación",
          "exercises": [
            {
              "id": "treadmill_walk",
              "name": "Caminata rápida (cinta/parque)",
              "muscle": "Sistema cardiovascular",
              "equip": "Cinta / parque",
              "sets": "1",
              "reps": "15-20 min",
              "rest": "--",
              "notes": "Ritmo muy suave. Paseo terapéutico.",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "10 min caminata tranquila",
        "Respiración consciente: 5 min"
      ],
      "stretches": [
        "Rutina completa de estiramiento: 15 min (todos los grupos)",
        "Foam rolling global: isquiotibiales, glúteos, dorsal, pectorales (5 min)",
        "Savasana / meditación (5 min)"
      ],
      "nutrition": "Semana de descarga: mantén ingesta proteica alta pero puedes reducir levemente los carbohidratos si entrenas menos. El cuerpo reconstruye y supracompensa en esta fase.",
      "recovery": "Esta sesión es medicina. No hagas nada más exigente que esto hoy. Duerme 8+ horas esta noche. La semana siguiente empezarás más fuerte."
    }
  },
  {
    "id": 21,
    "phase": 2,
    "type": "A",
    "name": "Piernas — Volumen de construcción (A5)",
    "intensity": "Alto",
    "duration": "75-85 min",
    "muscles": [
      "Cuádriceps",
      "Glúteo mayor/medio",
      "Isquiotibiales",
      "Aductores",
      "Pantorrillas",
      "Core"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata rápida o trote suave",
        "20 círculos de cadera (10 c/lado)",
        "15 sentadillas de activación sin peso",
        "10 puentes de glúteo lentos",
        "10 rotaciones de rodilla c/lado"
      ],
      "mobility": [
        "Movilidad tobillo: círculos + flexión (30 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)",
        "Desbloqueo psoas: rodilla en suelo, inclinación adelante (20 seg c/lado)"
      ],
      "mental": "Visualiza la sesión completa. El tren inferior es el motor del cuerpo. Cada rep construye la base de tu maratón."
    },
    "workout": {
      "blocks": [
        {
          "name": "Bloque 1 — Sentadilla + Peso muerto (combinado)",
          "exercises": [
            {
              "id": "squat_bar",
              "name": "Sentadilla trasera (barra)",
              "muscle": "Cuádriceps, Glúteo mayor",
              "equip": "Barra + Rack",
              "sets": "4",
              "reps": "10",
              "rest": "120 seg",
              "notes": "Carga progresiva: sube 5 kg respecto a la última sesión similar.",
              "weight_guide": "Más pesado que Fase 1"
            },
            {
              "id": "deadlift",
              "name": "Peso muerto convencional",
              "muscle": "Cadena posterior completa",
              "equip": "Barra",
              "sets": "4",
              "reps": "8",
              "rest": "120 seg",
              "notes": "Peso muerto convencional. Sesión de mayor carga.",
              "weight_guide": "Progresivo"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 2 — Glúteo y unilateral",
          "exercises": [
            {
              "id": "hip_thrust",
              "name": "Hip thrust (barra)",
              "muscle": "Glúteo mayor",
              "equip": "Barra + banco",
              "sets": "4",
              "reps": "12",
              "rest": "90 seg",
              "notes": "Con barra. 4 series: más volumen de glúteo.",
              "weight_guide": "Barra pesada"
            },
            {
              "id": "bulgarian",
              "name": "Zancada búlgara (pie elevado)",
              "muscle": "Cuádriceps, Glúteo mayor/medio",
              "equip": "Mancuernas + banco",
              "sets": "4",
              "reps": "10 c/pierna",
              "rest": "90 seg",
              "notes": "Fase 2: añade mancuernas.",
              "weight_guide": "Mancuernas"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 3 — Isquiotibiales y Core",
          "exercises": [
            {
              "id": "leg_curl_seated",
              "name": "Curl de isquiotibiales sentado",
              "muscle": "Isquiotibiales (énfasis sóleo)",
              "equip": "Máquina curl sentado",
              "sets": "3",
              "reps": "15",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": "Máquina"
            },
            {
              "id": "adduction_machine",
              "name": "Aducción de cadera (máquina)",
              "muscle": "Aductores",
              "equip": "Máquina aducción",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "pallof_press",
              "name": "Pallof press (anti-rotacional)",
              "muscle": "Oblicuos, Core anti-rotación",
              "equip": "Cable o banda",
              "sets": "3",
              "reps": "12 c/lado",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "ab_wheel",
              "name": "Rueda abdominal (ab wheel)",
              "muscle": "Transverso, Recto abdominal, Dorsal",
              "equip": "Ab wheel",
              "sets": "3",
              "reps": "12",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave para bajar FC",
        "Respiración: 4 inhala / 4 retén / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps de pie (40 seg c/lado)",
        "Isquiotibial con banda o toalla (40 seg c/lado)",
        "Paloma/figura 4 glúteo en suelo (45 seg c/lado)",
        "Aductor sentado pies juntos (30 seg)",
        "Pantorrilla contra pared (25 seg c/lado)",
        "Torsión espinal tumbado (30 seg c/lado)"
      ],
      "nutrition": "Ingiere proteína + carbohidrato en los 30-60 min siguientes (ej: batido de proteína + plátano, o arroz con pollo). Los carbohidratos post-piernas son esenciales para reponer glucógeno muscular.",
      "recovery": "Piernas: 48-72h de recuperación antes del próximo estímulo pesado de piernas. Si sientes DOMS (agujetas) intensas, camina suave y toma baño frío de pies."
    }
  },
  {
    "id": 22,
    "phase": 2,
    "type": "B",
    "name": "Pecho + Tríceps — Superseries de hipertrofia (B4)",
    "intensity": "Alto",
    "duration": "65-75 min",
    "muscles": [
      "Pectoral mayor",
      "Tríceps",
      "Deltoides anterior",
      "Serrato anterior"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta estática o elíptica",
        "20 círculos de hombros (adelante y atrás)",
        "15 aperturas de pecho con banda",
        "10 push-ups de rodilla lentos",
        "10 rotaciones de hombro con banda c/lado"
      ],
      "mobility": [
        "Apertura de pecho en marco de puerta (30 seg)",
        "Extensión de muñeca y antebrazo (20 seg c/lado)",
        "Rotación interna/externa de hombro (15 reps c/lado)"
      ],
      "mental": "El pecho y hombros definen tu postura. Cada press es una afirmación de fuerza. Activa el músculo desde el inicio, no solo mueves peso."
    },
    "workout": {
      "blocks": [
        {
          "name": "Superserie A: Press + Apertura (3 rondas)",
          "exercises": [
            {
              "id": "bench_flat",
              "name": "Press de banca plano (barra)",
              "muscle": "Pectoral mayor, Tríceps, Deltoides ant.",
              "equip": "Barra + banco",
              "sets": "3",
              "reps": "10",
              "rest": "15 seg (entre A1-A2)",
              "notes": "Superset: sin descanso entre los dos. 90 seg después de la apertura.",
              "weight_guide": "Moderado-pesado"
            },
            {
              "id": "db_fly_flat",
              "name": "Apertura plana (mancuernas)",
              "muscle": "Pectoral mayor (estiramiento)",
              "equip": "Mancuernas + banco",
              "sets": "3",
              "reps": "14",
              "rest": "90 seg",
              "notes": "Inmediatamente después del press. El pecho estará exhausto.",
              "weight_guide": "Mancuernas ligeras"
            }
          ],
          "note": ""
        },
        {
          "name": "Superserie B: Press inclinado + Cruce cable (3 rondas)",
          "exercises": [
            {
              "id": "bench_incline",
              "name": "Press inclinado 30° (barra)",
              "muscle": "Pectoral mayor superior, Deltoides ant.",
              "equip": "Barra + banco inclinado",
              "sets": "3",
              "reps": "10",
              "rest": "15 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "cable_crossover_low",
              "name": "Cruce poleas bajo a alto",
              "muscle": "Pectoral mayor superior",
              "equip": "Cables bajos",
              "sets": "3",
              "reps": "14",
              "rest": "90 seg",
              "notes": "Bajo a alto: pecho superior. Cruza los brazos.",
              "weight_guide": "Cable"
            }
          ],
          "note": ""
        },
        {
          "name": "Tríceps compuesto (3 series)",
          "exercises": [
            {
              "id": "skull_crusher",
              "name": "Press francés / skullcrusher",
              "muscle": "Tríceps (cabeza larga)",
              "equip": "Barra Z o mancuernas",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": "Barra Z"
            },
            {
              "id": "overhead_ext_cable",
              "name": "Extensión overhead en cable",
              "muscle": "Tríceps cabeza larga (estiramiento)",
              "equip": "Cable bajo + cuerda",
              "sets": "3",
              "reps": "14",
              "rest": "60 seg",
              "notes": "Cable bajo + cuerda. Estiramiento máximo de la cabeza larga.",
              "weight_guide": "Cable"
            },
            {
              "id": "tricep_pushdown",
              "name": "Extensión tríceps (cuerda/cable)",
              "muscle": "Tríceps (3 cabezas)",
              "equip": "Cable + cuerda",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": "Cable + cuerda"
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata suave",
        "Respiración profunda: 5 respiraciones largas"
      ],
      "stretches": [
        "Estiramiento pecho en marco de puerta (30 seg, 3 ángulos: bajo/medio/alto)",
        "Tríceps sobre la cabeza (35 seg c/lado)",
        "Cruce de brazo (deltoides anterior, 25 seg c/lado)",
        "Extensión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Proteína en los 45 min siguientes. Si entrenaste en ayunas, prioriza fuente rápida (suero de leche). El pecho requiere entre 0.3-0.4 g/kg de proteína por sesión para síntesis óptima.",
      "recovery": "48h de descanso antes de volver a empujar pesado. Puedes hacer cardio suave o espalda al día siguiente sin problema."
    }
  },
  {
    "id": 23,
    "phase": 2,
    "type": "C",
    "name": "Espalda + Bíceps — Mayor volumen y dominadas libres (C4)",
    "intensity": "Alto",
    "duration": "70-80 min",
    "muscles": [
      "Dorsal ancho",
      "Romboides",
      "Trapecio",
      "Bíceps",
      "Antebrazos"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min remo ergómetro suave",
        "15 retracciones escapulares con banda",
        "Colgarse de barra: 3 × 20 seg",
        "10 superman lentos en el suelo",
        "Rotación externa de hombro con banda: 15 reps c/lado"
      ],
      "mobility": [
        "Movilidad de hombro: círculos de brazo (20 c/dirección)",
        "Estiramiento de antebrazo dorsal (20 seg c/lado)",
        "Descompresión lumbar: colgado de barra 30 seg"
      ],
      "mental": "La espalda fuerte es el escudo del cuerpo. El 80% de los dolores lumbares se previenen con espalda fuerte. Cada jalón acerca tu objetivo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Bloque 1 — Dominadas y jalón intenso",
          "exercises": [
            {
              "id": "pullup",
              "name": "Dominadas (agarre prono)",
              "muscle": "Dorsal ancho, Romboides, Bíceps",
              "equip": "Barra de dominadas",
              "sets": "4",
              "reps": "6-10",
              "rest": "90 seg",
              "notes": "Dominadas libres: objetivo de la Fase 2. Si no puedes: asistida.",
              "weight_guide": "Peso corporal"
            },
            {
              "id": "pulldown_wide",
              "name": "Jalón al pecho agarre ancho",
              "muscle": "Dorsal ancho, Redondo mayor",
              "equip": "Polea + barra ancha",
              "sets": "3",
              "reps": "12",
              "rest": "90 seg",
              "notes": "Después de dominadas: complemento de volumen.",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 2 — Remos pesados",
          "exercises": [
            {
              "id": "row_bar",
              "name": "Remo con barra inclinado",
              "muscle": "Dorsal ancho, Romboides, Trapecio medio",
              "equip": "Barra",
              "sets": "4",
              "reps": "10",
              "rest": "90 seg",
              "notes": "Más peso que Fase 1. Mantén la espalda plana.",
              "weight_guide": "Progresivo"
            },
            {
              "id": "row_tbar",
              "name": "Remo T-bar",
              "muscle": "Dorsal ancho, Romboides, Trapecio",
              "equip": "T-bar o barra",
              "sets": "3",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "facepull",
              "name": "Facepull con cuerda",
              "muscle": "Trapecio inferior, Deltoides post., Manguito",
              "equip": "Cable alto + cuerda",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": "Cable"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 3 — Bíceps y agarre",
          "exercises": [
            {
              "id": "curl_bar",
              "name": "Curl con barra recta o Z",
              "muscle": "Bíceps braquial",
              "equip": "Barra Z o recta",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "curl_hammer",
              "name": "Curl martillo (mancuernas)",
              "muscle": "Braquiorradial, Braquial",
              "equip": "Mancuernas",
              "sets": "3",
              "reps": "12 c/lado",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "farmers_walk",
              "name": "Farmer's walk (caminata granjero)",
              "muscle": "Antebrazos, Core, Trapecio superior",
              "equip": "Mancuernas pesadas",
              "sets": "3",
              "reps": "40 metros",
              "rest": "60 seg",
              "notes": "Caminata granjero: fuerza de agarre + core + trapecio.",
              "weight_guide": "Mancuernas pesadas"
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata o trote suave",
        "Colgado de barra: 30 seg (descompresión)",
        "Respiración profunda: 5 ciclos"
      ],
      "stretches": [
        "Estiramiento dorsal: brazo en alto con inclinación lateral (30 seg c/lado)",
        "Bíceps contra pared, palma arriba (25 seg c/lado)",
        "Gato-vaca en el suelo: 10 reps lentas",
        "Niño extendido con brazos al frente (45 seg)",
        "Extensión y flexión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Alta demanda proteica: la espalda es el grupo muscular más grande de la parte superior. Prioriza 30-40g de proteína en los 60 min post-entreno.",
      "recovery": "La espalda y bíceps se recuperan en 48-72h. Si sientes rigidez lumbar, aplica calor suave y haz movilidad de cadera al día siguiente."
    }
  },
  {
    "id": 24,
    "phase": 2,
    "type": "E",
    "name": "Cardio — Trote continuo 25 min + Movilidad",
    "intensity": "Bajo-Medio",
    "duration": "55-65 min",
    "muscles": [
      "Sistema cardiovascular",
      "Flexibilidad"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata suave",
        "10 círculos de tobillo c/lado",
        "Extensiones de pantorrilla lentas: 20 reps",
        "Elevaciones de rodilla marchando: 30 seg"
      ],
      "mobility": [
        "Estiramiento dinámico de cuádriceps (10 c/lado)",
        "Estiramiento isquiotibial de pie (20 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)"
      ],
      "mental": "El cardio es una meditación en movimiento. Hoy no compites contra nadie. Solo construyes tu motor aeróbico ladrillo a ladrillo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Trote continuo progresivo",
          "exercises": [
            {
              "id": "treadmill_jog",
              "name": "Trote continuo",
              "muscle": "Sistema cardiovascular, Pantorrillas",
              "equip": "Cinta / parque",
              "sets": "1",
              "reps": "25 min continuos",
              "rest": "--",
              "notes": "Objetivo: 25 min sin parar. Ritmo lento está bien. FC: 130-145 bpm.",
              "weight_guide": "7-9 km/h"
            }
          ],
          "note": ""
        },
        {
          "name": "Movilidad activa post-cardio",
          "exercises": [
            {
              "id": "mobility_hip",
              "name": "Movilidad de cadera 90/90",
              "muscle": "Cápsula articular cadera, Glúteo",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "60 seg c/lado",
              "rest": "15 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "pigeon",
              "name": "Paloma / figura 4 (piriforme)",
              "muscle": "Piriforme, Glúteo profundo",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "45 seg c/lado",
              "rest": "15 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "psoas_stretch",
              "name": "Estiramiento de psoas (estocada)",
              "muscle": "Psoas, Recto femoral",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "40 seg c/lado",
              "rest": "15 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata muy lenta",
        "Respiración controlada: 5 min sentado"
      ],
      "stretches": [
        "Psoas (estocada estática): 45 seg c/lado",
        "Piriforme/paloma en suelo: 45 seg c/lado",
        "Isquiotibiales con cinta: 40 seg c/lado",
        "Apertura de pecho en suelo (brazos en T): 60 seg",
        "Perro boca abajo: 45 seg",
        "Pose del niño: 60 seg",
        "Savasana / respiración consciente: 3 min"
      ],
      "nutrition": "El cardio quema glucógeno. Repón con carbohidratos en los 30 min siguientes si vas a entrenar mañana. Si es día de recuperación, puedes priorizar proteína y grasas buenas.",
      "recovery": "Hidratación post-cardio: repón electrolitos si sudaste mucho (agua con limón + pizca de sal). El cardio activa el sistema parasimpático si lo mantienes aeróbico."
    }
  },
  {
    "id": 25,
    "phase": 2,
    "type": "D",
    "name": "Hombros — Volumen alto (D4)",
    "intensity": "Alto",
    "duration": "65-75 min",
    "muscles": [
      "Deltoides (3 haces)",
      "Trapecio",
      "Manguito rotador",
      "Serrato anterior"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta o elíptica",
        "Rotación externa con banda: 15 reps c/lado",
        "15 encogimientos circulares de hombros",
        "Y-T-W con banda elástica: 10 reps c/posición",
        "10 elevaciones frontales muy ligeras"
      ],
      "mobility": [
        "Péndulo de brazo: 30 seg c/lado",
        "Sleeper stretch (rotación interna): 20 seg c/lado",
        "Estiramiento cruzado de hombro: 20 seg c/lado"
      ],
      "mental": "Los hombros son el punto débil más frecuente. Trabaja siempre con control, nunca con inercia. El manguito rotador vale más que el peso en la barra."
    },
    "workout": {
      "blocks": [
        {
          "name": "Bloque 1 — Press pesado",
          "exercises": [
            {
              "id": "ohp_bar",
              "name": "Press militar con barra (de pie)",
              "muscle": "Deltoides anterior, Tríceps, Core",
              "equip": "Barra",
              "sets": "5",
              "reps": "8",
              "rest": "90 seg",
              "notes": "5 series: mayor volumen en la Fase 2. Barra más pesada.",
              "weight_guide": "Progresivo vs Fase 1"
            },
            {
              "id": "arnold_press",
              "name": "Press Arnold",
              "muscle": "Deltoides (3 haces), Trapecio",
              "equip": "Mancuernas",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": "Mancuernas"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 2 — Laterales en drop set",
          "exercises": [
            {
              "id": "lateral_raise",
              "name": "Elevación lateral (mancuernas)",
              "muscle": "Deltoides lateral",
              "equip": "Mancuernas",
              "sets": "4",
              "reps": "12-10-8-15",
              "rest": "60 seg",
              "notes": "Último set: drop set (baja el peso 30% y haz 15 reps).",
              "weight_guide": "Mancuernas"
            },
            {
              "id": "lateral_cable",
              "name": "Elevación lateral en cable",
              "muscle": "Deltoides lateral (énfasis)",
              "equip": "Cable bajo",
              "sets": "3",
              "reps": "15 c/lado",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": "Cable"
            }
          ],
          "note": ""
        },
        {
          "name": "Bloque 3 — Posterior y trapecio",
          "exercises": [
            {
              "id": "rear_delt_fly",
              "name": "Pájaro (deltoides posterior)",
              "muscle": "Deltoides posterior, Romboides",
              "equip": "Mancuernas (tronco inclinado)",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "shrug_bar",
              "name": "Encogimiento de hombros (barra)",
              "muscle": "Trapecio superior",
              "equip": "Barra",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": "Barra pesada"
            },
            {
              "id": "rotator_band",
              "name": "Rotación externa con banda",
              "muscle": "Manguito rotador (infraespinoso, red. menor)",
              "equip": "Banda elástica",
              "sets": "3",
              "reps": "15 c/lado",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min movilidad suave de hombros: péndulos y círculos",
        "Respiración diafragmática: 3 min"
      ],
      "stretches": [
        "Estiramiento sleeper (rotación interna): 30 seg c/lado",
        "Cruzado de hombro: 30 seg c/lado",
        "Trapecio: inclinación lateral de cabeza (25 seg c/lado)",
        "Extensión de hombro posterior: brazo cruzado bajo (25 seg c/lado)"
      ],
      "nutrition": "Los hombros son articulaciones complejas: además de proteína, asegura ingesta de colágeno (gelatina o suplemento) para salud del manguito rotador.",
      "recovery": "Los hombros se involucran en casi todos los ejercicios. Prioriza el descanso de este grupo si sientes fatiga articular. Masaje suave en zona del trapecio si hay tensión."
    }
  },
  {
    "id": 26,
    "phase": 2,
    "type": "A",
    "name": "Piernas — Sentadilla frontal + hip thrust (A6)",
    "intensity": "Alto",
    "duration": "70-80 min",
    "muscles": [
      "Cuádriceps (énfasis)",
      "Glúteo mayor",
      "Isquiotibiales",
      "Core"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata rápida o trote suave",
        "20 círculos de cadera (10 c/lado)",
        "15 sentadillas de activación sin peso",
        "10 puentes de glúteo lentos",
        "10 rotaciones de rodilla c/lado"
      ],
      "mobility": [
        "Movilidad tobillo: círculos + flexión (30 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)",
        "Desbloqueo psoas: rodilla en suelo, inclinación adelante (20 seg c/lado)"
      ],
      "mental": "Visualiza la sesión completa. El tren inferior es el motor del cuerpo. Cada rep construye la base de tu maratón."
    },
    "workout": {
      "blocks": [
        {
          "name": "Compound principal",
          "exercises": [
            {
              "id": "squat_front",
              "name": "Sentadilla frontal (barra)",
              "muscle": "Cuádriceps, Core",
              "equip": "Barra + Rack",
              "sets": "4",
              "reps": "10",
              "rest": "120 seg",
              "notes": "Sentadilla frontal: mayor énfasis cuádriceps. Codos arriba.",
              "weight_guide": ""
            },
            {
              "id": "hip_thrust",
              "name": "Hip thrust (barra)",
              "muscle": "Glúteo mayor",
              "equip": "Barra + banco",
              "sets": "4",
              "reps": "12",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": "Barra pesada"
            }
          ],
          "note": ""
        },
        {
          "name": "Unilateral",
          "exercises": [
            {
              "id": "lunge_walk",
              "name": "Estocada caminando",
              "muscle": "Cuádriceps, Glúteo, Isquiotibiales",
              "equip": "Mancuernas o peso corporal",
              "sets": "4",
              "reps": "12 c/pierna",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": "Mancuernas"
            },
            {
              "id": "leg_ext",
              "name": "Extensión de cuádriceps (máquina)",
              "muscle": "Cuádriceps (énfasis)",
              "equip": "Máquina extensión",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Core",
          "exercises": [
            {
              "id": "ab_wheel",
              "name": "Rueda abdominal (ab wheel)",
              "muscle": "Transverso, Recto abdominal, Dorsal",
              "equip": "Ab wheel",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "cable_crunch",
              "name": "Crunch en polea alta",
              "muscle": "Recto abdominal",
              "equip": "Cable + cuerda",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave para bajar FC",
        "Respiración: 4 inhala / 4 retén / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps de pie (40 seg c/lado)",
        "Isquiotibial con banda o toalla (40 seg c/lado)",
        "Paloma/figura 4 glúteo en suelo (45 seg c/lado)",
        "Aductor sentado pies juntos (30 seg)",
        "Pantorrilla contra pared (25 seg c/lado)",
        "Torsión espinal tumbado (30 seg c/lado)"
      ],
      "nutrition": "Ingiere proteína + carbohidrato en los 30-60 min siguientes (ej: batido de proteína + plátano, o arroz con pollo). Los carbohidratos post-piernas son esenciales para reponer glucógeno muscular.",
      "recovery": "Piernas: 48-72h de recuperación antes del próximo estímulo pesado de piernas. Si sientes DOMS (agujetas) intensas, camina suave y toma baño frío de pies."
    }
  },
  {
    "id": 27,
    "phase": 2,
    "type": "B",
    "name": "Pecho — Banca pesada + aperturas cables (B5)",
    "intensity": "Alto",
    "duration": "65-75 min",
    "muscles": [
      "Pectoral mayor",
      "Tríceps",
      "Deltoides anterior"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta estática o elíptica",
        "20 círculos de hombros (adelante y atrás)",
        "15 aperturas de pecho con banda",
        "10 push-ups de rodilla lentos",
        "10 rotaciones de hombro con banda c/lado"
      ],
      "mobility": [
        "Apertura de pecho en marco de puerta (30 seg)",
        "Extensión de muñeca y antebrazo (20 seg c/lado)",
        "Rotación interna/externa de hombro (15 reps c/lado)"
      ],
      "mental": "El pecho y hombros definen tu postura. Cada press es una afirmación de fuerza. Activa el músculo desde el inicio, no solo mueves peso."
    },
    "workout": {
      "blocks": [
        {
          "name": "Press pesado",
          "exercises": [
            {
              "id": "bench_flat",
              "name": "Press de banca plano (barra)",
              "muscle": "Pectoral mayor, Tríceps, Deltoides ant.",
              "equip": "Barra + banco",
              "sets": "5",
              "reps": "8",
              "rest": "120 seg",
              "notes": "Fase de fuerza: 80% de tu máximo.",
              "weight_guide": ""
            },
            {
              "id": "bench_incline",
              "name": "Press inclinado 30° (barra)",
              "muscle": "Pectoral mayor superior, Deltoides ant.",
              "equip": "Barra + banco inclinado",
              "sets": "4",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Cable y aislamiento",
          "exercises": [
            {
              "id": "pec_dec",
              "name": "Pec deck (apertura máquina)",
              "muscle": "Pectoral mayor",
              "equip": "Máquina pec deck",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "cable_crossover_high",
              "name": "Cruce poleas alto a bajo",
              "muscle": "Pectoral mayor inferior",
              "equip": "Cables altos",
              "sets": "3",
              "reps": "14",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Tríceps",
          "exercises": [
            {
              "id": "skull_crusher",
              "name": "Press francés / skullcrusher",
              "muscle": "Tríceps (cabeza larga)",
              "equip": "Barra Z o mancuernas",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "dips_tricep",
              "name": "Fondos en banco (tríceps)",
              "muscle": "Tríceps",
              "equip": "Banco",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata suave",
        "Respiración profunda: 5 respiraciones largas"
      ],
      "stretches": [
        "Estiramiento pecho en marco de puerta (30 seg, 3 ángulos: bajo/medio/alto)",
        "Tríceps sobre la cabeza (35 seg c/lado)",
        "Cruce de brazo (deltoides anterior, 25 seg c/lado)",
        "Extensión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Proteína en los 45 min siguientes. Si entrenaste en ayunas, prioriza fuente rápida (suero de leche). El pecho requiere entre 0.3-0.4 g/kg de proteína por sesión para síntesis óptima.",
      "recovery": "48h de descanso antes de volver a empujar pesado. Puedes hacer cardio suave o espalda al día siguiente sin problema."
    }
  },
  {
    "id": 28,
    "phase": 2,
    "type": "C",
    "name": "Espalda + Bíceps — Remos pesados (C5)",
    "intensity": "Alto",
    "duration": "70-80 min",
    "muscles": [
      "Dorsal ancho",
      "Romboides",
      "Trapecio",
      "Bíceps"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min remo ergómetro suave",
        "15 retracciones escapulares con banda",
        "Colgarse de barra: 3 × 20 seg",
        "10 superman lentos en el suelo",
        "Rotación externa de hombro con banda: 15 reps c/lado"
      ],
      "mobility": [
        "Movilidad de hombro: círculos de brazo (20 c/dirección)",
        "Estiramiento de antebrazo dorsal (20 seg c/lado)",
        "Descompresión lumbar: colgado de barra 30 seg"
      ],
      "mental": "La espalda fuerte es el escudo del cuerpo. El 80% de los dolores lumbares se previenen con espalda fuerte. Cada jalón acerca tu objetivo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Dominadas y jalón",
          "exercises": [
            {
              "id": "pullup",
              "name": "Dominadas (agarre prono)",
              "muscle": "Dorsal ancho, Romboides, Bíceps",
              "equip": "Barra de dominadas",
              "sets": "4",
              "reps": "8-12",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "pulldown_neutral",
              "name": "Jalón agarre neutro",
              "muscle": "Dorsal ancho, Bíceps",
              "equip": "Polea + agarre neutro",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Remos",
          "exercises": [
            {
              "id": "row_bar",
              "name": "Remo con barra inclinado",
              "muscle": "Dorsal ancho, Romboides, Trapecio medio",
              "equip": "Barra",
              "sets": "4",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": "Pesado"
            },
            {
              "id": "row_db",
              "name": "Remo mancuerna unilateral",
              "muscle": "Dorsal ancho, Romboide, Trapecio",
              "equip": "Mancuerna + banco",
              "sets": "4",
              "reps": "12 c/lado",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "facepull",
              "name": "Facepull con cuerda",
              "muscle": "Trapecio inferior, Deltoides post., Manguito",
              "equip": "Cable alto + cuerda",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Bíceps + antebrazos",
          "exercises": [
            {
              "id": "curl_bar",
              "name": "Curl con barra recta o Z",
              "muscle": "Bíceps braquial",
              "equip": "Barra Z o recta",
              "sets": "4",
              "reps": "10",
              "rest": "75 seg",
              "notes": "4 series en Fase 2.",
              "weight_guide": ""
            },
            {
              "id": "curl_cable",
              "name": "Curl en polea baja",
              "muscle": "Bíceps braquial",
              "equip": "Cable bajo",
              "sets": "3",
              "reps": "14",
              "rest": "60 seg",
              "notes": "Tensión constante del cable.",
              "weight_guide": ""
            },
            {
              "id": "farmers_walk",
              "name": "Farmer's walk (caminata granjero)",
              "muscle": "Antebrazos, Core, Trapecio superior",
              "equip": "Mancuernas pesadas",
              "sets": "3",
              "reps": "40m",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata o trote suave",
        "Colgado de barra: 30 seg (descompresión)",
        "Respiración profunda: 5 ciclos"
      ],
      "stretches": [
        "Estiramiento dorsal: brazo en alto con inclinación lateral (30 seg c/lado)",
        "Bíceps contra pared, palma arriba (25 seg c/lado)",
        "Gato-vaca en el suelo: 10 reps lentas",
        "Niño extendido con brazos al frente (45 seg)",
        "Extensión y flexión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Alta demanda proteica: la espalda es el grupo muscular más grande de la parte superior. Prioriza 30-40g de proteína en los 60 min post-entreno.",
      "recovery": "La espalda y bíceps se recuperan en 48-72h. Si sientes rigidez lumbar, aplica calor suave y haz movilidad de cadera al día siguiente."
    }
  },
  {
    "id": 29,
    "phase": 2,
    "type": "E",
    "name": "Cardio — Trote 30 min + Core intensivo",
    "intensity": "Medio",
    "duration": "60-70 min",
    "muscles": [
      "Sistema cardiovascular",
      "Core",
      "Estabilizadores"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata suave",
        "10 círculos de tobillo c/lado",
        "Extensiones de pantorrilla lentas: 20 reps",
        "Elevaciones de rodilla marchando: 30 seg"
      ],
      "mobility": [
        "Estiramiento dinámico de cuádriceps (10 c/lado)",
        "Estiramiento isquiotibial de pie (20 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)"
      ],
      "mental": "El cardio es una meditación en movimiento. Hoy no compites contra nadie. Solo construyes tu motor aeróbico ladrillo a ladrillo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Cardio",
          "exercises": [
            {
              "id": "treadmill_jog",
              "name": "Trote continuo",
              "muscle": "Sistema cardiovascular, Pantorrillas",
              "equip": "Cinta / parque",
              "sets": "1",
              "reps": "30 min",
              "rest": "--",
              "notes": "30 min continuos. Gran logro si lo alcanzas.",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Core intensivo post-cardio",
          "exercises": [
            {
              "id": "pallof_press",
              "name": "Pallof press (anti-rotacional)",
              "muscle": "Oblicuos, Core anti-rotación",
              "equip": "Cable o banda",
              "sets": "3",
              "reps": "12 c/lado",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "cable_chop",
              "name": "Cable chop (diagonal)",
              "muscle": "Oblicuos, Rotadores de tronco",
              "equip": "Cable",
              "sets": "3",
              "reps": "12 c/lado",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "russian_twist",
              "name": "Russian twist",
              "muscle": "Oblicuos interno y externo",
              "equip": "Disco o balón",
              "sets": "3",
              "reps": "20",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": "Disco 5-10 kg"
            },
            {
              "id": "hollow_body",
              "name": "Hollow body hold",
              "muscle": "Core completo, Transverso",
              "equip": "Peso corporal",
              "sets": "3",
              "reps": "30 seg",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata muy lenta",
        "Respiración controlada: 5 min sentado"
      ],
      "stretches": [
        "Psoas (estocada estática): 45 seg c/lado",
        "Piriforme/paloma en suelo: 45 seg c/lado",
        "Isquiotibiales con cinta: 40 seg c/lado",
        "Apertura de pecho en suelo (brazos en T): 60 seg",
        "Perro boca abajo: 45 seg",
        "Pose del niño: 60 seg",
        "Savasana / respiración consciente: 3 min"
      ],
      "nutrition": "El cardio quema glucógeno. Repón con carbohidratos en los 30 min siguientes si vas a entrenar mañana. Si es día de recuperación, puedes priorizar proteína y grasas buenas.",
      "recovery": "Hidratación post-cardio: repón electrolitos si sudaste mucho (agua con limón + pizca de sal). El cardio activa el sistema parasimpático si lo mantienes aeróbico."
    }
  },
  {
    "id": 30,
    "phase": 2,
    "type": "F",
    "name": "Full Body — Fuerza y potencia (F4)",
    "intensity": "Alto",
    "duration": "70-80 min",
    "muscles": [
      "Full body: todos los grupos"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "7 min trote suave",
        "10 jumping jacks",
        "10 sentadillas cuerpo libre",
        "10 push-ups de rodilla",
        "10 remo con banda",
        "5 burpees lentos"
      ],
      "mobility": [
        "Gato-vaca: 10 reps lentas",
        "Apertura de cadera 90/90: 30 seg c/lado",
        "Movilidad de hombros: círculos 20 c/dirección"
      ],
      "mental": "El full body te entrena como atleta completo. Cada patrón de movimiento (empuje, tirón, sentadilla, bisagra) te hace más funcional en la vida real."
    },
    "workout": {
      "blocks": [
        {
          "name": "Compuestos pesados (3 rondas)",
          "exercises": [
            {
              "id": "squat_bar",
              "name": "Sentadilla trasera (barra)",
              "muscle": "Cuádriceps, Glúteo mayor",
              "equip": "Barra + Rack",
              "sets": "3",
              "reps": "8",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": "Pesado"
            },
            {
              "id": "bench_flat",
              "name": "Press de banca plano (barra)",
              "muscle": "Pectoral mayor, Tríceps, Deltoides ant.",
              "equip": "Barra + banco",
              "sets": "3",
              "reps": "8",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "row_bar",
              "name": "Remo con barra inclinado",
              "muscle": "Dorsal ancho, Romboides, Trapecio medio",
              "equip": "Barra",
              "sets": "3",
              "reps": "8",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "ohp_bar",
              "name": "Press militar con barra (de pie)",
              "muscle": "Deltoides anterior, Tríceps, Core",
              "equip": "Barra",
              "sets": "3",
              "reps": "8",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Cardio metabólico",
          "exercises": [
            {
              "id": "burpee",
              "name": "Burpee",
              "muscle": "Full body, Sistema cardiovascular",
              "equip": "Peso corporal",
              "sets": "4",
              "reps": "10",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "box_jump",
              "name": "Salto al cajón (box jump)",
              "muscle": "Cuádriceps, Glúteo, Pantorrillas, Potencia",
              "equip": "Cajón pliométrico",
              "sets": "4",
              "reps": "8",
              "rest": "60 seg",
              "notes": "Cajón pliométrico. Aterriza suave.",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave",
        "Respiración: 4 inhala / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps (30 seg c/lado)",
        "Isquiotibiales (30 seg c/lado)",
        "Pecho en marco de puerta (25 seg)",
        "Dorsal en inclinación (25 seg c/lado)",
        "Rotación espinal tumbado (25 seg c/lado)",
        "Niño extendido (45 seg)"
      ],
      "nutrition": "Sesión full body: alta demanda energética. Meal completa: 30-40g proteína + 60-80g carbohidratos + verduras. Es tu mejor momento para absorber nutrientes.",
      "recovery": "El full body genera más fatiga sistémica que un split. Descansa 48h antes del próximo full body. Un día de cardio suave o movilidad entre sesiones es ideal."
    }
  },
  {
    "id": 31,
    "phase": 2,
    "type": "A",
    "name": "Piernas — Peso muerto sumo + zancada búlgara (A7)",
    "intensity": "Alto",
    "duration": "75-85 min",
    "muscles": [
      "Glúteo mayor",
      "Aductores",
      "Isquiotibiales",
      "Cuádriceps"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata rápida o trote suave",
        "20 círculos de cadera (10 c/lado)",
        "15 sentadillas de activación sin peso",
        "10 puentes de glúteo lentos",
        "10 rotaciones de rodilla c/lado"
      ],
      "mobility": [
        "Movilidad tobillo: círculos + flexión (30 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)",
        "Desbloqueo psoas: rodilla en suelo, inclinación adelante (20 seg c/lado)"
      ],
      "mental": "Visualiza la sesión completa. El tren inferior es el motor del cuerpo. Cada rep construye la base de tu maratón."
    },
    "workout": {
      "blocks": [
        {
          "name": "Compound",
          "exercises": [
            {
              "id": "sumo_dl",
              "name": "Peso muerto sumo",
              "muscle": "Isquiotibiales, Glúteos, Aductores",
              "equip": "Barra",
              "sets": "4",
              "reps": "8",
              "rest": "120 seg",
              "notes": "Peso muerto sumo: pies abiertos, mayor glúteo y aductores.",
              "weight_guide": ""
            },
            {
              "id": "rdl",
              "name": "Peso muerto rumano",
              "muscle": "Isquiotibiales, Glúteo mayor, Erectores",
              "equip": "Barra o mancuernas",
              "sets": "3",
              "reps": "12",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Unilateral y glúteo",
          "exercises": [
            {
              "id": "bulgarian",
              "name": "Zancada búlgara (pie elevado)",
              "muscle": "Cuádriceps, Glúteo mayor/medio",
              "equip": "Mancuernas + banco",
              "sets": "4",
              "reps": "10 c/pierna",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": "Mancuernas"
            },
            {
              "id": "hip_thrust",
              "name": "Hip thrust (barra)",
              "muscle": "Glúteo mayor",
              "equip": "Barra + banco",
              "sets": "3",
              "reps": "15",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "abduction_cable",
              "name": "Abducción cadera (cable)",
              "muscle": "Glúteo medio",
              "equip": "Cable bajo",
              "sets": "3",
              "reps": "15 c/lado",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Pantorrillas y core",
          "exercises": [
            {
              "id": "calf_machine",
              "name": "Extensión de pantorrilla (máquina)",
              "muscle": "Gastrocnemio, Sóleo",
              "equip": "Máquina pantorrilla",
              "sets": "4",
              "reps": "20",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "ab_wheel",
              "name": "Rueda abdominal (ab wheel)",
              "muscle": "Transverso, Recto abdominal, Dorsal",
              "equip": "Ab wheel",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "dead_bug",
              "name": "Dead bug (bicho muerto)",
              "muscle": "Transverso, Core anti-extensión",
              "equip": "Peso corporal",
              "sets": "3",
              "reps": "10 c/lado",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave para bajar FC",
        "Respiración: 4 inhala / 4 retén / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps de pie (40 seg c/lado)",
        "Isquiotibial con banda o toalla (40 seg c/lado)",
        "Paloma/figura 4 glúteo en suelo (45 seg c/lado)",
        "Aductor sentado pies juntos (30 seg)",
        "Pantorrilla contra pared (25 seg c/lado)",
        "Torsión espinal tumbado (30 seg c/lado)"
      ],
      "nutrition": "Ingiere proteína + carbohidrato en los 30-60 min siguientes (ej: batido de proteína + plátano, o arroz con pollo). Los carbohidratos post-piernas son esenciales para reponer glucógeno muscular.",
      "recovery": "Piernas: 48-72h de recuperación antes del próximo estímulo pesado de piernas. Si sientes DOMS (agujetas) intensas, camina suave y toma baño frío de pies."
    }
  },
  {
    "id": 32,
    "phase": 2,
    "type": "D",
    "name": "Hombros — Superseries posterior + manguito (D5)",
    "intensity": "Medio-Alto",
    "duration": "65-75 min",
    "muscles": [
      "Deltoides posterior",
      "Manguito rotador",
      "Trapecio medio/inferior"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta o elíptica",
        "Rotación externa con banda: 15 reps c/lado",
        "15 encogimientos circulares de hombros",
        "Y-T-W con banda elástica: 10 reps c/posición",
        "10 elevaciones frontales muy ligeras"
      ],
      "mobility": [
        "Péndulo de brazo: 30 seg c/lado",
        "Sleeper stretch (rotación interna): 20 seg c/lado",
        "Estiramiento cruzado de hombro: 20 seg c/lado"
      ],
      "mental": "Los hombros son el punto débil más frecuente. Trabaja siempre con control, nunca con inercia. El manguito rotador vale más que el peso en la barra."
    },
    "workout": {
      "blocks": [
        {
          "name": "Press y lateral",
          "exercises": [
            {
              "id": "ohp_db",
              "name": "Press militar con mancuernas",
              "muscle": "Deltoides anterior y lateral, Tríceps",
              "equip": "Mancuernas",
              "sets": "4",
              "reps": "12",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "lateral_raise",
              "name": "Elevación lateral (mancuernas)",
              "muscle": "Deltoides lateral",
              "equip": "Mancuernas",
              "sets": "3",
              "reps": "14",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Superserie posterior (3 rondas)",
          "exercises": [
            {
              "id": "rear_delt_fly",
              "name": "Pájaro (deltoides posterior)",
              "muscle": "Deltoides posterior, Romboides",
              "equip": "Mancuernas (tronco inclinado)",
              "sets": "3",
              "reps": "15",
              "rest": "10 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "facepull",
              "name": "Facepull con cuerda",
              "muscle": "Trapecio inferior, Deltoides post., Manguito",
              "equip": "Cable alto + cuerda",
              "sets": "3",
              "reps": "15",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Manguito y trapecio",
          "exercises": [
            {
              "id": "rotator_cable",
              "name": "Rotación externa en cable",
              "muscle": "Manguito rotador",
              "equip": "Cable bajo",
              "sets": "3",
              "reps": "15 c/lado",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "yt_w",
              "name": "Y-T-W con mancuernas (tumbado)",
              "muscle": "Trapecio, Romboides, Manguito rotador",
              "equip": "Mancuernas ligeras",
              "sets": "3",
              "reps": "10 c/posición",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "shrug_db",
              "name": "Encogimiento de hombros (mancuernas)",
              "muscle": "Trapecio superior",
              "equip": "Mancuernas",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min movilidad suave de hombros: péndulos y círculos",
        "Respiración diafragmática: 3 min"
      ],
      "stretches": [
        "Estiramiento sleeper (rotación interna): 30 seg c/lado",
        "Cruzado de hombro: 30 seg c/lado",
        "Trapecio: inclinación lateral de cabeza (25 seg c/lado)",
        "Extensión de hombro posterior: brazo cruzado bajo (25 seg c/lado)"
      ],
      "nutrition": "Los hombros son articulaciones complejas: además de proteína, asegura ingesta de colágeno (gelatina o suplemento) para salud del manguito rotador.",
      "recovery": "Los hombros se involucran en casi todos los ejercicios. Prioriza el descanso de este grupo si sientes fatiga articular. Masaje suave en zona del trapecio si hay tensión."
    }
  },
  {
    "id": 33,
    "phase": 2,
    "type": "B",
    "name": "Pecho + Tríceps — Push-ups avanzados + press declinado (B6)",
    "intensity": "Alto",
    "duration": "65-75 min",
    "muscles": [
      "Pectoral mayor (inferior)",
      "Tríceps",
      "Serrato"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta estática o elíptica",
        "20 círculos de hombros (adelante y atrás)",
        "15 aperturas de pecho con banda",
        "10 push-ups de rodilla lentos",
        "10 rotaciones de hombro con banda c/lado"
      ],
      "mobility": [
        "Apertura de pecho en marco de puerta (30 seg)",
        "Extensión de muñeca y antebrazo (20 seg c/lado)",
        "Rotación interna/externa de hombro (15 reps c/lado)"
      ],
      "mental": "El pecho y hombros definen tu postura. Cada press es una afirmación de fuerza. Activa el músculo desde el inicio, no solo mueves peso."
    },
    "workout": {
      "blocks": [
        {
          "name": "Empuje compuesto",
          "exercises": [
            {
              "id": "bench_decline",
              "name": "Press declinado (barra)",
              "muscle": "Pectoral mayor inferior, Tríceps",
              "equip": "Barra + banco declinado",
              "sets": "4",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "db_press_flat",
              "name": "Press de banca plano (mancuernas)",
              "muscle": "Pectoral mayor, Serrato anterior",
              "equip": "Mancuernas + banco",
              "sets": "4",
              "reps": "12",
              "rest": "90 seg",
              "notes": "Mancuernas: rango completo.",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Aislamiento pecho",
          "exercises": [
            {
              "id": "pec_dec",
              "name": "Pec deck (apertura máquina)",
              "muscle": "Pectoral mayor",
              "equip": "Máquina pec deck",
              "sets": "3",
              "reps": "15",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "cable_crossover_high",
              "name": "Cruce poleas alto a bajo",
              "muscle": "Pectoral mayor inferior",
              "equip": "Cables altos",
              "sets": "3",
              "reps": "14",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Tríceps",
          "exercises": [
            {
              "id": "overhead_ext_db",
              "name": "Extensión overhead (mancuerna)",
              "muscle": "Tríceps cabeza larga",
              "equip": "Mancuerna",
              "sets": "3",
              "reps": "14",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "tricep_bar_pushdown",
              "name": "Extensión tríceps (barra recta/V)",
              "muscle": "Tríceps lateral y medial",
              "equip": "Cable + barra V",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "close_grip_bench",
              "name": "Press banca agarre cerrado",
              "muscle": "Tríceps (énfasis), Pectoral interno",
              "equip": "Barra + banco",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata suave",
        "Respiración profunda: 5 respiraciones largas"
      ],
      "stretches": [
        "Estiramiento pecho en marco de puerta (30 seg, 3 ángulos: bajo/medio/alto)",
        "Tríceps sobre la cabeza (35 seg c/lado)",
        "Cruce de brazo (deltoides anterior, 25 seg c/lado)",
        "Extensión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Proteína en los 45 min siguientes. Si entrenaste en ayunas, prioriza fuente rápida (suero de leche). El pecho requiere entre 0.3-0.4 g/kg de proteína por sesión para síntesis óptima.",
      "recovery": "48h de descanso antes de volver a empujar pesado. Puedes hacer cardio suave o espalda al día siguiente sin problema."
    }
  },
  {
    "id": 34,
    "phase": 2,
    "type": "C",
    "name": "Espalda + Bíceps — Chin-ups + curl predicador (C6)",
    "intensity": "Alto",
    "duration": "70-80 min",
    "muscles": [
      "Dorsal ancho",
      "Romboides",
      "Bíceps (pico)",
      "Antebrazos"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min remo ergómetro suave",
        "15 retracciones escapulares con banda",
        "Colgarse de barra: 3 × 20 seg",
        "10 superman lentos en el suelo",
        "Rotación externa de hombro con banda: 15 reps c/lado"
      ],
      "mobility": [
        "Movilidad de hombro: círculos de brazo (20 c/dirección)",
        "Estiramiento de antebrazo dorsal (20 seg c/lado)",
        "Descompresión lumbar: colgado de barra 30 seg"
      ],
      "mental": "La espalda fuerte es el escudo del cuerpo. El 80% de los dolores lumbares se previenen con espalda fuerte. Cada jalón acerca tu objetivo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Tirón vertical",
          "exercises": [
            {
              "id": "chinup",
              "name": "Chin-up (agarre supino)",
              "muscle": "Dorsal ancho, Bíceps (énfasis)",
              "equip": "Barra de dominadas",
              "sets": "4",
              "reps": "8-12",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "pulldown_supine",
              "name": "Jalón agarre supino",
              "muscle": "Dorsal ancho inferior, Bíceps",
              "equip": "Polea + barra",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Remos",
          "exercises": [
            {
              "id": "row_tbar",
              "name": "Remo T-bar",
              "muscle": "Dorsal ancho, Romboides, Trapecio",
              "equip": "T-bar o barra",
              "sets": "4",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "row_cable",
              "name": "Remo en cable agarre neutro",
              "muscle": "Dorsal ancho, Romboides",
              "equip": "Cable bajo",
              "sets": "3",
              "reps": "14",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "facepull",
              "name": "Facepull con cuerda",
              "muscle": "Trapecio inferior, Deltoides post., Manguito",
              "equip": "Cable alto + cuerda",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Bíceps especializado",
          "exercises": [
            {
              "id": "curl_preacher",
              "name": "Curl predicador (máquina o barra)",
              "muscle": "Bíceps braquial (porción corta)",
              "equip": "Máquina predicador",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "curl_incline",
              "name": "Curl en banco inclinado",
              "muscle": "Bíceps (cabeza larga, estiramiento)",
              "equip": "Mancuernas + banco inclinado",
              "sets": "3",
              "reps": "12 c/lado",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "curl_rope",
              "name": "Curl con cuerda en cable",
              "muscle": "Braquiorradial, Braquial",
              "equip": "Cable + cuerda",
              "sets": "3",
              "reps": "14",
              "rest": "60 seg",
              "notes": "Cuerda en cable: martillo pero con tensión constante.",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata o trote suave",
        "Colgado de barra: 30 seg (descompresión)",
        "Respiración profunda: 5 ciclos"
      ],
      "stretches": [
        "Estiramiento dorsal: brazo en alto con inclinación lateral (30 seg c/lado)",
        "Bíceps contra pared, palma arriba (25 seg c/lado)",
        "Gato-vaca en el suelo: 10 reps lentas",
        "Niño extendido con brazos al frente (45 seg)",
        "Extensión y flexión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Alta demanda proteica: la espalda es el grupo muscular más grande de la parte superior. Prioriza 30-40g de proteína en los 60 min post-entreno.",
      "recovery": "La espalda y bíceps se recuperan en 48-72h. Si sientes rigidez lumbar, aplica calor suave y haz movilidad de cadera al día siguiente."
    }
  },
  {
    "id": 35,
    "phase": 2,
    "type": "E",
    "name": "Cardio — Intervalos + Movilidad profunda",
    "intensity": "Medio",
    "duration": "60-70 min",
    "muscles": [
      "Sistema cardiovascular (zona 3)",
      "Flexibilidad total"
    ],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata suave",
        "10 círculos de tobillo c/lado",
        "Extensiones de pantorrilla lentas: 20 reps",
        "Elevaciones de rodilla marchando: 30 seg"
      ],
      "mobility": [
        "Estiramiento dinámico de cuádriceps (10 c/lado)",
        "Estiramiento isquiotibial de pie (20 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)"
      ],
      "mental": "El cardio es una meditación en movimiento. Hoy no compites contra nadie. Solo construyes tu motor aeróbico ladrillo a ladrillo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Cardio intervalado",
          "exercises": [
            {
              "id": "treadmill_jog",
              "name": "Trote continuo",
              "muscle": "Sistema cardiovascular, Pantorrillas",
              "equip": "Cinta / parque",
              "sets": "8",
              "reps": "2 min rápido / 1 min caminar",
              "rest": "--",
              "notes": "Más intenso que antes: 85% de FC max en los intervalos.",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Movilidad profunda",
          "exercises": [
            {
              "id": "mobility_hip",
              "name": "Movilidad de cadera 90/90",
              "muscle": "Cápsula articular cadera, Glúteo",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "60 seg c/lado",
              "rest": "20 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "pigeon",
              "name": "Paloma / figura 4 (piriforme)",
              "muscle": "Piriforme, Glúteo profundo",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "50 seg c/lado",
              "rest": "20 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "psoas_stretch",
              "name": "Estiramiento de psoas (estocada)",
              "muscle": "Psoas, Recto femoral",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "45 seg c/lado",
              "rest": "20 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "hollow_body",
              "name": "Hollow body hold",
              "muscle": "Core completo, Transverso",
              "equip": "Peso corporal",
              "sets": "3",
              "reps": "30 seg",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata muy lenta",
        "Respiración controlada: 5 min sentado"
      ],
      "stretches": [
        "Psoas (estocada estática): 45 seg c/lado",
        "Piriforme/paloma en suelo: 45 seg c/lado",
        "Isquiotibiales con cinta: 40 seg c/lado",
        "Apertura de pecho en suelo (brazos en T): 60 seg",
        "Perro boca abajo: 45 seg",
        "Pose del niño: 60 seg",
        "Savasana / respiración consciente: 3 min"
      ],
      "nutrition": "El cardio quema glucógeno. Repón con carbohidratos en los 30 min siguientes si vas a entrenar mañana. Si es día de recuperación, puedes priorizar proteína y grasas buenas.",
      "recovery": "Hidratación post-cardio: repón electrolitos si sudaste mucho (agua con limón + pizca de sal). El cardio activa el sistema parasimpático si lo mantienes aeróbico."
    }
  },
  {
    "id": 36,
    "phase": 2,
    "type": "A",
    "name": "Piernas — Prensa pesada + hack squat (A8)",
    "intensity": "Alto",
    "duration": "75-85 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata rápida o trote suave",
        "20 círculos de cadera (10 c/lado)",
        "15 sentadillas de activación sin peso",
        "10 puentes de glúteo lentos",
        "10 rotaciones de rodilla c/lado"
      ],
      "mobility": [
        "Movilidad tobillo: círculos + flexión (30 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)",
        "Desbloqueo psoas: rodilla en suelo, inclinación adelante (20 seg c/lado)"
      ],
      "mental": "Visualiza la sesión completa. El tren inferior es el motor del cuerpo. Cada rep construye la base de tu maratón."
    },
    "workout": {
      "blocks": [
        {
          "name": "Máquinas pesadas",
          "exercises": [
            {
              "id": "leg_press",
              "name": "Prensa de pierna (máquina)",
              "muscle": "Cuádriceps, Glúteo",
              "equip": "Máquina prensa",
              "sets": "4",
              "reps": "10",
              "rest": "120 seg",
              "notes": "Pies altos: más glúteo. Pies bajos: más cuádriceps.",
              "weight_guide": ""
            },
            {
              "id": "squat_hack",
              "name": "Hack squat (máquina)",
              "muscle": "Cuádriceps (énfasis vasto ext.)",
              "equip": "Máquina hack squat",
              "sets": "4",
              "reps": "10",
              "rest": "120 seg",
              "notes": "Hack squat: excelente para vastos. Rodillas no pasan los pies.",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Isquiotibiales y glúteo",
          "exercises": [
            {
              "id": "leg_curl_lying",
              "name": "Curl de isquiotibiales tumbado",
              "muscle": "Isquiotibiales",
              "equip": "Máquina curl tumbado",
              "sets": "3",
              "reps": "15",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "clamshell",
              "name": "Clamshell con banda",
              "muscle": "Glúteo medio y menor",
              "equip": "Banda elástica",
              "sets": "3",
              "reps": "20 c/lado",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "abduction_machine",
              "name": "Abducción cadera (máquina)",
              "muscle": "Glúteo medio y menor, Abductores",
              "equip": "Máquina abducción",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Pantorrillas y Core",
          "exercises": [
            {
              "id": "calf_seated",
              "name": "Elevación pantorrilla sentado",
              "muscle": "Sóleo (énfasis)",
              "equip": "Máquina sentado o mancuerna",
              "sets": "3",
              "reps": "20",
              "rest": "45 seg",
              "notes": "Sóleo: silla. Rodilla doblada.",
              "weight_guide": ""
            },
            {
              "id": "pallof_press",
              "name": "Pallof press (anti-rotacional)",
              "muscle": "Oblicuos, Core anti-rotación",
              "equip": "Cable o banda",
              "sets": "3",
              "reps": "12 c/lado",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave para bajar FC",
        "Respiración: 4 inhala / 4 retén / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps de pie (40 seg c/lado)",
        "Isquiotibial con banda o toalla (40 seg c/lado)",
        "Paloma/figura 4 glúteo en suelo (45 seg c/lado)",
        "Aductor sentado pies juntos (30 seg)",
        "Pantorrilla contra pared (25 seg c/lado)",
        "Torsión espinal tumbado (30 seg c/lado)"
      ],
      "nutrition": "Ingiere proteína + carbohidrato en los 30-60 min siguientes (ej: batido de proteína + plátano, o arroz con pollo). Los carbohidratos post-piernas son esenciales para reponer glucógeno muscular.",
      "recovery": "Piernas: 48-72h de recuperación antes del próximo estímulo pesado de piernas. Si sientes DOMS (agujetas) intensas, camina suave y toma baño frío de pies."
    }
  },
  {
    "id": 37,
    "phase": 2,
    "type": "F",
    "name": "Full Body — Potencia explosiva (F5)",
    "intensity": "Alto",
    "duration": "65-75 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "7 min trote suave",
        "10 jumping jacks",
        "10 sentadillas cuerpo libre",
        "10 push-ups de rodilla",
        "10 remo con banda",
        "5 burpees lentos"
      ],
      "mobility": [
        "Gato-vaca: 10 reps lentas",
        "Apertura de cadera 90/90: 30 seg c/lado",
        "Movilidad de hombros: círculos 20 c/dirección"
      ],
      "mental": "El full body te entrena como atleta completo. Cada patrón de movimiento (empuje, tirón, sentadilla, bisagra) te hace más funcional en la vida real."
    },
    "workout": {
      "blocks": [
        {
          "name": "Potencia (3 series)",
          "exercises": [
            {
              "id": "box_jump",
              "name": "Salto al cajón (box jump)",
              "muscle": "Cuádriceps, Glúteo, Pantorrillas, Potencia",
              "equip": "Cajón pliométrico",
              "sets": "3",
              "reps": "6",
              "rest": "90 seg",
              "notes": "Aterriza con las rodillas levemente flexionadas.",
              "weight_guide": ""
            },
            {
              "id": "squat_bar",
              "name": "Sentadilla trasera (barra)",
              "muscle": "Cuádriceps, Glúteo mayor",
              "equip": "Barra + Rack",
              "sets": "3",
              "reps": "6",
              "rest": "90 seg",
              "notes": "Velocidad controlada en la subida.",
              "weight_guide": "Moderado-pesado"
            },
            {
              "id": "bench_flat",
              "name": "Press de banca plano (barra)",
              "muscle": "Pectoral mayor, Tríceps, Deltoides ant.",
              "equip": "Barra + banco",
              "sets": "3",
              "reps": "6",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Cardio potencia (4 rondas)",
          "exercises": [
            {
              "id": "burpee",
              "name": "Burpee",
              "muscle": "Full body, Sistema cardiovascular",
              "equip": "Peso corporal",
              "sets": "4",
              "reps": "10",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "jump_rope",
              "name": "Comba / soga de saltar",
              "muscle": "Sistema cardiovascular, Pantorrillas, Coordinación",
              "equip": "Comba",
              "sets": "4",
              "reps": "60 seg",
              "rest": "30 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave",
        "Respiración: 4 inhala / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps (30 seg c/lado)",
        "Isquiotibiales (30 seg c/lado)",
        "Pecho en marco de puerta (25 seg)",
        "Dorsal en inclinación (25 seg c/lado)",
        "Rotación espinal tumbado (25 seg c/lado)",
        "Niño extendido (45 seg)"
      ],
      "nutrition": "Sesión full body: alta demanda energética. Meal completa: 30-40g proteína + 60-80g carbohidratos + verduras. Es tu mejor momento para absorber nutrientes.",
      "recovery": "El full body genera más fatiga sistémica que un split. Descansa 48h antes del próximo full body. Un día de cardio suave o movilidad entre sesiones es ideal."
    }
  },
  {
    "id": 38,
    "phase": 2,
    "type": "B",
    "name": "Pecho — Variación máquinas + cable intensivo (B7)",
    "intensity": "Medio-Alto",
    "duration": "60-70 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta estática o elíptica",
        "20 círculos de hombros (adelante y atrás)",
        "15 aperturas de pecho con banda",
        "10 push-ups de rodilla lentos",
        "10 rotaciones de hombro con banda c/lado"
      ],
      "mobility": [
        "Apertura de pecho en marco de puerta (30 seg)",
        "Extensión de muñeca y antebrazo (20 seg c/lado)",
        "Rotación interna/externa de hombro (15 reps c/lado)"
      ],
      "mental": "El pecho y hombros definen tu postura. Cada press es una afirmación de fuerza. Activa el músculo desde el inicio, no solo mueves peso."
    },
    "workout": {
      "blocks": [
        {
          "name": "Máquinas y cable",
          "exercises": [
            {
              "id": "chest_press_machine",
              "name": "Press de pecho (máquina)",
              "muscle": "Pectoral mayor",
              "equip": "Máquina press pecho",
              "sets": "4",
              "reps": "12",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "cable_crossover_low",
              "name": "Cruce poleas bajo a alto",
              "muscle": "Pectoral mayor superior",
              "equip": "Cables bajos",
              "sets": "3",
              "reps": "14",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "cable_crossover_high",
              "name": "Cruce poleas alto a bajo",
              "muscle": "Pectoral mayor inferior",
              "equip": "Cables altos",
              "sets": "3",
              "reps": "14",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Compound libre",
          "exercises": [
            {
              "id": "db_press_incline",
              "name": "Press inclinado (mancuernas)",
              "muscle": "Pectoral mayor superior",
              "equip": "Mancuernas + banco inclinado",
              "sets": "3",
              "reps": "12",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "dips_chest",
              "name": "Fondos en paralelas (pecho)",
              "muscle": "Pectoral mayor inferior, Tríceps",
              "equip": "Paralelas",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Tríceps",
          "exercises": [
            {
              "id": "tricep_pushdown",
              "name": "Extensión tríceps (cuerda/cable)",
              "muscle": "Tríceps (3 cabezas)",
              "equip": "Cable + cuerda",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "skull_crusher",
              "name": "Press francés / skullcrusher",
              "muscle": "Tríceps (cabeza larga)",
              "equip": "Barra Z o mancuernas",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata suave",
        "Respiración profunda: 5 respiraciones largas"
      ],
      "stretches": [
        "Estiramiento pecho en marco de puerta (30 seg, 3 ángulos: bajo/medio/alto)",
        "Tríceps sobre la cabeza (35 seg c/lado)",
        "Cruce de brazo (deltoides anterior, 25 seg c/lado)",
        "Extensión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Proteína en los 45 min siguientes. Si entrenaste en ayunas, prioriza fuente rápida (suero de leche). El pecho requiere entre 0.3-0.4 g/kg de proteína por sesión para síntesis óptima.",
      "recovery": "48h de descanso antes de volver a empujar pesado. Puedes hacer cardio suave o espalda al día siguiente sin problema."
    }
  },
  {
    "id": 39,
    "phase": 2,
    "type": "C",
    "name": "Espalda — Remo T-bar pesado + bíceps curl spider (C7)",
    "intensity": "Alto",
    "duration": "70-80 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min remo ergómetro suave",
        "15 retracciones escapulares con banda",
        "Colgarse de barra: 3 × 20 seg",
        "10 superman lentos en el suelo",
        "Rotación externa de hombro con banda: 15 reps c/lado"
      ],
      "mobility": [
        "Movilidad de hombro: círculos de brazo (20 c/dirección)",
        "Estiramiento de antebrazo dorsal (20 seg c/lado)",
        "Descompresión lumbar: colgado de barra 30 seg"
      ],
      "mental": "La espalda fuerte es el escudo del cuerpo. El 80% de los dolores lumbares se previenen con espalda fuerte. Cada jalón acerca tu objetivo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Remos pesados",
          "exercises": [
            {
              "id": "row_tbar",
              "name": "Remo T-bar",
              "muscle": "Dorsal ancho, Romboides, Trapecio",
              "equip": "T-bar o barra",
              "sets": "5",
              "reps": "8",
              "rest": "120 seg",
              "notes": "5 series: punto máximo de volumen en tirón.",
              "weight_guide": ""
            },
            {
              "id": "row_bar",
              "name": "Remo con barra inclinado",
              "muscle": "Dorsal ancho, Romboides, Trapecio medio",
              "equip": "Barra",
              "sets": "4",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Jalones",
          "exercises": [
            {
              "id": "pulldown_wide",
              "name": "Jalón al pecho agarre ancho",
              "muscle": "Dorsal ancho, Redondo mayor",
              "equip": "Polea + barra ancha",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "pulldown_neutral",
              "name": "Jalón agarre neutro",
              "muscle": "Dorsal ancho, Bíceps",
              "equip": "Polea + agarre neutro",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Bíceps y agarre",
          "exercises": [
            {
              "id": "curl_bar",
              "name": "Curl con barra recta o Z",
              "muscle": "Bíceps braquial",
              "equip": "Barra Z o recta",
              "sets": "4",
              "reps": "10",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "curl_conc",
              "name": "Curl concentrado (mancuerna)",
              "muscle": "Bíceps braquial (pico)",
              "equip": "Mancuerna + banco",
              "sets": "3",
              "reps": "12 c/lado",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "wrist_ext",
              "name": "Extensión de muñeca",
              "muscle": "Extensores del antebrazo",
              "equip": "Barra o mancuerna",
              "sets": "2",
              "reps": "20",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata o trote suave",
        "Colgado de barra: 30 seg (descompresión)",
        "Respiración profunda: 5 ciclos"
      ],
      "stretches": [
        "Estiramiento dorsal: brazo en alto con inclinación lateral (30 seg c/lado)",
        "Bíceps contra pared, palma arriba (25 seg c/lado)",
        "Gato-vaca en el suelo: 10 reps lentas",
        "Niño extendido con brazos al frente (45 seg)",
        "Extensión y flexión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Alta demanda proteica: la espalda es el grupo muscular más grande de la parte superior. Prioriza 30-40g de proteína en los 60 min post-entreno.",
      "recovery": "La espalda y bíceps se recuperan en 48-72h. Si sientes rigidez lumbar, aplica calor suave y haz movilidad de cadera al día siguiente."
    }
  },
  {
    "id": 40,
    "phase": 2,
    "type": "E",
    "name": "Cardio — Trote 35 min + flexibilidad",
    "intensity": "Medio",
    "duration": "65-75 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata suave",
        "10 círculos de tobillo c/lado",
        "Extensiones de pantorrilla lentas: 20 reps",
        "Elevaciones de rodilla marchando: 30 seg"
      ],
      "mobility": [
        "Estiramiento dinámico de cuádriceps (10 c/lado)",
        "Estiramiento isquiotibial de pie (20 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)"
      ],
      "mental": "El cardio es una meditación en movimiento. Hoy no compites contra nadie. Solo construyes tu motor aeróbico ladrillo a ladrillo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Trote continuo (récord personal)",
          "exercises": [
            {
              "id": "treadmill_jog",
              "name": "Trote continuo",
              "muscle": "Sistema cardiovascular, Pantorrillas",
              "equip": "Cinta / parque",
              "sets": "1",
              "reps": "35 min",
              "rest": "--",
              "notes": "35 min continuos: marca personal de Fase 2.",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Flexibilidad",
          "exercises": [
            {
              "id": "pigeon",
              "name": "Paloma / figura 4 (piriforme)",
              "muscle": "Piriforme, Glúteo profundo",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "50 seg c/lado",
              "rest": "20 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "psoas_stretch",
              "name": "Estiramiento de psoas (estocada)",
              "muscle": "Psoas, Recto femoral",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "45 seg c/lado",
              "rest": "20 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "mobility_thoracic",
              "name": "Apertura torácica con rodillo",
              "muscle": "Columna torácica, Pectoral",
              "equip": "Foam roller",
              "sets": "2",
              "reps": "60 seg",
              "rest": "20 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata muy lenta",
        "Respiración controlada: 5 min sentado"
      ],
      "stretches": [
        "Psoas (estocada estática): 45 seg c/lado",
        "Piriforme/paloma en suelo: 45 seg c/lado",
        "Isquiotibiales con cinta: 40 seg c/lado",
        "Apertura de pecho en suelo (brazos en T): 60 seg",
        "Perro boca abajo: 45 seg",
        "Pose del niño: 60 seg",
        "Savasana / respiración consciente: 3 min"
      ],
      "nutrition": "El cardio quema glucógeno. Repón con carbohidratos en los 30 min siguientes si vas a entrenar mañana. Si es día de recuperación, puedes priorizar proteína y grasas buenas.",
      "recovery": "Hidratación post-cardio: repón electrolitos si sudaste mucho (agua con limón + pizca de sal). El cardio activa el sistema parasimpático si lo mantienes aeróbico."
    }
  },
  {
    "id": 41,
    "phase": 2,
    "type": "D",
    "name": "Hombros — Press Arnold + Laterales drop set (D6)",
    "intensity": "Alto",
    "duration": "65-75 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta o elíptica",
        "Rotación externa con banda: 15 reps c/lado",
        "15 encogimientos circulares de hombros",
        "Y-T-W con banda elástica: 10 reps c/posición",
        "10 elevaciones frontales muy ligeras"
      ],
      "mobility": [
        "Péndulo de brazo: 30 seg c/lado",
        "Sleeper stretch (rotación interna): 20 seg c/lado",
        "Estiramiento cruzado de hombro: 20 seg c/lado"
      ],
      "mental": "Los hombros son el punto débil más frecuente. Trabaja siempre con control, nunca con inercia. El manguito rotador vale más que el peso en la barra."
    },
    "workout": {
      "blocks": [
        {
          "name": "Press y volumen",
          "exercises": [
            {
              "id": "arnold_press",
              "name": "Press Arnold",
              "muscle": "Deltoides (3 haces), Trapecio",
              "equip": "Mancuernas",
              "sets": "5",
              "reps": "10",
              "rest": "90 seg",
              "notes": "5 series en Arnold: mayor tiempo bajo tensión.",
              "weight_guide": ""
            },
            {
              "id": "lateral_raise",
              "name": "Elevación lateral (mancuernas)",
              "muscle": "Deltoides lateral",
              "equip": "Mancuernas",
              "sets": "4",
              "reps": "15-12-10-15",
              "rest": "60 seg",
              "notes": "Drop set en último set.",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Posterior y manguito",
          "exercises": [
            {
              "id": "rear_delt_fly",
              "name": "Pájaro (deltoides posterior)",
              "muscle": "Deltoides posterior, Romboides",
              "equip": "Mancuernas (tronco inclinado)",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "facepull",
              "name": "Facepull con cuerda",
              "muscle": "Trapecio inferior, Deltoides post., Manguito",
              "equip": "Cable alto + cuerda",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "rotator_band",
              "name": "Rotación externa con banda",
              "muscle": "Manguito rotador (infraespinoso, red. menor)",
              "equip": "Banda elástica",
              "sets": "3",
              "reps": "15 c/lado",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Trapecio",
          "exercises": [
            {
              "id": "shrug_bar",
              "name": "Encogimiento de hombros (barra)",
              "muscle": "Trapecio superior",
              "equip": "Barra",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min movilidad suave de hombros: péndulos y círculos",
        "Respiración diafragmática: 3 min"
      ],
      "stretches": [
        "Estiramiento sleeper (rotación interna): 30 seg c/lado",
        "Cruzado de hombro: 30 seg c/lado",
        "Trapecio: inclinación lateral de cabeza (25 seg c/lado)",
        "Extensión de hombro posterior: brazo cruzado bajo (25 seg c/lado)"
      ],
      "nutrition": "Los hombros son articulaciones complejas: además de proteína, asegura ingesta de colágeno (gelatina o suplemento) para salud del manguito rotador.",
      "recovery": "Los hombros se involucran en casi todos los ejercicios. Prioriza el descanso de este grupo si sientes fatiga articular. Masaje suave en zona del trapecio si hay tensión."
    }
  },
  {
    "id": 42,
    "phase": 2,
    "type": "A",
    "name": "Piernas — Sentadilla búlgara + nórdico (A9)",
    "intensity": "Alto",
    "duration": "75-85 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata rápida o trote suave",
        "20 círculos de cadera (10 c/lado)",
        "15 sentadillas de activación sin peso",
        "10 puentes de glúteo lentos",
        "10 rotaciones de rodilla c/lado"
      ],
      "mobility": [
        "Movilidad tobillo: círculos + flexión (30 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)",
        "Desbloqueo psoas: rodilla en suelo, inclinación adelante (20 seg c/lado)"
      ],
      "mental": "Visualiza la sesión completa. El tren inferior es el motor del cuerpo. Cada rep construye la base de tu maratón."
    },
    "workout": {
      "blocks": [
        {
          "name": "Compound",
          "exercises": [
            {
              "id": "squat_bar",
              "name": "Sentadilla trasera (barra)",
              "muscle": "Cuádriceps, Glúteo mayor",
              "equip": "Barra + Rack",
              "sets": "4",
              "reps": "8",
              "rest": "120 seg",
              "notes": "Carga máxima hasta ahora.",
              "weight_guide": ""
            },
            {
              "id": "rdl",
              "name": "Peso muerto rumano",
              "muscle": "Isquiotibiales, Glúteo mayor, Erectores",
              "equip": "Barra o mancuernas",
              "sets": "4",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Ejercicios avanzados",
          "exercises": [
            {
              "id": "nordic_curl",
              "name": "Nordic curl (curl nórdico)",
              "muscle": "Isquiotibiales",
              "equip": "Banco / compañero",
              "sets": "3",
              "reps": "6-8",
              "rest": "120 seg",
              "notes": "Curl nórdico: muy difícil. Asistencia con manos si es necesario.",
              "weight_guide": ""
            },
            {
              "id": "bulgarian",
              "name": "Zancada búlgara (pie elevado)",
              "muscle": "Cuádriceps, Glúteo mayor/medio",
              "equip": "Mancuernas + banco",
              "sets": "4",
              "reps": "10 c/pierna",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "abduction_cable",
              "name": "Abducción cadera (cable)",
              "muscle": "Glúteo medio",
              "equip": "Cable bajo",
              "sets": "3",
              "reps": "15 c/lado",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Core y pantorrillas",
          "exercises": [
            {
              "id": "dragon_flag",
              "name": "Dragon flag (nivel avanzado)",
              "muscle": "Core completo",
              "equip": "Banco",
              "sets": "3",
              "reps": "5-8",
              "rest": "90 seg",
              "notes": "Nivel avanzado. Progresión desde legs raise.",
              "weight_guide": ""
            },
            {
              "id": "calf_machine",
              "name": "Extensión de pantorrilla (máquina)",
              "muscle": "Gastrocnemio, Sóleo",
              "equip": "Máquina pantorrilla",
              "sets": "4",
              "reps": "20",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave para bajar FC",
        "Respiración: 4 inhala / 4 retén / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps de pie (40 seg c/lado)",
        "Isquiotibial con banda o toalla (40 seg c/lado)",
        "Paloma/figura 4 glúteo en suelo (45 seg c/lado)",
        "Aductor sentado pies juntos (30 seg)",
        "Pantorrilla contra pared (25 seg c/lado)",
        "Torsión espinal tumbado (30 seg c/lado)"
      ],
      "nutrition": "Ingiere proteína + carbohidrato en los 30-60 min siguientes (ej: batido de proteína + plátano, o arroz con pollo). Los carbohidratos post-piernas son esenciales para reponer glucógeno muscular.",
      "recovery": "Piernas: 48-72h de recuperación antes del próximo estímulo pesado de piernas. Si sientes DOMS (agujetas) intensas, camina suave y toma baño frío de pies."
    }
  },
  {
    "id": 43,
    "phase": 2,
    "type": "B",
    "name": "Pecho + Tríceps — Banca pesada y dips con peso (B8)",
    "intensity": "Alto",
    "duration": "65-75 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta estática o elíptica",
        "20 círculos de hombros (adelante y atrás)",
        "15 aperturas de pecho con banda",
        "10 push-ups de rodilla lentos",
        "10 rotaciones de hombro con banda c/lado"
      ],
      "mobility": [
        "Apertura de pecho en marco de puerta (30 seg)",
        "Extensión de muñeca y antebrazo (20 seg c/lado)",
        "Rotación interna/externa de hombro (15 reps c/lado)"
      ],
      "mental": "El pecho y hombros definen tu postura. Cada press es una afirmación de fuerza. Activa el músculo desde el inicio, no solo mueves peso."
    },
    "workout": {
      "blocks": [
        {
          "name": "Fuerza máxima",
          "exercises": [
            {
              "id": "bench_flat",
              "name": "Press de banca plano (barra)",
              "muscle": "Pectoral mayor, Tríceps, Deltoides ant.",
              "equip": "Barra + banco",
              "sets": "5",
              "reps": "6-8",
              "rest": "120 seg",
              "notes": "Semana de fuerza: máxima carga.",
              "weight_guide": "80-85% RM"
            },
            {
              "id": "bench_incline",
              "name": "Press inclinado 30° (barra)",
              "muscle": "Pectoral mayor superior, Deltoides ant.",
              "equip": "Barra + banco inclinado",
              "sets": "4",
              "reps": "8",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Fondos con peso",
          "exercises": [
            {
              "id": "dips_chest",
              "name": "Fondos en paralelas (pecho)",
              "muscle": "Pectoral mayor inferior, Tríceps",
              "equip": "Paralelas",
              "sets": "3",
              "reps": "10",
              "rest": "90 seg",
              "notes": "Añade lastre con cinturón o mancuerna entre piernas.",
              "weight_guide": ""
            },
            {
              "id": "db_fly_incline",
              "name": "Apertura inclinada (mancuernas)",
              "muscle": "Pectoral mayor superior",
              "equip": "Mancuernas + banco inclinado",
              "sets": "3",
              "reps": "14",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Tríceps",
          "exercises": [
            {
              "id": "skull_crusher",
              "name": "Press francés / skullcrusher",
              "muscle": "Tríceps (cabeza larga)",
              "equip": "Barra Z o mancuernas",
              "sets": "4",
              "reps": "10",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "overhead_ext_cable",
              "name": "Extensión overhead en cable",
              "muscle": "Tríceps cabeza larga (estiramiento)",
              "equip": "Cable bajo + cuerda",
              "sets": "3",
              "reps": "14",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata suave",
        "Respiración profunda: 5 respiraciones largas"
      ],
      "stretches": [
        "Estiramiento pecho en marco de puerta (30 seg, 3 ángulos: bajo/medio/alto)",
        "Tríceps sobre la cabeza (35 seg c/lado)",
        "Cruce de brazo (deltoides anterior, 25 seg c/lado)",
        "Extensión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Proteína en los 45 min siguientes. Si entrenaste en ayunas, prioriza fuente rápida (suero de leche). El pecho requiere entre 0.3-0.4 g/kg de proteína por sesión para síntesis óptima.",
      "recovery": "48h de descanso antes de volver a empujar pesado. Puedes hacer cardio suave o espalda al día siguiente sin problema."
    }
  },
  {
    "id": 44,
    "phase": 2,
    "type": "C",
    "name": "Espalda + Bíceps — Dominadas libres + farmer's walk (C8)",
    "intensity": "Alto",
    "duration": "70-80 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min remo ergómetro suave",
        "15 retracciones escapulares con banda",
        "Colgarse de barra: 3 × 20 seg",
        "10 superman lentos en el suelo",
        "Rotación externa de hombro con banda: 15 reps c/lado"
      ],
      "mobility": [
        "Movilidad de hombro: círculos de brazo (20 c/dirección)",
        "Estiramiento de antebrazo dorsal (20 seg c/lado)",
        "Descompresión lumbar: colgado de barra 30 seg"
      ],
      "mental": "La espalda fuerte es el escudo del cuerpo. El 80% de los dolores lumbares se previenen con espalda fuerte. Cada jalón acerca tu objetivo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Dominadas y tirón",
          "exercises": [
            {
              "id": "pullup",
              "name": "Dominadas (agarre prono)",
              "muscle": "Dorsal ancho, Romboides, Bíceps",
              "equip": "Barra de dominadas",
              "sets": "5",
              "reps": "5-8",
              "rest": "90 seg",
              "notes": "5 series: máximo volumen de dominadas.",
              "weight_guide": ""
            },
            {
              "id": "chinup",
              "name": "Chin-up (agarre supino)",
              "muscle": "Dorsal ancho, Bíceps (énfasis)",
              "equip": "Barra de dominadas",
              "sets": "3",
              "reps": "8",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Remos",
          "exercises": [
            {
              "id": "row_bar",
              "name": "Remo con barra inclinado",
              "muscle": "Dorsal ancho, Romboides, Trapecio medio",
              "equip": "Barra",
              "sets": "4",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": "Pesado"
            },
            {
              "id": "row_db",
              "name": "Remo mancuerna unilateral",
              "muscle": "Dorsal ancho, Romboide, Trapecio",
              "equip": "Mancuerna + banco",
              "sets": "4",
              "reps": "12 c/lado",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Bíceps + agarre intensivo",
          "exercises": [
            {
              "id": "curl_bar",
              "name": "Curl con barra recta o Z",
              "muscle": "Bíceps braquial",
              "equip": "Barra Z o recta",
              "sets": "4",
              "reps": "10",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "curl_hammer",
              "name": "Curl martillo (mancuernas)",
              "muscle": "Braquiorradial, Braquial",
              "equip": "Mancuernas",
              "sets": "3",
              "reps": "12 c/lado",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "farmers_walk",
              "name": "Farmer's walk (caminata granjero)",
              "muscle": "Antebrazos, Core, Trapecio superior",
              "equip": "Mancuernas pesadas",
              "sets": "4",
              "reps": "40m",
              "rest": "75 seg",
              "notes": "Más pesado que antes.",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata o trote suave",
        "Colgado de barra: 30 seg (descompresión)",
        "Respiración profunda: 5 ciclos"
      ],
      "stretches": [
        "Estiramiento dorsal: brazo en alto con inclinación lateral (30 seg c/lado)",
        "Bíceps contra pared, palma arriba (25 seg c/lado)",
        "Gato-vaca en el suelo: 10 reps lentas",
        "Niño extendido con brazos al frente (45 seg)",
        "Extensión y flexión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Alta demanda proteica: la espalda es el grupo muscular más grande de la parte superior. Prioriza 30-40g de proteína en los 60 min post-entreno.",
      "recovery": "La espalda y bíceps se recuperan en 48-72h. Si sientes rigidez lumbar, aplica calor suave y haz movilidad de cadera al día siguiente."
    }
  },
  {
    "id": 45,
    "phase": 2,
    "type": "G",
    "name": "Deload — Fin de Fase 2 (recuperación total)",
    "intensity": "Bajo",
    "duration": "50-60 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "10 min caminata tranquila",
        "10 círculos de hombros",
        "10 sentadillas suaves sin peso",
        "Respiración diafragmática: 5 respiraciones profundas"
      ],
      "mobility": [
        "Movilidad global suave: 5 min",
        "Foam rolling: zona lumbar y piernas (3 min)"
      ],
      "mental": "El descanso activo NO es perder el tiempo. Es cuando el cuerpo consolida las ganancias. Llega relajado, sin presión de rendimiento."
    },
    "workout": {
      "blocks": [
        {
          "name": "Repaso ligero",
          "exercises": [
            {
              "id": "squat_goblet",
              "name": "Sentadilla goblet (mancuerna)",
              "muscle": "Cuádriceps, Glúteo",
              "equip": "Mancuerna",
              "sets": "2",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": "Ligero"
            },
            {
              "id": "db_press_flat",
              "name": "Press de banca plano (mancuernas)",
              "muscle": "Pectoral mayor, Serrato anterior",
              "equip": "Mancuernas + banco",
              "sets": "2",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "pulldown_neutral",
              "name": "Jalón agarre neutro",
              "muscle": "Dorsal ancho, Bíceps",
              "equip": "Polea + agarre neutro",
              "sets": "2",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "lateral_raise",
              "name": "Elevación lateral (mancuernas)",
              "muscle": "Deltoides lateral",
              "equip": "Mancuernas",
              "sets": "2",
              "reps": "15",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "plank",
              "name": "Plancha frontal",
              "muscle": "Transverso abdominal, Core completo",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "30 seg",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Cardio muy suave",
          "exercises": [
            {
              "id": "treadmill_walk",
              "name": "Caminata rápida (cinta/parque)",
              "muscle": "Sistema cardiovascular",
              "equip": "Cinta / parque",
              "sets": "1",
              "reps": "15 min",
              "rest": "--",
              "notes": "Ritmo de paseo.",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "10 min caminata tranquila",
        "Respiración consciente: 5 min"
      ],
      "stretches": [
        "Rutina completa de estiramiento: 15 min (todos los grupos)",
        "Foam rolling global: isquiotibiales, glúteos, dorsal, pectorales (5 min)",
        "Savasana / meditación (5 min)"
      ],
      "nutrition": "Semana de descarga: mantén ingesta proteica alta pero puedes reducir levemente los carbohidratos si entrenas menos. El cuerpo reconstruye y supracompensa en esta fase.",
      "recovery": "Esta sesión es medicina. No hagas nada más exigente que esto hoy. Duerme 8+ horas esta noche. La semana siguiente empezarás más fuerte."
    }
  },
  {
    "id": 46,
    "phase": 3,
    "type": "A",
    "name": "Piernas — Triset quads + glúteo (inicio Fase 3)",
    "intensity": "Alto",
    "duration": "75-85 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata rápida o trote suave",
        "20 círculos de cadera (10 c/lado)",
        "15 sentadillas de activación sin peso",
        "10 puentes de glúteo lentos",
        "10 rotaciones de rodilla c/lado"
      ],
      "mobility": [
        "Movilidad tobillo: círculos + flexión (30 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)",
        "Desbloqueo psoas: rodilla en suelo, inclinación adelante (20 seg c/lado)"
      ],
      "mental": "Visualiza la sesión completa. El tren inferior es el motor del cuerpo. Cada rep construye la base de tu maratón."
    },
    "workout": {
      "blocks": [
        {
          "name": "Compound pesado",
          "exercises": [
            {
              "id": "squat_bar",
              "name": "Sentadilla trasera (barra)",
              "muscle": "Cuádriceps, Glúteo mayor",
              "equip": "Barra + Rack",
              "sets": "5",
              "reps": "8",
              "rest": "120 seg",
              "notes": "Más peso que Fase 2.",
              "weight_guide": "85% RM"
            },
            {
              "id": "deadlift",
              "name": "Peso muerto convencional",
              "muscle": "Cadena posterior completa",
              "equip": "Barra",
              "sets": "4",
              "reps": "6",
              "rest": "120 seg",
              "notes": "Peso muerto pesado.",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Triset glúteo (3 rondas)",
          "exercises": [
            {
              "id": "hip_thrust",
              "name": "Hip thrust (barra)",
              "muscle": "Glúteo mayor",
              "equip": "Barra + banco",
              "sets": "3",
              "reps": "12",
              "rest": "10 seg",
              "notes": "Triset: sin descanso entre ejercicios.",
              "weight_guide": ""
            },
            {
              "id": "clamshell",
              "name": "Clamshell con banda",
              "muscle": "Glúteo medio y menor",
              "equip": "Banda elástica",
              "sets": "3",
              "reps": "20 c/lado",
              "rest": "10 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "abduction_cable",
              "name": "Abducción cadera (cable)",
              "muscle": "Glúteo medio",
              "equip": "Cable bajo",
              "sets": "3",
              "reps": "15 c/lado",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Pantorrillas y Core",
          "exercises": [
            {
              "id": "calf_machine",
              "name": "Extensión de pantorrilla (máquina)",
              "muscle": "Gastrocnemio, Sóleo",
              "equip": "Máquina pantorrilla",
              "sets": "4",
              "reps": "25",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "ab_wheel",
              "name": "Rueda abdominal (ab wheel)",
              "muscle": "Transverso, Recto abdominal, Dorsal",
              "equip": "Ab wheel",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "pallof_press",
              "name": "Pallof press (anti-rotacional)",
              "muscle": "Oblicuos, Core anti-rotación",
              "equip": "Cable o banda",
              "sets": "3",
              "reps": "12 c/lado",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave para bajar FC",
        "Respiración: 4 inhala / 4 retén / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps de pie (40 seg c/lado)",
        "Isquiotibial con banda o toalla (40 seg c/lado)",
        "Paloma/figura 4 glúteo en suelo (45 seg c/lado)",
        "Aductor sentado pies juntos (30 seg)",
        "Pantorrilla contra pared (25 seg c/lado)",
        "Torsión espinal tumbado (30 seg c/lado)"
      ],
      "nutrition": "Ingiere proteína + carbohidrato en los 30-60 min siguientes (ej: batido de proteína + plátano, o arroz con pollo). Los carbohidratos post-piernas son esenciales para reponer glucógeno muscular.",
      "recovery": "Piernas: 48-72h de recuperación antes del próximo estímulo pesado de piernas. Si sientes DOMS (agujetas) intensas, camina suave y toma baño frío de pies."
    }
  },
  {
    "id": 47,
    "phase": 3,
    "type": "B",
    "name": "Pecho + Tríceps — Triset pecho (B9)",
    "intensity": "Alto",
    "duration": "65-75 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta estática o elíptica",
        "20 círculos de hombros (adelante y atrás)",
        "15 aperturas de pecho con banda",
        "10 push-ups de rodilla lentos",
        "10 rotaciones de hombro con banda c/lado"
      ],
      "mobility": [
        "Apertura de pecho en marco de puerta (30 seg)",
        "Extensión de muñeca y antebrazo (20 seg c/lado)",
        "Rotación interna/externa de hombro (15 reps c/lado)"
      ],
      "mental": "El pecho y hombros definen tu postura. Cada press es una afirmación de fuerza. Activa el músculo desde el inicio, no solo mueves peso."
    },
    "workout": {
      "blocks": [
        {
          "name": "Triset pecho (4 rondas)",
          "exercises": [
            {
              "id": "bench_flat",
              "name": "Press de banca plano (barra)",
              "muscle": "Pectoral mayor, Tríceps, Deltoides ant.",
              "equip": "Barra + banco",
              "sets": "4",
              "reps": "10",
              "rest": "10 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "db_fly_flat",
              "name": "Apertura plana (mancuernas)",
              "muscle": "Pectoral mayor (estiramiento)",
              "equip": "Mancuernas + banco",
              "sets": "4",
              "reps": "14",
              "rest": "10 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "pushup",
              "name": "Flexiones (push-up)",
              "muscle": "Pectoral mayor, Tríceps, Serrato",
              "equip": "Peso corporal",
              "sets": "4",
              "reps": "15",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Press inclinado + cable",
          "exercises": [
            {
              "id": "bench_incline",
              "name": "Press inclinado 30° (barra)",
              "muscle": "Pectoral mayor superior, Deltoides ant.",
              "equip": "Barra + banco inclinado",
              "sets": "3",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "cable_crossover_high",
              "name": "Cruce poleas alto a bajo",
              "muscle": "Pectoral mayor inferior",
              "equip": "Cables altos",
              "sets": "3",
              "reps": "14",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Tríceps",
          "exercises": [
            {
              "id": "skull_crusher",
              "name": "Press francés / skullcrusher",
              "muscle": "Tríceps (cabeza larga)",
              "equip": "Barra Z o mancuernas",
              "sets": "4",
              "reps": "10",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "overhead_ext_cable",
              "name": "Extensión overhead en cable",
              "muscle": "Tríceps cabeza larga (estiramiento)",
              "equip": "Cable bajo + cuerda",
              "sets": "3",
              "reps": "14",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata suave",
        "Respiración profunda: 5 respiraciones largas"
      ],
      "stretches": [
        "Estiramiento pecho en marco de puerta (30 seg, 3 ángulos: bajo/medio/alto)",
        "Tríceps sobre la cabeza (35 seg c/lado)",
        "Cruce de brazo (deltoides anterior, 25 seg c/lado)",
        "Extensión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Proteína en los 45 min siguientes. Si entrenaste en ayunas, prioriza fuente rápida (suero de leche). El pecho requiere entre 0.3-0.4 g/kg de proteína por sesión para síntesis óptima.",
      "recovery": "48h de descanso antes de volver a empujar pesado. Puedes hacer cardio suave o espalda al día siguiente sin problema."
    }
  },
  {
    "id": 48,
    "phase": 3,
    "type": "C",
    "name": "Espalda — Dominadas + remo + facepull (C9)",
    "intensity": "Alto",
    "duration": "70-80 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min remo ergómetro suave",
        "15 retracciones escapulares con banda",
        "Colgarse de barra: 3 × 20 seg",
        "10 superman lentos en el suelo",
        "Rotación externa de hombro con banda: 15 reps c/lado"
      ],
      "mobility": [
        "Movilidad de hombro: círculos de brazo (20 c/dirección)",
        "Estiramiento de antebrazo dorsal (20 seg c/lado)",
        "Descompresión lumbar: colgado de barra 30 seg"
      ],
      "mental": "La espalda fuerte es el escudo del cuerpo. El 80% de los dolores lumbares se previenen con espalda fuerte. Cada jalón acerca tu objetivo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Triset espalda (4 rondas)",
          "exercises": [
            {
              "id": "pullup",
              "name": "Dominadas (agarre prono)",
              "muscle": "Dorsal ancho, Romboides, Bíceps",
              "equip": "Barra de dominadas",
              "sets": "4",
              "reps": "8",
              "rest": "15 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "row_bar",
              "name": "Remo con barra inclinado",
              "muscle": "Dorsal ancho, Romboides, Trapecio medio",
              "equip": "Barra",
              "sets": "4",
              "reps": "10",
              "rest": "15 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "facepull",
              "name": "Facepull con cuerda",
              "muscle": "Trapecio inferior, Deltoides post., Manguito",
              "equip": "Cable alto + cuerda",
              "sets": "4",
              "reps": "15",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Jalones variados",
          "exercises": [
            {
              "id": "pulldown_wide",
              "name": "Jalón al pecho agarre ancho",
              "muscle": "Dorsal ancho, Redondo mayor",
              "equip": "Polea + barra ancha",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "pulldown_supine",
              "name": "Jalón agarre supino",
              "muscle": "Dorsal ancho inferior, Bíceps",
              "equip": "Polea + barra",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Bíceps",
          "exercises": [
            {
              "id": "curl_bar",
              "name": "Curl con barra recta o Z",
              "muscle": "Bíceps braquial",
              "equip": "Barra Z o recta",
              "sets": "4",
              "reps": "10",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "curl_rope",
              "name": "Curl con cuerda en cable",
              "muscle": "Braquiorradial, Braquial",
              "equip": "Cable + cuerda",
              "sets": "3",
              "reps": "14",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "wrist_curl",
              "name": "Curl de muñeca (flexores)",
              "muscle": "Flexores del antebrazo",
              "equip": "Barra o mancuerna",
              "sets": "2",
              "reps": "20",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata o trote suave",
        "Colgado de barra: 30 seg (descompresión)",
        "Respiración profunda: 5 ciclos"
      ],
      "stretches": [
        "Estiramiento dorsal: brazo en alto con inclinación lateral (30 seg c/lado)",
        "Bíceps contra pared, palma arriba (25 seg c/lado)",
        "Gato-vaca en el suelo: 10 reps lentas",
        "Niño extendido con brazos al frente (45 seg)",
        "Extensión y flexión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Alta demanda proteica: la espalda es el grupo muscular más grande de la parte superior. Prioriza 30-40g de proteína en los 60 min post-entreno.",
      "recovery": "La espalda y bíceps se recuperan en 48-72h. Si sientes rigidez lumbar, aplica calor suave y haz movilidad de cadera al día siguiente."
    }
  },
  {
    "id": 49,
    "phase": 3,
    "type": "E",
    "name": "Cardio — Trote 40 min (objetivo Fase 3)",
    "intensity": "Medio",
    "duration": "65-75 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata suave",
        "10 círculos de tobillo c/lado",
        "Extensiones de pantorrilla lentas: 20 reps",
        "Elevaciones de rodilla marchando: 30 seg"
      ],
      "mobility": [
        "Estiramiento dinámico de cuádriceps (10 c/lado)",
        "Estiramiento isquiotibial de pie (20 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)"
      ],
      "mental": "El cardio es una meditación en movimiento. Hoy no compites contra nadie. Solo construyes tu motor aeróbico ladrillo a ladrillo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Trote continuo",
          "exercises": [
            {
              "id": "treadmill_jog",
              "name": "Trote continuo",
              "muscle": "Sistema cardiovascular, Pantorrillas",
              "equip": "Cinta / parque",
              "sets": "1",
              "reps": "40 min",
              "rest": "--",
              "notes": "40 min continuos: gran hito. Ritmo lento está bien.",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Movilidad post-cardio",
          "exercises": [
            {
              "id": "pigeon",
              "name": "Paloma / figura 4 (piriforme)",
              "muscle": "Piriforme, Glúteo profundo",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "50 seg c/lado",
              "rest": "20 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "psoas_stretch",
              "name": "Estiramiento de psoas (estocada)",
              "muscle": "Psoas, Recto femoral",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "45 seg c/lado",
              "rest": "20 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "mobility_thoracic",
              "name": "Apertura torácica con rodillo",
              "muscle": "Columna torácica, Pectoral",
              "equip": "Foam roller",
              "sets": "2",
              "reps": "60 seg",
              "rest": "20 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata muy lenta",
        "Respiración controlada: 5 min sentado"
      ],
      "stretches": [
        "Psoas (estocada estática): 45 seg c/lado",
        "Piriforme/paloma en suelo: 45 seg c/lado",
        "Isquiotibiales con cinta: 40 seg c/lado",
        "Apertura de pecho en suelo (brazos en T): 60 seg",
        "Perro boca abajo: 45 seg",
        "Pose del niño: 60 seg",
        "Savasana / respiración consciente: 3 min"
      ],
      "nutrition": "El cardio quema glucógeno. Repón con carbohidratos en los 30 min siguientes si vas a entrenar mañana. Si es día de recuperación, puedes priorizar proteína y grasas buenas.",
      "recovery": "Hidratación post-cardio: repón electrolitos si sudaste mucho (agua con limón + pizca de sal). El cardio activa el sistema parasimpático si lo mantienes aeróbico."
    }
  },
  {
    "id": 50,
    "phase": 3,
    "type": "D",
    "name": "Hombros — Superseries + HIIT (D7)",
    "intensity": "Alto",
    "duration": "65-75 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta o elíptica",
        "Rotación externa con banda: 15 reps c/lado",
        "15 encogimientos circulares de hombros",
        "Y-T-W con banda elástica: 10 reps c/posición",
        "10 elevaciones frontales muy ligeras"
      ],
      "mobility": [
        "Péndulo de brazo: 30 seg c/lado",
        "Sleeper stretch (rotación interna): 20 seg c/lado",
        "Estiramiento cruzado de hombro: 20 seg c/lado"
      ],
      "mental": "Los hombros son el punto débil más frecuente. Trabaja siempre con control, nunca con inercia. El manguito rotador vale más que el peso en la barra."
    },
    "workout": {
      "blocks": [
        {
          "name": "Press y volumen hombros",
          "exercises": [
            {
              "id": "ohp_bar",
              "name": "Press militar con barra (de pie)",
              "muscle": "Deltoides anterior, Tríceps, Core",
              "equip": "Barra",
              "sets": "5",
              "reps": "8",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": "Pesado"
            },
            {
              "id": "lateral_raise",
              "name": "Elevación lateral (mancuernas)",
              "muscle": "Deltoides lateral",
              "equip": "Mancuernas",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "Drop set en el último.",
              "weight_guide": ""
            },
            {
              "id": "rear_delt_fly",
              "name": "Pájaro (deltoides posterior)",
              "muscle": "Deltoides posterior, Romboides",
              "equip": "Mancuernas (tronco inclinado)",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "HIIT finalizador (4 rondas)",
          "exercises": [
            {
              "id": "jump_rope",
              "name": "Comba / soga de saltar",
              "muscle": "Sistema cardiovascular, Pantorrillas, Coordinación",
              "equip": "Comba",
              "sets": "4",
              "reps": "40 seg",
              "rest": "20 seg",
              "notes": "90% de esfuerzo.",
              "weight_guide": ""
            },
            {
              "id": "burpee",
              "name": "Burpee",
              "muscle": "Full body, Sistema cardiovascular",
              "equip": "Peso corporal",
              "sets": "4",
              "reps": "8",
              "rest": "40 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min movilidad suave de hombros: péndulos y círculos",
        "Respiración diafragmática: 3 min"
      ],
      "stretches": [
        "Estiramiento sleeper (rotación interna): 30 seg c/lado",
        "Cruzado de hombro: 30 seg c/lado",
        "Trapecio: inclinación lateral de cabeza (25 seg c/lado)",
        "Extensión de hombro posterior: brazo cruzado bajo (25 seg c/lado)"
      ],
      "nutrition": "Los hombros son articulaciones complejas: además de proteína, asegura ingesta de colágeno (gelatina o suplemento) para salud del manguito rotador.",
      "recovery": "Los hombros se involucran en casi todos los ejercicios. Prioriza el descanso de este grupo si sientes fatiga articular. Masaje suave en zona del trapecio si hay tensión."
    }
  },
  {
    "id": 51,
    "phase": 3,
    "type": "A",
    "name": "Piernas — Fuerza + cardio (A10)",
    "intensity": "Alto",
    "duration": "80-90 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata rápida o trote suave",
        "20 círculos de cadera (10 c/lado)",
        "15 sentadillas de activación sin peso",
        "10 puentes de glúteo lentos",
        "10 rotaciones de rodilla c/lado"
      ],
      "mobility": [
        "Movilidad tobillo: círculos + flexión (30 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)",
        "Desbloqueo psoas: rodilla en suelo, inclinación adelante (20 seg c/lado)"
      ],
      "mental": "Visualiza la sesión completa. El tren inferior es el motor del cuerpo. Cada rep construye la base de tu maratón."
    },
    "workout": {
      "blocks": [
        {
          "name": "Compound fuerza",
          "exercises": [
            {
              "id": "squat_front",
              "name": "Sentadilla frontal (barra)",
              "muscle": "Cuádriceps, Core",
              "equip": "Barra + Rack",
              "sets": "4",
              "reps": "8",
              "rest": "120 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "sumo_dl",
              "name": "Peso muerto sumo",
              "muscle": "Isquiotibiales, Glúteos, Aductores",
              "equip": "Barra",
              "sets": "4",
              "reps": "8",
              "rest": "120 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Glúteo y unilateral",
          "exercises": [
            {
              "id": "hip_thrust",
              "name": "Hip thrust (barra)",
              "muscle": "Glúteo mayor",
              "equip": "Barra + banco",
              "sets": "4",
              "reps": "12",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "step_up",
              "name": "Step-up con mancuernas",
              "muscle": "Cuádriceps, Glúteo mayor",
              "equip": "Mancuernas + banco",
              "sets": "4",
              "reps": "12 c/pierna",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "leg_curl_seated",
              "name": "Curl de isquiotibiales sentado",
              "muscle": "Isquiotibiales (énfasis sóleo)",
              "equip": "Máquina curl sentado",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Core y cardio",
          "exercises": [
            {
              "id": "hollow_body",
              "name": "Hollow body hold",
              "muscle": "Core completo, Transverso",
              "equip": "Peso corporal",
              "sets": "3",
              "reps": "35 seg",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "leg_raise",
              "name": "Elevación de piernas colgado",
              "muscle": "Recto abdominal inferior, Psoas",
              "equip": "Barra de dominadas",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "bike",
              "name": "Bicicleta estática",
              "muscle": "Sistema cardiovascular, Cuádriceps",
              "equip": "Bicicleta estática",
              "sets": "1",
              "reps": "10 min intervalos",
              "rest": "--",
              "notes": "1 min alta resistencia / 1 min baja. x5.",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave para bajar FC",
        "Respiración: 4 inhala / 4 retén / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps de pie (40 seg c/lado)",
        "Isquiotibial con banda o toalla (40 seg c/lado)",
        "Paloma/figura 4 glúteo en suelo (45 seg c/lado)",
        "Aductor sentado pies juntos (30 seg)",
        "Pantorrilla contra pared (25 seg c/lado)",
        "Torsión espinal tumbado (30 seg c/lado)"
      ],
      "nutrition": "Ingiere proteína + carbohidrato en los 30-60 min siguientes (ej: batido de proteína + plátano, o arroz con pollo). Los carbohidratos post-piernas son esenciales para reponer glucógeno muscular.",
      "recovery": "Piernas: 48-72h de recuperación antes del próximo estímulo pesado de piernas. Si sientes DOMS (agujetas) intensas, camina suave y toma baño frío de pies."
    }
  },
  {
    "id": 52,
    "phase": 3,
    "type": "F",
    "name": "Full Body — HIIT avanzado (F6)",
    "intensity": "Alto",
    "duration": "60-70 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "7 min trote suave",
        "10 jumping jacks",
        "10 sentadillas cuerpo libre",
        "10 push-ups de rodilla",
        "10 remo con banda",
        "5 burpees lentos"
      ],
      "mobility": [
        "Gato-vaca: 10 reps lentas",
        "Apertura de cadera 90/90: 30 seg c/lado",
        "Movilidad de hombros: círculos 20 c/dirección"
      ],
      "mental": "El full body te entrena como atleta completo. Cada patrón de movimiento (empuje, tirón, sentadilla, bisagra) te hace más funcional en la vida real."
    },
    "workout": {
      "blocks": [
        {
          "name": "Circuito HIIT (5 rondas, 30 seg trabajo / 15 seg descanso)",
          "exercises": [
            {
              "id": "box_jump",
              "name": "Salto al cajón (box jump)",
              "muscle": "Cuádriceps, Glúteo, Pantorrillas, Potencia",
              "equip": "Cajón pliométrico",
              "sets": "5",
              "reps": "30 seg",
              "rest": "15 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "pushup_incline",
              "name": "Push-up inclinado (pies elevados)",
              "muscle": "Pectoral superior, Deltoides ant.",
              "equip": "Peso corporal + banco",
              "sets": "5",
              "reps": "30 seg",
              "rest": "15 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "squat_bar",
              "name": "Sentadilla trasera (barra)",
              "muscle": "Cuádriceps, Glúteo mayor",
              "equip": "Barra + Rack",
              "sets": "5",
              "reps": "30 seg",
              "rest": "15 seg",
              "notes": "Velocidad moderada, técnica.",
              "weight_guide": "Moderado"
            },
            {
              "id": "burpee",
              "name": "Burpee",
              "muscle": "Full body, Sistema cardiovascular",
              "equip": "Peso corporal",
              "sets": "5",
              "reps": "30 seg",
              "rest": "15 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "row_db",
              "name": "Remo mancuerna unilateral",
              "muscle": "Dorsal ancho, Romboide, Trapecio",
              "equip": "Mancuerna + banco",
              "sets": "5",
              "reps": "30 seg",
              "rest": "15 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Core",
          "exercises": [
            {
              "id": "ab_wheel",
              "name": "Rueda abdominal (ab wheel)",
              "muscle": "Transverso, Recto abdominal, Dorsal",
              "equip": "Ab wheel",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "cable_chop",
              "name": "Cable chop (diagonal)",
              "muscle": "Oblicuos, Rotadores de tronco",
              "equip": "Cable",
              "sets": "3",
              "reps": "12 c/lado",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave",
        "Respiración: 4 inhala / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps (30 seg c/lado)",
        "Isquiotibiales (30 seg c/lado)",
        "Pecho en marco de puerta (25 seg)",
        "Dorsal en inclinación (25 seg c/lado)",
        "Rotación espinal tumbado (25 seg c/lado)",
        "Niño extendido (45 seg)"
      ],
      "nutrition": "Sesión full body: alta demanda energética. Meal completa: 30-40g proteína + 60-80g carbohidratos + verduras. Es tu mejor momento para absorber nutrientes.",
      "recovery": "El full body genera más fatiga sistémica que un split. Descansa 48h antes del próximo full body. Un día de cardio suave o movilidad entre sesiones es ideal."
    }
  },
  {
    "id": 53,
    "phase": 3,
    "type": "B",
    "name": "Pecho — Fuerza máxima (1RM test o PR) (B10)",
    "intensity": "Alto",
    "duration": "65-75 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta estática o elíptica",
        "20 círculos de hombros (adelante y atrás)",
        "15 aperturas de pecho con banda",
        "10 push-ups de rodilla lentos",
        "10 rotaciones de hombro con banda c/lado"
      ],
      "mobility": [
        "Apertura de pecho en marco de puerta (30 seg)",
        "Extensión de muñeca y antebrazo (20 seg c/lado)",
        "Rotación interna/externa de hombro (15 reps c/lado)"
      ],
      "mental": "El pecho y hombros definen tu postura. Cada press es una afirmación de fuerza. Activa el músculo desde el inicio, no solo mueves peso."
    },
    "workout": {
      "blocks": [
        {
          "name": "Rampa de fuerza (puedes testear tu 1RM)",
          "exercises": [
            {
              "id": "bench_flat",
              "name": "Press de banca plano (barra)",
              "muscle": "Pectoral mayor, Tríceps, Deltoides ant.",
              "equip": "Barra + banco",
              "sets": "5",
              "reps": "10-8-6-4-2",
              "rest": "120-180 seg",
              "notes": "Sube el peso progresivamente. Semana de PR.",
              "weight_guide": "Max posible"
            }
          ],
          "note": ""
        },
        {
          "name": "Volumen de acumulación",
          "exercises": [
            {
              "id": "db_press_incline",
              "name": "Press inclinado (mancuernas)",
              "muscle": "Pectoral mayor superior",
              "equip": "Mancuernas + banco inclinado",
              "sets": "3",
              "reps": "12",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "pec_dec",
              "name": "Pec deck (apertura máquina)",
              "muscle": "Pectoral mayor",
              "equip": "Máquina pec deck",
              "sets": "3",
              "reps": "15",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "cable_crossover_low",
              "name": "Cruce poleas bajo a alto",
              "muscle": "Pectoral mayor superior",
              "equip": "Cables bajos",
              "sets": "3",
              "reps": "14",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Tríceps",
          "exercises": [
            {
              "id": "close_grip_bench",
              "name": "Press banca agarre cerrado",
              "muscle": "Tríceps (énfasis), Pectoral interno",
              "equip": "Barra + banco",
              "sets": "3",
              "reps": "10",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "dips_tricep",
              "name": "Fondos en banco (tríceps)",
              "muscle": "Tríceps",
              "equip": "Banco",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata suave",
        "Respiración profunda: 5 respiraciones largas"
      ],
      "stretches": [
        "Estiramiento pecho en marco de puerta (30 seg, 3 ángulos: bajo/medio/alto)",
        "Tríceps sobre la cabeza (35 seg c/lado)",
        "Cruce de brazo (deltoides anterior, 25 seg c/lado)",
        "Extensión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Proteína en los 45 min siguientes. Si entrenaste en ayunas, prioriza fuente rápida (suero de leche). El pecho requiere entre 0.3-0.4 g/kg de proteína por sesión para síntesis óptima.",
      "recovery": "48h de descanso antes de volver a empujar pesado. Puedes hacer cardio suave o espalda al día siguiente sin problema."
    }
  },
  {
    "id": 54,
    "phase": 3,
    "type": "C",
    "name": "Espalda + Bíceps — Dominadas max reps (C10)",
    "intensity": "Alto",
    "duration": "70-80 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min remo ergómetro suave",
        "15 retracciones escapulares con banda",
        "Colgarse de barra: 3 × 20 seg",
        "10 superman lentos en el suelo",
        "Rotación externa de hombro con banda: 15 reps c/lado"
      ],
      "mobility": [
        "Movilidad de hombro: círculos de brazo (20 c/dirección)",
        "Estiramiento de antebrazo dorsal (20 seg c/lado)",
        "Descompresión lumbar: colgado de barra 30 seg"
      ],
      "mental": "La espalda fuerte es el escudo del cuerpo. El 80% de los dolores lumbares se previenen con espalda fuerte. Cada jalón acerca tu objetivo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Dominadas intensivas",
          "exercises": [
            {
              "id": "pullup",
              "name": "Dominadas (agarre prono)",
              "muscle": "Dorsal ancho, Romboides, Bíceps",
              "equip": "Barra de dominadas",
              "sets": "5",
              "reps": "máx reps",
              "rest": "120 seg",
              "notes": "5 series de máximo de dominadas.",
              "weight_guide": "Peso corporal"
            },
            {
              "id": "pulldown_neutral",
              "name": "Jalón agarre neutro",
              "muscle": "Dorsal ancho, Bíceps",
              "equip": "Polea + agarre neutro",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Remos pesados",
          "exercises": [
            {
              "id": "row_bar",
              "name": "Remo con barra inclinado",
              "muscle": "Dorsal ancho, Romboides, Trapecio medio",
              "equip": "Barra",
              "sets": "5",
              "reps": "8",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": "Pesado"
            },
            {
              "id": "row_db",
              "name": "Remo mancuerna unilateral",
              "muscle": "Dorsal ancho, Romboide, Trapecio",
              "equip": "Mancuerna + banco",
              "sets": "4",
              "reps": "12 c/lado",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Bíceps + antebrazos",
          "exercises": [
            {
              "id": "curl_preacher",
              "name": "Curl predicador (máquina o barra)",
              "muscle": "Bíceps braquial (porción corta)",
              "equip": "Máquina predicador",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "curl_hammer",
              "name": "Curl martillo (mancuernas)",
              "muscle": "Braquiorradial, Braquial",
              "equip": "Mancuernas",
              "sets": "3",
              "reps": "12 c/lado",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "farmers_walk",
              "name": "Farmer's walk (caminata granjero)",
              "muscle": "Antebrazos, Core, Trapecio superior",
              "equip": "Mancuernas pesadas",
              "sets": "4",
              "reps": "50m",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata o trote suave",
        "Colgado de barra: 30 seg (descompresión)",
        "Respiración profunda: 5 ciclos"
      ],
      "stretches": [
        "Estiramiento dorsal: brazo en alto con inclinación lateral (30 seg c/lado)",
        "Bíceps contra pared, palma arriba (25 seg c/lado)",
        "Gato-vaca en el suelo: 10 reps lentas",
        "Niño extendido con brazos al frente (45 seg)",
        "Extensión y flexión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Alta demanda proteica: la espalda es el grupo muscular más grande de la parte superior. Prioriza 30-40g de proteína en los 60 min post-entreno.",
      "recovery": "La espalda y bíceps se recuperan en 48-72h. Si sientes rigidez lumbar, aplica calor suave y haz movilidad de cadera al día siguiente."
    }
  },
  {
    "id": 55,
    "phase": 3,
    "type": "E",
    "name": "Cardio — 5K (primer objetivo de carrera)",
    "intensity": "Medio",
    "duration": "60-70 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata suave",
        "10 círculos de tobillo c/lado",
        "Extensiones de pantorrilla lentas: 20 reps",
        "Elevaciones de rodilla marchando: 30 seg"
      ],
      "mobility": [
        "Estiramiento dinámico de cuádriceps (10 c/lado)",
        "Estiramiento isquiotibial de pie (20 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)"
      ],
      "mental": "El cardio es una meditación en movimiento. Hoy no compites contra nadie. Solo construyes tu motor aeróbico ladrillo a ladrillo."
    },
    "workout": {
      "blocks": [
        {
          "name": "5K continuo",
          "exercises": [
            {
              "id": "treadmill_jog",
              "name": "Trote continuo",
              "muscle": "Sistema cardiovascular, Pantorrillas",
              "equip": "Cinta / parque",
              "sets": "1",
              "reps": "5 km",
              "rest": "--",
              "notes": "Primer 5K de tu vida (o récord personal). No importa el tiempo, sólo terminar.",
              "weight_guide": "Ritmo conservador"
            }
          ],
          "note": ""
        },
        {
          "name": "Recuperación post-5K",
          "exercises": [
            {
              "id": "treadmill_walk",
              "name": "Caminata rápida (cinta/parque)",
              "muscle": "Sistema cardiovascular",
              "equip": "Cinta / parque",
              "sets": "1",
              "reps": "5-10 min",
              "rest": "--",
              "notes": "Caminata de enfriamiento.",
              "weight_guide": ""
            },
            {
              "id": "pigeon",
              "name": "Paloma / figura 4 (piriforme)",
              "muscle": "Piriforme, Glúteo profundo",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "60 seg c/lado",
              "rest": "20 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "psoas_stretch",
              "name": "Estiramiento de psoas (estocada)",
              "muscle": "Psoas, Recto femoral",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "50 seg c/lado",
              "rest": "20 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata muy lenta",
        "Respiración controlada: 5 min sentado"
      ],
      "stretches": [
        "Psoas (estocada estática): 45 seg c/lado",
        "Piriforme/paloma en suelo: 45 seg c/lado",
        "Isquiotibiales con cinta: 40 seg c/lado",
        "Apertura de pecho en suelo (brazos en T): 60 seg",
        "Perro boca abajo: 45 seg",
        "Pose del niño: 60 seg",
        "Savasana / respiración consciente: 3 min"
      ],
      "nutrition": "El cardio quema glucógeno. Repón con carbohidratos en los 30 min siguientes si vas a entrenar mañana. Si es día de recuperación, puedes priorizar proteína y grasas buenas.",
      "recovery": "Hidratación post-cardio: repón electrolitos si sudaste mucho (agua con limón + pizca de sal). El cardio activa el sistema parasimpático si lo mantienes aeróbico."
    }
  },
  {
    "id": 56,
    "phase": 3,
    "type": "A",
    "name": "Piernas — Sentadilla búlgara pesada + nordic curl (A11)",
    "intensity": "Alto",
    "duration": "80-90 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata rápida o trote suave",
        "20 círculos de cadera (10 c/lado)",
        "15 sentadillas de activación sin peso",
        "10 puentes de glúteo lentos",
        "10 rotaciones de rodilla c/lado"
      ],
      "mobility": [
        "Movilidad tobillo: círculos + flexión (30 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)",
        "Desbloqueo psoas: rodilla en suelo, inclinación adelante (20 seg c/lado)"
      ],
      "mental": "Visualiza la sesión completa. El tren inferior es el motor del cuerpo. Cada rep construye la base de tu maratón."
    },
    "workout": {
      "blocks": [
        {
          "name": "Compound",
          "exercises": [
            {
              "id": "squat_bar",
              "name": "Sentadilla trasera (barra)",
              "muscle": "Cuádriceps, Glúteo mayor",
              "equip": "Barra + Rack",
              "sets": "5",
              "reps": "6",
              "rest": "120 seg",
              "notes": "Fase 3: peso máximo.",
              "weight_guide": ""
            },
            {
              "id": "rdl",
              "name": "Peso muerto rumano",
              "muscle": "Isquiotibiales, Glúteo mayor, Erectores",
              "equip": "Barra o mancuernas",
              "sets": "4",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Unilateral + glúteo",
          "exercises": [
            {
              "id": "bulgarian",
              "name": "Zancada búlgara (pie elevado)",
              "muscle": "Cuádriceps, Glúteo mayor/medio",
              "equip": "Mancuernas + banco",
              "sets": "4",
              "reps": "10 c/pierna",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": "Mancuernas pesadas"
            },
            {
              "id": "nordic_curl",
              "name": "Nordic curl (curl nórdico)",
              "muscle": "Isquiotibiales",
              "equip": "Banco / compañero",
              "sets": "3",
              "reps": "6",
              "rest": "120 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "hip_thrust",
              "name": "Hip thrust (barra)",
              "muscle": "Glúteo mayor",
              "equip": "Barra + banco",
              "sets": "3",
              "reps": "15",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Core",
          "exercises": [
            {
              "id": "ab_wheel",
              "name": "Rueda abdominal (ab wheel)",
              "muscle": "Transverso, Recto abdominal, Dorsal",
              "equip": "Ab wheel",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "hollow_body",
              "name": "Hollow body hold",
              "muscle": "Core completo, Transverso",
              "equip": "Peso corporal",
              "sets": "3",
              "reps": "35 seg",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave para bajar FC",
        "Respiración: 4 inhala / 4 retén / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps de pie (40 seg c/lado)",
        "Isquiotibial con banda o toalla (40 seg c/lado)",
        "Paloma/figura 4 glúteo en suelo (45 seg c/lado)",
        "Aductor sentado pies juntos (30 seg)",
        "Pantorrilla contra pared (25 seg c/lado)",
        "Torsión espinal tumbado (30 seg c/lado)"
      ],
      "nutrition": "Ingiere proteína + carbohidrato en los 30-60 min siguientes (ej: batido de proteína + plátano, o arroz con pollo). Los carbohidratos post-piernas son esenciales para reponer glucógeno muscular.",
      "recovery": "Piernas: 48-72h de recuperación antes del próximo estímulo pesado de piernas. Si sientes DOMS (agujetas) intensas, camina suave y toma baño frío de pies."
    }
  },
  {
    "id": 57,
    "phase": 3,
    "type": "D",
    "name": "Hombros — Battle ropes + press explosivo (D8)",
    "intensity": "Alto",
    "duration": "65-75 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta o elíptica",
        "Rotación externa con banda: 15 reps c/lado",
        "15 encogimientos circulares de hombros",
        "Y-T-W con banda elástica: 10 reps c/posición",
        "10 elevaciones frontales muy ligeras"
      ],
      "mobility": [
        "Péndulo de brazo: 30 seg c/lado",
        "Sleeper stretch (rotación interna): 20 seg c/lado",
        "Estiramiento cruzado de hombro: 20 seg c/lado"
      ],
      "mental": "Los hombros son el punto débil más frecuente. Trabaja siempre con control, nunca con inercia. El manguito rotador vale más que el peso en la barra."
    },
    "workout": {
      "blocks": [
        {
          "name": "Press y laterales",
          "exercises": [
            {
              "id": "ohp_bar",
              "name": "Press militar con barra (de pie)",
              "muscle": "Deltoides anterior, Tríceps, Core",
              "equip": "Barra",
              "sets": "5",
              "reps": "8",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": "Pesado"
            },
            {
              "id": "lateral_raise",
              "name": "Elevación lateral (mancuernas)",
              "muscle": "Deltoides lateral",
              "equip": "Mancuernas",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "arnold_press",
              "name": "Press Arnold",
              "muscle": "Deltoides (3 haces), Trapecio",
              "equip": "Mancuernas",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Posterior y manguito",
          "exercises": [
            {
              "id": "rear_delt_fly",
              "name": "Pájaro (deltoides posterior)",
              "muscle": "Deltoides posterior, Romboides",
              "equip": "Mancuernas (tronco inclinado)",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "facepull",
              "name": "Facepull con cuerda",
              "muscle": "Trapecio inferior, Deltoides post., Manguito",
              "equip": "Cable alto + cuerda",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "rotator_cable",
              "name": "Rotación externa en cable",
              "muscle": "Manguito rotador",
              "equip": "Cable bajo",
              "sets": "3",
              "reps": "15 c/lado",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min movilidad suave de hombros: péndulos y círculos",
        "Respiración diafragmática: 3 min"
      ],
      "stretches": [
        "Estiramiento sleeper (rotación interna): 30 seg c/lado",
        "Cruzado de hombro: 30 seg c/lado",
        "Trapecio: inclinación lateral de cabeza (25 seg c/lado)",
        "Extensión de hombro posterior: brazo cruzado bajo (25 seg c/lado)"
      ],
      "nutrition": "Los hombros son articulaciones complejas: además de proteína, asegura ingesta de colágeno (gelatina o suplemento) para salud del manguito rotador.",
      "recovery": "Los hombros se involucran en casi todos los ejercicios. Prioriza el descanso de este grupo si sientes fatiga articular. Masaje suave en zona del trapecio si hay tensión."
    }
  },
  {
    "id": 58,
    "phase": 3,
    "type": "B",
    "name": "Pecho + Tríceps — Mancuernas pesadas + dips lastrados (B11)",
    "intensity": "Alto",
    "duration": "65-75 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta estática o elíptica",
        "20 círculos de hombros (adelante y atrás)",
        "15 aperturas de pecho con banda",
        "10 push-ups de rodilla lentos",
        "10 rotaciones de hombro con banda c/lado"
      ],
      "mobility": [
        "Apertura de pecho en marco de puerta (30 seg)",
        "Extensión de muñeca y antebrazo (20 seg c/lado)",
        "Rotación interna/externa de hombro (15 reps c/lado)"
      ],
      "mental": "El pecho y hombros definen tu postura. Cada press es una afirmación de fuerza. Activa el músculo desde el inicio, no solo mueves peso."
    },
    "workout": {
      "blocks": [
        {
          "name": "Fuerza pecho",
          "exercises": [
            {
              "id": "bench_flat",
              "name": "Press de banca plano (barra)",
              "muscle": "Pectoral mayor, Tríceps, Deltoides ant.",
              "equip": "Barra + banco",
              "sets": "5",
              "reps": "8",
              "rest": "120 seg",
              "notes": "",
              "weight_guide": "80% RM"
            },
            {
              "id": "bench_incline",
              "name": "Press inclinado 30° (barra)",
              "muscle": "Pectoral mayor superior, Deltoides ant.",
              "equip": "Barra + banco inclinado",
              "sets": "4",
              "reps": "8",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Volumen",
          "exercises": [
            {
              "id": "db_fly_flat",
              "name": "Apertura plana (mancuernas)",
              "muscle": "Pectoral mayor (estiramiento)",
              "equip": "Mancuernas + banco",
              "sets": "3",
              "reps": "14",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "dips_chest",
              "name": "Fondos en paralelas (pecho)",
              "muscle": "Pectoral mayor inferior, Tríceps",
              "equip": "Paralelas",
              "sets": "4",
              "reps": "12",
              "rest": "75 seg",
              "notes": "Con lastre si posible",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Tríceps",
          "exercises": [
            {
              "id": "skull_crusher",
              "name": "Press francés / skullcrusher",
              "muscle": "Tríceps (cabeza larga)",
              "equip": "Barra Z o mancuernas",
              "sets": "4",
              "reps": "10",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "overhead_ext_cable",
              "name": "Extensión overhead en cable",
              "muscle": "Tríceps cabeza larga (estiramiento)",
              "equip": "Cable bajo + cuerda",
              "sets": "3",
              "reps": "14",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata suave",
        "Respiración profunda: 5 respiraciones largas"
      ],
      "stretches": [
        "Estiramiento pecho en marco de puerta (30 seg, 3 ángulos: bajo/medio/alto)",
        "Tríceps sobre la cabeza (35 seg c/lado)",
        "Cruce de brazo (deltoides anterior, 25 seg c/lado)",
        "Extensión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Proteína en los 45 min siguientes. Si entrenaste en ayunas, prioriza fuente rápida (suero de leche). El pecho requiere entre 0.3-0.4 g/kg de proteína por sesión para síntesis óptima.",
      "recovery": "48h de descanso antes de volver a empujar pesado. Puedes hacer cardio suave o espalda al día siguiente sin problema."
    }
  },
  {
    "id": 59,
    "phase": 3,
    "type": "C",
    "name": "Espalda — T-bar pesado + dominadas (C11)",
    "intensity": "Alto",
    "duration": "70-80 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min remo ergómetro suave",
        "15 retracciones escapulares con banda",
        "Colgarse de barra: 3 × 20 seg",
        "10 superman lentos en el suelo",
        "Rotación externa de hombro con banda: 15 reps c/lado"
      ],
      "mobility": [
        "Movilidad de hombro: círculos de brazo (20 c/dirección)",
        "Estiramiento de antebrazo dorsal (20 seg c/lado)",
        "Descompresión lumbar: colgado de barra 30 seg"
      ],
      "mental": "La espalda fuerte es el escudo del cuerpo. El 80% de los dolores lumbares se previenen con espalda fuerte. Cada jalón acerca tu objetivo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Tirón",
          "exercises": [
            {
              "id": "pullup",
              "name": "Dominadas (agarre prono)",
              "muscle": "Dorsal ancho, Romboides, Bíceps",
              "equip": "Barra de dominadas",
              "sets": "5",
              "reps": "8-12",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "chinup",
              "name": "Chin-up (agarre supino)",
              "muscle": "Dorsal ancho, Bíceps (énfasis)",
              "equip": "Barra de dominadas",
              "sets": "3",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Remos",
          "exercises": [
            {
              "id": "row_bar",
              "name": "Remo con barra inclinado",
              "muscle": "Dorsal ancho, Romboides, Trapecio medio",
              "equip": "Barra",
              "sets": "5",
              "reps": "8",
              "rest": "90 seg",
              "notes": "Pesado",
              "weight_guide": ""
            },
            {
              "id": "row_tbar",
              "name": "Remo T-bar",
              "muscle": "Dorsal ancho, Romboides, Trapecio",
              "equip": "T-bar o barra",
              "sets": "4",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Bíceps",
          "exercises": [
            {
              "id": "curl_bar",
              "name": "Curl con barra recta o Z",
              "muscle": "Bíceps braquial",
              "equip": "Barra Z o recta",
              "sets": "4",
              "reps": "10",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "curl_incline",
              "name": "Curl en banco inclinado",
              "muscle": "Bíceps (cabeza larga, estiramiento)",
              "equip": "Mancuernas + banco inclinado",
              "sets": "3",
              "reps": "12 c/lado",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata o trote suave",
        "Colgado de barra: 30 seg (descompresión)",
        "Respiración profunda: 5 ciclos"
      ],
      "stretches": [
        "Estiramiento dorsal: brazo en alto con inclinación lateral (30 seg c/lado)",
        "Bíceps contra pared, palma arriba (25 seg c/lado)",
        "Gato-vaca en el suelo: 10 reps lentas",
        "Niño extendido con brazos al frente (45 seg)",
        "Extensión y flexión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Alta demanda proteica: la espalda es el grupo muscular más grande de la parte superior. Prioriza 30-40g de proteína en los 60 min post-entreno.",
      "recovery": "La espalda y bíceps se recuperan en 48-72h. Si sientes rigidez lumbar, aplica calor suave y haz movilidad de cadera al día siguiente."
    }
  },
  {
    "id": 60,
    "phase": 3,
    "type": "E",
    "name": "Cardio — 45 min trote continuo",
    "intensity": "Medio",
    "duration": "70-80 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata suave",
        "10 círculos de tobillo c/lado",
        "Extensiones de pantorrilla lentas: 20 reps",
        "Elevaciones de rodilla marchando: 30 seg"
      ],
      "mobility": [
        "Estiramiento dinámico de cuádriceps (10 c/lado)",
        "Estiramiento isquiotibial de pie (20 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)"
      ],
      "mental": "El cardio es una meditación en movimiento. Hoy no compites contra nadie. Solo construyes tu motor aeróbico ladrillo a ladrillo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Cardio",
          "exercises": [
            {
              "id": "treadmill_jog",
              "name": "Trote continuo",
              "muscle": "Sistema cardiovascular, Pantorrillas",
              "equip": "Cinta / parque",
              "sets": "1",
              "reps": "45 min",
              "rest": "--",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Movilidad",
          "exercises": [
            {
              "id": "pigeon",
              "name": "Paloma / figura 4 (piriforme)",
              "muscle": "Piriforme, Glúteo profundo",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "50 seg c/lado",
              "rest": "20 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "psoas_stretch",
              "name": "Estiramiento de psoas (estocada)",
              "muscle": "Psoas, Recto femoral",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "45 seg c/lado",
              "rest": "20 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata muy lenta",
        "Respiración controlada: 5 min sentado"
      ],
      "stretches": [
        "Psoas (estocada estática): 45 seg c/lado",
        "Piriforme/paloma en suelo: 45 seg c/lado",
        "Isquiotibiales con cinta: 40 seg c/lado",
        "Apertura de pecho en suelo (brazos en T): 60 seg",
        "Perro boca abajo: 45 seg",
        "Pose del niño: 60 seg",
        "Savasana / respiración consciente: 3 min"
      ],
      "nutrition": "El cardio quema glucógeno. Repón con carbohidratos en los 30 min siguientes si vas a entrenar mañana. Si es día de recuperación, puedes priorizar proteína y grasas buenas.",
      "recovery": "Hidratación post-cardio: repón electrolitos si sudaste mucho (agua con limón + pizca de sal). El cardio activa el sistema parasimpático si lo mantienes aeróbico."
    }
  },
  {
    "id": 61,
    "phase": 3,
    "type": "F",
    "name": "Full Body — Fuerza + resistencia (F7)",
    "intensity": "Alto",
    "duration": "70-80 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "7 min trote suave",
        "10 jumping jacks",
        "10 sentadillas cuerpo libre",
        "10 push-ups de rodilla",
        "10 remo con banda",
        "5 burpees lentos"
      ],
      "mobility": [
        "Gato-vaca: 10 reps lentas",
        "Apertura de cadera 90/90: 30 seg c/lado",
        "Movilidad de hombros: círculos 20 c/dirección"
      ],
      "mental": "El full body te entrena como atleta completo. Cada patrón de movimiento (empuje, tirón, sentadilla, bisagra) te hace más funcional en la vida real."
    },
    "workout": {
      "blocks": [
        {
          "name": "HIIT full body (5 rondas)",
          "exercises": [
            {
              "id": "box_jump",
              "name": "Salto al cajón (box jump)",
              "muscle": "Cuádriceps, Glúteo, Pantorrillas, Potencia",
              "equip": "Cajón pliométrico",
              "sets": "5",
              "reps": "8",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "bench_flat",
              "name": "Press de banca plano (barra)",
              "muscle": "Pectoral mayor, Tríceps, Deltoides ant.",
              "equip": "Barra + banco",
              "sets": "5",
              "reps": "8",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "row_bar",
              "name": "Remo con barra inclinado",
              "muscle": "Dorsal ancho, Romboides, Trapecio medio",
              "equip": "Barra",
              "sets": "5",
              "reps": "8",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "burpee",
              "name": "Burpee",
              "muscle": "Full body, Sistema cardiovascular",
              "equip": "Peso corporal",
              "sets": "5",
              "reps": "8",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave",
        "Respiración: 4 inhala / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps (30 seg c/lado)",
        "Isquiotibiales (30 seg c/lado)",
        "Pecho en marco de puerta (25 seg)",
        "Dorsal en inclinación (25 seg c/lado)",
        "Rotación espinal tumbado (25 seg c/lado)",
        "Niño extendido (45 seg)"
      ],
      "nutrition": "Sesión full body: alta demanda energética. Meal completa: 30-40g proteína + 60-80g carbohidratos + verduras. Es tu mejor momento para absorber nutrientes.",
      "recovery": "El full body genera más fatiga sistémica que un split. Descansa 48h antes del próximo full body. Un día de cardio suave o movilidad entre sesiones es ideal."
    }
  },
  {
    "id": 62,
    "phase": 3,
    "type": "A",
    "name": "Piernas — Cuádriceps y glúteo en máquina (A12)",
    "intensity": "Alto",
    "duration": "75-85 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata rápida o trote suave",
        "20 círculos de cadera (10 c/lado)",
        "15 sentadillas de activación sin peso",
        "10 puentes de glúteo lentos",
        "10 rotaciones de rodilla c/lado"
      ],
      "mobility": [
        "Movilidad tobillo: círculos + flexión (30 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)",
        "Desbloqueo psoas: rodilla en suelo, inclinación adelante (20 seg c/lado)"
      ],
      "mental": "Visualiza la sesión completa. El tren inferior es el motor del cuerpo. Cada rep construye la base de tu maratón."
    },
    "workout": {
      "blocks": [
        {
          "name": "Compound",
          "exercises": [
            {
              "id": "squat_bar",
              "name": "Sentadilla trasera (barra)",
              "muscle": "Cuádriceps, Glúteo mayor",
              "equip": "Barra + Rack",
              "sets": "5",
              "reps": "6",
              "rest": "120 seg",
              "notes": "Fase 3: peso máximo.",
              "weight_guide": ""
            },
            {
              "id": "rdl",
              "name": "Peso muerto rumano",
              "muscle": "Isquiotibiales, Glúteo mayor, Erectores",
              "equip": "Barra o mancuernas",
              "sets": "4",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Unilateral + glúteo",
          "exercises": [
            {
              "id": "bulgarian",
              "name": "Zancada búlgara (pie elevado)",
              "muscle": "Cuádriceps, Glúteo mayor/medio",
              "equip": "Mancuernas + banco",
              "sets": "4",
              "reps": "10 c/pierna",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": "Mancuernas pesadas"
            },
            {
              "id": "nordic_curl",
              "name": "Nordic curl (curl nórdico)",
              "muscle": "Isquiotibiales",
              "equip": "Banco / compañero",
              "sets": "3",
              "reps": "6",
              "rest": "120 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "hip_thrust",
              "name": "Hip thrust (barra)",
              "muscle": "Glúteo mayor",
              "equip": "Barra + banco",
              "sets": "3",
              "reps": "15",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Core",
          "exercises": [
            {
              "id": "ab_wheel",
              "name": "Rueda abdominal (ab wheel)",
              "muscle": "Transverso, Recto abdominal, Dorsal",
              "equip": "Ab wheel",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "hollow_body",
              "name": "Hollow body hold",
              "muscle": "Core completo, Transverso",
              "equip": "Peso corporal",
              "sets": "3",
              "reps": "35 seg",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave para bajar FC",
        "Respiración: 4 inhala / 4 retén / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps de pie (40 seg c/lado)",
        "Isquiotibial con banda o toalla (40 seg c/lado)",
        "Paloma/figura 4 glúteo en suelo (45 seg c/lado)",
        "Aductor sentado pies juntos (30 seg)",
        "Pantorrilla contra pared (25 seg c/lado)",
        "Torsión espinal tumbado (30 seg c/lado)"
      ],
      "nutrition": "Ingiere proteína + carbohidrato en los 30-60 min siguientes (ej: batido de proteína + plátano, o arroz con pollo). Los carbohidratos post-piernas son esenciales para reponer glucógeno muscular.",
      "recovery": "Piernas: 48-72h de recuperación antes del próximo estímulo pesado de piernas. Si sientes DOMS (agujetas) intensas, camina suave y toma baño frío de pies."
    }
  },
  {
    "id": 63,
    "phase": 3,
    "type": "D",
    "name": "Hombros — Arnold press + manguito avanzado (D9)",
    "intensity": "Alto",
    "duration": "65-75 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta o elíptica",
        "Rotación externa con banda: 15 reps c/lado",
        "15 encogimientos circulares de hombros",
        "Y-T-W con banda elástica: 10 reps c/posición",
        "10 elevaciones frontales muy ligeras"
      ],
      "mobility": [
        "Péndulo de brazo: 30 seg c/lado",
        "Sleeper stretch (rotación interna): 20 seg c/lado",
        "Estiramiento cruzado de hombro: 20 seg c/lado"
      ],
      "mental": "Los hombros son el punto débil más frecuente. Trabaja siempre con control, nunca con inercia. El manguito rotador vale más que el peso en la barra."
    },
    "workout": {
      "blocks": [
        {
          "name": "Press y laterales",
          "exercises": [
            {
              "id": "ohp_bar",
              "name": "Press militar con barra (de pie)",
              "muscle": "Deltoides anterior, Tríceps, Core",
              "equip": "Barra",
              "sets": "5",
              "reps": "8",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": "Pesado"
            },
            {
              "id": "lateral_raise",
              "name": "Elevación lateral (mancuernas)",
              "muscle": "Deltoides lateral",
              "equip": "Mancuernas",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "arnold_press",
              "name": "Press Arnold",
              "muscle": "Deltoides (3 haces), Trapecio",
              "equip": "Mancuernas",
              "sets": "3",
              "reps": "12",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Posterior y manguito",
          "exercises": [
            {
              "id": "rear_delt_fly",
              "name": "Pájaro (deltoides posterior)",
              "muscle": "Deltoides posterior, Romboides",
              "equip": "Mancuernas (tronco inclinado)",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "facepull",
              "name": "Facepull con cuerda",
              "muscle": "Trapecio inferior, Deltoides post., Manguito",
              "equip": "Cable alto + cuerda",
              "sets": "3",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "rotator_cable",
              "name": "Rotación externa en cable",
              "muscle": "Manguito rotador",
              "equip": "Cable bajo",
              "sets": "3",
              "reps": "15 c/lado",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min movilidad suave de hombros: péndulos y círculos",
        "Respiración diafragmática: 3 min"
      ],
      "stretches": [
        "Estiramiento sleeper (rotación interna): 30 seg c/lado",
        "Cruzado de hombro: 30 seg c/lado",
        "Trapecio: inclinación lateral de cabeza (25 seg c/lado)",
        "Extensión de hombro posterior: brazo cruzado bajo (25 seg c/lado)"
      ],
      "nutrition": "Los hombros son articulaciones complejas: además de proteína, asegura ingesta de colágeno (gelatina o suplemento) para salud del manguito rotador.",
      "recovery": "Los hombros se involucran en casi todos los ejercicios. Prioriza el descanso de este grupo si sientes fatiga articular. Masaje suave en zona del trapecio si hay tensión."
    }
  },
  {
    "id": 64,
    "phase": 3,
    "type": "B",
    "name": "Pecho — Press inclinado pesado + superseries (B12)",
    "intensity": "Alto",
    "duration": "65-75 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta estática o elíptica",
        "20 círculos de hombros (adelante y atrás)",
        "15 aperturas de pecho con banda",
        "10 push-ups de rodilla lentos",
        "10 rotaciones de hombro con banda c/lado"
      ],
      "mobility": [
        "Apertura de pecho en marco de puerta (30 seg)",
        "Extensión de muñeca y antebrazo (20 seg c/lado)",
        "Rotación interna/externa de hombro (15 reps c/lado)"
      ],
      "mental": "El pecho y hombros definen tu postura. Cada press es una afirmación de fuerza. Activa el músculo desde el inicio, no solo mueves peso."
    },
    "workout": {
      "blocks": [
        {
          "name": "Fuerza pecho",
          "exercises": [
            {
              "id": "bench_flat",
              "name": "Press de banca plano (barra)",
              "muscle": "Pectoral mayor, Tríceps, Deltoides ant.",
              "equip": "Barra + banco",
              "sets": "5",
              "reps": "8",
              "rest": "120 seg",
              "notes": "",
              "weight_guide": "80% RM"
            },
            {
              "id": "bench_incline",
              "name": "Press inclinado 30° (barra)",
              "muscle": "Pectoral mayor superior, Deltoides ant.",
              "equip": "Barra + banco inclinado",
              "sets": "4",
              "reps": "8",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Volumen",
          "exercises": [
            {
              "id": "db_fly_flat",
              "name": "Apertura plana (mancuernas)",
              "muscle": "Pectoral mayor (estiramiento)",
              "equip": "Mancuernas + banco",
              "sets": "3",
              "reps": "14",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "dips_chest",
              "name": "Fondos en paralelas (pecho)",
              "muscle": "Pectoral mayor inferior, Tríceps",
              "equip": "Paralelas",
              "sets": "4",
              "reps": "12",
              "rest": "75 seg",
              "notes": "Con lastre si posible",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Tríceps",
          "exercises": [
            {
              "id": "skull_crusher",
              "name": "Press francés / skullcrusher",
              "muscle": "Tríceps (cabeza larga)",
              "equip": "Barra Z o mancuernas",
              "sets": "4",
              "reps": "10",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "overhead_ext_cable",
              "name": "Extensión overhead en cable",
              "muscle": "Tríceps cabeza larga (estiramiento)",
              "equip": "Cable bajo + cuerda",
              "sets": "3",
              "reps": "14",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata suave",
        "Respiración profunda: 5 respiraciones largas"
      ],
      "stretches": [
        "Estiramiento pecho en marco de puerta (30 seg, 3 ángulos: bajo/medio/alto)",
        "Tríceps sobre la cabeza (35 seg c/lado)",
        "Cruce de brazo (deltoides anterior, 25 seg c/lado)",
        "Extensión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Proteína en los 45 min siguientes. Si entrenaste en ayunas, prioriza fuente rápida (suero de leche). El pecho requiere entre 0.3-0.4 g/kg de proteína por sesión para síntesis óptima.",
      "recovery": "48h de descanso antes de volver a empujar pesado. Puedes hacer cardio suave o espalda al día siguiente sin problema."
    }
  },
  {
    "id": 65,
    "phase": 3,
    "type": "C",
    "name": "Espalda + Bíceps — Chin-ups + remos (C12)",
    "intensity": "Alto",
    "duration": "70-80 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min remo ergómetro suave",
        "15 retracciones escapulares con banda",
        "Colgarse de barra: 3 × 20 seg",
        "10 superman lentos en el suelo",
        "Rotación externa de hombro con banda: 15 reps c/lado"
      ],
      "mobility": [
        "Movilidad de hombro: círculos de brazo (20 c/dirección)",
        "Estiramiento de antebrazo dorsal (20 seg c/lado)",
        "Descompresión lumbar: colgado de barra 30 seg"
      ],
      "mental": "La espalda fuerte es el escudo del cuerpo. El 80% de los dolores lumbares se previenen con espalda fuerte. Cada jalón acerca tu objetivo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Tirón",
          "exercises": [
            {
              "id": "pullup",
              "name": "Dominadas (agarre prono)",
              "muscle": "Dorsal ancho, Romboides, Bíceps",
              "equip": "Barra de dominadas",
              "sets": "5",
              "reps": "8-12",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "chinup",
              "name": "Chin-up (agarre supino)",
              "muscle": "Dorsal ancho, Bíceps (énfasis)",
              "equip": "Barra de dominadas",
              "sets": "3",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Remos",
          "exercises": [
            {
              "id": "row_bar",
              "name": "Remo con barra inclinado",
              "muscle": "Dorsal ancho, Romboides, Trapecio medio",
              "equip": "Barra",
              "sets": "5",
              "reps": "8",
              "rest": "90 seg",
              "notes": "Pesado",
              "weight_guide": ""
            },
            {
              "id": "row_tbar",
              "name": "Remo T-bar",
              "muscle": "Dorsal ancho, Romboides, Trapecio",
              "equip": "T-bar o barra",
              "sets": "4",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Bíceps",
          "exercises": [
            {
              "id": "curl_bar",
              "name": "Curl con barra recta o Z",
              "muscle": "Bíceps braquial",
              "equip": "Barra Z o recta",
              "sets": "4",
              "reps": "10",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "curl_incline",
              "name": "Curl en banco inclinado",
              "muscle": "Bíceps (cabeza larga, estiramiento)",
              "equip": "Mancuernas + banco inclinado",
              "sets": "3",
              "reps": "12 c/lado",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata o trote suave",
        "Colgado de barra: 30 seg (descompresión)",
        "Respiración profunda: 5 ciclos"
      ],
      "stretches": [
        "Estiramiento dorsal: brazo en alto con inclinación lateral (30 seg c/lado)",
        "Bíceps contra pared, palma arriba (25 seg c/lado)",
        "Gato-vaca en el suelo: 10 reps lentas",
        "Niño extendido con brazos al frente (45 seg)",
        "Extensión y flexión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Alta demanda proteica: la espalda es el grupo muscular más grande de la parte superior. Prioriza 30-40g de proteína en los 60 min post-entreno.",
      "recovery": "La espalda y bíceps se recuperan en 48-72h. Si sientes rigidez lumbar, aplica calor suave y haz movilidad de cadera al día siguiente."
    }
  },
  {
    "id": 66,
    "phase": 3,
    "type": "E",
    "name": "Cardio — Intervalos 5K velocidad",
    "intensity": "Medio",
    "duration": "60-70 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata suave",
        "10 círculos de tobillo c/lado",
        "Extensiones de pantorrilla lentas: 20 reps",
        "Elevaciones de rodilla marchando: 30 seg"
      ],
      "mobility": [
        "Estiramiento dinámico de cuádriceps (10 c/lado)",
        "Estiramiento isquiotibial de pie (20 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)"
      ],
      "mental": "El cardio es una meditación en movimiento. Hoy no compites contra nadie. Solo construyes tu motor aeróbico ladrillo a ladrillo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Cardio",
          "exercises": [
            {
              "id": "treadmill_jog",
              "name": "Trote continuo",
              "muscle": "Sistema cardiovascular, Pantorrillas",
              "equip": "Cinta / parque",
              "sets": "8",
              "reps": "90 seg rápido / 60 seg caminar",
              "rest": "--",
              "notes": "Intervalos al 85-90% FC máx.",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Movilidad",
          "exercises": [
            {
              "id": "pigeon",
              "name": "Paloma / figura 4 (piriforme)",
              "muscle": "Piriforme, Glúteo profundo",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "50 seg c/lado",
              "rest": "20 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "psoas_stretch",
              "name": "Estiramiento de psoas (estocada)",
              "muscle": "Psoas, Recto femoral",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "45 seg c/lado",
              "rest": "20 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata muy lenta",
        "Respiración controlada: 5 min sentado"
      ],
      "stretches": [
        "Psoas (estocada estática): 45 seg c/lado",
        "Piriforme/paloma en suelo: 45 seg c/lado",
        "Isquiotibiales con cinta: 40 seg c/lado",
        "Apertura de pecho en suelo (brazos en T): 60 seg",
        "Perro boca abajo: 45 seg",
        "Pose del niño: 60 seg",
        "Savasana / respiración consciente: 3 min"
      ],
      "nutrition": "El cardio quema glucógeno. Repón con carbohidratos en los 30 min siguientes si vas a entrenar mañana. Si es día de recuperación, puedes priorizar proteína y grasas buenas.",
      "recovery": "Hidratación post-cardio: repón electrolitos si sudaste mucho (agua con limón + pizca de sal). El cardio activa el sistema parasimpático si lo mantienes aeróbico."
    }
  },
  {
    "id": 67,
    "phase": 3,
    "type": "A",
    "name": "Piernas — Peso muerto máximo + unilateral (A13)",
    "intensity": "Alto",
    "duration": "75-85 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata rápida o trote suave",
        "20 círculos de cadera (10 c/lado)",
        "15 sentadillas de activación sin peso",
        "10 puentes de glúteo lentos",
        "10 rotaciones de rodilla c/lado"
      ],
      "mobility": [
        "Movilidad tobillo: círculos + flexión (30 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)",
        "Desbloqueo psoas: rodilla en suelo, inclinación adelante (20 seg c/lado)"
      ],
      "mental": "Visualiza la sesión completa. El tren inferior es el motor del cuerpo. Cada rep construye la base de tu maratón."
    },
    "workout": {
      "blocks": [
        {
          "name": "Compound",
          "exercises": [
            {
              "id": "squat_bar",
              "name": "Sentadilla trasera (barra)",
              "muscle": "Cuádriceps, Glúteo mayor",
              "equip": "Barra + Rack",
              "sets": "5",
              "reps": "6",
              "rest": "120 seg",
              "notes": "Fase 3: peso máximo.",
              "weight_guide": ""
            },
            {
              "id": "rdl",
              "name": "Peso muerto rumano",
              "muscle": "Isquiotibiales, Glúteo mayor, Erectores",
              "equip": "Barra o mancuernas",
              "sets": "4",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Unilateral + glúteo",
          "exercises": [
            {
              "id": "bulgarian",
              "name": "Zancada búlgara (pie elevado)",
              "muscle": "Cuádriceps, Glúteo mayor/medio",
              "equip": "Mancuernas + banco",
              "sets": "4",
              "reps": "10 c/pierna",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": "Mancuernas pesadas"
            },
            {
              "id": "nordic_curl",
              "name": "Nordic curl (curl nórdico)",
              "muscle": "Isquiotibiales",
              "equip": "Banco / compañero",
              "sets": "3",
              "reps": "6",
              "rest": "120 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "hip_thrust",
              "name": "Hip thrust (barra)",
              "muscle": "Glúteo mayor",
              "equip": "Barra + banco",
              "sets": "3",
              "reps": "15",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Core",
          "exercises": [
            {
              "id": "ab_wheel",
              "name": "Rueda abdominal (ab wheel)",
              "muscle": "Transverso, Recto abdominal, Dorsal",
              "equip": "Ab wheel",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "hollow_body",
              "name": "Hollow body hold",
              "muscle": "Core completo, Transverso",
              "equip": "Peso corporal",
              "sets": "3",
              "reps": "35 seg",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave para bajar FC",
        "Respiración: 4 inhala / 4 retén / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps de pie (40 seg c/lado)",
        "Isquiotibial con banda o toalla (40 seg c/lado)",
        "Paloma/figura 4 glúteo en suelo (45 seg c/lado)",
        "Aductor sentado pies juntos (30 seg)",
        "Pantorrilla contra pared (25 seg c/lado)",
        "Torsión espinal tumbado (30 seg c/lado)"
      ],
      "nutrition": "Ingiere proteína + carbohidrato en los 30-60 min siguientes (ej: batido de proteína + plátano, o arroz con pollo). Los carbohidratos post-piernas son esenciales para reponer glucógeno muscular.",
      "recovery": "Piernas: 48-72h de recuperación antes del próximo estímulo pesado de piernas. Si sientes DOMS (agujetas) intensas, camina suave y toma baño frío de pies."
    }
  },
  {
    "id": 68,
    "phase": 3,
    "type": "B",
    "name": "Pecho + Tríceps — Banca + dips + HIIT (B13)",
    "intensity": "Alto",
    "duration": "65-75 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta estática o elíptica",
        "20 círculos de hombros (adelante y atrás)",
        "15 aperturas de pecho con banda",
        "10 push-ups de rodilla lentos",
        "10 rotaciones de hombro con banda c/lado"
      ],
      "mobility": [
        "Apertura de pecho en marco de puerta (30 seg)",
        "Extensión de muñeca y antebrazo (20 seg c/lado)",
        "Rotación interna/externa de hombro (15 reps c/lado)"
      ],
      "mental": "El pecho y hombros definen tu postura. Cada press es una afirmación de fuerza. Activa el músculo desde el inicio, no solo mueves peso."
    },
    "workout": {
      "blocks": [
        {
          "name": "Fuerza pecho",
          "exercises": [
            {
              "id": "bench_flat",
              "name": "Press de banca plano (barra)",
              "muscle": "Pectoral mayor, Tríceps, Deltoides ant.",
              "equip": "Barra + banco",
              "sets": "5",
              "reps": "8",
              "rest": "120 seg",
              "notes": "",
              "weight_guide": "80% RM"
            },
            {
              "id": "bench_incline",
              "name": "Press inclinado 30° (barra)",
              "muscle": "Pectoral mayor superior, Deltoides ant.",
              "equip": "Barra + banco inclinado",
              "sets": "4",
              "reps": "8",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Volumen",
          "exercises": [
            {
              "id": "db_fly_flat",
              "name": "Apertura plana (mancuernas)",
              "muscle": "Pectoral mayor (estiramiento)",
              "equip": "Mancuernas + banco",
              "sets": "3",
              "reps": "14",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "dips_chest",
              "name": "Fondos en paralelas (pecho)",
              "muscle": "Pectoral mayor inferior, Tríceps",
              "equip": "Paralelas",
              "sets": "4",
              "reps": "12",
              "rest": "75 seg",
              "notes": "Con lastre si posible",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Tríceps",
          "exercises": [
            {
              "id": "skull_crusher",
              "name": "Press francés / skullcrusher",
              "muscle": "Tríceps (cabeza larga)",
              "equip": "Barra Z o mancuernas",
              "sets": "4",
              "reps": "10",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "overhead_ext_cable",
              "name": "Extensión overhead en cable",
              "muscle": "Tríceps cabeza larga (estiramiento)",
              "equip": "Cable bajo + cuerda",
              "sets": "3",
              "reps": "14",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata suave",
        "Respiración profunda: 5 respiraciones largas"
      ],
      "stretches": [
        "Estiramiento pecho en marco de puerta (30 seg, 3 ángulos: bajo/medio/alto)",
        "Tríceps sobre la cabeza (35 seg c/lado)",
        "Cruce de brazo (deltoides anterior, 25 seg c/lado)",
        "Extensión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Proteína en los 45 min siguientes. Si entrenaste en ayunas, prioriza fuente rápida (suero de leche). El pecho requiere entre 0.3-0.4 g/kg de proteína por sesión para síntesis óptima.",
      "recovery": "48h de descanso antes de volver a empujar pesado. Puedes hacer cardio suave o espalda al día siguiente sin problema."
    }
  },
  {
    "id": 69,
    "phase": 3,
    "type": "C",
    "name": "Espalda — Dominadas +sets + bíceps (C13)",
    "intensity": "Alto",
    "duration": "70-80 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min remo ergómetro suave",
        "15 retracciones escapulares con banda",
        "Colgarse de barra: 3 × 20 seg",
        "10 superman lentos en el suelo",
        "Rotación externa de hombro con banda: 15 reps c/lado"
      ],
      "mobility": [
        "Movilidad de hombro: círculos de brazo (20 c/dirección)",
        "Estiramiento de antebrazo dorsal (20 seg c/lado)",
        "Descompresión lumbar: colgado de barra 30 seg"
      ],
      "mental": "La espalda fuerte es el escudo del cuerpo. El 80% de los dolores lumbares se previenen con espalda fuerte. Cada jalón acerca tu objetivo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Tirón",
          "exercises": [
            {
              "id": "pullup",
              "name": "Dominadas (agarre prono)",
              "muscle": "Dorsal ancho, Romboides, Bíceps",
              "equip": "Barra de dominadas",
              "sets": "5",
              "reps": "8-12",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "chinup",
              "name": "Chin-up (agarre supino)",
              "muscle": "Dorsal ancho, Bíceps (énfasis)",
              "equip": "Barra de dominadas",
              "sets": "3",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Remos",
          "exercises": [
            {
              "id": "row_bar",
              "name": "Remo con barra inclinado",
              "muscle": "Dorsal ancho, Romboides, Trapecio medio",
              "equip": "Barra",
              "sets": "5",
              "reps": "8",
              "rest": "90 seg",
              "notes": "Pesado",
              "weight_guide": ""
            },
            {
              "id": "row_tbar",
              "name": "Remo T-bar",
              "muscle": "Dorsal ancho, Romboides, Trapecio",
              "equip": "T-bar o barra",
              "sets": "4",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Bíceps",
          "exercises": [
            {
              "id": "curl_bar",
              "name": "Curl con barra recta o Z",
              "muscle": "Bíceps braquial",
              "equip": "Barra Z o recta",
              "sets": "4",
              "reps": "10",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "curl_incline",
              "name": "Curl en banco inclinado",
              "muscle": "Bíceps (cabeza larga, estiramiento)",
              "equip": "Mancuernas + banco inclinado",
              "sets": "3",
              "reps": "12 c/lado",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata o trote suave",
        "Colgado de barra: 30 seg (descompresión)",
        "Respiración profunda: 5 ciclos"
      ],
      "stretches": [
        "Estiramiento dorsal: brazo en alto con inclinación lateral (30 seg c/lado)",
        "Bíceps contra pared, palma arriba (25 seg c/lado)",
        "Gato-vaca en el suelo: 10 reps lentas",
        "Niño extendido con brazos al frente (45 seg)",
        "Extensión y flexión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Alta demanda proteica: la espalda es el grupo muscular más grande de la parte superior. Prioriza 30-40g de proteína en los 60 min post-entreno.",
      "recovery": "La espalda y bíceps se recuperan en 48-72h. Si sientes rigidez lumbar, aplica calor suave y haz movilidad de cadera al día siguiente."
    }
  },
  {
    "id": 70,
    "phase": 3,
    "type": "G",
    "name": "Deload — Fin de Fase 3",
    "intensity": "Bajo",
    "duration": "50-60 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "10 min caminata tranquila",
        "10 círculos de hombros",
        "10 sentadillas suaves sin peso",
        "Respiración diafragmática: 5 respiraciones profundas"
      ],
      "mobility": [
        "Movilidad global suave: 5 min",
        "Foam rolling: zona lumbar y piernas (3 min)"
      ],
      "mental": "El descanso activo NO es perder el tiempo. Es cuando el cuerpo consolida las ganancias. Llega relajado, sin presión de rendimiento."
    },
    "workout": {
      "blocks": [
        {
          "name": "Repaso ligero",
          "exercises": [
            {
              "id": "squat_goblet",
              "name": "Sentadilla goblet (mancuerna)",
              "muscle": "Cuádriceps, Glúteo",
              "equip": "Mancuerna",
              "sets": "2",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "bench_flat",
              "name": "Press de banca plano (barra)",
              "muscle": "Pectoral mayor, Tríceps, Deltoides ant.",
              "equip": "Barra + banco",
              "sets": "2",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "pulldown_neutral",
              "name": "Jalón agarre neutro",
              "muscle": "Dorsal ancho, Bíceps",
              "equip": "Polea + agarre neutro",
              "sets": "2",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "plank",
              "name": "Plancha frontal",
              "muscle": "Transverso abdominal, Core completo",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "30 seg",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Cardio suave",
          "exercises": [
            {
              "id": "treadmill_walk",
              "name": "Caminata rápida (cinta/parque)",
              "muscle": "Sistema cardiovascular",
              "equip": "Cinta / parque",
              "sets": "1",
              "reps": "15 min",
              "rest": "--",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "10 min caminata tranquila",
        "Respiración consciente: 5 min"
      ],
      "stretches": [
        "Rutina completa de estiramiento: 15 min (todos los grupos)",
        "Foam rolling global: isquiotibiales, glúteos, dorsal, pectorales (5 min)",
        "Savasana / meditación (5 min)"
      ],
      "nutrition": "Semana de descarga: mantén ingesta proteica alta pero puedes reducir levemente los carbohidratos si entrenas menos. El cuerpo reconstruye y supracompensa en esta fase.",
      "recovery": "Esta sesión es medicina. No hagas nada más exigente que esto hoy. Duerme 8+ horas esta noche. La semana siguiente empezarás más fuerte."
    }
  },
  {
    "id": 71,
    "phase": 4,
    "type": "A",
    "name": "Piernas — Fuerza máxima + carrera (A14)",
    "intensity": "Alto",
    "duration": "80-90 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata rápida o trote suave",
        "20 círculos de cadera (10 c/lado)",
        "15 sentadillas de activación sin peso",
        "10 puentes de glúteo lentos",
        "10 rotaciones de rodilla c/lado"
      ],
      "mobility": [
        "Movilidad tobillo: círculos + flexión (30 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)",
        "Desbloqueo psoas: rodilla en suelo, inclinación adelante (20 seg c/lado)"
      ],
      "mental": "Visualiza la sesión completa. El tren inferior es el motor del cuerpo. Cada rep construye la base de tu maratón."
    },
    "workout": {
      "blocks": [
        {
          "name": "Compound máximo",
          "exercises": [
            {
              "id": "squat_bar",
              "name": "Sentadilla trasera (barra)",
              "muscle": "Cuádriceps, Glúteo mayor",
              "equip": "Barra + Rack",
              "sets": "5",
              "reps": "5",
              "rest": "150 seg",
              "notes": "Fase 4: fuerza máxima. 90% RM.",
              "weight_guide": "90% RM"
            },
            {
              "id": "deadlift",
              "name": "Peso muerto convencional",
              "muscle": "Cadena posterior completa",
              "equip": "Barra",
              "sets": "4",
              "reps": "5",
              "rest": "150 seg",
              "notes": "",
              "weight_guide": "85% RM"
            }
          ],
          "note": ""
        },
        {
          "name": "Potencia",
          "exercises": [
            {
              "id": "box_jump",
              "name": "Salto al cajón (box jump)",
              "muscle": "Cuádriceps, Glúteo, Pantorrillas, Potencia",
              "equip": "Cajón pliométrico",
              "sets": "4",
              "reps": "6",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "bulgarian",
              "name": "Zancada búlgara (pie elevado)",
              "muscle": "Cuádriceps, Glúteo mayor/medio",
              "equip": "Mancuernas + banco",
              "sets": "4",
              "reps": "10 c/pierna",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Core y resistencia",
          "exercises": [
            {
              "id": "hollow_body",
              "name": "Hollow body hold",
              "muscle": "Core completo, Transverso",
              "equip": "Peso corporal",
              "sets": "4",
              "reps": "40 seg",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "ab_wheel",
              "name": "Rueda abdominal (ab wheel)",
              "muscle": "Transverso, Recto abdominal, Dorsal",
              "equip": "Ab wheel",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave para bajar FC",
        "Respiración: 4 inhala / 4 retén / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps de pie (40 seg c/lado)",
        "Isquiotibial con banda o toalla (40 seg c/lado)",
        "Paloma/figura 4 glúteo en suelo (45 seg c/lado)",
        "Aductor sentado pies juntos (30 seg)",
        "Pantorrilla contra pared (25 seg c/lado)",
        "Torsión espinal tumbado (30 seg c/lado)"
      ],
      "nutrition": "Ingiere proteína + carbohidrato en los 30-60 min siguientes (ej: batido de proteína + plátano, o arroz con pollo). Los carbohidratos post-piernas son esenciales para reponer glucógeno muscular.",
      "recovery": "Piernas: 48-72h de recuperación antes del próximo estímulo pesado de piernas. Si sientes DOMS (agujetas) intensas, camina suave y toma baño frío de pies."
    }
  },
  {
    "id": 72,
    "phase": 4,
    "type": "B",
    "name": "Pecho — PR + funcional (B14)",
    "intensity": "Alto",
    "duration": "65-75 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta estática o elíptica",
        "20 círculos de hombros (adelante y atrás)",
        "15 aperturas de pecho con banda",
        "10 push-ups de rodilla lentos",
        "10 rotaciones de hombro con banda c/lado"
      ],
      "mobility": [
        "Apertura de pecho en marco de puerta (30 seg)",
        "Extensión de muñeca y antebrazo (20 seg c/lado)",
        "Rotación interna/externa de hombro (15 reps c/lado)"
      ],
      "mental": "El pecho y hombros definen tu postura. Cada press es una afirmación de fuerza. Activa el músculo desde el inicio, no solo mueves peso."
    },
    "workout": {
      "blocks": [
        {
          "name": "Fuerza + volumen pecho",
          "exercises": [
            {
              "id": "bench_flat",
              "name": "Press de banca plano (barra)",
              "muscle": "Pectoral mayor, Tríceps, Deltoides ant.",
              "equip": "Barra + banco",
              "sets": "5",
              "reps": "6",
              "rest": "150 seg",
              "notes": "90% RM.",
              "weight_guide": ""
            },
            {
              "id": "bench_incline",
              "name": "Press inclinado 30° (barra)",
              "muscle": "Pectoral mayor superior, Deltoides ant.",
              "equip": "Barra + banco inclinado",
              "sets": "4",
              "reps": "8",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "dips_chest",
              "name": "Fondos en paralelas (pecho)",
              "muscle": "Pectoral mayor inferior, Tríceps",
              "equip": "Paralelas",
              "sets": "4",
              "reps": "12",
              "rest": "75 seg",
              "notes": "Con lastre",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Tríceps",
          "exercises": [
            {
              "id": "skull_crusher",
              "name": "Press francés / skullcrusher",
              "muscle": "Tríceps (cabeza larga)",
              "equip": "Barra Z o mancuernas",
              "sets": "4",
              "reps": "10",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "overhead_ext_cable",
              "name": "Extensión overhead en cable",
              "muscle": "Tríceps cabeza larga (estiramiento)",
              "equip": "Cable bajo + cuerda",
              "sets": "3",
              "reps": "14",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata suave",
        "Respiración profunda: 5 respiraciones largas"
      ],
      "stretches": [
        "Estiramiento pecho en marco de puerta (30 seg, 3 ángulos: bajo/medio/alto)",
        "Tríceps sobre la cabeza (35 seg c/lado)",
        "Cruce de brazo (deltoides anterior, 25 seg c/lado)",
        "Extensión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Proteína en los 45 min siguientes. Si entrenaste en ayunas, prioriza fuente rápida (suero de leche). El pecho requiere entre 0.3-0.4 g/kg de proteína por sesión para síntesis óptima.",
      "recovery": "48h de descanso antes de volver a empujar pesado. Puedes hacer cardio suave o espalda al día siguiente sin problema."
    }
  },
  {
    "id": 73,
    "phase": 4,
    "type": "C",
    "name": "Espalda — Dominadas cargadas + remo (C14)",
    "intensity": "Alto",
    "duration": "70-80 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min remo ergómetro suave",
        "15 retracciones escapulares con banda",
        "Colgarse de barra: 3 × 20 seg",
        "10 superman lentos en el suelo",
        "Rotación externa de hombro con banda: 15 reps c/lado"
      ],
      "mobility": [
        "Movilidad de hombro: círculos de brazo (20 c/dirección)",
        "Estiramiento de antebrazo dorsal (20 seg c/lado)",
        "Descompresión lumbar: colgado de barra 30 seg"
      ],
      "mental": "La espalda fuerte es el escudo del cuerpo. El 80% de los dolores lumbares se previenen con espalda fuerte. Cada jalón acerca tu objetivo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Dominadas cargadas",
          "exercises": [
            {
              "id": "pullup",
              "name": "Dominadas (agarre prono)",
              "muscle": "Dorsal ancho, Romboides, Bíceps",
              "equip": "Barra de dominadas",
              "sets": "5",
              "reps": "6",
              "rest": "150 seg",
              "notes": "Con lastre en cinturón.",
              "weight_guide": ""
            },
            {
              "id": "chinup",
              "name": "Chin-up (agarre supino)",
              "muscle": "Dorsal ancho, Bíceps (énfasis)",
              "equip": "Barra de dominadas",
              "sets": "3",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Remos pesados",
          "exercises": [
            {
              "id": "row_bar",
              "name": "Remo con barra inclinado",
              "muscle": "Dorsal ancho, Romboides, Trapecio medio",
              "equip": "Barra",
              "sets": "5",
              "reps": "8",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": "85% RM"
            },
            {
              "id": "row_tbar",
              "name": "Remo T-bar",
              "muscle": "Dorsal ancho, Romboides, Trapecio",
              "equip": "T-bar o barra",
              "sets": "4",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Bíceps",
          "exercises": [
            {
              "id": "curl_bar",
              "name": "Curl con barra recta o Z",
              "muscle": "Bíceps braquial",
              "equip": "Barra Z o recta",
              "sets": "4",
              "reps": "10",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "farmers_walk",
              "name": "Farmer's walk (caminata granjero)",
              "muscle": "Antebrazos, Core, Trapecio superior",
              "equip": "Mancuernas pesadas",
              "sets": "4",
              "reps": "50m",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata o trote suave",
        "Colgado de barra: 30 seg (descompresión)",
        "Respiración profunda: 5 ciclos"
      ],
      "stretches": [
        "Estiramiento dorsal: brazo en alto con inclinación lateral (30 seg c/lado)",
        "Bíceps contra pared, palma arriba (25 seg c/lado)",
        "Gato-vaca en el suelo: 10 reps lentas",
        "Niño extendido con brazos al frente (45 seg)",
        "Extensión y flexión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Alta demanda proteica: la espalda es el grupo muscular más grande de la parte superior. Prioriza 30-40g de proteína en los 60 min post-entreno.",
      "recovery": "La espalda y bíceps se recuperan en 48-72h. Si sientes rigidez lumbar, aplica calor suave y haz movilidad de cadera al día siguiente."
    }
  },
  {
    "id": 74,
    "phase": 4,
    "type": "E",
    "name": "Carrera — 7K objetivo intermedio",
    "intensity": "Medio",
    "duration": "80-90 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata suave",
        "10 círculos de tobillo c/lado",
        "Extensiones de pantorrilla lentas: 20 reps",
        "Elevaciones de rodilla marchando: 30 seg"
      ],
      "mobility": [
        "Estiramiento dinámico de cuádriceps (10 c/lado)",
        "Estiramiento isquiotibial de pie (20 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)"
      ],
      "mental": "El cardio es una meditación en movimiento. Hoy no compites contra nadie. Solo construyes tu motor aeróbico ladrillo a ladrillo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Carrera continua",
          "exercises": [
            {
              "id": "treadmill_jog",
              "name": "Trote continuo",
              "muscle": "Sistema cardiovascular, Pantorrillas",
              "equip": "Cinta / parque",
              "sets": "1",
              "reps": "7 km",
              "rest": "--",
              "notes": "7K continuo. Ritmo cómodo. Esto es atletismo real.",
              "weight_guide": "Ritmo: 6-8 min/km"
            }
          ],
          "note": ""
        },
        {
          "name": "Recuperación activa",
          "exercises": [
            {
              "id": "treadmill_walk",
              "name": "Caminata rápida (cinta/parque)",
              "muscle": "Sistema cardiovascular",
              "equip": "Cinta / parque",
              "sets": "1",
              "reps": "10 min",
              "rest": "--",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "pigeon",
              "name": "Paloma / figura 4 (piriforme)",
              "muscle": "Piriforme, Glúteo profundo",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "60 seg c/lado",
              "rest": "20 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata muy lenta",
        "Respiración controlada: 5 min sentado"
      ],
      "stretches": [
        "Psoas (estocada estática): 45 seg c/lado",
        "Piriforme/paloma en suelo: 45 seg c/lado",
        "Isquiotibiales con cinta: 40 seg c/lado",
        "Apertura de pecho en suelo (brazos en T): 60 seg",
        "Perro boca abajo: 45 seg",
        "Pose del niño: 60 seg",
        "Savasana / respiración consciente: 3 min"
      ],
      "nutrition": "El cardio quema glucógeno. Repón con carbohidratos en los 30 min siguientes si vas a entrenar mañana. Si es día de recuperación, puedes priorizar proteína y grasas buenas.",
      "recovery": "Hidratación post-cardio: repón electrolitos si sudaste mucho (agua con limón + pizca de sal). El cardio activa el sistema parasimpático si lo mantienes aeróbico."
    }
  },
  {
    "id": 75,
    "phase": 4,
    "type": "D",
    "name": "Hombros — Pesado + battle ropes (D10)",
    "intensity": "Alto",
    "duration": "65-75 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta o elíptica",
        "Rotación externa con banda: 15 reps c/lado",
        "15 encogimientos circulares de hombros",
        "Y-T-W con banda elástica: 10 reps c/posición",
        "10 elevaciones frontales muy ligeras"
      ],
      "mobility": [
        "Péndulo de brazo: 30 seg c/lado",
        "Sleeper stretch (rotación interna): 20 seg c/lado",
        "Estiramiento cruzado de hombro: 20 seg c/lado"
      ],
      "mental": "Los hombros son el punto débil más frecuente. Trabaja siempre con control, nunca con inercia. El manguito rotador vale más que el peso en la barra."
    },
    "workout": {
      "blocks": [
        {
          "name": "Hombros pesado",
          "exercises": [
            {
              "id": "ohp_bar",
              "name": "Press militar con barra (de pie)",
              "muscle": "Deltoides anterior, Tríceps, Core",
              "equip": "Barra",
              "sets": "5",
              "reps": "6",
              "rest": "120 seg",
              "notes": "Fase 4: más pesado que nunca.",
              "weight_guide": "90% RM"
            },
            {
              "id": "lateral_raise",
              "name": "Elevación lateral (mancuernas)",
              "muscle": "Deltoides lateral",
              "equip": "Mancuernas",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "rear_delt_fly",
              "name": "Pájaro (deltoides posterior)",
              "muscle": "Deltoides posterior, Romboides",
              "equip": "Mancuernas (tronco inclinado)",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Manguito",
          "exercises": [
            {
              "id": "rotator_cable",
              "name": "Rotación externa en cable",
              "muscle": "Manguito rotador",
              "equip": "Cable bajo",
              "sets": "3",
              "reps": "15 c/lado",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "scapular_ret",
              "name": "Retracción escapular con banda (T)",
              "muscle": "Trapecio medio/inf., Romboides",
              "equip": "Banda elástica",
              "sets": "3",
              "reps": "15",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min movilidad suave de hombros: péndulos y círculos",
        "Respiración diafragmática: 3 min"
      ],
      "stretches": [
        "Estiramiento sleeper (rotación interna): 30 seg c/lado",
        "Cruzado de hombro: 30 seg c/lado",
        "Trapecio: inclinación lateral de cabeza (25 seg c/lado)",
        "Extensión de hombro posterior: brazo cruzado bajo (25 seg c/lado)"
      ],
      "nutrition": "Los hombros son articulaciones complejas: además de proteína, asegura ingesta de colágeno (gelatina o suplemento) para salud del manguito rotador.",
      "recovery": "Los hombros se involucran en casi todos los ejercicios. Prioriza el descanso de este grupo si sientes fatiga articular. Masaje suave en zona del trapecio si hay tensión."
    }
  },
  {
    "id": 76,
    "phase": 4,
    "type": "F",
    "name": "Full Body — Potencia atlética (F8)",
    "intensity": "Alto",
    "duration": "65-75 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "7 min trote suave",
        "10 jumping jacks",
        "10 sentadillas cuerpo libre",
        "10 push-ups de rodilla",
        "10 remo con banda",
        "5 burpees lentos"
      ],
      "mobility": [
        "Gato-vaca: 10 reps lentas",
        "Apertura de cadera 90/90: 30 seg c/lado",
        "Movilidad de hombros: círculos 20 c/dirección"
      ],
      "mental": "El full body te entrena como atleta completo. Cada patrón de movimiento (empuje, tirón, sentadilla, bisagra) te hace más funcional en la vida real."
    },
    "workout": {
      "blocks": [
        {
          "name": "HIIT potencia (6 rondas)",
          "exercises": [
            {
              "id": "box_jump",
              "name": "Salto al cajón (box jump)",
              "muscle": "Cuádriceps, Glúteo, Pantorrillas, Potencia",
              "equip": "Cajón pliométrico",
              "sets": "6",
              "reps": "6",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "bench_flat",
              "name": "Press de banca plano (barra)",
              "muscle": "Pectoral mayor, Tríceps, Deltoides ant.",
              "equip": "Barra + banco",
              "sets": "6",
              "reps": "6",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": "Pesado"
            },
            {
              "id": "burpee",
              "name": "Burpee",
              "muscle": "Full body, Sistema cardiovascular",
              "equip": "Peso corporal",
              "sets": "6",
              "reps": "10",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave",
        "Respiración: 4 inhala / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps (30 seg c/lado)",
        "Isquiotibiales (30 seg c/lado)",
        "Pecho en marco de puerta (25 seg)",
        "Dorsal en inclinación (25 seg c/lado)",
        "Rotación espinal tumbado (25 seg c/lado)",
        "Niño extendido (45 seg)"
      ],
      "nutrition": "Sesión full body: alta demanda energética. Meal completa: 30-40g proteína + 60-80g carbohidratos + verduras. Es tu mejor momento para absorber nutrientes.",
      "recovery": "El full body genera más fatiga sistémica que un split. Descansa 48h antes del próximo full body. Un día de cardio suave o movilidad entre sesiones es ideal."
    }
  },
  {
    "id": 77,
    "phase": 4,
    "type": "A",
    "name": "Piernas — Squat pesado + plyometría (A15)",
    "intensity": "Alto",
    "duration": "80-90 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata rápida o trote suave",
        "20 círculos de cadera (10 c/lado)",
        "15 sentadillas de activación sin peso",
        "10 puentes de glúteo lentos",
        "10 rotaciones de rodilla c/lado"
      ],
      "mobility": [
        "Movilidad tobillo: círculos + flexión (30 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)",
        "Desbloqueo psoas: rodilla en suelo, inclinación adelante (20 seg c/lado)"
      ],
      "mental": "Visualiza la sesión completa. El tren inferior es el motor del cuerpo. Cada rep construye la base de tu maratón."
    },
    "workout": {
      "blocks": [
        {
          "name": "Compound máximo",
          "exercises": [
            {
              "id": "squat_bar",
              "name": "Sentadilla trasera (barra)",
              "muscle": "Cuádriceps, Glúteo mayor",
              "equip": "Barra + Rack",
              "sets": "5",
              "reps": "5",
              "rest": "150 seg",
              "notes": "Fase 4: fuerza máxima. 90% RM.",
              "weight_guide": "90% RM"
            },
            {
              "id": "deadlift",
              "name": "Peso muerto convencional",
              "muscle": "Cadena posterior completa",
              "equip": "Barra",
              "sets": "4",
              "reps": "5",
              "rest": "150 seg",
              "notes": "",
              "weight_guide": "85% RM"
            }
          ],
          "note": ""
        },
        {
          "name": "Potencia",
          "exercises": [
            {
              "id": "box_jump",
              "name": "Salto al cajón (box jump)",
              "muscle": "Cuádriceps, Glúteo, Pantorrillas, Potencia",
              "equip": "Cajón pliométrico",
              "sets": "4",
              "reps": "6",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "bulgarian",
              "name": "Zancada búlgara (pie elevado)",
              "muscle": "Cuádriceps, Glúteo mayor/medio",
              "equip": "Mancuernas + banco",
              "sets": "4",
              "reps": "10 c/pierna",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Core y resistencia",
          "exercises": [
            {
              "id": "hollow_body",
              "name": "Hollow body hold",
              "muscle": "Core completo, Transverso",
              "equip": "Peso corporal",
              "sets": "4",
              "reps": "40 seg",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "ab_wheel",
              "name": "Rueda abdominal (ab wheel)",
              "muscle": "Transverso, Recto abdominal, Dorsal",
              "equip": "Ab wheel",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave para bajar FC",
        "Respiración: 4 inhala / 4 retén / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps de pie (40 seg c/lado)",
        "Isquiotibial con banda o toalla (40 seg c/lado)",
        "Paloma/figura 4 glúteo en suelo (45 seg c/lado)",
        "Aductor sentado pies juntos (30 seg)",
        "Pantorrilla contra pared (25 seg c/lado)",
        "Torsión espinal tumbado (30 seg c/lado)"
      ],
      "nutrition": "Ingiere proteína + carbohidrato en los 30-60 min siguientes (ej: batido de proteína + plátano, o arroz con pollo). Los carbohidratos post-piernas son esenciales para reponer glucógeno muscular.",
      "recovery": "Piernas: 48-72h de recuperación antes del próximo estímulo pesado de piernas. Si sientes DOMS (agujetas) intensas, camina suave y toma baño frío de pies."
    }
  },
  {
    "id": 78,
    "phase": 4,
    "type": "B",
    "name": "Pecho + Tríceps — Clásico pesado (B15)",
    "intensity": "Alto",
    "duration": "65-75 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta estática o elíptica",
        "20 círculos de hombros (adelante y atrás)",
        "15 aperturas de pecho con banda",
        "10 push-ups de rodilla lentos",
        "10 rotaciones de hombro con banda c/lado"
      ],
      "mobility": [
        "Apertura de pecho en marco de puerta (30 seg)",
        "Extensión de muñeca y antebrazo (20 seg c/lado)",
        "Rotación interna/externa de hombro (15 reps c/lado)"
      ],
      "mental": "El pecho y hombros definen tu postura. Cada press es una afirmación de fuerza. Activa el músculo desde el inicio, no solo mueves peso."
    },
    "workout": {
      "blocks": [
        {
          "name": "Fuerza + volumen pecho",
          "exercises": [
            {
              "id": "bench_flat",
              "name": "Press de banca plano (barra)",
              "muscle": "Pectoral mayor, Tríceps, Deltoides ant.",
              "equip": "Barra + banco",
              "sets": "5",
              "reps": "6",
              "rest": "150 seg",
              "notes": "90% RM.",
              "weight_guide": ""
            },
            {
              "id": "bench_incline",
              "name": "Press inclinado 30° (barra)",
              "muscle": "Pectoral mayor superior, Deltoides ant.",
              "equip": "Barra + banco inclinado",
              "sets": "4",
              "reps": "8",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "dips_chest",
              "name": "Fondos en paralelas (pecho)",
              "muscle": "Pectoral mayor inferior, Tríceps",
              "equip": "Paralelas",
              "sets": "4",
              "reps": "12",
              "rest": "75 seg",
              "notes": "Con lastre",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Tríceps",
          "exercises": [
            {
              "id": "skull_crusher",
              "name": "Press francés / skullcrusher",
              "muscle": "Tríceps (cabeza larga)",
              "equip": "Barra Z o mancuernas",
              "sets": "4",
              "reps": "10",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "overhead_ext_cable",
              "name": "Extensión overhead en cable",
              "muscle": "Tríceps cabeza larga (estiramiento)",
              "equip": "Cable bajo + cuerda",
              "sets": "3",
              "reps": "14",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata suave",
        "Respiración profunda: 5 respiraciones largas"
      ],
      "stretches": [
        "Estiramiento pecho en marco de puerta (30 seg, 3 ángulos: bajo/medio/alto)",
        "Tríceps sobre la cabeza (35 seg c/lado)",
        "Cruce de brazo (deltoides anterior, 25 seg c/lado)",
        "Extensión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Proteína en los 45 min siguientes. Si entrenaste en ayunas, prioriza fuente rápida (suero de leche). El pecho requiere entre 0.3-0.4 g/kg de proteína por sesión para síntesis óptima.",
      "recovery": "48h de descanso antes de volver a empujar pesado. Puedes hacer cardio suave o espalda al día siguiente sin problema."
    }
  },
  {
    "id": 79,
    "phase": 4,
    "type": "C",
    "name": "Espalda — Volumen máximo (C15)",
    "intensity": "Alto",
    "duration": "70-80 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min remo ergómetro suave",
        "15 retracciones escapulares con banda",
        "Colgarse de barra: 3 × 20 seg",
        "10 superman lentos en el suelo",
        "Rotación externa de hombro con banda: 15 reps c/lado"
      ],
      "mobility": [
        "Movilidad de hombro: círculos de brazo (20 c/dirección)",
        "Estiramiento de antebrazo dorsal (20 seg c/lado)",
        "Descompresión lumbar: colgado de barra 30 seg"
      ],
      "mental": "La espalda fuerte es el escudo del cuerpo. El 80% de los dolores lumbares se previenen con espalda fuerte. Cada jalón acerca tu objetivo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Dominadas cargadas",
          "exercises": [
            {
              "id": "pullup",
              "name": "Dominadas (agarre prono)",
              "muscle": "Dorsal ancho, Romboides, Bíceps",
              "equip": "Barra de dominadas",
              "sets": "5",
              "reps": "6",
              "rest": "150 seg",
              "notes": "Con lastre en cinturón.",
              "weight_guide": ""
            },
            {
              "id": "chinup",
              "name": "Chin-up (agarre supino)",
              "muscle": "Dorsal ancho, Bíceps (énfasis)",
              "equip": "Barra de dominadas",
              "sets": "3",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Remos pesados",
          "exercises": [
            {
              "id": "row_bar",
              "name": "Remo con barra inclinado",
              "muscle": "Dorsal ancho, Romboides, Trapecio medio",
              "equip": "Barra",
              "sets": "5",
              "reps": "8",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": "85% RM"
            },
            {
              "id": "row_tbar",
              "name": "Remo T-bar",
              "muscle": "Dorsal ancho, Romboides, Trapecio",
              "equip": "T-bar o barra",
              "sets": "4",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Bíceps",
          "exercises": [
            {
              "id": "curl_bar",
              "name": "Curl con barra recta o Z",
              "muscle": "Bíceps braquial",
              "equip": "Barra Z o recta",
              "sets": "4",
              "reps": "10",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "farmers_walk",
              "name": "Farmer's walk (caminata granjero)",
              "muscle": "Antebrazos, Core, Trapecio superior",
              "equip": "Mancuernas pesadas",
              "sets": "4",
              "reps": "50m",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata o trote suave",
        "Colgado de barra: 30 seg (descompresión)",
        "Respiración profunda: 5 ciclos"
      ],
      "stretches": [
        "Estiramiento dorsal: brazo en alto con inclinación lateral (30 seg c/lado)",
        "Bíceps contra pared, palma arriba (25 seg c/lado)",
        "Gato-vaca en el suelo: 10 reps lentas",
        "Niño extendido con brazos al frente (45 seg)",
        "Extensión y flexión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Alta demanda proteica: la espalda es el grupo muscular más grande de la parte superior. Prioriza 30-40g de proteína en los 60 min post-entreno.",
      "recovery": "La espalda y bíceps se recuperan en 48-72h. Si sientes rigidez lumbar, aplica calor suave y haz movilidad de cadera al día siguiente."
    }
  },
  {
    "id": 80,
    "phase": 4,
    "type": "E",
    "name": "Carrera — 8K progresivo",
    "intensity": "Medio",
    "duration": "90-100 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata suave",
        "10 círculos de tobillo c/lado",
        "Extensiones de pantorrilla lentas: 20 reps",
        "Elevaciones de rodilla marchando: 30 seg"
      ],
      "mobility": [
        "Estiramiento dinámico de cuádriceps (10 c/lado)",
        "Estiramiento isquiotibial de pie (20 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)"
      ],
      "mental": "El cardio es una meditación en movimiento. Hoy no compites contra nadie. Solo construyes tu motor aeróbico ladrillo a ladrillo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Carrera continua",
          "exercises": [
            {
              "id": "treadmill_jog",
              "name": "Trote continuo",
              "muscle": "Sistema cardiovascular, Pantorrillas",
              "equip": "Cinta / parque",
              "sets": "1",
              "reps": "10 km",
              "rest": "--",
              "notes": "10K continuo. Ritmo cómodo. Esto es atletismo real.",
              "weight_guide": "Ritmo: 6-8 min/km"
            }
          ],
          "note": ""
        },
        {
          "name": "Recuperación activa",
          "exercises": [
            {
              "id": "treadmill_walk",
              "name": "Caminata rápida (cinta/parque)",
              "muscle": "Sistema cardiovascular",
              "equip": "Cinta / parque",
              "sets": "1",
              "reps": "10 min",
              "rest": "--",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "pigeon",
              "name": "Paloma / figura 4 (piriforme)",
              "muscle": "Piriforme, Glúteo profundo",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "60 seg c/lado",
              "rest": "20 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata muy lenta",
        "Respiración controlada: 5 min sentado"
      ],
      "stretches": [
        "Psoas (estocada estática): 45 seg c/lado",
        "Piriforme/paloma en suelo: 45 seg c/lado",
        "Isquiotibiales con cinta: 40 seg c/lado",
        "Apertura de pecho en suelo (brazos en T): 60 seg",
        "Perro boca abajo: 45 seg",
        "Pose del niño: 60 seg",
        "Savasana / respiración consciente: 3 min"
      ],
      "nutrition": "El cardio quema glucógeno. Repón con carbohidratos en los 30 min siguientes si vas a entrenar mañana. Si es día de recuperación, puedes priorizar proteína y grasas buenas.",
      "recovery": "Hidratación post-cardio: repón electrolitos si sudaste mucho (agua con limón + pizca de sal). El cardio activa el sistema parasimpático si lo mantienes aeróbico."
    }
  },
  {
    "id": 81,
    "phase": 4,
    "type": "D",
    "name": "Hombros — Volumen y resistencia (D11)",
    "intensity": "Medio",
    "duration": "60-70 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta o elíptica",
        "Rotación externa con banda: 15 reps c/lado",
        "15 encogimientos circulares de hombros",
        "Y-T-W con banda elástica: 10 reps c/posición",
        "10 elevaciones frontales muy ligeras"
      ],
      "mobility": [
        "Péndulo de brazo: 30 seg c/lado",
        "Sleeper stretch (rotación interna): 20 seg c/lado",
        "Estiramiento cruzado de hombro: 20 seg c/lado"
      ],
      "mental": "Los hombros son el punto débil más frecuente. Trabaja siempre con control, nunca con inercia. El manguito rotador vale más que el peso en la barra."
    },
    "workout": {
      "blocks": [
        {
          "name": "Hombros pesado",
          "exercises": [
            {
              "id": "ohp_bar",
              "name": "Press militar con barra (de pie)",
              "muscle": "Deltoides anterior, Tríceps, Core",
              "equip": "Barra",
              "sets": "5",
              "reps": "6",
              "rest": "120 seg",
              "notes": "Fase 4: más pesado que nunca.",
              "weight_guide": "90% RM"
            },
            {
              "id": "lateral_raise",
              "name": "Elevación lateral (mancuernas)",
              "muscle": "Deltoides lateral",
              "equip": "Mancuernas",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "rear_delt_fly",
              "name": "Pájaro (deltoides posterior)",
              "muscle": "Deltoides posterior, Romboides",
              "equip": "Mancuernas (tronco inclinado)",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Manguito",
          "exercises": [
            {
              "id": "rotator_cable",
              "name": "Rotación externa en cable",
              "muscle": "Manguito rotador",
              "equip": "Cable bajo",
              "sets": "3",
              "reps": "15 c/lado",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "scapular_ret",
              "name": "Retracción escapular con banda (T)",
              "muscle": "Trapecio medio/inf., Romboides",
              "equip": "Banda elástica",
              "sets": "3",
              "reps": "15",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min movilidad suave de hombros: péndulos y círculos",
        "Respiración diafragmática: 3 min"
      ],
      "stretches": [
        "Estiramiento sleeper (rotación interna): 30 seg c/lado",
        "Cruzado de hombro: 30 seg c/lado",
        "Trapecio: inclinación lateral de cabeza (25 seg c/lado)",
        "Extensión de hombro posterior: brazo cruzado bajo (25 seg c/lado)"
      ],
      "nutrition": "Los hombros son articulaciones complejas: además de proteína, asegura ingesta de colágeno (gelatina o suplemento) para salud del manguito rotador.",
      "recovery": "Los hombros se involucran en casi todos los ejercicios. Prioriza el descanso de este grupo si sientes fatiga articular. Masaje suave en zona del trapecio si hay tensión."
    }
  },
  {
    "id": 82,
    "phase": 4,
    "type": "A",
    "name": "Piernas — Unilateral dominante (A16)",
    "intensity": "Alto",
    "duration": "75-85 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata rápida o trote suave",
        "20 círculos de cadera (10 c/lado)",
        "15 sentadillas de activación sin peso",
        "10 puentes de glúteo lentos",
        "10 rotaciones de rodilla c/lado"
      ],
      "mobility": [
        "Movilidad tobillo: círculos + flexión (30 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)",
        "Desbloqueo psoas: rodilla en suelo, inclinación adelante (20 seg c/lado)"
      ],
      "mental": "Visualiza la sesión completa. El tren inferior es el motor del cuerpo. Cada rep construye la base de tu maratón."
    },
    "workout": {
      "blocks": [
        {
          "name": "Compound máximo",
          "exercises": [
            {
              "id": "squat_bar",
              "name": "Sentadilla trasera (barra)",
              "muscle": "Cuádriceps, Glúteo mayor",
              "equip": "Barra + Rack",
              "sets": "5",
              "reps": "5",
              "rest": "150 seg",
              "notes": "Fase 4: fuerza máxima. 90% RM.",
              "weight_guide": "90% RM"
            },
            {
              "id": "deadlift",
              "name": "Peso muerto convencional",
              "muscle": "Cadena posterior completa",
              "equip": "Barra",
              "sets": "4",
              "reps": "5",
              "rest": "150 seg",
              "notes": "",
              "weight_guide": "85% RM"
            }
          ],
          "note": ""
        },
        {
          "name": "Potencia",
          "exercises": [
            {
              "id": "box_jump",
              "name": "Salto al cajón (box jump)",
              "muscle": "Cuádriceps, Glúteo, Pantorrillas, Potencia",
              "equip": "Cajón pliométrico",
              "sets": "4",
              "reps": "6",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "bulgarian",
              "name": "Zancada búlgara (pie elevado)",
              "muscle": "Cuádriceps, Glúteo mayor/medio",
              "equip": "Mancuernas + banco",
              "sets": "4",
              "reps": "10 c/pierna",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Core y resistencia",
          "exercises": [
            {
              "id": "hollow_body",
              "name": "Hollow body hold",
              "muscle": "Core completo, Transverso",
              "equip": "Peso corporal",
              "sets": "4",
              "reps": "40 seg",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "ab_wheel",
              "name": "Rueda abdominal (ab wheel)",
              "muscle": "Transverso, Recto abdominal, Dorsal",
              "equip": "Ab wheel",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave para bajar FC",
        "Respiración: 4 inhala / 4 retén / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps de pie (40 seg c/lado)",
        "Isquiotibial con banda o toalla (40 seg c/lado)",
        "Paloma/figura 4 glúteo en suelo (45 seg c/lado)",
        "Aductor sentado pies juntos (30 seg)",
        "Pantorrilla contra pared (25 seg c/lado)",
        "Torsión espinal tumbado (30 seg c/lado)"
      ],
      "nutrition": "Ingiere proteína + carbohidrato en los 30-60 min siguientes (ej: batido de proteína + plátano, o arroz con pollo). Los carbohidratos post-piernas son esenciales para reponer glucógeno muscular.",
      "recovery": "Piernas: 48-72h de recuperación antes del próximo estímulo pesado de piernas. Si sientes DOMS (agujetas) intensas, camina suave y toma baño frío de pies."
    }
  },
  {
    "id": 83,
    "phase": 4,
    "type": "B",
    "name": "Pecho — Superseries máximas (B16)",
    "intensity": "Alto",
    "duration": "65-75 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta estática o elíptica",
        "20 círculos de hombros (adelante y atrás)",
        "15 aperturas de pecho con banda",
        "10 push-ups de rodilla lentos",
        "10 rotaciones de hombro con banda c/lado"
      ],
      "mobility": [
        "Apertura de pecho en marco de puerta (30 seg)",
        "Extensión de muñeca y antebrazo (20 seg c/lado)",
        "Rotación interna/externa de hombro (15 reps c/lado)"
      ],
      "mental": "El pecho y hombros definen tu postura. Cada press es una afirmación de fuerza. Activa el músculo desde el inicio, no solo mueves peso."
    },
    "workout": {
      "blocks": [
        {
          "name": "Fuerza + volumen pecho",
          "exercises": [
            {
              "id": "bench_flat",
              "name": "Press de banca plano (barra)",
              "muscle": "Pectoral mayor, Tríceps, Deltoides ant.",
              "equip": "Barra + banco",
              "sets": "5",
              "reps": "6",
              "rest": "150 seg",
              "notes": "90% RM.",
              "weight_guide": ""
            },
            {
              "id": "bench_incline",
              "name": "Press inclinado 30° (barra)",
              "muscle": "Pectoral mayor superior, Deltoides ant.",
              "equip": "Barra + banco inclinado",
              "sets": "4",
              "reps": "8",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "dips_chest",
              "name": "Fondos en paralelas (pecho)",
              "muscle": "Pectoral mayor inferior, Tríceps",
              "equip": "Paralelas",
              "sets": "4",
              "reps": "12",
              "rest": "75 seg",
              "notes": "Con lastre",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Tríceps",
          "exercises": [
            {
              "id": "skull_crusher",
              "name": "Press francés / skullcrusher",
              "muscle": "Tríceps (cabeza larga)",
              "equip": "Barra Z o mancuernas",
              "sets": "4",
              "reps": "10",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "overhead_ext_cable",
              "name": "Extensión overhead en cable",
              "muscle": "Tríceps cabeza larga (estiramiento)",
              "equip": "Cable bajo + cuerda",
              "sets": "3",
              "reps": "14",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata suave",
        "Respiración profunda: 5 respiraciones largas"
      ],
      "stretches": [
        "Estiramiento pecho en marco de puerta (30 seg, 3 ángulos: bajo/medio/alto)",
        "Tríceps sobre la cabeza (35 seg c/lado)",
        "Cruce de brazo (deltoides anterior, 25 seg c/lado)",
        "Extensión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Proteína en los 45 min siguientes. Si entrenaste en ayunas, prioriza fuente rápida (suero de leche). El pecho requiere entre 0.3-0.4 g/kg de proteína por sesión para síntesis óptima.",
      "recovery": "48h de descanso antes de volver a empujar pesado. Puedes hacer cardio suave o espalda al día siguiente sin problema."
    }
  },
  {
    "id": 84,
    "phase": 4,
    "type": "C",
    "name": "Espalda + Bíceps — Tirones pesados (C16)",
    "intensity": "Alto",
    "duration": "70-80 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min remo ergómetro suave",
        "15 retracciones escapulares con banda",
        "Colgarse de barra: 3 × 20 seg",
        "10 superman lentos en el suelo",
        "Rotación externa de hombro con banda: 15 reps c/lado"
      ],
      "mobility": [
        "Movilidad de hombro: círculos de brazo (20 c/dirección)",
        "Estiramiento de antebrazo dorsal (20 seg c/lado)",
        "Descompresión lumbar: colgado de barra 30 seg"
      ],
      "mental": "La espalda fuerte es el escudo del cuerpo. El 80% de los dolores lumbares se previenen con espalda fuerte. Cada jalón acerca tu objetivo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Dominadas cargadas",
          "exercises": [
            {
              "id": "pullup",
              "name": "Dominadas (agarre prono)",
              "muscle": "Dorsal ancho, Romboides, Bíceps",
              "equip": "Barra de dominadas",
              "sets": "5",
              "reps": "6",
              "rest": "150 seg",
              "notes": "Con lastre en cinturón.",
              "weight_guide": ""
            },
            {
              "id": "chinup",
              "name": "Chin-up (agarre supino)",
              "muscle": "Dorsal ancho, Bíceps (énfasis)",
              "equip": "Barra de dominadas",
              "sets": "3",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Remos pesados",
          "exercises": [
            {
              "id": "row_bar",
              "name": "Remo con barra inclinado",
              "muscle": "Dorsal ancho, Romboides, Trapecio medio",
              "equip": "Barra",
              "sets": "5",
              "reps": "8",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": "85% RM"
            },
            {
              "id": "row_tbar",
              "name": "Remo T-bar",
              "muscle": "Dorsal ancho, Romboides, Trapecio",
              "equip": "T-bar o barra",
              "sets": "4",
              "reps": "10",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Bíceps",
          "exercises": [
            {
              "id": "curl_bar",
              "name": "Curl con barra recta o Z",
              "muscle": "Bíceps braquial",
              "equip": "Barra Z o recta",
              "sets": "4",
              "reps": "10",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "farmers_walk",
              "name": "Farmer's walk (caminata granjero)",
              "muscle": "Antebrazos, Core, Trapecio superior",
              "equip": "Mancuernas pesadas",
              "sets": "4",
              "reps": "50m",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata o trote suave",
        "Colgado de barra: 30 seg (descompresión)",
        "Respiración profunda: 5 ciclos"
      ],
      "stretches": [
        "Estiramiento dorsal: brazo en alto con inclinación lateral (30 seg c/lado)",
        "Bíceps contra pared, palma arriba (25 seg c/lado)",
        "Gato-vaca en el suelo: 10 reps lentas",
        "Niño extendido con brazos al frente (45 seg)",
        "Extensión y flexión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Alta demanda proteica: la espalda es el grupo muscular más grande de la parte superior. Prioriza 30-40g de proteína en los 60 min post-entreno.",
      "recovery": "La espalda y bíceps se recuperan en 48-72h. Si sientes rigidez lumbar, aplica calor suave y haz movilidad de cadera al día siguiente."
    }
  },
  {
    "id": 85,
    "phase": 4,
    "type": "E",
    "name": "Carrera — 10K (objetivo Fase 4)",
    "intensity": "Medio",
    "duration": "90-100 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata suave",
        "10 círculos de tobillo c/lado",
        "Extensiones de pantorrilla lentas: 20 reps",
        "Elevaciones de rodilla marchando: 30 seg"
      ],
      "mobility": [
        "Estiramiento dinámico de cuádriceps (10 c/lado)",
        "Estiramiento isquiotibial de pie (20 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)"
      ],
      "mental": "El cardio es una meditación en movimiento. Hoy no compites contra nadie. Solo construyes tu motor aeróbico ladrillo a ladrillo."
    },
    "workout": {
      "blocks": [
        {
          "name": "Carrera continua",
          "exercises": [
            {
              "id": "treadmill_jog",
              "name": "Trote continuo",
              "muscle": "Sistema cardiovascular, Pantorrillas",
              "equip": "Cinta / parque",
              "sets": "1",
              "reps": "10 km",
              "rest": "--",
              "notes": "10K continuo. Ritmo cómodo. Esto es atletismo real.",
              "weight_guide": "Ritmo: 6-8 min/km"
            }
          ],
          "note": ""
        },
        {
          "name": "Recuperación activa",
          "exercises": [
            {
              "id": "treadmill_walk",
              "name": "Caminata rápida (cinta/parque)",
              "muscle": "Sistema cardiovascular",
              "equip": "Cinta / parque",
              "sets": "1",
              "reps": "10 min",
              "rest": "--",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "pigeon",
              "name": "Paloma / figura 4 (piriforme)",
              "muscle": "Piriforme, Glúteo profundo",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "60 seg c/lado",
              "rest": "20 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata muy lenta",
        "Respiración controlada: 5 min sentado"
      ],
      "stretches": [
        "Psoas (estocada estática): 45 seg c/lado",
        "Piriforme/paloma en suelo: 45 seg c/lado",
        "Isquiotibiales con cinta: 40 seg c/lado",
        "Apertura de pecho en suelo (brazos en T): 60 seg",
        "Perro boca abajo: 45 seg",
        "Pose del niño: 60 seg",
        "Savasana / respiración consciente: 3 min"
      ],
      "nutrition": "El cardio quema glucógeno. Repón con carbohidratos en los 30 min siguientes si vas a entrenar mañana. Si es día de recuperación, puedes priorizar proteína y grasas buenas.",
      "recovery": "Hidratación post-cardio: repón electrolitos si sudaste mucho (agua con limón + pizca de sal). El cardio activa el sistema parasimpático si lo mantienes aeróbico."
    }
  },
  {
    "id": 86,
    "phase": 4,
    "type": "F",
    "name": "Full Body — Test de resistencia total (F9)",
    "intensity": "Alto",
    "duration": "70-80 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "7 min trote suave",
        "10 jumping jacks",
        "10 sentadillas cuerpo libre",
        "10 push-ups de rodilla",
        "10 remo con banda",
        "5 burpees lentos"
      ],
      "mobility": [
        "Gato-vaca: 10 reps lentas",
        "Apertura de cadera 90/90: 30 seg c/lado",
        "Movilidad de hombros: círculos 20 c/dirección"
      ],
      "mental": "El full body te entrena como atleta completo. Cada patrón de movimiento (empuje, tirón, sentadilla, bisagra) te hace más funcional en la vida real."
    },
    "workout": {
      "blocks": [
        {
          "name": "HIIT potencia (6 rondas)",
          "exercises": [
            {
              "id": "box_jump",
              "name": "Salto al cajón (box jump)",
              "muscle": "Cuádriceps, Glúteo, Pantorrillas, Potencia",
              "equip": "Cajón pliométrico",
              "sets": "6",
              "reps": "6",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "bench_flat",
              "name": "Press de banca plano (barra)",
              "muscle": "Pectoral mayor, Tríceps, Deltoides ant.",
              "equip": "Barra + banco",
              "sets": "6",
              "reps": "6",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": "Pesado"
            },
            {
              "id": "burpee",
              "name": "Burpee",
              "muscle": "Full body, Sistema cardiovascular",
              "equip": "Peso corporal",
              "sets": "6",
              "reps": "10",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave",
        "Respiración: 4 inhala / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps (30 seg c/lado)",
        "Isquiotibiales (30 seg c/lado)",
        "Pecho en marco de puerta (25 seg)",
        "Dorsal en inclinación (25 seg c/lado)",
        "Rotación espinal tumbado (25 seg c/lado)",
        "Niño extendido (45 seg)"
      ],
      "nutrition": "Sesión full body: alta demanda energética. Meal completa: 30-40g proteína + 60-80g carbohidratos + verduras. Es tu mejor momento para absorber nutrientes.",
      "recovery": "El full body genera más fatiga sistémica que un split. Descansa 48h antes del próximo full body. Un día de cardio suave o movilidad entre sesiones es ideal."
    }
  },
  {
    "id": 87,
    "phase": 4,
    "type": "A",
    "name": "Piernas — Mantenimiento y explosividad (A17)",
    "intensity": "Medio",
    "duration": "70-80 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min caminata rápida o trote suave",
        "20 círculos de cadera (10 c/lado)",
        "15 sentadillas de activación sin peso",
        "10 puentes de glúteo lentos",
        "10 rotaciones de rodilla c/lado"
      ],
      "mobility": [
        "Movilidad tobillo: círculos + flexión (30 seg c/lado)",
        "Apertura de cadera en cuclillas (30 seg)",
        "Desbloqueo psoas: rodilla en suelo, inclinación adelante (20 seg c/lado)"
      ],
      "mental": "Visualiza la sesión completa. El tren inferior es el motor del cuerpo. Cada rep construye la base de tu maratón."
    },
    "workout": {
      "blocks": [
        {
          "name": "Compound máximo",
          "exercises": [
            {
              "id": "squat_bar",
              "name": "Sentadilla trasera (barra)",
              "muscle": "Cuádriceps, Glúteo mayor",
              "equip": "Barra + Rack",
              "sets": "5",
              "reps": "5",
              "rest": "150 seg",
              "notes": "Fase 4: fuerza máxima. 90% RM.",
              "weight_guide": "90% RM"
            },
            {
              "id": "deadlift",
              "name": "Peso muerto convencional",
              "muscle": "Cadena posterior completa",
              "equip": "Barra",
              "sets": "4",
              "reps": "5",
              "rest": "150 seg",
              "notes": "",
              "weight_guide": "85% RM"
            }
          ],
          "note": ""
        },
        {
          "name": "Potencia",
          "exercises": [
            {
              "id": "box_jump",
              "name": "Salto al cajón (box jump)",
              "muscle": "Cuádriceps, Glúteo, Pantorrillas, Potencia",
              "equip": "Cajón pliométrico",
              "sets": "4",
              "reps": "6",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "bulgarian",
              "name": "Zancada búlgara (pie elevado)",
              "muscle": "Cuádriceps, Glúteo mayor/medio",
              "equip": "Mancuernas + banco",
              "sets": "4",
              "reps": "10 c/pierna",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Core y resistencia",
          "exercises": [
            {
              "id": "hollow_body",
              "name": "Hollow body hold",
              "muscle": "Core completo, Transverso",
              "equip": "Peso corporal",
              "sets": "4",
              "reps": "40 seg",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "ab_wheel",
              "name": "Rueda abdominal (ab wheel)",
              "muscle": "Transverso, Recto abdominal, Dorsal",
              "equip": "Ab wheel",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "5 min caminata suave para bajar FC",
        "Respiración: 4 inhala / 4 retén / 6 exhala (3 min)"
      ],
      "stretches": [
        "Cuádriceps de pie (40 seg c/lado)",
        "Isquiotibial con banda o toalla (40 seg c/lado)",
        "Paloma/figura 4 glúteo en suelo (45 seg c/lado)",
        "Aductor sentado pies juntos (30 seg)",
        "Pantorrilla contra pared (25 seg c/lado)",
        "Torsión espinal tumbado (30 seg c/lado)"
      ],
      "nutrition": "Ingiere proteína + carbohidrato en los 30-60 min siguientes (ej: batido de proteína + plátano, o arroz con pollo). Los carbohidratos post-piernas son esenciales para reponer glucógeno muscular.",
      "recovery": "Piernas: 48-72h de recuperación antes del próximo estímulo pesado de piernas. Si sientes DOMS (agujetas) intensas, camina suave y toma baño frío de pies."
    }
  },
  {
    "id": 88,
    "phase": 4,
    "type": "D",
    "name": "Hombros — Mantenimiento completo (D12)",
    "intensity": "Medio",
    "duration": "60-70 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta o elíptica",
        "Rotación externa con banda: 15 reps c/lado",
        "15 encogimientos circulares de hombros",
        "Y-T-W con banda elástica: 10 reps c/posición",
        "10 elevaciones frontales muy ligeras"
      ],
      "mobility": [
        "Péndulo de brazo: 30 seg c/lado",
        "Sleeper stretch (rotación interna): 20 seg c/lado",
        "Estiramiento cruzado de hombro: 20 seg c/lado"
      ],
      "mental": "Los hombros son el punto débil más frecuente. Trabaja siempre con control, nunca con inercia. El manguito rotador vale más que el peso en la barra."
    },
    "workout": {
      "blocks": [
        {
          "name": "Hombros pesado",
          "exercises": [
            {
              "id": "ohp_bar",
              "name": "Press militar con barra (de pie)",
              "muscle": "Deltoides anterior, Tríceps, Core",
              "equip": "Barra",
              "sets": "5",
              "reps": "6",
              "rest": "120 seg",
              "notes": "Fase 4: más pesado que nunca.",
              "weight_guide": "90% RM"
            },
            {
              "id": "lateral_raise",
              "name": "Elevación lateral (mancuernas)",
              "muscle": "Deltoides lateral",
              "equip": "Mancuernas",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "rear_delt_fly",
              "name": "Pájaro (deltoides posterior)",
              "muscle": "Deltoides posterior, Romboides",
              "equip": "Mancuernas (tronco inclinado)",
              "sets": "4",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Manguito",
          "exercises": [
            {
              "id": "rotator_cable",
              "name": "Rotación externa en cable",
              "muscle": "Manguito rotador",
              "equip": "Cable bajo",
              "sets": "3",
              "reps": "15 c/lado",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "scapular_ret",
              "name": "Retracción escapular con banda (T)",
              "muscle": "Trapecio medio/inf., Romboides",
              "equip": "Banda elástica",
              "sets": "3",
              "reps": "15",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min movilidad suave de hombros: péndulos y círculos",
        "Respiración diafragmática: 3 min"
      ],
      "stretches": [
        "Estiramiento sleeper (rotación interna): 30 seg c/lado",
        "Cruzado de hombro: 30 seg c/lado",
        "Trapecio: inclinación lateral de cabeza (25 seg c/lado)",
        "Extensión de hombro posterior: brazo cruzado bajo (25 seg c/lado)"
      ],
      "nutrition": "Los hombros son articulaciones complejas: además de proteína, asegura ingesta de colágeno (gelatina o suplemento) para salud del manguito rotador.",
      "recovery": "Los hombros se involucran en casi todos los ejercicios. Prioriza el descanso de este grupo si sientes fatiga articular. Masaje suave en zona del trapecio si hay tensión."
    }
  },
  {
    "id": 89,
    "phase": 4,
    "type": "B",
    "name": "Pecho + Tríceps — Mantenimiento (B17)",
    "intensity": "Medio",
    "duration": "60-70 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "5 min bicicleta estática o elíptica",
        "20 círculos de hombros (adelante y atrás)",
        "15 aperturas de pecho con banda",
        "10 push-ups de rodilla lentos",
        "10 rotaciones de hombro con banda c/lado"
      ],
      "mobility": [
        "Apertura de pecho en marco de puerta (30 seg)",
        "Extensión de muñeca y antebrazo (20 seg c/lado)",
        "Rotación interna/externa de hombro (15 reps c/lado)"
      ],
      "mental": "El pecho y hombros definen tu postura. Cada press es una afirmación de fuerza. Activa el músculo desde el inicio, no solo mueves peso."
    },
    "workout": {
      "blocks": [
        {
          "name": "Fuerza + volumen pecho",
          "exercises": [
            {
              "id": "bench_flat",
              "name": "Press de banca plano (barra)",
              "muscle": "Pectoral mayor, Tríceps, Deltoides ant.",
              "equip": "Barra + banco",
              "sets": "5",
              "reps": "6",
              "rest": "150 seg",
              "notes": "90% RM.",
              "weight_guide": ""
            },
            {
              "id": "bench_incline",
              "name": "Press inclinado 30° (barra)",
              "muscle": "Pectoral mayor superior, Deltoides ant.",
              "equip": "Barra + banco inclinado",
              "sets": "4",
              "reps": "8",
              "rest": "90 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "dips_chest",
              "name": "Fondos en paralelas (pecho)",
              "muscle": "Pectoral mayor inferior, Tríceps",
              "equip": "Paralelas",
              "sets": "4",
              "reps": "12",
              "rest": "75 seg",
              "notes": "Con lastre",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Tríceps",
          "exercises": [
            {
              "id": "skull_crusher",
              "name": "Press francés / skullcrusher",
              "muscle": "Tríceps (cabeza larga)",
              "equip": "Barra Z o mancuernas",
              "sets": "4",
              "reps": "10",
              "rest": "75 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "overhead_ext_cable",
              "name": "Extensión overhead en cable",
              "muscle": "Tríceps cabeza larga (estiramiento)",
              "equip": "Cable bajo + cuerda",
              "sets": "3",
              "reps": "14",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "3 min caminata suave",
        "Respiración profunda: 5 respiraciones largas"
      ],
      "stretches": [
        "Estiramiento pecho en marco de puerta (30 seg, 3 ángulos: bajo/medio/alto)",
        "Tríceps sobre la cabeza (35 seg c/lado)",
        "Cruce de brazo (deltoides anterior, 25 seg c/lado)",
        "Extensión de muñeca (20 seg c/lado)"
      ],
      "nutrition": "Proteína en los 45 min siguientes. Si entrenaste en ayunas, prioriza fuente rápida (suero de leche). El pecho requiere entre 0.3-0.4 g/kg de proteína por sesión para síntesis óptima.",
      "recovery": "48h de descanso antes de volver a empujar pesado. Puedes hacer cardio suave o espalda al día siguiente sin problema."
    }
  },
  {
    "id": 90,
    "phase": 4,
    "type": "G",
    "name": "Deload final — Cierre del programa de 6 meses",
    "intensity": "Bajo",
    "duration": "50-60 min",
    "muscles": [],
    "pre": {
      "hydration": "Bebe 400-500 ml de agua 30 min antes. Puedes tomar café negro o té verde 20-30 min antes para aumentar energía y oxidación de grasas.",
      "warmup": [
        "10 min caminata tranquila",
        "10 círculos de hombros",
        "10 sentadillas suaves sin peso",
        "Respiración diafragmática: 5 respiraciones profundas"
      ],
      "mobility": [
        "Movilidad global suave: 5 min",
        "Foam rolling: zona lumbar y piernas (3 min)"
      ],
      "mental": "El descanso activo NO es perder el tiempo. Es cuando el cuerpo consolida las ganancias. Llega relajado, sin presión de rendimiento."
    },
    "workout": {
      "blocks": [
        {
          "name": "Último deload: cierre del programa",
          "exercises": [
            {
              "id": "squat_goblet",
              "name": "Sentadilla goblet (mancuerna)",
              "muscle": "Cuádriceps, Glúteo",
              "equip": "Mancuerna",
              "sets": "2",
              "reps": "15",
              "rest": "60 seg",
              "notes": "6 meses completados. Esto es sólo el comienzo.",
              "weight_guide": ""
            },
            {
              "id": "db_press_flat",
              "name": "Press de banca plano (mancuernas)",
              "muscle": "Pectoral mayor, Serrato anterior",
              "equip": "Mancuernas + banco",
              "sets": "2",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "pulldown_neutral",
              "name": "Jalón agarre neutro",
              "muscle": "Dorsal ancho, Bíceps",
              "equip": "Polea + agarre neutro",
              "sets": "2",
              "reps": "15",
              "rest": "60 seg",
              "notes": "",
              "weight_guide": ""
            },
            {
              "id": "plank",
              "name": "Plancha frontal",
              "muscle": "Transverso abdominal, Core completo",
              "equip": "Peso corporal",
              "sets": "2",
              "reps": "30 seg",
              "rest": "45 seg",
              "notes": "",
              "weight_guide": ""
            }
          ],
          "note": ""
        },
        {
          "name": "Cardio celebración",
          "exercises": [
            {
              "id": "treadmill_jog",
              "name": "Trote continuo",
              "muscle": "Sistema cardiovascular, Pantorrillas",
              "equip": "Cinta / parque",
              "sets": "1",
              "reps": "20 min",
              "rest": "--",
              "notes": "Trote a tu ritmo favorito. Celebra el logro.",
              "weight_guide": ""
            }
          ],
          "note": ""
        }
      ]
    },
    "post": {
      "cooldown": [
        "10 min caminata tranquila",
        "Respiración consciente: 5 min"
      ],
      "stretches": [
        "Rutina completa de estiramiento: 15 min (todos los grupos)",
        "Foam rolling global: isquiotibiales, glúteos, dorsal, pectorales (5 min)",
        "Savasana / meditación (5 min)"
      ],
      "nutrition": "Semana de descarga: mantén ingesta proteica alta pero puedes reducir levemente los carbohidratos si entrenas menos. El cuerpo reconstruye y supracompensa en esta fase.",
      "recovery": "Esta sesión es medicina. No hagas nada más exigente que esto hoy. Duerme 8+ horas esta noche. La semana siguiente empezarás más fuerte."
    }
  }
];
