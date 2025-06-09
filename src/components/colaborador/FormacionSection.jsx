import { useState } from 'react'
import { AcademicCapIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

const TrainingCard = ({ training, onStartTest }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex-shrink-0">
                        <div className={`p-3 rounded-lg ${
                            training.status === 'completed' 
                                ? 'bg-green-100' 
                                : training.status === 'pending' 
                                    ? 'bg-amber-100'
                                    : 'bg-blue-100'
                        }`}>
                            <AcademicCapIcon className={`h-6 w-6 ${
                                training.status === 'completed'
                                    ? 'text-green-600'
                                    : training.status === 'pending'
                                        ? 'text-amber-600'
                                        : 'text-blue-600'
                            }`} />
                        </div>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        training.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : training.status === 'pending'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                    }`}>
                        {training.status === 'completed' ? 'Completado' : training.status === 'pending' ? 'Pendiente' : 'En curso'}
                    </span>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900">{training.title}</h3>
                    <p className="mt-2 text-sm text-gray-500">{training.description}</p>
                </div>

                <div className="mt-6">
                    <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-gray-500">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {training.duration} minutos
                        </span>
                        {training.completionDate && (
                            <span className="flex items-center text-gray-500">
                                <CheckCircleIcon className="h-4 w-4 mr-1" />
                                Completado el {new Date(training.completionDate).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                </div>

                {training.status === 'pending' && (
                    <button
                        onClick={() => onStartTest(training.id)}
                        className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                        Comenzar Test
                    </button>
                )}
            </div>
        </div>
    )
}

const TrainingTest = ({ training, onSubmit, onClose }) => {
    const [answers, setAnswers] = useState({})
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answersSubmitted, setAnswersSubmitted] = useState(false)

    // Barra de progreso
    const progress = ((currentQuestion + 1) / training.questions.length) * 100

    const handleAnswer = (questionIndex, answerIndex) => {
        setAnswers(prev => ({
            ...prev,
            [questionIndex]: answerIndex
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setAnswersSubmitted(true)
        
        const score = Object.entries(answers).reduce((acc, [index, answer]) => {
            return acc + (answer === training.questions[index].correctAnswer ? 1 : 0)
        }, 0)
        
        onSubmit(training.id, answers, score)
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        {/* Header con progreso */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {training.title}
                                </h3>
                                <span className="text-sm text-gray-500">
                                    Pregunta {currentQuestion + 1} de {training.questions.length}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Pregunta actual */}
                        <div className="bg-gray-50 p-6 rounded-lg mb-6">
                            <p className="text-lg font-medium text-gray-900 mb-6">
                                {training.questions[currentQuestion].text}
                            </p>
                            <div className="space-y-3">
                                {training.questions[currentQuestion].options.map((option, optionIndex) => (
                                    <label 
                                        key={optionIndex}
                                        className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                                            answers[currentQuestion] === optionIndex 
                                                ? 'bg-teal-50 border-2 border-teal-500'
                                                : 'hover:bg-gray-100 border-2 border-transparent'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${currentQuestion}`}
                                            value={optionIndex}
                                            checked={answers[currentQuestion] === optionIndex}
                                            onChange={() => handleAnswer(currentQuestion, optionIndex)}
                                            className="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-500"
                                        />
                                        <span className="ml-3 text-gray-700">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Botones de navegación */}
                        <div className="flex justify-between items-center">
                            <button
                                type="button"
                                onClick={() => setCurrentQuestion(prev => prev - 1)}
                                disabled={currentQuestion === 0}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Anterior
                            </button>
                            
                            {currentQuestion < training.questions.length - 1 ? (
                                <button
                                    type="button"
                                    onClick={() => setCurrentQuestion(prev => prev + 1)}
                                    disabled={answers[currentQuestion] === undefined}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Siguiente
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={Object.keys(answers).length !== training.questions.length}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Finalizar Test
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const TestResult = ({ score, totalQuestions, passed, onClose, onRetry }) => {
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <h3 className="text-xl font-semibold leading-6 text-gray-900 mb-4">
                            Resultados del Test
                        </h3>
                        <div className="mb-4">
                            <span className={`text-4xl font-extrabold ${
                                passed ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {passed ? '✓' : '✗'}
                            </span>
                        </div>
                        <p className="text-lg text-gray-900 mb-2">
                            {passed ? '¡Felicidades!' : 'Inténtalo de nuevo'}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                            {passed ? 'Has completado el test con éxito.' : 'No te preocupes, puedes volver a intentarlo.'}
                        </p>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Puntuación: {score} de {totalQuestions}</span>
                            {!passed && (
                                <button
                                    onClick={onRetry}
                                    className="inline-flex items-center font-medium text-teal-600 hover:text-teal-500"
                                >
                                    Repetir Test
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const FormacionSection = () => {
    const [activeTest, setActiveTest] = useState(null)
    const [showResults, setShowResults] = useState(null)
    const [trainings, setTrainings] = useState([
        {
            id: 1,
            title: "Conceptos básicos de Prevención de Riesgos Laborales",
            description: "Introducción a los conceptos fundamentales de la prevención de riesgos laborales, incluyendo definiciones clave y responsabilidades.",
            status: "pending",
            duration: 30,
            
            questions: [
                {
                    text: "¿Cuál es el principal objetivo de la prevención de riesgos laborales?",
                    options: [
                        "Aumentar la productividad",
                        "Proteger la salud y seguridad de los trabajadores",
                        "Reducir costes operativos",
                        "Mejorar la imagen de la empresa"
                    ],
                    correctAnswer: 2
                },
                {
                    text: "¿Qué ley regula la prevención de riesgos laborales en España?",
                    options: [
                        "Ley de Seguridad Ciudadana",
                        "Ley de Prevención de Riesgos Laborales",
                        "Estatuto de los Trabajadores",
                        "Ley de Protección de Datos"
                    ],
                    correctAnswer: 1
                },
                {
                    text: "¿Qué es un riesgo laboral?",
                    options: [
                        "Una técnica de producción",
                        "Un gasto innecesario",
                        "La posibilidad de que un trabajador sufra un daño",
                        "Una ley del trabajo"
                    ],
                    correctAnswer: 3
                },
                {
                    text: "¿Cuál de las siguientes NO es una obligación del empresario?",
                    options: [
                        "Evaluar los riesgos",
                        "Formar e informar a los trabajadores",
                        "Proporcionar equipos de protección",
                        "B y C son correctas"
                    ],
                    correctAnswer: 1
                },
                {
                    text: "¿Qué documento debe contener los resultados de la evaluación de riesgos?",
                    options: [
                        "Plan de empresa",
                        "Manual del empleado",
                        "Plan de prevención",
                        "Calendario laboral"
                    ],
                    correctAnswer: 2
                },
                {
                    text: "¿Qué tipo de medida es proporcionar guantes de protección?",
                    options: [
                        "Colectiva",
                        "Organizativa",
                        "Formativa",
                        "Individual"
                    ],
                    correctAnswer: 3
                },
                {
                    text: "¿Quién debe participar en la elaboración del plan de prevención?",
                    options: [
                        "El comité de empresa únicamente",
                        "La administración pública",
                        "El empresario y los trabajadores",
                        "Solo el empresario"
                    ],
                    correctAnswer: 2
                },
                {
                    text: "¿Qué es un accidente laboral?",
                    options: [
                        "Una discusión entre compañeros",
                        "Un error administrativo",
                        "Un suceso que interrumpe la producción",
                        "Una lesión sufrida con ocasión del trabajo"
                    ],
                    correctAnswer: 3
                },
                {
                    text: "¿Cuál es la finalidad de la vigilancia de la salud?",
                    options: [
                        "Controlar a los trabajadores",
                        "Reducir los salarios",
                        "Detectar precozmente daños a la salud",
                        "Aumentar la jornada laboral"
                    ],
                    correctAnswer: 2
                },
                {
                    text: "¿Qué significa la señal triangular amarilla con un símbolo negro?",
                    options: [
                        "Obligación",
                        "Advertencia de peligro",
                        "Prohibición",
                        "Información"
                    ],
                    correctAnswer: 1
                },
                {
                    text: "¿Qué agente puede causar un riesgo físico?",
                    options: [
                        "Virus",
                        "Ruidos intensos",
                        "Mal clima laboral",
                        "Estrés"
                    ],
                    correctAnswer: 1
                },
                {
                    text: "¿Qué es un equipo de protección individual (EPI)?",
                    options: [
                        "Una máquina de trabajo",
                        "Una medida organizativa",
                        "Un instrumento de medición",
                        "Un dispositivo destinado a ser llevado por el trabajador"
                    ],
                    correctAnswer: 3
                },
                {
                    text: "¿Qué representa la señal azul circular con dibujo blanco?",
                    options: [
                        "Prohibición",
                        "Advertencia",
                        "Obligación",
                        "Evacuación"
                    ],
                    correctAnswer: 2
                },
                {
                    text: "¿Cuál de los siguientes es un riesgo ergonómico?",
                    options: [
                        "Caída de objetos",
                        "Exposición a radiación",
                        "Esfuerzo repetitivo",
                        "Contacto con sustancias químicas"
                    ],
                    correctAnswer: 2
                },
                {
                    text: "¿Qué es una evaluación de riesgos?",
                    options: [
                        "Un examen médico",
                        "Una revisión técnica de maquinaria",
                        "Un análisis para identificar peligros laborales",
                        "Una auditoría financiera"
                    ],
                    correctAnswer: 2
                }
            ]
        },
        // ... otras formaciones
    ]);
        // ... más formaciones
    

    const handleStartTest = (trainingId) => {
        setActiveTest(trainings.find(t => t.id === trainingId))
    }

    const handleSubmitTest = (trainingId, answers, score) => {
        const training = trainings.find(t => t.id === trainingId)
        const passed = (score / training.questions.length) >= 0.7

        setShowResults({
            score,
            totalQuestions: training.questions.length,
            passed
        })

        if (passed) {
            setTrainings(trainings.map(t => {
                if (t.id === trainingId) {
                    return {
                        ...t,
                        status: 'completed',
                        completionDate: new Date().toISOString()
                    }
                }
                return t
            }))
        }
        
        setActiveTest(null)
    }

    return (
        <div className="lg:pl-20">
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-semibold text-gray-900">Formación</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            Gestiona tus cursos de formación y realiza los tests pendientes
                        </p>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {trainings.map(training => (
                        <TrainingCard
                            key={training.id}
                            training={training}
                            onStartTest={handleStartTest}
                        />
                    ))}
                </div>
            </div>

            {activeTest && (
                <TrainingTest
                    training={activeTest}
                    onSubmit={handleSubmitTest}
                    onClose={() => setActiveTest(null)}
                />
            )}

            {showResults && (
                <TestResult
                    {...showResults}
                    onClose={() => {
                        setShowResults(null)
                        setActiveTest(null)
                    }}
                    onRetry={() => {
                        setShowResults(null)
                    }}
                />
            )}
        </div>
    )
}