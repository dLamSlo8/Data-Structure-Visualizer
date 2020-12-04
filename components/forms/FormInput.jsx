export default function FormInput({ label, inputProps: { type, name, value, onChange }, error }) {
    return (
        <div className={`relative flex ${type === 'checkbox' ? 'flex-row-reverse' : 'flex-col'}`}>
            <label className="font-semibold text-lg text-gray-500" htmlFor={name}>{label}</label>
            <input 
            id={name}
            className={`${type === 'checkbox' ? 'mr-2' : 'mt-2'} py-3 px-5 border-2 border-gray-500 rounded-lg 
            ${error ? 'border-red-500' : 'hover:border-primary focus:border-primary'} focus:outline-none`}
            type={type}
            name={name}
            value={value}
            onChange={onChange} />
            {
                error && (
                    <p className="absolute top-full mt-1 font-semibold text-red-500">{error}</p>
                )
            }
        </div>
        
    )
}