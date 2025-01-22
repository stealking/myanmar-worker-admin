"use client";
import { Box, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

const Ranges = [
    {
        value: "today",
        label: "Today",
    },
    {
        value: "last7Days",
        label: "Last 7 Days",
    },
    {
        value: "lastMonth",
        label: "Last Month",
    },
    {
        value: "last3Months",
        label: "Last 3 Months",
    },
    {
        value: "custom",
        label: "Custom",
    },
];

const DateRangePicker = () => {
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
    const [currentRange, setCurrentRange] = useState<string>("custom");

    const handleStartDateChange = (date: Dayjs | null) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: Dayjs | null) => {
        setEndDate(date);
    };

    const handleQuickSelect = (range: string) => {
        const today = dayjs();
        setCurrentRange(range);
        switch (range) {
            case "today":
                setStartDate(today);
                setEndDate(today);
                break;
            case "last7Days":
                setStartDate(dayjs(today.set("date", -7)));
                setEndDate(today);
                break;
            case "lastMonth":
                setStartDate(dayjs(today.set("month", -1)));
                setEndDate(today);
                break;
            case "last3Months":
                setStartDate(dayjs(today.set("month", -3)));
                setEndDate(today);
                break;
            default:
                break;
        }
    };

    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            dateFormats={{
                keyboardDate: "YYYY-MM-DD",
            }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <div>Registration Date:</div>
                <DatePicker
                    value={dayjs(startDate)}
                    onChange={handleStartDateChange}
                    sx={{ mx: 2, width: 200 }}
                    disabled={currentRange !== "custom"}
                    maxDate={dayjs(endDate)}
                    slotProps={{
                        textField: {
                            size: "small",
                        },
                    }}
                />
                <DatePicker
                    value={dayjs(endDate)}
                    onChange={handleEndDateChange}
                    disabled={currentRange !== "custom"}
                    sx={{ width: 200 }}
                    minDate={dayjs(startDate)}
                    slotProps={{
                        textField: {
                            size: "small",
                        },
                    }}
                />
                <div className={"inline-flex !divide-x !divide-gray-300 border border-gray-400 rounded-md ml-4"}>
                    {Ranges.map(({ value, label }, index) => (
                        <div key={value}>
                            <Button
                                className={`${
                                    currentRange === value
                                        ? "!bg-purple-600 !text-white hover:!bg-purple-700"
                                        : "bg-transparent"
                                } hover:bg-blue-50`}
                                onClick={() => handleQuickSelect(value)}
                                variant="text"
                                color="inherit">
                                {label}
                            </Button>
                        </div>
                    ))}
                </div>
            </Box>
        </LocalizationProvider>
    );
};

export default DateRangePicker;
