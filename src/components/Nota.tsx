import Input from './Input'
import { useNotasParciales } from '../hooks/useNotasParciales';

const Nota: React.FC = () => {
    const { 
        nota, 
        handleCambiarNota,
        obtenerNotaParcialMaxima,
        MAX_TOTAL,
        PASS_SCORE, 
    } = useNotasParciales();

    const isPassed: boolean = nota.total >= PASS_SCORE;

    const resultBg = isPassed ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700';

    return (
        <div className="min-h-screen bg-gray-50 p-6 sm:p-10 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold text-gray-900 text-center mb-12 mt-3">
                    Calculadora de Notas Parciales
                </h1>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
                    <Input 
                        label='Primer Parcial'
                        maxPoints={obtenerNotaParcialMaxima('parcial1')}
                        value={nota.parcial1}
                        name={'parcial1'}
                        onChange={handleCambiarNota} 
                    />

                    <Input 
                        label='Segundo Parcial'
                        maxPoints={obtenerNotaParcialMaxima('parcial2')}
                        value={nota.parcial2}
                        name={'parcial2'}
                        onChange={handleCambiarNota} 
                    />

                    <Input 
                        label='Tercer Parcial'
                        maxPoints={obtenerNotaParcialMaxima('parcial3')}
                        value={nota.parcial3}
                        name={'parcial3'} 
                        onChange={handleCambiarNota} 
                    />
                </div>

                <div className={`p-8 text-center rounded-2xl transition duration-500 ease-in-out cursor-default transform hover:scale-[1.01] ${resultBg} text-white`}>
                    <h2 className="text-2xl font-semibold mb-2 opacity-90">
                        Puntuación Total Obtenida
                    </h2>
                    <p className="text-7xl sm:text-8xl font-black mb-4 tracking-tight">
                        {nota.total.toFixed(0)} <span className="text-3xl font-medium opacity-80"> / {MAX_TOTAL}</span>
                    </p>
                    <div className="h-0.5 w-24 bg-white/50 mx-auto my-4 rounded-full"></div>
                    <p className="mt-4 text-2xl font-extrabold">
                        { isPassed
                            ? `¡Felicidades! Aprobaste con ${nota.total.toFixed(0)} puntos. 🎉`
                            : `¡Necesitas más esfuerzo! La nota mínima es de ${PASS_SCORE} puntos. 😔`
                        }
                    </p>
                    <p className="text-sm opacity-80 mt-2">
                        La nota de aprobación es de {PASS_SCORE} puntos.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Nota;