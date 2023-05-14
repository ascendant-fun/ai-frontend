import COLORS from "tailwindcss/colors";
import { InputError } from "../../types/base";
import { Binder } from "../../hooks/useBind";
import AsyncSelect from "react-select/async";
import { CityInfo } from "../../types/ApiClient";
import APIClient from "../../api/APIClient";

export interface LocationValues {
  lat: number | null;
  long: number | null;
  address?: string;
}

interface LocationInputProps {
  location: Binder<LocationValues>;
  error?: Binder<InputError>;
}

interface SelectOption {
  label: string;
  value: LocationValues;
}

function getBackGroundColor(isFocused: boolean, isSelected: boolean): string {
  if (isFocused) {
    return "rgba(64, 64, 64, 1)";
  }

  if (isSelected) {
    return "#B10FFD";
  }

  return "";
}

async function loadCityOptions(inputValue: string) {
  return new Promise<SelectOption[]>((resolve) => {
    setTimeout(async () => {
      try {
        const cities = await apiClient.getCityByName(inputValue);
        resolve(filterCity(cities));
      } catch (error) {
        // error, just return nothing
        return resolve([]);
      }
    }, 1000);
  });
}

function filterCity(cities: CityInfo[]): SelectOption[] {
  return cities.map((city) => {
    return {
      value: {
        lat: city.lat,
        long: city.lng,
      },
      label: `${city.name} ${city.state}, ${city.country}`,
    };
  });
}

const apiClient = new APIClient();

function LocationInput({ location, error }: LocationInputProps) {
  const isInvalid = error !== undefined && error.value.isInvalid;
  const placeholder =
    location.value?.address && location.value?.address.length > 0
      ? location.value?.address
      : "Enter City Location";

  function handleCitySelected(city: SelectOption | null) {
    if (city === null) return;

    location.setter({
      lat: city.value.lat,
      long: city.value.long,
      address: city.label,
    });
  }

  function getBorderColor(isFocused: boolean) {
    const base = "1px solid ";
    if (isInvalid) {
      return base + COLORS.red[400];
    }

    return isFocused
      ? base + "rgb(255 255 255 / 0.5)"
      : base + "rgb(255 255 255 / 0.3)";
  }
  const md = 768;

  return (
    <div>
      <div className="w-full relative z-20">
        <AsyncSelect
          cacheOptions
          placeholder={placeholder}
          // value={locationVal}
          onChange={handleCitySelected}
          loadOptions={loadCityOptions}
          instanceId={"location-select-2"}
          styles={{
            // @ts-ignore
            placeholder: (baseStyles) => ({
              ...baseStyles,
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "14px",
              lineHeight: "17px",
              paddingTop: "3px",
              paddingBottom: "3px",
              [`@media (min-width: ${md}px)`]: {
                fontSize: "18px",
                lineHeight: "22px",
                paddingLeft: "8px",
                paddingRight: "1rem",
                paddingTop: "4px",
                paddingBottom: "4px",
              },
            }),
            // @ts-ignore
            control: (baseStyles, { isFocused }) => ({
              ...baseStyles,
              borderWidth: 1,
              borderRadius: "6px",
              backgroundColor: "transparent",
              border: getBorderColor(isFocused),
              outline: "none",
              boxShadow: "none",
              "&:hover": {
                borderBottom: getBorderColor(isFocused),
              },
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(36, 27, 69, 0.017) 0%, rgba(24, 22, 31, 0.054) 54.69%, rgba(0, 0, 0, 0.0869792) 100%)",
              backdropFilter: "blur(16px)",
              fontSize: "14px",
              lineHeight: "17px",
              paddingLeft: "8px",
              paddingRight: "1rem",
              paddingTop: "6px",
              paddingBottom: "6px",
              [`@media (min-width: ${md}px)`]: {
                fontSize: "18px",
                lineHeight: "22px",
                paddingLeft: "0px",
                paddingRight: "1rem",
              },
            }),
            // @ts-ignore
            input: (provided) => ({
              ...provided,
              color: "white",
              fontWeight: "700",
              [`@media (min-width: ${md}px)`]: {
                fontSize: "18px",
                lineHeight: "22px",
              },
            }),
            // @ts-ignore
            option: (provided, { isFocused, isSelected }) => ({
              ...provided,
              backgroundColor: getBackGroundColor(isFocused, isSelected),
            }),
            // @ts-ignore
            singleValue: (provided) => ({
              ...provided,
              color: "white",
              paddingLeft: "0.1rem",
              fontSize: "14px",
              lineHeight: "17px",
              fontWeight: "700",
              [`@media (min-width: ${md}px)`]: {
                fontSize: "18px",
                lineHeight: "22px",
                paddingLeft: "8px",
                paddingRight: "1rem",
                paddingTop: "6px",
                paddingBottom: "6px",
              },
            }),
            // @ts-ignore
            menu: (provided) => ({
              ...provided,
              backgroundColor: "rgba(26,13,42,1)",
              borderRadius: "10px",
              color: "rgba(255, 255, 255, 0.6)",
            }),
            // @ts-ignore
            dropdownIndicator: (prevStyle) => ({
              ...prevStyle,
              display: "none",
            }),
            // @ts-ignore
            indicatorSeparator: (prevStyle) => ({
              ...prevStyle,
              display: "none",
            }),
          }}
        />
      </div>
      {isInvalid && (
        <p className="mt-1 px-2 text-sm text-red-300 font-bold">
          {error.value.errorMsg}
        </p>
      )}
    </div>
  );
}

export default LocationInput;
