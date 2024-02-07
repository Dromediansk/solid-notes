"use client";

import { formatDate } from "@/utils/functions";
import { RouteParams } from "@/utils/types/common";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import DatePicker from "tailwind-datepicker-react";
import { IDatePickerProps } from "tailwind-datepicker-react/types/Components/DatePicker";

const options: IDatePickerProps["options"] = {
  clearBtn: false,
  theme: {
    background: "",
    todayBtn: "bg-emerald-500 hover:bg-emerald-600",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "",
    input:
      "border-2 border-gray-200 shadow-sm rounded focus:outline-emerald-500",
    inputIcon: "",
    selected: "bg-emerald-500 hover:bg-emerald-600",
  },
  datepickerClassNames: "top-50",
};

const CustomDatePicker = () => {
  const router = useRouter();
  const params = useParams<RouteParams>();

  const [value, setValue] = useState(new Date(params.date));
  const [show, setShow] = useState(false);

  const handleChange = (date: Date) => {
    setValue(date);
    router.push(formatDate(date));
  };

  return (
    <div>
      <DatePicker
        options={options}
        value={value}
        onChange={handleChange}
        show={show}
        setShow={setShow}
        selectedDateState={[value, setValue]}
      />
    </div>
  );
};

export default CustomDatePicker;
