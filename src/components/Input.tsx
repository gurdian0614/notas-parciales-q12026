import type { InputProps } from "../interfaces/InputProps"

const Input: React.FC<InputProps> = ({label, maxPoints, value, name, onChange}) => {
    const isInvalid: boolean = value !== '' && value > maxPoints;

    return (
        <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-100 transition duration-300">
            <label className="block text-lg font-bold gtext-gray-700 mb-2">
                {label}
            </label>

            <p className="text-sm text-gray-500 mb-3">
                Max: {maxPoints} pts
            </p>

            <input
                type="number"
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                min={0}
                max={maxPoints}
                placeholder={`0 - ${maxPoints}`}
                className={`w-full p-3 border-2 rounded-lg text-3xl font-extrabold text-center font-mono transition duration-150
                    ${isInvalid
                        ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500'
                        : 'border-blue-300 focus:border-blue-500 focus:ring-blue-500 text-gray-800'
                    }`}
            />
        </div>
    );
}

export default Input;