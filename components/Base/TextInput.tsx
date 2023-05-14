import { Binder } from '../../hooks/useBind';
import { InputError } from '../../types/base';
import { ChangeEvent } from 'react';

interface TextInputProps {
    value: Binder<string>;
    name: string;
    label?: string;
    placeholder?: string;
    validationHandler?: (value: string) => void;
    id?: string;
    error?: Binder<InputError>;
    disabled?: boolean;
    title?: string;
}

const initialErrorState: InputError = {
    isInvalid: false,
    errorMsg: '',
};

function TextInput(
    { value, label, name, id, placeholder, error, validationHandler, disabled = false, title }: TextInputProps
) {
    const isInvalid = error !== undefined && error.value.isInvalid;
    const isInvalidClasses = !isInvalid ? 'border-white/30 focus:border-white/50' : 'border-red-400';

    if (disabled === null || disabled === undefined) {
        disabled = false;
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const val = event.target.value;

        value.setter(val);

        // if there is a validation handler then run it
        // otherwise, reset the error once the input has been entered
        if (validationHandler !== undefined && typeof validationHandler === 'function') {
            validationHandler(val);
        } else if (isInvalid && val !== '') {
            error.setter(initialErrorState);
        }

    }

    return (
        <div>
            {
                label && (
                    <label htmlFor={id} className="hidden">
                        {label}
                    </label>
                )
            }
            <div className="relative">
                <input
                    type="text"
                    className={`transition disabled:cursor-not-allowed text-[14px] leading-[17px] md:text-[18px] md:leading-[22px] px-4 py-3 w-full bg-transparent rounded-md backdrop-blur-[30px] placeholder:font-normal text-white disabled:text-white/80 placeholder:text-white/70 border outline-none ${isInvalidClasses}`}
                    id={id}
                    name={name}
                    placeholder={placeholder ?? ''}
                    value={value.value}
                    onChange={handleInputChange}
                    aria-invalid="true"
                    aria-describedby={isInvalid ? `${name}-error` : ''}
                    style={{
                        background: 'radial-gradient(50% 50% at 50% 50%, rgba(36, 27, 69, 0.017) 0%, rgba(24, 22, 31, 0.054) 54.69%, rgba(0, 0, 0, 0.0869792) 100%)'
                    }}
                    disabled={disabled}
                    title={title ?? label}
                />
            </div>
            {
                isInvalid && (
                    <p className="mt-2 pl-2 text-sm text-red-300 font-bold" id={isInvalid ? `${name}-error` : ''}>
                        {error.value.errorMsg}
                    </p>
                )
            }
        </div>
    );
}

export default TextInput;