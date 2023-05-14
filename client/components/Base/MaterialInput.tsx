import React from 'react';
import { InputError } from '../../../types/base';
import { Binder } from '../../hooks/useBind';
interface MaterialInputProps {
    value: Binder<string>;
    placeholder: string;
    error?: Binder<InputError>;
}

const initialErrorState: InputError = {
    isInvalid: false,
    errorMsg: '',
};

export function MaterialInput({ value, placeholder, error }: MaterialInputProps) {
    const isInvalid = error !== undefined && error.value.isInvalid;

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const val = event.target.value;

        if (isInvalid && val !== '') {
            error.setter(initialErrorState);
        }

        value.setter(val);
    }

    return (
        <div>
            <div className="relative w-full min-w-[200px] h-10">
                <input
                    className={
                        `peer w-full h-full bg-transparent text-gray-100 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-green-50 disabled:border-0 transition-all placeholder-shown:border border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] focus:border-green-500
                            ${isInvalid ? 'border-red-400 placeholder-shown:border-red-400' : 'border-green-400 placeholder-shown:border-green-400'}
                        `
                    }
                    placeholder=" "
                    type="text"
                    value={value.value}
                    onChange={handleInputChange}
                />
                <label className={`
                    flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-400 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-green-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] peer-focus:text-green-500 peer-focus:after:border-green-500 peer-focus:before:border-green-500
                    ${isInvalid ? 'text-red-400 before:border-red-400 after:border-red-400' : 'text-green-400 before:border-green-400 after:border-green-400 '}
                `}>
                    {placeholder}
                </label>
            </div>
            {
                isInvalid && (
                    <p className="mt-1 px-2 text-sm text-red-400">{error.value.errorMsg}</p>
                )
            }
        </div>
    );
}
