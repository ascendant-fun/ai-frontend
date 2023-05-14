import {useState} from "react";

export interface Binder<T> {
  value: T;
  setter: (value: T) => void;
}

export default function useBind<T>(initialValue: T): Binder<T> {
  const [value, setter] = useState(initialValue);

  return {value, setter};
}
